import { Message } from 'ai';

export type MessageType = 'name' | 'email' | 'projectType' | 'requirements' | 'general';
export type ProjectType = 'AI' | 'Blockchain' | 'Web' | 'Custom';

export interface ExtendedMessage extends Message {
  isStreaming?: boolean;
  type?: MessageType;
  timestamp?: string;
}

export interface ProjectInquiry {
  clientInfo: {
    name: string;
    email: string;
    projectType: ProjectType;
    requirements: string;
  };
  metadata: {
    submissionTime: string;
    conversationLength: number;
  };
  conversationLog: ConversationEntry[];
}

export interface ConversationEntry {
  timestamp: string;
  speaker: 'AI' | 'User';
  content: string;
  type?: MessageType;
}

export interface EmailContent {
  name: string;
  email: string;
  projectType: string;
  message: string;
}