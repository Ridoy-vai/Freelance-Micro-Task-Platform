// import ContactForm from "./ContactForm";
import ContactForm from "@/Components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact | TaskNest",
  description: "TaskNest টিমের সাথে যোগাযোগ করুন — প্রশ্ন, সাপোর্ট বা পার্টনারশিপের জন্য।",
};

const socials = [
  { label: "Facebook", href: "https://facebook.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function ContactPage() {
  return (
    <main className="bg-paper-50 min-h-screen">
      {/* Header strip — mirrors a task card's "open brief" framing */}
      <section className="border-b border-ink-100 bg-paper-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-signal-700 bg-signal-50 px-3 py-1 rounded-full border border-signal-100">
            একটা মেসেজ পাঠান
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-ink-900 tracking-tight">
            কাজ আটকে গেছে? আমাদের জানান।
          </h1>
          <p className="mt-3 text-ink-600 max-w-2xl leading-relaxed">
            ক্লায়েন্ট, ফ্রিল্যান্সার বা পার্টনারশিপ — যেকোনো বিষয়ে প্রশ্ন থাকলে নিচের
            ফর্ম পূরণ করুন বা সরাসরি যোগাযোগ করুন। সাধারণত ২৪ ঘণ্টার মধ্যে রিপ্লাই
            দিয়ে দিই।
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-10">
          {/* Form card */}
          <div className="bg-white border border-ink-100 rounded-2xl shadow-sm p-6 sm:p-8">
            <ContactForm />
          </div>

          {/* Company info card */}
          <aside className="space-y-6">
            <div className="bg-ink-900 text-paper-50 rounded-2xl p-6 sm:p-7">
              <h2 className="text-lg font-semibold mb-5">যোগাযোগের তথ্য</h2>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 shrink-0">
                    <Mail className="h-4 w-4 text-sage-300" />
                  </span>
                  <div>
                    <p className="text-ink-200 text-xs">ইমেইল</p>
                    <a
                      href="mailto:support@tasknest.app"
                      className="text-paper-50 hover:text-sage-300 transition-colors"
                    >
                      support@tasknest.app
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 shrink-0">
                    <Phone className="h-4 w-4 text-sage-300" />
                  </span>
                  <div>
                    <p className="text-ink-200 text-xs">ফোন</p>
                    <a
                      href="tel:+8801XXXXXXXXX"
                      className="text-paper-50 hover:text-sage-300 transition-colors"
                    >
                      +880 1XXX-XXXXXX
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 shrink-0">
                    <MapPin className="h-4 w-4 text-sage-300" />
                  </span>
                  <div>
                    <p className="text-ink-200 text-xs">ঠিকানা</p>
                    <p className="text-paper-50">রাজশাহী, বাংলাদেশ</p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 shrink-0">
                    <Clock className="h-4 w-4 text-sage-300" />
                  </span>
                  <div>
                    <p className="text-ink-200 text-xs">সাপোর্ট সময়</p>
                    <p className="text-paper-50">শনি–বৃহস্পতি, সকাল ১০টা–রাত ৮টা</p>
                  </div>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-ink-200 text-xs mb-3">সোশ্যাল</p>
                <div className="flex gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/10 hover:bg-sage-300 hover:text-ink-900 transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-sage-50 border border-sage-100 rounded-2xl p-5">
              <p className="text-sm text-ink-700 leading-relaxed">
                <span className="font-semibold text-ink-900">আর্জেন্ট কিছু?</span>{" "}
                পেমেন্ট বা একাউন্ট সংক্রান্ত সমস্যার জন্য সরাসরি ইমেইলে{" "}
                <span className="font-medium">subject</span> এ{" "}
                <span className="font-mono text-xs bg-white px-1.5 py-0.5 rounded border border-sage-200">
                  [Urgent]
                </span>{" "}
                লিখে পাঠান।
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}