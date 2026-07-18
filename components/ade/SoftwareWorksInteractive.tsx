"use client";

import { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Database, Monitor, Server } from "lucide-react";

const parts = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Monitor,
    role: "The shop floor",
    body: "What you see and tap — screens, buttons, forms. Lives on your phone or in the browser.",
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    role: "The kitchen",
    body: "Hidden rules and logic — check login, calculate totals, decide what is allowed. Runs on a server.",
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    role: "The storeroom",
    body: "Where lasting info sits — accounts, messages, orders. The app reads and writes here.",
  },
] as const;

const flowSteps = [
  {
    title: "You tap “Place order”",
    detail: "The frontend (app screen) takes your action and packages it as a request.",
    highlight: "frontend" as const,
  },
  {
    title: "Request goes to the backend",
    detail: "The kitchen receives: which items, which user, where to deliver.",
    highlight: "backend" as const,
  },
  {
    title: "Backend checks the database",
    detail: "Is the menu item still available? Save the new order. Update stock if needed.",
    highlight: "database" as const,
  },
  {
    title: "Reply returns to your screen",
    detail: "Backend sends “Order confirmed.” Frontend shows the success message. Done.",
    highlight: "frontend" as const,
  },
];

export function SoftwarePartsExplorer() {
  const [active, setActive] = useState<(typeof parts)[number]["id"]>("frontend");
  const part = parts.find((p) => p.id === active) ?? parts[0];
  const Icon = part.icon;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-5 sm:p-6">
      <p className="text-xs font-medium text-white/40">Tap a part</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {parts.map((p) => {
          const selected = active === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                selected
                  ? "bg-white text-[#0f0f0f]"
                  : "border border-white/10 text-white/70 hover:border-white/25 hover:text-white"
              }`}
            >
              <p.icon className="size-3.5" />
              {p.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex gap-4 rounded-xl border border-white/[0.06] bg-[#0f0f0f] p-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--ade-accent-dim)] text-[var(--ade-accent)]">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--ade-accent)]">
            {part.role}
          </p>
          <h3 className="mt-1 text-base font-medium text-white">{part.label}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">{part.body}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 sm:gap-3">
        {parts.map((p, i) => {
          const selected = active === p.id;
          return (
            <div key={p.id} className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setActive(p.id)}
                aria-label={p.label}
                className={`rounded-xl border px-3 py-2 text-[10px] font-semibold uppercase tracking-wider transition-all sm:px-4 sm:py-2.5 sm:text-xs ${
                  selected
                    ? "border-[var(--ade-accent)]/50 bg-[var(--ade-accent-dim)] text-[var(--ade-accent)]"
                    : "border-white/10 text-white/35"
                }`}
              >
                {p.label}
              </button>
              {i < parts.length - 1 && (
                <ArrowRight
                  className={`size-3.5 shrink-0 ${
                    selected ? "text-[var(--ade-accent)]/70" : "text-white/20"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SoftwareRequestWalkthrough() {
  const [step, setStep] = useState(0);
  const current = flowSteps[step];
  const isFirst = step === 0;
  const isLast = step === flowSteps.length - 1;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium text-white/40">
          Example: ordering food · step {step + 1} of {flowSteps.length}
        </p>
        <div className="flex gap-1.5">
          {flowSteps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to step ${i + 1}`}
              onClick={() => setStep(i)}
              className={`h-1.5 w-5 rounded-full transition-colors ${
                i === step ? "bg-[var(--ade-accent)]" : i < step ? "bg-white/35" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-medium capitalize text-white/45">
          {current.highlight}
        </span>
        <h3 className="mt-3 text-lg font-medium text-white">{current.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">{current.detail}</p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-3.5" />
          Back
        </button>
        <button
          type="button"
          onClick={() =>
            isLast ? setStep(0) : setStep((s) => Math.min(flowSteps.length - 1, s + 1))
          }
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90"
        >
          {isLast ? "Replay" : "Next"}
          {!isLast && <ChevronRight className="size-3.5" />}
        </button>
      </div>
    </div>
  );
}
