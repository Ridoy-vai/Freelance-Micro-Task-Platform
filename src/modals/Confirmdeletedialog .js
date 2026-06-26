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
                                This will permanently delete <strong>{itemLabel || "this item"}</strong> and
                                all of its data. This action cannot be undone.
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