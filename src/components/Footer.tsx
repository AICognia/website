'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from 'next-themes';

const Footer: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark';

  return (
    <footer className={`pt-8 sm:pt-12 pb-6 sm:pb-8 border-t transition-colors duration-300 ${isDark ? 'bg-gray-900 text-gray-300 border-gray-700/60' : 'bg-white text-slate-700 border-slate-200/60'}`}>
      <div className="container-responsive px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 lg:gap-16 items-start">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 group">
            <img
              src="/cognia-c-icon.png"
              alt="Cognia AI"
              width={48}
              height={48}
              className="h-10 sm:h-12 w-auto object-contain"
              loading="lazy"
            />
            <span className={`font-serif font-light text-2xl sm:text-3xl tracking-tight ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>
              Cognia AI
            </span>
          </Link>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-5 sm:gap-8 text-sm sm:text-base w-full lg:w-auto">
            <div>
              <h4 className={`font-semibold mb-2 sm:mb-4 text-base sm:text-lg ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>Solutions</h4>
              <ul className="space-y-2 sm:space-y-3">
                <FooterLink href="/products/ai-receptionist" isDark={isDark}>AI Receptionist</FooterLink>
                <FooterLink href="/solutions/chatbot" isDark={isDark}>AI Chatbot</FooterLink>
                <FooterLink href="/business-intelligence" isDark={isDark}>Business Intelligence</FooterLink>
                <FooterLink href="/solutions/workflow-automation" isDark={isDark}>Workflow Automation</FooterLink>
                <FooterLink href="/solutions/custom-ai" isDark={isDark}>Custom AI</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-2 sm:mb-4 text-base sm:text-lg ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>Industries</h4>
              <ul className="space-y-2 sm:space-y-3">
                <FooterLink href="/industries/healthcare" isDark={isDark}>Healthcare</FooterLink>
                <FooterLink href="/industries/legal" isDark={isDark}>Legal Services</FooterLink>
                <FooterLink href="/industries/hospitality" isDark={isDark}>Hospitality</FooterLink>
                <FooterLink href="/industries/retail" isDark={isDark}>Retail</FooterLink>
                <FooterLink href="/industries/automotive" isDark={isDark}>Automotive</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-2 sm:mb-4 text-base sm:text-lg ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                <FooterLink href="/about" isDark={isDark}>About Us</FooterLink>
                <FooterLink href="/contact" isDark={isDark}>Contact</FooterLink>
                <FooterLink href="/what-we-do" isDark={isDark}>What We Do</FooterLink>
                <FooterLink href="/demo" isDark={isDark}>Schedule Demo</FooterLink>
              </ul>
            </div>
            <div>
              <h4 className={`font-semibold mb-2 sm:mb-4 text-base sm:text-lg ${isDark ? 'text-gray-100' : 'text-slate-900'}`}>Legal</h4>
              <ul className="space-y-2 sm:space-y-3">
                <FooterLink href="/privacy-policy" isDark={isDark}>Privacy Policy</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        {/* Status + Badges */}
        <div className="mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-8">
          <div className="flex justify-start w-full">
            <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border shadow-sm text-sm sm:text-base w-fit ${isDark ? 'bg-gray-800/90 border-gray-700 text-gray-300' : 'bg-white/90 border-slate-200 text-slate-700'}`}>
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
              <span className="font-medium">All systems operational</span>
            </div>
          </div>

{/* HIDDEN: Compliance badges - uncomment to re-enable
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <img src="/SOC2_Type1.svg" alt="SOC 2 Type I Certified - Security Compliance Badge" width={64} height={64} className="h-10 sm:h-12 md:h-16 w-auto" loading="lazy" />
            <img src="/SOC2_Type2.svg" alt="SOC 2 Type II Certified - Security Compliance Badge" width={64} height={64} className="h-10 sm:h-12 md:h-16 w-auto" loading="lazy" />
            <img src="/GDPR.svg" alt="GDPR Compliant - Data Privacy Badge" width={64} height={64} className="h-10 sm:h-12 md:h-16 w-auto" loading="lazy" />
            <img src="/HIPAA.svg" alt="HIPAA Compliant - Healthcare Data Security Badge" width={64} height={64} className="h-10 sm:h-12 md:h-16 w-auto" loading="lazy" />
          </div>
          */}
        </div>

        {/* Bottom Bar */}
        <div className={`mt-6 sm:mt-10 pt-4 sm:pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-sm sm:text-base ${isDark ? 'border-gray-700/80 text-gray-400' : 'border-slate-200/80 text-slate-600'}`}>
          <div className="text-center md:text-left">© {currentYear} Cognia AI Inc. All rights reserved.</div>
          <div className={`flex items-center gap-4 sm:gap-5 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
            <SocialLink href="https://www.instagram.com/cognia.ai/" icon={<FaInstagram size={18} />} isDark={isDark} />
            <SocialLink href="https://www.linkedin.com/company/cognia-ai-usa/" icon={<FaLinkedin size={18} />} isDark={isDark} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, isDark }: { href: string; icon: React.ReactNode; isDark?: boolean }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`transition-colors duration-200 p-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${isDark ? 'text-gray-300 hover:text-gray-100' : 'text-slate-900 hover:text-slate-600'}`}
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children, isDark }: { href: string; children: React.ReactNode; isDark?: boolean }) => (
  <li>
    <Link href={href} className={`text-sm sm:text-base transition-colors font-medium py-1 inline-block min-h-[44px] flex items-center ${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-slate-500 hover:text-slate-900'}`}>
      {children}
    </Link>
  </li>
);

export default Footer;
