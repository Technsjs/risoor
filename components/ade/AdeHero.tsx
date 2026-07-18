import { ArrowRight } from "lucide-react";

const offerings = [
  { n: "1", label: "Custom Software", href: "/#software" },
  { n: "2", label: "Web Platforms", href: "/web" },
  { n: "3", label: "Android Apps", href: "/mobile" },
  { n: "4", label: "iOS Apps", href: "/mobile" },
];

export function AdeHero() {
  return (
    <section className="relative min-h-[92svh] overflow-hidden bg-black">
      {/* Soft base — dark with subtle depth */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 70% 45%, rgba(20,20,20,1) 0%, #000 70%)",
        }}
      />

      {/* Cinematic light streaks — placed like the reference (mid-right → bottom), kept restrained */}
      <div className="ade-hero-streaks pointer-events-none absolute inset-0" aria-hidden>
        <div className="ade-streak ade-streak-a" />
        <div className="ade-streak ade-streak-b" />
        <div className="ade-streak ade-streak-c" />
      </div>

      {/* Left vignette so headline stays readable */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.35)_45%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45)_0%,transparent_35%,transparent_65%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-6xl flex-col px-6 pb-24 pt-32 sm:px-8 lg:px-10 lg:pt-36">
        <div className="grid flex-1 items-end gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <a href="#contact" className="ade-cta ade-fade-up">
              <span className="ade-cta-label">Book a call</span>
              <span className="ade-cta-arrow" aria-hidden>
                <ArrowRight className="size-4" strokeWidth={2.25} />
              </span>
            </a>

            <h1 className="ade-fade-up ade-fade-up-delay-1 mt-8 max-w-xl text-4xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]">
              Elevate brands
              <br />
              through bold
              <br />
              software
            </h1>

            <p className="ade-fade-up ade-fade-up-delay-2 mt-6 max-w-md text-base leading-relaxed text-white/55">
              Custom software, web platforms, Android and iOS — designed and engineered with clarity.
            </p>
          </div>

          <div className="ade-fade-up ade-fade-up-delay-3 lg:col-span-5 lg:justify-self-end lg:w-full lg:max-w-sm">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
              What we do
            </p>
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {offerings.map((item) => (
                <li key={item.n} className="ade-list-item">
                  <a
                    href={item.href}
                    className="ade-service-row flex items-center justify-between gap-6 py-4"
                  >
                    <span className="ade-service-num font-mono text-xs text-white/40">
                      {"{ "}
                      {item.n}
                      {" }"}
                    </span>
                    <span className="ade-service-label text-right text-sm font-medium tracking-wide text-white sm:text-[15px]">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] overflow-hidden pb-1">
        <p className="ade-watermark whitespace-nowrap px-2 text-center sm:text-left sm:pl-6 lg:pl-10">
          Risoor
        </p>
      </div>
    </section>
  );
}
