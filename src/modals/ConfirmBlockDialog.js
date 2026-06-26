"use client";

import { AlertDialog, Button } from "@heroui/react";

const ConfirmBlockDialog = ({ user, onConfirm, onClose }) => {
    return (
        <AlertDialog
            isOpen={!!user}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
        >
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon
                                status={user?.isBlocked ? "info" : "danger"}
                            />
                            <AlertDialog.Heading>
                                {user?.isBlocked
                                    ? "Unblock this user?"
                                    : "Block this user?"}
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                You are about to{" "}
                                {user?.isBlocked ? "unblock" : "block"}{" "}
                                <strong>{user?.name || "this user"}</strong> (
                                {user?.email}).{" "}
                                {!user?.isBlocked &&
                                    "Once blocked, this user will not be able to log in to the platform."}
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                slot="close"
                                variant={user?.isBlocked ? "secondary" : "danger"}
                                onPress={() => {
                                    if (!user) return;
                                    onConfirm(user._id, user.isBlocked);
                                }}
                            >
                                {user?.isBlocked ? "Unblock" : "Block"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default ConfirmBlockDialog;