import { ArrowRight } from "lucide-react";
import { AdeFooter } from "@/components/ade/AdeFooter";
import { AdeNav } from "@/components/ade/AdeNav";

type Section = {
  title: string;
  body: string;
};

type Feature = {
  title: string;
  desc: string;
};

type AdeSubpageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  features: Feature[];
  sections: Section[];
  ctaLabel?: string;
};

export function AdeSubpage({
  eyebrow,
  title,
  lead,
  features,
  sections,
  ctaLabel = "Book a call",
}: AdeSubpageProps) {
  return (
    <>
      <AdeNav />
      <main>
        <section className="ade-hero-bg border-b border-white/[0.06] pt-32 pb-16 sm:pt-36 sm:pb-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
              {eyebrow}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--ade-muted)] sm:text-lg">
              {lead}
            </p>
            <a
              href="/#contact"
              className="ade-cta mt-8"
            >
              <span className="ade-cta-label">{ctaLabel}</span>
              <span className="ade-cta-arrow" aria-hidden>
                <ArrowRight className="size-4" strokeWidth={2.25} />
              </span>
            </a>
          </div>
        </section>

        <section className="border-b border-white/[0.06] bg-[#0f0f0f] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
              What we cover
            </h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <article
                  key={f.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-6"
                >
                  <h3 className="text-base font-medium text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">{f.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {sections.map((section, i) => (
          <section
            key={section.title}
            className={`border-b border-white/[0.06] py-16 sm:py-20 ${
              i % 2 === 0 ? "bg-[#121212]" : "bg-[#0f0f0f]"
            }`}
          >
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4">
                  <span className="font-mono text-xs text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                    {section.title}
                  </h2>
                </div>
                <p className="text-base leading-relaxed text-[var(--ade-muted)] lg:col-span-8 sm:text-lg">
                  {section.body}
                </p>
              </div>
            </div>
          </section>
        ))}

        <section className="bg-[#121212] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
            <div className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] px-6 py-10 sm:px-10 sm:py-12">
              <h2 className="text-2xl font-medium text-white sm:text-3xl">
                Ready to start?
              </h2>
              <p className="mt-3 max-w-lg text-sm text-[var(--ade-muted)]">
                Share your goals and we&apos;ll map a clear path across design and engineering.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90"
                >
                  Contact us
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="/"
                  className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/30 hover:text-white"
                >
                  Back home
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AdeFooter />
    </>
  );
}
