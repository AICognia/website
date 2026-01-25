'use client';

import { LogoCloud } from "./ui/logo-cloud-simple";
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash';

const logos = [
  {
    src: "/logos/mysmilemiami.webp",
    darkSrc: "/logos/mysmilemiami.webp",
    alt: "My Smile Miami Logo",
  },
  {
    src: "/logos/nopeltipkitabevleri.webp",
    darkSrc: "/logos/nopeltipkitabevleri.webp", // Use same logo - dark version has incorrect orange color
    alt: "Nobel Tip Kitabevleri Logo",
    needsBrightnessBoost: true, // Boost brightness in dark mode for visibility
  },
  {
    src: "/logos/hallsheatingandair.png",
    darkSrc: "/logos/hallsheatingandair.png",
    alt: "Hall's Heating Air Plumbing Logo",
  },
  {
    src: "/logos/monk-logo.svg",
    darkSrc: "/logos/monk-logo-dark.svg",
    alt: "Monk Logo",
  },
  {
    src: "/logos/steamespresso.webp",
    darkSrc: "/logos/steamespresso-dark.webp",
    alt: "Steam Espresso Logo",
    // Removed clipSides - was cutting off logo edges
  },
];

export default function LogoCloudSection() {
  const { isDark } = useThemeWithoutFlash();

  return (
    <section
      className={`relative w-full mt-0 lg:-mt-20 pt-6 lg:pt-4 pb-4 sm:pb-6 md:pb-8 ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      {/* Full-width centered marquee container */}
      <div className="w-full overflow-hidden">
        <div
          className="w-full"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)"
          }}
        >
          <LogoCloud logos={logos} />
        </div>
      </div>
    </section>
  );
}
