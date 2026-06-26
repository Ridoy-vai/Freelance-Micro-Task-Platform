"use client";

import { authClient } from "@/lib/auth-client";
import { GetUserById } from "@/ServerActions/Freelancer";
import { Eye, EyeOff, Sparkles, TriangleAlert, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

// React Toastify
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css';

const inputClass =
    "w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-3 text-sm text-paper placeholder:text-paper/30 transition-colors duration-150 focus:border-signal focus:bg-paper/[0.06] focus:outline-none focus:ring-2 focus:ring-signal/20";

const errorInputClass = "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20";

function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1.5 text-xs text-rose-400">{message}</p>;
}

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async (formValues) => {
        setError("");
        setIsSubmitting(true);

        const callbackUrl =
            typeof window !== "undefined"
                ? new URLSearchParams(window.location.search).get("callbackUrl")
                : null;

        try {
            const { data, error: loginError } = await authClient.signIn.email({
                email: formValues.email,
                password: formValues.password,
                rememberMe: true,
            });

            if (loginError) {
                const errorMsg = loginError.message || "Login failed. Please check your credentials.";
                setError(errorMsg);
                toast.error(errorMsg);
                setIsSubmitting(false);
                return;
            }

            const userId = data?.user?.id;

            if (userId) {
                const userDoc = await GetUserById(userId);

                if (userDoc?.isBlocked) {
                    await authClient.signOut();
                    toast.warning("Access denied. Your account has been blocked.");
                    router.push("/blocked");
                    return;
                } else {
                    toast.success("Welcome back! Login successful.");
                    router.push(callbackUrl || "/");
                    return;
                }
            }

            toast.success("Login successful.");
            router.push(callbackUrl || "/");

        } catch (err) {
            console.error(err);
            const genericError = "Something went wrong. Please try again later.";
            setError(genericError);
            toast.error(genericError);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
            });
        } catch (err) {
            toast.error("Google login failed.");
        }
    };

    return (
        <section className="relative min-h-screen overflow-hidden bg-ink px-4 py-12 sm:px-6 sm:py-16">
            <ToastContainer theme="dark" position="bottom-right" />
            
            {/* Ambient glow accents */}
            <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-signal/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sage/10 blur-[100px]" />

            <div className="relative mx-auto w-full max-w-sm">
                <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-sage">
                        <Sparkles className="h-3.5 w-3.5" />
                        Welcome back
                    </span>
                    <h1 className="mt-3 font-display text-3xl text-paper">Log in</h1>
                    <p className="mt-2 text-sm text-paper/50">
                        New here?{" "}
                        <a href="/register" className="font-semibold text-signal hover:underline">
                            Create an account
                        </a>
                    </p>
                </div>

                <div className="mt-8 rounded-3xl border border-paper/10 bg-gradient-to-b from-paper/[0.04] to-transparent p-5 shadow-2xl shadow-black/40 sm:p-8">
                    {error && (
                        <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                            <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-400" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-paper/80">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                className={`${inputClass} ${errors.email ? errorInputClass : ""}`}
                                placeholder="you@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Enter a valid email address",
                                    },
                                })}
                            />
                            <FieldError message={errors.email?.message} />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-paper/80">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    className={`${inputClass} pr-11 ${errors.password ? errorInputClass : ""}`}
                                    placeholder="Enter your valid password"
                                    {...register("password", { required: "Password is required" })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-paper/40 transition-colors hover:text-signal"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            <FieldError message={errors.password?.message} />

                            <div className="mt-2 text-right">
                                <a href="/forgot-password" className="text-xs font-medium text-paper/40 hover:text-signal transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="flex w-full items-center cursor-pointer bg-blue-600 justify-center gap-2 rounded-xl bg-signal py-3 text-sm font-bold text-ink shadow-lg shadow-signal/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-signal/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Logging in…
                                </>
                            ) : (
                                "Log in"
                            )}
                        </button>
                    </form>

                    <div className="mt-7 flex items-center gap-3">
                        <div className="h-px flex-1 bg-paper/10" />
                        <span className="text-[10px] uppercase tracking-widest text-paper/30">or</span>
                        <div className="h-px flex-1 bg-paper/10" />
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="mt-6 flex w-full items-center justify-center cursor-pointer gap-3 rounded-xl border border-paper/15 bg-paper/[0.02] py-3 text-sm font-semibold text-paper transition-all duration-200 hover:border-paper/25 hover:bg-paper/[0.06] active:scale-[0.98]"
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
            </div>
        </section>
    );
}