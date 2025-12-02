import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const AnnouncementBanner: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="container mx-auto px-6 lg:px-12 py-3">
        <a
          href="https://calendly.com/emrebenian-cogniaai/30min"
          className="flex items-center justify-center gap-2 text-sm text-white hover:text-gray-300 transition-colors"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5h2v4H9zm0 2h2v2H9v-2z"/>
            </svg>
            Transform your call center operations with AI-powered voice agents.
          </span>
          <span className="flex items-center gap-1">
            Try now
            <FaArrowRight className="text-xs" />
          </span>
        </a>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
