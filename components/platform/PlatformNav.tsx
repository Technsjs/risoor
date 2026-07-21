"use client";

import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { dashboardPathForRole } from "@/lib/platform/types";

export function PlatformNav() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const dashHref = dashboardPathForRole(user.role);
  const links =
    user.role === "admin"
      ? [{ label: "Review courses", href: "/admin" }]
      : user.role === "instructor"
        ? [
            { label: "Overview", href: "/instructor" },
            { label: "Courses", href: "/instructor/courses" },
          ]
        : [{ label: "My courses", href: "/student" }];

  return (
    <header className="border-b border-white/10 bg-[#141414]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-semibold text-white">
            Risoor
          </Link>
          <span className="hidden text-[10px] font-medium uppercase tracking-wider text-white/30 sm:inline">
            Platform
          </span>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ade-muted)] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/learn"
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ade-muted)] transition-colors hover:text-white"
          >
            Learn catalog
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={dashHref}
            className="hidden text-xs text-white/60 hover:text-white sm:inline"
          >
            {user.name}
            <span className="ml-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase">
              {user.role}
            </span>
          </Link>
          <button
            type="button"
            onClick={logout}
            className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/70 transition-colors hover:border-white/25 hover:text-white sm:inline-flex"
          >
            <LogOut className="size-3.5" />
            Sign out
          </button>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-white/80"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/learn" onClick={() => setOpen(false)} className="text-sm text-white/80">
              Learn catalog
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="text-left text-sm text-white/60"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
