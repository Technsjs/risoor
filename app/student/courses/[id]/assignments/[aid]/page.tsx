import type { Metadata } from "next";
import { AssignmentFlow } from "@/components/platform/AssignmentFlow";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "Assignment",
};

export default async function StudentAssignmentPage({
  params,
}: {
  params: Promise<{ id: string; aid: string }>;
}) {
  const { id, aid } = await params;
  return (
    <PlatformShell>
      <RequireRole role="student">
        <AssignmentFlow courseId={id} assignmentId={aid} />
      </RequireRole>
    </PlatformShell>
  );
}
