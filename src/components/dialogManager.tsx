import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => (
  <AlertDialog open={isOpen}>
    <AlertDialogContent className="bg-gray-900/95 backdrop-blur-xl border-gray-800">
      <AlertDialogHeader>
        <AlertDialogTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Unsaved Changes
        </AlertDialogTitle>
        <AlertDialogDescription>
          You have an ongoing conversation. Are you sure you want to close? Your progress will be lost.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel 
          onClick={onCancel}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction 
          onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700"
        >
          Close Anyway
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

interface DialogCloseButtonProps {
  onClose: () => void;
}

export const DialogCloseButton: React.FC<DialogCloseButtonProps> = ({ onClose }) => (
  <button
    onClick={onClose}
    className="absolute right-6 top-6 p-2 text-gray-400 hover:text-white transition-colors"
    aria-label="Close dialog"
  >
    <X className="h-4 w-4" />
  </button>
);