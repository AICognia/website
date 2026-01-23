'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { ChatWindow } from './ChatWindow';

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left';
}

export function ChatWidget({ position = 'bottom-right' }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = position === 'bottom-right' ? 'right-4' : 'left-4';

  return (
    <>
      {/* Chat Window */}
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Toggle Button */}
      <AnimatePresence mode="wait">
        <motion.button
          key={isOpen ? 'close' : 'open'}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`
            fixed bottom-4 ${positionClasses} z-50
            w-14 h-14 rounded-full
            bg-gradient-to-br from-[#1E40AF] to-[#3b82f6]
            text-white
            shadow-lg shadow-[#1E40AF]/30
            hover:shadow-xl hover:shadow-[#1E40AF]/40
            hover:scale-105
            active:scale-95
            transition-all duration-200
            flex items-center justify-center
          `}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.button>
      </AnimatePresence>

      {/* Notification Badge (optional - shows when chat has unread messages) */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          className={`
            fixed bottom-16 ${positionClasses}
            transform translate-x-8 -translate-y-2
            z-50 pointer-events-none
          `}
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </motion.div>
      )}
    </>
  );
}
