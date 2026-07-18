"use client";

import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";

const cycle = [
  {
    id: "input",
    label: "Input",
    tip: "Something comes in",
    body: "A tap, a typed name, a photo, a payment — anything the program receives from the outside world.",
    example: "You type your name into a box.",
  },
  {
    id: "process",
    label: "Process",
    tip: "Code decides what to do",
    body: "Your instructions check, calculate, combine, or store that information.",
    example: "Remember the name and build the greeting text.",
  },
  {
    id: "output",
    label: "Output",
    tip: "Something comes out",
    body: "A screen update, a message, a file, or an error — what the program shows or does next.",
    example: "Show “Hello, Ada” on the screen.",
  },
] as const;

export function ProgramCycleExplorer() {
  const [active, setActive] = useState<(typeof cycle)[number]["id"]>("input");
  const item = cycle.find((c) => c.id === active) ?? cycle[0];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-5 sm:p-6">
      <p className="text-xs font-medium text-white/40">Tap a stage</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {cycle.map((c, i) => {
          const selected = active === c.id;
          return (
            <div key={c.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActive(c.id)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  selected
                    ? "bg-white text-[#0f0f0f]"
                    : "border border-white/10 text-white/70 hover:border-white/25 hover:text-white"
                }`}
              >
                {c.label}
              </button>
              {i < cycle.length - 1 && (
                <ArrowRight
                  className={`size-3.5 shrink-0 ${
                    selected ? "text-white/40" : "text-white/15"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#0f0f0f] p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-[var(--ade-accent)]">
          {item.tip}
        </p>
        <h3 className="mt-1 text-base font-medium text-white">{item.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">{item.body}</p>
        <p className="mt-3 text-sm text-white/55">
          <span className="text-white/35">Example — </span>
          {item.example}
        </p>
      </div>
    </div>
  );
}

export function HelloMiniDemo() {
  const [name, setName] = useState("");
  const [ran, setRan] = useState(false);
  const trimmed = name.trim();
  const greeting = trimmed ? `Hello, ${trimmed}.` : "Hello, friend.";

  function run() {
    setRan(true);
  }

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-5 sm:p-6">
      <p className="text-xs font-medium text-white/40">Try it — no install needed</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">
        Type a name, press Run. That is input → process → output in one tiny loop.
      </p>

      <label htmlFor="hello-name" className="mt-5 mb-1.5 block text-xs font-medium text-white/45">
        Input
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          id="hello-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setRan(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") run();
          }}
          placeholder="Your name"
          className="w-full flex-1 rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]"
        />
        <button
          type="button"
          onClick={run}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90"
        >
          <Play className="size-3.5" fill="currentColor" />
          Run
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#0f0f0f] p-4">
        <p className="text-xs font-medium text-white/40">Output</p>
        <p
          className={`mt-2 text-lg font-medium tracking-tight ${
            ran ? "text-white" : "text-white/25"
          }`}
        >
          {ran ? greeting : "Press Run to see the result"}
        </p>
      </div>

      <pre className="mt-4 overflow-x-auto rounded-xl border border-white/[0.06] bg-[#0f0f0f] p-4 text-xs leading-relaxed text-white/55">
        <code>{`// Pseudocode — the idea behind the button
ask for name
store name
show "Hello, " + name`}</code>
      </pre>
    </div>
  );
}
