"use client";
import { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

export function WithForm({ id, onSubmitSuccess }) {
    const [formData, setFormData] = useState({
        submitionLink: "",
        submitionMessage: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleFormSubmit = async () => {
        setLoading(true);
        try {
            // Delegated the main update logic to the parent, so that
            // button click and modal submit don't duplicate logic in two places
            await onSubmitSuccess(id, {
                submitionLink: formData.submitionLink,
                submitionMessage: formData.submitionMessage,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal>
            <Button variant="secondary">Submit</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Submission Details</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Provide the submission link and message.
                            </p>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <div className="flex flex-col gap-4">
                                    <TextField className="w-full" name="submitionLink" type="url" variant="secondary">
                                        <Label>Submission Link</Label>
                                        <Input
                                            required
                                            placeholder="https://..."
                                            value={formData.submitionLink}
                                            onChange={handleChange}
                                        />
                                    </TextField>
                                    <TextField className="w-full" name="submitionMessage" variant="secondary">
                                        <Label>Message</Label>
                                        <Input
                                            placeholder="Enter submission details"
                                            value={formData.submitionMessage}
                                            onChange={handleChange}
                                        />
                                    </TextField>
                                </div>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Cancel
                            </Button>
                            <Button slot="close" onClick={handleFormSubmit} disabled={loading}>
                                {loading ? "Saving..." : "Save"}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}