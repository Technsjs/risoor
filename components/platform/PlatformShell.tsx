"use client";

import type { ReactNode } from "react";
import { PlatformSidebar } from "./PlatformSidebar";

export function PlatformShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--ade-bg)]">
      <PlatformSidebar />
      <div className="lg:pl-64">
        <main className="mx-auto max-w-5xl px-4 pb-10 pt-20 lg:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
