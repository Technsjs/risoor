import {
  ArrowRight,
  BookOpen,
  Boxes,
  Brain,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers,
  Smartphone,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  freeTopics,
  learningPaths,
  learnTracks,
  topicsForTrack,
  type LearnTopic,
} from "@/lib/learn-catalog";
import { AdeFooter } from "@/components/ade/AdeFooter";
import { AdeNav } from "@/components/ade/AdeNav";
import { LearnApplyForm } from "@/components/ade/LearnApplyForm";

const topicIcons: Record<string, LucideIcon> = {
  "what-is-programming": BookOpen,
  "how-software-works": Boxes,
  "programming-basics": Code2,
  git: GitBranch,
  javascript: Code2,
  python: Code2,
  "ai-coding": Brain,
  nextjs: Layers,
  vue: Layers,
  "javascript-applied": Code2,
  flutter: Smartphone,
  swift: Smartphone,
  nodejs: Boxes,
  express: Boxes,
  elixir: Boxes,
  "python-backend": Code2,
  postgres: Database,
  firebase: Cloud,
  rest: Database,
};

function TopicCard({ topic }: { topic: LearnTopic }) {
  const Icon = topicIcons[topic.id] ?? Code2;

  const inner = (
    <>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex size-10 items-center justify-center rounded-xl bg-[var(--ade-accent-dim)] text-[var(--ade-accent)]">
          <Icon className="size-5" />
        </div>
        <div className="flex flex-wrap justify-end gap-1.5">
          {topic.free && (
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
              Free
            </span>
          )}
          <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/45">
            {topic.level}
          </span>
        </div>
      </div>
      <h3 className="text-base font-medium text-white">{topic.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">
        <span className="text-white/40">What you&apos;ll build — </span>
        {topic.builds}
      </p>
      {topic.href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--ade-accent)]">
          Read lesson
          <ArrowRight className="size-3.5" />
        </span>
      )}
    </>
  );

  const className =
    "flex flex-col rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-5 transition-colors hover:border-white/15";

  if (topic.href) {
    return (
      <a href={topic.href} className={`${className} group`}>
        {inner}
      </a>
    );
  }

  return <article className={className}>{inner}</article>;
}

export function LearnPage() {
  return (
    <>
      <AdeNav />
      <main>
        {/* Hero */}
        <section className="ade-hero-bg border-b border-white/[0.06] pt-32 pb-16 sm:pt-36 sm:pb-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
              Learn
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight text-white sm:text-5xl">
              Learn to build software — including with AI
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--ade-muted)] sm:text-lg">
              Free foundations to start. Then pick a path — Flutter, full-stack web, full-stack mobile,
              backend, or AI-assisted building. For now you apply; we review and onboard you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90"
              >
                Apply to learn
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#free"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
              >
                Start free
              </a>
            </div>
          </div>
        </section>

        {/* Free start */}
        <section id="free" className="border-b border-white/[0.06] bg-[#0f0f0f] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-emerald-400" />
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-400">
                Start free
              </p>
            </div>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              First: what programming is &amp; how software works
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[var(--ade-muted)]">
              Everyone starts here — no prior experience needed. These two topics are free.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {freeTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
        </section>

        {/* Paths */}
        <section id="paths" className="border-b border-white/[0.06] bg-[#121212] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
              Paths
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Choose your direction
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[var(--ade-muted)]">
              Some people only want mobile. Some want Flutter + Firebase. Some want full-stack web or
              full-stack mobile. Pick a path that matches your goal — or mix topics in the Apply form.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {learningPaths.map((path) => (
                <a
                  key={path.id}
                  href={`/learn?path=${path.id}#apply`}
                  className="group flex flex-col rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-6 transition-colors hover:border-[var(--ade-accent)]/35"
                >
                  <h3 className="text-lg font-medium text-white">{path.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ade-muted)]">
                    {path.forWho}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[var(--ade-accent)]">
                    Apply with this path
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Track nav */}
        <section className="border-b border-white/[0.06] bg-[#0f0f0f] py-6">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-6 sm:px-8 lg:px-10">
            {learnTracks.map((track) => (
              <a
                key={track.id}
                href={`#track-${track.id}`}
                className="rounded-full border border-white/10 px-3.5 py-1.5 text-xs font-medium text-white/65 transition-colors hover:border-white/25 hover:text-white"
              >
                {track.name}
              </a>
            ))}
          </div>
        </section>

        {/* Tracks */}
        {learnTracks.map((track, i) => (
          <section
            key={track.id}
            id={`track-${track.id}`}
            className={`border-b border-white/[0.06] py-16 sm:py-20 ${
              i % 2 === 0 ? "bg-[#121212]" : "bg-[#0f0f0f]"
            }`}
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
                Track
              </p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                {track.name}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--ade-muted)]">{track.blurb}</p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {topicsForTrack(track.id).map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* How it works */}
        <section className="border-b border-white/[0.06] bg-[#121212] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
              How it works
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Free start → Apply → Review → Onboard
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  n: "01",
                  title: "Start free",
                  desc: "Learn what programming is and how software works — no application required.",
                },
                {
                  n: "02",
                  title: "Apply with a path",
                  desc: "Tell us your goal (mobile, full-stack, AI builder…) and the topics you want.",
                },
                {
                  n: "03",
                  title: "We review",
                  desc: "We read your application and match you to the right level and topics.",
                },
                {
                  n: "04",
                  title: "Onboarding",
                  desc: "You get next steps, schedule, and how to begin the full program.",
                },
              ].map((step) => (
                <article
                  key={step.n}
                  className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-6"
                >
                  <span className="text-xs font-medium text-[var(--ade-accent)]">{step.n}</span>
                  <h3 className="mt-3 text-lg font-medium text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">{step.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Apply */}
        <section className="bg-[#0f0f0f] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
                  Apply
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Ready to learn?
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--ade-muted)]">
                  Applications only for now. Pick a goal path, refine topics, and tell us why
                  you&apos;re here. We reply within a few business days.
                </p>
              </div>
              <div className="lg:col-span-8">
                <LearnApplyForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <AdeFooter />
    </>
  );
}
