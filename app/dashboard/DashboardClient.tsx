'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
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
  Brain,
  Zap,
  Eye,
  Target,
  ChevronRight,
  ChevronDown,
  ChevronUp,
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
  ExternalLink,
  LineChart as LineChartIcon,
  Users,
  Filter,
  Download,
  Table,
  Folder,
  FileText,
  Cpu,
  Network,
  ArrowRight,
  CheckCircle,
  XCircle,
  MinusCircle,
  LayoutDashboard,
  Bot,
  BarChart2,
  Home,
  Settings,
  Menu,
  Grip
} from 'lucide-react';
import SEO from '@/src/components/SEO';

// ============================================================================
// MOBILE DETECTION HOOK
// ============================================================================

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// ============================================================================
// TYPES
// ============================================================================

type DashboardPage = 'executive' | 'model' | 'graphics';
type TimeRange = 'daily' | 'weekly' | 'monthly';

interface HeatmapCell {
  x: string;
  y: string;
  value: number;
}

interface FunnelStage {
  stage: string;
  value: number;
  percentage: number;
  color: string;
}

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
  { id: 'erp', name: 'ERP Sistemi', type: 'database', records: '2.4M', latency: '12ms', status: 'active', lastSync: '2 sn önce', tables: ['orders', 'products', 'inventory'] },
  { id: 'crm', name: 'CRM', type: 'cloud', records: '856K', latency: '8ms', status: 'active', lastSync: '5 sn önce', tables: ['customers', 'contacts', 'opportunities'] },
  { id: 'finance', name: 'Finans Modülü', type: 'database', records: '3.1M', latency: '15ms', status: 'active', lastSync: '1 sn önce', tables: ['transactions', 'invoices', 'payments'] },
  { id: 'logistics', name: 'Lojistik API', type: 'api', records: '1.2M', latency: '23ms', status: 'active', lastSync: '8 sn önce', tables: ['shipments', 'routes', 'vehicles'] },
  { id: 'ecommerce', name: 'E-Ticaret', type: 'cloud', records: '428K', latency: '18ms', status: 'active', lastSync: '3 sn önce', tables: ['carts', 'sessions', 'reviews'] },
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

const kpiData: Array<{ label: string; value: string; change: string; trend: 'up' | 'down'; target: string; progress: number }> = [
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

// Month-over-Month Data
const momData = [
  { metric: 'Toplam Gelir', current: '₺19.8M', previous: '₺17.2M', change: 15.1, trend: 'up' as const },
  { metric: 'Aktif Müşteri', current: '2,847', previous: '2,654', change: 7.3, trend: 'up' as const },
  { metric: 'Ortalama Sepet', current: '₺6,950', previous: '₺6,480', change: 7.3, trend: 'up' as const },
  { metric: 'Dönüşüm Oranı', current: '%4.5', previous: '%4.1', change: 9.8, trend: 'up' as const },
  { metric: 'İade Oranı', current: '%2.3', previous: '%2.8', change: -17.8, trend: 'down' as const },
];

// Heatmap Data - Sales by Day x Region
const heatmapData: HeatmapCell[] = [
  // Marmara
  { x: 'Pzt', y: 'Marmara', value: 85 }, { x: 'Sal', y: 'Marmara', value: 92 }, { x: 'Çar', y: 'Marmara', value: 78 },
  { x: 'Per', y: 'Marmara', value: 88 }, { x: 'Cum', y: 'Marmara', value: 95 }, { x: 'Cmt', y: 'Marmara', value: 72 }, { x: 'Paz', y: 'Marmara', value: 45 },
  // Ege
  { x: 'Pzt', y: 'Ege', value: 62 }, { x: 'Sal', y: 'Ege', value: 68 }, { x: 'Çar', y: 'Ege', value: 55 },
  { x: 'Per', y: 'Ege', value: 72 }, { x: 'Cum', y: 'Ege', value: 78 }, { x: 'Cmt', y: 'Ege', value: 58 }, { x: 'Paz', y: 'Ege', value: 35 },
  // Akdeniz
  { x: 'Pzt', y: 'Akdeniz', value: 48 }, { x: 'Sal', y: 'Akdeniz', value: 55 }, { x: 'Çar', y: 'Akdeniz', value: 42 },
  { x: 'Per', y: 'Akdeniz', value: 58 }, { x: 'Cum', y: 'Akdeniz', value: 65 }, { x: 'Cmt', y: 'Akdeniz', value: 52 }, { x: 'Paz', y: 'Akdeniz', value: 28 },
  // İç Anadolu
  { x: 'Pzt', y: 'İç Anadolu', value: 35 }, { x: 'Sal', y: 'İç Anadolu', value: 38 }, { x: 'Çar', y: 'İç Anadolu', value: 32 },
  { x: 'Per', y: 'İç Anadolu', value: 28 }, { x: 'Cum', y: 'İç Anadolu', value: 42 }, { x: 'Cmt', y: 'İç Anadolu', value: 25 }, { x: 'Paz', y: 'İç Anadolu', value: 18 },
  // Karadeniz
  { x: 'Pzt', y: 'Karadeniz', value: 42 }, { x: 'Sal', y: 'Karadeniz', value: 48 }, { x: 'Çar', y: 'Karadeniz', value: 38 },
  { x: 'Per', y: 'Karadeniz', value: 52 }, { x: 'Cum', y: 'Karadeniz', value: 58 }, { x: 'Cmt', y: 'Karadeniz', value: 45 }, { x: 'Paz', y: 'Karadeniz', value: 22 },
];

// Funnel Data
const funnelData: FunnelStage[] = [
  { stage: 'Web Ziyareti', value: 50000, percentage: 100, color: '#6366f1' },
  { stage: 'Ürün Görüntüleme', value: 22500, percentage: 45, color: '#8b5cf6' },
  { stage: 'Sepete Ekleme', value: 9000, percentage: 18, color: '#a855f7' },
  { stage: 'Ödeme Sayfası', value: 4500, percentage: 9, color: '#c084fc' },
  { stage: 'Satın Alma', value: 2250, percentage: 4.5, color: '#10b981' },
];

// Line Chart Data
const trendData = [
  { date: '01', sales: 4200, orders: 45, customers: 12 },
  { date: '02', sales: 4800, orders: 52, customers: 15 },
  { date: '03', sales: 4100, orders: 41, customers: 10 },
  { date: '04', sales: 5200, orders: 58, customers: 18 },
  { date: '05', sales: 4900, orders: 55, customers: 14 },
  { date: '06', sales: 5800, orders: 62, customers: 22 },
  { date: '07', sales: 5100, orders: 48, customers: 16 },
  { date: '08', sales: 6200, orders: 68, customers: 25 },
  { date: '09', sales: 5500, orders: 58, customers: 19 },
  { date: '10', sales: 6800, orders: 72, customers: 28 },
  { date: '11', sales: 6100, orders: 65, customers: 21 },
  { date: '12', sales: 7200, orders: 78, customers: 32 },
];

// Bar Chart Data - Category Performance
const categoryData = [
  { category: 'Elektronik', revenue: 4850, growth: 12.5 },
  { category: 'Giyim', revenue: 3200, growth: 8.2 },
  { category: 'Ev & Yaşam', revenue: 2800, growth: 15.1 },
  { category: 'Spor', revenue: 1950, growth: -3.2 },
  { category: 'Kozmetik', revenue: 2100, growth: 22.4 },
  { category: 'Kitap', revenue: 890, growth: 5.8 },
];

// Feedback Loop Data
const feedbackData = [
  { id: 1, recommendation: 'Premium Widget A sipariş önerisi', decision: 'accepted', outcome: 'positive', impact: '+₺125K', improvement: '+2.3%' },
  { id: 2, recommendation: 'İç Anadolu kampanya önerisi', decision: 'modified', outcome: 'neutral', impact: '₺0', improvement: '+0.5%' },
  { id: 3, recommendation: 'Fiyat optimizasyonu', decision: 'rejected', outcome: 'negative', impact: '-₺45K', improvement: '-0.8%' },
];

// ============================================================================
// SHARED COMPONENTS
// ============================================================================

const LivePulse: React.FC<{ color?: string }> = ({ color = '#10b981' }) => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }} />
    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: color }} />
  </span>
);

const DataFlowLine: React.FC<{ delay?: number }> = ({ delay = 0 }) => (
  <motion.div
    className="absolute h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
    style={{ width: '100%' }}
    initial={{ x: '-100%', opacity: 0 }}
    animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
  />
);

const GlowCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
}> = ({ children, className = '', glowColor = 'rgba(99, 102, 241, 0.15)', onClick }) => (
  <motion.div
    whileHover={{ scale: 1.005 }}
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

// ============================================================================
// TAB NAVIGATION
// ============================================================================

const dashboardTabs = [
  { id: 'executive' as const, label: 'Yönetici Paneli', icon: LayoutDashboard, description: 'KPI ve raporlar' },
  { id: 'model' as const, label: 'Model Etkileşimi', icon: Bot, description: 'AI & ML sorguları' },
  { id: 'graphics' as const, label: 'Grafikler', icon: BarChart2, description: 'Detaylı analizler' },
];

// Desktop Tab Navigation - Hidden on mobile
const TabNavigation: React.FC<{ activeTab: DashboardPage; onTabChange: (tab: DashboardPage) => void }> = ({ activeTab, onTabChange }) => (
  <div className="hidden md:flex items-center gap-2 p-3 bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-white/5">
    {dashboardTabs.map((tab) => (
      <motion.button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
          activeTab === tab.id
            ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <tab.icon size={18} className={activeTab === tab.id ? 'text-indigo-400' : ''} />
        <div className="text-left">
          <span className="text-sm font-medium block whitespace-nowrap">{tab.label}</span>
          <span className="text-[10px] text-gray-500">{tab.description}</span>
        </div>
      </motion.button>
    ))}
  </div>
);

// ============================================================================
// MOBILE BOTTOM NAVIGATION
// ============================================================================

const MobileBottomNavigation: React.FC<{
  activeTab: DashboardPage;
  onTabChange: (tab: DashboardPage) => void;
  onAIClick: () => void;
}> = ({ activeTab, onTabChange, onAIClick }) => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
    {/* Gradient fade for content behind */}
    <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-[#050810] to-transparent pointer-events-none" />

    <div className="bg-[#0a0f1a]/98 backdrop-blur-xl border-t border-white/10 px-2 pb-[env(safe-area-inset-bottom,8px)]">
      <div className="flex items-center justify-around">
        {dashboardTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center py-3 px-4 min-w-[72px] transition-colors relative ${
                isActive ? 'text-indigo-400' : 'text-gray-500'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                />
              )}
              <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {tab.id === 'executive' ? 'Panel' : tab.id === 'model' ? 'AI Chat' : 'Grafikler'}
              </span>
            </motion.button>
          );
        })}

        {/* Floating AI Button */}
        <motion.button
          onClick={onAIClick}
          className="flex flex-col items-center py-3 px-4 min-w-[72px] text-purple-400"
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-11 h-11 -mt-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30 border-4 border-[#050810]">
            <Brain size={20} className="text-white" />
          </div>
          <span className="text-[10px] mt-0.5 font-medium text-white">Asistan</span>
        </motion.button>
      </div>
    </div>
  </div>
);

// ============================================================================
// HEADER
// ============================================================================

const Header: React.FC<{ onAIClick: () => void }> = ({ onAIClick }) => {
  const [time, setTime] = useState(new Date());
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-14 md:h-16 bg-[#0a0f1a]/95 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-3 md:px-6 sticky top-0 z-40">
      {/* Left side - Logo & Branding */}
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-2 md:gap-3">
          <img src="/cognia-icon-only.png" alt="Cognia" className="w-9 h-9 md:w-12 md:h-12 object-contain flex-shrink-0" />
          <div>
            <h1 className="text-white font-semibold tracking-tight text-sm md:text-base">Cognia</h1>
            <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest hidden md:block">Enterprise Intelligence</p>
          </div>
        </div>
        {/* Connection status - Desktop only */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <LivePulse />
          <span className="text-xs font-medium text-emerald-400">5 sistem bağlı</span>
        </div>
      </div>

      {/* Right side - Mobile optimized */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile: Compact status indicator */}
        <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <LivePulse />
          <span className="text-[10px] font-medium text-emerald-400">Aktif</span>
        </div>

        {/* Desktop: Search bar */}
        <motion.div
          className={`hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
            searchFocused ? 'bg-[#0f1629] border-indigo-500/50 w-80' : 'bg-[#0f1629]/50 border-white/5 w-64'
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

        {/* Desktop only: AI Assistant button (mobile has it in bottom nav) */}
        <button
          onClick={onAIClick}
          className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400 hover:from-indigo-500/30 hover:to-purple-500/30 transition-all"
        >
          <Brain size={18} />
          <span className="text-sm font-medium">AI Asistan</span>
        </button>

        {/* Desktop: Time display */}
        <div className="text-right hidden md:block">
          <div className="text-white font-mono text-sm">
            {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-[10px] text-gray-500">
            {time.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}
          </div>
        </div>

        {/* Notifications - All screens */}
        <div className="relative">
          <button className="w-10 h-10 rounded-xl bg-[#0f1629] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/10 transition-colors active:scale-95">
            <Bell size={18} />
          </button>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">3</span>
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// PAGE 1 COMPONENTS - EXECUTIVE DASHBOARD
// ============================================================================

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
      className="relative p-3 sm:p-4 md:p-5 rounded-xl bg-[#0f1629]/80 border border-white/5 overflow-hidden group hover:border-indigo-500/20 transition-colors"
    >
      <div className="absolute bottom-0 left-0 h-1 transition-all duration-1000"
        style={{ width: `${Math.min(progress, 100)}%`, background: `linear-gradient(90deg, ${progressColor}40, ${progressColor})` }}
      />
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">{label}</span>
        <div className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-semibold ${
          trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {trend === 'up' ? <ArrowUpRight size={10} className="sm:w-3 sm:h-3" /> : <ArrowDownRight size={10} className="sm:w-3 sm:h-3" />}
          {change}
        </div>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">{value}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div className="h-full rounded-full" style={{ background: progressColor }}
            initial={{ width: 0 }} animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, delay: delay + 0.3 }}
          />
        </div>
        <span className="text-[10px] text-gray-500">{progress}%</span>
      </div>
    </motion.div>
  );
};

// ============================================================================
// MOBILE-SPECIFIC COMPONENTS
// ============================================================================

// Collapsible Section for Mobile - Progressive Disclosure
const MobileCollapsibleSection: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
}> = ({ title, icon, children, defaultOpen = false, badge }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="md:hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0f1629]/80 border border-white/5 active:bg-white/5"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-sm font-medium text-white">{title}</span>
          {badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-indigo-500/20 text-indigo-400">
              {badge}
            </span>
          )}
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Mobile KPI Carousel - Horizontal scrollable cards
const MobileKPICarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.75;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, kpiData.length - 1));
    }
  };

  return (
    <div className="md:hidden mb-4">
      {/* Scrollable KPI Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {kpiData.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-[75%] snap-start"
          >
            <div className="relative p-4 rounded-xl bg-[#0f1629]/80 border border-white/5 overflow-hidden">
              <div
                className="absolute bottom-0 left-0 h-1.5 transition-all"
                style={{
                  width: `${Math.min(kpi.progress, 100)}%`,
                  background: `linear-gradient(90deg, ${
                    kpi.progress >= 100 ? '#10b981' : kpi.progress >= 80 ? '#f59e0b' : '#ef4444'
                  }40, ${kpi.progress >= 100 ? '#10b981' : kpi.progress >= 80 ? '#f59e0b' : '#ef4444'})`
                }}
              />
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{kpi.label}</span>
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  kpi.trend === 'up' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                }`}>
                  {kpi.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {kpi.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-white tracking-tight mb-2">{kpi.value}</div>
              <div className="flex items-center justify-between">
                <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden mr-3">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: kpi.progress >= 100 ? '#10b981' : kpi.progress >= 80 ? '#f59e0b' : '#ef4444' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(kpi.progress, 100)}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                  />
                </div>
                <span className="text-xs text-gray-400 font-medium">{kpi.progress}% hedefe</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 mt-1">
        {kpiData.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? 'w-6 bg-indigo-500' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Mobile Quick Stats Bar - Compact KPI summary
const MobileQuickStats: React.FC = () => (
  <div className="md:hidden mb-4 p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border border-indigo-500/20">
    <div className="flex items-center justify-between">
      <div className="text-center flex-1">
        <div className="text-lg font-bold text-white">₺6.4M</div>
        <div className="text-[10px] text-gray-400">Gelir</div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center flex-1">
        <div className="text-lg font-bold text-emerald-400">+12.5%</div>
        <div className="text-[10px] text-gray-400">Büyüme</div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center flex-1">
        <div className="text-lg font-bold text-white">2,847</div>
        <div className="text-[10px] text-gray-400">Müşteri</div>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center flex-1">
        <div className="text-lg font-bold text-amber-400">2</div>
        <div className="text-[10px] text-gray-400">Uyarı</div>
      </div>
    </div>
  </div>
);

const MoMChangesTable: React.FC = () => (
  <GlowCard className="p-3 sm:p-5">
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
          <TrendingUp size={16} className="sm:w-[18px] sm:h-[18px] text-purple-400" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-white">Aylık Karşılaştırma</h3>
          <p className="text-[10px] sm:text-xs text-gray-500">Ocak vs Aralık</p>
        </div>
      </div>
    </div>
    <div className="space-y-1.5 sm:space-y-2">
      {momData.map((item, i) => (
        <motion.div
          key={item.metric}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-colors"
        >
          <span className="text-[11px] sm:text-sm text-gray-300 truncate flex-1 min-w-0">{item.metric}</span>
          <div className="flex items-center gap-1.5 sm:gap-4 ml-2 flex-shrink-0">
            <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline">{item.previous}</span>
            <ArrowRight size={10} className="sm:w-3 sm:h-3 text-gray-600 hidden sm:block" />
            <span className="text-[11px] sm:text-sm font-semibold text-white">{item.current}</span>
            <span className={`text-[10px] sm:text-xs font-medium flex items-center gap-0.5 ${
              item.trend === 'up' ? (item.metric === 'İade Oranı' ? 'text-emerald-400' : 'text-emerald-400') :
              (item.metric === 'İade Oranı' ? 'text-emerald-400' : 'text-red-400')
            }`}>
              {item.change >= 0 ? '+' : ''}{item.change}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </GlowCard>
);

const AlertSystemFlow: React.FC = () => {
  const severityLevels = [
    { id: 'critical', label: 'Kritik', color: '#ef4444', count: 2, targets: ['Yönetim', 'Finans'] },
    { id: 'warning', label: 'Uyarı', color: '#f59e0b', count: 5, targets: ['Departman', 'Pazarlama'] },
    { id: 'info', label: 'Bilgi', color: '#06b6d4', count: 12, targets: ['Operasyon'] },
  ];

  return (
    <GlowCard className="p-3 sm:p-5 h-full" glowColor="rgba(245, 158, 11, 0.1)">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={16} className="sm:w-[18px] sm:h-[18px] text-amber-400" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-white">Alert Sistemi Akışı</h3>
          <p className="text-[10px] sm:text-xs text-gray-500">Anomali tespit ve yönlendirme</p>
        </div>
      </div>

      {/* Flow Visualization */}
      <div className="space-y-2 sm:space-y-3">
        {/* Top: Data Input & ML - scrollable on mobile */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-3 overflow-x-auto pb-1 -mx-1 px-1">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex-shrink-0">
            <Database size={12} className="sm:w-[14px] sm:h-[14px] text-indigo-400" />
            <span className="text-[10px] sm:text-xs text-gray-300 whitespace-nowrap">Veri</span>
          </motion.div>
          <ChevronRight size={12} className="sm:w-[14px] sm:h-[14px] text-gray-600 flex-shrink-0" />
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-purple-500/10 border border-purple-500/30 flex-shrink-0">
            <Cpu size={12} className="sm:w-[14px] sm:h-[14px] text-purple-400" />
            <span className="text-[10px] sm:text-xs text-gray-300 whitespace-nowrap">ML</span>
          </motion.div>
          <ChevronRight size={12} className="sm:w-[14px] sm:h-[14px] text-gray-600 flex-shrink-0" />
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-amber-500/10 border border-amber-500/30 flex-shrink-0">
            <AlertTriangle size={12} className="sm:w-[14px] sm:h-[14px] text-amber-400" />
            <span className="text-[10px] sm:text-xs text-gray-300 whitespace-nowrap">Anomali</span>
          </motion.div>
        </div>

        {/* Severity Branch Lines */}
        <div className="flex justify-center">
          <div className="w-[2px] h-3 sm:h-4 bg-gradient-to-b from-amber-500/50 to-transparent" />
        </div>

        {/* Severity Routing */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {severityLevels.map((level, i) => (
            <motion.div key={level.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="p-2 sm:p-3 rounded-lg border text-center"
              style={{ backgroundColor: `${level.color}10`, borderColor: `${level.color}40` }}
            >
              <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-0.5 sm:mb-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full" style={{ backgroundColor: level.color }} />
                <span className="text-[10px] sm:text-xs font-medium" style={{ color: level.color }}>{level.label}</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white mb-0.5 sm:mb-1">{level.count}</div>
              <div className="flex flex-wrap gap-0.5 sm:gap-1 justify-center">
                {level.targets.slice(0, 1).map((target) => (
                  <span key={target} className="text-[8px] sm:text-[9px] px-1 sm:px-1.5 py-0.5 rounded bg-white/5 text-gray-400">
                    {target}
                  </span>
                ))}
                {level.targets.length > 1 && (
                  <span className="text-[8px] sm:text-[9px] text-gray-500 hidden sm:inline">+{level.targets.length - 1}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </GlowCard>
  );
};

const FeedbackLoop: React.FC = () => (
  <GlowCard className="p-3 sm:p-5" glowColor="rgba(16, 185, 129, 0.1)">
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
          <RefreshCw size={16} className="sm:w-[18px] sm:h-[18px] text-emerald-400" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-white">Geri Bildirim Döngüsü</h3>
          <p className="text-[10px] sm:text-xs text-gray-500">Model iyileştirme</p>
        </div>
      </div>
    </div>

    {/* Circular Flow Diagram */}
    <div className="flex items-center justify-center mb-3 sm:mb-4">
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <motion.circle
            cx="50" cy="10" r="4" fill="#10b981"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '50px 50px' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-base sm:text-lg font-bold text-emerald-400">+1.8%</span>
            <p className="text-[8px] sm:text-[9px] text-gray-500">Model Doğruluğu</p>
          </div>
        </div>
        {/* Labels - hidden on very small screens */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 sm:-translate-y-2 text-[7px] sm:text-[8px] text-gray-400 hidden xs:block">Öneri</span>
        <span className="absolute right-0 top-1/2 translate-x-1 sm:translate-x-2 -translate-y-1/2 text-[7px] sm:text-[8px] text-gray-400 hidden xs:block">Karar</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 sm:translate-y-2 text-[7px] sm:text-[8px] text-gray-400 hidden xs:block">Sonuç</span>
        <span className="absolute left-0 top-1/2 -translate-x-3 sm:-translate-x-4 -translate-y-1/2 text-[7px] sm:text-[8px] text-gray-400 hidden xs:block">İyileştirme</span>
      </div>
    </div>

    {/* Recent Feedback */}
    <div className="space-y-1.5 sm:space-y-2">
      {feedbackData.slice(0, 2).map((item) => (
        <div key={item.id} className="p-1.5 sm:p-2 rounded-lg bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between mb-0.5 sm:mb-1">
            <span className="text-[10px] sm:text-xs text-gray-300 truncate flex-1">{item.recommendation}</span>
            {item.decision === 'accepted' && <CheckCircle size={10} className="sm:w-3 sm:h-3 text-emerald-400 ml-1 sm:ml-2" />}
            {item.decision === 'rejected' && <XCircle size={10} className="sm:w-3 sm:h-3 text-red-400 ml-1 sm:ml-2" />}
            {item.decision === 'modified' && <MinusCircle size={10} className="sm:w-3 sm:h-3 text-amber-400 ml-1 sm:ml-2" />}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className={`text-[9px] sm:text-[10px] ${item.outcome === 'positive' ? 'text-emerald-400' : item.outcome === 'negative' ? 'text-red-400' : 'text-gray-400'}`}>
              {item.impact}
            </span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 hidden sm:inline">• Model: {item.improvement}</span>
          </div>
        </div>
      ))}
    </div>
  </GlowCard>
);

const DataSourcesPanel: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlowCard className="p-3 sm:p-5" glowColor="rgba(6, 182, 212, 0.1)">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
            <Database size={16} className="sm:w-[18px] sm:h-[18px] text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-semibold text-white">Veri Kaynakları</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Gerçek zamanlı bağlantı</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] sm:text-xs text-cyan-400 font-mono">7.9M</span>
          <button onClick={() => setExpanded(!expanded)} className="p-1 sm:p-1.5 rounded-lg hover:bg-white/5 transition-colors">
            <motion.div animate={{ rotate: expanded ? 90 : 0 }}>
              <ChevronRight size={14} className="sm:w-4 sm:h-4 text-gray-500" />
            </motion.div>
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <DataFlowLine delay={0} />
          <DataFlowLine delay={1.5} />
        </div>
        <div className="space-y-1.5 sm:space-y-2">
          {dataSources.slice(0, expanded ? dataSources.length : 3).map((source, i) => (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-colors"
            >
              <LivePulse color="#06b6d4" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[11px] sm:text-sm text-white truncate">{source.name}</span>
                  <span className="text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-medium">{source.latency}</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-gray-500">{source.lastSync}</span>
              </div>
              <span className="text-[10px] sm:text-xs text-gray-400 font-mono">{source.records}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <RefreshCw size={10} className="sm:w-3 sm:h-3 text-gray-500" />
          <span className="text-[9px] sm:text-[10px] text-gray-500">Son güncelleme: 1 sn önce</span>
        </div>
        <button className="text-[10px] sm:text-xs text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
          Tümünü Gör <ExternalLink size={8} className="sm:w-[10px] sm:h-[10px]" />
        </button>
      </div>
    </GlowCard>
  );
};

const AIInsightsPanel: React.FC<{ onActionClick: (insight: any) => void }> = ({ onActionClick }) => {
  const severityStyles = {
    critical: { bg: 'bg-red-500/10', border: 'border-red-500/30', color: 'text-red-400', icon: AlertTriangle },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', color: 'text-amber-400', icon: Clock },
    info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', color: 'text-cyan-400', icon: Zap },
  };

  const typeIcons = { anomaly: Eye, prediction: Target, opportunity: TrendingUp };

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
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-gray-400">{insight.confidence}% güven</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{insight.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">{insight.timestamp}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400">{insight.department}</span>
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

const RevenueChart: React.FC = () => (
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
            <div className={`w-4 h-1 rounded ${item.dashed ? 'opacity-60' : ''}`}
              style={{ background: item.color, ...(item.dashed && { backgroundImage: `repeating-linear-gradient(90deg, ${item.color}, ${item.color} 4px, transparent 4px, transparent 8px)` }) }}
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
          contentStyle={{ backgroundColor: '#151d30', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          labelStyle={{ color: '#f8fafc', fontWeight: 600, marginBottom: 8 }}
          formatter={(value: any, name: string) => [value ? `₺${value.toLocaleString()}K` : '-', name === 'actual' ? 'Gerçekleşen' : name === 'predicted' ? 'AI Tahmini' : 'Hedef']}
        />
        <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={2.5} fill="url(#revenueGradient)" dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }} />
        <Area type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={2.5} strokeDasharray="6 4" fill="url(#predictionGradient)" dot={{ fill: '#a855f7', r: 4, strokeWidth: 0 }} />
        <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" fill="none" dot={false} opacity={0.5} />
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
            <motion.div key={region.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white">{region.name}</span>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${region.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {region.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {region.change >= 0 ? '+' : ''}{region.change}%
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">₺{(region.value / 1000).toFixed(1)}M</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: region.fill }}
                  initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
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
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border-l-2 ${
                item.type === 'warning' ? 'border-amber-500' : item.type === 'ai' ? 'border-indigo-500' : item.type === 'success' ? 'border-emerald-500' : 'border-cyan-500'
              }`}
            >
              <span className="text-[10px] font-mono text-gray-500 w-16">{item.time}</span>
              <span className="text-xs text-white flex-1 truncate">{item.event}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${style.bg} ${style.color}`}>{item.source}</span>
              <span className="text-xs text-gray-400">{item.value}</span>
            </motion.div>
          );
        })}
      </div>
    </GlowCard>
  );
};

// ============================================================================
// PAGE 2 COMPONENTS - MODEL INTERACTION
// ============================================================================

const LLMChatInterface: React.FC = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Merhaba! 5 veri kaynağından 7.9 milyon kayda erişimim var. Size nasıl yardımcı olabilirim?\n\nÖrnek sorular:\n• "Geçen aya göre en çok düşen ürünler?"\n• "Stok durumu kritik ürünleri listele"\n• "Önümüzdeki ay satış tahmini"' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const query = input;
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      if (query.toLowerCase().includes('düş') || query.toLowerCase().includes('geril')) {
        response = `📉 **Satış Düşüşü Analizi**\n\n**Son 30 Günde En Çok Gerileyen:**\n1. Basic Widget E: **-8.5%** (Rakip fiyat indirimi)\n2. Deluxe Widget D: **-3.2%** (Mevsimsel)\n3. Standard Widget B: **-1.2%** (Tedarik gecikmesi)\n\n💡 **Öneri:** Basic Widget E için değer odaklı kampanya önerilir.\n\n*%94 güven | 847K kayıt analiz edildi*`;
      } else if (query.toLowerCase().includes('stok')) {
        response = `📦 **Stok Durumu Raporu**\n\n🔴 **Kritik:**\n• Premium Widget A: 52 adet (4 gün kaldı)\n\n🟢 **Normal:**\n• Standard Widget B: 324 adet (42 gün)\n• Economy Widget C: 890 adet (28 gün)\n\n💡 **Öneri:** Premium Widget A için 250 adet acil sipariş\n\n*%98 güven | Gerçek zamanlı veri*`;
      } else if (query.toLowerCase().includes('tahmin') || query.toLowerCase().includes('forecast')) {
        response = `📊 **Satış Tahmini - Önümüzdeki 3 Ay**\n\n• Şubat: ₺21.2M (+7.1%)\n• Mart: ₺23.5M (+10.8%)\n• Nisan: ₺22.1M (-5.9%)\n\n📈 **En Yüksek Büyüme:** Kozmetik kategorisi (+22%)\n📉 **Risk:** Spor kategorisi (-8%)\n\n*%91 güven | ML Model v2.4.1*`;
      } else {
        response = `Sorgunuz analiz edildi. 5 veri kaynağından bilgi toplandı.\n\n**Özet:**\n• 2.4M kayıt tarandı\n• 847 ilgili veri noktası bulundu\n\nDaha spesifik sonuçlar için tarih, bölge veya ürün belirtin.`;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedQueries = [
    'Geçen aya göre en çok düşen ürünler?',
    'Stok durumu kritik ürünleri listele',
    'Önümüzdeki ay satış tahmini',
    'Bölgesel performans karşılaştırması'
  ];

  return (
    <GlowCard className="h-full flex flex-col">
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
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
              msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white/5 text-gray-200 rounded-bl-sm border border-white/10'
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
                    <motion.div key={i} className="w-2 h-2 rounded-full bg-indigo-400"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
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

      {/* Suggested Queries - scrollable on mobile */}
      <div className="px-3 sm:px-4 py-2 border-t border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
          {suggestedQueries.map((query, i) => (
            <button key={i} onClick={() => setInput(query)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs text-gray-400 hover:text-white hover:border-indigo-500/30 transition-colors whitespace-nowrap flex-shrink-0 sm:flex-shrink sm:whitespace-normal"
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 sm:p-4 border-t border-white/10 bg-[#0f1629]/90">
        <div className="flex gap-2 sm:gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Soru sorun..."
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm outline-none focus:border-indigo-500/50 transition-colors"
          />
          <button onClick={handleSend} disabled={isTyping}
            className="px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl text-white font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </GlowCard>
  );
};

const MLQueryBuilder: React.FC = () => {
  const [queryType, setQueryType] = useState('prediction');
  const [selectedDepts, setSelectedDepts] = useState<string[]>(['Satış']);
  const departments = ['Satış', 'Pazarlama', 'Finans', 'Operasyon', 'İK', 'IT'];
  const queryTypes = [
    { id: 'prediction', label: 'Tahmin', icon: Target, desc: 'Gelecek değerleri tahmin et' },
    { id: 'anomaly', label: 'Anomali', icon: AlertTriangle, desc: 'Anormal değerleri tespit et' },
    { id: 'clustering', label: 'Kümeleme', icon: Users, desc: 'Benzer grupları bul' },
    { id: 'classification', label: 'Sınıflandırma', icon: Layers, desc: 'Kategorilere ayır' },
  ];

  return (
    <GlowCard className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
          <Cpu size={18} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">ML Sorgu Oluşturucu</h3>
          <p className="text-xs text-gray-500">Model üzerinde özel sorgular çalıştırın</p>
        </div>
      </div>

      {/* Query Type Selection */}
      <div className="mb-4">
        <label className="text-xs text-gray-500 mb-2 block">Sorgu Tipi</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {queryTypes.map((type) => (
            <button key={type.id} onClick={() => setQueryType(type.id)}
              className={`p-2 sm:p-3 rounded-lg border text-left transition-all ${
                queryType === type.id ? 'bg-purple-500/20 border-purple-500/50' : 'bg-white/[0.02] border-white/10 hover:border-purple-500/30'
              }`}
            >
              <type.icon size={14} className={`sm:w-4 sm:h-4 ${queryType === type.id ? 'text-purple-400 mb-1' : 'text-gray-500 mb-1'}`} />
              <div className="text-[11px] sm:text-xs font-medium text-white">{type.label}</div>
              <div className="text-[9px] sm:text-[10px] text-gray-500 hidden sm:block">{type.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Department Selection */}
      <div className="mb-4">
        <label className="text-xs text-gray-500 mb-2 block">Departmanlar</label>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button key={dept}
              onClick={() => setSelectedDepts(prev => prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept])}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDepts.includes(dept) ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-indigo-500/30'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Execute Button */}
      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
        <Play size={16} />
        Sorguyu Çalıştır
      </button>
    </GlowCard>
  );
};

const DataExplorer: React.FC = () => {
  const [expandedSource, setExpandedSource] = useState<string | null>('erp');

  return (
    <GlowCard className="p-5 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
          <Database size={18} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Veri Gezgini</h3>
          <p className="text-xs text-gray-500">Kaynak ve tabloları inceleyin</p>
        </div>
      </div>

      <div className="space-y-2">
        {dataSources.map((source) => (
          <div key={source.id}>
            <button onClick={() => setExpandedSource(expandedSource === source.id ? null : source.id)}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-colors"
            >
              <Folder size={16} className="text-cyan-400" />
              <span className="text-sm text-white flex-1 text-left">{source.name}</span>
              <span className="text-xs text-gray-500">{source.records}</span>
              <ChevronDown size={14} className={`text-gray-500 transition-transform ${expandedSource === source.id ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {expandedSource === source.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pl-6 py-2 space-y-1">
                    {source.tables.map((table) => (
                      <div key={table} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                        <Table size={12} className="text-gray-500" />
                        <span className="text-xs text-gray-400">{table}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </GlowCard>
  );
};

const AIWorkingFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlowCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center">
            <Network size={18} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Çalışma Akışı</h3>
            <p className="text-xs text-gray-500">Akıllı karar ağacı sistemi</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LivePulse color="#6366f1" />
          <span className="text-xs text-indigo-400">Aktif</span>
        </div>
      </div>

      {/* Decision Tree Flow */}
      <div className="relative">
        {/* Main Flow Row */}
        <div className="flex items-center justify-between gap-2">
          {/* Step 1: Executive Input */}
          <motion.div animate={{ scale: activeStep === 0 ? 1.05 : 1, opacity: activeStep === 0 ? 1 : 0.7 }}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${activeStep === 0 ? 'bg-indigo-500/20 border border-indigo-500/50' : 'bg-white/5 border border-white/10'}`}
          >
            <Users size={18} className={activeStep === 0 ? 'text-indigo-400 mb-1' : 'text-gray-500 mb-1'} />
            <span className="text-[10px] text-center text-gray-400">Yönetici<br/>Sorusu</span>
          </motion.div>

          <ChevronRight size={14} className="text-gray-600 flex-shrink-0" />

          {/* Step 2: LLM Processing */}
          <motion.div animate={{ scale: activeStep === 1 ? 1.05 : 1, opacity: activeStep === 1 ? 1 : 0.7 }}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${activeStep === 1 ? 'bg-purple-500/20 border border-purple-500/50' : 'bg-white/5 border border-white/10'}`}
          >
            <Brain size={18} className={activeStep === 1 ? 'text-purple-400 mb-1' : 'text-gray-500 mb-1'} />
            <span className="text-[10px] text-center text-gray-400">LLM<br/>Analiz</span>
          </motion.div>

          <ChevronRight size={14} className="text-gray-600 flex-shrink-0" />

          {/* Step 3: Decision - Need Data? */}
          <motion.div animate={{ scale: activeStep === 2 ? 1.05 : 1, opacity: activeStep === 2 ? 1 : 0.7 }}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${activeStep === 2 ? 'bg-amber-500/20 border border-amber-500/50' : 'bg-white/5 border border-white/10'}`}
          >
            <div className="w-5 h-5 rotate-45 border-2 mb-1 flex items-center justify-center"
              style={{ borderColor: activeStep === 2 ? '#f59e0b' : '#6b7280' }}>
              <span className="text-[8px] -rotate-45" style={{ color: activeStep === 2 ? '#f59e0b' : '#9ca3af' }}>?</span>
            </div>
            <span className="text-[10px] text-center text-gray-400">Veri<br/>Gerekli?</span>
          </motion.div>

          <ChevronRight size={14} className="text-gray-600 flex-shrink-0" />

          {/* Step 4: SQL Query */}
          <motion.div animate={{ scale: activeStep === 3 ? 1.05 : 1, opacity: activeStep === 3 ? 1 : 0.7 }}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${activeStep === 3 ? 'bg-cyan-500/20 border border-cyan-500/50' : 'bg-white/5 border border-white/10'}`}
          >
            <Database size={18} className={activeStep === 3 ? 'text-cyan-400 mb-1' : 'text-gray-500 mb-1'} />
            <span className="text-[10px] text-center text-gray-400">SQL<br/>Sorgu</span>
          </motion.div>

          <ChevronRight size={14} className="text-gray-600 flex-shrink-0" />

          {/* Step 5: Augmented Response */}
          <motion.div animate={{ scale: activeStep === 4 ? 1.05 : 1, opacity: activeStep === 4 ? 1 : 0.7 }}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${activeStep === 4 ? 'bg-purple-500/20 border border-purple-500/50' : 'bg-white/5 border border-white/10'}`}
          >
            <Sparkles size={18} className={activeStep === 4 ? 'text-purple-400 mb-1' : 'text-gray-500 mb-1'} />
            <span className="text-[10px] text-center text-gray-400">Zengin<br/>Yanıt</span>
          </motion.div>

          <ChevronRight size={14} className="text-gray-600 flex-shrink-0" />

          {/* Step 6: Output */}
          <motion.div animate={{ scale: activeStep === 5 ? 1.05 : 1, opacity: activeStep === 5 ? 1 : 0.7 }}
            className={`flex flex-col items-center p-3 rounded-xl transition-all ${activeStep === 5 ? 'bg-emerald-500/20 border border-emerald-500/50' : 'bg-white/5 border border-white/10'}`}
          >
            <FileText size={18} className={activeStep === 5 ? 'text-emerald-400 mb-1' : 'text-gray-500 mb-1'} />
            <span className="text-[10px] text-center text-gray-400">Sonuç<br/>Çıktı</span>
          </motion.div>
        </div>

        {/* Progress Line */}
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
            animate={{ width: `${((activeStep + 1) / 6) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Current Status */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-gray-500">Son sorgu: "Bölgesel satış analizi"</span>
          <span className="text-emerald-400">✓ 847ms</span>
        </div>
      </div>
    </GlowCard>
  );
};

// ============================================================================
// PAGE 3 COMPONENTS - EXECUTIVE GRAPHICS
// ============================================================================

const Heatmap: React.FC = () => {
  const xLabels = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  const yLabels = ['Marmara', 'Ege', 'Akdeniz', 'İç Anadolu', 'Karadeniz'];

  const getColor = (value: number): string => {
    const intensity = value / 100;
    return `rgba(99, 102, 241, ${0.15 + intensity * 0.85})`;
  };

  // Calculate insights
  const maxCell = heatmapData.reduce((a, b) => a.value > b.value ? a : b);
  const minCell = heatmapData.reduce((a, b) => a.value < b.value ? a : b);

  return (
    <GlowCard className="p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
            <BarChart2 size={18} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Satış Yoğunluk Haritası</h3>
            <p className="text-xs text-gray-500 hidden sm:block">Bölge × Gün analizi • Nerede ve ne zaman satış yapılıyor?</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Düşük</span>
          <div className="flex">
            {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
              <div key={i} className="w-3 sm:w-4 h-2 sm:h-3" style={{ backgroundColor: `rgba(99, 102, 241, ${opacity})` }} />
            ))}
          </div>
          <span className="text-[10px] text-gray-500">Yüksek</span>
        </div>
      </div>

      {/* Responsive Heatmap Grid */}
      <div className="mb-4">
        {/* X-axis labels */}
        <div className="flex mb-1 pl-16 sm:pl-20 md:pl-24">
          {xLabels.map((label) => (
            <div key={label} className="flex-1 text-center text-[10px] sm:text-xs text-gray-400">
              {label}
            </div>
          ))}
        </div>
        {/* Heatmap rows */}
        <div className="space-y-1">
          {yLabels.map((yLabel) => (
            <div key={yLabel} className="flex items-center gap-1">
              <div className="w-16 sm:w-20 md:w-24 text-[10px] sm:text-xs text-gray-400 text-right pr-2 flex-shrink-0 truncate">
                {yLabel}
              </div>
              <div className="flex-1 flex gap-0.5 sm:gap-1">
                {xLabels.map((xLabel) => {
                  const cell = heatmapData.find(c => c.x === xLabel && c.y === yLabel);
                  const value = cell?.value || 0;
                  const isMax = xLabel === maxCell.x && yLabel === maxCell.y;
                  const isMin = xLabel === minCell.x && yLabel === minCell.y;
                  return (
                    <motion.div
                      key={`${xLabel}-${yLabel}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: yLabels.indexOf(yLabel) * 0.05 + xLabels.indexOf(xLabel) * 0.02 }}
                      className={`flex-1 aspect-[1.4] sm:aspect-[1.3] rounded sm:rounded-md flex items-center justify-center text-[9px] sm:text-[10px] md:text-xs font-medium transition-all hover:scale-105 cursor-default ${
                        isMax ? 'ring-2 ring-emerald-500' : isMin ? 'ring-2 ring-red-500' : ''
                      }`}
                      style={{ backgroundColor: getColor(value) }}
                      title={`${yLabel} - ${xLabel}: ${value}`}
                    >
                      <span className={value > 50 ? 'text-white' : 'text-gray-400'}>
                        {value}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-emerald-500/10">
          <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="text-[9px] sm:text-[10px] text-emerald-400">En yüksek: {maxCell.y} - {maxCell.x} ({maxCell.value})</span>
        </div>
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-red-500/10">
          <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
          <span className="text-[9px] sm:text-[10px] text-red-400">En düşük: {minCell.y} - {minCell.x} ({minCell.value})</span>
        </div>
      </div>
    </GlowCard>
  );
};

const FunnelChart: React.FC = () => {
  // Calculate biggest drop-off
  const dropOffs = funnelData.slice(1).map((item, i) => ({
    from: funnelData[i].stage,
    to: item.stage,
    rate: ((funnelData[i].value - item.value) / funnelData[i].value * 100).toFixed(1),
    lost: funnelData[i].value - item.value
  }));
  const biggestDropOff = dropOffs.reduce((a, b) => parseFloat(a.rate) > parseFloat(b.rate) ? a : b);
  const totalLost = funnelData[0].value - funnelData[funnelData.length - 1].value;

  return (
    <GlowCard className="p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
            <Filter size={18} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Satış Hunisi</h3>
            <p className="text-xs text-gray-500 hidden sm:block">Müşteri yolculuğu dönüşüm analizi</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-lg font-bold text-emerald-400">{funnelData[funnelData.length - 1].percentage}%</span>
            <span className="text-[10px] text-gray-500 block">Dönüşüm</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-red-400">{totalLost.toLocaleString()}</span>
            <span className="text-[10px] text-gray-500 block">Kayıp</span>
          </div>
        </div>
      </div>

      {/* Visual Funnel with trapezoid shapes */}
      <div className="relative mb-4">
        {funnelData.map((item, index) => {
          const widthPercent = 30 + (item.percentage * 0.7); // Scale from 30% to 100%
          const conversionRate = index > 0 ? ((item.value / funnelData[index - 1].value) * 100).toFixed(0) : null;
          const isWorstDropOff = index > 0 && funnelData[index - 1].stage === biggestDropOff.from;
          const isLast = index === funnelData.length - 1;

          return (
            <motion.div
              key={item.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Funnel segment */}
              <div className="flex items-center gap-3">
                {/* Left side info */}
                <div className="w-20 sm:w-24 text-right flex-shrink-0">
                  <div className="text-[10px] sm:text-xs font-medium text-white truncate">{item.stage}</div>
                  <div className="text-[9px] text-gray-500">{item.value.toLocaleString()}</div>
                </div>

                {/* Funnel bar */}
                <div className="flex-1 relative">
                  <div
                    className={`h-8 sm:h-10 rounded-md relative overflow-hidden transition-all ${isWorstDropOff ? 'ring-2 ring-amber-500/50' : ''}`}
                    style={{
                      width: `${widthPercent}%`,
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2" />
                    {/* Percentage inside bar */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-white drop-shadow-lg">{item.percentage}%</span>
                    </div>
                  </div>

                  {/* Conversion arrow between bars */}
                  {conversionRate && (
                    <div className={`absolute -top-4 left-1/4 flex items-center gap-1 ${isWorstDropOff ? 'text-amber-400' : 'text-gray-500'}`}>
                      <ChevronDown size={12} />
                      <span className="text-[9px] sm:text-[10px] font-medium">{conversionRate}%</span>
                      {isWorstDropOff && <AlertTriangle size={10} className="text-amber-400" />}
                    </div>
                  )}
                </div>

                {/* Right side - conversion indicator */}
                <div className="w-12 sm:w-16 flex-shrink-0">
                  {isLast ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle size={14} className="text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-medium">Satış</span>
                    </div>
                  ) : (
                    <div className="text-[9px] text-gray-600">
                      -{((funnelData[index].value - funnelData[index + 1].value) / 1000).toFixed(1)}K
                    </div>
                  )}
                </div>
              </div>

              {/* Spacer between bars */}
              {!isLast && <div className="h-3 sm:h-4" />}
            </motion.div>
          );
        })}
      </div>

      {/* Insights */}
      <div className="pt-3 border-t border-white/5">
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-500">
          <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs font-medium text-amber-400">Kritik kayıp noktası: </span>
            <span className="text-[10px] sm:text-xs text-gray-300">{biggestDropOff.from} → {biggestDropOff.to}</span>
            <span className="text-[10px] sm:text-xs text-gray-500 ml-1">(%{biggestDropOff.rate} kayıp)</span>
          </div>
        </div>
      </div>
    </GlowCard>
  );
};

const TrendLineChart: React.FC = () => {
  // Calculate growth trends
  const firstSales = trendData[0].sales;
  const lastSales = trendData[trendData.length - 1].sales;
  const salesGrowth = ((lastSales - firstSales) / firstSales * 100).toFixed(1);
  const firstCustomers = trendData[0].customers;
  const lastCustomers = trendData[trendData.length - 1].customers;
  const customerGrowth = ((lastCustomers - firstCustomers) / firstCustomers * 100).toFixed(1);

  return (
    <GlowCard className="p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
            <LineChartIcon size={18} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Trend Analizi</h3>
            <p className="text-xs text-gray-500 hidden sm:block">12 günlük performans • Büyüme yönü nereye?</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {[{ label: 'Satış', color: '#06b6d4' }, { label: 'Sipariş', color: '#8b5cf6' }, { label: 'Müşteri', color: '#10b981' }].map((item) => (
            <div key={item.label} className="flex items-center gap-1">
              <div className="w-2 sm:w-3 h-2 sm:h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[9px] sm:text-[10px] text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160} className="sm:!h-[180px]">
        <LineChart data={trendData} margin={{ left: -10, right: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="date" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} interval="preserveStartEnd" />
          <YAxis yAxisId="left" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} width={35} />
          <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} width={25} hide />
          <Tooltip
            contentStyle={{ backgroundColor: '#151d30', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 12, fontSize: 11 }}
            labelStyle={{ color: '#f8fafc', fontWeight: 600 }}
          />
          <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      {/* Insights */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-cyan-500/10">
          <TrendingUp size={12} className="text-cyan-400" />
          <span className="text-[9px] sm:text-[10px] text-cyan-400">Satış: +{salesGrowth}%</span>
        </div>
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-emerald-500/10">
          <Users size={12} className="text-emerald-400" />
          <span className="text-[9px] sm:text-[10px] text-emerald-400">Müşteri: +{customerGrowth}%</span>
        </div>
        <span className="text-[9px] sm:text-[10px] text-gray-500 self-center ml-auto">1-12 Ocak</span>
      </div>
    </GlowCard>
  );
};

const CategoryBarChart: React.FC = () => {
  // Calculate insights
  const topCategory = categoryData.reduce((a, b) => a.revenue > b.revenue ? a : b);
  const fastestGrowing = categoryData.reduce((a, b) => a.growth > b.growth ? a : b);
  const declining = categoryData.filter(c => c.growth < 0);
  const totalRevenue = categoryData.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <GlowCard className="p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
            <BarChart3 size={18} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Kategori Performansı</h3>
            <p className="text-xs text-gray-500 hidden sm:block">Gelir karşılaştırması • Hangi kategori lider?</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-0 sm:flex-col sm:text-right">
          <span className="text-lg font-bold text-white">₺{(totalRevenue / 1000).toFixed(1)}K</span>
          <span className="text-xs text-gray-500">Toplam Gelir</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160} className="sm:!h-[175px]">
        <BarChart data={categoryData} layout="vertical" margin={{ left: -5, right: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
          <XAxis type="number" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `₺${v/1000}K`} />
          <YAxis type="category" dataKey="category" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} width={55} />
          <Tooltip
            contentStyle={{ backgroundColor: '#151d30', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 12, fontSize: 11 }}
            formatter={(value: any, _name: any, props: any) => [`₺${value.toLocaleString()} (${props.payload.growth >= 0 ? '+' : ''}${props.payload.growth}%)`, 'Gelir']}
          />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
            {categoryData.map((entry, index) => (
              <Cell key={index} fill={entry.growth >= 0 ? '#6366f1' : '#ef4444'} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Insights */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-indigo-500/10">
          <Target size={12} className="text-indigo-400 flex-shrink-0" />
          <span className="text-[9px] sm:text-[10px] text-indigo-400">Lider: {topCategory.category}</span>
        </div>
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-emerald-500/10">
          <TrendingUp size={12} className="text-emerald-400 flex-shrink-0" />
          <span className="text-[9px] sm:text-[10px] text-emerald-400">{fastestGrowing.category} +{fastestGrowing.growth}%</span>
        </div>
        {declining.length > 0 && (
          <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-red-500/10">
            <TrendingDown size={12} className="text-red-400 flex-shrink-0" />
            <span className="text-[9px] sm:text-[10px] text-red-400 truncate">{declining.map(c => c.category).join(', ')}</span>
          </div>
        )}
      </div>
    </GlowCard>
  );
};

// ============================================================================
// MODALS
// ============================================================================

const AIChatModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Merhaba! Size nasıl yardımcı olabilirim?' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorgunuz işleniyor. Lütfen bekleyin...' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-4 right-4 w-[400px] h-[500px] z-50 rounded-2xl overflow-hidden flex flex-col"
            style={{ background: 'linear-gradient(135deg, #0f1629 0%, #1a1f35 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain size={20} className="text-indigo-400" />
                <span className="text-sm font-semibold text-white">Cognia AI</span>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10"><X size={16} className="text-gray-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-gray-200'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-xs text-gray-500">Yazıyor...</div>}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none"
                  placeholder="Mesajınız..."
                />
                <button onClick={handleSend} className="px-4 py-2 bg-indigo-600 rounded-lg text-white"><Send size={16} /></button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ActionModal: React.FC<{ insight: any; onClose: () => void }> = ({ insight, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'complete'>('idle');

  const handleAction = () => {
    setStatus('processing');
    setTimeout(() => { setStatus('complete'); setTimeout(onClose, 1500); }, 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}
    >
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, #0f1629 0%, #1a1f35 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Zap size={20} className="text-indigo-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">{insight?.action}</h3>
            <p className="text-xs text-gray-500">{insight?.title}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
          <p className="text-sm text-gray-300 mb-2">{insight?.detail}</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>Etki: <span className="text-white">{insight?.impact}</span></span>
            <span>Güven: <span className="text-indigo-400">{insight?.confidence}%</span></span>
          </div>
        </div>
        {status === 'idle' && (
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 text-sm">İptal</button>
            <button onClick={handleAction} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold">Onayla</button>
          </div>
        )}
        {status === 'processing' && <div className="py-3 text-center text-sm text-gray-300"><RefreshCw size={18} className="inline animate-spin mr-2" />İşleniyor...</div>}
        {status === 'complete' && <div className="py-3 text-center text-emerald-400"><CheckCircle2 size={18} className="inline mr-2" />Tamamlandı!</div>}
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// PAGE COMPONENTS
// ============================================================================

const ExecutiveDashboardPage: React.FC<{ onActionClick: (insight: any) => void; currentTime: Date }> = ({ onActionClick, currentTime }) => {
  const greeting = currentTime.getHours() < 12 ? 'Günaydın' : currentTime.getHours() < 18 ? 'İyi günler' : 'İyi akşamlar';

  return (
    <>
      {/* Mobile: Compact Daily Brief */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:hidden">
        <GlowCard className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-lg font-bold text-white mb-1">{greeting}, Emre</h1>
              <p className="text-xs text-gray-400">{currentTime.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
              <Sparkles size={12} className="text-indigo-400" />
              <span className="text-[10px] font-medium text-indigo-400">AI</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500/10 to-transparent border-l-3 border-indigo-500">
            <p className="text-sm text-white leading-relaxed">
              Performans <span className="text-emerald-400 font-semibold">%8 üzerinde</span>.
              <span className="text-amber-400 font-semibold"> 2 kritik durum</span> bekliyor.
            </p>
          </div>
        </GlowCard>
      </motion.div>

      {/* Desktop: Full Daily Brief */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 hidden md:block">
        <GlowCard className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">{greeting}, Emre</h1>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  <Sparkles size={14} className="text-indigo-400" />
                  <span className="text-xs font-medium text-indigo-400">AI Özeti</span>
                </div>
              </div>
              <p className="text-base text-gray-400">{currentTime.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 transition-colors">
                <MessageSquare size={16} />
                <span>E-posta</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition-all">
                <Download size={16} />
                <span>Rapor İndir</span>
              </button>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent border-l-4 border-indigo-500">
            <p className="text-base text-white leading-relaxed">
              Dün genel performans <span className="text-emerald-400 font-semibold">beklentilerin %8 üzerinde</span> gerçekleşti.
              Marmara bölgesi ₺1.2M ile günlük rekor kırdı.
              <span className="text-amber-400 font-semibold"> 2 kritik durum</span> dikkatinizi bekliyor.
            </p>
          </div>
        </GlowCard>
      </motion.div>

      {/* Mobile: KPI Carousel */}
      <MobileKPICarousel />

      {/* Desktop: KPI Grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, i) => <KPICard key={kpi.label} {...kpi} delay={i * 0.1} />)}
      </div>

      {/* Mobile: Action Buttons */}
      <div className="md:hidden flex gap-2 mb-4">
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm active:bg-white/10">
          <MessageSquare size={16} />
          <span>E-posta</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium active:opacity-90">
          <Download size={16} />
          <span>İndir</span>
        </button>
      </div>

      {/* Mobile: AI Insights (Priority) */}
      <div className="md:hidden mb-4">
        <AIInsightsPanel onActionClick={onActionClick} />
      </div>

      {/* Mobile: Collapsible Sections */}
      <MobileCollapsibleSection
        title="Gelir Grafiği"
        icon={<Activity size={18} className="text-cyan-400" />}
        defaultOpen={true}
      >
        <RevenueChart />
      </MobileCollapsibleSection>

      <MobileCollapsibleSection
        title="Bölge Performansı"
        icon={<Target size={18} className="text-emerald-400" />}
        badge="5 Bölge"
      >
        <RegionalPerformance />
      </MobileCollapsibleSection>

      <MobileCollapsibleSection
        title="Aylık Karşılaştırma"
        icon={<TrendingUp size={18} className="text-purple-400" />}
      >
        <MoMChangesTable />
      </MobileCollapsibleSection>

      <MobileCollapsibleSection
        title="Veri Kaynakları"
        icon={<Database size={18} className="text-cyan-400" />}
        badge="5 Aktif"
      >
        <DataSourcesPanel />
      </MobileCollapsibleSection>

      <MobileCollapsibleSection
        title="Sistem Durumu"
        icon={<Shield size={18} className="text-indigo-400" />}
      >
        <div className="space-y-4">
          <AlertSystemFlow />
          <FeedbackLoop />
          <ActivityFeed />
        </div>
      </MobileCollapsibleSection>

      {/* Desktop: Main Grid */}
      <div className="hidden md:grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart />
          <div className="grid md:grid-cols-2 gap-6">
            <RegionalPerformance />
            <MoMChangesTable />
          </div>
        </div>
        <div className="space-y-6">
          <DataSourcesPanel />
          <AIInsightsPanel onActionClick={onActionClick} />
        </div>
      </div>

      {/* Desktop: Supporting Systems Row */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 mb-6">
        <AlertSystemFlow />
        <FeedbackLoop />
        <ActivityFeed />
      </div>
    </>
  );
};

const ModelInteractionPage: React.FC = () => {
  const [showMobileTools, setShowMobileTools] = useState(false);

  return (
    <div className="flex flex-col h-full">
      {/* Mobile: Compact Header with Quick Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:hidden">
        <GlowCard className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">AI Chat</h2>
                <div className="flex items-center gap-1.5">
                  <LivePulse />
                  <span className="text-[10px] text-emerald-400">Aktif</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowMobileTools(!showMobileTools)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 active:bg-white/10"
            >
              <Database size={16} className="text-cyan-400" />
              <span className="text-xs text-gray-300">Araçlar</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${showMobileTools ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Mobile Quick Stats */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 rounded-lg bg-indigo-500/10">
              <div className="text-sm font-bold text-indigo-400">47</div>
              <div className="text-[9px] text-gray-500">Sorgu</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-emerald-500/10">
              <div className="text-sm font-bold text-emerald-400">92%</div>
              <div className="text-[9px] text-gray-500">Başarı</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-cyan-500/10">
              <div className="text-sm font-bold text-cyan-400">1.2s</div>
              <div className="text-[9px] text-gray-500">Ortalama</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-purple-500/10">
              <div className="text-sm font-bold text-purple-400">7.9M</div>
              <div className="text-[9px] text-gray-500">Kayıt</div>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Mobile: Expandable Tools Panel */}
      <AnimatePresence>
        {showMobileTools && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden mb-4"
          >
            <div className="space-y-3">
              <GlowCard className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-gray-500" />
                  <span className="text-xs font-medium text-white">Son Sorgular</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                  {['Bölgesel satış', 'Stok durumu', 'Müşteri segm.', 'Aylık trend'].map((query, i) => (
                    <button key={i} className="flex-shrink-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300 active:bg-white/10">
                      {query}
                    </button>
                  ))}
                </div>
              </GlowCard>

              <GlowCard className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Play size={14} className="text-purple-400" />
                  <span className="text-xs font-medium text-white">Hızlı Sorgular</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Satış Özeti', 'Stok Raporu', 'Müşteri Analizi', 'Trend Raporu'].map((label) => (
                    <button key={label} className="px-3 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-xs text-white active:from-indigo-500/20">
                      {label}
                    </button>
                  ))}
                </div>
              </GlowCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop: Full Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 hidden md:block">
        <GlowCard className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Model Etkileşim Merkezi</h2>
                <p className="text-sm text-gray-400">Doğal dil ile şirket verilerinizi sorgulayın</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <LivePulse />
                <div>
                  <span className="text-xs text-emerald-400 font-medium block">Model Aktif</span>
                  <span className="text-[10px] text-gray-500">GPT-4 Turbo</span>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Database size={14} className="text-cyan-400" />
                <div>
                  <span className="text-xs text-cyan-400 font-medium block">7.9M Kayıt</span>
                  <span className="text-[10px] text-gray-500">5 kaynak</span>
                </div>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Desktop: AI Working Flow */}
      <div className="hidden md:block mb-6">
        <AIWorkingFlow />
      </div>

      {/* Mobile: Full-height Chat */}
      <div className="md:hidden flex-1 min-h-[400px]">
        <LLMChatInterface />
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:grid lg:grid-cols-5 gap-6 flex-1 min-h-0">
        <div className="lg:col-span-3 min-h-[500px] lg:min-h-0">
          <LLMChatInterface />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-6 min-h-0">
          <div className="flex-1 min-h-[200px]">
            <DataExplorer />
          </div>
          <MLQueryBuilder />
          <GlowCard className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-white">Son Sorgular</span>
            </div>
            <div className="space-y-2">
              {['Bölgesel satış analizi', 'Stok durumu raporu', 'Müşteri segmentasyonu', 'Aylık trend raporu'].map((query, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                  <span className="text-xs text-gray-400 truncate">{query}</span>
                  <span className="text-[10px] text-gray-600 flex-shrink-0 ml-2">{i + 1} dk önce</span>
                </div>
              ))}
            </div>
          </GlowCard>
          <GlowCard className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-white">Günlük İstatistikler</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-2 rounded-lg bg-indigo-500/10">
                <div className="text-lg font-bold text-indigo-400">47</div>
                <div className="text-[9px] text-gray-500">Sorgu</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-emerald-500/10">
                <div className="text-lg font-bold text-emerald-400">92%</div>
                <div className="text-[9px] text-gray-500">Başarı</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-cyan-500/10">
                <div className="text-lg font-bold text-cyan-400">1.2s</div>
                <div className="text-[9px] text-gray-500">Süre</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-purple-500/10">
                <div className="text-lg font-bold text-purple-400">3.2M</div>
                <div className="text-[9px] text-gray-500">Kayıt</div>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};

const GraphicsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [mobileChartIndex, setMobileChartIndex] = useState(0);
  const chartScrollRef = useRef<HTMLDivElement>(null);

  const regions = ['all', 'Marmara', 'Ege', 'Akdeniz', 'İç Anadolu', 'Karadeniz'];
  const chartLabels = ['Yoğunluk', 'Huni', 'Trend', 'Kategori'];

  const handleChartScroll = () => {
    if (chartScrollRef.current) {
      const scrollLeft = chartScrollRef.current.scrollLeft;
      const cardWidth = chartScrollRef.current.offsetWidth;
      setMobileChartIndex(Math.round(scrollLeft / cardWidth));
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mobile: Compact Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden">
        <GlowCard className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center">
                <BarChart2 size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Grafikler</h2>
                <p className="text-[10px] text-gray-500">4 görsel analiz</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 active:opacity-80">
              <Download size={14} className="text-indigo-400" />
              <span className="text-xs text-indigo-400">PDF</span>
            </button>
          </div>

          {/* Mobile Quick Insights - Horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
            <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] text-gray-500 block">Zirve</span>
              <span className="text-xs font-semibold text-emerald-400">Marmara</span>
            </div>
            <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] text-gray-500 block">Dikkat</span>
              <span className="text-xs font-semibold text-amber-400">↓23%</span>
            </div>
            <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <span className="text-[10px] text-gray-500 block">Dönüşüm</span>
              <span className="text-xs font-semibold text-cyan-400">4.5%</span>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Desktop: Full Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hidden md:block">
        <GlowCard className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center">
                <BarChart2 size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Yönetici Grafikleri</h2>
                <p className="text-sm text-gray-400">Stratejik karar destek görselleri</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs text-gray-500 block">En Yüksek</span>
                <span className="text-sm font-semibold text-emerald-400">Marmara - Cuma</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-xs text-gray-500 block">Dikkat</span>
                <span className="text-sm font-semibold text-amber-400">İç Anadolu ↓23%</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-xs text-gray-500 block">Dönüşüm</span>
                <span className="text-sm font-semibold text-cyan-400">4.5%</span>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Mobile: Compact Filters */}
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {(['daily', 'weekly', 'monthly'] as TimeRange[]).map((range) => (
            <button key={range} onClick={() => setTimeRange(range)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                timeRange === range ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'bg-white/5 text-gray-400 border border-white/10'
              }`}
            >
              {range === 'daily' ? 'Günlük' : range === 'weekly' ? 'Haftalık' : 'Aylık'}
            </button>
          ))}
          <div className="w-px bg-white/10 mx-1" />
          {regions.slice(0, 4).map((region) => (
            <button key={region} onClick={() => setSelectedRegion(region)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedRegion === region ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-white/5 text-gray-400 border border-white/10'
              }`}
            >
              {region === 'all' ? 'Tümü' : region}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: Full Filters */}
      <GlowCard className="p-4 hidden md:block">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-gray-500" />
            <span className="text-sm text-gray-400">Dönem:</span>
            <div className="flex gap-2">
              {(['daily', 'weekly', 'monthly'] as TimeRange[]).map((range) => (
                <button key={range} onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    timeRange === range ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}
                >
                  {range === 'daily' ? 'Günlük' : range === 'weekly' ? 'Haftalık' : 'Aylık'}
                </button>
              ))}
            </div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Bölge:</span>
            <div className="flex gap-2 flex-wrap">
              {regions.map((region) => (
                <button key={region} onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedRegion === region ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}
                >
                  {region === 'all' ? 'Tümü' : region}
                </button>
              ))}
            </div>
          </div>
          <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-400 text-xs hover:from-indigo-500/30 hover:to-purple-500/30 transition-all">
            <Download size={14} />
            <span>PDF Rapor İndir</span>
          </button>
        </div>
      </GlowCard>

      {/* Mobile: Swipeable Chart Carousel */}
      <div className="md:hidden">
        {/* Chart Navigation Pills */}
        <div className="flex justify-center gap-2 mb-3">
          {chartLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => {
                if (chartScrollRef.current) {
                  chartScrollRef.current.scrollTo({ left: i * chartScrollRef.current.offsetWidth, behavior: 'smooth' });
                }
              }}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                mobileChartIndex === i ? 'bg-indigo-500 text-white' : 'bg-white/5 text-gray-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Swipeable Charts */}
        <div
          ref={chartScrollRef}
          onScroll={handleChartScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex-shrink-0 w-full snap-start">
            <Heatmap />
          </div>
          <div className="flex-shrink-0 w-full snap-start">
            <FunnelChart />
          </div>
          <div className="flex-shrink-0 w-full snap-start">
            <TrendLineChart />
          </div>
          <div className="flex-shrink-0 w-full snap-start">
            <CategoryBarChart />
          </div>
        </div>

        {/* Pagination Indicator */}
        <div className="flex justify-center gap-1.5 mt-2">
          {chartLabels.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === mobileChartIndex ? 'w-6 bg-indigo-500' : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Charts Grid */}
      <div className="hidden md:grid lg:grid-cols-2 gap-6">
        <Heatmap />
        <FunnelChart />
      </div>
      <div className="hidden md:grid lg:grid-cols-2 gap-6">
        <TrendLineChart />
        <CategoryBarChart />
      </div>

      {/* Mobile: Compact AI Insights */}
      <div className="md:hidden">
        <GlowCard className="p-3" glowColor="rgba(139, 92, 246, 0.1)">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-sm font-semibold text-white">AI Analiz</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5">
              <TrendingUp size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300">Marmara Cuma günleri %95 satış yoğunluğu</p>
            </div>
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5">
              <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300">Sepete Ekleme aşamasında %60 kayıp</p>
            </div>
          </div>
        </GlowCard>
      </div>

      {/* Desktop: AI Insights Summary */}
      <GlowCard className="p-5 hidden md:block" glowColor="rgba(139, 92, 246, 0.1)">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Sparkles size={18} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Grafik Analizi</h3>
            <p className="text-xs text-gray-500">Otomatik oluşturulan içgörüler</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={14} className="text-emerald-400" />
              <span className="text-xs font-medium text-emerald-400">Fırsat</span>
            </div>
            <p className="text-sm text-gray-300">Marmara bölgesinde Cuma günleri satış yoğunluğu %95 ile zirve yapıyor.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-amber-400" />
              <span className="text-xs font-medium text-amber-400">Dikkat</span>
            </div>
            <p className="text-sm text-gray-300">Satış hunisinde "Sepete Ekleme" aşamasında %60 kayıp var.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Target size={14} className="text-cyan-400" />
              <span className="text-xs font-medium text-cyan-400">Öneri</span>
            </div>
            <p className="text-sm text-gray-300">Kozmetik kategorisi %22.4 büyüme ile lider. Stok artışı önerilir.</p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

// ============================================================================
// MAIN DASHBOARD
// ============================================================================

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardPage>('executive');
  const [aiChatOpen, setAIChatOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      <SEO page="dashboard" />

      {/* Background effects - smaller on mobile */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-500/5 rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-purple-500/5 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>

      <Header onAIClick={() => setAIChatOpen(true)} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content with bottom padding for mobile nav */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-3 py-3 sm:p-4 md:p-6 pb-24 md:pb-6">
        <AnimatePresence mode="wait">
          {activeTab === 'executive' && (
            <motion.div key="executive" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <ExecutiveDashboardPage onActionClick={setSelectedInsight} currentTime={currentTime} />
            </motion.div>
          )}
          {activeTab === 'model' && (
            <motion.div key="model" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <ModelInteractionPage />
            </motion.div>
          )}
          {activeTab === 'graphics' && (
            <motion.div key="graphics" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
              <GraphicsPage />
            </motion.div>
          )}
        </AnimatePresence>

        {/* System Status Footer - Hidden on mobile */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="hidden md:flex flex-row items-center justify-between py-4 border-t border-white/5 mt-6"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-emerald-400" />
              <span className="text-xs text-gray-500">Sistemler aktif</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-cyan-400" />
              <span className="text-xs text-gray-500">5 kaynak bağlı</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch size={14} className="text-purple-400" />
              <span className="text-xs text-gray-500">v2.4.1</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-emerald-400" />
            <span className="text-xs text-gray-500">{currentTime.toLocaleTimeString('tr-TR')}</span>
          </div>
        </motion.div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAIClick={() => setAIChatOpen(true)}
      />

      {/* Modals */}
      <AIChatModal isOpen={aiChatOpen} onClose={() => setAIChatOpen(false)} />
      <AnimatePresence>
        {selectedInsight && <ActionModal insight={selectedInsight} onClose={() => setSelectedInsight(null)} />}
      </AnimatePresence>
    </div>
  );
}
