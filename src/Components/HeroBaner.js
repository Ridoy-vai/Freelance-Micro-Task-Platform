"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

/**
 * Custom Colors used (Add to tailwind.config.js):
 * ink: #050505 (Deep background)
 * paper: #F5F5F7 (Text/White-ish)
 * signal: #00F5A0 (Bright Mint/Accent)
 * sage: #A1A1AA (Secondary Text)
 */

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

// Real photo slideshow — crossfades between freelance/work images every few seconds.
// Photos via Pexels (free to use, no attribution required).
const SLIDESHOW_IMAGES = [
  "https://images.pexels.com/photos/9052775/pexels-photo-9052775.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/9052869/pexels-photo-9052869.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/6969626/pexels-photo-6969626.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/7255294/pexels-photo-7255294.jpeg?auto=compress&cs=tinysrgb&w=1920",
];

function BackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${SLIDESHOW_IMAGES[index]})` }}
        />
      </AnimatePresence>
      {/* Dark overlay so text stays readable over any photo */}
      <div className="absolute inset-0 bg-ink/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
    </div>
  );
}

export default function HeroBanner() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [ref, inView] = useInView();

  // Mouse-parallax: cursor position subtly shifts background orbs for depth
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMouse({ x, y });
  };

  // Scroll-parallax: background grid drifts as the page scrolls
  const { scrollYProgress } = useScroll();
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-ink flex items-center"
      aria-label="Hero"
    >
      {/* Background photo slideshow */}
      <BackgroundSlideshow />

      {/* Background Ornaments (on top of the photo, under the content) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Scroll-parallax grid */}
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />

        {/* Mouse-parallax glowing orbs */}
        <motion.div
          animate={{ x: mouse.x * -30, y: mouse.y * -30 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute -top-[10%] -left-[10%] h-[500px] w-[500px] rounded-full bg-signal/10 blur-[120px] opacity-50"
        />
        <motion.div
          animate={{ x: mouse.x * 40, y: mouse.y * 40 }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="absolute top-[20%] -right-[5%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px] opacity-30"
        />
      </div>

      <div className="relative mx-auto max-w-8xl px-6 sm:px-10 lg:px-12 py-20">
        <motion.div
          initial={false}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-left"
        >

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

          <div className="flex flex-col sm:flex-row gap-5 pt-4">

            {/* Freelancer */}
            {user?.role === "freelancer" && (
              <>
                <Link href={"/tasks"}>
                  <button className="group relative border-white/20 overflow-hidden rounded-full bg-signal px-8 py-4 text-sm font-bold text-ink transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,160,0.3)]">
                    Apply Task
                  </button>
                </Link>

                <Link href={"/tasks"}>
                  <button className="group rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-paper backdrop-blur-sm transition-all hover:bg-white/10 hover:border-black/20">
                    Browse Tasks
                  </button>
                </Link>
              </>
            )}

            {/* Client */}
            {user?.role === "client" && (
              <>
                <Link href={'/dashboard/client/PostTaskForm'}>
                  <button className="group border-white/20 relative overflow-hidden rounded-full bg-signal px-8 py-4 text-sm font-bold text-ink transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,160,0.3)]">
                    Post a Task
                  </button>
                </Link>

                <Link href={'/freelancers'}>
                  <button className="group rounded-full  border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-paper backdrop-blur-sm transition-all hover:bg-white/10 hover:border-black/20">
                    Explore Freelancers
                  </button>
                </Link>
              </>
            )}

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <Link href={'/dashboard/admin'}>
                  <button className="group relative border-white/20 overflow-hidden rounded-full bg-signal px-8 py-4 text-sm font-bold text-ink transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,160,0.3)]">
                    Admin Dashboard
                  </button>
                </Link>

                <Link href={'/dashboard/admin/users'}>
                  <button className="group rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-paper backdrop-blur-sm transition-all hover:bg-white/10 hover:border-black/20">
                    Manage Users
                  </button>
                </Link>
              </>
            )}

            {/* Guest */}
            {!user && (
              <>
                <Link href={'/register'}>
                  <button className="group relative overflow-hidden rounded-full bg-signal px-8 py-4 text-sm font-bold text-ink transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,160,0.3)]">
                    Get Started
                  </button>
                </Link>


                <Link href={'/'}>
                  <button className="group rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-paper backdrop-blur-sm transition-all hover:bg-white/10 hover:border-black/20">
                    Explore Platform
                  </button>
                </Link>
              </>
            )}

          </div>

          {/* Social Proof */}
          <div className="flex flex-col gap-4 pt-8 border-t border-white/50">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`h-10 w-10 rounded-full border-2 border-ink flex items-center justify-center text-[10px] font-bold text-paper ring-1 ring-white/10`}>
                  
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
        </motion.div>
      </div>

      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}