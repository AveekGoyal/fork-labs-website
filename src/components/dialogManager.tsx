// dialogManager.tsx
import React from 'react';
import { X, Minimize, Maximize, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { ExtendedMessage } from './types';

interface DialogState {
  isOpen: boolean;
  isMinimized: boolean;
  hasUnsavedChanges: boolean;
}

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
        <AlertDialogCancel onClick={onCancel}
          className="border-gray-700 text-gray-300 hover:bg-gray-800">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}
          className="bg-red-600 hover:bg-red-700">
          Close Anyway
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

interface DialogHeaderControlsProps {
    isMinimized: boolean;
    onMinimize: () => void;
    onMaximize: () => void;
    onClose: () => void;
  }
  
  export const DialogHeaderControls: React.FC<DialogHeaderControlsProps> = ({
    isMinimized,
    onMinimize,
    onMaximize,
    onClose,
  }) => (
    <div className="absolute right-6 top-6 flex items-center space-x-2">
      {isMinimized ? (
        <button
          onClick={onMaximize}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Maximize className="h-4 w-4" />
        </button>
      ) : (
        <button
          onClick={onMinimize}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <Minimize className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={onClose}
        className="p-2 text-gray-400 hover:text-white transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );



// Local storage utilities
const STORAGE_KEY = 'forklabs-chat-state';

interface StoredChatState {
  messages: ExtendedMessage[];
  timestamp: number;
}

export const saveToLocalStorage = (messages: ExtendedMessage[]) => {
  try {
    const state: StoredChatState = {
      messages,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving chat state:', error);
  }
};

export const loadFromLocalStorage = (): ExtendedMessage[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const state: StoredChatState = JSON.parse(stored);
    // Only restore if less than 24 hours old
    if (Date.now() - state.timestamp < 24 * 60 * 60 * 1000) {
      return state.messages;
    }
    return null;
  } catch (error) {
    console.error('Error loading chat state:', error);
    return null;
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};