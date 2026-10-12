"use client";

import Link from "next/link";
import { forwardRef, type MouseEvent } from "react";
import {
  SERIF_LETTERS,
  SANS_LETTERS,
  WordmarkHalf,
} from "@/components/Wordmark";
import { useWordmarkCursorHint } from "@/components/WordmarkCursorHint";

type SiteWordmarkProps = {
  href?: string;
  variant?: "header" | "lockup";
  leaving?: boolean;
  onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const SiteWordmark = forwardRef<HTMLAnchorElement, SiteWordmarkProps>(
  function SiteWordmark(
    {
      href = "/",
      variant = "header",
      leaving = false,
      onNavigate,
    },
    ref,
  ) {
    const { bind, hint } = useWordmarkCursorHint();
    const lockup = variant === "lockup";

    return (
      <>
        <Link
          ref={ref}
          href={href}
          className={lockup ? "about-wordmark" : "site-wordmark"}
          aria-label="SUMATTHEW, home"
          onClick={onNavigate}
          {...bind}
        >
          {lockup ? (
            <>
              <WordmarkHalf letters={SANS_LETTERS} className="wordmark-sans" />
              <WordmarkHalf
                letters={SERIF_LETTERS}
                startIndex={SANS_LETTERS.length}
                className="wordmark-serif"
              />
            </>
          ) : (
            <>
              <span className="wordmark-sans" aria-hidden="true">
                {SANS_LETTERS.join("")}
              </span>
              <span className="wordmark-serif" aria-hidden="true">
                {SERIF_LETTERS.join("")}
              </span>
            </>
          )}
        </Link>
        {leaving ? null : hint}
      </>
    );
  },
);
