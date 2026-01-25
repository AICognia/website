'use client';

import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";
import { useThemeWithoutFlash } from '@/src/hooks/useThemeWithoutFlash';

type Logo = {
  src: string;
  darkSrc?: string;
  alt: string;
  clipSides?: number; // Pixels to clip from each side
  needsBrightnessBoost?: boolean; // Boost brightness in dark mode for logos with dark elements
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  const { isDark } = useThemeWithoutFlash();

  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-3 md:py-4 w-full",
        className
      )}
    >
      <InfiniteSlider gap={64} reverse duration={25}>
        {logos.map((logo) => (
          <div
            key={`logo-${logo.alt}-${isDark ? 'dark' : 'light'}`}
            className="overflow-hidden flex-shrink-0"
            style={logo.clipSides ? {
              clipPath: `inset(0 ${logo.clipSides}px 0 ${logo.clipSides}px)`,
              margin: `0 -${logo.clipSides}px`,
            } : undefined}
          >
            <img
              alt={logo.alt}
              className={cn(
                "pointer-events-none h-12 w-auto max-w-[160px] md:h-16 lg:h-20 md:max-w-[220px] lg:max-w-[240px] select-none object-contain",
                // Full color logos in both modes
                isDark
                  ? logo.needsBrightnessBoost
                    ? "opacity-90 brightness-[1.3] contrast-[1.1]" // Boost visibility for logos with dark parts
                    : "opacity-80"
                  // Light mode: subtle drop shadow for logos with white parts
                  : "opacity-90 drop-shadow-[0_0_1px_rgba(0,0,0,0.3)]"
              )}
              loading="lazy"
              src={isDark && logo.darkSrc ? logo.darkSrc : logo.src}
            />
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
