"use client";

import { authClient } from "@/lib/auth-client";
import { Briefcase, Building2, Eye, EyeOff, Sparkles, TriangleAlert, Upload, X, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const FREELANCER_CATEGORIES = [
    "Graphic Design",
    "Web Development",
    "Writing & Translation",
    "Digital Marketing",
    "Video & Animation",
    "Other",
];

const inputClass =
    "w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-3 text-sm text-paper placeholder:text-paper/30 transition-colors duration-150 focus:border-signal focus:bg-paper/[0.06] focus:outline-none focus:ring-2 focus:ring-signal/20";

const errorInputClass = "border-rose-500/60 focus:border-rose-500 focus:ring-rose-500/20";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

function FieldError({ message }) {
    if (!message) return null;
    return <p className="mt-1.5 text-xs text-rose-400">{message}</p>;
}

export default function RegisterPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            image: "",
            password: "",
            role: "client",
            title: "",
            category: "",
            hourlyRate: "",
            location: "",
            skills: "",
            bio: "",
            companyName: "",
            industry: "",
            companyWebsite: "",
        },
    });

    const role = watch("role");
    const password = watch("password");
    const isFreelancer = role === "freelancer";
    const isClient = role === "client";

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!IMGBB_API_KEY) {
            setFormError("Image upload configured nai. NEXT_PUBLIC_IMGBB_API_KEY set koro.");
            return;
        }

        setIsUploadingImage(true);
        setFormError("");

        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (!data?.success) {
                throw new Error(data?.error?.message || "Image upload failed");
            }

            const imageUrl = data.data.url;
            setValue("image", imageUrl, { shouldValidate: true });
            setImagePreview(imageUrl);
        } catch (error) {
            console.error("Image upload error:", error);
            setFormError("ছবি আপলোড করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const removeImage = () => {
        setValue("image", "");
        setImagePreview("");
    };

    const onSubmit = async (formValues) => {
        setFormError("");
        setIsSubmitting(true);

        const basePayload = {
            name: formValues.name,
            email: formValues.email,
            password: formValues.password,
            image: formValues.image || undefined,
            role: formValues.role,
            callbackURL: "/",
        };

        const roleFields = isFreelancer
            ? {
                  title: formValues.title,
                  category: formValues.category,
                  hourlyRate: formValues.hourlyRate ? Number(formValues.hourlyRate) : undefined,
                  location: formValues.location,
                  skills: formValues.skills
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  bio: formValues.bio,
              }
            : {
                  companyName: formValues.companyName,
                  industry: formValues.industry,
                  companyWebsite: formValues.companyWebsite || undefined,
              };

        const { data, error } = await authClient.signUp.email({
            ...basePayload,
            ...roleFields,
        });

        setIsSubmitting(false);

        if (error) {
            setFormError(error.message || "Something went wrong while creating your account.");
            return;
        }

        router.push("/");
    };

    const handleGoogleSignup = () => {
        console.log("Google signup clicked — always becomes role: client");
    };

    return (
        <section className="relative min-h-screen overflow-hidden bg-ink px-4 py-12 sm:px-6 sm:py-16">
            <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-signal/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sage/10 blur-[100px]" />

            <div className="relative mx-auto w-full max-w-4xl">
                <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-sage">
                        <Sparkles className="h-3.5 w-3.5" />
                        Join the platform
                    </span>
                    <h1 className="mt-3 font-display text-3xl text-paper sm:text-4xl">
                        Create your account
                    </h1>
                    <p className="mt-2 text-sm text-paper/50">
                        Already have one?{" "}
                        <a href="/login" className="font-semibold text-signal hover:underline">
                            Log in
                        </a>
                    </p>
                </div>

                <div className="mt-10 rounded-3xl border border-paper/10 bg-gradient-to-b from-paper/[0.04] to-transparent p-5 shadow-2xl shadow-black/40 sm:p-8">
                    {formError && (
                        <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                            <TriangleAlert className="mt-0.5 h-4 w-4 flex-shrink-0 text-rose-400" />
                            <p>{formError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
                            {/* Left column — base account fields */}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-paper/80">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        autoComplete="name"
                                        className={`${inputClass} ${errors.name ? errorInputClass : ""}`}
                                        placeholder="Your full name"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    <FieldError message={errors.name?.message} />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-paper/80">
                                        Email
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

                                {/* 👇 Image upload — URL input theke file upload e bodla hoyeche */}
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-paper/80">
                                        Profile photo <span className="text-paper/40">(optional)</span>
                                    </label>

                                    {imagePreview ? (
                                        <div className="flex items-center gap-3 rounded-xl border border-paper/10 bg-paper/[0.04] p-3">
                                            <img
                                                src={imagePreview}
                                                alt="Profile preview"
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                            <span className="flex-1 truncate text-xs text-paper/50">
                                                Image uploaded
                                            </span>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="flex h-7 w-7 items-center justify-center rounded-lg text-paper/40 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                                                aria-label="Remove image"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="imageUpload"
                                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-paper/15 bg-paper/[0.02] px-4 py-3.5 text-sm text-paper/50 transition-colors hover:border-signal/40 hover:bg-paper/[0.04] hover:text-paper/70"
                                        >
                                            {isUploadingImage ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Uploading…
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="h-4 w-4" />
                                                    Click to upload an image
                                                </>
                                            )}
                                            <input
                                                id="imageUpload"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                                disabled={isUploadingImage}
                                            />
                                        </label>
                                    )}
                                    {/* hidden field jeta react-hook-form e value hold kore */}
                                    <input type="hidden" {...register("image")} />
                                </div>

                                <div>
                                    <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-paper/80">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="new-password"
                                            className={`${inputClass} pr-11 ${errors.password ? errorInputClass : ""}`}
                                            placeholder="••••••••"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: { value: 6, message: "At least 6 characters" },
                                                validate: {
                                                    hasUppercase: (value) =>
                                                        /[A-Z]/.test(value) || "Needs one capital letter",
                                                    hasLowercase: (value) =>
                                                        /[a-z]/.test(value) || "Needs one lowercase letter",
                                                },
                                            })}
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

                                    {password && (
                                        <ul className="mt-2.5 space-y-1.5">
                                            {[
                                                { id: "length", label: "At least 6 characters", passed: password.length >= 6 },
                                                { id: "uppercase", label: "At least one capital letter", passed: /[A-Z]/.test(password) },
                                                { id: "lowercase", label: "At least one lowercase letter", passed: /[a-z]/.test(password) },
                                            ].map((rule) => (
                                                <li
                                                    key={rule.id}
                                                    className={`flex items-center gap-2 text-xs transition-colors ${
                                                        rule.passed ? "text-sage" : "text-paper/40"
                                                    }`}
                                                >
                                                    <span
                                                        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] transition-colors ${
                                                            rule.passed ? "bg-sage text-ink" : "border border-paper/25"
                                                        }`}
                                                    >
                                                        {rule.passed ? "✓" : ""}
                                                    </span>
                                                    {rule.label}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>

                                {/* 👇 Role select — checkmark icon jukto kora hoyeche selected card e */}
                                <fieldset>
                                    <legend className="mb-2 block text-sm font-medium text-paper/80">
                                        I want to
                                    </legend>
                                    <div className="grid grid-cols-2 gap-3">
                                        <label
                                            className={`relative flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-4 py-3.5 text-center text-sm font-medium transition-all duration-150 ${
                                                role === "client"
                                                    ? "border-signal bg-signal/10 text-paper shadow-[0_0_0_1px_theme(colors.signal/30)]"
                                                    : "border-paper/10 bg-paper/[0.02] text-paper/55 hover:border-paper/20 hover:bg-paper/[0.04]"
                                            }`}
                                        >
                                            {role === "client" && (
                                                <CheckCircle2 className="absolute right-2 top-2 h-4 w-4 text-signal" />
                                            )}
                                            <input type="radio" value="client" className="sr-only" {...register("role")} />
                                            <Building2
                                                className={`h-4 w-4 ${role === "client" ? "text-signal" : "text-paper/40"}`}
                                            />
                                            Hire freelancers
                                        </label>

                                        <label
                                            className={`relative flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border px-4 py-3.5 text-center text-sm font-medium transition-all duration-150 ${
                                                role === "freelancer"
                                                    ? "border-signal bg-signal/10 text-paper shadow-[0_0_0_1px_theme(colors.signal/30)]"
                                                    : "border-paper/10 bg-paper/[0.02] text-paper/55 hover:border-paper/20 hover:bg-paper/[0.04]"
                                            }`}
                                        >
                                            {role === "freelancer" && (
                                                <CheckCircle2 className="absolute right-2 top-2 h-4 w-4 text-signal" />
                                            )}
                                            <input type="radio" value="freelancer" className="sr-only" {...register("role")} />
                                            <Briefcase
                                                className={`h-4 w-4 ${role === "freelancer" ? "text-signal" : "text-paper/40"}`}
                                            />
                                            Work as a freelancer
                                        </label>
                                    </div>
                                </fieldset>
                            </div>

                            {/* Right column — role-specific fields (অপরিবর্তিত) */}
                            <div className="space-y-4">
                                {isFreelancer && (
                                    <div className="space-y-4 rounded-2xl border border-sage/20 bg-sage/[0.04] p-4 sm:p-5">
                                        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-sage">
                                            <Briefcase className="h-3 w-3" />
                                            Freelancer details
                                        </p>

                                        <div>
                                            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-paper/80">
                                                Professional title
                                            </label>
                                            <input
                                                id="title"
                                                type="text"
                                                className={`${inputClass} ${errors.title ? errorInputClass : ""}`}
                                                placeholder="e.g. Frontend Developer"
                                                {...register("title", {
                                                    required: isFreelancer ? "Title is required" : false,
                                                })}
                                            />
                                            <FieldError message={errors.title?.message} />
                                        </div>

                                        <div>
                                            <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-paper/80">
                                                Category
                                            </label>
                                            <select
                                                id="category"
                                                className={`${inputClass} appearance-none ${errors.category ? errorInputClass : ""}`}
                                                defaultValue=""
                                                {...register("category", {
                                                    required: isFreelancer ? "Pick a category" : false,
                                                })}
                                            >
                                                <option value="" disabled className="bg-ink">
                                                    Select a category
                                                </option>
                                                {FREELANCER_CATEGORIES.map((cat) => (
                                                    <option key={cat} value={cat} className="bg-ink">
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                            <FieldError message={errors.category?.message} />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label htmlFor="hourlyRate" className="mb-1.5 block text-sm font-medium text-paper/80">
                                                    Hourly rate ($)
                                                </label>
                                                <input
                                                    id="hourlyRate"
                                                    type="number"
                                                    min="0"
                                                    className={`${inputClass} ${errors.hourlyRate ? errorInputClass : ""}`}
                                                    placeholder="25"
                                                    {...register("hourlyRate", {
                                                        required: isFreelancer ? "Required" : false,
                                                        min: { value: 0, message: "Must be 0 or more" },
                                                    })}
                                                />
                                                <FieldError message={errors.hourlyRate?.message} />
                                            </div>

                                            <div>
                                                <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-paper/80">
                                                    Location
                                                </label>
                                                <input
                                                    id="location"
                                                    type="text"
                                                    className={`${inputClass} ${errors.location ? errorInputClass : ""}`}
                                                    placeholder="City, Country"
                                                    {...register("location", {
                                                        required: isFreelancer ? "Required" : false,
                                                    })}
                                                />
                                                <FieldError message={errors.location?.message} />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="skills" className="mb-1.5 block text-sm font-medium text-paper/80">
                                                Skills <span className="text-paper/40">(comma separated)</span>
                                            </label>
                                            <input
                                                id="skills"
                                                type="text"
                                                className={inputClass}
                                                placeholder="React, Node.js, Figma"
                                                {...register("skills")}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-paper/80">
                                                Bio <span className="text-paper/40">(optional)</span>
                                            </label>
                                            <textarea
                                                id="bio"
                                                rows={3}
                                                className={`${inputClass} resize-none`}
                                                placeholder="Tell clients a bit about yourself"
                                                {...register("bio")}
                                            />
                                        </div>
                                    </div>
                                )}

                                {isClient && (
                                    <div className="space-y-4 rounded-2xl border border-signal/20 bg-signal/[0.04] p-4 sm:p-5">
                                        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-signal">
                                            <Building2 className="h-3 w-3" />
                                            Company details
                                        </p>

                                        <div>
                                            <label htmlFor="companyName" className="mb-1.5 block text-sm font-medium text-paper/80">
                                                Company name
                                            </label>
                                            <input
                                                id="companyName"
                                                type="text"
                                                className={`${inputClass} ${errors.companyName ? errorInputClass : ""}`}
                                                placeholder="Your company name"
                                                {...register("companyName", {
                                                    required: isClient ? "Company name is required" : false,
                                                })}
                                            />
                                            <FieldError message={errors.companyName?.message} />
                                        </div>

                                        <div>
                                            <label htmlFor="industry" className="mb-1.5 block text-sm font-medium text-paper/80">
                                                Industry
                                            </label>
                                            <input
                                                id="industry"
                                                type="text"
                                                className={`${inputClass} ${errors.industry ? errorInputClass : ""}`}
                                                placeholder="e.g. E-commerce, Healthcare"
                                                {...register("industry", {
                                                    required: isClient ? "Industry is required" : false,
                                                })}
                                            />
                                            <FieldError message={errors.industry?.message} />
                                        </div>

                                        <div>
                                            <label htmlFor="companyWebsite" className="mb-1.5 block text-sm font-medium text-paper/80">
                                                Company website <span className="text-paper/40">(optional)</span>
                                            </label>
                                            <input
                                                id="companyWebsite"
                                                type="url"
                                                className={inputClass}
                                                placeholder="https://yourcompany.com"
                                                {...register("companyWebsite")}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || !isValid || isUploadingImage}
                            className="mt-7 w-full rounded-xl bg-signal py-3 text-sm font-semibold text-ink shadow-lg shadow-signal/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-signal/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                        >
                            {isSubmitting ? "Creating account…" : "Create account"}
                        </button>
                    </form>

                    <div className="mx-auto mt-7 max-w-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-px flex-1 bg-paper/10" />
                            <span className="text-xs text-paper/30">or</span>
                            <div className="h-px flex-1 bg-paper/10" />
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignup}
                            className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-paper/15 bg-paper/[0.02] py-3 text-sm font-semibold text-paper transition-colors duration-200 hover:border-paper/25 hover:bg-paper/[0.06]"
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
                </div>
            </div>
        </section>
    );
}