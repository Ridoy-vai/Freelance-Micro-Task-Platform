"use client";

import { useState } from "react";

/**
 * app/register/page.jsx
 *
 * UI-only version — no Better Auth wired in.
 * Fields: Name, Email, Image URL, Password, role (Client / Freelancer).
 * Password rules are validated live in the UI (6+ chars, uppercase,
 * lowercase) but submission just console.logs the form data.
 *
 * Replace the TODO blocks with real Better Auth calls when ready:
 *   await authClient.signUp.email({ name, email, image, password, role })
 *   await authClient.signIn.social({ provider: "google" })  // always -> client
 */

const PASSWORD_RULES = [
  { id: "length", label: "At least 6 characters", test: (pw) => pw.length >= 6 },
  { id: "uppercase", label: "At least one capital letter", test: (pw) => /[A-Z]/.test(pw) },
  { id: "lowercase", label: "At least one lowercase letter", test: (pw) => /[a-z]/.test(pw) },
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    role: "client",
  });
  const [touchedPassword, setTouchedPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordValid = PASSWORD_RULES.every((rule) => rule.test(form.password));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setTouchedPassword(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordValid) {
      setTouchedPassword(true);
      return;
    }

    setIsSubmitting(true);

    // TODO: replace with Better Auth
    // const { data, error } = await authClient.signUp.email({
    //   name: form.name,
    //   email: form.email,
    //   image: form.image || undefined,
    //   password: form.password,
    //   role: form.role,
    // });
    console.log("Register submitted:", form);

    setIsSubmitting(false);
  };

  const handleGoogleSignup = () => {
    // TODO: replace with Better Auth
    // await authClient.signIn.social({ provider: "google", callbackURL: "/auth/redirect" });
    // Note: Google sign-up should always be saved as role "client" server-side.
    console.log("Google signup clicked — always becomes role: client");
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
            Join the platform
          </span>
          <h1 className="mt-2 font-display text-3xl text-paper">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-paper/50">
            Already have one?{" "}
            <a href="/login" className="font-semibold text-signal hover:underline">
              Log in
            </a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-paper/80">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none"
              placeholder="Your full name"
            />
          </div>

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
            <label htmlFor="image" className="mb-1.5 block text-sm font-medium text-paper/80">
              Image URL <span className="text-paper/40">(optional)</span>
            </label>
            <input
              id="image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none"
              placeholder="https://example.com/avatar.jpg"
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
              autoComplete="new-password"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-paper placeholder:text-paper/30 focus:border-signal/50 focus:outline-none"
              placeholder="••••••••"
            />

            {touchedPassword && (
              <ul className="mt-2 space-y-1">
                {PASSWORD_RULES.map((rule) => {
                  const passed = rule.test(form.password);
                  return (
                    <li
                      key={rule.id}
                      className={`flex items-center gap-2 text-xs ${
                        passed ? "text-sage" : "text-paper/40"
                      }`}
                    >
                      <span
                        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] ${
                          passed ? "bg-sage text-ink" : "border border-paper/30"
                        }`}
                      >
                        {passed ? "✓" : ""}
                      </span>
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-paper/80">
              I want to
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  form.role === "client"
                    ? "border-signal/50 bg-signal/10 text-paper"
                    : "border-white/10 bg-white/[0.02] text-paper/60"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="client"
                  checked={form.role === "client"}
                  onChange={handleChange}
                  className="sr-only"
                />
                Hire freelancers
              </label>

              <label
                className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  form.role === "freelancer"
                    ? "border-signal/50 bg-signal/10 text-paper"
                    : "border-white/10 bg-white/[0.02] text-paper/60"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="freelancer"
                  checked={form.role === "freelancer"}
                  onChange={handleChange}
                  className="sr-only"
                />
                Work as a freelancer
              </label>
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-signal py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-paper/30">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
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
          Sign up with Google
        </button>
        <p className="mt-3 text-center text-xs text-paper/30">
          Signing up with Google creates a client account.
        </p>
      </div>
    </section>
  );
}