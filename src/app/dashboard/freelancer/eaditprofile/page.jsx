// app/dashboard/profile/edit/page.jsx
"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { GetUserById, UpdateFreelancerProfile } from "@/ServerActions/Freelancer";
// import { GetUserById, UpdateFreelancerProfile } from "@/ServerActions/Freelancer";
// import { UpdateClientProfile } from "@/ServerActions/Client"; // তোমার আসল path অনুযায়ী বদলে নিও

const CATEGORIES = [
  "Web Development",
  "Graphic Design",
  "Video Editing",
  "Content Writing",
  "Digital Marketing",
  "Mobile App Development",
];

const initialFreelancerForm = {
  image: "",
  title: "",
  bio: "",
  hourlyRate: "",
  location: "",
  skillInput: "",
  skills: [],
  category: "",
};

const initialClientForm = {
  image: "",
  companyName: "",
  industry: "",
  companyWebsite: "",
};

export default function EditProfilePage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role; // "freelancer" | "client"
  const isFreelancer = role === "freelancer";
  const isClient = role === "client";

  const [freelancerForm, setFreelancerForm] = useState(initialFreelancerForm);
  const [clientForm, setClientForm] = useState(initialClientForm);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Session থেকে user আসার পর existing data load করে default value বসানো হচ্ছে
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const existing = await GetUserById(user.id);

        if (isFreelancer) {
          setFreelancerForm({
            image: existing?.image || "",
            title: existing?.title || "",
            bio: existing?.bio || "",
            hourlyRate: existing?.hourlyRate ?? "",
            location: existing?.location || "",
            skillInput: "",
            skills: Array.isArray(existing?.skills) ? existing.skills : [],
            category: existing?.category || "",
          });
        } else if (isClient) {
          setClientForm({
            image: existing?.image || "",
            companyName: existing?.companyName || "",
            industry: existing?.industry || "",
            companyWebsite: existing?.companyWebsite || "",
          });
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!sessionPending) {
      loadProfile();
    }
  }, [user?.id, sessionPending, isFreelancer, isClient]);

  const handleFreelancerChange = (e) => {
    const { name, value } = e.target;
    setFreelancerForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    const skill = freelancerForm.skillInput.trim();
    if (!skill) return;
    if (freelancerForm.skills.includes(skill)) return;

    setFreelancerForm((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
      skillInput: "",
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skill) => {
    setFreelancerForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user?.id) {
      setError("User session পাওয়া যাচ্ছে না, আবার লগইন করুন।");
      return;
    }

    if (isFreelancer) {
      if (!freelancerForm.title || !freelancerForm.bio || !freelancerForm.hourlyRate) {
        setError("Title, Bio, ar Hourly Rate dewa lagbe.");
        return;
      }
      if (freelancerForm.skills.length === 0) {
        setError("Kompokkhe ekta skill add korun.");
        return;
      }
    }

    if (isClient) {
      if (!clientForm.companyName || !clientForm.industry) {
        setError("Company Name ar Industry dewa lagbe.");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      let result;

      if (isFreelancer) {
        const payload = {
          image: freelancerForm.image,
          title: freelancerForm.title,
          bio: freelancerForm.bio,
          hourlyRate: Number(freelancerForm.hourlyRate),
          location: freelancerForm.location,
          skills: freelancerForm.skills,
          category: freelancerForm.category,
        };
        result = await UpdateFreelancerProfile(user.id, payload);
      } else if (isClient) {
        const payload = {
          image: clientForm.image,
          companyName: clientForm.companyName,
          industry: clientForm.industry,
          companyWebsite: clientForm.companyWebsite,
        };
        result = await UpdateClientProfile(user.id, payload);
      }

      if (result?.success) {
        setSuccess(true);
      } else {
        setError(result?.message || "Profile save করতে সমস্যা হয়েছে।");
      }
    } catch (err) {
      console.error(err);
      setError("Profile save korte problem hoyeche. Abar try korun.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sessionPending || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <Loader2 className="animate-spin text-signal" size={36} />
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-4">
        <div className="max-w-md rounded-2xl border border-sage/20 bg-sage/[0.04] p-8 text-center">
          <h2 className="font-display text-xl text-paper">
            প্রোফাইল সফলভাবে আপডেট হয়েছে!
          </h2>
          <p className="mt-2 text-sm text-paper/60">
            {isFreelancer
              ? "আপনার freelancer profile এখন live, ক্লায়েন্টরা আপনাকে দেখতে পারবে।"
              : "আপনার company profile আপডেট হয়ে গেছে।"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-ink px-4 py-12 sm:px-6 sm:py-16">
      {/* Ambient glow accents */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-signal/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sage/10 blur-[100px]" />

      <div className="relative mx-auto w-full max-w-2xl">
        <div className="rounded-3xl border border-paper/10 bg-gradient-to-b from-paper/[0.04] to-transparent p-6 shadow-2xl shadow-black/40 sm:p-8">
          <h1 className="font-display text-2xl text-paper">
            {isFreelancer ? "Complete Your Freelancer Profile" : "Update Your Company Profile"}
          </h1>
          <p className="mt-1.5 text-sm text-paper/50">
            {isFreelancer
              ? "ক্লায়েন্টরা আপনাকে এই তথ্য দিয়েই খুঁজে পাবে।"
              : "ফ্রিল্যান্সাররা আপনার কোম্পানি প্রোফাইল দেখে কাজে আগ্রহী হবে।"}
          </p>

          {error && (
            <div className="mt-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-sm font-medium text-rose-300">
              {error}
            </div>
          )}

          {isFreelancer && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-paper/80">
                  Image URL <span className="text-paper/40">(optional)</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={freelancerForm.image}
                  onChange={handleFreelancerChange}
                  placeholder="Enter image URL"
                  className="mt-1.5 w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-paper/80">
                  Professional Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={freelancerForm.title}
                  onChange={handleFreelancerChange}
                  placeholder="e.g. Full Stack Developer"
                  className="mt-1.5 w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-paper/80">Category</label>
                <select
                  name="category"
                  value={freelancerForm.category}
                  onChange={handleFreelancerChange}
                  className="mt-1.5 w-full appearance-none rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                >
                  <option value="" className="bg-ink">
                    নির্বাচন করুন
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-ink">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-paper/80">Bio</label>
                <textarea
                  name="bio"
                  value={freelancerForm.bio}
                  onChange={handleFreelancerChange}
                  rows={4}
                  placeholder="নিজের ব্যাপারে, এক্সপেরিয়েন্স নিয়ে কিছু লিখুন..."
                  className="mt-1.5 w-full resize-none rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-paper/80">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={freelancerForm.hourlyRate}
                    onChange={handleFreelancerChange}
                    placeholder="e.g. 15"
                    className="mt-1.5 w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-paper/80">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={freelancerForm.location}
                    onChange={handleFreelancerChange}
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="mt-1.5 w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-paper/80">Skills</label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    type="text"
                    name="skillInput"
                    value={freelancerForm.skillInput}
                    onChange={handleFreelancerChange}
                    onKeyDown={handleSkillKeyDown}
                    placeholder="e.g. React, Tailwind"
                    className="flex-1 rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="flex items-center justify-center rounded-xl bg-signal px-4 text-ink transition-colors hover:bg-signal/90"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {freelancerForm.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {freelancerForm.skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1.5 rounded-full border border-sage/20 bg-sage/[0.08] px-3 py-1.5 text-xs font-semibold text-sage"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-sage/70"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-signal py-3 font-semibold text-ink shadow-lg shadow-signal/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-signal/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </button>
            </form>
          )}

          {isClient && (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-paper/80">
                  Image URL <span className="text-paper/40">(optional)</span>
                </label>
                <input
                  type="url"
                  name="image"
                  value={clientForm.image}
                  onChange={handleClientChange}
                  placeholder="Enter image URL"
                  className="mt-1.5 w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-paper/80">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={clientForm.companyName}
                  onChange={handleClientChange}
                  placeholder="Your company name"
                  className="mt-1.5 w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-paper/80">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={clientForm.industry}
                  onChange={handleClientChange}
                  placeholder="e.g. E-commerce, Healthcare"
                  className="mt-1.5 w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-paper/80">
                  Company Website <span className="text-paper/40">(optional)</span>
                </label>
                <input
                  type="url"
                  name="companyWebsite"
                  value={clientForm.companyWebsite}
                  onChange={handleClientChange}
                  placeholder="https://yourcompany.com"
                  className="mt-1.5 w-full rounded-xl border border-paper/10 bg-paper/[0.04] px-4 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-signal py-3 font-semibold text-ink shadow-lg shadow-signal/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-signal/30 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Profile"
                )}
              </button>
            </form>
          )}

          {!isFreelancer && !isClient && (
            <p className="mt-6 text-sm text-paper/50">
              Role পাওয়া যাচ্ছে না, আবার লগইন করার চেষ্টা করুন।
            </p>
          )}
        </div>
      </div>
    </section>
  );
}