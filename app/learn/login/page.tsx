import type { Metadata } from "next";
import { AdeFooter } from "@/components/ade/AdeFooter";
import { AdeNav } from "@/components/ade/AdeNav";
import { LoginForm } from "@/components/platform/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function LearnLoginPage() {
  return (
    <>
      <AdeNav />
      <main className="min-h-[70vh] border-b border-white/[0.06] bg-[var(--ade-bg)] pt-32 pb-16">
        <div className="mx-auto max-w-md px-6">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--ade-accent)]">
            Learn
          </p>
          <LoginForm />
        </div>
      </main>
      <AdeFooter />
    </>
  );
}
