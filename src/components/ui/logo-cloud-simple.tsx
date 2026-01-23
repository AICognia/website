'use client';

import { InfiniteSlider } from "./infinite-slider";
import { cn } from "../../lib/utils";

type Logo = {
  src: string;
  alt: string;
  darkModeInvert?: boolean;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4",
        className
      )}
    >
      <InfiniteSlider gap={88} reverse duration={40}>
        {logos.map((logo) => (
          <img
            alt={logo.alt}
            className={cn(
              "pointer-events-none h-16 w-auto max-w-[200px] md:h-24 md:max-w-[280px] select-none object-contain opacity-80 grayscale",
              logo.darkModeInvert === false ? "" : "dark:invert"
            )}
            key={`logo-${logo.alt}`}
            loading="lazy"
            src={logo.src}
          />
        ))}
      </InfiniteSlider>
    </div>
  );
}
