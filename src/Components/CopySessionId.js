"use client";

import React, { useEffect, useState } from "react";
import { Receipt, Copy, Check } from "lucide-react";
import { authClient } from "@/lib/auth-client"; // আপনার প্রজেক্টের পাথ অনুযায়ী চেক করুন
import { GetFreelancerTransactions } from "@/ServerActions/Freelancer";
import { PaginationControlled } from "@/Components/PaginationControlled";
import { toast } from "react-toastify";

const EarningPage = ({ searchParams: searchParamsPromise }) => {
    const [transactions, setTransactions] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState(null);

    // ১. সেশন এবং সার্চ প্যারামস হ্যান্ডেল করা
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const user = session?.user;

    // ২. ডেটা ফেচ করা
    const fetchData = async () => {
        if (!user) return;
        
        const params = await searchParamsPromise;
        const currentPage = Number(params?.page) || 1;
        const itemsPerPage = 10;

        try {
            setLoading(true);
            const result = await GetFreelancerTransactions({
                freelancerId: user.id,
                page: currentPage,
                limit: itemsPerPage,
            });

            setTransactions(Array.isArray(result?.transactions) ? result.transactions : []);
            setTotalPages(result?.totalPages || 1);
            setTotalItems(result?.totalItems || 0);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!sessionPending) fetchData();
    }, [sessionPending, searchParamsPromise]);

    // ৩. কপি ফাংশন
    const handleCopy = async (id) => {
        try {
            await navigator.clipboard.writeText(id);
            setCopiedId(id);
            toast.success("Session ID copied!", { autoClose: 1000 });
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            toast.error("Failed to copy");
        }
    };

    // ৪. সাহায্যকারী ফাংশনসমূহ
    const totalEarning = transactions.reduce((sum, t) => sum + (Number(t.price) || 0), 0);

    const formatDate = (dateValue) => {
        if (!dateValue) return "N/A";
        const date = new Date(dateValue);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
        });
    };

    if (sessionPending || loading) {
        return <div className="p-8 text-center text-gray-400">লোড হচ্ছে...</div>;
    }

    if (!user) {
        return <div className="bg-white p-8 rounded-2xl border text-center text-gray-400">Please login to view your earnings.</div>;
    }

    return (
        <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between bg-gray-50/50">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">My Earnings</h2>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Financial Records</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-500">{totalItems} টি লেনদেন</p>
                    <p className="text-sm font-bold text-green-600">
                        এই পেজের মোট: ${totalEarning.toLocaleString()}
                    </p>
                </div>
            </div>

            {transactions.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Task Details</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Client Email</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Amount</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Date</th>
                                    <th className="p-4 text-xs font-bold text-gray-500 uppercase">Session ID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {transactions.map((t) => (
                                    <tr key={t._id} className="border-b hover:bg-gray-50/80 transition group">
                                        <td className="p-4">
                                            <p className="font-semibold text-gray-900">{t.title || "Untitled Task"}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-sm text-gray-600">{t.Clintemail || "N/A"}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className="font-black text-green-600">${t.price}</span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {formatDate(t.createdAt)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 group/btn">
                                                <span className="text-[10px] text-gray-400 font-mono truncate max-w-[120px]">
                                                    {t.session_id}
                                                </span>
                                                <button
                                                    onClick={() => handleCopy(t.session_id)}
                                                    className={`p-1.5 rounded-md transition-all ${
                                                        copiedId === t.session_id 
                                                        ? "bg-green-100 text-green-600" 
                                                        : "bg-gray-100 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200"
                                                    }`}
                                                >
                                                    {copiedId === t.session_id ? <Check size={12} /> : <Copy size={12} />}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t bg-gray-50/30">
                        <PaginationControlled
                            currentPage={Number(totalPages.currentPage) || 1} // আপনার প্রপস অনুযায়ী অ্যাডজাস্ট করুন
                            totalPages={totalPages}
                            totalItems={totalItems}
                            itemsPerPage={10}
                        />
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center text-center px-8 py-16">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-5 border border-slate-100">
                        <Receipt size={28} className="text-slate-400" />
                    </div>
                    <p className="text-lg font-bold text-slate-800">No Earnings Found</p>
                    <p className="text-sm text-slate-500 max-w-xs mt-1">
                        When you complete tasks and receive payments, they will appear here.
                    </p>
                </div>
            )}
        </div>
    );
};

export default EarningPage;