import type { Metadata } from "next";
import { InstructorCoursesPage } from "@/components/platform/InstructorCoursesPage";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "Courses",
};

export default function InstructorCoursesRoute() {
  return (
    <PlatformShell>
      <RequireRole role="instructor">
        <InstructorCoursesPage />
      </RequireRole>
    </PlatformShell>
  );
}
