import type { Metadata } from "next";
import { AccountSettingsPage } from "@/components/platform/AccountSettingsPage";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "Settings",
};

export default function AdminSettingsRoute() {
  return (
    <PlatformShell>
      <RequireRole role="admin">
        <AccountSettingsPage />
      </RequireRole>
    </PlatformShell>
  );
}
