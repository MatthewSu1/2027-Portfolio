"use client";

import { useEffect, useRef } from "react";

const HOLD_MS = 3000;

type BmwHoldVideoProps = {
  src: string;
  label: string;
};

export function BmwHoldVideo({ src, label }: BmwHoldVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.loop = false;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    const play = () => {
      const attempt = video.play();
      if (attempt) {
        attempt.catch(() => {});
      }
    };

    let holdTimer = 0;
    const onEnded = () => {
      window.clearTimeout(holdTimer);
      holdTimer = window.setTimeout(() => {
        video.currentTime = 0;
        play();
      }, HOLD_MS);
    };

    play();
    video.addEventListener("ended", onEnded);

    return () => {
      window.clearTimeout(holdTimer);
      video.removeEventListener("ended", onEnded);
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      aria-label={label}
    />
  );
}
