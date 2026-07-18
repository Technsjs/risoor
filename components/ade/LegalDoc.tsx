import { AdeFooter } from "@/components/ade/AdeFooter";
import { AdeNav } from "@/components/ade/AdeNav";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalDocProps = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalDoc({ eyebrow, title, updated, intro, sections }: LegalDocProps) {
  return (
    <>
      <AdeNav />
      <main>
        <header className="ade-hero-bg border-b border-white/[0.06] pt-32 pb-14 sm:pt-36 sm:pb-16">
          <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-medium tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-sm text-white/40">Last updated: {updated}</p>
            <p className="mt-5 text-base leading-relaxed text-[var(--ade-muted)] sm:text-lg">
              {intro}
            </p>
          </div>
        </header>

        <div className="bg-[#0f0f0f] py-14 sm:py-16">
          <div className="mx-auto max-w-3xl space-y-12 px-6 sm:px-8 lg:px-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-medium tracking-tight text-white sm:text-2xl">
                  {section.title}
                </h2>
                {section.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 48)}
                    className="mt-3 text-base leading-relaxed text-[var(--ade-muted)]"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--ade-muted)]">
                    {section.bullets.map((b) => (
                      <li key={b.slice(0, 48)}>{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </main>
      <AdeFooter />
    </>
  );
}
