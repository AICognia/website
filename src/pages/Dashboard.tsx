import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  RadialBarChart,
  RadialBar
} from 'recharts';
import {
  Bell,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Search,
  Send,
  Activity,
  Database,
  DollarSign,
  Brain,
  Zap,
  Eye,
  Target,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  GitBranch,
  Radio,
  Shield,
  BarChart3,
  MessageSquare,
  X,
  Play,
  Command,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import SEO from '../components/SEO';

// ============================================================================
// DATA
// ============================================================================

const revenueData = [
  { month: 'Oca', actual: 4200, predicted: null, target: 4000 },
  { month: 'Şub', actual: 4650, predicted: null, target: 4200 },
  { month: 'Mar', actual: 5100, predicted: null, target: 4400 },
  { month: 'Nis', actual: 4850, predicted: null, target: 4600 },
  { month: 'May', actual: 5400, predicted: null, target: 4800 },
  { month: 'Haz', actual: 6100, predicted: null, target: 5000 },
  { month: 'Tem', actual: 5750, predicted: null, target: 5200 },
  { month: 'Ağu', actual: 6400, predicted: 6400, target: 5400 },
  { month: 'Eyl', actual: null, predicted: 6850, target: 5600 },
  { month: 'Eki', actual: null, predicted: 7300, target: 5800 },
];

const dataSources = [
  { id: 'erp', name: 'ERP Sistemi', type: 'database', records: '2.4M', latency: '12ms', status: 'active', lastSync: '2 sn önce' },
  { id: 'crm', name: 'CRM', type: 'cloud', records: '856K', latency: '8ms', status: 'active', lastSync: '5 sn önce' },
  { id: 'finance', name: 'Finans Modülü', type: 'database', records: '3.1M', latency: '15ms', status: 'active', lastSync: '1 sn önce' },
  { id: 'logistics', name: 'Lojistik API', type: 'api', records: '1.2M', latency: '23ms', status: 'active', lastSync: '8 sn önce' },
  { id: 'ecommerce', name: 'E-Ticaret', type: 'cloud', records: '428K', latency: '18ms', status: 'active', lastSync: '3 sn önce' },
];

const aiInsights = [
  {
    id: 1,
    type: 'anomaly',
    severity: 'critical',
    title: 'Satış Anomalisi Tespit Edildi',
    summary: 'İç Anadolu bölgesinde son 7 günde %23 satış düşüşü.',
    detail: 'Normal sapmanın 3.2σ üzerinde. Rakip fiyat indirimi muhtemel sebep.',
    confidence: 94,
    impact: '₺340K/ay risk',
    action: 'Bölge analizi başlat',
    department: 'Satış',
    timestamp: '35 dk önce'
  },
  {
    id: 2,
    type: 'prediction',
    severity: 'warning',
    title: 'Stok Tükenme Tahmini',
    summary: 'Premium Widget A 4 gün içinde tükenecek.',
    detail: 'Günlük satış hızı: 12.4 adet. Mevcut stok: 52 adet.',
    confidence: 98,
    impact: '₺125K satış kaybı',
    action: 'Sipariş oluştur',
    department: 'Tedarik',
    timestamp: '1 saat önce'
  },
  {
    id: 3,
    type: 'opportunity',
    severity: 'info',
    title: 'Büyüme Fırsatı Belirlendi',
    summary: 'Marmara bölgesi %15 büyüme potansiyeli.',
    detail: 'Kurumsal segment talep artışı tespit edildi.',
    confidence: 87,
    impact: '+₺420K/ay potansiyel',
    action: 'Strateji planla',
    department: 'Pazarlama',
    timestamp: '2 saat önce'
  }
];

const kpiData = [
  { label: 'Günlük Ciro', value: '₺847K', change: '+12.3%', trend: 'up', target: '₺750K', progress: 113 },
  { label: 'Aktif Sipariş', value: '68', change: '+8.2%', trend: 'up', target: '60', progress: 113 },
  { label: 'Yeni Müşteri', value: '12', change: '+3', trend: 'up', target: '10', progress: 120 },
  { label: 'NPS Skoru', value: '72', change: '+4', trend: 'up', target: '65', progress: 111 },
];

const performanceByRegion = [
  { name: 'Marmara', value: 8420, change: 15.2, fill: '#6366f1' },
  { name: 'Ege', value: 3640, change: 8.4, fill: '#8b5cf6' },
  { name: 'Akdeniz', value: 2890, change: 6.1, fill: '#a855f7' },
  { name: 'İç Anadolu', value: 2150, change: -12.3, fill: '#ef4444' },
  { name: 'Diğer', value: 2680, change: 4.2, fill: '#64748b' },
];

const activityFeed = [
  { time: '14:23:45', event: 'Yeni sipariş alındı', source: 'ERP', type: 'success', value: '₺24.5K' },
  { time: '14:22:18', event: 'Stok güncellendi', source: 'Depo', type: 'info', value: '+150 adet' },
  { time: '14:21:02', event: 'AI tahmin oluşturuldu', source: 'ML', type: 'ai', value: '3 öngörü' },
  { time: '14:19:33', event: 'Ödeme onaylandı', source: 'Finans', type: 'success', value: '₺18.2K' },
  { time: '14:17:55', event: 'Anomali tespit edildi', source: 'AI', type: 'warning', value: 'İnceleniyor' },
];

// ============================================================================
// COMPONENTS
// ============================================================================

// Animated pulse for live indicators
const LivePulse: React.FC<{ color?: string }> = ({ color = '#10b981' }) => (
  <span className="relative flex h-2 w-2">
    <span
      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
      style={{ backgroundColor: color }}
    />
    <span
      className="relative inline-flex rounded-full h-2 w-2"
      style={{ backgroundColor: color }}
    />
  </span>
);

// Data flow animation line
const DataFlowLine: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <motion.div
    className="absolute h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
    style={{ width: '100%' }}
    initial={{ x: '-100%', opacity: 0 }}
    animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      repeatDelay: 3,
      ease: 'linear'
    }}
  />
);

// Glowing border card
const GlowCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}> = ({ children, className = '', glowColor = 'rgba(99, 102, 241, 0.15)', onClick }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
    className={`relative rounded-xl overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
      boxShadow: `0 0 40px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
      border: '1px solid rgba(99, 102, 241, 0.2)'
    }}
  >
    {children}
  </motion.div>
);

// Header Component
const Header: React.FC<{ onAIClick: () => void }> = ({ onAIClick }) => {
  const [time, setTime] = useState(new Date());
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div>
            <h1 className="text-white font-semibold tracking-tight">Cognia Platform</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Enterprise Intelligence</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <LivePulse />
          <span className="text-xs font-medium text-emerald-400">5 sistem bağlı</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          className={`hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
            searchFocused
              ? 'bg-[#0f1629] border-indigo-500/50 w-80'
              : 'bg-[#0f1629]/50 border-white/5 w-64'
          } border`}
          animate={{ width: searchFocused ? 320 : 256 }}
        >
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="Ara veya AI'ya sor..."
            className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-600"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5">
            <Command size={10} className="text-gray-500" />
            <span className="text-[10px] text-gray-500">K</span>
          </div>
        </motion.div>

        <button
          onClick={onAIClick}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all"
        >
          <Brain size={18} />
          <span className="hidden sm:inline text-sm font-medium">AI Asistan</span>
        </button>

        <div className="text-right hidden sm:block">
          <div className="text-white font-mono text-sm">
            {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-[10px] text-gray-500">
            {time.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}
          </div>
        </div>

        <div className="relative">
          <button className="w-10 h-10 rounded-xl bg-[#0f1629] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/10 transition-colors">
            <Bell size={18} />
          </button>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </header>
  );
};

// Data Sources Panel
const DataSourcesPanel: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlowCard className="p-5" glowColor="rgba(6, 182, 212, 0.1)">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Database size={18} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Veri Kaynakları</h3>
            <p className="text-xs text-gray-500">Gerçek zamanlı bağlantı</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-cyan-400 font-mono">7.9M kayıt</span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <motion.div animate={{ rotate: expanded ? 90 : 0 }}>
              <ChevronRight size={16} className="text-gray-500" />
            </motion.div>
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Data flow visualization */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <DataFlowLine delay={0} />
          <DataFlowLine delay={1.5} />
        </div>

        <div className="space-y-2">
          {dataSources.slice(0, expanded ? dataSources.length : 3).map((source, i) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-colors group"
            >
              <div className="relative">
                <LivePulse color="#06b6d4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white truncate">{source.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-medium">
                    {source.latency}
                  </span>
                </div>
                <span className="text-[10px] text-gray-500">{source.lastSync}</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">{source.records}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw size={12} className="text-gray-500" />
          <span className="text-[10px] text-gray-500">Son güncelleme: 1 sn önce</span>
        </div>
        <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
          Tümünü Gör <ExternalLink size={10} />
        </button>
      </div>
    </GlowCard>
  );
};

// AI Insights Panel
const AIInsightsPanel: React.FC<{ onActionClick: (insight: any) => void }> = ({ onActionClick }) => {
  const severityStyles = {
    critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', color: 'text-red-400', icon: AlertTriangle },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', color: 'text-amber-400', icon: Clock },
    info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', color: 'text-cyan-400', icon: Zap },
  };

  const typeIcons = {
    anomaly: Eye,
    prediction: Target,
    opportunity: TrendingUp,
  };

  return (
    <GlowCard className="p-5" glowColor="rgba(139, 92, 246, 0.15)">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
            <Sparkles size={18} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI İçgörüleri</h3>
            <p className="text-xs text-gray-500">Otomatik tespit & öneriler</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-semibold text-red-400">3 dikkat gerekiyor</span>
        </div>
      </div>

      <div className="space-y-3">
        {aiInsights.map((insight, i) => {
          const severity = severityStyles[insight.severity as keyof typeof severityStyles];
          const TypeIcon = typeIcons[insight.type as keyof typeof typeIcons];

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl ${severity.bg} border ${severity.border} hover:scale-[1.01] transition-transform cursor-pointer`}
              onClick={() => onActionClick(insight)}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${severity.bg} flex items-center justify-center flex-shrink-0`}>
                  <TypeIcon size={16} className={severity.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">{insight.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-gray-400">
                      {insight.confidence}% güven
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{insight.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{insight.timestamp}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400">
                        {insight.department}
                      </span>
                    </div>
                    <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${severity.bg} ${severity.color} hover:opacity-80 transition-opacity`}>
                      <Play size={10} />
                      {insight.action}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </GlowCard>
  );
};

// KPI Card
const KPICard: React.FC<{
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  progress: number;
  delay?: number;
}> = ({ label, value, change, trend, progress, delay = 0 }) => {
  const progressColor = progress >= 100 ? '#10b981' : progress >= 80 ? '#f59e0b' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative p-5 rounded-xl bg-[#0f1629]/80 border border-white/5 overflow-hidden group hover:border-indigo-500/20 transition-colors"
    >
      {/* Progress indicator */}
      <div
        className="absolute bottom-0 left-0 h-1 transition-all duration-1000"
        style={{
          width: `${Math.min(progress, 100)}%`,
          background: `linear-gradient(90deg, ${progressColor}40, ${progressColor})`
        }}
      />

      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-gray-500 uppercase tracking-wider">{label}</span>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
          trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>

      <div className="text-2xl font-bold text-white tracking-tight mb-1">{value}</div>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: progressColor }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, delay: delay + 0.3 }}
          />
        </div>
        <span className="text-[10px] text-gray-500">{progress}%</span>
      </div>
    </motion.div>
  );
};

// Revenue Chart
const RevenueChart: React.FC = () => {
  return (
    <GlowCard className="p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-semibold text-white">Gelir & AI Tahmini</h3>
          <p className="text-xs text-gray-500 mt-1">Aylık performans ve 3 aylık projeksiyon</p>
        </div>
        <div className="flex items-center gap-4">
          {[
            { label: 'Gerçekleşen', color: '#6366f1' },
            { label: 'AI Tahmini', color: '#a855f7', dashed: true },
            { label: 'Hedef', color: '#10b981', dashed: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`w-4 h-1 rounded ${item.dashed ? 'opacity-60' : ''}`}
                style={{
                  background: item.color,
                  ...(item.dashed && { backgroundImage: `repeating-linear-gradient(90deg, ${item.color}, ${item.color} 4px, transparent 4px, transparent 8px)` })
                }}
              />
              <span className="text-xs text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={revenueData}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#6366f1" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="predictionGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}K`} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#151d30',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: 12,
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
            labelStyle={{ color: '#f8fafc', fontWeight: 600, marginBottom: 8 }}
            formatter={(value: any, name: string) => [
              value ? `₺${value.toLocaleString()}K` : '-',
              name === 'actual' ? 'Gerçekleşen' : name === 'predicted' ? 'AI Tahmini' : 'Hedef',
            ]}
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#6366f1"
            strokeWidth={2.5}
            fill="url(#revenueGradient)"
            dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
          />
          <Area
            type="monotone"
            dataKey="predicted"
            stroke="#a855f7"
            strokeWidth={2.5}
            strokeDasharray="6 4"
            fill="url(#predictionGradient)"
            dot={{ fill: '#a855f7', r: 4, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="target"
            stroke="#10b981"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="none"
            dot={false}
            opacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
            <Brain size={16} className="text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-indigo-400">AI TAHMİNİ</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">%94 güven</span>
            </div>
            <p className="text-sm text-gray-300">
              Eylül-Ekim döneminde <span className="text-white font-semibold">%18 büyüme</span> öngörülüyor.
              Marmara bölgesi kurumsal segment ana itici güç olacak.
            </p>
          </div>
        </div>
      </div>
    </GlowCard>
  );
};

// Regional Performance
const RegionalPerformance: React.FC = () => {
  const total = performanceByRegion.reduce((sum, r) => sum + r.value, 0);

  return (
    <GlowCard className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-white">Bölgesel Performans</h3>
        <span className="text-xs text-gray-500">Aylık Ciro (₺K)</span>
      </div>

      <div className="space-y-3">
        {performanceByRegion.map((region, i) => {
          const percentage = (region.value / total) * 100;
          return (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white">{region.name}</span>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${
                    region.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {region.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {region.change >= 0 ? '+' : ''}{region.change}%
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">₺{(region.value / 1000).toFixed(1)}M</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: region.fill }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
        <span className="text-xs text-gray-500">Toplam</span>
        <span className="text-lg font-bold text-white">₺{(total / 1000).toFixed(1)}M</span>
      </div>
    </GlowCard>
  );
};

// Activity Feed
const ActivityFeed: React.FC = () => {
  const typeStyles: Record<string, { bg: string; color: string }> = {
    success: { bg: 'bg-emerald-500/10', color: 'text-emerald-400' },
    info: { bg: 'bg-cyan-500/10', color: 'text-cyan-400' },
    warning: { bg: 'bg-amber-500/10', color: 'text-amber-400' },
    ai: { bg: 'bg-indigo-500/10', color: 'text-indigo-400' },
  };

  return (
    <GlowCard className="p-5" glowColor="rgba(16, 185, 129, 0.1)">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Activity size={18} className="text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Canlı Aktivite</h3>
            <p className="text-xs text-gray-500">Gerçek zamanlı olaylar</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LivePulse color="#10b981" />
          <span className="text-xs text-emerald-400">Canlı</span>
        </div>
      </div>

      <div className="space-y-2">
        {activityFeed.map((item, i) => {
          const style = typeStyles[item.type];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border-l-2 ${
                item.type === 'warning' ? 'border-amber-500' :
                item.type === 'ai' ? 'border-indigo-500' :
                item.type === 'success' ? 'border-emerald-500' : 'border-cyan-500'
              }`}
            >
              <span className="text-[10px] font-mono text-gray-500 w-16">{item.time}</span>
              <span className="text-xs text-white flex-1 truncate">{item.event}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${style.bg} ${style.color}`}>
                {item.source}
              </span>
              <span className="text-xs text-gray-400">{item.value}</span>
            </motion.div>
          );
        })}
      </div>
    </GlowCard>
  );
};

// AI Chat Modal
const AIChatModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Merhaba! 5 veri kaynağından 7.9 milyon kayda erişimim var. Size nasıl yardımcı olabilirim?\n\nÖrnek sorular:\n• "Geçen aya göre en çok düşen ürünler?"\n• "Stok durumu kritik ürünleri listele"\n• "Önümüzdeki ay satış tahmini"'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const query = input;
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      if (query.toLowerCase().includes('düş') || query.toLowerCase().includes('geril')) {
        response = `📉 **Satış Düşüşü Analizi**

**Son 30 Günde En Çok Gerileyen:**
1. Basic Widget E: **-8.5%** (Rakip fiyat indirimi)
2. Deluxe Widget D: **-3.2%** (Mevsimsel)
3. Standard Widget B: **-1.2%** (Tedarik gecikmesi)

💡 **Öneri:** Basic Widget E için değer odaklı kampanya önerilir. Tahmini etki: +₺125K/ay

*%94 güven | 847K kayıt analiz edildi*`;
      } else if (query.toLowerCase().includes('stok')) {
        response = `📦 **Stok Durumu Raporu**

🔴 **Kritik:**
• Premium Widget A: 52 adet (4 gün kaldı)

🟢 **Normal:**
• Standard Widget B: 324 adet (42 gün)
• Economy Widget C: 890 adet (28 gün)

💡 **Öneri:** Premium Widget A için 250 adet acil sipariş (ABC Ltd. - 3 gün teslimat)

*%98 güven | Gerçek zamanlı veri*`;
      } else {
        response = `Sorgunuz analiz edildi. 5 veri kaynağından bilgi toplandı.

**Özet:**
• 2.4M kayıt tarandı
• 847 ilgili veri noktası bulundu

Daha spesifik sonuçlar için tarih, bölge veya ürün belirtin.`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-4 right-4 w-[440px] h-[600px] z-50 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0f1629 0%, #1a1f35 100%)',
              boxShadow: '0 0 60px rgba(99, 102, 241, 0.2), 0 0 100px rgba(139, 92, 246, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Brain size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Cognia AI</h3>
                  <div className="flex items-center gap-2">
                    <LivePulse />
                    <span className="text-[10px] text-emerald-400">7.9M kayıt bağlı</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-sm'
                      : 'bg-white/5 text-gray-200 rounded-bl-sm border border-white/10'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[0, 1, 2].map(i => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-indigo-400"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">AI analiz ediyor...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-[#0f1629]/90 backdrop-blur-xl">
              <div className="flex gap-3">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Türkçe soru sorun..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-indigo-500/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={isTyping}
                  className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Action Modal
const ActionModal: React.FC<{ insight: any; onClose: () => void }> = ({ insight, onClose }) => {
  const [actionStatus, setActionStatus] = useState<'idle' | 'processing' | 'complete'>('idle');

  const handleAction = () => {
    setActionStatus('processing');
    setTimeout(() => {
      setActionStatus('complete');
      setTimeout(onClose, 1500);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f1629 0%, #1a1f35 100%)',
          boxShadow: '0 0 60px rgba(99, 102, 241, 0.2)',
          border: '1px solid rgba(99, 102, 241, 0.3)'
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
              <Zap size={20} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{insight?.action}</h3>
              <p className="text-xs text-gray-500">{insight?.title}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
            <p className="text-sm text-gray-300 mb-2">{insight?.detail}</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">Etki: <span className="text-white">{insight?.impact}</span></span>
              <span className="text-xs text-gray-500">Güven: <span className="text-indigo-400">{insight?.confidence}%</span></span>
            </div>
          </div>

          {actionStatus === 'idle' && (
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleAction}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-all"
              >
                Onayla ve Başlat
              </button>
            </div>
          )}

          {actionStatus === 'processing' && (
            <div className="py-3 flex items-center justify-center gap-3">
              <RefreshCw size={18} className="text-indigo-400 animate-spin" />
              <span className="text-sm text-gray-300">İşleniyor...</span>
            </div>
          )}

          {actionStatus === 'complete' && (
            <div className="py-3 flex items-center justify-center gap-3 text-emerald-400">
              <CheckCircle2 size={18} />
              <span className="text-sm font-medium">Başarıyla tamamlandı!</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// MAIN DASHBOARD
// ============================================================================

export default function Dashboard() {
  const [aiChatOpen, setAIChatOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = currentTime.getHours() < 12 ? 'Günaydın' :
                   currentTime.getHours() < 18 ? 'İyi günler' : 'İyi akşamlar';

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      <SEO page="dashboard" />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <Header onAIClick={() => setAIChatOpen(true)} />

      <main className="relative z-10 max-w-[1600px] mx-auto p-6">
        {/* Hero Section - Daily Brief */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <GlowCard className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">{greeting}, Emre</h1>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                    <Sparkles size={14} className="text-indigo-400" />
                    <span className="text-xs font-medium text-indigo-400">AI Günlük Özeti</span>
                  </div>
                </div>
                <p className="text-gray-400">
                  {currentTime.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 transition-colors">
                  <MessageSquare size={16} />
                  E-posta Gönder
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-all">
                  <BarChart3 size={16} />
                  Rapor İndir
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border-l-4 border-indigo-500">
              <p className="text-white leading-relaxed">
                Dün genel performans <span className="text-emerald-400 font-semibold">beklentilerin %8 üzerinde</span> gerçekleşti.
                Marmara bölgesi ₺1.2M ile günlük rekor kırdı.
                <span className="text-amber-400 font-semibold"> 2 kritik durum</span> dikkatinizi bekliyor:
                İç Anadolu satış anomalisi ve Premium Widget A stok uyarısı.
              </p>
            </div>
          </GlowCard>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiData.map((kpi, i) => (
            <KPICard key={kpi.label} {...kpi} delay={i * 0.1} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <RevenueChart />

            {/* Bottom row */}
            <div className="grid md:grid-cols-2 gap-6">
              <RegionalPerformance />
              <ActivityFeed />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <DataSourcesPanel />
            <AIInsightsPanel onActionClick={setSelectedInsight} />
          </div>
        </div>

        {/* System Status Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between py-4 border-t border-white/5"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-emerald-400" />
              <span className="text-xs text-gray-500">Tüm sistemler çalışıyor</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-cyan-400" />
              <span className="text-xs text-gray-500">5 veri kaynağı bağlı</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch size={14} className="text-purple-400" />
              <span className="text-xs text-gray-500">AI modeli v2.4.1</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-emerald-400" />
            <span className="text-xs text-gray-500">Son güncelleme: {currentTime.toLocaleTimeString('tr-TR')}</span>
          </div>
        </motion.div>
      </main>

      {/* Modals */}
      <AIChatModal isOpen={aiChatOpen} onClose={() => setAIChatOpen(false)} />

      <AnimatePresence>
        {selectedInsight && (
          <ActionModal insight={selectedInsight} onClose={() => setSelectedInsight(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
