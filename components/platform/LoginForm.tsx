"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/platform/auth/mock-auth";
import { DEMO_ACCOUNTS } from "@/lib/platform/seed-data";
import { dashboardPathForRole } from "@/lib/platform/types";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-[#0f0f0f] px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[var(--ade-accent)] focus:ring-1 focus:ring-[var(--ade-accent)]";

export function LoginForm() {
  const { login, user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      router.replace(dashboardPathForRole(user.role));
    }
  }, [user, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = login(email, password);
    if (msg) {
      setError(msg);
      return;
    }
    setError("");
    const match = DEMO_ACCOUNTS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    router.push(match ? dashboardPathForRole(match.role) : "/student");
  }

  function fillDemo(role: "admin" | "instructor" | "student") {
    if (role === "admin") {
      setEmail("admin@risoor.demo");
    } else if (role === "instructor") {
      setEmail("instructor@risoor.demo");
    } else {
      setEmail("student1@risoor.demo");
    }
    setPassword("demo");
    setError("");
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-2xl font-medium text-white">Platform login</h1>
      <p className="mt-2 text-sm text-[var(--ade-muted)]">
        Sign in as a student or instructor. Demo accounts use password{" "}
        <code className="text-white/70">demo</code>.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs text-white/50">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs text-white/50">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
            placeholder="••••••"
            required
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-full bg-white py-2.5 text-sm font-semibold text-[#0f0f0f] transition-opacity hover:opacity-90"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => fillDemo("admin")}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:border-white/25 hover:text-white"
        >
          Fill admin demo
        </button>
        <button
          type="button"
          onClick={() => fillDemo("instructor")}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:border-white/25 hover:text-white"
        >
          Fill instructor demo
        </button>
        <button
          type="button"
          onClick={() => fillDemo("student")}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:border-white/25 hover:text-white"
        >
          Fill student demo
        </button>
      </div>

      <p className="mt-8 text-center text-xs text-white/40">
        <Link href="/learn" className="hover:text-white/60">
          ← Back to Learn catalog
        </Link>
      </p>
    </div>
  );
}
