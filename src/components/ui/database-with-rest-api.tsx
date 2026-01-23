"use client"

import React from "react"
import { motion } from "framer-motion"
import { Sparkles, Layers, Zap } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface DatabaseWithRestApiProps {
  className?: string
  circleText?: string
  badgeTexts?: {
    first: string
    second: string
    third: string
    fourth: string
  }
  buttonTexts?: {
    first: string
    second: string
  }
  title?: string
  lightColor?: string
  isDark?: boolean
}

const DatabaseWithRestApi: React.FC<DatabaseWithRestApiProps> = ({
  className,
  circleText = "AI",
  badgeTexts = {
    first: "ERP",
    second: "CRM",
    third: "API",
    fourth: "Legacy",
  },
  buttonTexts = {
    first: "Unified Data",
    second: "Real-time Sync",
  },
  title = "Cross-domain intelligence that connects everything",
  lightColor = "#3b82f6",
  isDark = false,
}) => {
  // Theme colors
  const colors = {
    pathStroke: isDark ? "#4b5563" : "#cbd5e1",
    badgeFill: isDark ? "#1f2937" : "#f8fafc",
    badgeStroke: isDark ? "#374151" : "#e2e8f0",
    badgeText: isDark ? "#9ca3af" : "#475569",
    iconStroke: isDark ? "#60a5fa" : "#3b82f6",
    boxBg: isDark ? "#111827" : "#ffffff",
    boxBorder: isDark ? "#374151" : "#e2e8f0",
    shadowBg: isDark ? "rgba(17, 24, 39, 0.5)" : "rgba(241, 245, 249, 0.5)",
    titleBg: isDark ? "#1f2937" : "#ffffff",
    titleBorder: isDark ? "#374151" : "#e2e8f0",
    titleText: isDark ? "#d1d5db" : "#334155",
    circleBg: isDark ? "linear-gradient(to bottom, #1f2937, #111827)" : "linear-gradient(to bottom, #ffffff, #f8fafc)",
    circleText: isDark ? "#60a5fa" : "#3b82f6",
    circleBorder: isDark ? "#374151" : "#e2e8f0",
    featureBadgeBg: isDark ? "#1f2937" : "#f8fafc",
    featureBadgeBorder: isDark ? "#374151" : "#e2e8f0",
    featureBadgeText: isDark ? "#d1d5db" : "#334155",
    pulseCircleBg: isDark ? "rgba(59, 130, 246, 0.15)" : "rgba(59, 130, 246, 0.1)",
    pulseCircleBorder: isDark ? "#374151" : "#e2e8f0",
  }

  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      {/* SVG Paths */}
      <svg
        className="h-full sm:w-full"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        <g
          stroke={colors.pathStroke}
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        {/* Light orbs */}
        <g mask="url(#db-mask-1)">
          <circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        {/* Source Badges */}
        <g fill="none" strokeWidth="0.4">
          {/* First Badge */}
          <g>
            <rect fill={colors.badgeFill} stroke={colors.badgeStroke} x="14" y="5" width="34" height="10" rx="5" />
            <DatabaseIconSVG x="18" y="7.5" stroke={colors.iconStroke} />
            <text x="28" y="12" fill={colors.badgeText} stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts.first}
            </text>
          </g>
          {/* Second Badge */}
          <g>
            <rect fill={colors.badgeFill} stroke={colors.badgeStroke} x="60" y="5" width="34" height="10" rx="5" />
            <DatabaseIconSVG x="64" y="7.5" stroke={colors.iconStroke} />
            <text x="74" y="12" fill={colors.badgeText} stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts.second}
            </text>
          </g>
          {/* Third Badge */}
          <g>
            <rect fill={colors.badgeFill} stroke={colors.badgeStroke} x="108" y="5" width="34" height="10" rx="5" />
            <DatabaseIconSVG x="112" y="7.5" stroke={colors.iconStroke} />
            <text x="122" y="12" fill={colors.badgeText} stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts.third}
            </text>
          </g>
          {/* Fourth Badge */}
          <g>
            <rect fill={colors.badgeFill} stroke={colors.badgeStroke} x="150" y="5" width="40" height="10" rx="5" />
            <DatabaseIconSVG x="154" y="7.5" stroke={colors.iconStroke} />
            <text x="165" y="12" fill={colors.badgeText} stroke="none" fontSize="5" fontWeight="500">
              {badgeTexts.fourth}
            </text>
          </g>
        </g>
        <defs>
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>

      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* Bottom shadow */}
        <div
          className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg"
          style={{ backgroundColor: colors.shadowBg }}
        />

        {/* Box title */}
        <div
          className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border px-2 py-1 sm:-top-4 sm:py-1.5 shadow-sm"
          style={{
            backgroundColor: colors.titleBg,
            borderColor: colors.titleBorder
          }}
        >
          <Sparkles className="w-3 h-3" style={{ color: lightColor }} />
          <span className="ml-2 text-[10px] font-medium" style={{ color: colors.titleText }}>{title}</span>
        </div>

        {/* Box outer circle */}
        <div
          className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t font-semibold text-xs shadow-lg"
          style={{
            background: colors.circleBg,
            borderColor: colors.circleBorder,
            color: colors.circleText
          }}
        >
          {circleText}
        </div>

        {/* Box content */}
        <div
          className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-xl border shadow-sm"
          style={{
            backgroundColor: colors.boxBg,
            borderColor: colors.boxBorder
          }}
        >
          {/* Feature Badges */}
          <div
            className="absolute bottom-8 left-12 z-10 h-7 rounded-full px-3 text-xs border flex items-center gap-2"
            style={{
              backgroundColor: colors.featureBadgeBg,
              borderColor: colors.featureBadgeBorder,
              color: colors.featureBadgeText
            }}
          >
            <Layers className="w-4 h-4" style={{ color: lightColor }} />
            <span>{buttonTexts.first}</span>
          </div>
          <div
            className="absolute right-16 top-8 z-10 hidden h-7 rounded-full px-3 text-xs sm:flex border items-center gap-2"
            style={{
              backgroundColor: colors.featureBadgeBg,
              borderColor: colors.featureBadgeBorder,
              color: colors.featureBadgeText
            }}
          >
            <Zap className="w-4 h-4" style={{ color: lightColor }} />
            <span>{buttonTexts.second}</span>
          </div>

          {/* Animated Circles */}
          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t"
            style={{
              backgroundColor: colors.pulseCircleBg,
              borderColor: colors.pulseCircleBorder
            }}
            animate={{ scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t"
            style={{
              backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.08)",
              borderColor: colors.pulseCircleBorder
            }}
            animate={{ scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t"
            style={{
              backgroundColor: isDark ? "rgba(59, 130, 246, 0.06)" : "rgba(59, 130, 246, 0.05)",
              borderColor: colors.pulseCircleBorder
            }}
            animate={{ scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t"
            style={{
              backgroundColor: isDark ? "rgba(59, 130, 246, 0.03)" : "rgba(59, 130, 246, 0.02)",
              borderColor: colors.pulseCircleBorder
            }}
            animate={{ scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}

const DatabaseIconSVG = ({ x = "0", y = "0", stroke = "#3b82f6" }: { x: string; y: string; stroke?: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  )
}

export default DatabaseWithRestApi
