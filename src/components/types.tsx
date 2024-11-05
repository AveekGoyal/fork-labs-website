// types.ts
import { Message } from 'ai';

export interface ProjectInquiry {
  clientInfo: {
    name: string;
    email: string;
    projectType: string;
    requirements: string;
  };
  metadata: {
    submissionTime: string;
    conversationLength: number;
  };
  additionalNotes: string[];
  conversationLog: {
    timestamp: string;
    speaker: 'AI' | 'User';
    content: string;
    type?: 'name' | 'email' | 'projectType' | 'requirements' | 'general';
  }[];
}

export interface ExtendedMessage extends Message {
  isStreaming?: boolean;
  type?: 'name' | 'email' | 'projectType' | 'requirements' | 'general';
  timestamp?: string;
}

// Format the chat data into a structured project inquiry
export const formatProjectInquiry = (messages: ExtendedMessage[]): ProjectInquiry => {
  const inquiry: ProjectInquiry = {
    clientInfo: {
      name: '',
      email: '',
      projectType: '',
      requirements: ''
    },
    metadata: {
      submissionTime: new Date().toISOString(),
      conversationLength: messages.length
    },
    additionalNotes: [],
    conversationLog: []
  };

  // Extract client info and build conversation log
  messages.forEach((msg) => {
    // Add to conversation log with timestamp
    inquiry.conversationLog.push({
      timestamp: msg.timestamp || new Date().toISOString(),
      speaker: msg.role === 'assistant' ? 'AI' : 'User',
      content: msg.content,
      type: msg.type
    });

    // Extract client info based on message type
    if (msg.role === 'user' && msg.type) {
      switch (msg.type) {
        case 'name':
          inquiry.clientInfo.name = msg.content;
          break;
        case 'email':
          inquiry.clientInfo.email = msg.content;
          break;
        case 'projectType':
          inquiry.clientInfo.projectType = msg.content;
          break;
        case 'requirements':
          inquiry.clientInfo.requirements = msg.content;
          break;
        case 'general':
          inquiry.additionalNotes.push(msg.content);
          break;
      }
    }
  });

  return inquiry;
};

// Format the project inquiry into a markdown string
export const formatEmailContent = (inquiry: ProjectInquiry): string => {
  const markdown = `
# Project Inquiry from ${inquiry.clientInfo.name}
Submitted: ${new Date(inquiry.metadata.submissionTime).toLocaleString()}

## Client Information
- Name: ${inquiry.clientInfo.name}
- Email: ${inquiry.clientInfo.email}
- Project Type: ${inquiry.clientInfo.projectType}

## Project Requirements
${inquiry.clientInfo.requirements}

${inquiry.additionalNotes.length > 0 ? `
## Additional Information
${inquiry.additionalNotes.join('\n')}
` : ''}

## Conversation History
${inquiry.conversationLog.map(log => 
  `[${new Date(log.timestamp).toLocaleTimeString()}] ${log.speaker}: ${log.content}`
).join('\n')}
`;

  return markdown;
};