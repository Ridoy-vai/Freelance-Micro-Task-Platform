import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
    return (
        <section className="flex min-h-[80vh] items-center justify-center bg-ink px-6">
            <div className="text-center">
                <FileQuestion size={64} className="mx-auto mb-6 text-paper/40" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
                    Error 404
                </span>
                <h1 className="mt-3 font-display text-4xl text-paper sm:text-5xl">
                    Page Not Found
                </h1>
                <p className="mx-auto mt-4 max-w-md text-paper/60">
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                </p>
                <Link
                    href="/"
                    className="mt-8 inline-block rounded-xl border border-white/15 bg-signal px-6 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-signal/90"
                >
                    Go back home
                </Link>
            </div>
        </section>
    );
}