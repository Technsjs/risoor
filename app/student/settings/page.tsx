import type { Metadata } from "next";
import { Suspense } from "react";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { StudentSettingsPage } from "@/components/platform/StudentSettingsPage";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "Settings",
};

export default function StudentSettingsRoute() {
  return (
    <PlatformShell>
      <RequireRole role="student">
        <Suspense
          fallback={
            <p className="text-sm text-white/50">Loading settings…</p>
          }
        >
          <StudentSettingsPage />
        </Suspense>
      </RequireRole>
    </PlatformShell>
  );
}
