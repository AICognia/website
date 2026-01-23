'use client';

import React from 'react';
import {
  Plus,
  MessageSquare,
  Trash2,
  ArrowLeft,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import Image from 'next/image';
import { useChatStore } from './chat-store';
import type { Chat } from './types';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onBack: () => void;
}

export function ChatSidebar({ isOpen, onToggle, onBack }: ChatSidebarProps) {
  const { chats, currentChatId, setCurrentChat, deleteChat } = useChatStore();

  const handleNewChat = () => {
    setCurrentChat(null);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChat(chatId);
  };

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden
          transition-opacity duration-300 ease-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onToggle}
      />

      <aside
        className={`
          fixed left-0 top-0 z-50 h-full w-[300px]
          bg-gray-50 dark:bg-gray-900
          border-r border-gray-200 dark:border-blue-500/20
          flex flex-col
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={onBack}
            className="
              flex items-center gap-2 px-3 py-2 rounded-xl
              text-gray-600 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-white
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-all duration-150
            "
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[15px] font-medium">Back</span>
          </button>
          <button
            onClick={onToggle}
            className="
              p-2.5 rounded-xl
              text-gray-500 dark:text-gray-400
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition-all duration-150
            "
            title={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button - matches btn-primary style */}
        <div className="px-4 pb-4">
          <button
            onClick={handleNewChat}
            className="
              w-full flex items-center justify-center gap-2 px-4 py-3.5
              text-white
              rounded-xl
              font-semibold text-sm
              active:scale-[0.98]
              transition-all duration-500
              overflow-hidden
            "
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 30%, #1d4ed8 50%, #2563eb 70%, #3b82f6 100%)',
              boxShadow: `
                0 4px 8px rgba(30, 64, 175, 0.3),
                0 2px 4px rgba(30, 64, 175, 0.2),
                inset 0 2px 4px rgba(147, 197, 253, 0.25),
                inset 0 1px 2px rgba(255, 255, 255, 0.2),
                inset 0 -2px 4px rgba(30, 64, 175, 0.3),
                inset 2px 0 4px rgba(147, 197, 253, 0.12),
                inset -2px 0 4px rgba(147, 197, 253, 0.12)
              `,
            }}
          >
            <Plus className="w-5 h-5" strokeWidth={2} />
            <span>New chat</span>
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <div className="
                w-14 h-14 rounded-2xl
                bg-blue-50 dark:bg-blue-900/20
                flex items-center justify-center mb-4
              ">
                <MessageSquare className="w-6 h-6 text-blue-500 dark:text-blue-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-[15px] font-medium">No conversations</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                Start a new chat to begin
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {chats
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === currentChatId}
                    onSelect={() => handleSelectChat(chat.id)}
                    onDelete={(e) => handleDeleteChat(e, chat.id)}
                  />
                ))}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="
              w-10 h-10 rounded-2xl
              bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600
              flex items-center justify-center
              shadow-lg shadow-blue-500/25
              overflow-hidden
            ">
              <Image
                src="/cognia-c-icon.png"
                alt="Cognia AI"
                width={22}
                height={22}
                className="w-[22px] h-[22px] brightness-0 invert"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-gray-900 dark:text-white truncate">
                Cognia AI
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Always here to help
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Toggle button - visible when sidebar is closed (on all screens) */}
      {!isOpen && (
        <button
          onClick={onToggle}
          className="
            fixed left-4 top-4 z-40
            p-2.5 rounded-xl
            bg-white/80 dark:bg-gray-800/80
            backdrop-blur-md
            border border-gray-200/50 dark:border-blue-500/20
            shadow-lg shadow-black/5 dark:shadow-black/20
            hover:bg-white dark:hover:bg-gray-700
            active:scale-95
            transition-all duration-200
          "
        >
          <PanelLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      )}
    </>
  );
}

interface ChatItemProps {
  chat: Chat;
  isActive: boolean;
  onSelect: () => void;
  onDelete: (e: React.MouseEvent) => void;
}

function ChatItem({ chat, isActive, onSelect, onDelete }: ChatItemProps) {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
      className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl
        text-left group cursor-pointer
        transition-colors duration-150
        ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-900/20'
            : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
        }
      `}
    >
      <MessageSquare className={`w-4 h-4 flex-shrink-0 ${
        isActive
          ? 'text-blue-600 dark:text-blue-400'
          : 'text-gray-400 dark:text-gray-500'
      }`} />
      <span className={`flex-1 truncate text-[15px] font-medium ${
        isActive
          ? 'text-blue-900 dark:text-white'
          : 'text-gray-600 dark:text-gray-300'
      }`}>
        {chat.title}
      </span>
      <button
        onClick={onDelete}
        className="
          p-1.5 rounded-lg
          opacity-0 group-hover:opacity-100
          text-gray-400 hover:text-red-400
          hover:bg-red-50 dark:hover:bg-red-900/20
          transition-all duration-150
          active:scale-90
        "
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
