// app/blocked/page.jsx
import { ShieldOff } from "lucide-react";

export const metadata = {
    title: "Account Blocked | TaskNest",
    description: "Access restricted. Your account has been suspended due to a policy violation. Please contact support for more information.",
};

export default function BlockedPage() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
            <div className="w-full max-w-sm text-center">
                {/* Icon Container */}
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 border border-red-500/20">
                    <ShieldOff size={32} className="text-red-400" />
                </div>

                {/* Main Heading */}
                <h1 className="font-display text-2xl text-paper">
                    Your Account has been Blocked
                </h1>

                {/* Descriptive Text */}
                <p className="mt-4 text-sm text-paper/50 leading-relaxed px-2">
                    Access to your account has been temporarily suspended by the administrator
                    due to a violation of our terms and policies. If you believe this is
                    an error, please reach out to our support team.
                </p>

                {/* Support Button */}
                <a
                    href="mailto:support@tasknest.com"
                    className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-signal px-6 py-3.5 text-sm font-bold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-signal/10 active:translate-y-0"
                >
                    Contact Support Team
                </a>

                {/* Secondary Action */}
                <div className="mt-6">
                    <a
                        href="/login"
                        className="text-xs font-semibold uppercase tracking-widest text-paper/30 transition-colors hover:text-paper/60"
                    >
                        Return to Login
                    </a>
                </div>
            </div>
        </section>
    );
}