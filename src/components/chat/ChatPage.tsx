'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChatSidebar } from './ChatSidebar';
import { ChatArea } from './ChatArea';

export function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)] dark:bg-gray-900">
      <ChatSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onBack={handleBack}
      />

      {/* Main Chat Area - shifts right when sidebar is open */}
      <main
        className={`
          flex-1 flex flex-col h-full
          transition-all duration-300 ease-out
          ${sidebarOpen ? 'ml-[300px]' : 'ml-0'}
        `}
      >
        <ChatArea />
      </main>
    </div>
  );
}
