'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Chat, Message, ChatState } from './types';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function generateTitle(content: string): string {
  // Generate a title from the first message (truncate to 50 chars)
  const title = content.slice(0, 50);
  return title.length < content.length ? `${title}...` : title;
}

interface ChatStore extends ChatState {
  // Actions
  createChat: (firstMessage?: string) => string;
  deleteChat: (chatId: string) => void;
  deleteMessage: (chatId: string, messageId: string) => void;
  setCurrentChat: (chatId: string | null) => void;
  addMessage: (chatId: string, role: 'user' | 'assistant', content: string) => Message;
  updateMessage: (chatId: string, messageId: string, content: string) => void;
  getMessages: (chatId: string) => Message[];
  getChatById: (chatId: string) => Chat | undefined;
  clearAllChats: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      messages: {},
      currentChatId: null,

      createChat: (firstMessage?: string) => {
        const id = generateId();
        const now = new Date().toISOString();
        const title = firstMessage ? generateTitle(firstMessage) : 'New Chat';

        const newChat: Chat = {
          id,
          title,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          chats: [newChat, ...state.chats],
          messages: { ...state.messages, [id]: [] },
          currentChatId: id,
        }));

        return id;
      },

      deleteChat: (chatId: string) => {
        set((state) => {
          const newMessages = { ...state.messages };
          delete newMessages[chatId];

          const newChats = state.chats.filter((c) => c.id !== chatId);
          const newCurrentId = state.currentChatId === chatId
            ? (newChats[0]?.id || null)
            : state.currentChatId;

          return {
            chats: newChats,
            messages: newMessages,
            currentChatId: newCurrentId,
          };
        });
      },

      deleteMessage: (chatId: string, messageId: string) => {
        set((state) => {
          const chatMessages = state.messages[chatId] || [];
          return {
            messages: {
              ...state.messages,
              [chatId]: chatMessages.filter((m) => m.id !== messageId),
            },
          };
        });
      },

      setCurrentChat: (chatId: string | null) => {
        set({ currentChatId: chatId });
      },

      addMessage: (chatId: string, role: 'user' | 'assistant', content: string) => {
        const message: Message = {
          id: generateId(),
          chatId,
          role,
          content,
          createdAt: new Date().toISOString(),
        };

        set((state) => {
          const chatMessages = state.messages[chatId] || [];
          const chat = state.chats.find((c) => c.id === chatId);

          // Update chat title if this is the first user message
          let updatedChats = state.chats;
          if (role === 'user' && chatMessages.length === 0 && chat) {
            updatedChats = state.chats.map((c) =>
              c.id === chatId
                ? { ...c, title: generateTitle(content), updatedAt: new Date().toISOString() }
                : c
            );
          } else if (chat) {
            // Just update the updatedAt timestamp
            updatedChats = state.chats.map((c) =>
              c.id === chatId
                ? { ...c, updatedAt: new Date().toISOString() }
                : c
            );
          }

          return {
            messages: {
              ...state.messages,
              [chatId]: [...chatMessages, message],
            },
            chats: updatedChats,
          };
        });

        return message;
      },

      updateMessage: (chatId: string, messageId: string, content: string) => {
        set((state) => {
          const chatMessages = state.messages[chatId] || [];
          return {
            messages: {
              ...state.messages,
              [chatId]: chatMessages.map((m) =>
                m.id === messageId ? { ...m, content } : m
              ),
            },
          };
        });
      },

      getMessages: (chatId: string) => {
        return get().messages[chatId] || [];
      },

      getChatById: (chatId: string) => {
        return get().chats.find((c) => c.id === chatId);
      },

      clearAllChats: () => {
        set({
          chats: [],
          messages: {},
          currentChatId: null,
        });
      },
    }),
    {
      name: 'cognia-chat-storage',
      version: 1,
    }
  )
);
