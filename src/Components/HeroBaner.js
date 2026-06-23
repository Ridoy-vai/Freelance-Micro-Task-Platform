"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Custom Colors used (Add to tailwind.config.js):
 * ink: #050505 (Deep background)
 * paper: #F5F5F7 (Text/White-ish)
 * signal: #00F5A0 (Bright Mint/Accent)
 * sage: #A1A1AA (Secondary Text)
 */

const TASKS = [
  { tag: "DESIGN", title: "Redesign onboarding flow for fintech app", price: "$420", time: "2h ago", status: "Active" },
  { tag: "WRITING", title: "SEO blog series — 6 posts on sustainable travel", price: "$180", time: "5h ago", status: "New" },
  { tag: "DEV", title: "Fix cart bug + add Stripe webhook", price: "$95", time: "12m ago", status: "Urgent" },
  { tag: "VIDEO", title: "Edit 3-min product launch teaser", price: "$260", time: "1h ago", status: "Active" },
  { tag: "DATA", title: "Clean + dedupe 40k row customer CSV", price: "$60", time: "8h ago", status: "Active" },
  { tag: "DEV", title: "Build responsive pricing page in React", price: "$310", time: "34m ago", status: "New" },
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

function TaskCard({ task }) {
  return (
    <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-all duration-300 hover:border-signal/50 hover:bg-white/[0.05] hover:shadow-[0_0_30px_-10px_rgba(0,245,160,0.2)]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_rgba(0,245,160,0.8)]" />
            <span className="font-mono text-[10px] tracking-[0.15em] text-sage uppercase">
            {task.tag}
            </span>
        </div>
        <span className="font-mono text-[10px] text-paper/30">{task.time}</span>
      </div>
      <p className="text-paper/90 text-[15px] leading-snug mb-4 font-medium group-hover:text-white transition-colors">
        {task.title}
      </p>
      <div className="flex items-center justify-between border-t border-white/[0.05] pt-3">
        <span className="font-mono text-signal text-base font-bold tracking-tight">{task.price}</span>
        <div className="flex items-center gap-1 text-[11px] font-medium text-paper/40 group-hover:text-signal transition-colors">
          View Details <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </div>
  );
}

export default function HeroBanner() {
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-ink flex items-center"
      aria-label="Hero"
    >
      {/* Background Ornaments */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        
        {/* Glowing Orbs */}
        <div className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-signal/10 blur-[120px] opacity-50" />
        <div className="absolute top-[20%] -right-[5%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px] opacity-30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
          
          {/* Left: Content Area */}
          <div className="lg:col-span-7">
            <div className={`space-y-8 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-signal/20 bg-signal/5 px-4 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-signal uppercase font-bold">
                  1,204 LIVE TASKS AVAILABLE
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-paper font-bold">
                Deploy your vision with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal via-emerald-400 to-cyan-400">
                  elite talent.
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-xl text-lg sm:text-xl text-sage leading-relaxed font-light">
                The decentralized marketplace for high-impact tasks. Connect with the top 1% of digital artisans in real-time.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                <button className="group relative overflow-hidden rounded-full bg-signal px-8 py-4 text-sm font-bold text-ink transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,160,0.3)]">
                  <span className="relative z-10 flex items-center gap-2">
                    Post a Task 
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                </button>

                <button className="group rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-paper backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20">
                  Explore Network
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex flex-col gap-4 pt-8 border-t border-white/5">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-10 w-10 rounded-full border-2 border-ink bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-paper ring-1 ring-white/10`}>
                      U{i}
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-ink bg-signal flex items-center justify-center text-[10px] font-bold text-ink">
                    +12k
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-sage uppercase tracking-widest font-medium">
                  Trusted by teams at <span className="text-paper">Recursive Inc.</span> & <span className="text-paper">Vortex.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Scrolling Task Feed */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className={`relative h-[600px] perspective-1000 transition-all duration-1000 delay-300 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
              
              {/* Outer Card Container */}
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                
                {/* Fade Masks */}
                <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ink/80 via-ink/40 to-transparent z-10" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink/80 via-ink/40 to-transparent z-10" />

                {/* Animated List */}
                <div className="absolute inset-x-6 top-0 animate-task-scroll space-y-4 pt-10">
                  {[...TASKS, ...TASKS].map((task, i) => (
                    <TaskCard key={i} task={task} />
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -right-6 top-1/4 h-24 w-1 rounded-full bg-gradient-to-b from-transparent via-signal to-transparent" />
              <div className="absolute -left-6 bottom-1/4 h-24 w-1 rounded-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
            </div>

            {/* Label Overlay */}
            <div className="absolute -bottom-6 right-6 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl">
               <span className="font-mono text-[10px] font-bold text-signal tracking-[0.2em] uppercase">Live Network Feed</span>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes task-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .animate-task-scroll {
          animation: task-scroll 35s linear infinite;
        }
        .animate-task-scroll:hover {
          animation-play-state: paused;
        }
        .perspective-1000 {
          perspective: 1000px;
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