"use client";

import { authClient } from "@/lib/auth-client";
import { PostTask } from "@/ServerActions/Task";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  ClipboardList, DollarSign, Calendar, Tag,
  Sparkles, Send, Info, ChevronDown, CheckCircle2, ArrowRight
} from "lucide-react";
import { Button, Dropdown, Label } from "@heroui/react";

const initialFormData = {
  title: "",
  category: "",
  description: "",
  budget: "",
  deadline: "",
  status: "open",
};

const PostTaskForm = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "Video Editing"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (key) => {
    setFormData(prev => ({ ...prev, category: key }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in first.");
    if (!formData.category) return toast.error("Please select a category.");

    try {
      setIsSubmitting(true);
      const taskData = { ...formData, ClientId: user.id, clientname: user.name, clientemail: user.email, claintimage: user.image, companyWebsite: user.companyWebsite, companyName: user.companyName };
      const result = await PostTask({ path: "tasks", taskData });
      if (result?.error) throw new Error(result.error);
      toast.success("Task Published! 🚀");
      setFormData(initialFormData);
    } catch (error) {
      toast.error("Failed to post task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-slate-900"></div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-[#f9fafb] overflow-hidden flex flex-col font-sans p-4 md:p-8">

      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">

        {/* Header - Balanced */}
        <header className="flex items-center justify-between mb-6 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200">
              <ClipboardList className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Post a New Project</h1>
              <p className="text-slate-500 text-sm font-medium">Connect with top freelancers worldwide</p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Form Side */}
          <form onSubmit={handleSubmit} className="lg:col-span-8 h-full flex flex-col bg-white border border-slate-200 rounded-[2rem] shadow-xl shadow-slate-100/50 overflow-hidden">
            <div className="flex-1 p-8 md:p-10 space-y-6 overflow-y-auto custom-scrollbar">

              {/* Task Title */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Design a modern landing page for a SaaS"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl px-5 py-3.5 outline-none transition-all text-slate-800 font-medium placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Category & Budget Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* HeroUI Category Dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Category</label>
                  <Dropdown>
                    <Button
                      variant="secondary"
                      className="w-full justify-between bg-slate-50 border-slate-200 text-sm h-[52px] rounded-xl font-medium text-slate-700 hover:bg-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <Tag size={16} className="text-slate-400" />
                        {formData.category || "Select Category"}
                      </div>
                      <ChevronDown size={16} className="text-slate-400" />
                    </Button>
                    <Dropdown.Popover className="min-w-[280px] rounded-2xl shadow-2xl border-slate-100">
                      <Dropdown.Menu
                        selectionMode="single"
                        onAction={(key) => handleCategoryChange(key.toString())}
                        className="p-2"
                      >
                        {categories.map((cat) => (
                          <Dropdown.Item key={cat} id={cat} textValue={cat} className="rounded-xl py-3">
                            <div className="flex items-center justify-between w-full">
                              <Label className="text-sm font-medium cursor-pointer">{cat}</Label>
                              {formData.category === cat && <CheckCircle2 size={16} className="text-slate-900" />}
                            </div>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>
                </div>

                {/* Budget Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Budget (USD)</label>
                  <div className="relative group">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      placeholder="500"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all text-slate-800 font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 flex-1 flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Project Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed brief of your requirements..."
                  className="w-full flex-1 bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl px-5 py-4 outline-none transition-all text-slate-800 font-medium resize-none min-h-[120px] leading-relaxed"
                  required
                ></textarea>
              </div>

              {/* Deadline */}
              <div className="space-y-2 max-w-[240px]">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Deadline</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-slate-900 focus:bg-white rounded-xl pl-11 pr-4 py-3.5 outline-none transition-all text-slate-700 font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex gap-4 items-center shrink-0">
              <button
                type="button"
                onClick={() => setFormData(initialFormData)}
                className="px-6 py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-500 transition-all"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-slate-900 hover:bg-black text-white font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200 active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : (
                  <>Publish Project <ArrowRight size={16} /></>
                )}
              </button>
            </div>
          </form>

          {/* Sidebar - Balanced Content */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-6 h-full overflow-hidden">
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col h-full relative overflow-hidden shadow-2xl">
              <Sparkles className="absolute top-6 right-6 text-amber-400 opacity-40 w-8 h-8" />

              <div className="mb-10">
                <h3 className="text-lg font-bold mb-2">Tips for Success</h3>
                <p className="text-slate-400 text-sm">Follow these steps to get high-quality proposals quickly.</p>
              </div>

              <div className="space-y-8 flex-1">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-xs font-bold text-amber-400 border border-white/10">01</div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">Clear Goals</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">Be specific about the deliverables you expect from the freelancer.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-xs font-bold text-amber-400 border border-white/10">02</div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">Market Budget</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">A competitive budget attracts senior experts and ensures quality results.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-xs font-bold text-amber-400 border border-white/10">03</div>
                  <div>
                    <h4 className="text-sm font-bold mb-1">Deadline</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">Set a realistic timeline that allows for research, execution, and reviews.</p>
                  </div>
                </div>
              </div>

              <div className="mt-auto bg-white/5 rounded-[1.5rem] p-6 border border-white/10 flex items-start gap-3">
                <Info size={18} className="text-amber-400 shrink-0" />
                <p className="text-[11px] text-slate-300 leading-normal font-medium italic">
                  "Projects with detailed descriptions get 40% more proposals on average."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>
    </div>
  );
};

export default PostTaskForm;