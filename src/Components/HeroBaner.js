"use client";

import { authClient } from "@/lib/auth-client";
import { GetAllTasks } from "@/ServerActions/Task";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Card, CloseButton } from "@heroui/react";

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

function TaskCard({ task }) {

  return (
    <Card className="w-full items-stretch md:flex-row">
      <div className="flex flex-1 flex-col gap-3">
        <Link href={`/tasks/${task._id}`}>
          <Card.Header className="gap-1">
            <Card.Title className="pr-8 text-1xl font-bold mb-4">{task.title}</Card.Title>
          </Card.Header>
          <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Claint:  {task.clientname}</span>
              <span className="text-xs text-muted">Catagory: {task.category}</span>
            </div>
            <span className="w-full sm:w-auto text-blue-600 underline cursor-pointer">Apply Now</span>
          </Card.Footer>
        </Link>
      </div>
    </Card >
  );
}


export default function HeroBanner() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const [ref, inView] = useInView();
  const [tasks, setTasks] = useState([]);
  console.log(tasks)


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const limit = 6;
        const { tasks: fetchedTasks } = await GetAllTasks("tasks", limit, 0);
        setTasks(fetchedTasks || []);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

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

              <div className="flex flex-col sm:flex-row gap-5 pt-4">

                {/* Freelancer */}
                {user?.role === "freelancer" && (
                  <>
                    <Link href={"/tasks"}>
                      <button className="group relative overflow-hidden rounded-full bg-signal px-8 py-4 text-sm font-bold text-ink transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,160,0.3)]">
                        Apply Task
                      </button>
                    </Link>

                    <Link href={"/tasks"}>
                      <button className="group rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-paper backdrop-blur-sm transition-all hover:bg-white/10 hover:border-black/20">
                        Browse Tasks
                      </button>
                    </Link>
                  </>
                )}

                {/* Client */}
                {user?.role === "client" && (
                  <>
                    <Link href={'/dashboard/client/PostTaskForm'}>
                      <button className="group relative overflow-hidden rounded-full bg-signal px-8 py-4 text-sm font-bold text-ink transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,160,0.3)]">
                        Post a Task
                      </button>
                    </Link>

                    <Link href={'/freelancers'}>
                      <button className="group rounded-full  border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-paper backdrop-blur-sm transition-all hover:bg-white/10 hover:border-black/20">
                        Explore Freelancers
                      </button>
                    </Link>
                  </>
                )}

                {/* Admin */}
                {user?.role === "admin" && (
                  <>
                    <Link href={'/dashboard/admin'}>
                      <button className="group relative  overflow-hidden rounded-full bg-signal px-8 py-4 text-sm font-bold text-ink transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,245,160,0.3)]">
                        Admin Dashboard
                      </button>
                    </Link>

                    <Link href={'/dashboard/admin/users'}>
                      <button className="group rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-paper backdrop-blur-sm transition-all hover:bg-white/10 hover:border-black/20">
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
                {tasks.length > 0 && (
                  <div className="absolute inset-x-6 top-0 animate-task-scroll space-y-4 pt-10">
                    {[...tasks, ...tasks].map((task, i) => (
                      <TaskCard key={i} task={task} />
                    ))}
                  </div>
                )}
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