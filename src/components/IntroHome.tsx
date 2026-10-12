"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import {
  SERIF_LETTERS,
  SANS_LETTERS,
  WordmarkHalf,
} from "@/components/Wordmark";
import { createProjects } from "@/lib/projects";
import { getProjectPage } from "@/lib/project-pages";
import { PROJECT_LEAVE } from "@/lib/project-motion";
import { preloadProjectImages } from "@/lib/preload-media";
import type { ProjectVideo } from "@/lib/project-video";
import { useWordmarkCursorHint } from "@/components/WordmarkCursorHint";
import { useRouter } from "next/navigation";

type Phase = "rise" | "split" | "settled";
type Leave =
  | "off"
  | "sides"
  | "center"
  | "about"
  | "mark"
  | "markOut"
  | "sheet"
  | "corner";

const EASE_SPLIT = "cubic-bezier(0.549, 0.054, 0.014, 1)";
const SETTLE_MS = 1500;
const INTRO_SEEN_KEY = "sumatthew-intro-seen";

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    /* private mode */
  }
}

function wordmarkGutterPx() {
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.paddingTop = "var(--space-wordmark-gutter)";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const top = parseFloat(getComputedStyle(probe).paddingTop);
  probe.remove();
  return Number.isFinite(top) ? top : 16;
}

function slideHalfUp(node: HTMLElement, dy: number) {
  return node.animate(
    [
      { transform: "none" },
      { transform: `translate3d(0, ${dy}px, 0)` },
    ],
    {
      duration: PROJECT_LEAVE.aboutMs,
      easing: EASE_SPLIT,
      fill: "forwards",
    },
  );
}

type IntroHomeProps = {
  videos: ProjectVideo[];
  marks?: Record<string, string | undefined>;
};

export function IntroHome({ videos, marks = {} }: IntroHomeProps) {
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<Phase>("rise");
  const suRef = useRef<HTMLSpanElement>(null);
  const matthewRef = useRef<HTMLSpanElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const firstRects = useRef<DOMRect[] | null>(null);
  const [carouselOn, setCarouselOn] = useState(false);
  const [sidesIn, setSidesIn] = useState(false);
  const [leave, setLeave] = useState<Leave>("off");
  const [sheet, setSheet] = useState(false);
  const [markSrc, setMarkSrc] = useState<string>();
  const router = useRouter();
  const leaveTimers = useRef<number[]>([]);
  const aboutAnims = useRef<Animation[]>([]);
  const skipIntro = useRef(false);
  const [skipSeen, setSkipSeen] = useState(false);
  const projects = useMemo(() => createProjects(videos), [videos]);
  const leaving = leave !== "off";
  const { bind: wordmarkHint, hint: wordmarkBubble } = useWordmarkCursorHint();

  useLayoutEffect(() => {
    delete document.documentElement.dataset.projectSurface;
    const seen = hasSeenIntro();
    skipIntro.current = seen;
    if (seen) {
      setSkipSeen(true);
    }
  }, []);

  useEffect(() => {
    router.prefetch("/about");
    for (const project of projects) {
      if (project.href) {
        router.prefetch(project.href);
      }
    }
  }, [projects, router]);

  useEffect(() => {
    let cancelled = false;

    preloadProjectImages(projects, marks).then(() => {
      if (!cancelled) {
        setReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [marks, projects]);

  useLayoutEffect(() => {
    if (!ready) {
      return;
    }

    if (
      skipIntro.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const instant = window.setTimeout(() => {
        markIntroSeen();
        setPhase("settled");
        setCarouselOn(true);
        setSidesIn(true);
      }, 0);
      return () => window.clearTimeout(instant);
    }

    const split = window.setTimeout(() => setPhase("split"), 1700);
    const settle = window.setTimeout(() => {
      const nodes = [suRef.current, mediaRef.current, matthewRef.current];
      if (nodes.every((node) => node)) {
        firstRects.current = nodes.map((node) => node!.getBoundingClientRect());
      }
      setPhase("settled");
    }, 2800);

    return () => {
      window.clearTimeout(split);
      window.clearTimeout(settle);
    };
  }, [ready]);

  useLayoutEffect(() => {
    if (phase !== "settled" || !firstRects.current) {
      return;
    }

    const nodes = [suRef.current, mediaRef.current, matthewRef.current];
    const origins = firstRects.current;
    firstRects.current = null;

    const animations = nodes.map((node, index) => {
      if (!node) {
        return null;
      }

      const last = node.getBoundingClientRect();
      const first = origins[index];
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      const sx = first.width / Math.max(last.width, 1);
      const sy = first.height / Math.max(last.height, 1);

      return node.animate(
        [
          {
            transformOrigin: "top left",
            transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})`,
          },
          { transformOrigin: "top left", transform: "none" },
        ],
        { duration: SETTLE_MS, easing: EASE_SPLIT },
      );
    });

    const enable = window.setTimeout(() => {
      markIntroSeen();
      setCarouselOn(true);
    }, SETTLE_MS);

    return () => {
      window.clearTimeout(enable);
      animations.forEach((animation) => animation?.cancel());
    };
  }, [phase]);

  useEffect(() => {
    if (!carouselOn) {
      if (!skipIntro.current) {
        setSidesIn(false);
      }
      return;
    }

    if (
      skipIntro.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setSidesIn(true);
      return;
    }

    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setSidesIn(true));
    });
    return () => window.cancelAnimationFrame(id);
  }, [carouselOn]);

  useEffect(() => {
    return () => {
      leaveTimers.current.forEach((id) => window.clearTimeout(id));
      aboutAnims.current.forEach((animation) => animation.cancel());
    };
  }, []);

  const openProject = (href: string) => {
    if (leaving) {
      return;
    }

    const slug = href.split("/").filter(Boolean).at(-1);
    const page = slug ? getProjectPage(slug) : null;
    const rises = page?.enter === "rise";
    const nextMark = slug ? marks[slug] : undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(href);
      return;
    }

    setSheet(rises);
    setMarkSrc(nextMark);
    setSidesIn(false);
    setLeave("center");

    if (!rises) {
      const toPage = window.setTimeout(() => {
        router.push(href);
      }, PROJECT_LEAVE.centerMs);
      leaveTimers.current.push(toPage);
      return;
    }

    document.documentElement.dataset.projectSurface = "dark";

    const toMark = window.setTimeout(() => {
      setLeave("mark");
      const toSheet = window.setTimeout(() => {
        setLeave("sheet");
        const toMarkOut = window.setTimeout(() => {
          setLeave("markOut");
          const toPage = window.setTimeout(() => {
            router.push(href);
          }, nextMark ? PROJECT_LEAVE.markMs : 0);
          leaveTimers.current.push(toPage);
        }, PROJECT_LEAVE.sheetMs);
        leaveTimers.current.push(toMarkOut);
      }, nextMark ? PROJECT_LEAVE.markMs : 0);
      leaveTimers.current.push(toSheet);
    }, PROJECT_LEAVE.centerMs);
    leaveTimers.current.push(toMark);
  };

  const canAbout = carouselOn && !leaving && phase === "settled";

  const openAbout = () => {
    if (leaving || !carouselOn || phase !== "settled") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push("/about");
      return;
    }

    const su = suRef.current;
    const matthew = matthewRef.current;
    if (!su || !matthew) {
      router.push("/about");
      return;
    }

    const firstSu = su.getBoundingClientRect();
    const firstMatthew = matthew.getBoundingClientRect();
    const dy =
      wordmarkGutterPx() - Math.min(firstSu.top, firstMatthew.top);

    setSidesIn(false);
    setLeave("about");

    aboutAnims.current.forEach((animation) => animation.cancel());
    aboutAnims.current = [slideHalfUp(su, dy), slideHalfUp(matthew, dy)];

    const toPage = window.setTimeout(() => {
      router.push("/about");
    }, PROJECT_LEAVE.aboutMs);
    leaveTimers.current.push(toPage);
  };

  const onAboutKey = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openAbout();
    }
  };

  return (
    <main
      className="intro"
      data-phase={ready ? phase : "boot"}
      data-intro={skipSeen ? "skip" : undefined}
      data-carousel={carouselOn ? "on" : undefined}
      data-sides={carouselOn && sidesIn && !leaving ? "in" : undefined}
      data-leave={leave === "off" ? undefined : leave}
    >
      <div className="intro-cluster">
        <div className="intro-media">
          <ProjectCarousel
            projects={projects}
            enabled={carouselOn}
            leaving={leaving}
            mediaRef={mediaRef}
            videoRef={videoRef}
            onOpenProject={openProject}
          />
        </div>

        <span
          ref={suRef}
          className="intro-su"
          {...wordmarkHint}
          {...(canAbout
            ? {
                role: "link" as const,
                tabIndex: 0,
                "aria-label": "About",
                onClick: openAbout,
                onKeyDown: onAboutKey,
              }
            : {})}
        >
          <WordmarkHalf letters={SANS_LETTERS} className="wordmark-sans" />
        </span>

        <span
          ref={matthewRef}
          className="intro-matthew"
          {...wordmarkHint}
          onClick={canAbout ? openAbout : undefined}
        >
          <WordmarkHalf
            letters={SERIF_LETTERS}
            startIndex={SANS_LETTERS.length}
            className="wordmark-serif"
          />
        </span>
      </div>
      {leaving ? null : wordmarkBubble}

      <h1 className="intro-sr">SUMATTHEW</h1>
      {markSrc ? (
        <div
          className="project-mark"
          data-in={
            leave === "mark" || leave === "sheet" || leave === "markOut"
              ? "on"
              : undefined
          }
          data-out={leave === "markOut" ? "on" : undefined}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={markSrc} alt="" />
        </div>
      ) : null}
      {sheet ? (
        <div
          className="project-sheet"
          data-in={
            leave === "sheet" || leave === "markOut" || leave === "corner"
              ? "on"
              : undefined
          }
          aria-hidden="true"
        />
      ) : null}
    </main>
  );
}
