'use client';

import React, { useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChatStore } from './chat-store';
import { useChatApi } from './use-chat-api';

const SUGGESTIONS = [
  'What services does Cognia AI offer?',
  'How does the AI receptionist work?',
  'Can you help me schedule a demo?',
  'What industries do you work with?',
  'Tell me about voice AI agents',
];

export function ChatArea() {
  const { currentChatId, getMessages } = useChatStore();
  const { isLoading, sendMessage, cancelRequest, regenerateLastResponse } = useChatApi();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const initialMessageSent = useRef(false);
  const sendMessageRef = useRef(sendMessage);

  // Keep sendMessage ref updated
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  }, [sendMessage]);

  const messages = currentChatId ? getMessages(currentChatId) : [];
  const showWelcome = !currentChatId || messages.length === 0;

  // Handle initial message from URL parameter (e.g., from demo section)
  useEffect(() => {
    const messageParam = searchParams.get('message');
    if (messageParam && !initialMessageSent.current) {
      initialMessageSent.current = true;
      // Small delay to ensure the chat is ready
      const timer = setTimeout(() => {
        sendMessageRef.current(messageParam);
        // Clean up URL by removing the message parameter
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href);
          url.searchParams.delete('message');
          window.history.replaceState({}, '', url.pathname);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Auto-scroll to bottom (scoped to scroll container to prevent page-level jumps)
  useEffect(() => {
    if (scrollContainerRef.current && messages.length > 0) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900">
      {/* Messages Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pt-14 lg:pt-20">
        {showWelcome ? (
          <WelcomeScreen />
        ) : (
          <div className="w-full max-w-[min(90%,800px)] mx-auto px-4 sm:px-6 pt-4 pb-8 space-y-6">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                onRegenerate={
                  // Only show regenerate on the last assistant message
                  message.role === 'assistant' && index === messages.length - 1
                    ? regenerateLastResponse
                    : undefined
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="
        bg-white/80 dark:bg-gray-900/80
        backdrop-blur-xl
      ">
        <div className="w-full max-w-[min(90%,800px)] mx-auto">
          {/* Suggestion Pills - only show on welcome screen */}
          {showWelcome && (
            <SuggestionPills
              suggestions={SUGGESTIONS}
              onSelect={handleSuggestionClick}
            />
          )}
          <ChatInput
            onSend={sendMessage}
            onCancel={cancelRequest}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-8 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="text-center w-full max-w-[min(90%,640px)] px-4"
      >
        {/* Logo/Icon - Cognia AI Logo */}
        <div className="mb-8">
          <div className="
            w-16 h-16 rounded-2xl
            bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600
            flex items-center justify-center mx-auto
            shadow-xl shadow-blue-500/25
            overflow-hidden
          ">
            <Image
              src="/cognia-c-icon.png"
              alt="Cognia AI"
              width={32}
              height={32}
              className="w-8 h-8 brightness-0 invert"
            />
          </div>
        </div>

        {/* Title - Using Cognia AI's serif font */}
        <h1 className="text-3xl md:text-4xl font-serif font-normal text-gray-900 dark:text-white mb-4 tracking-tight">
          How can I help you?
        </h1>

        {/* Description */}
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-sm mx-auto font-sans leading-relaxed">
          I&apos;m your Cognia AI assistant. Ask me anything about our services and AI solutions.
        </p>
      </motion.div>
    </div>
  );
}

interface SuggestionPillsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

function SuggestionPills({ suggestions, onSelect }: SuggestionPillsProps) {
  return (
    <div className="relative px-4 sm:px-6 pb-2">
      {/* Scrollable container */}
      <div
        className="
          flex gap-2 overflow-x-auto
          scrollbar-none
          -mx-4 sm:-mx-6 px-4 sm:px-6
        "
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSelect(suggestion)}
            className="
              flex-shrink-0
              px-4 py-2
              bg-white dark:bg-gray-800
              border border-gray-200 dark:border-gray-700
              rounded-full
              text-sm font-medium
              text-gray-600 dark:text-gray-300
              hover:bg-gray-50 dark:hover:bg-gray-700
              hover:border-gray-300 dark:hover:border-gray-600
              transition-colors duration-150
              whitespace-nowrap
            "
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Right fade gradient */}
      <div className="
        absolute right-0 top-0 bottom-2
        w-12 pointer-events-none
        bg-gradient-to-l from-white dark:from-gray-900 to-transparent
      " />
    </div>
  );
}
