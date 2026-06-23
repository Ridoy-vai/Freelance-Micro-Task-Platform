"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

const RatingWidget = ({ freelancerId, user }) => {
    const router = useRouter();

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



    const clientId = user?.id;
    const clientName = user?.name;

    const handleSubmit = async () => {
        if (rating === 0) return;
      
        if (!user) {
            toast.error("Please login first");
            router.push(`/login?callbackUrl=${window.location.pathname}`);
            return;
        }

        if (user.role !== "client" && user.role !== "admin") {
            setError("Only client can post review");
            toast.error("Only client can post review");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    freelancerId,
                    rating,
                    review,
                    clientId,
                    clientName,
                }),
            });

            if (!response.ok) {
                throw new Error("Review submit failed");
            }

            setSubmitted(true);
            toast.success("Review submitted successfully");

        } catch (err) {
            console.error("Review submit error:", err);
            setError("Review জমা দিতে সমস্যা হয়েছে, আবার চেষ্টা করুন");
            toast.error("Failed to submit review");
        } finally {
            setLoading(false);
        }
    };


    if (submitted) {
        return (
            <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                    <CheckCircle2 size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Review Posted!</h3>
                <p className="mt-2 text-sm text-emerald-700">
                    Thanks for sharing your feedback. It helps the community grow.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                    <MessageSquare size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Client Feedback</h3>
            </div>

            <p className="text-sm font-medium text-slate-500">
                Rate your experience with this freelancer
            </p>

            {/* Star Selection */}
            <div className="mt-4 flex items-center justify-between gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="group relative transition-transform duration-200 hover:scale-110"
                    >
                        <Star
                            size={36}
                            className={`transition-all duration-300 ${star <= (hoverRating || rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200 group-hover:text-slate-300"
                                }`}
                        />
                    </button>
                ))}
            </div>

            <div className="mt-6">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Your Comment
                </label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Describe the quality of work..."
                    className="mt-2 min-h-[120px] w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 transition-all placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                />
            </div>

            {error && (
                <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
            )}

            <button
                onClick={handleSubmit}
                disabled={rating === 0 || loading}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg shadow-blue-200"
            >
                {loading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                ) : (
                    <>
                        Submit Review
                        <Send size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                )}
            </button>
        </div>
    );
};

export default RatingWidget;