"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "Software", href: "/#software" },
  { label: "Web", href: "/web" },
  { label: "Mobile", href: "/mobile" },
  { label: "Learn", href: "/learn" },
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/#contact" },
];

export function AdeNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#1c1c1c]/80 px-5 py-2.5 backdrop-blur-xl sm:px-6">
        <a href="/" className="text-sm font-semibold tracking-tight text-white">
          Risoor
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--ade-muted)] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="hidden rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Book a call
          </a>
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
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-[#1c1c1c] p-5 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/80"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
