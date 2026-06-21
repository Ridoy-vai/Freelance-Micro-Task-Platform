export default function Loading() {
    return (
        <section className="flex min-h-[80vh] items-center justify-center bg-ink">
            <div className="flex flex-col items-center gap-4">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-paper/10 border-t-signal" />
                <p className="font-mono text-[11px] uppercase tracking-widest text-paper/40">
                    Loading...
                </p>
            </div>
        </section>
    );
}