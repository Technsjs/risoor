import { ArrowLeft, ArrowRight } from "lucide-react";
import { AdeFooter } from "@/components/ade/AdeFooter";
import { AdeNav } from "@/components/ade/AdeNav";
import {
  SoftwarePartsExplorer,
  SoftwareRequestWalkthrough,
} from "@/components/ade/SoftwareWorksInteractive";

const sections = [
  {
    title: "In one sentence",
    body: "Most software is not one file — it is a few parts working together: what you see, the rules behind the scenes, and a place to store lasting information.",
  },
  {
    title: "A restaurant analogy",
    body: "You sit in the dining room (frontend), the kitchen cooks (backend), and the storeroom holds ingredients and receipts (database). You never walk into the kitchen yourself — you place an order, and a reply comes back.",
  },
];

export function HowSoftwareWorksLesson() {
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
                How software works
              </h1>
              <p className="mt-5 text-base leading-relaxed text-[var(--ade-muted)] sm:text-lg">
                The big picture: apps, servers, databases, and how they talk — explained for people
                who have never built software.
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
                The three main parts
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                Tap each piece to see what it does. You will meet these names again in every path —
                web, mobile, or backend.
              </p>
              <div className="mt-8">
                <SoftwarePartsExplorer />
              </div>
            </div>
          </section>

          <section className="border-b border-white/[0.06] bg-[#0f0f0f] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                Watch one request move
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                When you use an app, your tap often travels through all three parts and comes back.
                Step through a simple food-order example.
              </p>
              <div className="mt-8">
                <SoftwareRequestWalkthrough />
              </div>
            </div>
          </section>

          <section className="border-b border-white/[0.06] bg-[#121212] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                What this is not (yet)
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                You do not need cloud jargon, Docker, or “microservices” to understand the idea.
                Those are tools teams add later. The foundation is simpler: screen → rules → storage
                → reply.
              </p>
            </div>
          </section>

          <section className="border-b border-white/[0.06] bg-[#0f0f0f] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                What you should take away
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                When someone says “we need a backend” or “save that in the database,” you now know
                roughly what they mean. Paths like Frontend, Mobile, or Full-stack just choose which
                of these parts you learn to build first.
              </p>
            </div>
          </section>

          <section className="bg-[#121212] py-14 sm:py-16">
            <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
                Next
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                Ready for a path?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]">
                Free foundations are done. Apply with a goal — beginner, Flutter, full-stack, AI
                builder, and more — and we&apos;ll help you start.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/learn/what-is-programming"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
                >
                  Previous lesson
                </a>
                <a
                  href="/learn#apply"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90"
                >
                  Apply to learn
                  <ArrowRight className="size-4" />
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
