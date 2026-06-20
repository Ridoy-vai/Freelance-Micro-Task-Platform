"use client";

// import { userstatus } from "@/lib/Action";
import { authClient } from "@/lib/auth-client";
import { PostTask } from "@/ServerActions/Task";
import React, { useState } from "react";

const initialFormData = {
  title: "",
  category: "",
  description: "",
  budget: "",
  deadline: "",
  status: "open", // default state text: open
};

const PostTaskForm = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ডাটা কনসোলে দেখানোর জন্য
    console.log("New Task Data Submitted:", formData);

    const taskData = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      budget: formData.budget,
      deadline: formData.deadline,
      status: formData.status,
      ClientId: user.id,
      clientname: user.name,
      clientemail: user.email,
      // Assuming the API expects a field named ClientId to associate the task with the user
    };

    try {
      setIsSubmitting(true);
      await PostTask({ path: "tasks", taskData });

      // ফর্ম রিসেট করা হচ্ছে
      setFormData(initialFormData);

      // সাকসেস মেসেজ দেখানো হচ্ছে
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (error) {
      console.error("Error posting task:", error);
      alert("Task post করতে সমস্যা হয়েছে, আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  if (isPending) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900">Please Log In</h1>
        <p className="text-gray-500 mt-1">
          You must be logged in to post a new task.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Post a New Task</h1>
        <p className="text-gray-500 mt-1">
          Describe your task and set a budget to find freelancers
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">Task সফলভাবে পোস্ট হয়েছে!</span>
        </div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6"
      >
        {/* Task Title */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Task Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Design a landing page for my startup"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-orange-100 transition"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Category
          </label>
          <div className="relative">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 appearance-none outline-none focus:ring-2 ring-orange-100 transition text-gray-600"
              required
            >
              <option value="">Select a category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Content Writing">Content Writing</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of the task..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 h-32 outline-none focus:ring-2 ring-orange-100 transition resize-none"
            required
          ></textarea>
        </div>

        {/* Budget & Deadline Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Budget (USD)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="500"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-orange-100 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 ring-orange-100 transition text-gray-500"
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-[#d97706] text-white font-bold rounded-xl hover:bg-orange-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostTaskForm;