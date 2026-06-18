"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

/**
 * app/login/page.jsx
 *
 * UI-only version — no Better Auth wired in.
 * Both the email/password submit and the Google button just
 * console.log the data for now. Replace the two TODO blocks below
 * with your actual Better Auth calls when you're ready.
 */

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: replace with Better Auth
    const { data, error } = await authClient.signIn.email({
      email: form.email, // required
      password: form.password, // required
      rememberMe: true,
      callbackURL: "/",
    });
    console.log("Login submitted:", form);

    setIsSubmitting(false);
  };

  const handleGoogleLogin = () => {
    // TODO: replace with Better Auth
    // await authClient.signIn.social({ provider: "google", callbackURL: "/auth/redirect" });
    console.log("Google login clicked");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
            Welcome back
          </span>
          <h1 className="mt-2 font-display text-3xl text-paper">Log in</h1>
          <p className="mt-2 text-sm text-paper/50">
            New here?{" "}
            <a href="/register" className="font-semibold text-signal hover:underline">
              Create an account
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-paper/80">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-paper/80">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-signal py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Logging in…" : "Log in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-paper/30">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/[0.02] py-3 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-white/[0.06] hover:border-white/25"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.67-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0012 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.1A6.6 6.6 0 015.5 12c0-.73.12-1.43.34-2.1V7.06H2.18A10.99 10.99 0 001 12c0 1.77.42 3.45 1.18 4.94l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </section>
  );
}