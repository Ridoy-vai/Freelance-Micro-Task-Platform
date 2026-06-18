"use client";

import { useEffect, useRef, useState } from "react";

/**
 * HowItWorks — 3-step guide section
 *
 * STEPS is a static array describing the process. This rarely needs
 * to come from a database — it's marketing copy, not user data — so
 * it's fine to keep it hardcoded here.
 */

const STEPS = [
  {
    number: "01",
    title: "Post a task",
    description:
      "Describe what you need done, set a budget, and publish it in minutes. No sign-up fees.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Get proposals",
    description:
      "Skilled freelancers send you offers with their price, timeline, and past work to review.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h8M8 14h5M21 12c0 4.97-4.03 9-9 9-1.5 0-2.9-.37-4.14-1.02L3 21l1.02-3.86A8.96 8.96 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Hire and pay",
    description:
      "Pick the freelancer you trust, chat to lock in details, and pay securely once it's done.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function HowItWorks() {
  const [ref, inView] = useInView();

  return (
    <section ref={ref} className="bg-ink py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div
          className={`text-center transition-all duration-700 ease-out ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
            Simple by design
          </span>
          <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-paper/50">
            Three steps between you and a finished task. No middlemen, no
            guesswork.
          </p>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {/* connecting line for desktop */}
          <div
            className="pointer-events-none absolute top-9 left-0 right-0 hidden h-px bg-white/10 sm:block"
            aria-hidden="true"
          />

          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className={`relative flex flex-col items-center text-center transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
            >
              <div className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/10 bg-ink text-signal shadow-[0_0_0_6px_#14171F]">
                <div className="h-7 w-7">{step.icon}</div>
              </div>

              <span className="mt-5 font-mono text-xs tracking-widest text-paper/30">
                STEP {step.number}
              </span>
              <h3 className="mt-2 font-display text-xl text-paper">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-paper/50">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}