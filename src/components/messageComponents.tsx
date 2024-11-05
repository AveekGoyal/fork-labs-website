// messageComponents.tsx
import React, { useState, useEffect } from 'react';
import { Bot, User } from 'lucide-react';
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import DOMPurify from 'isomorphic-dompurify';

// Configure marked with improved styling
marked.use(
  markedHighlight({
    async: false,
    highlight: (code, lang) => {
      return code;
    }
  })
);

interface AIResponseProps {
  content: string;
  isStreaming: boolean;
}

export const AIResponse: React.FC<AIResponseProps> = ({ content, isStreaming }) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    try {
      const parsedMarkdown = marked.parse(content || '', { async: false });
      const sanitizedHtml = DOMPurify.sanitize(parsedMarkdown);
      setHtml(sanitizedHtml);
    } catch (error) {
      console.error('Error parsing markdown:', error);
      setHtml(content || '');
    }
  }, [content]);

  return (
    <div className="flex items-start space-x-4 mb-8">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
        <Bot className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <div className="bg-white/10 rounded-2xl rounded-tl-none px-6 py-4 text-gray-200 prose prose-invert max-w-none">
          <div 
            className="[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mb-6 
                       [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-4 
                       [&>p]:mb-4 [&>p]:leading-relaxed
                       [&>ul]:mb-4 [&>ul]:space-y-2 [&>ul>li]:ml-4
                       [&>hr]:my-6 [&>hr]:border-gray-700"
            dangerouslySetInnerHTML={{ __html: html }} 
          />
          {isStreaming && (
            <div className="flex items-center space-x-1 mt-2 text-violet-400">
              <span className="text-sm">AI is typing</span>
              <span className="animate-pulse delay-0">●</span>
              <span className="animate-pulse delay-150">●</span>
              <span className="animate-pulse delay-300">●</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface UserMessageProps {
  content: string;
}

export const UserMessage: React.FC<UserMessageProps> = ({ content }) => {
  return (
    <div className="flex items-start space-x-4 justify-end mb-8">
      <div className="flex-1">
        <div className="bg-violet-600 rounded-2xl rounded-tr-none px-6 py-4 text-white ml-12">
          {content}
        </div>
      </div>
      <div className="w-10 h-10 rounded-lg bg-violet-600/20 flex items-center justify-center flex-shrink-0">
        <User className="w-6 h-6 text-violet-400" />
      </div>
    </div>
  );
};