import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const AnnouncementBanner: React.FC = () => {
  return (
    <div className="relative bg-transparent border-b border-[rgba(55,50,47,0.12)] shadow-[0_1px_0px_white]">
      <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 lg:max-w-[1440px] mx-auto py-4">
        <Link
          href="/demo"
          className="flex items-center justify-center gap-3 text-sm text-[rgba(55,50,47,0.60)] hover:text-[#37322F] transition-all group w-full"
        >
          <div className="flex items-center gap-3">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#37322F] opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#37322F]"></span>
            </div>
            <span className="font-medium tracking-tight">Transform your call operations with enterprise-grade AI voice agents.</span>
          </div>
          <div className="flex items-center gap-1.5 font-semibold text-[#37322F]">
            Try now
            <FaArrowRight className="text-[10px] transform group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
