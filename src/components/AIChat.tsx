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
import { formatEmailContent } from '../utils/format';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  clearLocalStorage,
} from '../utils/storage';
import CalendlyDialog from './CalendlyDialog';
import ChatInput from './ChatInput';

interface AIChatProps {
  className?: string;
  triggerText?: string;
}

const useMessageType = () => {
  const messageTypeRef = useRef<MessageType>('name');

  const determineMessageType = (content: string, messages: ExtendedMessage[]): MessageType => {
    const lastAiMessage = messages.findLast(m => m.role === 'assistant')?.content.toLowerCase() || '';
    
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

  const handleCleanup = () => {
    setMessages([]);
    clearLocalStorage();
    setInput('');
  };

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
          content: '# Welcome to ForkLabs! 👋\n\n I\'m ForkVis, the AI assistant here at ForkLabs. I will gather some basic information about you and your project to share with the ForkLabs team. \n\nCould you please tell me your name?\n\n*Once we gather some basic information, you can click the Submit button to schedule a call with our team.*',
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

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

  const handleSubmitChat = async () => {
    try {
      setIsLoading(true);
      const summaryData = extractSummaryFromMessages(messages);
  
      // Find the last AI message before submit
      const lastAIMessage = messages
        .filter(m => m.role === 'assistant')
        .pop()?.content || '';
  
      // Extract name from the message for email subject
      const nameMatch = lastAIMessage.match(/Name:\s*([^\n]+)/);
      const name = nameMatch ? nameMatch[1].trim() : 'Client';
  
      // Extract content starting from "Project Inquiry Summary"
      // and ending right before "Next Steps" section (not including Next Steps)
      const summaryStartIndex = lastAIMessage.indexOf('# Project Inquiry Summary');
      const nextStepsIndex = lastAIMessage.indexOf('## Next Steps');
      
      let messageContent = '';
      if (summaryStartIndex !== -1) {
        // If nextStepsIndex is found, slice up to but not including "## Next Steps"
        // If nextStepsIndex is not found, slice to the end of the message
        messageContent = lastAIMessage.slice(
          summaryStartIndex,
          nextStepsIndex !== -1 ? nextStepsIndex : undefined
        ).trim();
      } else {
        // Fallback to original content if summary section not found
        messageContent = lastAIMessage;
      }
  
      const emailContent = {
        name,
        email: 'fork.labs.devs@gmail.com',
        projectType: 'Project Inquiry',
        message: messageContent // Contains only the Project Inquiry Summary section
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

// In your AIChat.tsx, update the handleSubmit function:

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
  
  // First add user message
  setMessages(prev => [...prev, userMessage]);

  if (input.toLowerCase() === 'submit') {
    await handleSubmitChat();
    return;
  }
  // Immediately show typing indicator
  setMessages(prev => [...prev, {
    id: 'typing-indicator',
    role: 'system', // Changed role from 'typing' to 'system' to match the expected types
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
    
    // Replace typing indicator with streaming message
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
    // Remove typing indicator and show error
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

// Then in your render function, update the messages mapping:
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
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSubmit(e as any);
    }
  };

  const handleCalendlyScheduled = () => {
    setShowCalendly(false);
    setMessages(prev => [...prev, {
      id: nanoid(),
      role: 'assistant',
      content: '# Thanks for scheduling a call! 🎉\n\nWe\'ve sent you a calendar invitation. Looking forward to discussing your project in detail.',
      timestamp: new Date().toISOString(),
    }]);
    
    // Clear the chat after a brief delay
    setTimeout(() => {
      setIsOpen(false);
      handleCleanup();
    }, 3000);
  };

  return (
    <>
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

          className="bg-gray-900/95 backdrop-blur-xl border-none max-w-3xl p-0 gap-0 rounded-3xl shadow-2xl h-[700px] flex flex-col [&>button]:text-white [&>button]:hover:text-gray-300"
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
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-t-3xl" />

          <DialogHeader className="p-6 border-b border-gray-800">
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">
              Tell Us About Your Project
            </DialogTitle>
          </DialogHeader>
        <ScrollArea className="flex-1 p-6">
        <div className="space-y-2">
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

          <ChatInput
            input={input}
            isLoading={isLoading}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onSubmitChat={handleSubmitChat}
            onKeyDown={(e) => handleInputKeyDown(e as React.KeyboardEvent<HTMLTextAreaElement>)}
          />
        </DialogContent>
      </Dialog>
      <CalendlyDialog 
        isOpen={showCalendly}
        onClose={() => setShowCalendly(false)}
        onScheduled={handleCalendlyScheduled}
      />
    </>
  );
};

export default AIChat;