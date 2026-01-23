/**
 * Chat Types for Cognia Chat Page
 */

export interface Message {
  id: string;
  chatId: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>; // chatId -> messages
  currentChatId: string | null;
}

export interface N8nWebhookRequest {
  message: string;
  sessionId: string;
  chatId: string;
  timestamp: string;
}

export interface N8nWebhookResponse {
  output?: string;
  response?: string;
  message?: string;
  text?: string;
  [key: string]: unknown;
}
