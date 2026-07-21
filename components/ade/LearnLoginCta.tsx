"use client";

import Link from "next/link";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { dashboardPathForRole } from "@/lib/platform/types";

export function LearnLoginCta() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <span className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/40">
        …
      </span>
    );
  }

  if (user) {
    return (
      <Link
        href={dashboardPathForRole(user.role)}
        className="inline-flex items-center rounded-full border border-[var(--ade-accent)]/40 bg-[var(--ade-accent-dim)] px-5 py-2.5 text-sm font-medium text-[var(--ade-accent)] transition-colors hover:border-[var(--ade-accent)]/60"
      >
        Go to your dashboard
      </Link>
    );
  }

  return (
    <Link
      href="/learn/login"
      className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
    >
      Student / instructor login
    </Link>
  );
}
