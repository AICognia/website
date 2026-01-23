'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Message } from './types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`
          max-w-[85%] rounded-2xl px-4 py-3 text-sm
          ${
            isUser
              ? 'bg-[#1E40AF] text-white rounded-br-md'
              : 'bg-[var(--bg-secondary)] dark:bg-gray-800 text-[var(--text-primary)] rounded-bl-md border border-[var(--border-primary)]'
          }
        `}
      >
        {message.isLoading ? (
          <LoadingDots />
        ) : (
          <div className="whitespace-pre-wrap break-words leading-relaxed">
            {message.content}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-[var(--text-secondary)] dark:bg-gray-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
}
