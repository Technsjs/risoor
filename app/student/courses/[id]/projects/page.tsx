import type { Metadata } from "next";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { ProjectPicker } from "@/components/platform/ProjectPicker";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function StudentProjectsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PlatformShell>
      <RequireRole role="student">
        <ProjectPicker courseId={id} />
      </RequireRole>
    </PlatformShell>
  );
}
