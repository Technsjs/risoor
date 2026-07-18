import { ArrowLeft, ArrowRight } from "lucide-react";
import { AdeFooter } from "@/components/ade/AdeFooter";
import { AdeNav } from "@/components/ade/AdeNav";
import {
  HelloMiniDemo,
  ProgramCycleExplorer,
} from "@/components/ade/ProgrammingInteractive";

const sections = [
  {
    title: "In one sentence",
    body: "Programming is writing clear instructions that a computer can follow to do a job for you — show a website, send a message, save a photo, calculate a total, or run an entire app.",
  },
  {
    title: "Think of a recipe",
    body: "A computer is powerful but literal. It does not “know what you meant.” You give it steps, in order, the way a recipe lists ingredients and actions. Miss a step or write it unclearly, and the result is wrong — or nothing happens at all.",
  },
  {
    title: "What “code” actually is",
    body: "Code is text written in a programming language (like JavaScript or Python). Humans can read it with practice. Tools called compilers or interpreters turn that text into actions the machine can run. You are not talking to the computer in English — you are using a language designed for precise instructions.",
  },
  {
    title: "Why people program",
    body: "Because once instructions work, the computer can repeat them fast, without getting tired. That is how banking apps, WhatsApp, maps, games, and hospital systems all run. Someone wrote the rules; the machine executes them millions of times.",
  },
];

export function WhatIsProgrammingLesson() {
  return (
    <>
      <AdeNav />
      <main>
        <article>
          <header className="ade-hero-bg border-b border-white/[0.06] pt-32 pb-14 sm:pt-36 sm:pb-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <a
                href="/learn#free"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white"
              >
                <ArrowLeft className="size-3.5" />
                Back to Learn
              </a>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  Free
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/45">
                  Foundations
                </span>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white/45">
                  Beginner
                </span>
              </div>
              <h1 className="mt-4 text-4xl font-medium tracking-tight text-white sm:text-5xl">
                What is programming?
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[var(--ade-muted)] sm:text-lg">
                A plain-language breakdown for people who have never written a line of code. Try the
                tiny demos as you read — no tools to install.
              </p>
            </div>
          </header>

          <div className="border-b border-white/[0.06] bg-[#0f0f0f] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl space-y-12 px-6 sm:px-8 lg:px-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>

          <section className="border-b border-white/[0.06] bg-[#121212] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                Almost every program does three things
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                Tap each stage. You will see this pattern again in websites, mobile apps, and backends.
              </p>
              <div className="mt-8">
                <ProgramCycleExplorer />
              </div>
            </div>
          </section>

          <section className="border-b border-white/[0.06] bg-[#0f0f0f] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                A tiny example you can run
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                Same idea as real code — get input, process it, show output — without installing anything.
              </p>
              <div className="mt-8">
                <HelloMiniDemo />
              </div>
            </div>
          </section>

          <section className="border-b border-white/[0.06] bg-[#121212] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                What programmers actually do
              </h2>
              <ul className="mt-5 space-y-3 text-base leading-relaxed text-[var(--ade-muted)]">
                <li>
                  <span className="text-white/80">Break problems down</span> — big goals into small
                  steps a computer can handle.
                </li>
                <li>
                  <span className="text-white/80">Write and test</span> — try something, see what
                  breaks, fix it, try again.
                </li>
                <li>
                  <span className="text-white/80">Read other code</span> — most of the job is
                  understanding existing instructions, not inventing everything from scratch.
                </li>
                <li>
                  <span className="text-white/80">Use tools (including AI)</span> — helpers can
                  suggest code, but you still decide if it is correct and safe.
                </li>
              </ul>
            </div>
          </section>

          <section className="border-b border-white/[0.06] bg-[#0f0f0f] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                What you should take away
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                Programming is not magic and it is not only for “math geniuses.” It is the skill of
                turning a goal into precise steps a machine can run. Languages and frameworks come
                later. The habit of thinking in steps starts now.
              </p>
            </div>
          </section>

          <section className="bg-[#121212] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
                Next
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                How software works
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                Next free foundation: apps, servers, databases, and how the pieces talk to each
                other. Then apply when you are ready for a full path.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/learn/how-software-works"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90"
                >
                  Next: How software works
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="/learn#apply"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
                >
                  Apply to learn
                </a>
              </div>
            </div>
          </section>
        </article>
      </main>
      <AdeFooter />
    </>
  );
}
