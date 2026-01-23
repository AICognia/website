'use client'

import React, { useState, useRef, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface DataPoint {
  month: string
  savings: number
  manual: number
}

const ROIAnalyticsCard: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Default to dark to prevent flash (dark is the default theme)
  const isDark = !mounted || resolvedTheme === 'dark'

  // Sample data showing cost savings over 6 months
  const data: DataPoint[] = useMemo(() => [
    { month: 'Jan', savings: 2400, manual: 8500 },
    { month: 'Feb', savings: 3200, manual: 8200 },
    { month: 'Mar', savings: 4100, manual: 7800 },
    { month: 'Apr', savings: 5600, manual: 7200 },
    { month: 'May', savings: 7200, manual: 6500 },
    { month: 'Jun', savings: 9800, manual: 5800 },
  ], [])

  const maxValue = Math.max(...data.map(d => Math.max(d.savings, d.manual)))
  const chartHeight = 140
  const chartWidth = 280
  const padding = { top: 15, right: 15, bottom: 30, left: 15 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * innerWidth
  const yScale = (value: number) => padding.top + innerHeight - (value / maxValue) * innerHeight

  // Generate path for area chart
  const generateAreaPath = (key: 'savings' | 'manual') => {
    const points = data.map((d, i) => `${xScale(i)},${yScale(d[key])}`).join(' L ')
    const startX = xScale(0)
    const endX = xScale(data.length - 1)
    return `M ${startX},${padding.top + innerHeight} L ${points} L ${endX},${padding.top + innerHeight} Z`
  }

  // Generate line path
  const generateLinePath = (key: 'savings' | 'manual') => {
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)},${yScale(d[key])}`).join(' ')
  }

  const handleMouseMove = (event: React.MouseEvent<SVGElement>, index: number) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect()
      setTooltipPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top - 70
      })
    }
    setHoveredIndex(index)
  }

  const totalSavings = data.reduce((sum, d) => sum + d.savings, 0)

  return (
    <div className="relative w-full h-full p-5 flex flex-col">
      {/* Header - Clean left alignment */}
      <div className="mb-5">
        <div className={`text-[11px] font-medium uppercase tracking-wider mb-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Quarterly Performance
        </div>
        <div className="flex items-end gap-3">
          <span className={`text-4xl font-bold leading-none ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
            ${(totalSavings / 1000).toFixed(1)}K
          </span>
          <span className={`text-sm font-semibold mb-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>+312%</span>
        </div>
        <div className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Cost savings from AI automation</div>
      </div>

      {/* Chart - Centered with proper proportions */}
      <div className="relative flex-1 flex items-center justify-center">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full max-w-[280px] h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Gradient for savings area */}
            <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.02" />
            </linearGradient>
            {/* Gradient for manual costs area */}
            <linearGradient id="manualGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines - subtle */}
          {[0, 0.5, 1].map((ratio, i) => (
            <line
              key={i}
              x1={padding.left}
              y1={padding.top + innerHeight * ratio}
              x2={chartWidth - padding.right}
              y2={padding.top + innerHeight * ratio}
              stroke={isDark ? '#374151' : '#f1f5f9'}
              strokeWidth="1"
            />
          ))}

          {/* Manual costs area (background - subtle) */}
          <path
            d={generateAreaPath('manual')}
            fill="url(#manualGradient)"
          />
          <path
            d={generateLinePath('manual')}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* AI Savings area */}
          <path
            d={generateAreaPath('savings')}
            fill="url(#savingsGradient)"
          />
          <path
            d={generateLinePath('savings')}
            fill="none"
            stroke="#1E40AF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points and hover areas */}
          {data.map((d, i) => (
            <g key={i}>
              {/* Invisible hover area */}
              <rect
                x={xScale(i) - 20}
                y={padding.top}
                width={40}
                height={innerHeight}
                fill="transparent"
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              />
              {/* Savings point */}
              <circle
                cx={xScale(i)}
                cy={yScale(d.savings)}
                r={hoveredIndex === i ? 6 : 4}
                fill="#1E40AF"
                stroke="white"
                strokeWidth="2"
                className="transition-all duration-150"
              />
              {/* X-axis label */}
              <text
                x={xScale(i)}
                y={chartHeight - 8}
                textAnchor="middle"
                className={`text-[10px] font-medium ${isDark ? 'fill-gray-500' : 'fill-gray-400'}`}
              >
                {d.month}
              </text>
            </g>
          ))}
        </svg>

        {/* Tooltip */}
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute z-10 px-3 py-2 rounded-lg shadow-xl text-xs pointer-events-none ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-900 text-white'}`}
            style={{
              left: Math.min(Math.max(tooltipPosition.x - 60, 10), 180),
              top: Math.max(tooltipPosition.y, 10)
            }}
          >
            <div className={`font-semibold mb-1.5 ${isDark ? 'text-gray-200' : 'text-gray-300'}`}>{data[hoveredIndex].month} 2024</div>
            <div className="flex items-center gap-2 text-white">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>AI Savings:</span>
              <span className="font-semibold">${data[hoveredIndex].savings.toLocaleString()}</span>
            </div>
            <div className={`flex items-center gap-2 mt-1 ${isDark ? 'text-gray-300' : 'text-gray-400'}`}>
              <span className="w-2 h-2 rounded-full bg-gray-500" />
              <span>Manual:</span>
              <span className="font-medium">${data[hoveredIndex].manual.toLocaleString()}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend - Clean inline style */}
      <div className={`flex items-center justify-center gap-6 mt-4 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-primary rounded-full" />
          <span className={`text-[11px] font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>AI Savings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 rounded-full" style={{ backgroundImage: isDark ? 'repeating-linear-gradient(90deg, #6b7280 0, #6b7280 3px, transparent 3px, transparent 6px)' : 'repeating-linear-gradient(90deg, #cbd5e1 0, #cbd5e1 3px, transparent 3px, transparent 6px)' }} />
          <span className={`text-[11px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Manual Costs</span>
        </div>
      </div>
    </div>
  )
}

export default ROIAnalyticsCard
