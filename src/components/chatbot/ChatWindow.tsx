'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, MessageCircle } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from './use-chat';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const { messages, isLoading, error, sendMessage, clearMessages, cancelRequest } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="
            fixed bottom-24 right-4 z-50
            w-[380px] max-w-[calc(100vw-2rem)]
            h-[550px] max-h-[calc(100vh-8rem)]
            flex flex-col
            bg-[var(--bg-primary)] dark:bg-gray-900
            rounded-2xl
            border border-[var(--border-primary)]
            shadow-2xl shadow-black/10 dark:shadow-black/30
            overflow-hidden
          "
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-primary)] bg-gradient-to-r from-[#1E40AF] to-[#3b82f6]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Cognia AI Assistant</h3>
                <p className="text-white/70 text-xs">
                  {isLoading ? 'Typing...' : 'Online'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clearMessages}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Clear chat"
                  title="Clear chat"
                >
                  <Trash2 className="w-4 h-4 text-white/80" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <WelcomeMessage onSendMessage={sendMessage} isLoading={isLoading} />
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </>
            )}
            {error && (
              <div className="text-center text-xs text-red-500 py-2">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            onSend={sendMessage}
            onCancel={cancelRequest}
            isLoading={isLoading}
            placeholder="Ask me anything..."
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface WelcomeMessageProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

function WelcomeMessage({ onSendMessage, isLoading }: WelcomeMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-8">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3b82f6] flex items-center justify-center mb-4">
        <MessageCircle className="w-8 h-8 text-white" />
      </div>
      <h4 className="text-[var(--text-primary)] font-semibold text-lg mb-2">
        Welcome to Cognia AI
      </h4>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
        Hi! I&apos;m your AI assistant. Ask me anything about our services, pricing, or how we can help transform your business.
      </p>
      <div className="mt-6 grid gap-2 w-full">
        <SuggestionButton
          text="What services do you offer?"
          onClick={() => onSendMessage('What services do you offer?')}
          disabled={isLoading}
        />
        <SuggestionButton
          text="How does the AI receptionist work?"
          onClick={() => onSendMessage('How does the AI receptionist work?')}
          disabled={isLoading}
        />
        <SuggestionButton
          text="Can I schedule a demo?"
          onClick={() => onSendMessage('Can I schedule a demo?')}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}

interface SuggestionButtonProps {
  text: string;
  onClick: () => void;
  disabled: boolean;
}

function SuggestionButton({ text, onClick, disabled }: SuggestionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        w-full px-4 py-2.5 text-left text-sm
        bg-[var(--bg-secondary)] dark:bg-gray-800
        border border-[var(--border-primary)]
        rounded-xl
        text-[var(--text-primary)]
        hover:bg-[var(--bg-tertiary)] dark:hover:bg-gray-700
        hover:border-[#1E40AF]/30
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );
}
