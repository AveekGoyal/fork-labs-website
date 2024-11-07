import React, { useState, useEffect, memo } from 'react';
import { Bot, User } from 'lucide-react';
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import DOMPurify from 'isomorphic-dompurify';

marked.use(
  markedHighlight({
    async: false,
    highlight: (code, lang) => code,
  })
);

export const TypingIndicator = () => (
  <div className="flex items-start space-x-3 group mb-6">
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 bg-violet-500 rounded-xl" />
      <div className="relative w-full h-full flex items-center justify-center">
        <Bot className="w-5 h-5 text-white" />
      </div>
    </div>
    <div className="flex-1">
      <div className="inline-flex items-center px-4 py-2 space-x-2 bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none">
        <div className="flex items-center space-x-2">
          <span className="text-white">ForkVis is typing</span>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
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
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-violet-500 rounded-xl" />
        <div className="relative w-full h-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <div className="inline-block max-w-[85%] px-6 py-4 bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none">
          <div className="prose prose-invert max-w-none">
            <div 
              className="text-white markdown-content"
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
        <div className="inline-block max-w-[85%] px-6 py-4 bg-violet-600 rounded-2xl rounded-tr-none">
          <span className="text-white">{content}</span>
        </div>
      </div>
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 bg-violet-500/20 rounded-xl" />
        <div className="relative w-full h-full flex items-center justify-center">
          <User className="w-5 h-5 text-violet-400" />
        </div>
      </div>
    </div>
  );
});

UserMessage.displayName = 'UserMessage';

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
    color: white;
  }

  .markdown-content ul {
    list-style-type: disc;
    margin-left: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .markdown-content li {
    margin-bottom: 0.25rem;
    color: white;
  }

  .markdown-content em {
    color: rgb(199, 196, 212);
    font-style: italic;
  }

  .markdown-content code {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-family: monospace;
    color: white;
  }
`;

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