import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Calendar } from 'lucide-react';
import { nanoid } from 'nanoid';
import TextareaAutosize from 'react-textarea-autosize';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIResponse, UserMessage } from './messageComponents';
import { ExtendedMessage, formatProjectInquiry, formatEmailContent } from './types';
import {
  DialogHeaderControls,
  ConfirmationDialog,
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage,
} from './dialogManager';

interface CalendlyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduled?: () => void;
}

const CalendlyDialog: React.FC<CalendlyDialogProps> = ({ isOpen, onClose, onScheduled }) => {
  useEffect(() => {
    // Listen for Calendly events
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        onScheduled?.();
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, [onScheduled]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="bg-gray-900/95 backdrop-blur-xl border-none max-w-3xl p-0 gap-0 rounded-3xl shadow-2xl h-[700px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-t-3xl" />
        <div className="w-full h-full">
          <iframe
            src="https://calendly.com/fork-labs-devs/30min"
            width="100%"
            height="100%"
            className="rounded-3xl"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface AIChatProps {
  className?: string;
  triggerText?: string;
}

const AIChat: React.FC<AIChatProps> = ({
  className = "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-8 py-6 text-lg",
  triggerText = "Connect with us"
}) => {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentMessageType = useRef<'name' | 'email' | 'projectType' | 'requirements' | 'general'>('name');

  // Load saved state on initial mount
  useEffect(() => {
    if (isOpen) {
      const savedMessages = loadFromLocalStorage();
      if (savedMessages && savedMessages.length > 0) {
        setMessages(savedMessages);
      } else {
        setMessages([{
          id: nanoid(),
          role: 'assistant',
          content: '# Welcome to ForkLabs! 👋\n\nI\'m here to learn about your project. Could you tell me your name?\n\n*Once we gather some basic information, you can click the Submit button to schedule a call with our team.*',
          timestamp: new Date().toISOString(),
        }]);
      }
    }
  }, [isOpen]);

  // Save state on updates
  useEffect(() => {
    if (messages.length > 0) {
      saveToLocalStorage(messages);
    }
  }, [messages]);

  const handleClose = () => {
    if (messages.length > 1) {
      setShowConfirmation(true);
    } else {
      setIsOpen(false);
      clearLocalStorage();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmation(false);
    setIsOpen(false);
    setMessages([]);
    clearLocalStorage();
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleMaximize = () => {
    setIsMinimized(false);
  };

  const determineMessageType = (content: string): void => {
    const lastAiMessage = messages.findLast(m => m.role === 'assistant')?.content.toLowerCase() || '';
    
    if (lastAiMessage.includes('name')) {
      currentMessageType.current = 'name';
    } else if (lastAiMessage.includes('email')) {
      currentMessageType.current = 'email';
    } else if (lastAiMessage.includes('type of project') || lastAiMessage.includes('project type')) {
      currentMessageType.current = 'projectType';
    } else if (lastAiMessage.includes('requirements') || lastAiMessage.includes('overview')) {
      currentMessageType.current = 'requirements';
    } else {
      currentMessageType.current = 'general';
    }
  };

  const handleSubmitChat = async () => {
    try {
      const projectInquiry = formatProjectInquiry(messages);
      const emailContent = formatEmailContent(projectInquiry);

      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectInquiry.clientInfo.name,
          email: projectInquiry.clientInfo.email,
          projectType: projectInquiry.clientInfo.projectType,
          message: emailContent,
        }),
      });

      setShowCalendly(true);
    } catch (error) {
      console.error('Error sending chat history:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !input.toLowerCase().includes('submit')) return;

    determineMessageType(input);

    const userMessage: ExtendedMessage = {
      id: nanoid(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
      type: currentMessageType.current
    };

    setInput('');
    setMessages(prev => [...prev, userMessage]);

    if (input.toLowerCase() === 'submit') {
      await handleSubmitChat();
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const streamingMessageId = nanoid();
      
      setMessages(prev => [...prev, {
        id: streamingMessageId,
        role: 'assistant',
        content: '',
        isStreaming: true,
        timestamp: new Date().toISOString(),
      }]);

      let streamedContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedContent += chunk;

        setMessages(prev =>
          prev.map(msg =>
            msg.id === streamingMessageId
              ? { ...msg, content: streamedContent }
              : msg
          )
        );
      }

      setMessages(prev =>
        prev.map(msg =>
          msg.id === streamingMessageId
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        id: nanoid(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request. Please try again.',
        timestamp: new Date().toISOString(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };
  const handleCalendlyScheduled = () => {
    setShowCalendly(false);
    setIsOpen(false);
    setMessages([]);
    clearLocalStorage();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className={className}>{triggerText}</Button>
        </DialogTrigger>

        <DialogContent className="bg-gray-900/95 backdrop-blur-xl border-none max-w-3xl p-0 gap-0 rounded-3xl shadow-2xl h-[700px] flex flex-col">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-t-3xl" />

          <DialogHeader className="p-6 border-b border-gray-800">
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
              Tell Us About Your Project
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-2">
              {messages.map((message) => (
                message.role === 'assistant' ? (
                  <AIResponse
                    key={message.id}
                    content={message.content}
                    isStreaming={message.isStreaming || false}
                  />
                ) : (
                  <UserMessage
                    key={message.id}
                    content={message.content}
                  />
                )
              ))}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="p-6 border-t border-gray-800">
            <div className="flex space-x-4">
              <Button
                onClick={handleSubmitChat}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl px-6
                         hover:from-violet-500 hover:to-indigo-500 transition-all duration-300
                         flex items-center space-x-2"
              >
                <Calendar className="w-5 h-5" />
                <span>Submit & Book Call</span>
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="flex space-x-4 mt-4">
              <TextareaAutosize
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleInputKeyDown}
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
        </DialogContent>
      </Dialog>

      <CalendlyDialog 
        isOpen={showCalendly} 
        onClose={() => {
          setShowCalendly(false);
          setIsOpen(false);
          setMessages([]);
        }} 
      />
    </>
  );
};

export default AIChat;