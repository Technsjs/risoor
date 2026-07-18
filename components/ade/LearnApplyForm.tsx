"use client";

import { ArrowRight, Check, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { learningPaths, learnTopics } from "@/lib/learn-catalog";
import { site } from "@/lib/site";

const experienceLevels = [
  { id: "beginner", label: "Absolute beginner" },
  { id: "some", label: "Some coding" },
  { id: "building", label: "Building already" },
] as const;

const steps = [
  { id: "you", label: "About you" },
  { id: "goal", label: "Your goal" },
  { id: "topics", label: "Topics" },
  { id: "why", label: "Finish" },
] as const;

function pathFromUrl() {
  if (typeof window === "undefined") return null;
  const fromQuery = new URLSearchParams(window.location.search).get("path");
  if (fromQuery && learningPaths.some((p) => p.id === fromQuery)) return fromQuery;
  const hashMatch = window.location.hash.match(/path=([\w-]+)/);
  if (hashMatch && learningPaths.some((p) => p.id === hashMatch[1])) return hashMatch[1];
  return null;
}

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]";

const chipActive = "bg-white text-[#0f0f0f]";
const chipIdle =
  "border border-white/10 text-white/70 hover:border-white/25 hover:text-white";

export function LearnApplyForm() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [experience, setExperience] = useState<string>("beginner");
  const [pathId, setPathId] = useState<string>("beginner");
  const [topics, setTopics] = useState<string[]>([
    "what-is-programming",
    "how-software-works",
  ]);
  const [why, setWhy] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const id = pathFromUrl();
    if (!id) return;
    const path = learningPaths.find((p) => p.id === id);
    if (path) {
      setPathId(path.id);
      setTopics(path.topicIds);
    }
  }, []);

  function toggleTopic(id: string) {
    setTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function selectPath(id: string) {
    setPathId(id);
    const path = learningPaths.find((p) => p.id === id);
    if (path) setTopics(path.topicIds);
  }

  function validateStep(index: number) {
    if (index === 0) {
      if (!name.trim()) return "Add your name to continue.";
      if (!email.trim() || !email.includes("@")) return "Add a valid email to continue.";
    }
    if (index === 2 && topics.length === 0) {
      return "Pick at least one topic.";
    }
    if (index === 3 && !why.trim()) {
      return "Tell us briefly why you want to learn.";
    }
    return "";
  }

  function goNext() {
    const msg = validateStep(step);
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    setStep((s) => Math.min(steps.length - 1, s + 1));
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(0, s - 1));
  }

  function submit() {
    const msg = validateStep(3);
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    setSent(true);
  }

  if (sent) {
    return (
      <div
        id="apply"
        className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-6 sm:p-8"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Check className="size-5" />
        </span>
        <h3 className="mt-4 text-xl font-medium text-white">Application noted</h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">
          Thanks for applying. Also email{" "}
          <a
            href={`mailto:${site.email}?subject=Learn%20application`}
            className="text-white/80 underline-offset-2 hover:underline"
          >
            {site.email}
          </a>{" "}
          with your path so we don&apos;t miss you while form delivery is being connected.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setStep(0);
          }}
          className="mt-6 text-sm font-medium text-[var(--ade-accent)] hover:opacity-80"
        >
          Edit application
        </button>
      </div>
    );
  }

  const isLast = step === steps.length - 1;

  return (
    <div
      id="apply"
      className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-6 sm:p-8"
    >
      {/* Step progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-white/40">
            Step {step + 1} of {steps.length}
          </p>
          <p className="text-xs font-medium text-white/55">{steps[step].label}</p>
        </div>
        <div className="mt-3 flex gap-1.5">
          {steps.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={s.label}
              onClick={() => {
                if (i < step) {
                  setError("");
                  setStep(i);
                }
              }}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-[var(--ade-accent)]" : "bg-white/10"
              } ${i < step ? "cursor-pointer" : "cursor-default"}`}
            />
          ))}
        </div>
      </div>

      {/* Step 1 — About you */}
      {step === 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-white">About you</h3>
            <p className="mt-1 text-sm text-[var(--ade-muted)]">
              How we reach you — takes a minute.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="learn-name" className="mb-1.5 block text-xs font-medium text-[var(--ade-muted)]">
                Name
              </label>
              <input
                id="learn-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
                placeholder="Alex"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="learn-email" className="mb-1.5 block text-xs font-medium text-[var(--ade-muted)]">
                Email
              </label>
              <input
                id="learn-email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
                placeholder="alex@email.com"
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label htmlFor="learn-phone" className="mb-1.5 block text-xs font-medium text-[var(--ade-muted)]">
              Phone / WhatsApp <span className="text-white/30">(optional)</span>
            </label>
            <input
              id="learn-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClass}
              placeholder="+234…"
            />
          </div>
          <div>
            <p className="mb-2.5 text-xs font-medium text-[var(--ade-muted)]">Experience</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Experience">
              {experienceLevels.map((level) => {
                const active = experience === level.id;
                return (
                  <button
                    key={level.id}
                    type="button"
                    onClick={() => setExperience(level.id)}
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      active ? chipActive : chipIdle
                    }`}
                  >
                    {level.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Step 2 — Goal */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-white">Primary goal</h3>
            <p className="mt-1 text-sm text-[var(--ade-muted)]">
              Pick one direction. We&apos;ll suggest topics on the next step.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2" role="group" aria-label="Primary goal">
            {learningPaths.map((path) => {
              const active = pathId === path.id;
              return (
                <button
                  key={path.id}
                  type="button"
                  onClick={() => selectPath(path.id)}
                  className={`rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                    active
                      ? "border-[var(--ade-accent)]/50 bg-[var(--ade-accent-dim)]"
                      : "border-white/10 bg-[#0f0f0f] hover:border-white/20"
                  }`}
                >
                  <span className="block text-sm font-medium text-white">{path.name}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-[var(--ade-muted)]">
                    {path.forWho}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3 — Topics */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-white">Topics of interest</h3>
            <p className="mt-1 text-sm text-[var(--ade-muted)]">
              Pre-filled from your goal — tap to add or remove.
            </p>
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Topics">
            {learnTopics.map((topic) => {
              const active = topics.includes(topic.id);
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    active
                      ? "bg-[var(--ade-accent-dim)] text-[var(--ade-accent)] ring-1 ring-[var(--ade-accent)]/40"
                      : "border border-white/10 text-white/60 hover:border-white/25 hover:text-white"
                  }`}
                >
                  {topic.name}
                  {topic.free ? " · Free" : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 4 — Why + submit */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-white">Almost done</h3>
            <p className="mt-1 text-sm text-[var(--ade-muted)]">
              One short note helps us place you correctly.
            </p>
          </div>
          <div>
            <label htmlFor="learn-why" className="mb-1.5 block text-xs font-medium text-[var(--ade-muted)]">
              Why do you want to learn?
            </label>
            <textarea
              id="learn-why"
              name="why"
              rows={4}
              value={why}
              onChange={(e) => setWhy(e.target.value)}
              className={`${fieldClass} resize-none`}
              placeholder="Tell us your goal — job, product idea, career switch…"
            />
          </div>
          <p className="text-xs leading-relaxed text-white/35">
            By applying, you agree to our{" "}
            <a href="/privacy" className="text-white/55 underline-offset-2 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="text-white/55 underline-offset-2 hover:underline">
              Terms
            </a>
            .
          </p>
        </div>
      )}

      {error ? (
        <p className="mt-4 text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      {/* Nav */}
      <div className="mt-6 flex items-center gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
          >
            <ChevronLeft className="size-4" />
            Back
          </button>
        ) : (
          <div className="flex-1" />
        )}
        <button
          type="button"
          onClick={isLast ? submit : goNext}
          className="ml-auto inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90 sm:flex-none sm:px-8"
        >
          {isLast ? "Submit application" : "Next"}
          <ArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
