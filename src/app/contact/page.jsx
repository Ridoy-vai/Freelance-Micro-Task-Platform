"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-paper-50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage-50">
            <MessageSquare
              width={28}
              height={28}
              className="text-sage-600"
              strokeWidth={1.75}
            />
          </div>
          <h1 className="text-3xl font-semibold text-ink-900 mb-2">
            Get in Touch
          </h1>
          <p className="text-ink-500 max-w-md mx-auto">
            Have a question, an issue, or a suggestion? Our team is ready
            to reply to your message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-50 shrink-0">
                <Mail width={20} height={20} className="text-sage-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-900">Email</p>
                <p className="text-sm text-ink-500">support@tasknest.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-50 shrink-0">
                <Phone width={20} height={20} className="text-sage-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-900">Phone</p>
                <p className="text-sm text-ink-500">+880 1XXX-XXXXXX</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sage-50 shrink-0">
                <MapPin width={20} height={20} className="text-sage-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink-900">Address</p>
                <p className="text-sm text-ink-500">
                  Rangpur, Rangpur Division, Bangladesh
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-ink-100">
              <p className="text-sm text-ink-500">
                You'll typically get a reply within 24-48 hours. For urgent
                issues, please email us directly.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink-700 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-sage-500 focus:ring-1 focus:ring-sage-500 resize-none"
                placeholder="Write your message..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sage-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send width={16} height={16} />
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && (
              <p className="text-sm text-sage-600">
                Message sent successfully. Thank you!
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-signal-600">
                Something went wrong while sending your message. Please try
                again.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}