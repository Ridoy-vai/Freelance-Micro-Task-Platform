"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Upload, X, Loader2 } from "lucide-react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { UpdateUserProfile } from "@/ServerActions/Freelancer";
// import { UpdateUserProfile } from "@/ServerActions/user";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export function EditProfileModal({ user }) {
    const router = useRouter();
    const isFreelancer = user.role === "freelancer";

    const [formData, setFormData] = useState({
        name: user.name || "",
        image: user.image || "",
        // client fields
        companyName: user.companyName || "",
        industry: user.industry || "",
        companyWebsite: user.companyWebsite || "",
        // // freelancer fields
        // title: user.title || "",
        // bio: user.bio || "",
        // hourlyRate: user.hourlyRate || "",
        // location: user.location || "",
        // skills: Array.isArray(user.skills) ? user.skills.join(", ") : (user.skills || ""),
    });

    const [imagePreview, setImagePreview] = useState(user.image || "");
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (field) => (e) => {
        setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!IMGBB_API_KEY) {
            setError("Image upload configured nai.");
            return;
        }

        setIsUploadingImage(true);
        setError("");

        try {
            const uploadData = new FormData();
            uploadData.append("image", file);

            const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                cache: "no-store",
                method: "POST",
                body: uploadData,
            });

            const data = await res.json();

            if (!data?.success) {
                throw new Error(data?.error?.message || "Upload failed");
            }

            setFormData((prev) => ({ ...prev, image: data.data.url }));
            setImagePreview(data.data.url);
        } catch (err) {
            console.error("Image upload error:", err);
            setError("ছবি আপলোড করতে সমস্যা হয়েছে।");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const removeImage = () => {
        setFormData((prev) => ({ ...prev, image: "" }));
        setImagePreview("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSaving(true);
        setError("");

        const payload = {
            name: formData.name,
            image: formData.image,
            companyName: formData.companyName,
            industry: formData.industry,
            companyWebsite: formData.companyWebsite,
        };

        console.log("User ID:", user._id);
        console.log("Payload:", payload);

        const result = await UpdateUserProfile(user._id, payload);

        console.log("Result:", result);

        setIsSaving(false);

        if (result?.success) {
            alert("Updated successfully");
            router.refresh();
        } else {
            setError(result?.message || "Update failed");
        }
    };


    return (
        <Modal>
            <Button variant="secondary">
                <Pencil className="size-4" />
                Edit Profile
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit Profile</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                তোমার প্রোফাইল তথ্য আপডেট করো।
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                {error && (
                                    <p className="mb-3 text-sm text-rose-500">{error}</p>
                                )}

                                <form id="profile-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    {/* Image upload */}
                                    <div>
                                        <Label>Profile photo</Label>
                                        {imagePreview ? (
                                            <div className="mt-1.5 flex items-center gap-3 rounded-xl border border-paper/10 bg-paper/[0.04] p-3">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-12 w-12 rounded-full object-cover"
                                                />
                                                <span className="flex-1 truncate text-xs text-muted">
                                                    Image uploaded
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={removeImage}
                                                    className="flex h-7 w-7 items-center justify-center rounded-lg text-muted hover:bg-rose-500/10 hover:text-rose-500"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <label className="mt-1.5 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-paper/15 px-4 py-3 text-sm text-muted hover:border-signal/40">
                                                {isUploadingImage ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Uploading…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Upload className="h-4 w-4" />
                                                        Click to upload
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={handleImageUpload}
                                                    disabled={isUploadingImage}
                                                />
                                            </label>
                                        )}
                                    </div>

                                    <TextField className="w-full" name="name" type="text" variant="secondary">
                                        <Label>Name</Label>
                                        <Input
                                            value={formData.name}
                                            onChange={handleChange("name")}
                                            placeholder="Your full name"
                                        />
                                    </TextField>

                                    {isFreelancer ? (
                                        <>
                                            <TextField className="w-full" name="title" variant="secondary">
                                                <Label>Professional title</Label>
                                                <Input
                                                    value={formData.title}
                                                    onChange={handleChange("title")}
                                                    placeholder="e.g. Frontend Developer"
                                                />
                                            </TextField>

                                            <TextField className="w-full" name="hourlyRate" type="number" variant="secondary">
                                                <Label>Hourly rate ($)</Label>
                                                <Input
                                                    value={formData.hourlyRate}
                                                    onChange={handleChange("hourlyRate")}
                                                    placeholder="25"
                                                />
                                            </TextField>

                                            <TextField className="w-full" name="location" variant="secondary">
                                                <Label>Location</Label>
                                                <Input
                                                    value={formData.location}
                                                    onChange={handleChange("location")}
                                                    placeholder="City, Country"
                                                />
                                            </TextField>

                                            <TextField className="w-full" name="skills" variant="secondary">
                                                <Label>Skills (comma separated)</Label>
                                                <Input
                                                    value={formData.skills}
                                                    onChange={handleChange("skills")}
                                                    placeholder="React, Node.js, Figma"
                                                />
                                            </TextField>

                                            <TextField className="w-full" name="bio" variant="secondary">
                                                <Label>Bio</Label>
                                                <Input
                                                    value={formData.bio}
                                                    onChange={handleChange("bio")}
                                                    placeholder="Tell clients about yourself"
                                                />
                                            </TextField>
                                        </>
                                    ) : (
                                        <>
                                            <TextField className="w-full" name="companyName" variant="secondary">
                                                <Label>Company name</Label>
                                                <Input
                                                    value={formData.companyName}
                                                    onChange={handleChange("companyName")}
                                                    placeholder="Your company name"
                                                />
                                            </TextField>

                                            <TextField className="w-full" name="industry" variant="secondary">
                                                <Label>Industry</Label>
                                                <Input
                                                    value={formData.industry}
                                                    onChange={handleChange("industry")}
                                                    placeholder="e.g. E-commerce"
                                                />
                                            </TextField>

                                            <TextField className="w-full" name="companyWebsite" type="url" variant="secondary">
                                                <Label>Company website</Label>
                                                <Input
                                                    value={formData.companyWebsite}
                                                    onChange={handleChange("companyWebsite")}
                                                    placeholder="https://yourcompany.com"
                                                />
                                            </TextField>
                                        </>
                                    )}
                                </form>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                form="profile-form"
                                disabled={isSaving || isUploadingImage}
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}