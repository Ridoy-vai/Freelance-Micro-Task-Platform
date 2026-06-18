"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PlatformStats — total tasks, total users, total payout
 *
 * STATS holds the raw numbers. Replace these three values with real
 * aggregate queries later, e.g.:
 *
 *   const totalTasks = await db.collection("tasks").countDocuments();
 *   const totalUsers = await db.collection("users").countDocuments();
 *   const totalPayout = await db.collection("payments").aggregate([
 *     { $group: { _id: null, sum: { $sum: "$amount" } } }
 *   ]).toArray();
 *
 * Pass those numbers into this component as props if you want it
 * server-driven, e.g. <PlatformStats tasks={...} users={...} payout={...} />
 */

const STATS = [
  { id: "tasks", label: "Tasks posted", value: 8420, prefix: "", suffix: "+" },
  { id: "users", label: "Active users", value: 12300, prefix: "", suffix: "+" },
  { id: "payout", label: "Paid out to freelancers", value: 642000, prefix: "$", suffix: "+" },
];

function useInView(threshold = 0.3) {
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

function useCountUp(target, start, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime = null;
    let frameId;

    const tick = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, target, duration]);

  return value;
}

function formatNumber(num) {
  return new Intl.NumberFormat("en-US").format(num);
}

function StatCard({ stat, inView, delay }) {
  const animatedValue = useCountUp(stat.value, inView);

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-paper/[0.04] px-6 py-8 text-center transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      <p className="font-mono text-3xl font-semibold text-signal sm:text-4xl">
        {stat.prefix}
        {formatNumber(animatedValue)}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-paper/50">{stat.label}</p>
    </div>
  );
}

export default function PlatformStats() {
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
            Growing every day
          </span>
          <h2 className="mt-2 font-display text-3xl text-paper sm:text-4xl">
            Platform at a glance
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} inView={inView} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}