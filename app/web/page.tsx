import type { Metadata } from "next";
import { AdeSubpage } from "@/components/ade/AdeSubpage";

export const metadata: Metadata = {
  title: "Web Platforms — Risoor",
  description:
    "We build marketing sites, SaaS products, dashboards, and progressive web apps.",
};

export default function WebPage() {
  return (
    <AdeSubpage
      eyebrow="Web"
      title="Web platforms that feel fast and stay clear"
      lead="From marketing sites to full SaaS products — we design and engineer web experiences with Material-inspired structure: calm surfaces, clear hierarchy, and performance that holds up."
      features={[
        {
          title: "Marketing & brand sites",
          desc: "Launch pages and company sites that load quickly and convert with intent.",
        },
        {
          title: "SaaS & web apps",
          desc: "Multi-user products with auth, roles, dashboards, and reliable data flows.",
        },
        {
          title: "Admin & ops panels",
          desc: "Internal tools your team can trust — searchable, fast, and easy to extend.",
        },
        {
          title: "Design systems",
          desc: "Reusable UI kits so every new screen stays consistent as you grow.",
        },
        {
          title: "APIs & integrations",
          desc: "Connect payments, CRMs, analytics, and third-party services cleanly.",
        },
        {
          title: "Performance & SEO",
          desc: "Core Web Vitals, accessibility, and technical SEO baked into the build.",
        },
      ]}
      sections={[
        {
          title: "Structure first",
          body: "We start with information architecture and user flows — then move into UI. That keeps pages purposeful and avoids clutter. Every section has one job.",
        },
        {
          title: "Engineering for the real world",
          body: "Modern stacks, typed APIs, and cloud hosting that scales. We build for production: auth, errors, empty states, and the edge cases users actually hit.",
        },
        {
          title: "Ship, measure, improve",
          body: "After launch we help with analytics, feature iterations, and maintenance so your web product keeps pace with the business.",
        },
      ]}
    />
  );
}
