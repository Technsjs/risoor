import type { Metadata } from "next";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { StudentDashboard } from "@/components/platform/StudentDashboard";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "Student",
};

export default function StudentPage() {
  return (
    <PlatformShell>
      <RequireRole role="student">
        <StudentDashboard />
      </RequireRole>
    </PlatformShell>
  );
}
