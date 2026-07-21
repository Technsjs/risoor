"use client";

import type { ReactNode } from "react";
import { PlatformNav } from "./PlatformNav";

export function PlatformShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--ade-bg)]">
      <PlatformNav />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-10">{children}</main>
    </div>
  );
}
