'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Users, Bed, DollarSign, AlertTriangle, TrendingUp, TrendingDown,
  Clock, Heart, Zap, Brain, Shield, BarChart3, Truck, FileText, Stethoscope,
  Syringe, Building2, ChevronRight, ChevronDown, ChevronUp, Bell, Search,
  Settings, Menu, Database, GitBranch, Wifi, Server, Eye, Target, X,
  CheckCircle2, XCircle, Package, Scissors, Send, Bot, RefreshCw,
  ArrowRight, Layers, Play, Pause, AlertCircle, Info, Check
} from 'lucide-react';

// ============================================================================
// TYPES
// ============================================================================

type ViewType = 'overview' | 'operations' | 'ghost-equipment' | 'billing' | 'inventory' | 'ai-insights' | 'data-ontology';

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  department: string;
  time: string;
  value?: string;
}

interface Operation {
  id: string;
  room: string;
  procedure: string;
  surgeon: string;
  status: 'active' | 'preparing' | 'completed' | 'delayed';
  startTime: string;
  duration: string;
  materials: { name: string; requested: boolean; used: boolean; cost: number }[];
}

interface GhostEquipmentItem {
  id: string;
  operationId: string;
  material: string;
  surgeon: string;
  room: string;
  cost: number;
  status: 'detected' | 'reviewing' | 'resolved';
  timestamp: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const generateLiveData = () => ({
  timestamp: new Date().toLocaleTimeString('tr-TR'),
  activeOperations: Math.floor(Math.random() * 3) + 4,
  dailyRevenue: 2847000 + Math.floor(Math.random() * 50000),
  ghostEquipmentToday: Math.floor(Math.random() * 2) + 1,
  sgkPending: Math.floor(Math.random() * 5) + 8,
});

const alerts: Alert[] = [
  {
    id: 1,
    type: 'critical',
    title: 'Hayalet Ekipman Tespit Edildi',
    message: 'OR-3: Silikon implant talep edildi ama ameliyatta kullanılmadı',
    department: 'Plastik Cerrahi',
    time: '2 dk önce',
    value: '₺45,000'
  },
  {
    id: 2,
    type: 'warning',
    title: 'SGK Ret Riski Yüksek',
    message: 'Fatura #F-2024-1847: Eksik konsültasyon raporu',
    department: 'Faturalama',
    time: '5 dk önce',
    value: '₺125,000'
  },
  {
    id: 3,
    type: 'info',
    title: 'AI Tahmini',
    message: 'Yarın rinoplasti malzeme talebi %40 artacak',
    department: 'Stok',
    time: '15 dk önce'
  },
  {
    id: 4,
    type: 'success',
    title: 'Otomatik Fatura Gönderildi',
    message: '47 işlem başarıyla SGK MEDULA sistemine iletildi',
    department: 'Finans',
    time: '1 saat önce',
    value: '₺892,000'
  },
];

const liveOperations: Operation[] = [
  {
    id: 'OP-2847',
    room: 'OR-1',
    procedure: 'Rinoplasti',
    surgeon: 'Prof. Dr. Ahmet Yılmaz',
    status: 'active',
    startTime: '09:30',
    duration: '2s 15dk',
    materials: [
      { name: 'Titanyum plak', requested: true, used: true, cost: 8500 },
      { name: 'Özel sütur seti', requested: true, used: true, cost: 3200 },
      { name: 'Silikon nazal splint', requested: true, used: false, cost: 4500 },
    ]
  },
  {
    id: 'OP-2848',
    room: 'OR-2',
    procedure: 'Meme Rekonstrüksiyonu',
    surgeon: 'Doç. Dr. Ayşe Demir',
    status: 'active',
    startTime: '10:00',
    duration: '1s 45dk',
    materials: [
      { name: 'Silikon implant 350cc', requested: true, used: true, cost: 25000 },
      { name: 'Doku genişletici', requested: true, used: true, cost: 18000 },
      { name: 'Dren seti', requested: true, used: true, cost: 1200 },
    ]
  },
  {
    id: 'OP-2849',
    room: 'OR-3',
    procedure: 'Yüz Germe',
    surgeon: 'Prof. Dr. Mehmet Kaya',
    status: 'preparing',
    startTime: '12:00',
    duration: '-',
    materials: [
      { name: 'SMAS sütur seti', requested: true, used: false, cost: 6800 },
      { name: 'Endoskopik ekipman', requested: true, used: false, cost: 12000 },
    ]
  },
  {
    id: 'OP-2846',
    room: 'OR-4',
    procedure: 'Blefaroplasti',
    surgeon: 'Dr. Zeynep Aksoy',
    status: 'completed',
    startTime: '08:00',
    duration: '1s 30dk',
    materials: [
      { name: 'Mikro sütur seti', requested: true, used: true, cost: 2400 },
      { name: 'CO2 lazer ucu', requested: true, used: true, cost: 8500 },
    ]
  },
];

const ghostEquipmentItems: GhostEquipmentItem[] = [
  {
    id: 'GE-001',
    operationId: 'OP-2847',
    material: 'Silikon nazal splint',
    surgeon: 'Prof. Dr. Ahmet Yılmaz',
    room: 'OR-1',
    cost: 4500,
    status: 'detected',
    timestamp: '11:45'
  },
  {
    id: 'GE-002',
    operationId: 'OP-2842',
    material: 'Yüz implantı (çene)',
    surgeon: 'Doç. Dr. Ayşe Demir',
    room: 'OR-2',
    cost: 15000,
    status: 'reviewing',
    timestamp: '09:20'
  },
  {
    id: 'GE-003',
    operationId: 'OP-2838',
    material: 'Doku genişletici 500cc',
    surgeon: 'Prof. Dr. Mehmet Kaya',
    room: 'OR-3',
    cost: 22000,
    status: 'resolved',
    timestamp: 'Dün 16:30'
  },
];

const departmentData = [
  { name: 'Plastik Cerrahi', operations: 18, revenue: 892000, efficiency: 94, alerts: 2, risk: 'medium' as const },
  { name: 'Genel Cerrahi', operations: 24, revenue: 1240000, efficiency: 88, alerts: 0, risk: 'low' as const },
  { name: 'Ortopedi', operations: 21, revenue: 980000, efficiency: 91, alerts: 1, risk: 'low' as const },
  { name: 'Kardiyoloji', operations: 15, revenue: 2100000, efficiency: 96, alerts: 0, risk: 'low' as const },
  { name: 'Nöroşirürji', operations: 8, revenue: 1850000, efficiency: 89, alerts: 3, risk: 'high' as const },
  { name: 'Üroloji', operations: 14, revenue: 620000, efficiency: 92, alerts: 0, risk: 'low' as const },
];

const dataSources = [
  { id: 'hbys', name: 'HBYS', icon: Users, color: '#3b82f6', status: 'active', latency: '15ms', records: '1.2M', entities: ['Hasta', 'Randevu', 'Tedavi', 'Reçete', 'Epikriz'] },
  { id: 'medula', name: 'SGK MEDULA', icon: Shield, color: '#06b6d4', status: 'active', latency: '45ms', records: '856K', entities: ['Provizyon', 'SUT Kodu', 'Ret', 'İtiraz', 'Ödeme'] },
  { id: 'ameliyathane', name: 'Ameliyathane', icon: Activity, color: '#ef4444', status: 'active', latency: '8ms', records: '24K', entities: ['Operasyon', 'Ekip', 'Süre', 'Protokol'] },
  { id: 'stok', name: 'Stok Yönetimi', icon: Package, color: '#f59e0b', status: 'active', latency: '12ms', records: '45K', entities: ['Malzeme', 'Stok', 'Hareket', 'Sipariş'] },
];

const aiAgents = [
  { id: 'invoice', name: 'Fatura Koruyucu', status: 'active', tasks: 47, icon: FileText, color: '#10b981' },
  { id: 'material', name: 'Malzeme Takipçi', status: 'active', tasks: 12, icon: Package, color: '#f59e0b' },
  { id: 'sgk', name: 'SGK Uyum', status: 'active', tasks: 8, icon: Shield, color: '#3b82f6' },
  { id: 'stock', name: 'Stok Optimizer', status: 'idle', tasks: 0, icon: Truck, color: '#8b5cf6' },
  { id: 'preop', name: 'Ameliyat Öncesi', status: 'active', tasks: 3, icon: Scissors, color: '#ef4444' },
  { id: 'coach', name: 'Cerrah Koçu', status: 'idle', tasks: 0, icon: Target, color: '#ec4899' },
];

// ============================================================================
// COMPONENTS
// ============================================================================

const LivePulse = ({ color = '#10b981' }: { color?: string }) => (
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

const MetricCard = ({
  icon: Icon,
  title,
  value,
  subvalue,
  trend,
  color,
  pulse = false
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  subvalue?: string;
  trend?: number;
  color: string;
  pulse?: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 hover:border-cyan-500/30 transition-all cursor-pointer"
  >
    <div className="flex items-start justify-between">
      <div className={`p-2 rounded-lg`} style={{ backgroundColor: `${color}20` }}>
        <Icon className={`w-5 h-5 ${pulse ? 'animate-pulse' : ''}`} style={{ color }} />
      </div>
      {trend !== undefined && (
        <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
          trend > 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
        }`}>
          {trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div className="mt-3">
      <p className="text-slate-400 text-xs uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
      {subvalue && <p className="text-slate-500 text-xs mt-1">{subvalue}</p>}
    </div>
  </motion.div>
);

const AlertCard = ({ alert }: { alert: Alert }) => {
  const typeStyles = {
    critical: 'bg-red-500/10 border-red-500 text-red-400',
    warning: 'bg-amber-500/10 border-amber-500 text-amber-400',
    info: 'bg-blue-500/10 border-blue-500 text-blue-400',
    success: 'bg-emerald-500/10 border-emerald-500 text-emerald-400',
  };

  const icons = {
    critical: AlertTriangle,
    warning: AlertCircle,
    info: Info,
    success: CheckCircle2,
  };

  const Icon = icons[alert.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`p-3 rounded-lg border-l-2 ${typeStyles[alert.type]}`}
    >
      <div className="flex items-start gap-3">
        <Icon size={16} className="mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-white">{alert.title}</p>
            {alert.value && (
              <span className="text-xs font-mono text-white bg-white/10 px-2 py-0.5 rounded">
                {alert.value}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">{alert.message}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-slate-500">{alert.department}</span>
            <span className="text-[10px] text-slate-500">{alert.time}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const DepartmentRow = ({
  name,
  operations,
  revenue,
  efficiency,
  alerts: alertCount,
  risk
}: typeof departmentData[0]) => (
  <div className="flex items-center justify-between py-3 px-4 hover:bg-slate-800/30 rounded-lg cursor-pointer transition-all border-l-2 border-transparent hover:border-cyan-500">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${
        risk === 'low' ? 'bg-emerald-500' :
        risk === 'medium' ? 'bg-amber-500' : 'bg-red-500'
      }`} />
      <span className="text-white font-medium">{name}</span>
    </div>
    <div className="flex items-center gap-6 text-sm">
      <span className="text-slate-400 w-16 text-right">{operations} op</span>
      <span className="text-emerald-400 w-20 text-right">₺{(revenue/1000).toFixed(0)}K</span>
      <div className="w-20">
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
            style={{ width: `${efficiency}%` }}
          />
        </div>
        <span className="text-[10px] text-slate-500">{efficiency}%</span>
      </div>
      <span className={`w-14 text-center px-2 py-1 rounded text-xs ${
        alertCount > 0 ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400'
      }`}>
        {alertCount} uyarı
      </span>
      <ChevronRight className="w-4 h-4 text-slate-600" />
    </div>
  </div>
);

const OperationCard = ({ operation }: { operation: Operation }) => {
  const statusStyles = {
    active: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Devam Ediyor' },
    preparing: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Hazırlanıyor' },
    completed: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Tamamlandı' },
    delayed: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Gecikme' },
  };

  const style = statusStyles[operation.status];
  const unusedMaterials = operation.materials.filter(m => m.requested && !m.used);

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-cyan-500/30 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white">{operation.room}</span>
            {operation.status === 'active' && <LivePulse />}
          </div>
          <p className="text-sm text-cyan-400">{operation.procedure}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
          {style.label}
        </span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-slate-400">
          <Stethoscope size={14} />
          <span>{operation.surgeon}</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{operation.startTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity size={12} />
            <span>{operation.duration}</span>
          </div>
        </div>
      </div>

      {unusedMaterials.length > 0 && operation.status === 'active' && (
        <div className="mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-amber-400 text-xs">
            <AlertTriangle size={12} />
            <span>Potansiyel Hayalet: {unusedMaterials.length} malzeme</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

const GhostEquipmentCard = ({ item }: { item: GhostEquipmentItem }) => {
  const statusStyles = {
    detected: { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400', label: 'Tespit Edildi' },
    reviewing: { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400', label: 'İnceleniyor' },
    resolved: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', label: 'Çözüldü' },
  };

  const style = statusStyles[item.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border ${style.border} ${style.bg}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-white">{item.material}</p>
          <p className="text-xs text-slate-400 mt-1">Ameliyat: {item.operationId} | {item.room}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${style.bg} ${style.text} border ${style.border}`}>
          {style.label}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-400">
          <span>{item.surgeon}</span>
          <span className="mx-2">•</span>
          <span>{item.timestamp}</span>
        </div>
        <span className="text-lg font-bold text-white">₺{item.cost.toLocaleString()}</span>
      </div>

      {item.status === 'detected' && (
        <div className="flex gap-2 mt-3">
          <button className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors">
            İncele
          </button>
          <button className="flex-1 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-sm text-emerald-400 transition-colors">
            Stok Düzelt
          </button>
        </div>
      )}
    </motion.div>
  );
};

const AIAgentCard = ({ agent }: { agent: typeof aiAgents[0] }) => {
  const Icon = agent.icon;
  return (
    <div className={`p-3 rounded-lg border transition-all ${
      agent.status === 'active'
        ? 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/30'
        : 'bg-slate-800/30 border-slate-800'
    }`}>
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${agent.color}20` }}>
          <Icon size={16} style={{ color: agent.color }} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">{agent.name}</p>
          <div className="flex items-center gap-2 mt-0.5">
            {agent.status === 'active' ? (
              <>
                <LivePulse color={agent.color} />
                <span className="text-[10px] text-emerald-400">{agent.tasks} aktif görev</span>
              </>
            ) : (
              <span className="text-[10px] text-slate-500">Beklemede</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DataSourceCard = ({ source, expanded, onToggle }: {
  source: typeof dataSources[0];
  expanded: boolean;
  onToggle: () => void;
}) => {
  const Icon = source.icon;
  return (
    <div className="rounded-lg bg-slate-800/50 border border-slate-700">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: `${source.color}20` }}>
            <Icon size={14} style={{ color: source.color }} />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">{source.name}</p>
            <div className="flex items-center gap-2">
              <LivePulse color="#10b981" />
              <span className="text-[10px] text-emerald-400">{source.latency}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">{source.records}</span>
          {expanded ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-1">
              {source.entities.map((entity) => (
                <div key={entity} className="flex items-center gap-2 p-2 rounded hover:bg-white/5 cursor-pointer">
                  <Database size={10} className="text-slate-600" />
                  <span className="text-xs text-slate-400">{entity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================================================
// VIEWS
// ============================================================================

const OverviewView = ({ liveData, setCurrentView }: {
  liveData: ReturnType<typeof generateLiveData>;
  setCurrentView: (view: ViewType) => void;
}) => (
  <div className="space-y-6">
    {/* Live Status Bar */}
    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-slate-500" />
          <span className="text-sm text-slate-400">Son güncelleme: {liveData.timestamp}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm text-white">{liveData.activeOperations} aktif ameliyat</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full" />
          <span className="text-sm text-white">{liveData.sgkPending} fatura bekliyor</span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold text-emerald-400">
          ₺{(liveData.dailyRevenue/1000000).toFixed(2)}M
        </span>
        <span className="text-xs text-slate-500 ml-2">bugünkü gelir</span>
      </div>
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-5 gap-4">
      <MetricCard
        icon={Activity}
        title="Günlük Ameliyat"
        value="127"
        subvalue="23 devam ediyor"
        trend={12}
        color="#06b6d4"
        pulse
      />
      <MetricCard
        icon={DollarSign}
        title="Aylık Gelir"
        value="₺89.4M"
        subvalue="Hedef: ₺85M"
        trend={8}
        color="#10b981"
      />
      <MetricCard
        icon={AlertTriangle}
        title="Önlenen Kayıp"
        value="₺4.2M"
        subvalue="Bu ay"
        trend={45}
        color="#f59e0b"
      />
      <div
        onClick={() => setCurrentView('ghost-equipment')}
        className="cursor-pointer"
      >
        <MetricCard
          icon={Package}
          title="Hayalet Ekipman"
          value={liveData.ghostEquipmentToday.toString()}
          subvalue="Bugün tespit"
          color="#ef4444"
        />
      </div>
      <MetricCard
        icon={Heart}
        title="Hasta Memnuniyeti"
        value="4.7"
        subvalue="Son 30 gün"
        trend={3}
        color="#ec4899"
      />
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-3 gap-6">
      {/* Department Performance */}
      <div className="col-span-2 bg-slate-800/30 rounded-xl border border-slate-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg text-white">Departman Performansı</h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-lg">Bugün</button>
            <button className="px-3 py-1 text-xs bg-slate-700 text-slate-400 rounded-lg hover:bg-slate-600">Hafta</button>
            <button className="px-3 py-1 text-xs bg-slate-700 text-slate-400 rounded-lg hover:bg-slate-600">Ay</button>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between py-2 px-4 text-[10px] text-slate-500 uppercase tracking-wider">
            <span>Departman</span>
            <div className="flex items-center gap-6">
              <span className="w-16 text-right">Ameliyat</span>
              <span className="w-20 text-right">Gelir</span>
              <span className="w-20 text-center">Verimlilik</span>
              <span className="w-14 text-center">Uyarılar</span>
              <span className="w-4"></span>
            </div>
          </div>
          {departmentData.map((dept) => (
            <DepartmentRow key={dept.name} {...dept} />
          ))}
        </div>
      </div>

      {/* Live Alerts */}
      <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg text-white">Canlı Uyarılar</h2>
          <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-lg">
            {alerts.length} aktif
          </span>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
        <button className="w-full mt-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-all">
          Tüm Uyarıları Gör
        </button>
      </div>
    </div>

    {/* Bottom Section - AI Predictions */}
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-5">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="font-medium text-purple-400">AI Tahmin</span>
        </div>
        <p className="text-2xl font-bold text-white">₺12.4M</p>
        <p className="text-sm text-slate-400 mt-1">Önümüzdeki hafta beklenen gelir</p>
        <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
        </div>
        <p className="text-xs text-slate-500 mt-2">%92 güven aralığı</p>
      </div>

      <div
        onClick={() => setCurrentView('billing')}
        className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20 p-5 cursor-pointer hover:border-amber-500/40 transition-colors"
      >
        <div className="flex items-center gap-2 mb-3">
          <Shield className="w-5 h-5 text-amber-400" />
          <span className="font-medium text-amber-400">SGK Risk Analizi</span>
        </div>
        <p className="text-2xl font-bold text-white">7 Fatura</p>
        <p className="text-sm text-slate-400 mt-1">Ret riski yüksek</p>
        <p className="text-xs text-amber-400 mt-3">Toplam risk: ₺340,000</p>
        <button className="mt-2 text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1">
          İncele <ArrowRight size={12} />
        </button>
      </div>

      <div
        onClick={() => setCurrentView('inventory')}
        className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20 p-5 cursor-pointer hover:border-emerald-500/40 transition-colors"
      >
        <div className="flex items-center gap-2 mb-3">
          <Truck className="w-5 h-5 text-emerald-400" />
          <span className="font-medium text-emerald-400">Stok Durumu</span>
        </div>
        <p className="text-2xl font-bold text-white">12 Ürün</p>
        <p className="text-sm text-slate-400 mt-1">Kritik stok seviyesinde</p>
        <p className="text-xs text-emerald-400 mt-3">Otomatik sipariş hazır</p>
        <button className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
          Onayla <ArrowRight size={12} />
        </button>
      </div>

      <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <span className="font-medium text-cyan-400">Optimizasyon</span>
        </div>
        <p className="text-2xl font-bold text-white">₺1.8M</p>
        <p className="text-sm text-slate-400 mt-1">Aylık tasarruf potansiyeli</p>
        <p className="text-xs text-cyan-400 mt-3">23 öneri bekliyor</p>
        <button className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
          Önerileri Gör <ArrowRight size={12} />
        </button>
      </div>
    </div>
  </div>
);

const OperationsView = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">Canlı Ameliyatlar</h2>
        <p className="text-sm text-slate-400">Gerçek zamanlı ameliyathane durumu</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-lg">
          <LivePulse />
          <span className="text-sm text-emerald-400">4 Salon Aktif</span>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors">
          <RefreshCw size={14} />
          Yenile
        </button>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      {liveOperations.map((op) => (
        <OperationCard key={op.id} operation={op} />
      ))}
    </div>

    {/* Material Tracking */}
    <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-5">
      <h3 className="font-semibold text-white mb-4">Anlık Malzeme Takibi</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 text-xs uppercase">
              <th className="pb-3">Ameliyat</th>
              <th className="pb-3">Malzeme</th>
              <th className="pb-3">Talep</th>
              <th className="pb-3">Kullanım</th>
              <th className="pb-3">Maliyet</th>
              <th className="pb-3">Durum</th>
            </tr>
          </thead>
          <tbody>
            {liveOperations.flatMap((op) =>
              op.materials.map((material, idx) => (
                <tr key={`${op.id}-${idx}`} className="border-t border-slate-700/50">
                  <td className="py-3 text-slate-400">{op.id}</td>
                  <td className="py-3 text-white">{material.name}</td>
                  <td className="py-3">
                    {material.requested ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <X size={14} className="text-slate-600" />
                    )}
                  </td>
                  <td className="py-3">
                    {material.used ? (
                      <Check size={14} className="text-emerald-400" />
                    ) : (
                      <X size={14} className="text-red-400" />
                    )}
                  </td>
                  <td className="py-3 text-slate-400">₺{material.cost.toLocaleString()}</td>
                  <td className="py-3">
                    {material.requested && !material.used && op.status === 'active' ? (
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded">
                        Potansiyel Hayalet
                      </span>
                    ) : material.used ? (
                      <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded">
                        Onaylı
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-slate-700 text-slate-400 text-xs rounded">
                        Bekliyor
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const GhostEquipmentView = () => {
  const totalCost = ghostEquipmentItems.reduce((acc, item) => acc + item.cost, 0);
  const detectedCount = ghostEquipmentItems.filter(i => i.status === 'detected').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Hayalet Ekipman Tespiti</h2>
          <p className="text-sm text-slate-400">Talep edilen ama kullanılmayan malzemeler</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-red-500/20 rounded-lg border border-red-500/30">
            <span className="text-sm text-red-400">{detectedCount} yeni tespit</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
          <p className="text-xs text-slate-500 uppercase">Bugün</p>
          <p className="text-2xl font-bold text-white mt-1">3</p>
          <p className="text-xs text-slate-400">tespit</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
          <p className="text-xs text-slate-500 uppercase">Toplam Değer</p>
          <p className="text-2xl font-bold text-red-400 mt-1">₺{totalCost.toLocaleString()}</p>
          <p className="text-xs text-slate-400">potansiyel kayıp</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
          <p className="text-xs text-slate-500 uppercase">Bu Ay</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">₺2.3M</p>
          <p className="text-xs text-slate-400">önlenen kayıp</p>
        </div>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4">
          <p className="text-xs text-slate-500 uppercase">Tespit Oranı</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">%94</p>
          <p className="text-xs text-slate-400">AI doğruluk</p>
        </div>
      </div>

      {/* Detection Flow */}
      <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-5">
        <h3 className="font-semibold text-white mb-4">Tespit Akışı</h3>
        <div className="flex items-center justify-between px-8">
          {[
            { step: 1, title: 'Ameliyat Talebi', desc: 'Malzeme listesi', color: '#3b82f6' },
            { step: 2, title: 'AI Tahmini', desc: 'Kullanım olasılığı', color: '#8b5cf6' },
            { step: 3, title: 'Gerçek Kullanım', desc: 'Barkod tarama', color: '#10b981' },
            { step: 4, title: 'Karşılaştırma', desc: 'Talep vs Kullanım', color: '#f59e0b' },
            { step: 5, title: 'Uyumsuzluk', desc: 'Hayalet tespit', color: '#ef4444' },
          ].map((item, idx) => (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: item.color }}
                >
                  {item.step}
                </div>
                <p className="text-xs font-medium text-white mt-2">{item.title}</p>
                <p className="text-[10px] text-slate-500">{item.desc}</p>
              </div>
              {idx < 4 && <ChevronRight className="w-5 h-5 text-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Ghost Equipment List */}
      <div className="grid grid-cols-2 gap-4">
        {ghostEquipmentItems.map((item) => (
          <GhostEquipmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const BillingView = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">SGK & Faturalama</h2>
        <p className="text-sm text-slate-400">Otomatik fatura yönetimi ve SGK uyum takibi</p>
      </div>
    </div>

    {/* Billing Funnel */}
    <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-5">
      <h3 className="font-semibold text-white mb-4">Faturalama Hunisi</h3>
      <div className="space-y-3">
        {[
          { stage: 'Ameliyat Tamamlandı', value: 2000, percentage: 100, color: '#6366f1' },
          { stage: 'SUT Kodu Girildi', value: 1800, percentage: 90, color: '#8b5cf6' },
          { stage: 'Doküman Tamamlandı', value: 1600, percentage: 80, color: '#a855f7' },
          { stage: 'SGK\'ya Gönderildi', value: 1500, percentage: 75, color: '#c084fc' },
          { stage: 'Onaylandı', value: 1350, percentage: 67.5, color: '#10b981' },
        ].map((item) => (
          <div key={item.stage} className="flex items-center gap-4">
            <div className="w-40 text-sm text-slate-400">{item.stage}</div>
            <div className="flex-1 h-8 bg-slate-700 rounded-lg overflow-hidden relative">
              <div
                className="h-full rounded-lg transition-all"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                {item.value.toLocaleString()} ({item.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Risk Analysis */}
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2 bg-slate-800/30 rounded-xl border border-slate-700 p-5">
        <h3 className="font-semibold text-white mb-4">Ret Riski Yüksek Faturalar</h3>
        <div className="space-y-3">
          {[
            { id: 'F-2024-1847', procedure: 'Rinoplasti', risk: 78, reason: 'Eksik konsültasyon raporu', value: 125000 },
            { id: 'F-2024-1852', procedure: 'Meme Estetiği', risk: 65, reason: 'SUT kodu uyumsuzluğu', value: 180000 },
            { id: 'F-2024-1855', procedure: 'Liposuction', risk: 52, reason: 'Ameliyat öncesi fotoğraf eksik', value: 75000 },
          ].map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-white">{invoice.id}</span>
                  <span className="text-xs text-slate-500">{invoice.procedure}</span>
                </div>
                <p className="text-xs text-amber-400 mt-1">{invoice.reason}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">₺{invoice.value.toLocaleString()}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    invoice.risk > 70 ? 'bg-red-500/20 text-red-400' :
                    invoice.risk > 50 ? 'bg-amber-500/20 text-amber-400' :
                    'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    %{invoice.risk} risk
                  </span>
                </div>
                <button className="text-xs text-cyan-400 hover:text-cyan-300 mt-1">
                  Doküman Ekle →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20 p-4">
          <p className="text-xs text-slate-500 uppercase">Bu Ay Onaylanan</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">₺45.2M</p>
          <p className="text-xs text-slate-400">1,847 fatura</p>
        </div>
        <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/20 p-4">
          <p className="text-xs text-slate-500 uppercase">Reddedilen</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">₺3.8M</p>
          <p className="text-xs text-slate-400">%7.8 ret oranı</p>
        </div>
        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 p-4">
          <p className="text-xs text-slate-500 uppercase">Bekleyen</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">₺8.4M</p>
          <p className="text-xs text-slate-400">342 fatura</p>
        </div>
      </div>
    </div>
  </div>
);

const InventoryView = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">Stok Yönetimi</h2>
        <p className="text-sm text-slate-400">AI destekli envanter optimizasyonu</p>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-4">
      <MetricCard icon={Package} title="Toplam Ürün" value="2,847" color="#06b6d4" />
      <MetricCard icon={AlertTriangle} title="Kritik Stok" value="12" color="#ef4444" />
      <MetricCard icon={Clock} title="Yaklaşan SKT" value="8" subvalue="30 gün içinde" color="#f59e0b" />
      <MetricCard icon={TrendingUp} title="Tasarruf" value="₺85K" subvalue="Bu ay" trend={12} color="#10b981" />
    </div>

    {/* Critical Stock Items */}
    <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Kritik Stok Seviyeleri</h3>
        <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-sm rounded-lg hover:bg-emerald-500/30 transition-colors">
          Toplu Sipariş Oluştur
        </button>
      </div>
      <div className="space-y-3">
        {[
          { name: 'Silikon İmplant 350cc', current: 3, min: 10, supplier: 'Medikal A.Ş.', price: 25000 },
          { name: 'Titanyum Plak Seti', current: 5, min: 15, supplier: 'Cerrahi Ltd.', price: 8500 },
          { name: 'Özel Sütur (5-0)', current: 8, min: 20, supplier: 'Sutür Medikal', price: 320 },
          { name: 'Lazer Ucu (CO2)', current: 2, min: 5, supplier: 'Laser Tech', price: 12000 },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-red-500/20">
            <div>
              <p className="font-medium text-white">{item.name}</p>
              <p className="text-xs text-slate-500">{item.supplier}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm">
                  <span className="text-red-400 font-bold">{item.current}</span>
                  <span className="text-slate-500"> / {item.min} min</span>
                </p>
                <p className="text-xs text-slate-500">₺{item.price.toLocaleString()}/adet</p>
              </div>
              <button className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 text-xs rounded hover:bg-cyan-500/30 transition-colors">
                Sipariş
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AIInsightsView = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">AI Öngörüler</h2>
        <p className="text-sm text-slate-400">Yapay zeka destekli analiz ve öneriler</p>
      </div>
    </div>

    {/* AI Agents Status */}
    <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">AI Agentları</h3>
        <div className="flex items-center gap-2">
          <LivePulse />
          <span className="text-xs text-emerald-400">4 agent aktif</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {aiAgents.map((agent) => (
          <AIAgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>

    {/* AI Recommendations */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold text-white">Bu Haftanın Tahminleri</h3>
        </div>
        <div className="space-y-3">
          {[
            { prediction: 'Rinoplasti talebi %25 artacak', confidence: 89, impact: 'Stok artır' },
            { prediction: 'Perşembe ameliyathane doluluk %100', confidence: 94, impact: 'Planlama yap' },
            { prediction: 'SGK ret riski yüksek: 4 fatura', confidence: 78, impact: 'Doküman kontrol' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-white">{item.prediction}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-cyan-400">{item.impact}</span>
                <span className="text-xs text-slate-500">%{item.confidence} güven</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="font-semibold text-white">Optimizasyon Önerileri</h3>
        </div>
        <div className="space-y-3">
          {[
            { suggestion: 'Alternatif sütur tedarikçisi ile %12 tasarruf', saving: '₺85K/ay', status: 'pending' },
            { suggestion: 'Ameliyathane çizelgesini optimize et', saving: '₺120K/ay', status: 'pending' },
            { suggestion: 'Stok minimumlarını güncelle', saving: '₺45K/ay', status: 'applied' },
          ].map((item, idx) => (
            <div key={idx} className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-white">{item.suggestion}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-emerald-400">{item.saving} tasarruf</span>
                {item.status === 'pending' ? (
                  <button className="text-xs text-cyan-400 hover:text-cyan-300">Uygula →</button>
                ) : (
                  <span className="text-xs text-slate-500">Uygulandı</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DataOntologyView = () => {
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Veri Ontolojisi</h2>
          <p className="text-sm text-slate-400">Tüm sistemler, tek gerçeklik kaynağı</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 rounded-lg">
            <LivePulse />
            <span className="text-sm text-emerald-400">4 sistem bağlı</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-lg">
            <Database size={14} className="text-cyan-400" />
            <span className="text-sm text-cyan-400">2.1M kayıt</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Data Sources */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
            <Server size={14} /> Veri Kaynakları
          </h3>
          {dataSources.map((source) => (
            <DataSourceCard
              key={source.id}
              source={source}
              expanded={expandedSources[source.id] || false}
              onToggle={() => setExpandedSources(prev => ({ ...prev, [source.id]: !prev[source.id] }))}
            />
          ))}
        </div>

        {/* Unified Model */}
        <div className="col-span-2">
          <div className="bg-slate-800/30 rounded-xl border border-slate-700 p-5 h-full">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
              <Brain size={14} /> Birleşik Veri Modeli
            </h3>

            <div className="flex flex-col items-center justify-center py-8">
              {/* Central Hub */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 mb-6">
                <Brain className="w-10 h-10 text-white" />
              </div>

              {/* Entity Cards */}
              <div className="grid grid-cols-5 gap-3 w-full">
                {[
                  { name: 'HASTA', connections: 147, color: '#0ea5e9' },
                  { name: 'İŞLEM', connections: 89, color: '#f43f5e' },
                  { name: 'MALZEME', connections: 63, color: '#f59e0b' },
                  { name: 'PERSONEL', connections: 52, color: '#8b5cf6' },
                  { name: 'FİNANS', connections: 78, color: '#10b981' },
                ].map((entity) => (
                  <div
                    key={entity.name}
                    className="text-center p-3 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all cursor-pointer"
                  >
                    <div
                      className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
                      style={{ backgroundColor: `${entity.color}20` }}
                    >
                      <span className="text-sm font-bold" style={{ color: entity.color }}>
                        {entity.name[0]}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-white">{entity.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1">{entity.connections} bağlantı</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Wifi size={12} className="text-emerald-500 animate-pulse" />
                  <span>Gerçek zamanlı senkronizasyon</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={12} className="text-amber-500" />
                  <span>12ms ortalama latency</span>
                </div>
              </div>
            </div>

            {/* Sample Query */}
            <div className="mt-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={14} className="text-cyan-400" />
                <span className="text-sm text-cyan-400 font-medium">Örnek Sorgu</span>
              </div>
              <p className="text-slate-300 text-sm">
                "Plastik cerrahi departmanında son 30 günde yapılan rinoplasti ameliyatlarında kullanılan malzemelerin toplam maliyeti ve SGK karşılama oranı nedir?"
              </p>
              <div className="flex items-center gap-4 text-[10px] text-slate-500 mt-2">
                <span>→ 4 sistem sorgulandı</span>
                <span>→ 847 kayıt analiz edildi</span>
                <span>→ 0.3s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN DASHBOARD
// ============================================================================

export default function CerrahpasaDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [liveData, setLiveData] = useState(generateLiveData());
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setLiveData(generateLiveData()), 5000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'overview' as ViewType, label: 'Genel Bakış', icon: BarChart3 },
    { id: 'operations' as ViewType, label: 'Canlı Ameliyatlar', icon: Activity },
    { id: 'ghost-equipment' as ViewType, label: 'Hayalet Ekipman', icon: Package },
    { id: 'billing' as ViewType, label: 'SGK & Faturalama', icon: FileText },
    { id: 'inventory' as ViewType, label: 'Stok Yönetimi', icon: Truck },
    { id: 'ai-insights' as ViewType, label: 'AI Öngörüler', icon: Brain },
    { id: 'data-ontology' as ViewType, label: 'Veri Ontolojisi', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg">CERRAHPAŞA</h1>
                <p className="text-[10px] text-cyan-400 tracking-widest">ZEKAI COMMAND CENTER</p>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-700 mx-4" />
            <div className="flex items-center gap-1">
              <LivePulse />
              <span className="text-emerald-400 text-sm font-medium ml-2">4 sistem bağlı</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                placeholder="AI'ya sor: 'Bugün kaç ameliyat var?'"
                className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 w-80 text-sm focus:border-cyan-500 focus:outline-none transition-colors"
              />
            </div>
            <div className="relative">
              <Bell className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">
                {alerts.filter(a => a.type === 'critical' || a.type === 'warning').length}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Prof. Dr. Mehmet Yılmaz</p>
              <p className="text-xs text-slate-500">Başhekim</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} border-r border-slate-800 min-h-[calc(100vh-57px)] p-4 bg-slate-900/50 transition-all duration-300`}>
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  currentView === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>

          {!sidebarCollapsed && (
            <div className="mt-8 p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-cyan-400">AI Insight</span>
              </div>
              <p className="text-xs text-slate-300">
                Son 30 günde ₺2.3M hayalet ekipman kaybı tespit edildi. Gerçek zamanlı takip sistemi %94 doğruluk ile çalışıyor.
              </p>
              <button
                onClick={() => setCurrentView('ghost-equipment')}
                className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                Detayları Gör <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'overview' && <OverviewView liveData={liveData} setCurrentView={setCurrentView} />}
              {currentView === 'operations' && <OperationsView />}
              {currentView === 'ghost-equipment' && <GhostEquipmentView />}
              {currentView === 'billing' && <BillingView />}
              {currentView === 'inventory' && <InventoryView />}
              {currentView === 'ai-insights' && <AIInsightsView />}
              {currentView === 'data-ontology' && <DataOntologyView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
