"use client";

import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";

type Pos = { x: number; y: number };

const HINT_SELECTOR = "[data-wordmark-hint]";

function isHintTarget(node: EventTarget | null) {
  return node instanceof Element && Boolean(node.closest(HINT_SELECTOR));
}

export function useWordmarkCursorHint() {
  const [pos, setPos] = useState<Pos | null>(null);
  const visible = pos !== null;

  useEffect(() => {
    if (!visible) return;

    function onMove(event: PointerEvent) {
      const hit = document.elementFromPoint(event.clientX, event.clientY);
      if (!isHintTarget(hit)) {
        setPos(null);
        return;
      }
      setPos({ x: event.clientX, y: event.clientY });
    }

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [visible]);

  const onPointerEnter = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    setPos({ x: event.clientX, y: event.clientY });
  }, []);

  const onPointerLeave = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (isHintTarget(event.relatedTarget)) return;
    setPos(null);
  }, []);

  return {
    bind: {
      onPointerEnter,
      onPointerOver: onPointerEnter,
      onPointerLeave,
      "data-wordmark-hint": true as const,
    },
    hint: pos ? <WordmarkCursorBubble x={pos.x} y={pos.y} /> : null,
  };
}

function WordmarkCursorBubble({ x, y }: Pos) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <span
      className="wordmark-bubble"
      style={
        {
          "--bubble-x": `${x}px`,
          "--bubble-y": `${y}px`,
        } as CSSProperties
      }
      aria-hidden="true"
    >
      Click Me!
    </span>,
    document.body,
  );
}
