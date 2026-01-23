'use client';

import { LogoCloud } from "./ui/logo-cloud-simple";
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

const logos = [
  {
    src: "/logos/mysmilemiami.webp",
    alt: "My Smile Miami Logo",
    darkModeInvert: false,
  },
  {
    src: "/logos/nopeltipkitabevleri.png",
    alt: "Nobel Tip Kitabevleri Logo",
  },
  {
    src: "/logos/hallsheatingandair.png",
    alt: "Hall's Heating Air Plumbing Logo",
  },
];

export default function LogoCloudSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark';

  return (
    <section
      className={`relative w-full -mt-2 md:-mt-12 pt-8 md:pt-8 pb-8 sm:pb-10 md:pb-16 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      <div className="w-full max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] mx-auto px-6 lg:px-12 xl:px-16 2xl:px-20">
        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          }}
        >
          <LogoCloud logos={logos} />
        </div>
      </div>
    </section>
  );
}
