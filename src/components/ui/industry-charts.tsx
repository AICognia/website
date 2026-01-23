"use client"

import React from 'react'
import { motion } from 'framer-motion'
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
} from 'recharts'
import { cn } from '@/src/lib/utils'

interface RadialProgressProps {
  percentage: number
  label: string
  sublabel?: string
  color?: string
  size?: number
  className?: string
}

export const RadialProgressChart: React.FC<RadialProgressProps> = ({
  percentage,
  label,
  sublabel,
  color = '#3b82f6',
  size = 160,
  className,
}) => {
  const data = [{ name: 'progress', value: percentage, fill: color }]

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div style={{ width: size, height: size }} className="relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            barSize={10}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={false}
            />
            <RadialBar
              background={{ fill: '#f1f5f9' }}
              dataKey="value"
              cornerRadius={10}
              className="drop-shadow-sm"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-slate-900"
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <div className="text-sm font-medium text-slate-900">{label}</div>
        {sublabel && (
          <div className="text-xs text-slate-500 mt-0.5">{sublabel}</div>
        )}
      </div>
    </div>
  )
}

interface RadarDataPoint {
  category: string
  current: number
  potential: number
}

interface MiniRadarChartProps {
  data: RadarDataPoint[]
  title?: string
  className?: string
  primaryColor?: string
  secondaryColor?: string
}

export const MiniRadarChart: React.FC<MiniRadarChartProps> = ({
  data,
  title,
  className,
  primaryColor = '#3b82f6',
  secondaryColor = '#94a3b8',
}) => {
  return (
    <div className={cn('', className)}>
      {title && (
        <div className="text-sm font-medium text-slate-700 mb-2">{title}</div>
      )}
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: '#64748b', fontSize: 10 }}
            />
            <Radar
              name="Current"
              dataKey="current"
              stroke={secondaryColor}
              fill={secondaryColor}
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name="Potential"
              dataKey="potential"
              stroke={primaryColor}
              fill={primaryColor}
              fillOpacity={0.3}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

interface AreaDataPoint {
  name: string
  value: number
  previous?: number
}

interface GlowingAreaChartProps {
  data: AreaDataPoint[]
  title?: string
  color?: string
  showComparison?: boolean
  className?: string
}

export const GlowingAreaChart: React.FC<GlowingAreaChartProps> = ({
  data,
  title,
  color = '#3b82f6',
  showComparison = false,
  className,
}) => {
  const gradientId = `areaGradient-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={cn('', className)}>
      {title && (
        <div className="text-sm font-medium text-slate-700 mb-3">{title}</div>
      )}
      <div className="h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            {showComparison && (
              <Area
                type="monotone"
                dataKey="previous"
                stroke="#cbd5e1"
                strokeWidth={1.5}
                fill="transparent"
                strokeDasharray="5 5"
              />
            )}
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

interface BarDataPoint {
  label: string
  value: number
  color?: string
}

interface HorizontalBarChartProps {
  data: BarDataPoint[]
  title?: string
  maxValue?: number
  defaultColor?: string
  className?: string
  showPercentage?: boolean
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({
  data,
  title,
  maxValue = 100,
  defaultColor = '#3b82f6',
  className,
  showPercentage = true,
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {title && (
        <div className="text-sm font-medium text-slate-700">{title}</div>
      )}
      {data.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-1"
        >
          <div className="flex justify-between text-xs">
            <span className="text-slate-600">{item.label}</span>
            {showPercentage && (
              <span className="font-medium text-slate-900">{item.value}%</span>
            )}
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="h-full rounded-full"
              style={{
                backgroundColor: item.color || defaultColor,
                boxShadow: `0 0 8px ${item.color || defaultColor}40`,
              }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

interface DonutDataPoint {
  name: string
  value: number
  color: string
  [key: string]: string | number
}

interface DonutChartProps {
  data: DonutDataPoint[]
  centerValue?: string
  centerLabel?: string
  size?: number
  className?: string
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  centerValue,
  centerLabel,
  size = 160,
  className,
}) => {
  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="85%"
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                style={{ filter: `drop-shadow(0 2px 4px ${entry.color}30)` }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {(centerValue || centerLabel) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && (
            <span className="text-xl font-bold text-slate-900">{centerValue}</span>
          )}
          {centerLabel && (
            <span className="text-xs text-slate-500">{centerLabel}</span>
          )}
        </div>
      )}
    </div>
  )
}

interface MetricCardProps {
  value: string
  label: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon?: React.ReactNode
  color?: string
  className?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  value,
  label,
  trend,
  trendValue,
  icon,
  color = '#3b82f6',
  className,
}) => {
  const trendColors = {
    up: 'text-green-600 bg-green-50',
    down: 'text-red-600 bg-red-50',
    neutral: 'text-slate-600 bg-slate-50',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-4 rounded-xl bg-white border border-slate-100 shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between">
        {icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            {icon}
          </div>
        )}
        {trend && trendValue && (
          <div
            className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1',
              trendColors[trend]
            )}
          >
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-sm text-slate-500 mt-0.5">{label}</div>
      </div>
    </motion.div>
  )
}

interface DataFlowProps {
  sources: string[]
  destination: string
  className?: string
  color?: string
}

export const DataFlowVisualization: React.FC<DataFlowProps> = ({
  sources,
  destination,
  className,
  color = '#3b82f6',
}) => {
  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Source nodes */}
      <div className="flex flex-wrap justify-center gap-2">
        {sources.map((source, index) => (
          <motion.div
            key={source}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600 border border-slate-200"
          >
            {source}
          </motion.div>
        ))}
      </div>

      {/* Animated flow indicator */}
      <div className="relative h-12 w-px bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200">
        <motion.div
          className="absolute w-2 h-2 rounded-full -left-[3px]"
          style={{ backgroundColor: color }}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Destination node */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-lg"
        style={{
          backgroundColor: color,
          boxShadow: `0 4px 14px ${color}40`
        }}
      >
        {destination}
      </motion.div>
    </div>
  )
}

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 1.5,
  className,
}) => {
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    let start = 0
    const end = value
    const incrementTime = (duration * 1000) / end

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
