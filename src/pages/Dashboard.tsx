import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
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
  AlertCircle,
  Search,
  Send,
  BarChart3,
  Activity,
  Users,
  Package,
  DollarSign,
  Download,
  Brain,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Target,
  Calendar,
  Mail,
  Lightbulb,
  ChevronRight,
  Sparkles,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sun,
  Coffee,
  Menu,
  X
} from 'lucide-react';
import SEO from '../components/SEO';

// Data
const revenueData = [
  { ay: 'Oca', gerceklesen: 4200, tahmin: null, hedef: 4000 },
  { ay: 'Şub', gerceklesen: 4650, tahmin: null, hedef: 4200 },
  { ay: 'Mar', gerceklesen: 5100, tahmin: null, hedef: 4400 },
  { ay: 'Nis', gerceklesen: 4850, tahmin: null, hedef: 4600 },
  { ay: 'May', gerceklesen: 5400, tahmin: null, hedef: 4800 },
  { ay: 'Haz', gerceklesen: 6100, tahmin: null, hedef: 5000 },
  { ay: 'Tem', gerceklesen: 5750, tahmin: null, hedef: 5200 },
  { ay: 'Ağu', gerceklesen: 6400, tahmin: 6400, hedef: 5400 },
  { ay: 'Eyl', gerceklesen: null, tahmin: 6850, hedef: 5600 },
  { ay: 'Eki', gerceklesen: null, tahmin: 7300, hedef: 5800 },
];

const dailyBrief = {
  greeting: 'Günaydın, Emre',
  date: '8 Ocak 2026, Perşembe',
  summary: 'Dün genel performans beklentilerin %8 üzerinde gerçekleşti. 2 kritik durum dikkatinizi bekliyor.',
  kpiSummary: {
    ciro: { value: '₺847K', change: '+12%', status: 'up' },
    siparis: { value: '68', change: '+8%', status: 'up' },
    musteri: { value: '12', change: '+3', status: 'up' },
  },
  insights: [
    { type: 'success', icon: TrendingUp, title: 'Marmara Bölgesi Rekor', detail: 'Günlük satış ₺1.2M ile yeni rekor kırdı. Geçen haftaya göre %15 artış.' },
    { type: 'danger', icon: TrendingDown, title: 'İç Anadolu Düşüşte', detail: 'Son 7 günde %23 satış düşüşü. Normal sapmanın 3.2x üzerinde.' },
    { type: 'warning', icon: AlertTriangle, title: 'Stok Uyarısı', detail: 'Premium Widget A 4 gün içinde tükenecek. 45 adet kaldı.' },
  ],
  actions: [
    { priority: 'high', text: 'Premium Widget A için acil sipariş ver', dept: 'Tedarik', impact: '₺340K risk' },
    { priority: 'medium', text: 'İç Anadolu bölge analizi yap', dept: 'Satış', impact: 'Trend analizi' },
  ]
};

const alerts = [
  { id: 1, severity: 'critical', title: 'Stok Kritik Seviyede', message: 'Premium Widget A stoğu 45 adete düştü. Tahmini tükenme: 4 gün.', time: '35 dk', action: 'Sipariş Ver', aiSuggestion: 'ABC Ltd.\'den 250 adet acil sipariş' },
  { id: 2, severity: 'critical', title: 'Satış Anomalisi Tespit Edildi', message: 'İç Anadolu bölgesinde son 7 günde %23 satış düşüşü. Normal sapmanın 3.2σ üzerinde.', time: '2 sa', action: 'Analiz Et', aiSuggestion: 'Bölge müdürüyle acil görüşme' },
  { id: 3, severity: 'warning', title: 'Yüksek Talep Tahmini', message: 'Economy Widget C talebinde önümüzdeki 2 haftada %35 artış öngörülüyor.', time: '4 sa', action: 'Planla', aiSuggestion: 'Üretim kapasitesini %20 artır' },
];

const performanceMetrics = [
  { label: 'Satış Hedefi', current: 87, target: 100, unit: '%' },
  { label: 'Müşteri Memnuniyeti', current: 94, target: 90, unit: '%' },
  { label: 'Teslimat Performansı', current: 96, target: 95, unit: '%' },
  { label: 'Stok Optimizasyonu', current: 78, target: 85, unit: '%' },
];

const topProducts = [
  { name: 'Premium Widget A', revenue: '₺2.45M', growth: '+15%', status: 'up' },
  { name: 'Standard Widget B', revenue: '₺1.89M', growth: '+8%', status: 'up' },
  { name: 'Economy Widget C', revenue: '₺1.56M', growth: '-3%', status: 'down' },
  { name: 'Deluxe Widget D', revenue: '₺1.35M', growth: '+22%', status: 'up' },
];

const regionalData = [
  { region: 'Marmara', value: 42, revenue: '₺8.4M', change: '+15%' },
  { region: 'Ege', value: 18, revenue: '₺3.6M', change: '+8%' },
  { region: 'İç Anadolu', value: 14, revenue: '₺2.8M', change: '-12%' },
  { region: 'Akdeniz', value: 12, revenue: '₺2.4M', change: '+6%' },
  { region: 'Diğer', value: 14, revenue: '₺2.6M', change: '+4%' },
];

// Mobile Sidebar Component
const MobileSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}> = ({ isOpen, onClose, activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'ai', icon: Brain, label: 'AI Asistan' },
    { id: 'analytics', icon: BarChart3, label: 'Analitik' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0a0f1a] border-r border-[#1e293b] z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>

          {/* Logo */}
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-8">
            <span className="text-xl font-bold text-white">C</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  onClose();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  activeView === item.id
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-gray-400 hover:bg-white/5'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Alert Badge */}
          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-red-500" />
              <div>
                <div className="text-sm font-semibold text-white">3 Uyarı</div>
                <div className="text-xs text-gray-400">Dikkat gerekiyor</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Desktop Sidebar Component
const Sidebar: React.FC<{ activeView: string; setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'ai', icon: Brain, label: 'AI Asistan' },
    { id: 'analytics', icon: BarChart3, label: 'Analitik' },
  ];

  return (
    <aside className="hidden lg:flex w-18 bg-[#0a0f1a] border-r border-[#1e293b] flex-col items-center py-5 sticky top-0 h-screen">
      {/* Logo */}
      <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/25">
        <span className="text-lg font-bold text-white">C</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            title={item.label}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
              activeView === item.id
                ? 'bg-indigo-500/10 text-indigo-400'
                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
            }`}
          >
            <item.icon size={22} />
          </button>
        ))}
      </nav>

      {/* Alert Badge */}
      <div className="mt-auto mb-4">
        <div className="relative w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
          <Bell size={20} className="text-red-500" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </div>
      </div>
    </aside>
  );
};

// Header Component
const Header: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 lg:h-18 bg-[#0a0f1a] border-b border-[#1e293b] flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <Menu size={24} />
        </button>

        <div>
          <h1 className="text-base lg:text-xl font-semibold text-white tracking-tight">
            Cognia Platform
          </h1>
          <p className="hidden sm:block text-xs text-gray-500">Enterprise Data Intelligence</p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          <span className="text-xs font-medium text-emerald-500">5 sistem bağlı</span>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        {/* Search - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#0f1629] border border-[#1e293b] rounded-lg w-64">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="Ara veya AI'ya sor..."
            className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-600"
          />
          <span className="text-xs text-gray-600 bg-[#0a0f1a] px-2 py-0.5 rounded">⌘K</span>
        </div>

        {/* Time */}
        <div className="hidden sm:block text-right min-w-20">
          <div className="text-sm lg:text-base font-semibold text-white font-mono">
            {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xs text-gray-500">
            {time.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-2 bg-[#0f1629] rounded-lg cursor-pointer hover:bg-[#151d30] transition-colors">
          <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-sm font-semibold text-white">
            EB
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-medium text-white">Emre B.</div>
            <div className="text-xs text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Daily Brief Hero Component
const DailyBriefHero: React.FC = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Günaydın' : hour < 18 ? 'İyi günler' : 'İyi akşamlar';
  const Icon = hour < 12 ? Coffee : hour < 18 ? Sun : Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#0f1629] to-[#151d30] rounded-2xl border border-[#1e293b] overflow-hidden"
    >
      {/* Hero Header */}
      <div className="p-5 lg:p-7 border-b border-[#1e293b] bg-gradient-to-r from-indigo-500/5 to-transparent">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Icon size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl lg:text-2xl font-semibold text-white tracking-tight">
                  {greeting}, Emre
                </h2>
                <p className="text-sm text-gray-400">{dailyBrief.date}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0f1a] border border-[#1e293b] rounded-lg text-gray-400 text-sm font-medium hover:bg-[#0f1629] transition-colors">
              <Mail size={16} />
              <span className="hidden sm:inline">E-posta</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0f1a] border border-[#1e293b] rounded-lg text-gray-400 text-sm font-medium hover:bg-[#0f1629] transition-colors">
              <Download size={16} />
              <span className="hidden sm:inline">PDF</span>
            </button>
          </div>
        </div>

        {/* AI Summary */}
        <div className="mt-5 p-4 bg-indigo-500/8 border-l-4 border-indigo-500 rounded-lg flex gap-3">
          <Sparkles size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-indigo-400 mb-1.5 uppercase tracking-wide">
              AI Günlük Özeti
            </div>
            <p className="text-sm lg:text-base text-white leading-relaxed">
              {dailyBrief.summary}
            </p>
          </div>
        </div>

        {/* Quick KPIs */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          {[
            { label: 'Dünkü Ciro', ...dailyBrief.kpiSummary.ciro },
            { label: 'Sipariş', ...dailyBrief.kpiSummary.siparis },
            { label: 'Yeni Müşteri', ...dailyBrief.kpiSummary.musteri },
          ].map((kpi, i) => (
            <div key={i} className="bg-[#0a0f1a]/50 rounded-lg p-3 lg:p-4">
              <div className="text-xs text-gray-500 mb-1">{kpi.label}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg lg:text-2xl font-bold text-white">{kpi.value}</span>
                <span className={`text-xs lg:text-sm font-semibold flex items-center gap-1 ${
                  kpi.status === 'up' ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {kpi.status === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {kpi.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights & Actions */}
      <div className="grid lg:grid-cols-[1.2fr,1fr] border-t border-[#1e293b]">
        {/* Insights */}
        <div className="p-5 lg:p-7 border-b lg:border-b-0 lg:border-r border-[#1e293b]">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Öne Çıkanlar
          </h3>
          <div className="flex flex-col gap-3">
            {dailyBrief.insights.map((insight, i) => (
              <div key={i} className="flex gap-3 p-3 lg:p-4 bg-[#0a0f1a] border border-[#1e293b] rounded-lg">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  insight.type === 'success' ? 'bg-emerald-500/10' :
                  insight.type === 'danger' ? 'bg-red-500/10' : 'bg-amber-500/10'
                }`}>
                  <insight.icon size={18} className={
                    insight.type === 'success' ? 'text-emerald-500' :
                    insight.type === 'danger' ? 'text-red-500' : 'text-amber-500'
                  } />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white mb-1">{insight.title}</div>
                  <div className="text-xs lg:text-sm text-gray-400 leading-relaxed">{insight.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-5 lg:p-7">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Önerilen Aksiyonlar
          </h3>
          <div className="flex flex-col gap-3">
            {dailyBrief.actions.map((action, i) => (
              <div key={i} className={`p-4 bg-[#0a0f1a] rounded-lg border ${
                action.priority === 'high' ? 'border-red-500/40' : 'border-[#1e293b]'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      action.priority === 'high' ? 'bg-red-500' : 'bg-amber-500'
                    }`} />
                    <span className={`text-xs font-semibold uppercase tracking-wide ${
                      action.priority === 'high' ? 'text-red-500' : 'text-amber-500'
                    }`}>
                      {action.priority === 'high' ? 'Yüksek Öncelik' : 'Orta Öncelik'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">{action.dept}</span>
                </div>
                <div className="text-sm font-medium text-white mb-3">{action.text}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Etki: {action.impact}</span>
                  <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    action.priority === 'high'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'border border-[#1e293b] text-gray-400 hover:bg-white/5'
                  }`}>
                    Başlat
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// KPI Card Component
const KPICard: React.FC<{
  label: string;
  value: string;
  change: string;
  changeType: string;
  target?: string;
  icon: any;
}> = ({ label, value, change, changeType, target, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-4 lg:p-6"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-11 h-11 bg-indigo-500/10 rounded-xl flex items-center justify-center">
        <Icon size={22} className="text-indigo-400" />
      </div>
      <div className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${
        changeType === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
      }`}>
        {changeType === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
    <div className="text-sm text-gray-400 mb-3">{label}</div>
    {target && (
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0a0f1a] rounded-lg">
        <Target size={14} className="text-emerald-500" />
        <span className="text-xs text-gray-500">Hedef: {target}</span>
        <CheckCircle2 size={14} className="text-emerald-500 ml-auto" />
      </div>
    )}
  </motion.div>
);

// Alert Card Component
const AlertCard: React.FC<{ alert: any }> = ({ alert }) => {
  const styles = {
    critical: { bg: 'bg-red-500/10', border: 'border-red-500', color: 'text-red-500', label: 'KRİTİK', icon: AlertCircle },
    warning: { bg: 'bg-amber-500/10', border: 'border-amber-500', color: 'text-amber-500', label: 'UYARI', icon: AlertTriangle },
    info: { bg: 'bg-cyan-500/10', border: 'border-cyan-500', color: 'text-cyan-500', label: 'BİLGİ', icon: Bell },
  };
  const s = styles[alert.severity as keyof typeof styles] || styles.warning;
  const IconComponent = s.icon;

  return (
    <div className={`${s.bg} border-l-4 ${s.border} rounded-r-xl p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <IconComponent size={14} className={s.color} />
          <span className={`text-xs font-bold ${s.color} tracking-wide`}>{s.label}</span>
          <span className="text-xs text-gray-500">• {alert.time} önce</span>
        </div>
        <button className="opacity-50 hover:opacity-100">
          <XCircle size={14} className="text-gray-500" />
        </button>
      </div>
      <div className="text-sm font-semibold text-white mb-2">{alert.title}</div>
      <div className="text-xs lg:text-sm text-gray-400 mb-3 leading-relaxed">{alert.message}</div>
      {alert.aiSuggestion && (
        <div className="flex items-center gap-2 p-2 bg-indigo-500/10 rounded-lg mb-3">
          <Sparkles size={12} className="text-indigo-400" />
          <span className="text-xs text-indigo-400 font-medium">AI Önerisi: {alert.aiSuggestion}</span>
        </div>
      )}
      <div className="flex gap-2">
        <button className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
          alert.severity === 'critical'
            ? `${s.border.replace('border-', 'bg-')} text-white`
            : 'bg-white/10 text-white'
        }`}>
          {alert.action}
          <ChevronRight size={14} />
        </button>
        <button className="px-3 py-2 border border-[#1e293b] rounded-lg text-xs font-medium text-gray-400 hover:bg-white/5 transition-colors">
          Sonra
        </button>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar: React.FC<{ label: string; current: number; target: number; unit: string }> = ({
  label,
  current,
  target,
  unit,
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isOnTarget = current >= target;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-xs lg:text-sm text-gray-400">{label}</span>
        <span className={`text-xs lg:text-sm font-semibold ${isOnTarget ? 'text-emerald-500' : 'text-white'}`}>
          {current}{unit} / {target}{unit}
        </span>
      </div>
      <div className="h-1.5 bg-[#0a0f1a] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isOnTarget ? 'bg-emerald-500' : percentage > 70 ? 'bg-indigo-500' : 'bg-amber-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Dashboard View
const DashboardView: React.FC = () => (
  <div className="p-4 lg:p-7 flex flex-col gap-5 lg:gap-6">
    {/* Daily Brief Hero */}
    <DailyBriefHero />

    {/* KPIs Row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      <KPICard label="Toplam Gelir" value="₺24.8M" change="+12.5%" changeType="up" target="₺23M" icon={DollarSign} />
      <KPICard label="Sipariş Sayısı" value="1,847" change="+8.2%" changeType="up" target="1,600" icon={Package} />
      <KPICard label="Aktif Müşteri" value="12,459" change="+5.7%" changeType="up" target="12,000" icon={Users} />
      <KPICard label="Ort. Sipariş" value="₺13.4K" change="-2.1%" changeType="down" icon={TrendingUp} />
    </div>

    {/* Main Grid */}
    <div className="grid lg:grid-cols-[2fr,1fr] gap-5">
      {/* Revenue Chart */}
      <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <div>
            <h3 className="text-base lg:text-lg font-semibold text-white">Gelir & AI Tahmini</h3>
            <p className="text-xs lg:text-sm text-gray-400 mt-1">Aylık performans ve 3 aylık projeksiyon</p>
          </div>
          <div className="flex gap-4 text-xs">
            {[
              { label: 'Gerçekleşen', color: 'bg-indigo-500' },
              { label: 'AI Tahmini', color: 'bg-indigo-400', dashed: true },
              { label: 'Hedef', color: 'bg-emerald-500', dashed: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-4 h-1 ${item.color} rounded ${item.dashed ? 'opacity-60' : ''}`} />
                <span className="text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={revenueData}>
            <defs>
              <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="ay" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v / 1000}K`} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#151d30',
                border: '1px solid #1e293b',
                borderRadius: 10,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: '#f8fafc', fontWeight: 600, marginBottom: 4 }}
              formatter={(value: any, name: string) => [
                value ? `₺${value.toLocaleString()}K` : '-',
                name === 'gerceklesen' ? 'Gerçekleşen' : name === 'tahmin' ? 'AI Tahmini' : 'Hedef',
              ]}
            />
            <Area type="monotone" dataKey="gerceklesen" stroke="#6366f1" strokeWidth={2.5} fill="url(#gradientArea)" />
            <Line type="monotone" dataKey="tahmin" stroke="#818cf8" strokeWidth={2.5} strokeDasharray="6 4" dot={{ fill: '#818cf8', r: 4 }} />
            <Line type="monotone" dataKey="hedef" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" dot={false} opacity={0.5} />
          </ComposedChart>
        </ResponsiveContainer>

        <div className="mt-4 p-3 bg-indigo-500/5 rounded-xl flex items-center gap-3">
          <Lightbulb size={18} className="text-indigo-400 flex-shrink-0" />
          <span className="text-xs lg:text-sm text-gray-400">
            <strong className="text-white">AI Tahmini:</strong> Eylül-Ekim döneminde %18 büyüme öngörülüyor. Model güveni: %94
          </span>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-5">
        {/* Alerts */}
        <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-4 lg:p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-white">Aktif Uyarılar</h3>
            <span className="px-2.5 py-1 bg-red-500/10 rounded-lg text-xs font-semibold text-red-500">
              3 yeni
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-4 lg:p-5">
          <h3 className="text-base font-semibold text-white mb-5">Hedef Durumu</h3>
          {performanceMetrics.map((m, i) => (
            <ProgressBar key={i} {...m} />
          ))}
        </div>
      </div>
    </div>

    {/* Bottom Row */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* Top Products */}
      <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-4 lg:p-6">
        <h3 className="text-base font-semibold text-white mb-5">En İyi Ürünler</h3>
        <div className="flex flex-col gap-3">
          {topProducts.map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#0a0f1a] rounded-xl">
              <span className="text-sm font-semibold text-gray-500 w-6">{i + 1}</span>
              <span className="text-sm font-medium text-white flex-1 truncate">{p.name}</span>
              <span className="text-sm font-semibold text-white">{p.revenue}</span>
              <span className={`text-sm font-semibold ${p.status === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {p.growth}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Activity Feed */}
      <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-4 lg:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-semibold text-white">Canlı Aktivite</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-500">Canlı</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { time: '14:23:45', event: 'Yeni sipariş alındı', source: 'ERP', type: 'success' },
            { time: '14:22:18', event: 'Stok güncellendi', source: 'Depo', type: 'info' },
            { time: '14:21:02', event: 'AI raporu oluşturuldu', source: 'AI', type: 'primary' },
            { time: '14:19:33', event: 'Ödeme onaylandı', source: 'Finans', type: 'success' },
            { time: '14:17:55', event: 'Anomali tespit edildi', source: 'ML', type: 'warning' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 p-2.5 bg-[#0a0f1a] rounded-lg border-l-2 ${
              item.type === 'success' ? 'border-emerald-500' :
              item.type === 'warning' ? 'border-amber-500' :
              item.type === 'primary' ? 'border-indigo-500' : 'border-cyan-500'
            }`}>
              <span className="text-xs font-mono text-gray-500 flex-shrink-0">{item.time}</span>
              <span className="text-xs text-white flex-1 truncate">{item.event}</span>
              <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                item.type === 'primary' ? 'bg-indigo-500/10 text-indigo-400' :
                item.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                item.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-cyan-500/10 text-cyan-500'
              }`}>
                {item.source}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources Panel */}
      <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-4 lg:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-base font-semibold text-white">Veri Kaynakları</h3>
          <span className="text-xs px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg font-semibold">
            5 Aktif
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { name: 'ERP Sistemi', latency: '12ms', records: '2.4M' },
            { name: 'CRM Veritabanı', latency: '8ms', records: '856K' },
            { name: 'Finans Modülü', latency: '15ms', records: '3.1M' },
            { name: 'Lojistik API', latency: '23ms', records: '1.2M' },
            { name: 'E-Ticaret', latency: '18ms', records: '428K' },
          ].map((source, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 bg-[#0a0f1a] rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
              <span className="text-xs text-white flex-1 truncate">{source.name}</span>
              <span className="text-xs text-gray-500 font-mono">{source.latency}</span>
              <span className="text-xs text-gray-400 font-medium">{source.records}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-indigo-500/10 rounded-lg flex justify-between items-center">
          <span className="text-xs text-gray-400">Toplam Kayıt</span>
          <span className="text-base font-bold text-indigo-400">7.9M</span>
        </div>
      </div>
    </div>

    {/* Regional Distribution */}
    <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
        <h3 className="text-base font-semibold text-white">Bölgesel Performans</h3>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-indigo-500 rounded" />
            <span className="text-gray-500">Bu Ay</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 bg-gray-600 rounded opacity-40" />
            <span className="text-gray-500">Geçen Ay</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {regionalData.map((r, i) => (
          <div key={i} className="p-4 bg-[#0a0f1a] rounded-xl text-center">
            <div className="text-xs text-gray-400 mb-2">{r.region}</div>
            <div className="text-xl font-bold text-white mb-1">{r.revenue}</div>
            <div className={`text-sm font-semibold flex items-center justify-center gap-1 mb-3 ${
              r.change.startsWith('-') ? 'text-red-500' : 'text-emerald-500'
            }`}>
              {r.change.startsWith('-') ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
              {r.change}
            </div>
            <div className="h-1.5 bg-[#05080f] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${r.change.startsWith('-') ? 'bg-red-500' : 'bg-indigo-500'}`}
                style={{ width: `${r.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Truncated for length - AIView and AnalyticsView would follow with similar mobile optimizations

export default function Dashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#05080f] text-white font-sans">
      <SEO page="dashboard" />

      <div className="flex h-screen overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <MobileSidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          activeView={activeView}
          setActiveView={setActiveView}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onMenuClick={() => setMobileMenuOpen(true)} />
          <main className="flex-1 overflow-y-auto bg-[#0a0f1a]">
            {activeView === 'dashboard' && <DashboardView />}
            {activeView === 'ai' && <div className="p-8 text-center text-gray-400">AI View - Coming Soon</div>}
            {activeView === 'analytics' && <div className="p-8 text-center text-gray-400">Analytics View - Coming Soon</div>}
          </main>
        </div>
      </div>
    </div>
  );
}
