// app/blocked/page.jsx
import { ShieldOff } from "lucide-react";

export default function BlockedPage() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-ink px-6 py-16">
            <div className="w-full max-w-sm text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                    <ShieldOff size={28} className="text-red-400" />
                </div>

                <h1 className="font-display text-2xl text-paper">
                    আপনার অ্যাকাউন্ট ব্লক করা হয়েছে
                </h1>

                <p className="mt-3 text-sm text-paper/60 leading-relaxed">
                    নীতি লঙ্ঘনের কারণে আপনার অ্যাকাউন্ট অ্যাডমিন কর্তৃক সাময়িকভাবে
                    স্থগিত করা হয়েছে। আপনি যদি মনে করেন এটি ভুল হয়েছে, তাহলে
                    সাপোর্ট টিমের সাথে যোগাযোগ করুন।
                </p>

                <a
                    href="mailto:support@tasknest.com"
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-signal px-6 py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                    Contact Support
                </a>

                <p className="mt-4">
                    <a href="/login" className="text-sm text-paper/40 hover:text-paper/60">
                        Login page-এ ফিরে যান
                    </a>
                </p>
            </div>
        </section>
    );
}