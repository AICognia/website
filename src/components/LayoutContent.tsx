'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/src/components/Navbar';
import MobileNavbar from '@/src/components/MobileNavbar';
import Footer from '@/src/components/Footer';
import CookieConsentBanner from '@/src/components/CookieConsent';
import StickyMobileCTA from '@/src/components/StickyMobileCTA';
import DarkModeToggle from '@/src/components/DarkModeToggle';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  // Dashboard has its own full-screen layout
  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <DarkModeToggle />
      <div className="w-full min-h-screen relative mesh-gradient">
        <div className="relative flex flex-col justify-start items-center w-full">
          <div className="w-full relative flex flex-col justify-start items-start min-h-screen">
            <div className="w-full relative z-10 flex flex-col flex-grow">
              <div className="w-full relative">
                <MobileNavbar />
                <div className="hidden lg:block">
                  <Navbar />
                </div>
              </div>
              <main id="main-content" className="flex-grow" role="main" aria-label="Main content">
                {children}
              </main>
              <Footer />
              <CookieConsentBanner />
              <StickyMobileCTA />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
