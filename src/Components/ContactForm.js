"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "নাম দিতে হবে";
    if (!form.email.trim()) {
      next.email = "ইমেইল দিতে হবে";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "সঠিক ইমেইল দিন";
    }
    if (!form.subject.trim()) next.subject = "বিষয় দিতে হবে";
    if (!form.message.trim()) next.message = "মেসেজ লিখুন";
    else if (form.message.trim().length < 10)
      next.message = "অন্তত ১০ অক্ষরের মেসেজ লিখুন";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("loading");

    // TODO: এখানে তোমার backend API call বসাও
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });

    // Temporary mock — শুধু UI ফ্লো দেখানোর জন্য
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setStatus("success");
    setForm(initialForm);
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-50 mb-4">
          <CheckCircle2 className="h-7 w-7 text-sage-600" />
        </span>
        <h3 className="text-lg font-semibold text-ink-900">মেসেজ পাঠানো হয়েছে!</h3>
        <p className="text-ink-600 text-sm mt-2 max-w-xs">
          ধন্যবাদ যোগাযোগ করার জন্য। আমরা যত দ্রুত সম্ভব রিপ্লাই দেব।
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-signal-700 hover:text-signal-800 underline-offset-2 hover:underline"
        >
          আরেকটা মেসেজ পাঠান
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <h2 className="text-lg font-semibold text-ink-900">মেসেজ পাঠান</h2>
        <p className="text-sm text-ink-500 mt-1">
          নিচের ফর্মটা পূরণ করুন, যত ডিটেইলস দিবেন তত দ্রুত হেল্প করতে পারব।
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field
          label="নাম"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="আপনার নাম"
        />
        <Field
          label="ইমেইল"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
      </div>

      <Field
        label="বিষয়"
        name="subject"
        value={form.subject}
        onChange={handleChange}
        error={errors.subject}
        placeholder="কী বিষয়ে যোগাযোগ করছেন?"
      />

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-ink-700 mb-1.5"
        >
          মেসেজ
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="আপনার মেসেজ বিস্তারিত লিখুন..."
          className={`w-full rounded-xl border bg-paper-50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition-colors resize-none
            focus:ring-2 focus:ring-signal-200 focus:border-signal-400
            ${errors.message ? "border-red-400" : "border-ink-200"}`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-signal-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-signal-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            পাঠানো হচ্ছে...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            মেসেজ পাঠান
          </>
        )}
      </button>
    </form>
  );
}

function Field({ label, name, value, onChange, error, type = "text", placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink-700 mb-1.5">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-paper-50 px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition-colors
          focus:ring-2 focus:ring-signal-200 focus:border-signal-400
          ${error ? "border-red-400" : "border-ink-200"}`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}