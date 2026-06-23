'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail, IoLogoLinkedin } from "react-icons/io";

const FOOTER_LINKS = {
    forClients: [
        { label: "Post a Task", href: "/post-task" },
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
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { icon: FaXTwitter, href: "https://twitter.com", label: "Twitter" },
    { icon: IoLogoLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: IoIosMail, href: "mailto:support@tasknest.com", label: "Email" },
];

const Footer = () => {

    const pathname = usePathname();
    if (pathname.includes("dashboard")) {
        return null
    }
    const year = new Date().getFullYear();

    return (
        <footer className="bg-ink border-t border-paper/10">
            <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 py-16">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <h3 className="font-display text-2xl text-paper">
                            Task<span className="text-signal">Nest</span>
                        </h3>
                        <p className="mt-3 text-sm text-paper/60 leading-relaxed max-w-xs">
                            Connecting skilled freelancers with clients for
                            micro-tasks that get done right, on time, every
                            time.
                        </p>

                        {/* Social Icons */}
                        <div className="mt-6 flex items-center gap-3">
                            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/60 transition-colors hover:border-signal hover:text-signal"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* For Clients */}
                    <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
                            For Clients
                        </span>
                        <ul className="mt-4 space-y-3">
                            {FOOTER_LINKS.forClients.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-paper/60 transition-colors hover:text-signal"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* For Freelancers */}
                    <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
                            For Freelancers
                        </span>
                        <ul className="mt-4 space-y-3">
                            {FOOTER_LINKS.forFreelancers.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-paper/60 transition-colors hover:text-signal"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-sage">
                            Company
                        </span>
                        <ul className="mt-4 space-y-3">
                            {FOOTER_LINKS.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-paper/60 transition-colors hover:text-signal"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-paper/10 pt-6 sm:flex-row">
                    <p className="text-xs text-paper/40">
                        © {year} TaskNest. All rights reserved.
                    </p>
                    <p className="font-mono text-xs text-paper/40">
                        Built with care in Bangladesh 🇧🇩
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;