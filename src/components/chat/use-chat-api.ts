'use client';

import { useState, useCallback, useRef } from 'react';
import { useChatStore } from './chat-store';
import type { N8nWebhookRequest, N8nWebhookResponse } from './types';

const N8N_WEBHOOK_URL = 'https://cogniaai.app.n8n.cloud/webhook/5e6880d6-f561-4e50-937c-21187b924220';

export function useChatApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const { addMessage, updateMessage, createChat, currentChatId, setCurrentChat } = useChatStore();

  const sendMessage = useCallback(async (content: string, chatId?: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);

    // Create new chat if needed
    let activeChatId = chatId || currentChatId;
    if (!activeChatId) {
      activeChatId = createChat(content);
    }

    // Add user message
    addMessage(activeChatId, 'user', content.trim());

    // Add placeholder for assistant response
    const assistantMessage = addMessage(activeChatId, 'assistant', '');

    setIsLoading(true);

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const requestBody: N8nWebhookRequest = {
        message: content.trim(),
        sessionId: activeChatId,
        chatId: activeChatId,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: N8nWebhookResponse = await response.json();

      // Extract response text from various possible formats
      const responseText =
        data.output ||
        data.response ||
        data.message ||
        data.text ||
        (typeof data === 'string' ? data : JSON.stringify(data));

      // Update the placeholder message with actual response
      updateMessage(activeChatId, assistantMessage.id, responseText);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);

      // Update placeholder with error message
      updateMessage(
        activeChatId,
        assistantMessage.id,
        'Sorry, I encountered an error. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentChatId, createChat, addMessage, updateMessage]);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  const startNewChat = useCallback(() => {
    setCurrentChat(null);
  }, [setCurrentChat]);

  const regenerateLastResponse = useCallback(async () => {
    if (!currentChatId || isLoading) return;

    const { getMessages, deleteMessage } = useChatStore.getState();
    const messages = getMessages(currentChatId);

    if (messages.length < 2) return;

    // Find the last user message and assistant message
    const lastAssistantIndex = messages.findLastIndex(m => m.role === 'assistant');
    const lastUserIndex = messages.findLastIndex(m => m.role === 'user');

    if (lastAssistantIndex === -1 || lastUserIndex === -1) return;

    const lastUserMessage = messages[lastUserIndex];
    const lastAssistantMessage = messages[lastAssistantIndex];

    // Delete the last assistant message
    deleteMessage(currentChatId, lastAssistantMessage.id);

    // Add new placeholder for assistant response
    const newAssistantMessage = addMessage(currentChatId, 'assistant', '');

    setIsLoading(true);

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const requestBody: N8nWebhookRequest = {
        message: lastUserMessage.content,
        sessionId: currentChatId,
        chatId: currentChatId,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: N8nWebhookResponse = await response.json();

      const responseText =
        data.output ||
        data.response ||
        data.message ||
        data.text ||
        (typeof data === 'string' ? data : JSON.stringify(data));

      updateMessage(currentChatId, newAssistantMessage.id, responseText);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      updateMessage(
        currentChatId,
        newAssistantMessage.id,
        'Sorry, I encountered an error. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, currentChatId, addMessage, updateMessage]);

  return {
    isLoading,
    error,
    sendMessage,
    cancelRequest,
    startNewChat,
    regenerateLastResponse,
  };
}
