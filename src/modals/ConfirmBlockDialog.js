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
                                    ? "User-কে আনব্লক করবেন?"
                                    : "User-কে ব্লক করবেন?"}
                            </AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                আপনি <strong>{user?.name || "এই user"}</strong> (
                                {user?.email})-কে{" "}
                                {user?.isBlocked ? "আনব্লক" : "ব্লক"} করতে চলেছেন।{" "}
                                {!user?.isBlocked &&
                                    "ব্লক হলে এই user platform-এ লগইন করতে পারবে না।"}
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