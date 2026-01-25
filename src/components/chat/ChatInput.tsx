'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Square, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onCancel?: () => void;
  isLoading: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  onCancel,
  isLoading,
  placeholder = 'Ask Cognia AI anything...',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '24px';
      const newHeight = Math.min(textarea.scrollHeight, 200);
      textarea.style.height = `${newHeight}px`;
    }
  }, [value]);

  // Focus on mount (with preventScroll to avoid page jumping)
  useEffect(() => {
    textareaRef.current?.focus({ preventScroll: true });
  }, []);

  // Click container to focus textarea (with preventScroll to avoid page jumping)
  const handleContainerClick = () => {
    textareaRef.current?.focus({ preventScroll: true });
  };

  const handleSubmit = () => {
    if (value.trim() && !isLoading) {
      onSend(value.trim());
      setValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = '24px';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSend = value.trim().length > 0;

  return (
    <div className="px-4 sm:px-6 pb-6 pt-2">
      {/* Main Input Container - Glass effect like HeroBento cards */}
      <motion.div
        ref={containerRef}
        onClick={handleContainerClick}
        className="
          relative cursor-text rounded-[28px]
          backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]
          transition-all duration-200
          light-mode-glass dark-mode-glass
        "
        style={{
          background: `linear-gradient(135deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.25) 30%,
            rgba(255, 255, 255, 0.15) 70%,
            rgba(255, 255, 255, 0.05) 100%)`,
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: `
            inset 0 2px 4px rgba(255, 255, 255, 0.6),
            inset 0 4px 8px rgba(59, 130, 246, 0.15),
            inset 0 8px 16px rgba(59, 130, 246, 0.08),
            inset 0 -2px 4px rgba(255, 255, 255, 0.2),
            inset 0 -4px 8px rgba(59, 130, 246, 0.05),
            inset 2px 0 4px rgba(255, 255, 255, 0.4),
            inset -2px 0 4px rgba(59, 130, 246, 0.1),
            inset 4px 0 8px rgba(59, 130, 246, 0.06),
            inset -4px 0 8px rgba(59, 130, 246, 0.03),
            0 0 0 1px rgba(255, 255, 255, 0.2)
          `,
        }}
      >
        {/* Inner Content */}
        <div className="flex flex-col">
          {/* Textarea Row */}
          <div className="flex items-end gap-2 px-4 pt-4 pb-3">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              disabled={isLoading}
              rows={1}
              style={{ outline: 'none', boxShadow: 'none' }}
              className="
                flex-1 resize-none bg-transparent
                text-[15px] leading-6 font-sans
                text-gray-900 dark:text-gray-100
                placeholder:text-gray-400 dark:placeholder:text-gray-500
                !outline-none !ring-0 !border-none
                focus:!outline-none focus:!ring-0 focus:!border-none
                disabled:opacity-50 disabled:cursor-not-allowed
                min-h-[24px] max-h-[200px]
              "
            />
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between px-3 pb-3">
            {/* Left Actions */}
            <div className="flex items-center gap-1">
              <ActionButton
                icon={<Paperclip className="w-[18px] h-[18px]" />}
                tooltip="Attach file"
                disabled
              />
            </div>

            {/* Right Actions - Submit Button */}
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.button
                  key="stop"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  type="button"
                  onClick={onCancel}
                  className="
                    w-9 h-9 rounded-full
                    flex items-center justify-center
                    transition-all duration-200
                    active:scale-95
                  "
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
                    boxShadow: '0 2px 4px rgba(30, 64, 175, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                  }}
                  aria-label="Stop generating"
                >
                  <Square className="w-4 h-4 text-white" fill="currentColor" />
                </motion.button>
              ) : (
                <motion.button
                  key="send"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSend}
                  className={`
                    w-9 h-9 rounded-full
                    flex items-center justify-center
                    transition-all duration-200
                    ${canSend
                      ? 'active:scale-95'
                      : 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                    }
                  `}
                  style={canSend ? {
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
                    boxShadow: '0 2px 4px rgba(30, 64, 175, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
                  } : undefined}
                  aria-label="Send message"
                >
                  <ArrowUp
                    className={`w-5 h-5 ${canSend ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}
                    strokeWidth={2.5}
                  />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
  disabled?: boolean;
}

function ActionButton({ icon, tooltip, onClick, disabled }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        p-2 rounded-xl
        text-gray-400 dark:text-gray-500
        transition-all duration-200
        ${disabled
          ? 'opacity-40 cursor-not-allowed'
          : 'hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 active:scale-95'
        }
      `}
      title={tooltip}
      aria-label={tooltip}
    >
      {icon}
    </button>
  );
}
