import { ExtendedMessage, EmailContent } from '../components/types';

/**
 * Gets the final summary message from the AI assistant
 */
const getFinalSummary = (messages: ExtendedMessage[]): string | null => {
  // Find the last AI message that contains the project summary
  const summaryMessage = messages
    .reverse()
    .find(msg => 
      msg.role === 'assistant' && 
      msg.content.includes('Project Inquiry Summary')
    );

  return summaryMessage?.content || null;
};

/**
 * Formats the project inquiry into email content
 */
export const formatEmailContent = (messages: ExtendedMessage[]): EmailContent => {
  // Get the AI's final summary message
  const summary = getFinalSummary(messages);
  
  if (!summary) {
    return {
      name: '',
      email: '',
      projectType: '',
      message: 'No summary available'
    };
  }

  // Extract information from the standardized summary
  const nameMatch = summary.match(/Name:\s*([^\n]+)/);
  const emailMatch = summary.match(/Email:\s*([^\n]+)/);
  const typeMatch = summary.match(/Project Type:\s*([^\n]+)/);

  // Clean up the matches
  const name = nameMatch ? nameMatch[1].trim() : '';
  const email = emailMatch ? emailMatch[1].trim() : '';
  const projectType = typeMatch ? typeMatch[1].trim() : '';

  return {
    name,
    email,
    projectType,
    message: summary
  };
};