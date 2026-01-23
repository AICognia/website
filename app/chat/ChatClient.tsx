'use client';

import { useEffect } from 'react';
import { ChatPage } from '@/src/components/chat';

export default function ChatClient() {
  useEffect(() => {
    document.body.classList.add('chat-page');

    return () => {
      document.body.classList.remove('chat-page');
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        nav, header, footer,
        [class*="Navbar"], [class*="MobileNavbar"],
        [class*="Footer"], [class*="CookieConsent"],
        [class*="StickyMobileCTA"], [class*="TactileBackground"],
        [class*="FloatingAuth"], [class*="DarkModeToggle"],
        .mobile-navbar {
          display: none !important;
        }
      `}} />
      <ChatPage />
    </>
  );
}
