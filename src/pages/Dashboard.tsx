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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#0a0f1a] border-r border-[#1e293b] z-50 transform transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>

          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-8">
            <span className="text-xl font-bold text-white">C</span>
          </div>

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
      <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/25">
        <span className="text-lg font-bold text-white">C</span>
      </div>

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
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#0f1629] border border-[#1e293b] rounded-lg w-64">
          <Search size={16} className="text-gray-500" />
          <input
            placeholder="Ara veya AI'ya sor..."
            className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-600"
          />
          <span className="text-xs text-gray-600 bg-[#0a0f1a] px-2 py-0.5 rounded">⌘K</span>
        </div>

        <div className="hidden sm:block text-right min-w-20">
          <div className="text-sm lg:text-base font-semibold text-white font-mono">
            {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-xs text-gray-500">
            {time.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
          </div>
        </div>

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

      <div className="grid lg:grid-cols-[1.2fr,1fr] border-t border-[#1e293b]">
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
    <DailyBriefHero />

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      <KPICard label="Toplam Gelir" value="₺24.8M" change="+12.5%" changeType="up" target="₺23M" icon={DollarSign} />
      <KPICard label="Sipariş Sayısı" value="1,847" change="+8.2%" changeType="up" target="1,600" icon={Package} />
      <KPICard label="Aktif Müşteri" value="12,459" change="+5.7%" changeType="up" target="12,000" icon={Users} />
      <KPICard label="Ort. Sipariş" value="₺13.4K" change="-2.1%" changeType="down" icon={TrendingUp} />
    </div>

    <div className="grid lg:grid-cols-[2fr,1fr] gap-5">
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

      <div className="flex flex-col gap-5">
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

        <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-4 lg:p-5">
          <h3 className="text-base font-semibold text-white mb-5">Hedef Durumu</h3>
          {performanceMetrics.map((m, i) => (
            <ProgressBar key={i} {...m} />
          ))}
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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

// AI View Component
const AIView: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Merhaba! Ben Cognia AI asistanınız. 5 veri kaynağına bağlıyım ve 7.9 milyon kayda erişimim var.\n\nBana Türkçe sorular sorabilirsiniz. Örneğin:\n• "Geçen aya göre en çok düşen ürünler hangileri?"\n• "Marmara bölgesi performansını özetle"\n• "Stok durumu kritik ürünleri listele"\n• "Önümüzdeki ay için satış tahmini"'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const dataSources = [
    { name: 'ERP Sistemi', records: '2.4M', status: 'active' },
    { name: 'CRM Veritabanı', records: '856K', status: 'active' },
    { name: 'Finans Modülü', records: '3.1M', status: 'active' },
    { name: 'Lojistik API', records: '1.2M', status: 'active' },
    { name: 'E-Ticaret', records: '428K', status: 'active' },
  ];

  const processingSteps = [
    { label: 'Veri kaynakları taranıyor', sources: ['ERP', 'CRM', 'Finans'] },
    { label: 'AI modeli çalıştırılıyor' },
    { label: 'Sonuçlar derleniyor' },
  ];

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;

    setMessages(prev => [...prev, { role: 'user', content: input }]);
    const query = input;
    setInput('');
    setIsProcessing(true);
    setProcessingStep(0);

    const stepInterval = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= processingSteps.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 600);

    setTimeout(() => {
      clearInterval(stepInterval);
      let response = '';

      if (query.toLowerCase().includes('düş') || query.toLowerCase().includes('geril')) {
        response = `## 📉 Satış Düşüşü Analizi

**Son 30 Günde En Çok Gerileyen Ürünler:**

| Sıra | Ürün | Düşüş | Ana Sebep |
|------|------|-------|-----------|
| 1 | Basic Widget E | -8.5% | Rakip fiyat indirimi |
| 2 | Deluxe Widget D | -3.2% | Mevsimsel düşüş |
| 3 | Standard Widget B | -1.2% | Tedarik gecikmesi |

**🔍 Kök Neden Analizi:**
- Basic Widget E: Rakip XYZ firması %15 indirim kampanyası başlattı
- Deluxe Widget D: Ocak ayı tarihsel olarak düşük talep dönemi

**💡 AI Önerisi:**
Basic Widget E için fiyat eşitleme veya değer odaklı kampanya önerilir. Tahmini etki: +₺125K/ay

*Güven skoru: %94 | 847K kayıt analiz edildi*`;
      } else if (query.toLowerCase().includes('marmara')) {
        response = `## 📊 Marmara Bölgesi Performans Raporu

**Genel Durum:** 🟢 Hedefin Üzerinde

### Temel Metrikler
| Metrik | Değer | vs Hedef | vs Geçen Ay |
|--------|-------|----------|-------------|
| Aylık Ciro | ₺8.42M | +5.2% | +15.2% |
| Sipariş Sayısı | 724 | +8% | +12.8% |
| Yeni Müşteri | 28 | +40% | +18% |
| Ort. Sipariş | ₺11.6K | -2% | +2.1% |

### Başarı Faktörleri
✅ İstanbul Avrupa: Kurumsal satışlar %34 arttı
✅ Kocaeli: Yeni lojistik merkezi teslimatı 1.2 güne düşürdü
✅ Bursa: Bölge müdürü değişikliği pozitif etki yarattı

**💡 AI Önerisi:**
Başarı modelini İç Anadolu'ya uyarlamak için bölge müdürleri arası bilgi transferi toplantısı düzenlenmeli.

*Güven skoru: %96 | 156K kayıt analiz edildi*`;
      } else if (query.toLowerCase().includes('stok')) {
        response = `## 📦 Stok Durumu Raporu

### 🔴 Kritik (Acil Aksiyon)
| Ürün | Stok | Günlük Satış | Tükenme |
|------|------|--------------|---------|
| Premium Widget A | 52 | 12.4 | **4.2 gün** |

### 🟢 Normal
- Standard Widget B: 324 adet (42 gün)
- Economy Widget C: 890 adet (28 gün)

**💡 AI Önerisi:**
1. Premium Widget A: 250 adet acil sipariş (ABC Ltd. - 3 gün teslimat)
2. Basic Widget E: %10 indirim kampanyası ile stok eritme

*Güven skoru: %98 | Gerçek zamanlı veri*`;
      } else {
        response = `Sorgunuz analiz edildi. "${query.slice(0, 50)}..." ile ilgili 5 veri kaynağından bilgi toplandı.

**Analiz Özeti:**
• 2.4M kayıt tarandı
• İlgili 847 veri noktası bulundu
• İstatistiksel anlamlılık: %92

Daha spesifik sonuçlar için lütfen:
• Belirli bir ürün veya kategori
• Tarih aralığı
• Bölge veya departman belirtin.

*Örnek: "Marmara bölgesi Ocak ayı satış performansı"*`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsProcessing(false);
    }, 2200);
  };

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-72px)] p-4 lg:p-7 gap-5">
      <div className="flex-1 bg-[#0f1629] border border-[#1e293b] rounded-2xl flex flex-col overflow-hidden min-h-[600px] lg:min-h-0">
        <div className="p-4 lg:p-5 border-b border-[#1e293b] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Brain size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-base lg:text-lg font-semibold text-white">Cognia AI</h2>
              <div className="text-xs lg:text-sm text-emerald-500 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Türkçe NLP aktif • 7.9M kayıt bağlı
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="lg:hidden px-3 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-sm font-medium"
          >
            {showSidebar ? 'Gizle' : 'Paneller'}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-full lg:max-w-3xl px-4 py-3 rounded-2xl text-sm lg:text-base whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-[#151d30] text-white rounded-bl-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="bg-[#151d30] rounded-2xl rounded-bl-sm p-5 max-w-full lg:max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-cyan-500">AI İşliyor</span>
              </div>
              {processingSteps.map((step, i) => {
                const isActive = i === processingStep;
                const isDone = i < processingStep;
                return (
                  <div key={i} className={`flex items-center gap-3 mb-3 ${isDone || isActive ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      isDone ? 'bg-emerald-500' : isActive ? 'bg-cyan-500' : 'border-2 border-gray-600'
                    }`}>
                      {isDone && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <span className={`text-xs lg:text-sm ${isDone ? 'text-emerald-500' : isActive ? 'text-white' : 'text-gray-500'}`}>
                      {step.label}
                    </span>
                    {step.sources && isActive && (
                      <div className="flex gap-2 ml-2">
                        {step.sources.map((s, j) => (
                          <span key={j} className="text-xs px-2 py-1 bg-cyan-500/10 text-cyan-500 rounded font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 lg:p-5 border-t border-[#1e293b]">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Türkçe soru sorun..."
              className="flex-1 px-4 py-3 bg-[#0a0f1a] border border-[#1e293b] rounded-xl text-white text-sm lg:text-base outline-none focus:border-indigo-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isProcessing}
              className="px-6 py-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl text-white font-semibold flex items-center gap-2 hover:from-indigo-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send size={18} />
              <span className="hidden sm:inline">Gönder</span>
            </button>
          </div>
        </div>
      </div>

      <div className={`w-full lg:w-80 space-y-5 max-h-[calc(100vh-8rem)] overflow-y-auto ${showSidebar ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Örnek Sorular</h3>
          <div className="space-y-2">
            {[
              'Geçen aya göre en çok düşen ürünler?',
              'Marmara bölgesi performansını özetle',
              'Stok durumu kritik ürünleri listele',
              'Önümüzdeki ay satış tahmini',
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="w-full text-left px-4 py-3 bg-[#0a0f1a] border border-[#1e293b] rounded-lg text-sm text-gray-400 hover:text-white hover:border-indigo-500 transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-white">Son Sorgular</h3>
            <Clock size={14} className="text-gray-500" />
          </div>
          <div className="space-y-2">
            {[
              { query: 'Q4 satış projeksiyonu', time: '2 saat önce', dept: 'Satış' },
              { query: 'Stok optimizasyonu', time: '5 saat önce', dept: 'Operasyon' },
              { query: 'Müşteri segmentasyonu', time: 'Dün', dept: 'Pazarlama' },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-[#0a0f1a] rounded-lg cursor-pointer hover:bg-[#151d30] transition-colors">
                <div className="text-sm text-white mb-1">{item.query}</div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{item.time}</span>
                  <span className="text-xs px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded font-medium">
                    {item.dept}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Bağlı Veri Kaynakları</h3>
          <div className="space-y-2.5">
            {dataSources.map((source, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 bg-[#0a0f1a] rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50" />
                <span className="text-sm text-white flex-1">{source.name}</span>
                <span className="text-xs text-gray-500 font-medium">{source.records}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg flex justify-between items-center">
            <span className="text-xs text-emerald-500">Toplam Kayıt</span>
            <span className="text-sm font-bold text-emerald-500">7.9M</span>
          </div>
        </div>

        <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">AI Yetenekleri</h3>
          <div className="space-y-3.5">
            {[
              { icon: AlertTriangle, label: 'Anomali Tespiti', desc: 'Beklenmedik değişimleri yakalar' },
              { icon: TrendingUp, label: 'Tahminleme', desc: 'Gelecek performansı öngörür' },
              { icon: FileText, label: 'Günlük Özet', desc: 'Her sabah yönetici briefingi' },
              { icon: Zap, label: 'Türkçe NLP', desc: 'Doğal dilde soru-cevap' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-9 h-9 bg-indigo-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Analytics View Component
const AnalyticsView: React.FC = () => {
  const trendData = [
    { week: 'H48', ciro: 5200, siparis: 412, oncekiYil: 4800 },
    { week: 'H49', ciro: 5650, siparis: 438, oncekiYil: 5100 },
    { week: 'H50', ciro: 5400, siparis: 425, oncekiYil: 4950 },
    { week: 'H51', ciro: 6100, siparis: 468, oncekiYil: 5400 },
    { week: 'H52', ciro: 5800, siparis: 445, oncekiYil: 5200 },
    { week: 'H1', ciro: 6200, siparis: 472, oncekiYil: 5500 },
    { week: 'H2', ciro: 6450, siparis: 485, oncekiYil: 5700 },
  ];

  const categoryComparison = [
    { name: 'Premium', buAy: 2450, gecenAy: 2126, change: 15.2 },
    { name: 'Standard', buAy: 1895, gecenAy: 1748, change: 8.4 },
    { name: 'Economy', buAy: 1562, gecenAy: 1272, change: 22.8 },
    { name: 'Deluxe', buAy: 1348, gecenAy: 1393, change: -3.2 },
    { name: 'Basic', buAy: 984, gecenAy: 1075, change: -8.5 },
  ];

  const aiInsights = [
    { type: 'trend', icon: TrendingUp, title: 'Büyüme Trendi', text: 'Economy Widget C son 4 haftada %22.8 büyüme gösterdi', confidence: 96 },
    { type: 'warning', icon: AlertTriangle, title: 'Düşüş Uyarısı', text: 'Basic Widget E satışları 3 haftadır geriliyor', confidence: 91 },
    { type: 'opportunity', icon: Lightbulb, title: 'Fırsat', text: 'Premium segmentte fiyat artışı için alan var', confidence: 87 },
  ];

  const productDetails = [
    { name: 'Premium Widget A', revenue: 2450000, units: 1247, change: 15.2, margin: 32.5, stock: 52, trend: [40, 42, 38, 45, 52, 48, 55] },
    { name: 'Standard Widget B', revenue: 1895000, units: 2156, change: 8.4, margin: 28.1, stock: 324, trend: [35, 38, 36, 40, 42, 41, 44] },
    { name: 'Economy Widget C', revenue: 1562000, units: 3892, change: 22.8, margin: 18.4, stock: 890, trend: [28, 32, 35, 38, 42, 48, 52] },
    { name: 'Deluxe Widget D', revenue: 1348000, units: 567, change: -3.2, margin: 41.2, stock: 156, trend: [48, 45, 44, 42, 40, 38, 36] },
    { name: 'Basic Widget E', revenue: 984000, units: 4521, change: -8.5, margin: 12.8, stock: 1240, trend: [42, 40, 38, 35, 32, 30, 28] },
  ];

  const MiniSparkline: React.FC<{ data: number[]; color: string; width?: number; height?: number }> = ({
    data,
    color,
    width = 80,
    height = 24
  }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');
    return (
      <svg width={width} height={height}>
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  return (
    <div className="p-4 lg:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-white">Analitik Dashboard</h2>
          <p className="text-sm text-gray-400 mt-1">Detaylı performans analizi ve AI öngörüleri</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0f1629] border border-[#1e293b] rounded-lg text-gray-400 text-sm hover:bg-[#151d30] transition-colors">
            <Calendar size={16} />
            <span className="hidden sm:inline">Son 8 Hafta</span>
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg text-white text-sm font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all">
            <Download size={16} />
            <span className="hidden sm:inline">Rapor İndir</span>
          </button>
        </div>
      </div>

      <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-indigo-500 rounded-xl flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <h3 className="text-base font-semibold text-white">AI Otomatik Tespitler</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {aiInsights.map((insight, i) => (
            <div key={i} className="p-4 bg-[#0a0f1a] border border-[#1e293b] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <insight.icon size={18} className={
                  insight.type === 'trend' ? 'text-emerald-500' :
                  insight.type === 'warning' ? 'text-amber-500' : 'text-cyan-500'
                } />
                <span className="text-xs font-semibold text-gray-400 uppercase">{insight.title}</span>
                <span className="ml-auto text-xs text-emerald-500">%{insight.confidence}</span>
              </div>
              <p className="text-sm text-white leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr,1fr] gap-5">
        <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
            <h3 className="text-base font-semibold text-white">Haftalık Performans Trendi</h3>
            <div className="flex gap-4 text-xs">
              {[
                { label: 'Ciro (₺K)', color: 'bg-indigo-500' },
                { label: 'Sipariş', color: 'bg-cyan-500' },
                { label: 'Geçen Yıl', color: 'bg-gray-600' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-3 h-1 ${item.color} rounded`} />
                  <span className="text-gray-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={trendData}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="week" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#151d30', border: '1px solid #1e293b', borderRadius: 8 }}
                labelStyle={{ color: '#f8fafc', fontWeight: 600 }}
              />
              <Area yAxisId="left" type="monotone" dataKey="ciro" stroke="#6366f1" strokeWidth={2} fill="url(#trendGrad)" />
              <Line yAxisId="left" type="monotone" dataKey="oncekiYil" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="siparis" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-base font-semibold text-white">Kategori Karşılaştırması</h3>
            <span className="text-xs text-gray-500">Bu Ay vs Geçen Ay</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} width={70} />
              <Tooltip
                contentStyle={{ backgroundColor: '#151d30', border: '1px solid #1e293b', borderRadius: 8 }}
                labelStyle={{ color: '#f8fafc', fontWeight: 600 }}
              />
              <Bar dataKey="gecenAy" fill="#64748b" radius={[0, 4, 4, 0]} name="Geçen Ay" opacity={0.5} />
              <Bar dataKey="buAy" radius={[0, 4, 4, 0]} name="Bu Ay">
                {categoryComparison.map((entry, i) => (
                  <Cell key={i} fill={entry.change >= 0 ? '#6366f1' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#0f1629] border border-[#1e293b] rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-[#1e293b] flex justify-between items-center">
          <h3 className="text-base font-semibold text-white">Detaylı Ürün Performansı</h3>
          <div className="flex items-center gap-2">
            <Search size={16} className="text-gray-500" />
            <input
              placeholder="Ürün ara..."
              className="bg-transparent text-sm text-white outline-none w-32"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0a0f1a]">
              <tr>
                {['Ürün', 'Ciro', 'Adet', 'Değişim', 'Kar Marjı', 'Stok', 'Trend'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productDetails.map((row, i) => (
                <tr key={i} className="border-b border-[#1e293b]">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {row.stock < 100 && <AlertCircle size={16} className="text-red-500" />}
                      <span className="text-sm font-medium text-white">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-white">
                    ₺{(row.revenue / 1000000).toFixed(2)}M
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-400">
                    {row.units.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className={`flex items-center gap-1 text-sm font-semibold ${
                      row.change >= 0 ? 'text-emerald-500' : 'text-red-500'
                    }`}>
                      {row.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      {row.change >= 0 ? '+' : ''}{row.change}%
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white">{row.margin}%</td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      row.stock < 100 ? 'bg-red-500/10 text-red-500' :
                      row.stock > 1000 ? 'bg-amber-500/10 text-amber-500' :
                      'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {row.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <MiniSparkline
                      data={row.trend}
                      color={row.change >= 0 ? '#10b981' : '#ef4444'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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
            {activeView === 'ai' && <AIView />}
            {activeView === 'analytics' && <AnalyticsView />}
          </main>
        </div>
      </div>
    </div>
  );
}
