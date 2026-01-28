'use client';

import { LogoCloud } from "./ui/logo-cloud-simple";
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash';

const logos = [
  {
    src: "/logos/mysmilemiami-light.webp",
    darkSrc: "/logos/mysmilemiami.webp",
    alt: "My Smile Miami Logo",
  },
  {
    src: "/logos/nopeltipkitabevleri.webp",
    darkSrc: "/logos/nopeltipkitabevleri-dark.webp",
    alt: "Nobel Tip Kitabevleri Logo",
  },
  {
    src: "/logos/hallsheatingandair.webp",
    darkSrc: "/logos/hallsheatingandair.webp",
    alt: "Hall's Heating Air Plumbing Logo",
  },
  {
    src: "/logos/monk-logo.svg?v=2",
    darkSrc: "/logos/monk-logo-dark.svg",
    alt: "Monk Logo",
  },
  {
    src: "/logos/steamespresso-nobg.webp",
    alt: "Steam Espresso Logo",
    wideFormat: true, // Logo is wider aspect ratio, needs more horizontal space
    invertInDark: true, // Invert black logo to white in dark mode
  },
];

export default function LogoCloudSection() {
  const { isDark } = useThemeWithoutFlash();

  return (
    <section
      className="relative w-full mt-0 lg:-mt-20 pt-6 lg:pt-4 pb-4 sm:pb-6 md:pb-8 bg-white dark:bg-gray-900"
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
