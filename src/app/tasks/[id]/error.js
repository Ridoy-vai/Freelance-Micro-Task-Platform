'use client';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <section className="flex min-h-[80vh] items-center justify-center bg-ink px-6">
            <div className="text-center">
                <AlertTriangle size={64} className="mx-auto mb-6 text-signal/70" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
                    Something went wrong
                </span>
                <h1 className="mt-3 font-display text-4xl text-paper sm:text-5xl">
                    An Error Occurred
                </h1>
                <p className="mx-auto mt-4 max-w-md text-paper/60">
                    {error?.message || "Something unexpected happened. Please try again."}
                </p>
                <div className="mt-8 flex justify-center gap-3">
                    <button
                        onClick={() => reset()}
                        className="rounded-xl border border-white/15 bg-signal px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-signal/90"
                    >
                        Try again
                    </button>

                    <Link
                        href="/"
                        className="rounded-xl border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-white/[0.06]"
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </section>
    );
}