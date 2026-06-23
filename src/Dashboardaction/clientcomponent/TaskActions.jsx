"use client";

import { Edit, Trash2, Loader2, ChevronDown, CheckCircle2, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertDialog, Button, Modal, TextField, Label, Input, Dropdown } from "@heroui/react";
import { toast } from "react-toastify";

const TaskActions = ({ task }) => {
    const router = useRouter();
    
    if (!task) return null;

    const taskId = task._id;
    const [deletingId, setDeletingId] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    // ক্যাটাগরি অপশনগুলো
    const categories = [
        "Web Development",
        "Graphic Design",
        "Digital Marketing",
        "Content Writing",
        "Video Editing"
    ];

    const [formData, setFormData] = useState({
        title: task.title || "",
        category: task.category || "",
        description: task.description || "",
        budget: task.budget || "",
        deadline: task.deadline || "",
    });

    // ড্রপডাউন থেকে ক্যাটাগরি পরিবর্তন করার ফাংশন
    const handleCategoryChange = (key) => {
        setFormData(prev => ({ ...prev, category: key }));
    };

    const handleUpdate = async (e) => {
        if (e) e.preventDefault();
        try {
            setIsUpdating(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/updateclinttask/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success("Task updated successfully!");
                setIsEditModalOpen(false);
                router.refresh();
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Update failed");
            }
        } catch (error) {
            toast.error("Server error during update");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        try {
            setDeletingId(taskId);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteclinttask/${taskId}`, { 
                method: "DELETE" 
            });
            const data = await res.json();
            if (data.deletedCount > 0) {
                toast.success("Task deleted successfully");
                router.refresh();
            }
        } catch (error) {
            toast.error("Error deleting task");
        } finally {
            setDeletingId(null);
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <div className="flex justify-center gap-2">
            
            {/* Edit Button */}
            <button
                onClick={() => setIsEditModalOpen(true)}
                className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg transition"
            >
                <Edit size={18} />
            </button>

            {/* --- EDIT MODAL (HeroUI) --- */}
            <Modal isOpen={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-lg">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <Edit size={20} />
                                    </div>
                                    <Modal.Heading>Edit Task</Modal.Heading>
                                </div>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="grid grid-cols-1 gap-5 py-2">
                                    
                                    {/* Title */}
                                    <TextField variant="secondary">
                                        <Label className="text-xs font-bold text-slate-500">Task Title</Label>
                                        <Input 
                                            value={formData.title} 
                                            onChange={(e) => setFormData({...formData, title: e.target.value})} 
                                            placeholder="Enter title" 
                                        />
                                    </TextField>

                                    {/* Category and Budget Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        
                                        {/* Category Dropdown */}
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-tighter">Category</label>
                                            <Dropdown>
                                                <Button 
                                                    variant="secondary" 
                                                    className="w-full justify-between bg-slate-50 border-slate-200 text-sm h-[42px] rounded-xl font-medium text-slate-700 hover:bg-slate-100"
                                                >
                                                    <div className="flex items-center gap-2 truncate">
                                                        <Tag size={14} className="text-slate-400" />
                                                        {formData.category || "Select"}
                                                    </div>
                                                    <ChevronDown size={14} className="text-slate-400 shrink-0" />
                                                </Button>
                                                <Dropdown.Popover className="min-w-[200px] rounded-2xl shadow-xl">
                                                    <Dropdown.Menu 
                                                        selectionMode="single" 
                                                        onAction={(key) => handleCategoryChange(key.toString())}
                                                    >
                                                        {categories.map((cat) => (
                                                            <Dropdown.Item key={cat} id={cat} textValue={cat} className="py-2">
                                                                <div className="flex items-center justify-between w-full">
                                                                    <span className="text-sm font-medium">{cat}</span>
                                                                    {formData.category === cat && <CheckCircle2 size={14} className="text-slate-900" />}
                                                                </div>
                                                            </Dropdown.Item>
                                                        ))}
                                                    </Dropdown.Menu>
                                                </Dropdown.Popover>
                                            </Dropdown>
                                        </div>

                                        {/* Budget */}
                                        <TextField variant="secondary">
                                            <Label className="text-xs font-bold text-slate-500">Budget ($)</Label>
                                            <Input 
                                                type="number" 
                                                value={formData.budget} 
                                                onChange={(e) => setFormData({...formData, budget: e.target.value})} 
                                            />
                                        </TextField>
                                    </div>

                                    {/* Deadline */}
                                    <TextField variant="secondary">
                                        <Label className="text-xs font-bold text-slate-500">Deadline</Label>
                                        <Input 
                                            type="date" 
                                            value={formData.deadline} 
                                            onChange={(e) => setFormData({...formData, deadline: e.target.value})} 
                                        />
                                    </TextField>

                                    {/* Description */}
                                    <TextField variant="secondary">
                                        <Label className="text-xs font-bold text-slate-500">Description</Label>
                                        <Input 
                                            value={formData.description} 
                                            onChange={(e) => setFormData({...formData, description: e.target.value})} 
                                            placeholder="Task description..." 
                                        />
                                    </TextField>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button slot="close" variant="secondary">Cancel</Button>
                                <Button 
                                    onClick={handleUpdate} 
                                    disabled={isUpdating}
                                    className="bg-blue-600 text-white font-bold"
                                >
                                    {isUpdating ? <Loader2 className="animate-spin" size={18} /> : "Save Changes"}
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            {/* --- DELETE DIALOG --- */}
            <AlertDialog isOpen={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <Button
                    variant="danger"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="text-red-500 bg-red-50 hover:bg-red-400 p-2 rounded-lg transition border-none shadow-none"
                >
                    {deletingId === taskId ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                </Button>
                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog>
                            <AlertDialog.Header>
                                <AlertDialog.Heading>Delete Task?</AlertDialog.Heading>
                            </AlertDialog.Header>
                            <AlertDialog.Body>
                                <p>Are you sure you want to delete this task? This action cannot be undone.</p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                                <Button slot="close" variant="tertiary">Cancel</Button>
                                <Button variant="danger" onClick={handleDelete}>Delete</Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default TaskActions;