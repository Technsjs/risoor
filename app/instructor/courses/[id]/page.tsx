import type { Metadata } from "next";
import { InstructorCourseDetail } from "@/components/platform/InstructorCourseDetail";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "Course",
};

export default async function InstructorCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PlatformShell>
      <RequireRole role="instructor">
        <InstructorCourseDetail courseId={id} />
      </RequireRole>
    </PlatformShell>
  );
}
