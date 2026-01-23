'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';

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
  placeholder = 'Type a message...',
}: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (value.trim() && !isLoading) {
      onSend(value);
      setValue('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-3 border-t border-[var(--border-primary)] bg-[var(--bg-primary)] dark:bg-gray-900"
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="
            w-full resize-none rounded-xl border border-[var(--border-primary)]
            bg-[var(--bg-secondary)] dark:bg-gray-800
            text-[var(--text-primary)] text-sm
            px-4 py-3 pr-10
            placeholder:text-[var(--text-secondary)]
            focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/30 focus:border-[#1E40AF]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            max-h-[120px]
          "
        />
      </div>
      <button
        type={isLoading ? 'button' : 'submit'}
        onClick={isLoading ? onCancel : undefined}
        disabled={!isLoading && !value.trim()}
        className={`
          flex items-center justify-center
          w-10 h-10 rounded-xl
          transition-all duration-200
          ${
            isLoading
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : value.trim()
              ? 'bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white'
              : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] cursor-not-allowed'
          }
        `}
        aria-label={isLoading ? 'Stop generating' : 'Send message'}
      >
        {isLoading ? (
          <Square className="w-4 h-4" />
        ) : (
          <Send className="w-4 h-4" />
        )}
      </button>
    </form>
  );
}
