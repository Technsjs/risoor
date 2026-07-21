import type { Metadata } from "next";
import { AdminDashboard } from "@/components/platform/AdminDashboard";
import { PlatformShell } from "@/components/platform/PlatformShell";
import { RequireRole } from "@/lib/platform/auth/require-role";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <PlatformShell>
      <RequireRole role="admin">
        <AdminDashboard />
      </RequireRole>
    </PlatformShell>
  );
}
