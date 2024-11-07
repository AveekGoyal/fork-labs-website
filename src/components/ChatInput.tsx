import React from 'react';
import { Send, Loader2, Calendar } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onSubmitChat: () => Promise<void>;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  input, 
  isLoading, 
  onInputChange, 
  onSubmit, 
  onSubmitChat, 
  onKeyDown 
}) => {
  return (
    <div className="relative">
      <Button
        onClick={onSubmitChat}
        className="w-auto mb-4 relative group px-4 py-2 bg-violet-600 hover:bg-violet-700 
                   rounded-lg text-sm font-medium text-white flex items-center justify-center 
                   space-x-2 transition-all duration-200"
      >
        <Calendar className="w-4 h-4" />
        <span>Submit & Book Call</span>
      </Button>
      
      <form onSubmit={onSubmit} className="flex space-x-3">
        <div className="flex-1 relative group">
          <TextareaAutosize
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message..."
            className="w-full bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl
                     text-white placeholder:text-white/50
                     focus:outline-none focus:ring-2 focus:ring-violet-500/50
                     min-h-[44px] max-h-[120px] resize-none"
            disabled={isLoading}
            maxRows={4}
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
            </div>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-violet-600 hover:bg-violet-700 rounded-xl px-3
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200"
        >
          <Send className="w-5 h-5 text-white" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;