"use client";

import { AlertDialog, Button } from "@heroui/react";

const ConfirmDeleteDialog = ({
    item,
    title = "Delete permanently?",
    itemLabel,
    onConfirm,
    onClose,
}) => {
    return (
        <AlertDialog
            isOpen={!!item}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>{title}</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                এটি <strong>{itemLabel || "এই item"}</strong> এবং এর সম্পূর্ণ
                                ডাটা স্থায়ীভাবে ডিলিট করে দেবে। এই কাজটি আর ফিরিয়ে নেওয়া যাবে
                                না।
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                slot="close"
                                variant="danger"
                                onPress={() => {
                                    if (!item) return;
                                    onConfirm(item._id);
                                }}
                            >
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default ConfirmDeleteDialog;