/**
 * Chatbot Types
 * Type definitions for the Cognia chatbot component
 */

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: Date;
}

export interface N8nWebhookRequest {
  message: string;
  sessionId: string;
  timestamp: string;
}

export interface N8nWebhookResponse {
  output?: string;
  response?: string;
  message?: string;
  text?: string;
  // n8n can return various formats, so we handle multiple possibilities
  [key: string]: unknown;
}

export interface ChatbotConfig {
  webhookUrl: string;
  placeholder?: string;
  welcomeMessage?: string;
  botName?: string;
  position?: 'bottom-right' | 'bottom-left';
}
