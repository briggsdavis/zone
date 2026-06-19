"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";

// The CMS auth area depends on a live Convex deployment. Until
// NEXT_PUBLIC_CONVEX_URL is configured, the auth provider is not mounted, so
// guard the page rather than calling auth hooks without a provider.
const convexConfigured = !!process.env.NEXT_PUBLIC_CONVEX_URL;

export default function SignInPage() {
  if (!convexConfigured) return <BackendNotice />;
  return <SignInForm />;
}

function BackendNotice() {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 text-center">
      <h1 className="mb-3 text-2xl font-bold tracking-tight">CMS not connected</h1>
      <p className="text-sm text-gray-500">
        Run <code>npx convex dev</code> and set{" "}
        <code>NEXT_PUBLIC_CONVEX_URL</code> to enable sign-in and the admin.
      </p>
    </main>
  );
}

function SignInForm() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    formData.set("flow", flow);
    try {
      await signIn("password", formData);
      router.push("/admin");
    } catch {
      setError(
        flow === "signIn"
          ? "Could not sign in. Check your email and password."
          : "Could not sign up. The email may already be in use.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">
        {flow === "signIn" ? "Sign in" : "Create an account"}
      </h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-black px-3 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          {submitting
            ? "…"
            : flow === "signIn"
              ? "Sign in"
              : "Sign up"}
        </button>
      </form>

      <button
        onClick={() => {
          setError(null);
          setFlow(flow === "signIn" ? "signUp" : "signIn");
        }}
        className="mt-6 text-sm text-gray-500 hover:underline"
      >
        {flow === "signIn"
          ? "Need an account? Sign up"
          : "Already have an account? Sign in"}
      </button>
    </main>
  );
}
