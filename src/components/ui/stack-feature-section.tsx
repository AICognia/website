"use client";

import Link from "next/link";
import { useThemeWithoutFlash } from "@/src/hooks/useThemeWithoutFlash";
import {
  FaPhone, FaRobot, FaHeadset, FaChartLine, FaGlobe,
  FaClock, FaCog, FaPlug, FaBrain, FaShieldAlt
} from "react-icons/fa";
import {
  SiOpenai, SiGooglecloud, SiAmazonaws, SiMicrosoftazure, SiSlack
} from "react-icons/si";

const iconConfigs = [
  { Icon: FaRobot, color: "#3b82f6" },
  { Icon: SiOpenai, color: "#1E40AF" },
  { Icon: FaHeadset, color: "#2563eb" },
  { Icon: FaChartLine, color: "#1E3A8A" },
  { Icon: SiGooglecloud, color: "#3b82f6" },
  { Icon: FaClock, color: "#2563eb" },
  { Icon: SiAmazonaws, color: "#1E40AF" },
  { Icon: FaPlug, color: "#1E3A8A" },
  { Icon: FaGlobe, color: "#3b82f6" },
  { Icon: SiMicrosoftazure, color: "#2563eb" },
  { Icon: FaBrain, color: "#1E40AF" },
  { Icon: FaCog, color: "#1E3A8A" },
  { Icon: SiSlack, color: "#3b82f6" },
  { Icon: FaShieldAlt, color: "#2563eb" },
  { Icon: FaPhone, color: "#1E40AF" },
];

export default function StackFeatureSection() {
  const orbitCount = 3;
  const orbitGap = 8;
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);
  const { isDark } = useThemeWithoutFlash();

  return (
    <section className="relative overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 transition-colors duration-300 dark:bg-gray-900">
      <div className="container-responsive px-4 sm:px-6">
        <div className="bento-card no-hover-movement pl-4 sm:pl-8 md:pl-12 lg:pl-16 overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-0 sm:min-h-[20rem] md:h-[30rem]">
      {/* Left side: Heading and Text */}
      <div className="w-full md:w-1/2 z-10 py-2 sm:py-6 md:py-0 px-2 sm:px-4 md:px-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif font-normal mb-3 sm:mb-4 md:mb-6 dark:text-gray-100">
          Ready to <span className="text-[#1E40AF] dark:text-blue-400">Transform?</span>
        </h2>
        <p className="mb-4 sm:mb-6 max-w-lg text-sm sm:text-base md:text-lg text-slate-600 dark:text-gray-400">
          Schedule a consultation. We'll show you exactly where AI can move the needle in your business.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <Link
            href="/consultation"
            className="btn-primary h-11 sm:h-12 px-6 sm:px-8 rounded-lg text-sm sm:text-base min-h-[44px] w-full sm:w-auto text-center"
          >
            <span className="relative z-10">Schedule a Consultation</span>
          </Link>
        </div>
      </div>

      {/* Right side: Orbit animation - hidden on mobile, shown on sm+ */}
      <div className="hidden sm:block relative w-full md:w-1/2 h-[14rem] sm:h-[18rem] md:h-full overflow-visible">
        <div className="absolute -right-48 sm:-right-72 md:-right-96 top-1/2 -translate-y-1/2 w-[30rem] sm:w-[45rem] md:w-[60rem] h-[30rem] sm:h-[45rem] md:h-[60rem] flex items-center justify-center">
          {/* Center Circle */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#2563eb] shadow-lg flex items-center justify-center shadow-blue-500/30">
            <img src="/cognia-c-icon.png" alt="Cognia AI" className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 brightness-0 invert" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${16 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border-2 border-dotted border-slate-200 dark:border-gray-700"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${20 + orbitIdx * 8}s linear infinite ${orbitIdx % 2 === 0 ? '' : 'reverse'}`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    // Round to 2 decimal places to prevent hydration mismatch
                    const x = Math.round((50 + 50 * Math.cos(angle)) * 100) / 100;
                    const y = Math.round((50 + 50 * Math.sin(angle)) * 100) / 100;

                    return (
                      <div
                        key={iconIdx}
                        className="absolute rounded-full p-1 sm:p-1.5 md:p-2 shadow-md border bg-white border-slate-100 dark:bg-gray-800 dark:border-gray-700"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                          animationName: 'counter-spin',
                          animationDuration: `${20 + orbitIdx * 8}s`,
                          animationTimingFunction: 'linear',
                          animationIterationCount: 'infinite',
                          animationDirection: orbitIdx % 2 === 0 ? 'normal' : 'reverse',
                        }}
                      >
                        {cfg.Icon && (
                          <cfg.Icon className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10" style={{ color: isDark ? '#60a5fa' : cfg.color }} />
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
}
