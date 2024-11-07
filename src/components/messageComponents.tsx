import React, { useState, useEffect, memo } from 'react';
import { Bot, User } from 'lucide-react';
import { marked } from 'marked';
import { markedHighlight } from "marked-highlight";
import DOMPurify from 'isomorphic-dompurify';
import styles from './messages.module.css';

// Configure marked with improved styling
marked.use(
  markedHighlight({
    async: false,
    highlight: (code, lang) => code,
  })
);

interface AIResponseProps {
  content: string;
  isStreaming: boolean;
}

const TypingIndicator = () => (
  <div className={styles.typingIndicator}>
    <span className="text-sm">AI is typing</span>
    <span className={styles.typingDot}>●</span>
    <span className={styles.typingDot}>●</span>
    <span className={styles.typingDot}>●</span>
  </div>
);

export const AIResponse: React.FC<AIResponseProps> = memo(({ content, isStreaming }) => {
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
    <div className={styles.messageContainer}>
      <div className={styles.aiIcon}>
        <Bot className="w-6 h-6 text-white" />
      </div>
      <div className={styles.aiMessage}>
        <div className={styles.aiContent}>
          <div 
            className={styles.markdown}
            dangerouslySetInnerHTML={{ __html: html }} 
          />
          {isStreaming && <TypingIndicator />}
        </div>
      </div>
    </div>
  );
});

AIResponse.displayName = 'AIResponse';

interface UserMessageProps {
  content: string;
}

export const UserMessage: React.FC<UserMessageProps> = memo(({ content }) => {
  return (
    <div className={styles.userMessage}>
      <div className={styles.userContent}>
        {content}
      </div>
      <div className={styles.userIcon}>
        <User className="w-6 h-6 text-violet-400" />
      </div>
    </div>
  );
});

UserMessage.displayName = 'UserMessage';