import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from 'lucide-react';

interface SuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900/90 backdrop-blur-xl border-none max-w-md p-0 gap-0 rounded-3xl shadow-2xl">
        {/* Top decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-3xl" />
        
        <div className="p-8 text-center">
          <DialogHeader>
            <DialogTitle className="sr-only">Success Confirmation</DialogTitle>
          </DialogHeader>

          {/* Success Icon */}
          <div className="mx-auto w-16 h-16 mb-6 relative">
            <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <h3 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mb-3">
            Message Sent Successfully!
          </h3>
          
          <p className="text-gray-300 mb-8">
            Thank you for reaching out. Our team will review your project details and get back to you within 24 hours.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl py-6 text-white font-medium
                       hover:from-green-500 hover:to-emerald-500 transition-all duration-300 group shadow-lg
                       hover:shadow-green-500/20 hover:-translate-y-0.5"
            >
              Great, thanks!
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-300 mt-6">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessDialog;