import React, { useState, useEffect, memo } from 'react';
import { Bot, User } from 'lucide-react';
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import DOMPurify from 'isomorphic-dompurify';

// Configure marked
marked.use(
  markedHighlight({
    async: false,
    highlight: (code, lang) => code,
  })
);

// Standalone Typing Indicator Component
export const TypingIndicator = () => (
  <div className="flex items-start space-x-3 group mb-6">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 
                    flex items-center justify-center flex-shrink-0 shadow-lg">
      <Bot className="w-5 h-5 text-white" />
    </div>
    <div className="flex-1">
      <div className="inline-flex items-center space-x-2 px-4 py-2.5 bg-gray-900/80 
                    backdrop-blur-sm rounded-2xl rounded-tl-none border border-gray-700/50">
        <div className="flex items-center text-gray-200 space-x-2">
          <span>ForkVis is typing</span>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" 
                 style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" 
                 style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" 
                 style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);


export const AIResponse = memo(({ content, isStreaming }: { content: string; isStreaming: boolean }) => {
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
    <div className="flex items-start space-x-3 group mb-6">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 
                    flex items-center justify-center flex-shrink-0 shadow-lg">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <div className="inline-block bg-gray-900/80 backdrop-blur-sm rounded-2xl rounded-tl-none 
                      px-6 py-4 shadow-xl border border-gray-700/50 max-w-[85%]">
          <div className="max-w-none">
            <div 
              className="text-gray-100 markdown-content"
              dangerouslySetInnerHTML={{ __html: html }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
});

AIResponse.displayName = 'AIResponse';

export const UserMessage = memo(({ content }: { content: string }) => {
  return (
    <div className="flex items-start space-x-3 justify-end group mb-6">
      <div className="flex-1 flex justify-end">
        <div className="inline-block bg-gradient-to-br from-violet-600 to-indigo-600 
                      rounded-2xl rounded-tr-none px-6 py-4
                      shadow-xl text-white max-w-[85%]">
          {content}
        </div>
      </div>
      <div className="w-8 h-8 rounded-lg bg-violet-600/20 
                    flex items-center justify-center flex-shrink-0">
        <User className="w-5 h-5 text-violet-400" />
      </div>
    </div>
  );
});

UserMessage.displayName = 'UserMessage';

// Add some global styles for markdown content
const styles = `
  .markdown-content h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: white;
  }

  .markdown-content h2 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.75rem;
    color: white;
  }

  .markdown-content p {
    margin-bottom: 0.75rem;
    line-height: 1.6;
  }

  .markdown-content ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .markdown-content li {
    margin-bottom: 0.25rem;
  }

  .markdown-content code {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-family: monospace;
  }
`;

// Insert styles into document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default {
  AIResponse,
  UserMessage,
  TypingIndicator,
};