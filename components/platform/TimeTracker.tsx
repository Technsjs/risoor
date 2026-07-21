"use client";

import { useEffect, useRef } from "react";

export function TimeTracker({
  active,
  onTick,
  intervalMs = 30000,
}: {
  active: boolean;
  onTick: (deltaMs: number) => void;
  intervalMs?: number;
}) {
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) {
      lastRef.current = null;
      return;
    }

    lastRef.current = Date.now();

    const id = window.setInterval(() => {
      const now = Date.now();
      const last = lastRef.current ?? now;
      const delta = now - last;
      lastRef.current = now;
      onTick(delta);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [active, onTick, intervalMs]);

  return null;
}
