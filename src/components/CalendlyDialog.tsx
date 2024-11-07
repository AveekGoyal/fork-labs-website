import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface CalendlyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduled?: () => void;
}

const CalendlyDialog: React.FC<CalendlyDialogProps> = ({ 
  isOpen, 
  onClose, 
  onScheduled 
}) => {
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        onScheduled?.();
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [onScheduled]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="bg-gray-900/95 backdrop-blur-xl border-none max-w-3xl p-0 gap-0 rounded-3xl shadow-2xl h-[700px]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-t-3xl" />
        <div className="w-full h-full relative">
          <iframe
            src="https://calendly.com/fork-labs-devs/30min"
            width="100%"
            height="100%"
            className="rounded-3xl absolute inset-0"
            frameBorder="0"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendlyDialog;