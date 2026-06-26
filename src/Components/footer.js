'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail, IoLogoLinkedin } from "react-icons/io";

const FOOTER_LINKS = {
    forClients: [
        { label: "Post a Task", href: "/" },
        { label: "Browse Freelancers", href: "/freelancers" },
        { label: "How It Works", href: "/how-it-works" },
        { label: "Pricing", href: "/pricing" },
    ],
    forFreelancers: [
        { label: "Find Tasks", href: "/tasks" },
        { label: "Create Profile", href: "/signup" },
        { label: "Success Stories", href: "/success-stories" },
        { label: "Resources", href: "/resources" },
    ],
    company: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
    ],
};

const SOCIAL_LINKS = [
    { icon: FaGithub, href: "https://github.com/Ridoy-vai", label: "GitHub" },
    { icon: FaFacebook, href: "https://web.facebook.com/md.sahariyar.ridoy", label: "Facebook" },
    { icon: IoLogoLinkedin, href: "www.linkedin.com/in/md-shahriar-ridoy-vai", label: "LinkedIn" },
    { icon: IoIosMail, href: "mailto:mdsahariyarridoy@gmail.com", label: "Email" },
];

const Footer = () => {
    const pathname = usePathname();
    
    // ড্যাশবোর্ডে ফুটার দেখাবে না
    if (pathname.includes("dashboard")) {
        return null;
    }
    if (pathname.includes("unauthorized")) {
        return null;
    }

    const year = new Date().getFullYear();

    return (
        <footer className="bg-ink border-t border-paper/10 bg-gray-300">
            <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
                
                {/* Main Grid Structure */}
                <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">

                    {/* Brand Column: Full width on mobile, 2 columns on large screens */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white p-0.5 shadow-sm transition-transform group-hover:scale-105">
                                <img
                                    src="https://img.magnific.com/premium-vector/eqh-logo-design-initial-letter-eqh-monogram-logo-using-hexagon-shape_1101554-16445.jpg?semt=ais_hybrid&w=740&q=80"
                                    alt="Logo"
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-black tracking-tighter text-slate-900 leading-none">TaskNest</h1>
                                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-600">Marketplace</p>
                            </div>
                        </Link>
                        
                        <p className="mt-4 text-sm text-paper/60 leading-relaxed max-w-xs">
                            Connecting skilled freelancers with clients for
                            micro-tasks that get done right, on time, every
                            time.
                        </p>

                        {/* Social Icons */}
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition-all hover:border-signal hover:text-signal active:scale-95"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* For Clients */}
                    <div className="flex flex-col">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage font-semibold">
                            For Clients
                        </span>
                        <ul className="mt-4 space-y-3">
                            {FOOTER_LINKS.forClients.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-paper/60 transition-colors hover:text-signal block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Freelancers */}
                    <div className="flex flex-col">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage font-semibold">
                            For Freelancers
                        </span>
                        <ul className="mt-4 space-y-3">
                            {FOOTER_LINKS.forFreelancers.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-paper/60 transition-colors hover:text-signal block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="flex flex-col">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage font-semibold">
                            Company
                        </span>
                        <ul className="mt-4 space-y-3">
                            {FOOTER_LINKS.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-paper/60 transition-colors hover:text-signal block"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom Bar: Stacked on mobile, side-by-side on tablet+ */}
                <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-paper/10 pt-8 sm:flex-row">
                    <p className="text-xs text-paper/40 text-center sm:text-left">
                        © {year} TaskNest. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="font-mono text-[10px] sm:text-xs text-paper/40">
                            Built with care in Bangladesh
                        </p>
                        <span className="text-xs">🇧🇩</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;