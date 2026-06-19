"use client";

import { useState } from "react";

export default function EditProfilePage() {
  const [form, setForm] = useState({
    name: "",
    photo: "",
    skills: "",
    bio: "",
    rate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", form);
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-xl p-6 space-y-5"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Photo */}
        <input
          type="text"
          name="photo"
          placeholder="Profile Photo URL"
          value={form.photo}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Skills */}
        <input
          type="text"
          name="skills"
          placeholder="Skills (React, Node, UI/UX)"
          value={form.skills}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Bio */}
        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg h-28"
        />

        {/* Rate */}
        <input
          type="number"
          name="rate"
          placeholder="Hourly Rate (USD)"
          value={form.rate}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}