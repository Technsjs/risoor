"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { dashboardPathForRole } from "@/lib/platform/types";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

function navForRole(role: string): NavItem[] {
  if (role === "admin") {
    return [
      { label: "Review courses", href: "/admin", icon: ShieldCheck },
      { label: "Settings", href: "/admin/settings", icon: Settings },
    ];
  }
  if (role === "instructor") {
    return [
      { label: "Overview", href: "/instructor", icon: LayoutDashboard },
      { label: "Courses", href: "/instructor/courses", icon: BookOpen },
      { label: "Settings", href: "/instructor/settings", icon: Settings },
    ];
  }
  return [
    { label: "My courses", href: "/student", icon: GraduationCap },
    { label: "Settings", href: "/student/settings", icon: Settings },
  ];
}

function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const items = navForRole(user.role);
  const home = dashboardPathForRole(user.role);

  return (
    <>
      <div className="border-b border-white/10 px-5 py-5">
        <Link
          href="/"
          onClick={onNavigate}
          className="text-sm font-semibold text-white"
        >
          Risoor
        </Link>
        <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/30">
          Learning platform
        </p>
      </div>

      <div className="border-b border-white/10 px-5 py-4">
        <p className="truncate text-sm font-medium text-white">{user.name}</p>
        <p className="truncate text-xs text-white/45">{user.email}</p>
        <span className="mt-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
          {user.role}
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== home && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-white/10 font-medium text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-3 py-4">
        <Link
          href="/learn"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <BookOpen className="size-4" />
          Learn catalog
        </Link>
        <button
          type="button"
          onClick={() => {
            logout();
            onNavigate?.();
          }}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </>
  );
}

export function PlatformSidebar() {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-white/10 bg-[#141414]/95 px-4 backdrop-blur-xl lg:hidden">
        <Link href={dashboardPathForRole(user.role)} className="text-sm font-semibold text-white">
          Risoor
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex size-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-[#141414] shadow-xl">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-white/10 bg-[#141414] lg:flex">
        <SidebarContent />
      </aside>
    </>
  );
}
