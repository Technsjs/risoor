import type { Metadata } from "next";
import { WhatIsProgrammingLesson } from "@/components/ade/WhatIsProgrammingLesson";

export const metadata: Metadata = {
  title: "What is programming? — Learn · Risoor",
  description:
    "A free beginner lesson: what programming is, why code exists, and how programmers think — no prior experience needed.",
};

export default function WhatIsProgrammingPage() {
  return <WhatIsProgrammingLesson />;
}
