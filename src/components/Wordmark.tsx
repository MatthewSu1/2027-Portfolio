import type { CSSProperties } from "react";

export const SANS_LETTERS = ["S", "U"] as const;
export const SERIF_LETTERS = ["M", "A", "T", "T", "H", "E", "W"] as const;

type WordmarkHalfProps = {
  letters: readonly string[];
  startIndex?: number;
  className: string;
};

export function WordmarkHalf({
  letters,
  startIndex = 0,
  className,
}: WordmarkHalfProps) {
  return (
    <span className={className} aria-hidden="true">
      {letters.map((letter, index) => (
        <span key={`${letter}-${index}`} className="wordmark-clip">
          <span
            className="wordmark-letter"
            style={{ "--i": startIndex + index } as CSSProperties}
          >
            {letter}
          </span>
        </span>
      ))}
    </span>
  );
}
