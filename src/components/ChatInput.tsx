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
    <div className="p-4 border-t border-gray-800/50 bg-gray-900/80">
      <Button
        onClick={onSubmitChat}
        className="mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 
                 hover:from-violet-500 hover:to-indigo-500 rounded-xl
                 flex items-center justify-center space-x-2 shadow-lg 
                 transition-all duration-300 text-white py-2 px-4 h-auto
                 text-sm font-medium"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Submit & Book Call
      </Button>
      
      <form onSubmit={onSubmit} className="flex space-x-3">
        <div className="flex-1 relative">
          <TextareaAutosize
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message..."
            className="w-full bg-gray-900/80 border border-gray-700/50 rounded-xl 
                     px-4 py-3 text-white placeholder:text-gray-500 
                     focus:outline-none focus:ring-2 focus:ring-violet-500/20
                     min-h-[44px] max-h-[120px] resize-none
                     transition-all duration-300"
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
          className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl px-4
                   hover:from-violet-500 hover:to-indigo-500 
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-300 text-white h-[44px]"
        >
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;