
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HeroBanner — Task marketplace landing hero
 *
 * Setup:
 * 1. Install fonts (next/font/google) or load via <link> in layout:
 *    Space Grotesk (display), Inter (body), JetBrains Mono (labels)
 * 2. Tailwind config needs the custom colors below (see tailwind.config.js snippet)
 * 3. Drop this component into app/page.jsx or wherever your homepage lives
 */

const TASKS = [
  { tag: "DESIGN", title: "Redesign onboarding flow for fintech app", price: "$420", time: "2h ago" },
  { tag: "WRITING", title: "SEO blog series — 6 posts on sustainable travel", price: "$180", time: "5h ago" },
  { tag: "DEV", title: "Fix cart bug + add Stripe webhook", price: "$95", time: "12m ago" },
  { tag: "VIDEO", title: "Edit 3-min product launch teaser", price: "$260", time: "1h ago" },
  { tag: "DATA", title: "Clean + dedupe 40k row customer CSV", price: "$60", time: "8h ago" },
  { tag: "DEV", title: "Build responsive pricing page in React", price: "$310", time: "34m ago" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function TaskCard({ task, style }) {
  return (
    <div
      className="group rounded-2xl border border-white/10 bg-paper/[0.04] backdrop-blur-sm px-5 py-4 hover:border-signal/40 hover:bg-paper/[0.07] transition-colors duration-300"
      style={style}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="font-mono text-[10px] tracking-widest text-sage/80 uppercase">
          {task.tag}
        </span>
        <span className="font-mono text-[10px] text-paper/30">{task.time}</span>
      </div>
      <p className="text-paper/90 text-sm leading-snug mb-3 font-medium">
        {task.title}
      </p>
      <div className="flex items-center justify-between">
        <span className="font-mono text-signal text-sm font-semibold">{task.price}</span>
        <span className="text-[11px] text-paper/40 group-hover:text-paper/70 transition-colors">
          View task →
        </span>
      </div>
    </div>
  );
}

export default function HeroBanner() {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink"
      aria-label="Hero"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 -left-24 h-[480px] w-[480px] rounded-full bg-signal/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/3 right-0 h-[360px] w-[360px] rounded-full bg-sage/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-24 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Left: copy + actions */}
          <div className="lg:col-span-6">
            <div
              className={`transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] tracking-widest text-sage uppercase mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse" />
                1,204 tasks posted this week
              </span>
            </div>

            <h1
              className={`font-display text-[2.5rem] sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight text-paper transition-all duration-700 ease-out delay-100 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Get your tasks done by{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-signal">skilled freelancers</span>
                <span
                  className="absolute left-0 bottom-1 h-3 w-full bg-signal/15 -z-0"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p
              className={`mt-6 max-w-md text-base sm:text-lg text-paper/60 leading-relaxed transition-all duration-700 ease-out delay-200 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Post what you need done, set your budget, and get matched with
              vetted freelancers in hours — not weeks. No middlemen, no
              guesswork.
            </p>

            <div
              className={`mt-9 flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out delay-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <button className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-signal px-7 py-3.5 text-sm font-semibold text-ink shadow-lg shadow-signal/20 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-signal/30 active:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal">
                Post a Task
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.02] px-7 py-3.5 text-sm font-semibold text-paper transition-colors duration-200 hover:bg-white/[0.06] hover:border-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper/40">
                Browse Tasks
              </button>
            </div>

            <div
              className={`mt-10 flex items-center gap-6 transition-all duration-700 ease-out delay-[400ms] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex -space-x-3">
                {["F", "R", "M", "A"].map((letter, i) => (
                  <div
                    key={letter}
                    className="h-9 w-9 rounded-full border-2 border-ink bg-gradient-to-br from-sage/40 to-signal/40 flex items-center justify-center text-[11px] font-semibold text-paper"
                    style={{ zIndex: 4 - i }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-sm text-paper/50">
                <span className="text-paper font-semibold">12,000+</span> freelancers ready to work
              </p>
            </div>
          </div>

          {/* Right: ambient floating task feed (signature element) */}
          <div className="lg:col-span-6 relative">
            <div
              className={`relative h-[420px] sm:h-[480px] overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent transition-all duration-1000 ease-out delay-200 ${
                inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* fade masks top/bottom */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-ink to-transparent z-10" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ink to-transparent z-10" />

              <div className="absolute inset-x-4 top-0 animate-task-scroll space-y-3">
                {[...TASKS, ...TASKS].map((task, i) => (
                  <TaskCard key={i} task={task} />
                ))}
              </div>
            </div>

            <span className="absolute -bottom-3 -left-3 rounded-full border border-white/10 bg-ink px-4 py-1.5 font-mono text-[10px] tracking-widest text-paper/40 uppercase">
              Live task feed
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes task-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-task-scroll {
          animation: task-scroll 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-task-scroll {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}