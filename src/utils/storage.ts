import { ExtendedMessage } from '../components/types';

const STORAGE_KEY = 'forklabs-chat-state';
const MESSAGE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface StoredChatState {
  messages: ExtendedMessage[];
  timestamp: number;
}

/**
 * Saves chat messages to localStorage
 * @param messages Array of chat messages to save
 */
export const saveToLocalStorage = (messages: ExtendedMessage[]): void => {
  try {
    const state: StoredChatState = {
      messages,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving chat state:', error);
  }
};

/**
 * Loads chat messages from localStorage
 * @returns Array of messages if found and not expired, null otherwise
 */
export const loadFromLocalStorage = (): ExtendedMessage[] | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const state: StoredChatState = JSON.parse(stored);
    // Only restore if less than 24 hours old
    if (Date.now() - state.timestamp < MESSAGE_EXPIRY) {
      return state.messages;
    }
    return null;
  } catch (error) {
    console.error('Error loading chat state:', error);
    return null;
  }
};

/**
 * Clears chat messages from localStorage
 */
export const clearLocalStorage = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};