'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Copy, RotateCcw, Check } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { Message } from './types';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: () => void;
}

export function ChatMessage({ message, onRegenerate }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isLoading = message.content === '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group"
    >
      {isUser ? (
        <UserMessage content={message.content} />
      ) : (
        <AssistantMessage content={message.content} isLoading={isLoading} onRegenerate={onRegenerate} />
      )}
    </motion.div>
  );
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%]">
        {/* Message Content */}
        <div className="
          bg-blue-900 dark:bg-gray-700
          text-white dark:text-gray-100
          rounded-2xl rounded-tr-md
          px-4 py-3
          shadow-sm
        ">
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words font-sans">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}

function AssistantMessage({ content, isLoading, onRegenerate }: { content: string; isLoading: boolean; onRegenerate?: () => void }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-[85%]">
        {/* Avatar - Cognia AI Logo */}
        <div className="
          w-8 h-8 rounded-full flex-shrink-0
          bg-gradient-to-br from-blue-500 to-blue-600
          flex items-center justify-center
          shadow-lg shadow-blue-500/25
          ring-2 ring-white dark:ring-gray-900
          overflow-hidden
        ">
          <Image
            src="/cognia-c-icon.png"
            alt="Cognia AI"
            width={20}
            height={20}
            className="w-5 h-5 brightness-0 invert"
          />
        </div>

        {/* Message Content */}
        <div className="flex flex-col gap-2">
          <div className="
            bg-white dark:bg-gray-800/80
            border border-gray-100 dark:border-gray-700/50
            rounded-2xl rounded-tl-md
            px-4 py-3
            shadow-sm
          ">
            {isLoading ? (
              <LoadingDots />
            ) : (
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words text-gray-800 dark:text-gray-200 font-sans">
                {content}
              </p>
            )}
          </div>

          {/* Action buttons - only show when not loading */}
          {!isLoading && (
            <div className="flex items-center gap-1 pl-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <CopyButton copied={copied} onClick={handleCopy} />
              {onRegenerate && (
                <MessageActionButton
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                  onClick={onRegenerate}
                  tooltip="Regenerate"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CopyButtonProps {
  copied: boolean;
  onClick: () => void;
}

function CopyButton({ copied, onClick }: CopyButtonProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          p-1.5 rounded-lg
          transition-all duration-150
          ${copied
            ? 'text-green-500 bg-green-50 dark:bg-green-900/30'
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
          }
          active:scale-90
        `}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Copy className="w-3.5 h-3.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="
              absolute left-1/2 -translate-x-1/2 bottom-full mb-2
              px-2.5 py-1.5 rounded-lg
              bg-gray-900 dark:bg-gray-700
              text-white text-xs font-medium
              whitespace-nowrap
              shadow-lg
              pointer-events-none
            "
          >
            {copied ? 'Copied!' : 'Copy'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MessageActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  tooltip: string;
}

function MessageActionButton({ icon, onClick, tooltip }: MessageActionButtonProps) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="
          p-1.5 rounded-lg
          transition-all duration-150
          text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
          hover:bg-gray-100 dark:hover:bg-gray-700/50
          active:scale-90
        "
      >
        {icon}
      </button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="
              absolute left-1/2 -translate-x-1/2 bottom-full mb-2
              px-2.5 py-1.5 rounded-lg
              bg-gray-900 dark:bg-gray-700
              text-white text-xs font-medium
              whitespace-nowrap
              shadow-lg
              pointer-events-none
            "
          >
            {tooltip}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex items-center gap-1.5 py-1 px-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-blue-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
