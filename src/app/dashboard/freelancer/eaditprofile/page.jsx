"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
  Loader2, Plus, X, Upload, Image as ImageIcon,
  Briefcase, MapPin, DollarSign, Globe, Building2, User
} from "lucide-react";
import { GetUserById, UpdateFreelancerProfile } from "@/ServerActions/Freelancer";
// import { UpdateClientProfile } from "@/ServerActions/Client"; 

// React Toastify
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css';

const CATEGORIES = [
  "Web Development", "Graphic Design", "Video Editing",
  "Content Writing", "Digital Marketing", "Mobile App Development",
];

const initialFreelancerForm = {
  image: "", title: "", bio: "", hourlyRate: "", location: "",
  skillInput: "", skills: [], category: "",
};

const initialClientForm = {
  image: "", companyName: "", industry: "", companyWebsite: "",
};

export default function EditProfilePage() {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const user = session?.user;
  const role = user?.role;
  const isFreelancer = role === "freelancer";
  const isClient = role === "client";

  const [freelancerForm, setFreelancerForm] = useState(initialFreelancerForm);
  const [clientForm, setClientForm] = useState(initialClientForm);

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
        toast.error("Failed to load profile data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!sessionPending) loadProfile();
  }, [user?.id, sessionPending, isFreelancer, isClient]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        const imageUrl = data.data.url;
        if (isFreelancer) {
          setFreelancerForm((prev) => ({ ...prev, image: imageUrl }));
        } else {
          setClientForm((prev) => ({ ...prev, image: imageUrl }));
        }
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed.");
      }
    } catch (err) {
      toast.error("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

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
    if (!skill || freelancerForm.skills.includes(skill)) return;
    setFreelancerForm((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
      skillInput: "",
    }));
  };

  const handleRemoveSkill = (skill) => {
    setFreelancerForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsSubmitting(true);
    try {
      let result;
      if (isFreelancer) {
        result = await UpdateFreelancerProfile(user.id, {
          ...freelancerForm,
          hourlyRate: Number(freelancerForm.hourlyRate),
        });
      } else if (isClient) {
        result = await UpdateClientProfile(user.id, clientForm);
      }

      if (result?.success) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error(result?.message || "Failed to save profile.");
      }
    } catch (err) {
      toast.error("Something went wrong while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sessionPending || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink">
        <Loader2 className="animate-spin text-signal" size={40} />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-ink py-16 px-4">
      <ToastContainer theme="dark" position="bottom-right" />

      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-signal/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[300px] h-[300px] bg-sage/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="bg-paper/[0.02] border border-paper/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">

          {/* Header */}
          <div className="p-8 border-b border-paper/10">
            <h1 className="text-3xl font-bold text-paper flex items-center gap-3">
              {isFreelancer ? <User className="text-signal" /> : <Building2 className="text-signal" />}
              {isFreelancer ? "Freelancer Profile" : "Company Profile"}
            </h1>
            <p className="text-paper/50 mt-2">Manage your public identity and professional details.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">

            {/* Image Upload Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-paper/10 bg-paper/[0.04] flex items-center justify-center">
                  {(isFreelancer ? freelancerForm.image : clientForm.image) ? (
                    <img
                      src={isFreelancer ? freelancerForm.image : clientForm.image}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  ) : (
                    <ImageIcon className="text-paper/20" size={48} />
                  )}
                  {isUploading && (
                    <div className="absolute inset-0 bg-ink/70 flex items-center justify-center">
                      <Loader2 className="animate-spin text-signal" size={24} />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-paper font-medium text-lg">Profile Picture</h4>
                <p className="text-paper/40 text-sm">Recommended: Square image, max 2MB.</p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-signal/10 border border-signal/20 text-signal text-sm font-bold rounded-xl cursor-pointer hover:bg-signal/20 transition-all">
                  <Upload size={16} />
                  {isUploading ? "Uploading..." : "Replace Photo"}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUploading} />
                </label>
              </div>
            </div>

            {/* Content Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isFreelancer ? (
                <>
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-paper/60 uppercase tracking-wider mb-2 block">Professional Title</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/30" size={18} />
                      <input
                        type="text"
                        name="title"
                        value={freelancerForm.title}
                        onChange={handleFreelancerChange}
                        placeholder="e.g. Senior Full Stack Developer"
                        className="w-full bg-paper/[0.03] border border-paper/10 rounded-2xl py-3.5 pl-12 pr-4 text-paper focus:border-signal/50 focus:ring-0 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-paper/60 uppercase tracking-wider mb-2 block">Category</label>
                    <select
                      name="category"
                      value={freelancerForm.category}
                      onChange={handleFreelancerChange}
                      className="w-full bg-paper/[0.03] border border-paper/10 rounded-2xl py-3.5 px-4 text-paper focus:border-signal/50 outline-none appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-ink">Select Category</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat} className="bg-ink">{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-paper/60 uppercase tracking-wider mb-2 block">Hourly Rate ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/30" size={18} />
                      <input
                        type="number"
                        name="hourlyRate"
                        value={freelancerForm.hourlyRate}
                        onChange={handleFreelancerChange}
                        placeholder="25"
                        className="w-full bg-paper/[0.03] border border-paper/10 rounded-2xl py-3.5 pl-12 pr-4 text-paper focus:border-signal/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-paper/60 uppercase tracking-wider mb-2 block">About Me</label>
                    <textarea
                      name="bio"
                      value={freelancerForm.bio}
                      onChange={handleFreelancerChange}
                      rows={4}
                      placeholder="Share your experience and expertise..."
                      className="w-full bg-paper/[0.03] border border-paper/10 rounded-2xl p-4 text-paper focus:border-signal/50 outline-none resize-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-paper/60 uppercase tracking-wider mb-2 block">Skills</label>
                    <div className="flex gap-3 mb-4">
                      <input
                        type="text"
                        name="skillInput"
                        value={freelancerForm.skillInput}
                        onChange={handleFreelancerChange}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                        placeholder="Add a skill (e.g. React)"
                        className="flex-1 bg-paper/[0.03] border border-paper/10 rounded-2xl py-3.5 px-4 text-paper focus:border-signal/50 outline-none"
                      />
                      <button type="button" onClick={handleAddSkill} className="bg-paper/10 hover:bg-paper/20 text-paper px-6 rounded-2xl transition-all">
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {freelancerForm.skills.map(s => (
                        <span key={s} className="inline-flex items-center gap-2 bg-sage/10 text-sage border border-sage/20 px-4 py-1.5 rounded-full text-sm font-medium">
                          {s} <X size={14} className="cursor-pointer hover:text-rose-400" onClick={() => handleRemoveSkill(s)} />
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-paper/60 uppercase tracking-wider mb-2 block">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={clientForm.companyName}
                      onChange={handleClientChange}
                      className="w-full bg-paper/[0.03] border border-paper/10 rounded-2xl py-3.5 px-4 text-paper focus:border-signal/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-paper/60 uppercase tracking-wider mb-2 block">Industry</label>
                    <input
                      type="text"
                      name="industry"
                      value={clientForm.industry}
                      onChange={handleClientChange}
                      className="w-full bg-paper/[0.03] border border-paper/10 rounded-2xl py-3.5 px-4 text-paper focus:border-signal/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-paper/60 uppercase tracking-wider mb-2 block">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/30" size={18} />
                      <input
                        type="url"
                        name="companyWebsite"
                        value={clientForm.companyWebsite}
                        onChange={handleClientChange}
                        placeholder="https://example.com"
                        className="w-full bg-paper/[0.03] border border-paper/10 rounded-2xl py-3.5 pl-12 pr-4 text-paper focus:border-signal/50 outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="md:col-span-2">
                <label className="text-sm font-bold text-paper/60 uppercase tracking-wider mb-2 block">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/30" size={18} />
                  <input
                    type="text"
                    name="location"
                    value={isFreelancer ? freelancerForm.location : ""}
                    onChange={isFreelancer ? handleFreelancerChange : handleClientChange}
                    placeholder="e.g. Dhaka, Bangladesh"
                    className="w-full bg-paper/[0.03] border border-paper/10 rounded-2xl py-3.5 pl-12 pr-4 text-paper focus:border-signal/50 outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="w-full bg-signal text-ink font-bold text-lg py-4 rounded-2xl shadow-xl shadow-signal/10 hover:shadow-signal/20 hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Loader2 size={22} className="animate-spin" /> : "Save Profile Details"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}