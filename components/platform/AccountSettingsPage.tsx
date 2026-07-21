"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/platform/auth/mock-auth";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none focus:border-[var(--ade-accent)]";

export function AccountSettingsPage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-medium text-white">Settings</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">
        Manage your account. Schedule and cohort data will come from Firebase later.
      </p>

      <section className="mt-10 rounded-2xl border border-white/10 bg-[#1a1a1a] p-6">
        <h2 className="text-lg font-medium text-white">Account</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Name</label>
            <input value={user.name} readOnly className={fieldClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Email</label>
            <input value={user.email} readOnly className={fieldClass} />
          </div>
          <div>
            <label className="mb-1.5 block text-xs text-white/50">Role</label>
            <input value={user.role} readOnly className={`${fieldClass} capitalize`} />
          </div>
        </div>
        <button
          type="button"
          onClick={logout}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 hover:border-white/25 hover:text-white"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </section>
    </div>
  );
}
