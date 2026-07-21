import type { Metadata } from "next";
import { InstructorDashboard } from "@/components/platform/InstructorDashboard";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "Instructor",
};

export default function InstructorPage() {
  return (
    <PlatformShell>
      <RequireRole role="instructor">
        <InstructorDashboard />
      </RequireRole>
    </PlatformShell>
  );
}
