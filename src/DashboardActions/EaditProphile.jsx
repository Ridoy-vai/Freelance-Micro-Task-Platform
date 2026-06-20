// app/dashboard/freelancer/profile/page.jsx
"use client";

import { useState } from "react";
import { Loader2, Plus, X } from "lucide-react";

const CATEGORIES = [
  "Web Development",
  "Graphic Design",
  "Video Editing",
  "Content Writing",
  "Digital Marketing",
  "Mobile App Development",
];

export default function AddFreelancerProfilePage() {
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    hourlyRate: "",
    location: "",
    skillInput: "",
    skills: [],
    category: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    const skill = formData.skillInput.trim();
    if (!skill) return;
    if (formData.skills.includes(skill)) return;

    setFormData((prev) => ({
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
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.bio || !formData.hourlyRate) {
      setError("Title, Bio, ar Hourly Rate dewa lagbe.");
      return;
    }

    if (formData.skills.length === 0) {
      setError("Kompokkhe ekta skill add korun.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        bio: formData.bio,
        hourlyRate: Number(formData.hourlyRate),
        location: formData.location,
        skills: formData.skills,
        category: formData.category,
      };

      // TODO: real API call
      // const res = await fetch(`${API_URL}/freelancers`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });
      // const result = await res.json();

      console.log("Submitting freelancer profile:", payload);

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Profile save korte problem hoyeche. Abar try korun.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 rounded-2xl border shadow-sm text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-900">
            প্রোফাইল সফলভাবে তৈরি হয়েছে!
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            আপনার freelancer profile এখন live, ক্লায়েন্টরা আপনাকে দেখতে পারবে।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border shadow-sm p-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Complete Your Freelancer Profile
          </h1>
          <p className="text-gray-500 text-sm mt-1 mb-6">
            ক্লায়েন্টরা আপনাকে এই তথ্য দিয়েই খুঁজে পাবে।
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Professional Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                className="mt-1.5 w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1.5 w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="">নির্বাচন করুন</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="নিজের ব্যাপারে, এক্সপেরিয়েন্স নিয়ে কিছু লিখুন..."
                className="mt-1.5 w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>

            {/* Hourly Rate + Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="e.g. 15"
                  className="mt-1.5 w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka, Bangladesh"
                  className="mt-1.5 w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Skills
              </label>
              <div className="flex gap-2 mt-1.5">
                <input
                  type="text"
                  name="skillInput"
                  value={formData.skillInput}
                  onChange={handleChange}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="e.g. React, Tailwind"
                  className="flex-1 border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="bg-orange-500 text-white px-4 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
                >
                  <Plus size={18} />
                </button>
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-orange-50 text-orange-600 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-orange-800"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
        </div>
      </div>
    </div>
  );
}