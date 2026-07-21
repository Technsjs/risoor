import type { Metadata } from "next";
import { NewAssignmentForm } from "@/components/platform/NewAssignmentForm";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "New assignment",
};

export default async function NewAssignmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <PlatformShell>
      <RequireRole role="instructor">
        <NewAssignmentForm courseId={id} />
      </RequireRole>
    </PlatformShell>
  );
}
