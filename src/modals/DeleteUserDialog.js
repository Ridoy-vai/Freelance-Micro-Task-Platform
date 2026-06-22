"use client";

import { AlertDialog, Button } from "@heroui/react";

const DeleteUserDialog = ({ user, isOpen, onClose, onConfirm, isLoading }) => {
  return (
    <AlertDialog 
      isOpen={isOpen} 
      onOpenChange={(open) => { if (!open) onClose(); }}
    >
      <AlertDialog.Backdrop />
      <AlertDialog.Container placement="center"> {/* আপনি চাইলে এখানে "auto", "top", "bottom" ব্যবহার করতে পারেন */}
        <AlertDialog.Dialog className="sm:max-w-[400px]">
          <AlertDialog.CloseTrigger onClick={onClose} />
          
          <AlertDialog.Header>
            <AlertDialog.Icon status="danger" />
            <AlertDialog.Heading>
              Delete User Permanently?
            </AlertDialog.Heading>
          </AlertDialog.Header>

          <AlertDialog.Body>
            <p className="text-gray-600 leading-relaxed">
              Are you sure you want to delete <strong>{user?.name || user?.email}</strong>? 
              This will permanently remove the user and all of its data from the system. 
              This action cannot be undone.
            </p>
          </AlertDialog.Body>

          <AlertDialog.Footer>
            <Button 
              onPress={onClose} 
              variant="tertiary"
            >
              Cancel
            </Button>
            <Button 
              onPress={onConfirm} 
              variant="danger"
              isLoading={isLoading}
            >
              Confirm Delete
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Dialog>
      </AlertDialog.Container>
    </AlertDialog>
  );
};

export default DeleteUserDialog;