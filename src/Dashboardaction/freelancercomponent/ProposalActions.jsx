"use client";

import { deleteProposal } from "@/ServerActions/proposal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react"; // Added Trash icon
import { AlertDialog, Button } from "@heroui/react";

const ProposalActions = ({ proposalId }) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const data = await deleteProposal(proposalId);

      if (data?.success || data?.deletedCount > 0) {
        router.refresh();
      } else {
        alert(data?.message || "Could not delete the proposal.");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Server error, please try again.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog>
      {/* TRIGGER BUTTON */}
      <Button 
        variant="light" 
        color="danger" 
        isIconOnly 
        className="hover:bg-red-50"
        title="Delete Proposal"
      >
        <Trash2 size={18} />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px]">
            <AlertDialog.CloseTrigger />
            
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Withdraw Proposal?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p className="text-gray-600">
                Are you sure you want to delete this proposal? This action 
                will permanently remove your application and cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              {/* CANCEL BUTTON */}
              <Button slot="close" variant="tertiary">
                Keep Proposal
              </Button>

              {/* CONFIRM DELETE BUTTON */}
              <Button 
                onPress={handleDelete} // Triggers the delete function
                variant="danger"
                isLoading={deleting}
                disabled={deleting}
                className="min-w-[120px]"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default ProposalActions;