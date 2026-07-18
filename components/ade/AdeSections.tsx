"use client";

import { ArrowRight, Check, Cloud, Code2, Layers, Mail, MessageCircle, TabletSmartphone } from "lucide-react";
import { useState } from "react";
import { site, whatsappUrl } from "@/lib/site";

export function AdeAbout() {
  return (
    <section id="about" className="border-t border-white/[0.06] bg-[#0f0f0f] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
              About Risoor
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              A product studio for serious builds
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-base leading-relaxed text-[var(--ade-muted)] sm:text-lg">
              We design and ship custom software across web, Android, and iOS. Clear systems,
              thoughtful interfaces, and engineering that holds up in production — inspired by the
              calm structure of Material Design, not flashy trends.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
              {[
                ["Web", "Platforms & SaaS"],
                ["Android", "Play Store ready"],
                ["iOS", "App Store ready"],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-lg font-medium text-white">{k}</p>
                  <p className="mt-1 text-xs text-[var(--ade-muted)]">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AdeSoftware() {
  return (
    <section id="software" className="border-t border-white/[0.06] bg-[#121212] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
          Custom software
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
          Built around your workflow — not someone else&apos;s template
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--ade-muted)] sm:text-base">
          From internal tools to customer-facing products, we engineer systems that match how your
          team actually works.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Code2,
              title: "Bespoke products",
              desc: "Full applications designed and coded for your domain, from MVP to scale.",
            },
            {
              icon: Layers,
              title: "Internal tools",
              desc: "Dashboards, ops panels, and admin systems your team will actually use.",
            },
            {
              icon: Cloud,
              title: "APIs & backends",
              desc: "Secure APIs, databases, and cloud infrastructure shared across platforms.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-6 transition-colors hover:border-white/15"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[var(--ade-accent-dim)] text-[var(--ade-accent)]">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function AdePlatforms() {
  return (
    <section id="platforms" className="border-t border-white/[0.06] bg-[#0f0f0f] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
          Platforms
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
          Explore by surface
        </h2>
        <p className="mt-4 max-w-xl text-sm text-[var(--ade-muted)]">
          Deep dives into how we build for web and mobile.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <a
            href="/web"
            className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-8 transition-all hover:border-[var(--ade-accent)]/40 hover:bg-[#222]"
          >
            <div>
              <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-[var(--ade-accent-dim)] text-[var(--ade-accent)]">
                <Layers className="size-5" />
              </div>
              <h3 className="text-2xl font-medium text-white">Web</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ade-muted)]">
                Marketing sites, SaaS products, dashboards, and progressive web apps — fast,
                accessible, and ready to scale.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--ade-accent)]">
              Open web page
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          <a
            href="/mobile"
            className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-8 transition-all hover:border-[var(--ade-accent)]/40 hover:bg-[#222]"
          >
            <div>
              <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-[var(--ade-accent-dim)] text-[var(--ade-accent)]">
                <TabletSmartphone className="size-5" />
              </div>
              <h3 className="text-2xl font-medium text-white">Mobile</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ade-muted)]">
                Android and iOS apps for Google Play and the App Store — native feel, shared
                backends, release-ready builds.
              </p>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[var(--ade-accent)]">
              Open mobile page
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function AdeCapabilities() {
  const items = [
    ["Product design", "Flows, UI systems, and prototypes before we write production code."],
    ["Full-stack engineering", "Frontend, backend, and cloud — one team owning the whole stack."],
    ["Cross-platform delivery", "Ship web + Android + iOS with shared design and APIs."],
    ["Launch support", "Store submissions, monitoring, and iteration after day one."],
  ];

  return (
    <section id="capabilities" className="border-t border-white/[0.06] bg-[#121212] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
          Capabilities
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
          How we help
        </h2>
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {items.map(([title, desc], i) => (
            <div
              key={title}
              className="grid gap-3 py-7 sm:grid-cols-12 sm:items-center sm:gap-8"
            >
              <span className="font-mono text-xs text-white/30 sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-medium text-white sm:col-span-4">{title}</h3>
              <p className="text-sm text-[var(--ade-muted)] sm:col-span-7">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdeProcess() {
  const steps = [
    { n: "01", title: "Discover", desc: "Goals, users, constraints — define what success looks like." },
    { n: "02", title: "Design", desc: "Structure, UI, and prototypes you can review early." },
    { n: "03", title: "Build", desc: "Iterative engineering with demos you can touch." },
    { n: "04", title: "Launch", desc: "Ship to web, Play Store, and App Store cleanly." },
  ];

  return (
    <section id="process" className="border-t border-white/[0.06] bg-[#0f0f0f] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
          Process
        </p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
          From brief to launch
        </h2>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <article
              key={s.n}
              className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-6"
            >
              <span className="text-xs font-medium text-[var(--ade-accent)]">{s.n}</span>
              <h3 className="mt-3 text-lg font-medium text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ade-muted)]">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AdeWork() {
  const projects = [
    {
      label: "Selected work",
      title: "Retail ops app",
      desc: "Android + web system for stock, sales, and staff — built to run on the shop floor.",
      tags: ["Android", "Web"],
    },
    {
      label: "Selected work",
      title: "SaaS dashboard",
      desc: "Multi-tenant web product with roles, analytics, and a clean admin experience.",
      tags: ["Web"],
    },
    {
      label: "Selected work",
      title: "Consumer iOS app",
      desc: "App Store product with polished UX, shared API, and a release-ready pipeline.",
      tags: ["iOS"],
    },
  ];

  return (
    <section id="work" className="border-t border-white/[0.06] bg-[#121212] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
              Work
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Selected projects
            </h2>
            <p className="mt-3 max-w-lg text-sm text-[var(--ade-muted)]">
              Examples of the kind of products we ship across web, Android, and iOS.
            </p>
          </div>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--ade-accent)] transition-opacity hover:opacity-80"
          >
            Start a project
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-6 transition-colors hover:border-white/15"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/35">
                  {p.label}
                </p>
                <h3 className="mt-3 text-xl font-medium tracking-tight text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ade-muted)]">{p.desc}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  { id: "custom", label: "Custom" },
  { id: "web", label: "Web" },
  { id: "android", label: "Android" },
  { id: "ios", label: "iOS" },
] as const;

export function AdeContact() {
  const [service, setService] = useState<string>("custom");
  const [sent, setSent] = useState(false);
  const wa = whatsappUrl();

  return (
    <section id="contact" className="border-t border-white/[0.06] bg-[#0f0f0f] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Tell us what you&apos;re building
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--ade-muted)]">
              Custom software, web, Android, or iOS. We typically reply within one business day.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#1c1c1c] px-4 py-3.5 transition-colors hover:border-white/15"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--ade-accent-dim)] text-[var(--ade-accent)]">
                  <Mail className="size-4" />
                </span>
                <div>
                  <p className="text-xs text-[var(--ade-muted)]">Email</p>
                  <p className="text-sm font-medium text-white">{site.email}</p>
                </div>
              </a>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#1c1c1c] px-4 py-3.5 transition-colors hover:border-white/15"
                >
                  <span className="flex size-9 items-center justify-center rounded-xl bg-[var(--ade-accent-dim)] text-[var(--ade-accent)]">
                    <MessageCircle className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs text-[var(--ade-muted)]">WhatsApp</p>
                    <p className="text-sm font-medium text-white">Message us directly</p>
                  </div>
                </a>
              ) : null}
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div className="flex flex-col items-start justify-center rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-8 lg:col-span-7">
              <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <Check className="size-5" />
              </span>
              <h3 className="mt-4 text-xl font-medium text-white">Message ready</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--ade-muted)]">
                Thanks — we&apos;ve noted your details. For now, also email{" "}
                <a href={`mailto:${site.email}`} className="text-white/80 underline-offset-2 hover:underline">
                  {site.email}
                </a>{" "}
                so nothing is missed while form delivery is being connected.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-medium text-[var(--ade-accent)] hover:opacity-80"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              className="rounded-2xl border border-white/[0.08] bg-[#1c1c1c] p-6 sm:p-8 lg:col-span-7"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ade-name" className="mb-1.5 block text-xs font-medium text-[var(--ade-muted)]">
                    Name
                  </label>
                  <input
                    id="ade-name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]"
                    placeholder="Alex"
                  />
                </div>
                <div>
                  <label htmlFor="ade-email" className="mb-1.5 block text-xs font-medium text-[var(--ade-muted)]">
                    Email
                  </label>
                  <input
                    id="ade-email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]"
                    placeholder="alex@company.com"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="ade-company" className="mb-1.5 block text-xs font-medium text-[var(--ade-muted)]">
                  Company <span className="text-white/30">(optional)</span>
                </label>
                <input
                  id="ade-company"
                  name="company"
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]"
                  placeholder="Your company"
                />
              </div>

              <div className="mt-5">
                <p className="mb-2.5 text-xs font-medium text-[var(--ade-muted)]">Service</p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Service">
                  {services.map((s) => {
                    const active = service === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setService(s.id)}
                        className={`rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                          active
                            ? "bg-white text-[#0f0f0f]"
                            : "border border-white/10 bg-transparent text-white/70 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="service" value={service} />
              </div>

              <div className="mt-5">
                <label htmlFor="ade-message" className="mb-1.5 block text-xs font-medium text-[var(--ade-muted)]">
                  Message
                </label>
                <textarea
                  id="ade-message"
                  name="message"
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]"
                  placeholder="Tell us about your project..."
                />
              </div>

              <p className="mt-4 text-xs leading-relaxed text-white/35">
                By sending, you agree to our{" "}
                <a href="/privacy" className="text-white/55 underline-offset-2 hover:underline">
                  Privacy Policy
                </a>
                .
              </p>

              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90"
              >
                Send message
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
