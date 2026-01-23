'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Message, N8nWebhookRequest, N8nWebhookResponse } from './types';

const N8N_WEBHOOK_URL = 'https://cogniaai.app.n8n.cloud/webhook/5e6880d6-f561-4e50-937c-21187b924220';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

function getSessionId(): string {
  if (typeof window === 'undefined') return generateId();

  let sessionId = sessionStorage.getItem('cognia-chat-session-id');
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem('cognia-chat-session-id', sessionId);
  }
  return sessionId;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string>('');
  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize session ID on client side
  useEffect(() => {
    sessionIdRef.current = getSessionId();
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    // Add placeholder for assistant response
    const assistantPlaceholder: Message = {
      id: generateId(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
    setIsLoading(true);

    // Cancel any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      const requestBody: N8nWebhookRequest = {
        message: content.trim(),
        sessionId: sessionIdRef.current,
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
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholder.id
            ? {
                ...msg,
                content: responseText,
                isLoading: false,
              }
            : msg
        )
      );
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        // Request was cancelled, ignore
        return;
      }

      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);

      // Update placeholder with error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantPlaceholder.id
            ? {
                ...msg,
                content: 'Sorry, I encountered an error. Please try again.',
                isLoading: false,
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    // Generate new session ID on clear
    const newSessionId = generateId();
    sessionIdRef.current = newSessionId;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cognia-chat-session-id', newSessionId);
    }
  }, []);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      // Remove the loading message
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    cancelRequest,
  };
}
