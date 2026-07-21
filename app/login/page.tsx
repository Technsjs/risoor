import type { Metadata } from "next";
import { LoginForm } from "@/components/platform/LoginForm";
import { PlatformShell } from "@/components/platform/PlatformShell";

export const metadata: Metadata = {
  title: "Platform login",
};

export default function LoginPage() {
  return (
    <PlatformShell>
      <LoginForm />
    </PlatformShell>
  );
}
