import React, { useState, useRef, useEffect } from 'react';
import { nanoid } from 'nanoid';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AIResponse, TypingIndicator, UserMessage } from './messageComponents';
import { ExtendedMessage, MessageType } from './types';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage,
} from '../utils/storage';
import CalendlyDialog from './CalendlyDialog';
import ChatInput from './ChatInput';
import BlurOverlay from './BlurOverlay';

// Props interface for AIChat component
interface AIChatProps {
  className?: string;
  triggerText?: string;
}

// Custom hook to determine message type
const useMessageType = () => {
  const messageTypeRef = useRef<MessageType>('name');

  const determineMessageType = (content: string, messages: ExtendedMessage[]): MessageType => {
    const lastAiMessage = messages.findLast(m => m.role === 'assistant')?.content.toLowerCase() || '';
    
    // Determine message type based on content
    if (lastAiMessage.includes('name')) return 'name';
    if (lastAiMessage.includes('email')) return 'email';
    if (lastAiMessage.includes('type of project') || lastAiMessage.includes('project type')) return 'projectType';
    if (lastAiMessage.includes('requirements') || lastAiMessage.includes('overview')) return 'requirements';
    return 'general';
  };

  return {
    currentType: messageTypeRef.current,
    determineMessageType: (content: string, messages: ExtendedMessage[]) => {
      messageTypeRef.current = determineMessageType(content, messages);
      return messageTypeRef.current;
    }
  };
};

// Main AIChat component
const AIChat: React.FC<AIChatProps> = ({
  className = "bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-full px-8 py-6 text-lg",
  triggerText = "Connect with us"
}) => {
  const [messages, setMessages] = useState<ExtendedMessage[]>([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { determineMessageType } = useMessageType();

  // Cleanup function to reset state
  const handleCleanup = () => {
    setMessages([]);
    clearLocalStorage();
    setInput('');
  };

  // Load saved messages when dialog opens
  useEffect(() => {
    if (isOpen) {
      const savedMessages = loadFromLocalStorage();
      if (savedMessages && savedMessages.length > 0) {
        setMessages(savedMessages);
      } else {
        setMessages([{
          id: nanoid(),
          role: 'assistant',
          content: '# Welcome to ForkLabs! 👋\n\n I\'m ForkVis, the AI assistant here at ForkLabs. I will gather some basic information about you and your project to share with the ForkLabs team. \n\nCould you please tell me your name?\n\n*Once we gather some basic information, you can click the Submit button to schedule a call with our team.*',
          timestamp: new Date().toISOString(),
        }]);
      }
    }
  }, [isOpen]);

  // Save messages to local storage
  useEffect(() => {
    if (messages.length > 0) {
      saveToLocalStorage(messages);
    }
  }, [messages]);

  // Scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Extract summary data from messages
  const extractSummaryFromMessages = (messages: ExtendedMessage[]) => {
    const name = messages.find(m => m.type === 'name' && m.role === 'user')?.content || '';
    const email = messages.find(m => m.type === 'email' && m.role === 'user')?.content || '';
    const projectType = messages.find(m => m.type === 'projectType' && m.role === 'user')?.content || '';
    const requirements = messages.find(m => m.type === 'requirements' && m.role === 'user')?.content || '';

    return {
      name,
      email,
      projectType,
      requirements
    };
  };

  // Handle chat submission
  const handleSubmitChat = async () => {
    try {
      setIsLoading(true);
      const summaryData = extractSummaryFromMessages(messages);
      const lastAIMessage = messages
        .filter(m => m.role === 'assistant')
        .pop()?.content || '';
  
      const nameMatch = lastAIMessage.match(/Name:\s*([^\n]+)/);
      const name = nameMatch ? nameMatch[1].trim() : 'Client';
  
      const summaryStartIndex = lastAIMessage.indexOf('# Project Inquiry Summary');
      const nextStepsIndex = lastAIMessage.indexOf('## Next Steps');
      
      let messageContent = '';
      if (summaryStartIndex !== -1) {
        messageContent = lastAIMessage.slice(
          summaryStartIndex,
          nextStepsIndex !== -1 ? nextStepsIndex : undefined
        ).trim();
      } else {
        messageContent = lastAIMessage;
      }
  
      const emailContent = {
        name,
        email: 'fork.labs.devs@gmail.com',
        projectType: 'Project Inquiry',
        message: messageContent
      };
  
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailContent),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
  
      setMessages(prev => [...prev, {
        id: nanoid(),
        role: 'assistant',
        content: '# Great! Let\'s schedule a call 🎉\n\nI\'ll open the scheduling window for you now. Choose a time that works best for you.',
        timestamp: new Date().toISOString(),
      }]);
  
      setTimeout(() => {
        setShowCalendly(true);
      }, 1500);
  
    } catch (error) {
      console.error('Error sending chat history:', error);
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

  // Handle user message submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageType = determineMessageType(input, messages);
    const userMessage: ExtendedMessage = {
      id: nanoid(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
      type: messageType
    };

    setInput('');
    
    setMessages(prev => [...prev, userMessage]);

    if (input.toLowerCase() === 'submit') {
      await handleSubmitChat();
      return;
    }

    setMessages(prev => [...prev, {
      id: 'typing-indicator',
      role: 'system', 
      content: '',
      timestamp: new Date().toISOString(),
    }]);

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      });

      if (!response.ok) throw new Error('API request failed');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const streamingMessageId = nanoid();
      
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== 'typing-indicator'),
        {
          id: streamingMessageId,
          role: 'assistant',
          content: '',
          isStreaming: true,
          timestamp: new Date().toISOString(),
        }
      ]);

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
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== 'typing-indicator'),
        {
          id: nanoid(),
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again.',
          timestamp: new Date().toISOString(),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render messages
  {messages.map((message) => {
    if (message.role === 'assistant' && message.isStreaming) {
      return <TypingIndicator key={message.id} />;
    }
    return message.role === 'assistant' ? (
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
    );
  })}

  // Handle Enter key for input submission
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit(e as any);
    }
  };

  // Handle scheduling confirmation
  const handleCalendlyScheduled = () => {
    setShowCalendly(false);
    setMessages(prev => [...prev, {
      id: nanoid(),
      role: 'assistant',
      content: '# Thanks for scheduling a call! 🎉\n\nWe\'ve sent you a calendar invitation. Looking forward to discussing your project in detail.',
      timestamp: new Date().toISOString(),
    }]);
    
    setTimeout(() => {
      setIsOpen(false);
      handleCleanup();
    }, 3000);
  };

  return (
    <>
      <BlurOverlay isVisible={isOpen} />
      <Dialog 
        open={isOpen} 
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            handleCleanup();
          }
        }}
      >
        <DialogTrigger asChild>
          <Button className={className}>{triggerText}</Button>
        </DialogTrigger>

        <DialogContent 
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[90vw] max-w-3xl h-[85vh] sm:h-[80vh] p-0 border-none bg-transparent"
          data-shadcn-dialog="content"
          onPointerDownOutside={(e) => {
            if (messages.length >= 1) {
              e.preventDefault();
            }
          }}
          onInteractOutside={(e) => {
            if (messages.length >= 1) {
              e.preventDefault();
            }
          }}
        >
          <div className="relative w-full h-full rounded-3xl flex flex-col overflow-hidden">
            {/* Background elements remain the same */}
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md border border-slate-800/50" />
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl animate-blob1 mix-blend-soft-light" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-blob2 mix-blend-soft-light" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.05),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.05),transparent_50%)]" />
            </div>

            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

            <div className="relative flex flex-col h-full">
              <DialogHeader className="flex-shrink-0 px-3 sm:px-8 pt-4 sm:pt-8 pb-2 sm:pb-4">
                <DialogTitle className="text-lg sm:text-xl font-semibold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
                  Tell Us About Your Project
                </DialogTitle>
              </DialogHeader>

              <ScrollArea className="flex-1 px-3 sm:px-8 pb-2 sm:pb-4 pt-2">
                <div className="space-y-3 sm:space-y-6 pr-2 pt-4 sm:pt-2">
                  {messages.map((message) => {
                    if (message.role === 'system') {
                      return <TypingIndicator key={message.id} />;
                    }
                    return message.role === 'assistant' ? (
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
                    );
                  })}
                </div>
                <div ref={messagesEndRef} />
              </ScrollArea>

              <div className="flex-shrink-0 p-3 sm:p-8 pt-2 sm:pt-4">
                <ChatInput
                  input={input}
                  isLoading={isLoading}
                  onInputChange={setInput}
                  onSubmit={handleSubmit}
                  onSubmitChat={handleSubmitChat}
                  onKeyDown={handleInputKeyDown}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <CalendlyDialog 
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
        onScheduled={handleCalendlyScheduled}
      />

      <style jsx global>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          33% { transform: translate(30px, 30px) scale(1.1); opacity: 0.5; }
          66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.3; }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          33% { transform: translate(-30px, -30px) scale(1.1); opacity: 0.5; }
          66% { transform: translate(20px, -20px) scale(0.9); opacity: 0.3; }
        }
            button[type="button"].absolute.right-4.top-4 {
    color: white;  // This is the close button styling
  }
        
        /* Mobile-specific styles */
        @media (max-width: 640px) {
          .prose-invert {
            max-width: 100%;
            overflow-wrap: break-word;
            word-wrap: break-word;
            word-break: break-word;
          }
          
          .markdown-content {
            font-size: 0.875rem;
            line-height: 1.4;
          }
          
          .markdown-content h1 {
            font-size: 1.125rem;
            margin-bottom: 0.5rem;
            line-height: 1.3;
          }
          
          .markdown-content h2 {
            font-size: 1rem;
            margin-bottom: 0.4rem;
            line-height: 1.3;
          }
          
          .markdown-content p {
            margin-bottom: 0.4rem;
            line-height: 1.4;
          }
          
          .markdown-content ul {
            padding-left: 1rem;
            margin-bottom: 0.4rem;
          }
          
          .markdown-content li {
            margin-bottom: 0.2rem;
          }
          
          /* Message bubbles optimization for mobile */
          [class*='flex items-start space-x-3'] {
            margin-bottom: 0.75rem;
          }

          /* Increase max-width for message boxes on mobile */
          .inline-block.max-w-\[85\%\] {
            max-width: 92% !important;
          }
          
          /* User and AI icons size adjustment for mobile */
          [class*='relative w-8 h-8'] {
            width: 1.75rem;
            height: 1.75rem;
          }
          
          /* Reduce space between icon and message */
          .space-x-3 {
            gap: 0.5rem !important;
          }
          
          /* Message content padding adjustment for mobile */
          [class*='px-6 py-4'] {
            padding: 0.75rem 1rem;
          }
          
          /* Optimize chat input area for mobile */
          textarea {
            font-size: 0.9375rem;
            padding: 0.5rem 0.75rem;
            min-height: 40px;
          }
          
          /* Adjust submit button for mobile */
          button[type="submit"] {
            padding: 0.5rem;
          }
          
          /* Optimize scrollbar for mobile */
          ::-webkit-scrollbar {
            width: 3px;
          }
          
          ::-webkit-scrollbar-thumb {
            background-color: rgba(139, 92, 246, 0.3);
          }
        }
      `}</style>
    </>
  );
};

export default AIChat;