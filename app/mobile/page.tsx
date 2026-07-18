import type { Metadata } from "next";
import { AdeSubpage } from "@/components/ade/AdeSubpage";

export const metadata: Metadata = {
  title: "Mobile — Android & iOS — Risoor",
  description:
    "Native and cross-platform Android and iOS apps for Google Play and the App Store.",
};

export default function MobilePage() {
  return (
    <AdeSubpage
      eyebrow="Mobile"
      title="Android & iOS apps built to ship"
      lead="We design and build mobile products for Google Play and the App Store — native feel, solid backends, and a release process that doesn’t leave you guessing."
      features={[
        {
          title: "Android apps",
          desc: "Play Store builds with modern UX patterns, notifications, and device support.",
        },
        {
          title: "iOS apps",
          desc: "App Store ready experiences with polished navigation and platform conventions.",
        },
        {
          title: "Cross-platform",
          desc: "Shared codebases when it makes sense — without sacrificing feel on either OS.",
        },
        {
          title: "Shared backends",
          desc: "One API powering web and mobile so features stay in sync across screens.",
        },
        {
          title: "Offline & sync",
          desc: "Resilient data flows for real-world networks, not just perfect wifi demos.",
        },
        {
          title: "Store launch",
          desc: "Listings, screenshots guidance, and submission support through approval.",
        },
      ]}
      sections={[
        {
          title: "Platform-aware design",
          body: "Android and iOS each have their own patterns. We respect those conventions while keeping your brand consistent — so the app feels at home on every device.",
        },
        {
          title: "From prototype to production",
          body: "Clickable prototypes first, then iterative builds with TestFlight / internal testing. You see progress early and often before public release.",
        },
        {
          title: "After you launch",
          body: "Crash monitoring, OS updates, and feature roadmaps. Mobile isn’t done at v1.0 — we stay with you as usage grows.",
        },
      ]}
    />
  );
}
