import { InfiniteSlider } from "@/src/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/src/components/ui/progressive-blur";

type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ logos }: LogoCloudProps) {
  return (
    <>
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% - 80px));
          }
        }
        .logo-scroll-wrapper:hover .logo-scroll-container {
          animation-play-state: paused;
        }
        .logo-scroll-container {
          display: flex;
          gap: 80px;
          animation: scroll 40s linear infinite;
          width: fit-content;
        }
      `}</style>
      <div className="relative w-full overflow-hidden py-4">
        <div 
          className="inline-flex logo-scroll-wrapper"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div className="logo-scroll-container">
            {logos.map((logo, index) => (
              <img
                alt={logo.alt}
                className="pointer-events-none h-4 select-none md:h-5 flex-shrink-0"
                style={{ filter: 'brightness(0) saturate(100%) invert(57%) sepia(89%) saturate(1434%) hue-rotate(197deg) brightness(91%) contrast(88%)' }}
                height="auto"
                key={`logo-${index}`}
                loading="lazy"
                src={logo.src}
                width="auto"
              />
            ))}
          </div>
          <div className="logo-scroll-container" aria-hidden="true">
            {logos.map((logo, index) => (
              <img
                alt={logo.alt}
                className="pointer-events-none h-4 select-none md:h-5 flex-shrink-0"
                style={{ filter: 'brightness(0) saturate(100%) invert(57%) sepia(89%) saturate(1434%) hue-rotate(197deg) brightness(91%) contrast(88%)' }}
                height="auto"
                key={`logo-duplicate-${index}`}
                loading="lazy"
                src={logo.src}
                width="auto"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
