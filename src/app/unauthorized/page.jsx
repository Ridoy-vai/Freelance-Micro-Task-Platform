"use client";

import Link from "next/link";
import { ShieldAlert, Home, LogOut, LogIn } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-paper-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-signal-50">
                    <ShieldAlert className="h-8 w-8 text-signal-600" strokeWidth={1.75} />
                </div>

                <h1 className="text-2xl font-semibold text-ink-900 mb-2">
                    Access Denied
                </h1>
                <p className="text-ink-500 mb-8">
                    You don't have permission to access this page. If this seems wrong,
                    try logging in with the correct account or head back home.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
                    >
                        <Home className="h-4 w-4" />
                        Go Home
                    </Link>

                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-ink-200 bg-white px-5 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-50"
                    >
                        <LogIn className="h-4 w-4" />
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}