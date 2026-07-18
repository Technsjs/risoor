import type { Metadata } from "next";
import { LearnPage } from "@/components/ade/LearnPage";

export const metadata: Metadata = {
  title: "Learn — Risoor",
  description:
    "Learn programming, web, mobile, backend, and AI-assisted coding. Free foundations to start. Apply to join.",
};

export default function LearnRoute() {
  return <LearnPage />;
}
