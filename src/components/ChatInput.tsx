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
    <div className="p-6 border-t border-gray-800">
      <div className="flex space-x-4">
        <Button
          onClick={onSubmitChat}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl px-6
                   hover:from-violet-500 hover:to-indigo-500 transition-all duration-300
                   flex items-center space-x-2"
        >
          <Calendar className="w-5 h-5" />
          <span>Submit & Book Call</span>
        </Button>
      </div>
      <form onSubmit={onSubmit} className="flex space-x-4 mt-4">
        <TextareaAutosize
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-black/30 border border-gray-800 rounded-xl px-4 py-3 text-white 
                   placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20
                   min-h-[44px] max-h-[120px] resize-none"
          disabled={isLoading}
          maxRows={4}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl px-6
                   hover:from-violet-500 hover:to-indigo-500 transition-all duration-300
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;