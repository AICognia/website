import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useLeadCapture } from '../contexts/LeadCaptureContext';

const AnnouncementBanner: React.FC = () => {
  const { openLeadCapture } = useLeadCapture();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="container mx-auto px-6 lg:px-12 py-3">
        <button
          onClick={() => openLeadCapture('announcement_banner')}
          className="flex items-center justify-center gap-2 text-sm text-white hover:text-gray-300 transition-colors w-full"
        >
          <span className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
            Transform your call operations with AI-powered voice agents.
          </span>
          <span className="flex items-center gap-1">
            Try now
            <FaArrowRight className="text-xs" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
