"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { carouselCoverRange, projectAt, type Project } from "@/lib/projects";

const WHEEL_THRESHOLD = 32;
const SWIPE_THRESHOLD = 48;
const CAROUSEL_MS = 600;
const SIDES_MS = 750;

type ProjectCarouselProps = {
  projects: Project[];
  enabled: boolean;
  leaving?: boolean;
  mediaRef: React.Ref<HTMLDivElement>;
  videoRef: React.Ref<HTMLVideoElement>;
  onOpenProject?: (href: string) => void;
};

function SlideMedia({
  project,
  videoRef,
  playing,
  active,
}: {
  project: Project;
  videoRef?: React.Ref<HTMLVideoElement>;
  playing: boolean;
  active: boolean;
}) {
  const localRef = useRef<HTMLVideoElement>(null);
  const poster =
    project.poster ?? (project.kind === "image" ? project.src : undefined);
  const feature =
    project.kind === "image" && project.src && project.src !== poster
      ? project.src
      : undefined;
  const videoSrc =
    project.kind === "video" && (active || !poster) ? project.src : undefined;

  useEffect(() => {
    const video = localRef.current;
    if (!video) {
      return;
    }

    const holdMs = project.endHoldMs ?? 0;
    video.playbackRate = 1;
    video.loop = playing && holdMs === 0;

    const seekStart = () => {
      if (video.readyState < 1) {
        return;
      }
      try {
        video.currentTime = 0;
      } catch {
        /* not seekable yet */
      }
    };

    const play = () => {
      const attempt = video.play();
      if (attempt) {
        attempt.catch(() => {});
      }
    };

    let recovered = false;
    const recover = () => {
      if (recovered) {
        return;
      }
      recovered = true;
      video.load();
    };

    if (video.error) {
      recover();
    }
    video.addEventListener("error", recover);

    if (
      playing &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      if (video.readyState >= 2) {
        play();
      } else {
        video.addEventListener("loadeddata", play, { once: true });
      }

      if (holdMs === 0) {
        return () => {
          video.removeEventListener("error", recover);
          video.removeEventListener("loadeddata", play);
        };
      }

      let holdTimer = 0;
      const onEnded = () => {
        window.clearTimeout(holdTimer);
        holdTimer = window.setTimeout(() => {
          seekStart();
          play();
        }, holdMs);
      };

      video.addEventListener("ended", onEnded);
      return () => {
        window.clearTimeout(holdTimer);
        video.removeEventListener("error", recover);
        video.removeEventListener("loadeddata", play);
        video.removeEventListener("ended", onEnded);
      };
    }

    video.pause();
    seekStart();
    video.addEventListener("loadedmetadata", seekStart, { once: true });
    return () => {
      video.removeEventListener("error", recover);
      video.removeEventListener("loadedmetadata", seekStart);
    };
  }, [playing, project.endHoldMs]);

  return (
    <div
      className="intro-stack"
      data-active={active ? "on" : undefined}
    >
      {poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="intro-still"
          data-layer="poster"
          src={poster}
          alt=""
          aria-hidden={true}
          draggable={false}
          decoding="async"
          style={
            {
              ...(project.objectFit ? { objectFit: project.objectFit } : {}),
              ...(!playing && project.objectPosition
                ? { objectPosition: project.objectPosition }
                : {}),
            } as React.CSSProperties
          }
        />
      ) : null}
      {feature ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="intro-still"
          data-layer="feature"
          src={feature}
          alt=""
          aria-hidden={true}
          draggable={false}
          decoding="async"
          style={
            project.objectFit
              ? ({ objectFit: project.objectFit } as React.CSSProperties)
              : undefined
          }
        />
      ) : null}
      {videoSrc ? (
        <video
          ref={(node) => {
            localRef.current = node;
            if (typeof videoRef === "function") {
              videoRef(node);
            } else if (videoRef) {
              videoRef.current = node;
            }
          }}
          className="intro-still"
          data-layer="video"
          src={videoSrc}
          poster={poster}
          muted
          playsInline
          loop={playing && !project.endHoldMs}
          preload="auto"
          aria-hidden={true}
        />
      ) : null}
    </div>
  );
}

export function ProjectCarousel({
  projects,
  enabled,
  leaving = false,
  mediaRef,
  videoRef,
  onOpenProject,
}: ProjectCarouselProps) {
  const [offset, setOffset] = useState(0);
  const [motion, setMotion] = useState(false);
  const [range, setRange] = useState(4);
  const router = useRouter();
  const indices = useMemo(() => {
    const list: number[] = [];
    for (let index = offset - range; index <= offset + range; index += 1) {
      list.push(index);
    }
    return list;
  }, [offset, range]);
  const lockedRef = useRef(false);
  const wheelRef = useRef(0);
  const pointerRef = useRef<number | null>(null);
  const draggedRef = useRef(false);
  const moveRef = useRef<(delta: number) => void>(() => {});
  const finishTimer = useRef<number>(0);

  const current = projectAt(projects, offset, 0);

  const move = (delta: number) => {
    if (!enabled || leaving || lockedRef.current || projects.length === 0 || delta === 0) {
      return;
    }

    wheelRef.current = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffset((value) => value + delta);
      return;
    }

    lockedRef.current = true;
    setOffset((value) => value + delta);
    window.clearTimeout(finishTimer.current);
    finishTimer.current = window.setTimeout(() => {
      lockedRef.current = false;
      wheelRef.current = 0;
    }, CAROUSEL_MS);
  };

  useEffect(() => {
    moveRef.current = move;
  });

  useEffect(() => {
    return () => window.clearTimeout(finishTimer.current);
  }, []);

  useEffect(() => {
    const measure = () => setRange(carouselCoverRange());
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    projects.forEach((project) => {
      if (project.href) {
        router.prefetch(project.href);
      }
    });
  }, [enabled, projects, router]);

  useEffect(() => {
    if (!enabled) {
      setMotion(false);
      return;
    }

    const id = window.setTimeout(() => setMotion(true), SIDES_MS);
    return () => window.clearTimeout(id);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      if (lockedRef.current) {
        wheelRef.current = 0;
        return;
      }
      wheelRef.current += event.deltaY;
      if (wheelRef.current >= WHEEL_THRESHOLD) {
        wheelRef.current = 0;
        moveRef.current(1);
      } else if (wheelRef.current <= -WHEEL_THRESHOLD) {
        wheelRef.current = 0;
        moveRef.current(-1);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveRef.current(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveRef.current(-1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [enabled]);

  return (
    <div
      className="carousel"
      data-motion={motion ? "on" : undefined}
      data-center-aspect={current.aspect}
      role="region"
      aria-roledescription="carousel"
      aria-label="Projects"
      onPointerDown={(event) => {
        if (!enabled) {
          return;
        }
        pointerRef.current = event.clientX;
        draggedRef.current = false;
      }}
      onPointerMove={(event) => {
        if (pointerRef.current == null) {
          return;
        }
        if (Math.abs(event.clientX - pointerRef.current) >= SWIPE_THRESHOLD) {
          draggedRef.current = true;
        }
      }}
      onPointerUp={(event) => {
        if (pointerRef.current == null) {
          return;
        }
        const dx = event.clientX - pointerRef.current;
        pointerRef.current = null;
        if (dx <= -SWIPE_THRESHOLD) {
          move(1);
        } else if (dx >= SWIPE_THRESHOLD) {
          move(-1);
        }
      }}
      onPointerCancel={() => {
        pointerRef.current = null;
        draggedRef.current = false;
      }}
    >
      <p className="intro-sr" aria-live="polite">
        {current.title}
      </p>

      {indices.map((index) => {
        const slot = index - offset;
        const project = projectAt(projects, index, 0);
        const isCenter = slot === 0;
        const canOpen = Boolean(project.href);

        return (
          <button
            key={index}
            className="carousel-slide"
            data-slot={slot}
            data-kind={project.kind}
            data-aspect={project.aspect}
            type="button"
            aria-current={isCenter ? "true" : undefined}
            aria-label={
              isCenter && canOpen
                ? `Open ${project.title}`
                : `${project.title}, ${project.client}`
            }
            aria-hidden={!enabled}
            tabIndex={enabled && (Math.abs(slot) === 1 || (isCenter && canOpen)) ? 0 : -1}
            disabled={!enabled || (isCenter && !canOpen)}
            style={{ "--slot": slot } as React.CSSProperties}
            onClick={() => {
              if (leaving || draggedRef.current) {
                return;
              }
              if (isCenter && project.href) {
                if (onOpenProject) {
                  onOpenProject(project.href);
                } else {
                  router.push(project.href);
                }
                return;
              }
              move(slot);
            }}
          >
            <div className="carousel-caption" aria-hidden="true">
              <p className="carousel-caption-name">{project.title}</p>
              <p className="carousel-caption-client">{project.client}</p>
            </div>
            <div className="carousel-media">
              <div ref={isCenter ? mediaRef : undefined} className="intro-frame">
                <SlideMedia
                  project={project}
                  videoRef={isCenter ? videoRef : undefined}
                  playing={enabled && isCenter}
                  active={isCenter}
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
