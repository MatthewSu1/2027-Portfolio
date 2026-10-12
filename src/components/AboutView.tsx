"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { SiteWordmark } from "@/components/SiteWordmark";
import { PROJECT_LEAVE } from "@/lib/project-motion";

const EASE_SPLIT = "cubic-bezier(0.549, 0.054, 0.014, 1)";

function homeWordmarkTopPx(height: number) {
  const probe = document.createElement("div");
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.paddingBottom =
    "max(var(--space-split), calc(var(--space-wordmark-gutter) - var(--space-settle-shift)))";
  document.body.appendChild(probe);
  const bottom = parseFloat(getComputedStyle(probe).paddingBottom);
  probe.remove();
  return (
    document.documentElement.clientHeight -
    (Number.isFinite(bottom) ? bottom : 16) -
    height
  );
}

export function AboutView({ children }: { children: ReactNode }) {
  const router = useRouter();
  const markRef = useRef<HTMLAnchorElement>(null);
  const animRef = useRef<Animation | null>(null);
  const timerRef = useRef<number>(0);
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
      animRef.current?.cancel();
    };
  }, []);

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    event.preventDefault();
    if (leave) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push("/");
      return;
    }

    const mark = markRef.current;
    const su = mark?.querySelector(".wordmark-sans");
    const matthew = mark?.querySelector(".wordmark-serif");
    if (
      !mark ||
      !(su instanceof HTMLElement) ||
      !(matthew instanceof HTMLElement)
    ) {
      router.push("/");
      return;
    }

    const firstSu = su.getBoundingClientRect();
    const firstMatthew = matthew.getBoundingClientRect();
    const top = Math.min(firstSu.top, firstMatthew.top);
    const height = Math.max(firstSu.height, firstMatthew.height);
    const dy = homeWordmarkTopPx(height) - top;

    setLeave(true);
    animRef.current?.cancel();
    animRef.current = mark.animate(
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

    const video = document.querySelector(".about-hero-still");
    if (video instanceof HTMLVideoElement) {
      video.pause();
    }

    timerRef.current = window.setTimeout(() => {
      router.push("/");
    }, PROJECT_LEAVE.aboutMs);
  };

  return (
    <main
      className="about-page"
      data-leave={leave ? "home" : undefined}
    >
      <SiteWordmark
        ref={markRef}
        variant="lockup"
        leaving={leave}
        onNavigate={goHome}
      />
      {children}
    </main>
  );
}
