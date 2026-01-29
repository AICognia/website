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
  Stethoscope,
  Syringe,
  Heart,
  Bed,
  DollarSign,
  Truck,
  Building2,
  Package,
  Scissors,
  UserCheck,
  AlertCircle
} from 'lucide-react';

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
// HOSPITAL DATA
// ============================================================================

// KPI Data - Hospital Specific
const kpiData: Array<{ label: string; value: string; change: string; trend: 'up' | 'down'; target: string; progress: number; isGoodWhenDown?: boolean }> = [
  { label: 'Günlük Gelir', value: '₺2.4M', change: '+8.5%', trend: 'up', target: '₺2.2M', progress: 109 },
  { label: 'Aktif Ameliyat', value: '12', change: '+2', trend: 'up', target: '10', progress: 120 },
  { label: 'SGK Ret Oranı', value: '%4.2', change: '-1.8%', trend: 'down', target: '%5', progress: 84, isGoodWhenDown: true },
  { label: 'Hayalet Ekipman', value: '3', change: '-5', trend: 'down', target: '0', progress: 70, isGoodWhenDown: true },
];

// Revenue Data with AI Predictions
const revenueData = [
  { month: 'Oca', actual: 2100, predicted: null, target: 2000 },
  { month: 'Şub', actual: 2250, predicted: null, target: 2100 },
  { month: 'Mar', actual: 2400, predicted: null, target: 2200 },
  { month: 'Nis', actual: 2150, predicted: null, target: 2300 },
  { month: 'May', actual: 2600, predicted: null, target: 2400 },
  { month: 'Haz', actual: 2800, predicted: null, target: 2500 },
  { month: 'Tem', actual: 2650, predicted: null, target: 2600 },
  { month: 'Ağu', actual: 2900, predicted: 2900, target: 2700 },
  { month: 'Eyl', actual: null, predicted: 3100, target: 2800 },
  { month: 'Eki', actual: null, predicted: 3400, target: 2900 },
];

// Hospital Data Sources
const dataSources = [
  { id: 'hbys', name: 'HBYS', type: 'database', records: '1.2M', latency: '15ms', status: 'active', lastSync: '2 sn önce', tables: ['hastalar', 'ameliyatlar', 'faturalar', 'randevular'] },
  { id: 'medula', name: 'SGK MEDULA', type: 'api', records: '856K', latency: '45ms', status: 'active', lastSync: '30 sn önce', tables: ['provizyon', 'fatura_durum', 'ret_nedenleri', 'sut_kodlari'] },
  { id: 'ameliyathane', name: 'Ameliyathane Sistemi', type: 'realtime', records: '24K', latency: '8ms', status: 'active', lastSync: 'Canlı', tables: ['aktif_ameliyat', 'ekipman_kullanim', 'personel', 'salon_durumu'] },
  { id: 'stok', name: 'Stok Yönetimi', type: 'database', records: '45K', latency: '12ms', status: 'active', lastSync: '5 sn önce', tables: ['malzemeler', 'hareketler', 'siparisler', 'tedarikciler'] },
];

// AI Insights - Hospital Specific
const aiInsights = [
  {
    id: 1,
    type: 'anomaly',
    severity: 'critical',
    title: 'Hayalet Ekipman Tespit Edildi',
    summary: 'Ameliyat #2847: Silikon implant talep edildi ama kullanılmadı.',
    detail: 'Dr. Yılmaz tarafından talep edilen 2 adet meme implantı ameliyatta kullanılmadı ancak sisteme kullanıldı olarak girildi.',
    confidence: 96,
    impact: '₺45K fatura uyumsuzluğu',
    action: 'Stok düzeltme başlat',
    department: 'Plastik Cerrahi',
    timestamp: '12 dk önce'
  },
  {
    id: 2,
    type: 'prediction',
    severity: 'warning',
    title: 'SGK Ret Riski Yüksek',
    summary: 'Fatura #F-2024-1847 için %78 ret olasılığı.',
    detail: 'Eksik doküman: Ameliyat öncesi konsültasyon raporu ve anestezi formu.',
    confidence: 78,
    impact: '₺125K risk',
    action: 'Doküman ekle',
    department: 'Faturalama',
    timestamp: '35 dk önce'
  },
  {
    id: 3,
    type: 'opportunity',
    severity: 'info',
    title: 'Maliyet Optimizasyonu Fırsatı',
    summary: 'Alternatif tedarikçi ile %12 tasarruf mümkün.',
    detail: 'Sütur malzemeleri için Medikal A.Ş. fiyatları mevcut tedarikçiden %12 daha uygun.',
    confidence: 92,
    impact: '+₺85K/ay tasarruf',
    action: 'Teklif al',
    department: 'Satın Alma',
    timestamp: '1 saat önce'
  }
];

// Performance by Procedure Type
const performanceByProcedure = [
  { name: 'Rinoplasti', value: 850, change: 15.2, fill: '#6366f1', surgeries: 42 },
  { name: 'Meme Estetiği', value: 640, change: 8.4, fill: '#8b5cf6', surgeries: 28 },
  { name: 'Yüz Germe', value: 420, change: 6.1, fill: '#a855f7', surgeries: 18 },
  { name: 'Liposuction', value: 380, change: -2.3, fill: '#ef4444', surgeries: 24 },
  { name: 'Diğer', value: 310, change: 4.2, fill: '#64748b', surgeries: 35 },
];

// Live Activity Feed - Hospital Events
const activityFeed = [
  { time: '14:23:45', event: 'Ameliyat başladı', source: 'OR-3', type: 'info', value: 'Rinoplasti' },
  { time: '14:22:18', event: 'Malzeme tarandı', source: 'Depo', type: 'success', value: 'Silikon implant' },
  { time: '14:21:02', event: 'Hayalet ekipman uyarısı', source: 'AI', type: 'warning', value: 'OR-1' },
  { time: '14:19:33', event: 'SGK onayı alındı', source: 'MEDULA', type: 'success', value: '₺85K' },
  { time: '14:17:55', event: 'Ret riski tespit edildi', source: 'AI', type: 'warning', value: 'F-2847' },
];

// Month-over-Month Data - Hospital Metrics
const momData = [
  { metric: 'Toplam Gelir', current: '₺2.9M', previous: '₺2.6M', change: 11.5, trend: 'up' as const },
  { metric: 'Ameliyat Sayısı', current: '147', previous: '132', change: 11.4, trend: 'up' as const },
  { metric: 'SGK Onay Oranı', current: '%95.8', previous: '%92.1', change: 4.0, trend: 'up' as const },
  { metric: 'Ortalama Fatura', current: '₺52K', previous: '₺48K', change: 8.3, trend: 'up' as const },
  { metric: 'Hayalet Ekipman', current: '3', previous: '8', change: -62.5, trend: 'down' as const },
];

// Heatmap Data - Surgery Type × Day
const heatmapData: HeatmapCell[] = [
  // Rinoplasti
  { x: 'Pzt', y: 'Rinoplasti', value: 85 }, { x: 'Sal', y: 'Rinoplasti', value: 92 }, { x: 'Çar', y: 'Rinoplasti', value: 78 },
  { x: 'Per', y: 'Rinoplasti', value: 88 }, { x: 'Cum', y: 'Rinoplasti', value: 95 }, { x: 'Cmt', y: 'Rinoplasti', value: 45 }, { x: 'Paz', y: 'Rinoplasti', value: 0 },
  // Meme Estetiği
  { x: 'Pzt', y: 'Meme Estetiği', value: 72 }, { x: 'Sal', y: 'Meme Estetiği', value: 68 }, { x: 'Çar', y: 'Meme Estetiği', value: 82 },
  { x: 'Per', y: 'Meme Estetiği', value: 75 }, { x: 'Cum', y: 'Meme Estetiği', value: 88 }, { x: 'Cmt', y: 'Meme Estetiği', value: 35 }, { x: 'Paz', y: 'Meme Estetiği', value: 0 },
  // Yüz Germe
  { x: 'Pzt', y: 'Yüz Germe', value: 55 }, { x: 'Sal', y: 'Yüz Germe', value: 62 }, { x: 'Çar', y: 'Yüz Germe', value: 48 },
  { x: 'Per', y: 'Yüz Germe', value: 58 }, { x: 'Cum', y: 'Yüz Germe', value: 65 }, { x: 'Cmt', y: 'Yüz Germe', value: 25 }, { x: 'Paz', y: 'Yüz Germe', value: 0 },
  // Liposuction
  { x: 'Pzt', y: 'Liposuction', value: 42 }, { x: 'Sal', y: 'Liposuction', value: 48 }, { x: 'Çar', y: 'Liposuction', value: 38 },
  { x: 'Per', y: 'Liposuction', value: 52 }, { x: 'Cum', y: 'Liposuction', value: 58 }, { x: 'Cmt', y: 'Liposuction', value: 20 }, { x: 'Paz', y: 'Liposuction', value: 0 },
  // Botoks/Dolgu
  { x: 'Pzt', y: 'Botoks/Dolgu', value: 65 }, { x: 'Sal', y: 'Botoks/Dolgu', value: 72 }, { x: 'Çar', y: 'Botoks/Dolgu', value: 68 },
  { x: 'Per', y: 'Botoks/Dolgu', value: 75 }, { x: 'Cum', y: 'Botoks/Dolgu', value: 82 }, { x: 'Cmt', y: 'Botoks/Dolgu', value: 55 }, { x: 'Paz', y: 'Botoks/Dolgu', value: 0 },
];

// Billing Funnel Data
const funnelData: FunnelStage[] = [
  { stage: 'Ameliyat Tamamlandı', value: 2000, percentage: 100, color: '#6366f1' },
  { stage: 'SUT Kodu Girildi', value: 1840, percentage: 92, color: '#8b5cf6' },
  { stage: 'Doküman Tamamlandı', value: 1680, percentage: 84, color: '#a855f7' },
  { stage: 'SGK\'ya Gönderildi', value: 1560, percentage: 78, color: '#c084fc' },
  { stage: 'Onaylandı', value: 1404, percentage: 70.2, color: '#10b981' },
];

// Trend Data - Daily Performance
const trendData = [
  { date: '01', surgeries: 12, revenue: 480, patients: 18 },
  { date: '02', surgeries: 15, revenue: 620, patients: 22 },
  { date: '03', surgeries: 11, revenue: 440, patients: 16 },
  { date: '04', surgeries: 18, revenue: 720, patients: 25 },
  { date: '05', surgeries: 14, revenue: 560, patients: 20 },
  { date: '06', surgeries: 16, revenue: 640, patients: 23 },
  { date: '07', surgeries: 8, revenue: 320, patients: 12 },
  { date: '08', surgeries: 17, revenue: 680, patients: 24 },
  { date: '09', surgeries: 13, revenue: 520, patients: 19 },
  { date: '10', surgeries: 19, revenue: 760, patients: 27 },
  { date: '11', surgeries: 15, revenue: 600, patients: 21 },
  { date: '12', surgeries: 20, revenue: 800, patients: 28 },
];

// Department Performance Data
const departmentData = [
  { category: 'Plastik Cerrahi', revenue: 2400, growth: 12.5, surgeries: 147 },
  { category: 'Genel Cerrahi', revenue: 1850, growth: 8.2, surgeries: 124 },
  { category: 'Ortopedi', revenue: 1620, growth: 15.1, surgeries: 98 },
  { category: 'KBB', revenue: 890, growth: -3.2, surgeries: 76 },
  { category: 'Göz', revenue: 720, growth: 22.4, surgeries: 89 },
  { category: 'Üroloji', revenue: 540, growth: 5.8, surgeries: 52 },
];

// Feedback Loop Data
const feedbackData = [
  { id: 1, recommendation: 'Silikon implant sipariş önerisi', decision: 'accepted', outcome: 'positive', impact: '+₺125K', improvement: '+2.3%' },
  { id: 2, recommendation: 'SGK doküman uyarısı', decision: 'modified', outcome: 'neutral', impact: '₺0', improvement: '+0.5%' },
  { id: 3, recommendation: 'Alternatif tedarikçi önerisi', decision: 'rejected', outcome: 'negative', impact: '-₺45K', improvement: '-0.8%' },
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
}> = ({ children, className = '', glowColor = 'rgba(6, 182, 212, 0.15)', onClick }) => (
  <motion.div
    whileHover={{ scale: 1.005 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
    className={`relative rounded-xl overflow-hidden ${onClick ? 'cursor-pointer' : ''} ${className}`}
    style={{
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
      boxShadow: `0 0 40px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
      border: '1px solid rgba(6, 182, 212, 0.2)'
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

const TabNavigation: React.FC<{ activeTab: DashboardPage; onTabChange: (tab: DashboardPage) => void }> = ({ activeTab, onTabChange }) => (
  <div className="hidden md:flex items-center gap-2 p-3 bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-white/5">
    {dashboardTabs.map((tab) => (
      <motion.button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${
          activeTab === tab.id
            ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 text-white'
            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <tab.icon size={18} className={activeTab === tab.id ? 'text-cyan-400' : ''} />
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
                isActive ? 'text-cyan-400' : 'text-gray-500'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full"
                />
              )}
              <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] mt-1 font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {tab.id === 'executive' ? 'Panel' : tab.id === 'model' ? 'AI Chat' : 'Grafikler'}
              </span>
            </motion.button>
          );
        })}
        <motion.button
          onClick={onAIClick}
          className="flex flex-col items-center py-3 px-4 min-w-[72px] text-cyan-400"
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-11 h-11 -mt-6 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 border-4 border-[#050810]">
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
      <div className="flex items-center gap-3 md:gap-6">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="w-9 h-9 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center flex-shrink-0">
            <Stethoscope className="w-5 h-5 md:w-7 md:h-7 text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold tracking-tight text-sm md:text-base">CERRAHPAŞA</h1>
            <p className="text-[9px] md:text-[10px] text-cyan-400 uppercase tracking-widest hidden md:block">Hospital Command Center</p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <LivePulse />
          <span className="text-xs font-medium text-emerald-400">4 sistem bağlı</span>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <LivePulse />
          <span className="text-[10px] font-medium text-emerald-400">Aktif</span>
        </div>

        <motion.div
          className={`hidden lg:flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
            searchFocused ? 'bg-[#0f1629] border-cyan-500/50 w-80' : 'bg-[#0f1629]/50 border-white/5 w-64'
          } border`}
          animate={{ width: searchFocused ? 320 : 256 }}
        >
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="AI'ya sor: 'Bugün kaç ameliyat?'"
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
          className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/30 hover:to-teal-500/30 transition-all"
        >
          <Brain size={18} />
          <span className="text-sm font-medium">AI Asistan</span>
        </button>

        <div className="text-right hidden md:block">
          <div className="text-white font-mono text-sm">
            {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-[10px] text-gray-500">
            {time.toLocaleDateString('tr-TR', { weekday: 'short', day: 'numeric', month: 'short' })}
          </div>
        </div>

        <div className="relative">
          <button className="w-10 h-10 rounded-xl bg-[#0f1629] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/10 transition-colors active:scale-95">
            <Bell size={18} />
          </button>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">4</span>
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// KPI CARD COMPONENT
// ============================================================================

const KPICard: React.FC<{
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  progress: number;
  delay?: number;
  isGoodWhenDown?: boolean;
}> = ({ label, value, change, trend, progress, delay = 0, isGoodWhenDown = false }) => {
  const isPositive = isGoodWhenDown ? trend === 'down' : trend === 'up';
  const progressColor = progress >= 100 ? '#10b981' : progress >= 80 ? '#f59e0b' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative p-3 sm:p-4 md:p-5 rounded-xl bg-[#0f1629]/80 border border-white/5 overflow-hidden group hover:border-cyan-500/20 transition-colors"
    >
      <div className="absolute bottom-0 left-0 h-1 transition-all duration-1000"
        style={{ width: `${Math.min(progress, 100)}%`, background: `linear-gradient(90deg, ${progressColor}40, ${progressColor})` }}
      />
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">{label}</span>
        <div className={`flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-semibold ${
          isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
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
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-sm font-medium text-white">{title}</span>
          {badge && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/20 text-cyan-400">
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
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {kpiData.map((kpi, i) => {
          const isPositive = kpi.isGoodWhenDown ? kpi.trend === 'down' : kpi.trend === 'up';
          return (
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
                    isPositive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
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
          );
        })}
      </div>
      <div className="flex justify-center gap-1.5 mt-1">
        {kpiData.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === activeIndex ? 'w-6 bg-cyan-500' : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// PANEL COMPONENTS - EXECUTIVE DASHBOARD
// ============================================================================

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
              item.metric === 'Hayalet Ekipman'
                ? (item.change < 0 ? 'text-emerald-400' : 'text-red-400')
                : (item.change >= 0 ? 'text-emerald-400' : 'text-red-400')
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
    { id: 'critical', label: 'Kritik', color: '#ef4444', count: 2, targets: ['Başhekim', 'Finans'] },
    { id: 'warning', label: 'Uyarı', color: '#f59e0b', count: 5, targets: ['Departman', 'Faturalama'] },
    { id: 'info', label: 'Bilgi', color: '#06b6d4', count: 12, targets: ['Operasyon'] },
  ];

  return (
    <GlowCard className="p-3 sm:p-5 h-full" glowColor="rgba(245, 158, 11, 0.1)">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
          <AlertTriangle size={16} className="sm:w-[18px] sm:h-[18px] text-amber-400" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-white">Hastane Alert Sistemi</h3>
          <p className="text-[10px] sm:text-xs text-gray-500">Anomali tespit ve yönlendirme</p>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-3 overflow-x-auto pb-1 -mx-1 px-1">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex-shrink-0">
            <Database size={12} className="sm:w-[14px] sm:h-[14px] text-cyan-400" />
            <span className="text-[10px] sm:text-xs text-gray-300 whitespace-nowrap">HBYS</span>
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

        <div className="flex justify-center">
          <div className="w-[2px] h-3 sm:h-4 bg-gradient-to-b from-amber-500/50 to-transparent" />
        </div>

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
          <h3 className="text-xs sm:text-sm font-semibold text-white">Model İyileştirme</h3>
          <p className="text-[10px] sm:text-xs text-gray-500">Geri bildirim döngüsü</p>
        </div>
      </div>
    </div>

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
            <span className="text-base sm:text-lg font-bold text-emerald-400">+2.1%</span>
            <p className="text-[8px] sm:text-[9px] text-gray-500">Model Doğruluğu</p>
          </div>
        </div>
      </div>
    </div>

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
            <h3 className="text-xs sm:text-sm font-semibold text-white">Hastane Sistemleri</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Gerçek zamanlı bağlantı</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-[10px] sm:text-xs text-cyan-400 font-mono">2.1M</span>
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

const AIInsightsPanel: React.FC<{ onActionClick: (insight: typeof aiInsights[0]) => void }> = ({ onActionClick }) => {
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
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
            <Sparkles size={18} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Öngörüleri</h3>
            <p className="text-xs text-gray-500">Otomatik tespit & öneriler</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-semibold text-red-400">3 dikkat</span>
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
        <p className="text-xs text-gray-500 mt-1">Aylık performans ve 3 aylık projeksiyon (₺K)</p>
      </div>
      <div className="flex items-center gap-4">
        {[
          { label: 'Gerçekleşen', color: '#06b6d4' },
          { label: 'AI Tahmini', color: '#8b5cf6', dashed: true },
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
          <linearGradient id="revenueGradientCerr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.1} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="predictionGradientCerr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}M`} />
        <Tooltip
          contentStyle={{ backgroundColor: '#151d30', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          labelStyle={{ color: '#f8fafc', fontWeight: 600, marginBottom: 8 }}
          formatter={(value, name) => [typeof value === 'number' ? `₺${value.toLocaleString()}K` : '-', name === 'actual' ? 'Gerçekleşen' : name === 'predicted' ? 'AI Tahmini' : 'Hedef']}
        />
        <Area type="monotone" dataKey="actual" stroke="#06b6d4" strokeWidth={2.5} fill="url(#revenueGradientCerr)" dot={{ fill: '#06b6d4', r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: '#06b6d4', stroke: '#fff', strokeWidth: 2 }} />
        <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={2.5} strokeDasharray="6 4" fill="url(#predictionGradientCerr)" dot={{ fill: '#8b5cf6', r: 4, strokeWidth: 0 }} />
        <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="4 4" fill="none" dot={false} opacity={0.5} />
      </AreaChart>
    </ResponsiveContainer>

    <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
          <Brain size={16} className="text-cyan-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-400">AI TAHMİNİ</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">%92 güven</span>
          </div>
          <p className="text-sm text-gray-300">
            Eylül-Ekim döneminde <span className="text-white font-semibold">%17 büyüme</span> öngörülüyor.
            Plastik cerrahi rinoplasti ameliyatları ana itici güç olacak.
          </p>
        </div>
      </div>
    </div>
  </GlowCard>
);

const ProcedurePerformance: React.FC = () => {
  const total = performanceByProcedure.reduce((sum, r) => sum + r.value, 0);

  return (
    <GlowCard className="p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-white">Ameliyat Tipi Performansı</h3>
        <span className="text-xs text-gray-500">Aylık Ciro (₺K)</span>
      </div>
      <div className="space-y-3">
        {performanceByProcedure.map((procedure, i) => {
          const percentage = (procedure.value / total) * 100;
          return (
            <motion.div key={procedure.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="group">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-white">{procedure.name}</span>
                  <span className="text-[10px] text-gray-500">{procedure.surgeries} op</span>
                  <span className={`text-xs font-medium flex items-center gap-0.5 ${procedure.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {procedure.change >= 0 ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {procedure.change >= 0 ? '+' : ''}{procedure.change}%
                  </span>
                </div>
                <span className="text-sm font-semibold text-white">₺{procedure.value}K</span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full rounded-full" style={{ background: procedure.fill }}
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
    ai: { bg: 'bg-purple-500/10', color: 'text-purple-400' },
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
            <p className="text-xs text-gray-500">Ameliyathane & sistem olayları</p>
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
                item.type === 'warning' ? 'border-amber-500' : item.type === 'ai' ? 'border-purple-500' : item.type === 'success' ? 'border-emerald-500' : 'border-cyan-500'
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
    { role: 'assistant', content: 'Merhaba! 4 hastane sisteminden 2.1 milyon kayda erişimim var. Size nasıl yardımcı olabilirim?\n\nÖrnek sorular:\n• "Bu ayki SGK ret oranı nedir?"\n• "Hayalet ekipman geçmişini göster"\n• "Yarınki ameliyat programı"' }
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
      if (query.toLowerCase().includes('ret') || query.toLowerCase().includes('sgk')) {
        response = `📊 **SGK Ret Analizi - Ocak 2026**\n\n**Bu Ayki Ret Oranı:** %4.2\n**Geçen Ay:** %6.0\n**İyileşme:** -%30\n\n**Ret Nedenleri:**\n1. Eksik doküman: 12 fatura (%45)\n2. Yanlış SUT kodu: 8 fatura (%30)\n3. Süre aşımı: 7 fatura (%25)\n\n💡 **Öneri:** Eksik doküman uyarı sistemi aktifleştirildi.\n\n*%94 güven | 856K MEDULA kaydı analiz edildi*`;
      } else if (query.toLowerCase().includes('hayalet') || query.toLowerCase().includes('ekipman')) {
        response = `👻 **Hayalet Ekipman Raporu**\n\n**Bu Ay Tespit Edilen:** 3 adet\n**Toplam Risk:** ₺127K\n\n**Detaylar:**\n• OR-1: Silikon implant (₺45K) - 2 gün önce\n• OR-3: Sütur seti (₺12K) - 5 gün önce\n• OR-2: Lazer ucu (₺70K) - 8 gün önce\n\n**Geçen Ay:** 8 adet (₺340K)\n**İyileşme:** -%62.5\n\n*%96 güven | Gerçek zamanlı stok takibi*`;
      } else if (query.toLowerCase().includes('ameliyat') || query.toLowerCase().includes('yarın')) {
        response = `🏥 **Yarınki Ameliyat Programı**\n\n**Toplam:** 14 ameliyat\n**Tahmini Gelir:** ₺680K\n\n**Saate Göre:**\n• 08:00 - Rinoplasti (OR-1)\n• 08:30 - Meme estetiği (OR-2)\n• 09:00 - Yüz germe (OR-3)\n• 10:00 - Liposuction (OR-1)\n...\n\n**Gerekli Malzeme:** Tümü hazır ✓\n**Personel Durumu:** Tam kadro ✓\n\n*%98 güven | HBYS + Ameliyathane sistemi*`;
      } else {
        response = `Sorgunuz analiz edildi. 4 hastane sisteminden bilgi toplandı.\n\n**Özet:**\n• 1.2M HBYS kaydı tarandı\n• 324 ilgili veri noktası bulundu\n\nDaha spesifik sonuçlar için departman, tarih aralığı veya ameliyat tipi belirtin.`;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestedQueries = [
    'Bu ayki SGK ret oranı nedir?',
    'Hayalet ekipman geçmişini göster',
    'Yarınki ameliyat programı',
    'Plastik cerrahi performansı'
  ];

  return (
    <GlowCard className="h-full flex flex-col">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">ZEKAI Asistan</h3>
            <div className="flex items-center gap-2">
              <LivePulse />
              <span className="text-[10px] text-emerald-400">2.1M kayıt bağlı</span>
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
              msg.role === 'user' ? 'bg-cyan-600 text-white rounded-br-sm' : 'bg-white/5 text-gray-200 rounded-bl-sm border border-white/10'
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
                    <motion.div key={i} className="w-2 h-2 rounded-full bg-cyan-400"
                      animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400">ZEKAI analiz ediyor...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-3 sm:px-4 py-2 border-t border-white/5">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0">
          {suggestedQueries.map((query, i) => (
            <button key={i} onClick={() => setInput(query)}
              className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] sm:text-xs text-gray-400 hover:text-white hover:border-cyan-500/30 transition-colors whitespace-nowrap flex-shrink-0 sm:flex-shrink sm:whitespace-normal"
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
            className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
          />
          <button onClick={handleSend} disabled={isTyping}
            className="px-4 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-lg sm:rounded-xl text-white font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
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
  const [selectedDepts, setSelectedDepts] = useState<string[]>(['Plastik Cerrahi']);
  const departments = ['Plastik Cerrahi', 'Genel Cerrahi', 'Ortopedi', 'KBB', 'Göz', 'Üroloji'];
  const queryTypes = [
    { id: 'prediction', label: 'Tahmin', icon: Target, desc: 'Gelir/ameliyat tahmini' },
    { id: 'anomaly', label: 'Anomali', icon: AlertTriangle, desc: 'Hayalet ekipman tespiti' },
    { id: 'clustering', label: 'Kümeleme', icon: Users, desc: 'Hasta segmentasyonu' },
    { id: 'classification', label: 'Sınıflandırma', icon: Layers, desc: 'SGK ret riski' },
  ];

  return (
    <GlowCard className="p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
          <Cpu size={18} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">ML Sorgu Oluşturucu</h3>
          <p className="text-xs text-gray-500">Hastane verilerini analiz edin</p>
        </div>
      </div>

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

      <div className="mb-4">
        <label className="text-xs text-gray-500 mb-2 block">Departmanlar</label>
        <div className="flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button key={dept}
              onClick={() => setSelectedDepts(prev => prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept])}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDepts.includes(dept) ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-cyan-500/30'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-600 text-white text-sm font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2">
        <Play size={16} />
        Sorguyu Çalıştır
      </button>
    </GlowCard>
  );
};

const DataExplorer: React.FC = () => {
  const [expandedSource, setExpandedSource] = useState<string | null>('hbys');

  return (
    <GlowCard className="p-5 h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
          <Database size={18} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Veri Gezgini</h3>
          <p className="text-xs text-gray-500">Hastane sistemlerini inceleyin</p>
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
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center">
            <Network size={18} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">ZEKAI Çalışma Akışı</h3>
            <p className="text-xs text-gray-500">Akıllı karar ağacı sistemi</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LivePulse color="#06b6d4" />
          <span className="text-xs text-cyan-400">Aktif</span>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between gap-2">
          {[
            { icon: Users, label: 'Başhekim\nSorusu', step: 0, color: 'cyan' },
            { icon: Brain, label: 'LLM\nAnaliz', step: 1, color: 'purple' },
            { icon: AlertTriangle, label: 'Veri\nGerekli?', step: 2, color: 'amber' },
            { icon: Database, label: 'SQL\nSorgu', step: 3, color: 'cyan' },
            { icon: Sparkles, label: 'Zengin\nYanıt', step: 4, color: 'purple' },
            { icon: FileText, label: 'Sonuç\nRapor', step: 5, color: 'emerald' },
          ].map((item, idx) => (
            <React.Fragment key={idx}>
              <motion.div animate={{ scale: activeStep === item.step ? 1.05 : 1, opacity: activeStep === item.step ? 1 : 0.7 }}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  activeStep === item.step
                    ? `bg-${item.color}-500/20 border border-${item.color}-500/50`
                    : 'bg-white/5 border border-white/10'
                }`}
                style={{
                  backgroundColor: activeStep === item.step ? `var(--${item.color}-bg)` : undefined,
                  borderColor: activeStep === item.step ? `var(--${item.color}-border)` : undefined
                }}
              >
                <item.icon size={18} className={activeStep === item.step ? `text-${item.color}-400` : 'text-gray-500'} style={{ marginBottom: '4px' }} />
                <span className="text-[10px] text-center text-gray-400 whitespace-pre-line">{item.label}</span>
              </motion.div>
              {idx < 5 && <ChevronRight size={14} className="text-gray-600 flex-shrink-0" />}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500"
            animate={{ width: `${((activeStep + 1) / 6) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-gray-500">Son sorgu: "SGK ret analizi"</span>
          <span className="text-emerald-400">✓ 1.2s</span>
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
  const yLabels = ['Rinoplasti', 'Meme Estetiği', 'Yüz Germe', 'Liposuction', 'Botoks/Dolgu'];

  const getColor = (value: number): string => {
    const intensity = value / 100;
    return `rgba(6, 182, 212, ${0.15 + intensity * 0.85})`;
  };

  const maxCell = heatmapData.reduce((a, b) => a.value > b.value ? a : b);
  const minCell = heatmapData.filter(c => c.value > 0).reduce((a, b) => a.value < b.value ? a : b);

  return (
    <GlowCard className="p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
            <BarChart2 size={18} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Ameliyat Yoğunluk Haritası</h3>
            <p className="text-xs text-gray-500 hidden sm:block">Ameliyat Tipi × Gün analizi</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">Düşük</span>
          <div className="flex">
            {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
              <div key={i} className="w-3 sm:w-4 h-2 sm:h-3" style={{ backgroundColor: `rgba(6, 182, 212, ${opacity})` }} />
            ))}
          </div>
          <span className="text-[10px] text-gray-500">Yüksek</span>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex mb-1 pl-20 sm:pl-24 md:pl-28">
          {xLabels.map((label) => (
            <div key={label} className="flex-1 text-center text-[10px] sm:text-xs text-gray-400">{label}</div>
          ))}
        </div>
        <div className="space-y-1">
          {yLabels.map((yLabel) => (
            <div key={yLabel} className="flex items-center gap-1">
              <div className="w-20 sm:w-24 md:w-28 text-[10px] sm:text-xs text-gray-400 text-right pr-2 flex-shrink-0 truncate">{yLabel}</div>
              <div className="flex-1 flex gap-0.5 sm:gap-1">
                {xLabels.map((xLabel) => {
                  const cell = heatmapData.find(c => c.x === xLabel && c.y === yLabel);
                  const value = cell?.value || 0;
                  const isMax = xLabel === maxCell.x && yLabel === maxCell.y;
                  const isMin = value > 0 && xLabel === minCell.x && yLabel === minCell.y;
                  return (
                    <motion.div
                      key={`${xLabel}-${yLabel}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: yLabels.indexOf(yLabel) * 0.05 + xLabels.indexOf(xLabel) * 0.02 }}
                      className={`flex-1 aspect-[1.4] sm:aspect-[1.3] rounded sm:rounded-md flex items-center justify-center text-[9px] sm:text-[10px] md:text-xs font-medium transition-all hover:scale-105 cursor-default ${
                        isMax ? 'ring-2 ring-emerald-500' : isMin ? 'ring-2 ring-amber-500' : ''
                      }`}
                      style={{ backgroundColor: getColor(value) }}
                      title={`${yLabel} - ${xLabel}: ${value}`}
                    >
                      <span className={value > 50 ? 'text-white' : 'text-gray-400'}>{value || '-'}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-emerald-500/10">
          <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
          <span className="text-[9px] sm:text-[10px] text-emerald-400">En yüksek: {maxCell.y} - {maxCell.x} ({maxCell.value})</span>
        </div>
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-amber-500/10">
          <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
          <span className="text-[9px] sm:text-[10px] text-amber-400">Pazar: Ameliyat yok</span>
        </div>
      </div>
    </GlowCard>
  );
};

const FunnelChart: React.FC = () => {
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
            <h3 className="text-sm font-semibold text-white">Faturalama Hunisi</h3>
            <p className="text-xs text-gray-500 hidden sm:block">Ameliyat → SGK onay süreci</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-lg font-bold text-emerald-400">{funnelData[funnelData.length - 1].percentage}%</span>
            <span className="text-[10px] text-gray-500 block">Onay Oranı</span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-red-400">{totalLost.toLocaleString()}</span>
            <span className="text-[10px] text-gray-500 block">Ret/Bekleyen</span>
          </div>
        </div>
      </div>

      <div className="relative mb-4">
        {funnelData.map((item, index) => {
          const widthPercent = 30 + (item.percentage * 0.7);
          const conversionRate = index > 0 ? ((item.value / funnelData[index - 1].value) * 100).toFixed(0) : null;
          const isWorstDropOff = index > 0 && funnelData[index - 1].stage === biggestDropOff.from;
          const isLast = index === funnelData.length - 1;

          return (
            <motion.div key={item.stage} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="relative">
              <div className="flex items-center gap-3">
                <div className="w-24 sm:w-28 text-right flex-shrink-0">
                  <div className="text-[10px] sm:text-xs font-medium text-white truncate">{item.stage}</div>
                  <div className="text-[9px] text-gray-500">{item.value.toLocaleString()}</div>
                </div>
                <div className="flex-1 relative">
                  <div
                    className={`h-8 sm:h-10 rounded-md relative overflow-hidden transition-all ${isWorstDropOff ? 'ring-2 ring-amber-500/50' : ''}`}
                    style={{ width: `${widthPercent}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}80)` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent h-1/2" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-white drop-shadow-lg">{item.percentage}%</span>
                    </div>
                  </div>
                  {conversionRate && (
                    <div className={`absolute -top-4 left-1/4 flex items-center gap-1 ${isWorstDropOff ? 'text-amber-400' : 'text-gray-500'}`}>
                      <ChevronDown size={12} />
                      <span className="text-[9px] sm:text-[10px] font-medium">{conversionRate}%</span>
                      {isWorstDropOff && <AlertTriangle size={10} className="text-amber-400" />}
                    </div>
                  )}
                </div>
                <div className="w-14 sm:w-16 flex-shrink-0">
                  {isLast ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle size={14} className="text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-medium">Ödendi</span>
                    </div>
                  ) : (
                    <div className="text-[9px] text-gray-600">-{((funnelData[index].value - funnelData[index + 1].value) / 1000).toFixed(0)}K</div>
                  )}
                </div>
              </div>
              {!isLast && <div className="h-3 sm:h-4" />}
            </motion.div>
          );
        })}
      </div>

      <div className="pt-3 border-t border-white/5">
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-gradient-to-r from-amber-500/10 to-transparent border-l-2 border-amber-500">
          <AlertTriangle size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] sm:text-xs font-medium text-amber-400">Kritik nokta: </span>
            <span className="text-[10px] sm:text-xs text-gray-300">{biggestDropOff.from} → {biggestDropOff.to}</span>
            <span className="text-[10px] sm:text-xs text-gray-500 ml-1">(%{biggestDropOff.rate} kayıp)</span>
          </div>
        </div>
      </div>
    </GlowCard>
  );
};

const TrendLineChart: React.FC = () => {
  const firstSurgeries = trendData[0].surgeries;
  const lastSurgeries = trendData[trendData.length - 1].surgeries;
  const surgeryGrowth = ((lastSurgeries - firstSurgeries) / firstSurgeries * 100).toFixed(1);
  const firstRevenue = trendData[0].revenue;
  const lastRevenue = trendData[trendData.length - 1].revenue;
  const revenueGrowth = ((lastRevenue - firstRevenue) / firstRevenue * 100).toFixed(1);

  return (
    <GlowCard className="p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
            <LineChartIcon size={18} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Günlük Trend</h3>
            <p className="text-xs text-gray-500 hidden sm:block">12 günlük performans</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {[{ label: 'Ameliyat', color: '#06b6d4' }, { label: 'Gelir (₺K)', color: '#8b5cf6' }, { label: 'Hasta', color: '#10b981' }].map((item) => (
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
            contentStyle={{ backgroundColor: '#151d30', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 12, fontSize: 11 }}
            labelStyle={{ color: '#f8fafc', fontWeight: 600 }}
          />
          <Line yAxisId="left" type="monotone" dataKey="surgeries" stroke="#06b6d4" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="patients" stroke="#10b981" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-cyan-500/10">
          <TrendingUp size={12} className="text-cyan-400" />
          <span className="text-[9px] sm:text-[10px] text-cyan-400">Ameliyat: +{surgeryGrowth}%</span>
        </div>
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-purple-500/10">
          <DollarSign size={12} className="text-purple-400" />
          <span className="text-[9px] sm:text-[10px] text-purple-400">Gelir: +{revenueGrowth}%</span>
        </div>
        <span className="text-[9px] sm:text-[10px] text-gray-500 self-center ml-auto">1-12 Ocak</span>
      </div>
    </GlowCard>
  );
};

const DepartmentBarChart: React.FC = () => {
  const topDept = departmentData.reduce((a, b) => a.revenue > b.revenue ? a : b);
  const fastestGrowing = departmentData.reduce((a, b) => a.growth > b.growth ? a : b);
  const declining = departmentData.filter(c => c.growth < 0);
  const totalRevenue = departmentData.reduce((sum, c) => sum + c.revenue, 0);

  return (
    <GlowCard className="p-4 md:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
            <BarChart3 size={18} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Departman Performansı</h3>
            <p className="text-xs text-gray-500 hidden sm:block">Gelir karşılaştırması</p>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-0 sm:flex-col sm:text-right">
          <span className="text-lg font-bold text-white">₺{(totalRevenue / 1000).toFixed(1)}M</span>
          <span className="text-xs text-gray-500">Toplam Gelir</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={160} className="sm:!h-[175px]">
        <BarChart data={departmentData} layout="vertical" margin={{ left: -5, right: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
          <XAxis type="number" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} tickFormatter={(v) => `₺${v/1000}M`} />
          <YAxis type="category" dataKey="category" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} width={75} />
          <Tooltip
            contentStyle={{ backgroundColor: '#151d30', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 12, fontSize: 11 }}
            formatter={(value, _name, props) => {
              const numValue = typeof value === 'number' ? value : 0;
              const growth = (props?.payload as { growth?: number })?.growth ?? 0;
              return [`₺${numValue.toLocaleString()}K (${growth >= 0 ? '+' : ''}${growth}%)`, 'Gelir'];
            }}
          />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
            {departmentData.map((entry, index) => (
              <Cell key={index} fill={entry.growth >= 0 ? '#06b6d4' : '#ef4444'} fillOpacity={0.8} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
        <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-cyan-500/10">
          <Target size={12} className="text-cyan-400 flex-shrink-0" />
          <span className="text-[9px] sm:text-[10px] text-cyan-400">Lider: {topDept.category}</span>
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
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorgunuz hastane sistemleri üzerinde işleniyor. Lütfen bekleyin...' }]);
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
            style={{ background: 'linear-gradient(135deg, #0f1629 0%, #1a1f35 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain size={20} className="text-cyan-400" />
                <span className="text-sm font-semibold text-white">ZEKAI Asistan</span>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10"><X size={16} className="text-gray-400" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-white/5 text-gray-200'}`}>
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
                <button onClick={handleSend} className="px-4 py-2 bg-cyan-600 rounded-lg text-white"><Send size={16} /></button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ActionModal: React.FC<{ insight: typeof aiInsights[0] | null; onClose: () => void }> = ({ insight, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'complete'>('idle');

  const handleAction = () => {
    setStatus('processing');
    setTimeout(() => { setStatus('complete'); setTimeout(onClose, 1500); }, 2000);
  };

  if (!insight) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}
    >
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, #0f1629 0%, #1a1f35 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Zap size={20} className="text-cyan-400" />
          <div>
            <h3 className="text-lg font-semibold text-white">{insight.action}</h3>
            <p className="text-xs text-gray-500">{insight.title}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
          <p className="text-sm text-gray-300 mb-2">{insight.detail}</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>Etki: <span className="text-white">{insight.impact}</span></span>
            <span>Güven: <span className="text-cyan-400">{insight.confidence}%</span></span>
          </div>
        </div>
        {status === 'idle' && (
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 text-sm">İptal</button>
            <button onClick={handleAction} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-sm font-semibold">Onayla</button>
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

const ExecutiveDashboardPage: React.FC<{ onActionClick: (insight: typeof aiInsights[0]) => void; currentTime: Date }> = ({ onActionClick, currentTime }) => {
  const greeting = currentTime.getHours() < 12 ? 'Günaydın' : currentTime.getHours() < 18 ? 'İyi günler' : 'İyi akşamlar';

  return (
    <>
      {/* Mobile: Compact Daily Brief */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:hidden">
        <GlowCard className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-lg font-bold text-white mb-1">{greeting}, Prof. Dr. Yılmaz</h1>
              <p className="text-xs text-gray-400">{currentTime.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'short' })}</p>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              <Sparkles size={12} className="text-cyan-400" />
              <span className="text-[10px] font-medium text-cyan-400">AI</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-transparent border-l-3 border-cyan-500">
            <p className="text-sm text-white leading-relaxed">
              Dün <span className="text-emerald-400 font-semibold">12 ameliyat</span> başarıyla tamamlandı.
              <span className="text-amber-400 font-semibold"> 2 hayalet ekipman</span> uyarısı bekliyor.
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
                <h1 className="text-2xl font-bold text-white">{greeting}, Prof. Dr. Yılmaz</h1>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <Sparkles size={14} className="text-cyan-400" />
                  <span className="text-xs font-medium text-cyan-400">AI Özeti</span>
                </div>
              </div>
              <p className="text-base text-gray-400">{currentTime.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 transition-colors">
                <FileText size={16} />
                <span>Günlük Rapor</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-sm font-medium hover:opacity-90 transition-all">
                <Download size={16} />
                <span>PDF İndir</span>
              </button>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-transparent border-l-4 border-cyan-500">
            <p className="text-base text-white leading-relaxed">
              Dün plastik cerrahi departmanı <span className="text-emerald-400 font-semibold">12 ameliyat</span> ile hedefin %120'sine ulaştı.
              SGK onay oranı <span className="text-emerald-400 font-semibold">%95.8</span> seviyesinde.
              <span className="text-amber-400 font-semibold"> 2 hayalet ekipman</span> ve <span className="text-amber-400 font-semibold">1 yüksek ret riski</span> dikkatinizi bekliyor.
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
          <FileText size={16} />
          <span>Rapor</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-sm font-medium active:opacity-90">
          <Download size={16} />
          <span>İndir</span>
        </button>
      </div>

      {/* Mobile: AI Insights (Priority) */}
      <div className="md:hidden mb-4">
        <AIInsightsPanel onActionClick={onActionClick} />
      </div>

      {/* Mobile: Collapsible Sections */}
      <MobileCollapsibleSection title="Gelir Grafiği" icon={<Activity size={18} className="text-cyan-400" />} defaultOpen={true}>
        <RevenueChart />
      </MobileCollapsibleSection>

      <MobileCollapsibleSection title="Ameliyat Performansı" icon={<Scissors size={18} className="text-emerald-400" />} badge="5 Tip">
        <ProcedurePerformance />
      </MobileCollapsibleSection>

      <MobileCollapsibleSection title="Aylık Karşılaştırma" icon={<TrendingUp size={18} className="text-purple-400" />}>
        <MoMChangesTable />
      </MobileCollapsibleSection>

      <MobileCollapsibleSection title="Hastane Sistemleri" icon={<Database size={18} className="text-cyan-400" />} badge="4 Aktif">
        <DataSourcesPanel />
      </MobileCollapsibleSection>

      <MobileCollapsibleSection title="Sistem Durumu" icon={<Shield size={18} className="text-cyan-400" />}>
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
            <ProcedurePerformance />
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
      {/* Mobile: Compact Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 md:hidden">
        <GlowCard className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">ZEKAI Chat</h2>
                <div className="flex items-center gap-1.5">
                  <LivePulse />
                  <span className="text-[10px] text-emerald-400">Aktif</span>
                </div>
              </div>
            </div>
            <button onClick={() => setShowMobileTools(!showMobileTools)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 active:bg-white/10">
              <Database size={16} className="text-cyan-400" />
              <span className="text-xs text-gray-300">Araçlar</span>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${showMobileTools ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 rounded-lg bg-cyan-500/10">
              <div className="text-sm font-bold text-cyan-400">47</div>
              <div className="text-[9px] text-gray-500">Sorgu</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-emerald-500/10">
              <div className="text-sm font-bold text-emerald-400">96%</div>
              <div className="text-[9px] text-gray-500">Başarı</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-purple-500/10">
              <div className="text-sm font-bold text-purple-400">1.2s</div>
              <div className="text-[9px] text-gray-500">Ortalama</div>
            </div>
            <div className="text-center p-2 rounded-lg bg-amber-500/10">
              <div className="text-sm font-bold text-amber-400">2.1M</div>
              <div className="text-[9px] text-gray-500">Kayıt</div>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Mobile: Expandable Tools Panel */}
      <AnimatePresence>
        {showMobileTools && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden mb-4">
            <div className="space-y-3">
              <GlowCard className="p-3">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={14} className="text-gray-500" />
                  <span className="text-xs font-medium text-white">Son Sorgular</span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                  {['SGK ret analizi', 'Hayalet ekipman', 'Ameliyat prog.', 'Stok durumu'].map((query, i) => (
                    <button key={i} className="flex-shrink-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[11px] text-gray-300 active:bg-white/10">
                      {query}
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
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">ZEKAI - Hastane AI Asistanı</h2>
                <p className="text-sm text-gray-400">Doğal dil ile hastane verilerinizi sorgulayın</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <LivePulse />
                <div>
                  <span className="text-xs text-emerald-400 font-medium block">Model Aktif</span>
                  <span className="text-[10px] text-gray-500">ZEKAI v2.4</span>
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <Database size={14} className="text-cyan-400" />
                <div>
                  <span className="text-xs text-cyan-400 font-medium block">2.1M Kayıt</span>
                  <span className="text-[10px] text-gray-500">4 sistem</span>
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
              {['SGK ret oranı analizi', 'Hayalet ekipman raporu', 'Yarınki ameliyat prog.', 'Plastik cerrahi performansı'].map((query, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-colors">
                  <span className="text-xs text-gray-400 truncate">{query}</span>
                  <span className="text-[10px] text-gray-600 flex-shrink-0 ml-2">{i + 1} dk önce</span>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </div>
  );
};

const GraphicsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('weekly');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [mobileChartIndex, setMobileChartIndex] = useState(0);
  const chartScrollRef = useRef<HTMLDivElement>(null);

  const departments = ['all', 'Plastik Cerrahi', 'Genel Cerrahi', 'Ortopedi', 'KBB'];
  const chartLabels = ['Yoğunluk', 'Huni', 'Trend', 'Departman'];

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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                <BarChart2 size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Grafikler</h2>
                <p className="text-[10px] text-gray-500">4 görsel analiz</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 active:opacity-80">
              <Download size={14} className="text-cyan-400" />
              <span className="text-xs text-cyan-400">PDF</span>
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
            <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="text-[10px] text-gray-500 block">Onay</span>
              <span className="text-xs font-semibold text-emerald-400">%70.2</span>
            </div>
            <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] text-gray-500 block">Hayalet</span>
              <span className="text-xs font-semibold text-amber-400">3 adet</span>
            </div>
            <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <span className="text-[10px] text-gray-500 block">Lider</span>
              <span className="text-xs font-semibold text-cyan-400">Plastik</span>
            </div>
          </div>
        </GlowCard>
      </motion.div>

      {/* Desktop: Full Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="hidden md:block">
        <GlowCard className="p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                <BarChart2 size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Hastane Analitik Grafikleri</h2>
                <p className="text-sm text-gray-400">Stratejik karar destek görselleri</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-xs text-gray-500 block">SGK Onay</span>
                <span className="text-sm font-semibold text-emerald-400">%70.2</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-xs text-gray-500 block">Hayalet Ekipman</span>
                <span className="text-sm font-semibold text-amber-400">3 adet</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-xs text-gray-500 block">Lider Dept.</span>
                <span className="text-sm font-semibold text-cyan-400">Plastik Cerrahi</span>
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
                timeRange === range ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-white/5 text-gray-400 border border-white/10'
              }`}>
              {range === 'daily' ? 'Günlük' : range === 'weekly' ? 'Haftalık' : 'Aylık'}
            </button>
          ))}
          <div className="w-px bg-white/10 mx-1" />
          {departments.slice(0, 3).map((dept) => (
            <button key={dept} onClick={() => setSelectedDept(dept)}
              className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedDept === dept ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'bg-white/5 text-gray-400 border border-white/10'
              }`}>
              {dept === 'all' ? 'Tümü' : dept}
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
                    timeRange === range ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}>
                  {range === 'daily' ? 'Günlük' : range === 'weekly' ? 'Haftalık' : 'Aylık'}
                </button>
              ))}
            </div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Departman:</span>
            <div className="flex gap-2 flex-wrap">
              {departments.map((dept) => (
                <button key={dept} onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedDept === dept ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}>
                  {dept === 'all' ? 'Tümü' : dept}
                </button>
              ))}
            </div>
          </div>
          <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 text-cyan-400 text-xs hover:from-cyan-500/30 hover:to-teal-500/30 transition-all">
            <Download size={14} />
            <span>PDF Rapor İndir</span>
          </button>
        </div>
      </GlowCard>

      {/* Mobile: Swipeable Chart Carousel */}
      <div className="md:hidden">
        <div className="flex justify-center gap-2 mb-3">
          {chartLabels.map((label, i) => (
            <button key={label}
              onClick={() => { if (chartScrollRef.current) { chartScrollRef.current.scrollTo({ left: i * chartScrollRef.current.offsetWidth, behavior: 'smooth' }); }}}
              className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${mobileChartIndex === i ? 'bg-cyan-500 text-white' : 'bg-white/5 text-gray-400'}`}>
              {label}
            </button>
          ))}
        </div>

        <div ref={chartScrollRef} onScroll={handleChartScroll}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4" style={{ scrollbarWidth: 'none' }}>
          <div className="flex-shrink-0 w-full snap-start"><Heatmap /></div>
          <div className="flex-shrink-0 w-full snap-start"><FunnelChart /></div>
          <div className="flex-shrink-0 w-full snap-start"><TrendLineChart /></div>
          <div className="flex-shrink-0 w-full snap-start"><DepartmentBarChart /></div>
        </div>

        <div className="flex justify-center gap-1.5 mt-2">
          {chartLabels.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === mobileChartIndex ? 'w-6 bg-cyan-500' : 'w-1.5 bg-white/20'}`} />
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
        <DepartmentBarChart />
      </div>

      {/* Mobile: Compact AI Insights */}
      <div className="md:hidden">
        <GlowCard className="p-3" glowColor="rgba(139, 92, 246, 0.1)">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-purple-400" />
            <span className="text-sm font-semibold text-white">AI Grafik Analizi</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5">
              <TrendingUp size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300">Rinoplasti Cuma günleri %95 yoğunlukla zirve</p>
            </div>
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5">
              <AlertTriangle size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-300">SUT Kodu aşamasında %8 kayıp</p>
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
            <p className="text-sm text-gray-300">Rinoplasti ameliyatları Cuma günleri %95 yoğunluk ile zirve yapıyor. Ek kaynak planlaması önerilir.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={14} className="text-amber-400" />
              <span className="text-xs font-medium text-amber-400">Dikkat</span>
            </div>
            <p className="text-sm text-gray-300">Faturalama hunisinde "SUT Kodu Girildi" aşamasında %8 kayıp var. Otomasyon önerilir.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Target size={14} className="text-cyan-400" />
              <span className="text-xs font-medium text-cyan-400">Öneri</span>
            </div>
            <p className="text-sm text-gray-300">Göz departmanı %22.4 büyüme ile en hızlı büyüyen birim. Kapasite artışı değerlendirilmeli.</p>
          </div>
        </div>
      </GlowCard>
    </div>
  );
};

// ============================================================================
// MAIN DASHBOARD
// ============================================================================

export default function CerrahpasaDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardPage>('executive');
  const [aiChatOpen, setAIChatOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<typeof aiInsights[0] | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-cyan-500/5 rounded-full blur-[100px] sm:blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] bg-teal-500/5 rounded-full blur-[100px] sm:blur-[150px]" />
      </div>

      <Header onAIClick={() => setAIChatOpen(true)} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main content */}
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
          className="hidden md:flex flex-row items-center justify-between py-4 border-t border-white/5 mt-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield size={14} className="text-emerald-400" />
              <span className="text-xs text-gray-500">Sistemler aktif</span>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-cyan-400" />
              <span className="text-xs text-gray-500">4 kaynak bağlı</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch size={14} className="text-purple-400" />
              <span className="text-xs text-gray-500">ZEKAI v2.4.1</span>
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
