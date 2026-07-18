import type { Metadata } from "next";
import { HowSoftwareWorksLesson } from "@/components/ade/HowSoftwareWorksLesson";

export const metadata: Metadata = {
  title: "How software works — Learn · Risoor",
  description:
    "A free beginner lesson: frontend, backend, and databases — how the pieces of software talk to each other.",
};

export default function HowSoftwareWorksPage() {
  return <HowSoftwareWorksLesson />;
}
