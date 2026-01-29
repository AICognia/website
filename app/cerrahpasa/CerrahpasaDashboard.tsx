'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Users, Bed, DollarSign, AlertTriangle, TrendingUp, TrendingDown,
  Clock, Heart, Zap, Brain, Shield, BarChart3, Truck, FileText, Stethoscope,
  Syringe, Building2, ChevronRight, ChevronDown, ChevronUp, Bell, Search,
  Settings, Menu, Database, GitBranch, Wifi, Server, Eye, Target, X,
  CheckCircle2, XCircle, Package, Scissors, Send, Bot, RefreshCw,
  ArrowRight, Layers, Play, Pause, AlertCircle, Info, Check, Sparkles,
  Network, Cpu, Radio, ArrowUpRight, ArrowDownRight, MessageSquare, Download
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
  action?: string;
  confidence?: number;
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

interface AIActivity {
  id: number;
  time: string;
  event: string;
  agent: string;
  type: 'analysis' | 'prediction' | 'alert' | 'action' | 'learning';
  status: 'completed' | 'processing' | 'pending';
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
  aiProcessedRecords: Math.floor(Math.random() * 1000) + 45000,
  modelAccuracy: 94.2 + (Math.random() * 0.5),
});

const alerts: Alert[] = [
  {
    id: 1,
    type: 'critical',
    title: 'Hayalet Ekipman Tespit Edildi',
    message: 'OR-3: Silikon implant talep edildi ama ameliyatta kullanılmadı',
    department: 'Plastik Cerrahi',
    time: '2 dk önce',
    value: '₺45,000',
    action: 'Stok Düzelt',
    confidence: 96
  },
  {
    id: 2,
    type: 'warning',
    title: 'SGK Ret Riski Yüksek',
    message: 'Fatura #F-2024-1847: Eksik konsültasyon raporu',
    department: 'Faturalama',
    time: '5 dk önce',
    value: '₺125,000',
    action: 'Doküman Ekle',
    confidence: 78
  },
  {
    id: 3,
    type: 'info',
    title: 'AI Tahmini',
    message: 'Yarın rinoplasti malzeme talebi %40 artacak',
    department: 'Stok',
    time: '15 dk önce',
    action: 'Sipariş Oluştur',
    confidence: 89
  },
  {
    id: 4,
    type: 'success',
    title: 'Otomatik Fatura Gönderildi',
    message: '47 işlem başarıyla SGK MEDULA sistemine iletildi',
    department: 'Finans',
    time: '1 saat önce',
    value: '₺892,000',
    confidence: 100
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
  { id: 'erp', name: 'ERP/Finans', icon: DollarSign, color: '#10b981', status: 'active', latency: '18ms', records: '2.8M', entities: ['Fatura', 'Ödeme', 'Maliyet', 'Bütçe'] },
  { id: 'hr', name: 'İnsan Kaynakları', icon: Users, color: '#ec4899', status: 'active', latency: '22ms', records: '12K', entities: ['Personel', 'Vardiya', 'İzin', 'Performans'] },
];

const aiAgents = [
  { id: 'invoice', name: 'Fatura Koruyucu', status: 'active', tasks: 47, icon: FileText, color: '#10b981', description: 'Eksik faturaları tespit eder' },
  { id: 'material', name: 'Malzeme Takipçi', status: 'active', tasks: 12, icon: Package, color: '#f59e0b', description: 'Hayalet ekipman tarar' },
  { id: 'sgk', name: 'SGK Uyum', status: 'active', tasks: 8, icon: Shield, color: '#3b82f6', description: 'Ret risklerini analiz eder' },
  { id: 'stock', name: 'Stok Optimizer', status: 'idle', tasks: 0, icon: Truck, color: '#8b5cf6', description: 'Stok seviyelerini optimize eder' },
  { id: 'preop', name: 'Ameliyat Öncesi', status: 'active', tasks: 3, icon: Scissors, color: '#ef4444', description: 'Operasyon hazırlığı kontrol' },
  { id: 'coach', name: 'Cerrah Koçu', status: 'idle', tasks: 0, icon: Target, color: '#ec4899', description: 'Performans analizi yapar' },
];

const aiActivityFeed: AIActivity[] = [
  { id: 1, time: '14:23:45', event: 'Hayalet ekipman tespit edildi - OR-3', agent: 'Malzeme Takipçi', type: 'alert', status: 'completed' },
  { id: 2, time: '14:22:18', event: 'Yarınki stok tahmini güncellendi', agent: 'Stok Optimizer', type: 'prediction', status: 'completed' },
  { id: 3, time: '14:21:02', event: 'SGK ret riski analizi - 7 fatura', agent: 'SGK Uyum', type: 'analysis', status: 'processing' },
  { id: 4, time: '14:19:33', event: 'Fatura validasyonu tamamlandı', agent: 'Fatura Koruyucu', type: 'action', status: 'completed' },
  { id: 5, time: '14:17:55', event: 'Model geri bildirimi işlendi', agent: 'AI Core', type: 'learning', status: 'completed' },
  { id: 6, time: '14:15:20', event: 'Operasyon öncesi kontrol - OR-1', agent: 'Ameliyat Öncesi', type: 'analysis', status: 'completed' },
];

// ============================================================================
// AMBIENT COMPONENTS - "LIVE ORGANISM" FEEL
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

const DataFlowLine: React.FC<{ delay?: number; color?: string }> = ({ delay = 0, color = 'cyan' }) => (
  <motion.div
    className={`absolute h-[2px] bg-gradient-to-r from-transparent via-${color}-500 to-transparent`}
    style={{ width: '100%', background: `linear-gradient(90deg, transparent, ${color === 'cyan' ? '#06b6d4' : color === 'purple' ? '#a855f7' : '#10b981'}, transparent)` }}
    initial={{ x: '-100%', opacity: 0 }}
    animate={{ x: '100%', opacity: [0, 1, 1, 0] }}
    transition={{ duration: 2, delay, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
  />
);

const NeuralNetworkBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
    <svg className="w-full h-full">
      <defs>
        <pattern id="neural-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="1" fill="#06b6d4" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#neural-grid)" />
      {/* Animated connection lines */}
      {[...Array(5)].map((_, i) => (
        <motion.line
          key={i}
          x1={`${i * 20}%`}
          y1="0"
          x2={`${(i + 1) * 20}%`}
          y2="100%"
          stroke="#06b6d4"
          strokeWidth="0.5"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
    </svg>
  </div>
);

const GlowCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  interactive?: boolean;
}> = ({ children, className = '', glowColor = 'rgba(6, 182, 212, 0.15)', onClick, interactive = false }) => (
  <motion.div
    whileHover={interactive ? { scale: 1.005, boxShadow: `0 0 60px ${glowColor}` } : {}}
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
// AI CHAT MODAL
// ============================================================================

const AIChatModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Merhaba! Cerrahpaşa Hastane Komuta Merkezi AI Asistanınızım. 6 veri kaynağından 5.9 milyon kayda erişimim var.\n\nÖrnek sorular:\n• "Bugün kaç ameliyat yapıldı?"\n• "Hayalet ekipman durumu nedir?"\n• "SGK ret riski yüksek faturalar?"' }
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
      if (query.toLowerCase().includes('ameliyat') || query.toLowerCase().includes('operasyon')) {
        response = `🏥 **Ameliyat Durumu**\n\n**Bugün:**\n• Tamamlanan: 23 ameliyat\n• Devam Eden: 4 ameliyat\n• Planlanan: 8 ameliyat\n\n**Aktif Salonlar:**\n• OR-1: Rinoplasti (Prof. Dr. Yılmaz)\n• OR-2: Meme Rekonstruksiyonu\n• OR-3: Hazırlanıyor\n• OR-4: Tamamlandı\n\n💡 **AI Öngörü:** Yarın ameliyathane doluluk oranı %94 olacak.\n\n*%96 güven | Gerçek zamanlı veri*`;
      } else if (query.toLowerCase().includes('hayalet') || query.toLowerCase().includes('ghost')) {
        response = `👻 **Hayalet Ekipman Raporu**\n\n**Bugün Tespit Edilen:**\n• 3 adet hayalet ekipman\n• Toplam değer: ₺41,500\n\n**Son Tespit:**\n• Silikon nazal splint - OR-1\n• Maliyet: ₺4,500\n• Cerrah: Prof. Dr. Yılmaz\n\n**Bu Ay Önlenen Kayıp:** ₺2.3M\n**AI Doğruluk Oranı:** %94\n\n*Gerçek zamanlı izleme aktif*`;
      } else if (query.toLowerCase().includes('sgk') || query.toLowerCase().includes('ret') || query.toLowerCase().includes('fatura')) {
        response = `📋 **SGK Fatura Durumu**\n\n**Risk Analizi:**\n• 7 fatura yüksek ret riski\n• Toplam risk değeri: ₺340,000\n\n**En Kritik:**\n• F-2024-1847: Rinoplasti (%78 ret riski)\n• Eksik: Konsültasyon raporu\n\n**Öneri:** Eksik belgeleri tamamlayarak ret oranını %67 azaltabilirsiniz.\n\n*%91 güven | 856K kayıt analiz edildi*`;
      } else {
        response = `Sorgunuz analiz edildi.\n\n**5.9M kayıt tarandı:**\n• HBYS: 1.2M\n• SGK MEDULA: 856K\n• Ameliyathane: 24K\n• Stok: 45K\n• ERP: 2.8M\n\nDaha spesifik sonuçlar için ameliyat, stok, SGK veya hayalet ekipman hakkında soru sorabilirsiniz.`;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-[80vh] rounded-2xl flex flex-col overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f1629 0%, #1a1f35 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Brain size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">ZEKAI Asistan</h3>
              <div className="flex items-center gap-2">
                <LivePulse />
                <span className="text-[10px] text-emerald-400">5.9M kayıt bağlı</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Messages */}
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
                  <span className="text-xs text-gray-400">AI analiz ediyor...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-slate-900/50">
          <div className="flex gap-3">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="AI'ya soru sorun..."
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-cyan-500/50 transition-colors"
            />
            <button onClick={handleSend} disabled={isTyping}
              className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-medium flex items-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// ACTION MODAL
// ============================================================================

const ActionModal: React.FC<{ alert: Alert | null; onClose: () => void }> = ({ alert, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'complete'>('idle');

  useEffect(() => {
    if (alert) setStatus('idle');
  }, [alert]);

  const handleAction = () => {
    setStatus('processing');
    setTimeout(() => { setStatus('complete'); setTimeout(onClose, 1500); }, 2000);
  };

  if (!alert) return null;

  const severityColors = {
    critical: { bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' },
    warning: { bg: 'bg-amber-500/20', border: 'border-amber-500/50', text: 'text-amber-400' },
    info: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/50', text: 'text-cyan-400' },
    success: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/50', text: 'text-emerald-400' },
  };

  const colors = severityColors[alert.type];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl p-6"
        style={{ background: 'linear-gradient(135deg, #0f1629 0%, #1a1f35 100%)', border: '1px solid rgba(6, 182, 212, 0.3)' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
            <Zap size={20} className={colors.text} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{alert.action || 'İşlem'}</h3>
            <p className="text-xs text-gray-500">{alert.title}</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl ${colors.bg} border ${colors.border} mb-4`}>
          <p className="text-sm text-gray-300 mb-2">{alert.message}</p>
          <div className="flex gap-4 text-xs text-gray-500">
            {alert.value && <span>Etki: <span className="text-white">{alert.value}</span></span>}
            {alert.confidence && <span>Güven: <span className={colors.text}>{alert.confidence}%</span></span>}
          </div>
        </div>

        {status === 'idle' && (
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 text-gray-400 text-sm hover:bg-white/10 transition-colors">İptal</button>
            <button onClick={handleAction} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:opacity-90 transition-all">Onayla</button>
          </div>
        )}
        {status === 'processing' && (
          <div className="py-3 text-center text-sm text-gray-300">
            <RefreshCw size={18} className="inline animate-spin mr-2" />
            İşleniyor...
          </div>
        )}
        {status === 'complete' && (
          <div className="py-3 text-center text-emerald-400">
            <CheckCircle2 size={18} className="inline mr-2" />
            Tamamlandı!
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ============================================================================
// AI WORKING FLOW VISUALIZATION
// ============================================================================

const AIWorkingFlow: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Database, label: 'Veri Toplama', desc: 'HBYS, SGK, Stok', color: '#06b6d4' },
    { icon: Brain, label: 'AI Analiz', desc: 'ML modeli', color: '#8b5cf6' },
    { icon: AlertTriangle, label: 'Anomali Tespit', desc: 'Hayalet ekipman', color: '#f59e0b' },
    { icon: Target, label: 'Tahmin', desc: 'Risk skoru', color: '#ef4444' },
    { icon: Sparkles, label: 'Öneri', desc: 'Aksiyon önerisi', color: '#a855f7' },
    { icon: CheckCircle2, label: 'Eylem', desc: 'Otomatik işlem', color: '#10b981' },
  ];

  return (
    <GlowCard className="p-5" glowColor="rgba(139, 92, 246, 0.15)">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Network size={18} className="text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI İşlem Akışı</h3>
            <p className="text-xs text-gray-500">Gerçek zamanlı karar motoru</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LivePulse color="#8b5cf6" />
          <span className="text-xs text-purple-400">Aktif</span>
        </div>
      </div>

      {/* Flow Steps */}
      <div className="flex items-center justify-between gap-1 mb-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx === activeStep;
          const isPast = idx < activeStep;

          return (
            <React.Fragment key={idx}>
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1, opacity: isActive ? 1 : isPast ? 0.7 : 0.4 }}
                className={`flex flex-col items-center p-2 rounded-lg transition-all ${
                  isActive ? 'bg-opacity-30' : ''
                }`}
                style={{ backgroundColor: isActive ? `${step.color}20` : 'transparent' }}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 transition-all`}
                  style={{
                    backgroundColor: isActive ? step.color : 'rgba(255,255,255,0.05)',
                    boxShadow: isActive ? `0 0 20px ${step.color}50` : 'none'
                  }}
                >
                  <Icon size={14} className={isActive ? 'text-white' : 'text-gray-500'} />
                </div>
                <span className="text-[9px] text-center text-gray-400 leading-tight">{step.label}</span>
              </motion.div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-[2px] bg-slate-700 relative overflow-hidden">
                  {isPast && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r"
                      style={{ backgroundImage: `linear-gradient(90deg, ${steps[idx].color}, ${steps[idx + 1].color})` }}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500"
          animate={{ width: `${((activeStep + 1) / 6) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Current Status */}
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-gray-500">Son işlem: Hayalet ekipman taraması</span>
        <span className="text-emerald-400">✓ 247ms</span>
      </div>
    </GlowCard>
  );
};

// ============================================================================
// FEEDBACK LOOP VISUALIZATION
// ============================================================================

const FeedbackLoopVisualization: React.FC = () => (
  <GlowCard className="p-5" glowColor="rgba(16, 185, 129, 0.15)">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center">
          <RefreshCw size={18} className="text-emerald-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Model Geri Bildirim</h3>
          <p className="text-xs text-gray-500">Sürekli öğrenme döngüsü</p>
        </div>
      </div>
    </div>

    {/* Circular Flow Diagram */}
    <div className="flex items-center justify-center mb-4">
      <div className="relative w-32 h-32">
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
            <span className="text-lg font-bold text-emerald-400">+1.8%</span>
            <p className="text-[9px] text-gray-500">Model Doğruluğu</p>
          </div>
        </div>
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[8px] text-gray-400">Öneri</span>
        <span className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 text-[8px] text-gray-400">Karar</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-[8px] text-gray-400">Sonuç</span>
        <span className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 text-[8px] text-gray-400">Öğrenme</span>
      </div>
    </div>

    {/* Recent Feedback */}
    <div className="space-y-2">
      <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">Hayalet ekipman tespiti</span>
          <CheckCircle2 size={12} className="text-emerald-400" />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-emerald-400">+₺45K kurtarıldı</span>
          <span className="text-[10px] text-gray-500">• Model: +0.3%</span>
        </div>
      </div>
      <div className="p-2 rounded-lg bg-white/[0.02] border border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-300">SGK ret önleme</span>
          <CheckCircle2 size={12} className="text-emerald-400" />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-emerald-400">+₺125K kurtarıldı</span>
          <span className="text-[10px] text-gray-500">• Model: +0.5%</span>
        </div>
      </div>
    </div>
  </GlowCard>
);

// ============================================================================
// AI ACTIVITY FEED
// ============================================================================

const AIActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState(aiActivityFeed);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: AIActivity = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('tr-TR'),
        event: ['Stok analizi tamamlandı', 'Yeni tahmin oluşturuldu', 'Anomali kontrolü yapıldı', 'Fatura validasyonu'][Math.floor(Math.random() * 4)],
        agent: aiAgents[Math.floor(Math.random() * aiAgents.length)].name,
        type: ['analysis', 'prediction', 'alert', 'action', 'learning'][Math.floor(Math.random() * 5)] as AIActivity['type'],
        status: 'completed'
      };
      setActivities(prev => [newActivity, ...prev.slice(0, 5)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const typeStyles = {
    analysis: { color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500' },
    prediction: { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500' },
    alert: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500' },
    action: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500' },
    learning: { color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500' },
  };

  return (
    <GlowCard className="p-5" glowColor="rgba(6, 182, 212, 0.15)">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Activity size={18} className="text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Aktivite Akışı</h3>
            <p className="text-xs text-gray-500">Gerçek zamanlı agent işlemleri</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LivePulse color="#06b6d4" />
          <span className="text-xs text-cyan-400">Canlı</span>
        </div>
      </div>

      <div className="relative">
        {/* Data flow animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <DataFlowLine delay={0} />
          <DataFlowLine delay={2} />
        </div>

        <div className="space-y-2">
          {activities.slice(0, 5).map((activity, i) => {
            const style = typeStyles[activity.type];
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.02] border-l-2 ${style.border}`}
              >
                <span className="text-[10px] font-mono text-gray-500 w-14">{activity.time}</span>
                <span className="text-xs text-white flex-1 truncate">{activity.event}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${style.bg} ${style.color}`}>
                  {activity.agent.split(' ')[0]}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </GlowCard>
  );
};

// ============================================================================
// MAIN COMPONENTS
// ============================================================================

const MetricCard = ({
  icon: Icon,
  title,
  value,
  subvalue,
  trend,
  color,
  pulse = false,
  onClick
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  subvalue?: string;
  trend?: number;
  color: string;
  pulse?: boolean;
  onClick?: () => void;
}) => (
  <GlowCard className="p-4" glowColor={`${color}30`} onClick={onClick} interactive>
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
  </GlowCard>
);

const AlertCard = ({ alert, onClick }: { alert: Alert; onClick: () => void }) => {
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
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`p-3 rounded-lg border-l-2 ${typeStyles[alert.type]} cursor-pointer hover:bg-white/5 transition-all`}
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
            <div className="flex items-center gap-2">
              {alert.confidence && (
                <span className="text-[10px] text-cyan-400">{alert.confidence}% güven</span>
              )}
              {alert.action && (
                <span className="text-[10px] text-cyan-400 flex items-center gap-1">
                  <Play size={8} />
                  {alert.action}
                </span>
              )}
            </div>
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
  risk,
  onClick
}: typeof departmentData[0] & { onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.01, backgroundColor: 'rgba(255,255,255,0.02)' }}
    onClick={onClick}
    className="flex items-center justify-between py-3 px-4 rounded-lg cursor-pointer transition-all border-l-2 border-transparent hover:border-cyan-500"
  >
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
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${efficiency}%` }}
            transition={{ duration: 1 }}
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
  </motion.div>
);

const OperationCard = ({ operation, onClick }: { operation: Operation; onClick: () => void }) => {
  const statusStyles = {
    active: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Devam Ediyor' },
    preparing: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Hazırlanıyor' },
    completed: { bg: 'bg-slate-500/20', text: 'text-slate-400', label: 'Tamamlandı' },
    delayed: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Gecikme' },
  };

  const style = statusStyles[operation.status];
  const unusedMaterials = operation.materials.filter(m => m.requested && !m.used);

  return (
    <GlowCard className="p-4" glowColor={operation.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.1)'} onClick={onClick} interactive>
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
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg"
        >
          <div className="flex items-center gap-2 text-amber-400 text-xs">
            <AlertTriangle size={12} className="animate-pulse" />
            <span>Potansiyel Hayalet: {unusedMaterials.length} malzeme</span>
          </div>
        </motion.div>
      )}
    </GlowCard>
  );
};

const GhostEquipmentCard = ({ item, onClick }: { item: GhostEquipmentItem; onClick: () => void }) => {
  const statusStyles = {
    detected: { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400', label: 'Tespit Edildi' },
    reviewing: { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400', label: 'İnceleniyor' },
    resolved: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', label: 'Çözüldü' },
  };

  const style = statusStyles[item.status];

  return (
    <GlowCard
      className={`p-4 border ${style.border}`}
      glowColor={item.status === 'detected' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.1)'}
      onClick={onClick}
      interactive
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
          <button className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white transition-colors flex items-center justify-center gap-1">
            <Eye size={12} />
            İncele
          </button>
          <button className="flex-1 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg text-sm text-emerald-400 transition-colors flex items-center justify-center gap-1">
            <Check size={12} />
            Düzelt
          </button>
        </div>
      )}
    </GlowCard>
  );
};

const AIAgentCard = ({ agent, onClick }: { agent: typeof aiAgents[0]; onClick: () => void }) => {
  const Icon = agent.icon;
  return (
    <GlowCard
      className={`p-3 ${agent.status === 'active' ? '' : 'opacity-60'}`}
      glowColor={agent.status === 'active' ? `${agent.color}30` : 'transparent'}
      onClick={onClick}
      interactive
    >
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
      <p className="text-[10px] text-slate-500 mt-2">{agent.description}</p>
    </GlowCard>
  );
};

const DataSourceCard = ({ source, expanded, onToggle }: {
  source: typeof dataSources[0];
  expanded: boolean;
  onToggle: () => void;
}) => {
  const Icon = source.icon;
  return (
    <GlowCard className="overflow-hidden" glowColor={`${source.color}20`}>
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
                <div key={entity} className="flex items-center gap-2 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors">
                  <Database size={10} className="text-slate-600" />
                  <span className="text-xs text-slate-400">{entity}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlowCard>
  );
};

// ============================================================================
// VIEWS
// ============================================================================

const OverviewView = ({
  liveData,
  setCurrentView,
  onAlertClick
}: {
  liveData: ReturnType<typeof generateLiveData>;
  setCurrentView: (view: ViewType) => void;
  onAlertClick: (alert: Alert) => void;
}) => (
  <div className="space-y-6">
    {/* Live Status Bar with Data Flow Animation */}
    <GlowCard className="p-4 relative overflow-hidden" glowColor="rgba(6, 182, 212, 0.2)">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <DataFlowLine delay={0} />
        <DataFlowLine delay={1.5} />
      </div>
      <div className="flex items-center justify-between relative z-10">
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
          <div className="flex items-center gap-2">
            <Brain size={14} className="text-purple-400" />
            <span className="text-sm text-purple-400">{(liveData.aiProcessedRecords / 1000).toFixed(0)}K kayıt işlendi</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-emerald-400">
            ₺{(liveData.dailyRevenue/1000000).toFixed(2)}M
          </span>
          <span className="text-xs text-slate-500 ml-2">bugünkü gelir</span>
        </div>
      </div>
    </GlowCard>

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
        onClick={() => setCurrentView('operations')}
      />
      <MetricCard
        icon={DollarSign}
        title="Aylık Gelir"
        value="₺89.4M"
        subvalue="Hedef: ₺85M"
        trend={8}
        color="#10b981"
        onClick={() => setCurrentView('billing')}
      />
      <MetricCard
        icon={AlertTriangle}
        title="Önlenen Kayıp"
        value="₺4.2M"
        subvalue="Bu ay"
        trend={45}
        color="#f59e0b"
      />
      <MetricCard
        icon={Package}
        title="Hayalet Ekipman"
        value={liveData.ghostEquipmentToday.toString()}
        subvalue="Bugün tespit"
        color="#ef4444"
        onClick={() => setCurrentView('ghost-equipment')}
      />
      <MetricCard
        icon={Brain}
        title="AI Doğruluk"
        value={`%${liveData.modelAccuracy.toFixed(1)}`}
        subvalue="6 agent aktif"
        trend={1.8}
        color="#8b5cf6"
        onClick={() => setCurrentView('ai-insights')}
      />
    </div>

    {/* Main Grid */}
    <div className="grid grid-cols-3 gap-6">
      {/* Department Performance */}
      <div className="col-span-2">
        <GlowCard className="p-5" glowColor="rgba(6, 182, 212, 0.1)">
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
              <DepartmentRow key={dept.name} {...dept} onClick={() => {}} />
            ))}
          </div>
        </GlowCard>
      </div>

      {/* Live Alerts */}
      <div>
        <GlowCard className="p-5" glowColor="rgba(239, 68, 68, 0.1)">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-white">Canlı Uyarılar</h2>
            <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-lg flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {alerts.length} aktif
            </span>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} onClick={() => onAlertClick(alert)} />
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-all">
            Tüm Uyarıları Gör
          </button>
        </GlowCard>
      </div>
    </div>

    {/* AI Systems Row */}
    <div className="grid grid-cols-3 gap-6">
      <AIWorkingFlow />
      <FeedbackLoopVisualization />
      <AIActivityFeed />
    </div>

    {/* Bottom Section - AI Predictions & Quick Actions */}
    <div className="grid grid-cols-4 gap-4">
      <GlowCard className="p-5" glowColor="rgba(139, 92, 246, 0.15)" onClick={() => setCurrentView('ai-insights')} interactive>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-purple-400" />
          <span className="font-medium text-purple-400">AI Tahmin</span>
        </div>
        <p className="text-2xl font-bold text-white">₺12.4M</p>
        <p className="text-sm text-slate-400 mt-1">Önümüzdeki hafta beklenen gelir</p>
        <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1.5 }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">%92 güven aralığı</p>
      </GlowCard>

      <GlowCard className="p-5" glowColor="rgba(245, 158, 11, 0.15)" onClick={() => setCurrentView('billing')} interactive>
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
      </GlowCard>

      <GlowCard className="p-5" glowColor="rgba(16, 185, 129, 0.15)" onClick={() => setCurrentView('inventory')} interactive>
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
      </GlowCard>

      <GlowCard className="p-5" glowColor="rgba(6, 182, 212, 0.15)" onClick={() => setCurrentView('ghost-equipment')} interactive>
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-cyan-400" />
          <span className="font-medium text-cyan-400">Hayalet Takip</span>
        </div>
        <p className="text-2xl font-bold text-white">₺2.3M</p>
        <p className="text-sm text-slate-400 mt-1">Bu ay önlenen kayıp</p>
        <p className="text-xs text-cyan-400 mt-3">%94 tespit oranı</p>
        <button className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
          Detaylar <ArrowRight size={12} />
        </button>
      </GlowCard>
    </div>
  </div>
);

const OperationsView = ({ onAlertClick }: { onAlertClick: (alert: Alert) => void }) => (
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
        <OperationCard key={op.id} operation={op} onClick={() => {}} />
      ))}
    </div>

    {/* Material Tracking */}
    <GlowCard className="p-5" glowColor="rgba(6, 182, 212, 0.1)">
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
                <tr key={`${op.id}-${idx}`} className="border-t border-slate-700/50 hover:bg-white/[0.02]">
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
                      <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded flex items-center gap-1 w-fit">
                        <AlertTriangle size={10} className="animate-pulse" />
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
    </GlowCard>
  </div>
);

const GhostEquipmentView = ({ onAlertClick }: { onAlertClick: (alert: Alert) => void }) => {
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
          <div className="px-4 py-2 bg-red-500/20 rounded-lg border border-red-500/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm text-red-400">{detectedCount} yeni tespit</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <GlowCard className="p-4" glowColor="rgba(239, 68, 68, 0.1)">
          <p className="text-xs text-slate-500 uppercase">Bugün</p>
          <p className="text-2xl font-bold text-white mt-1">3</p>
          <p className="text-xs text-slate-400">tespit</p>
        </GlowCard>
        <GlowCard className="p-4" glowColor="rgba(239, 68, 68, 0.2)">
          <p className="text-xs text-slate-500 uppercase">Toplam Değer</p>
          <p className="text-2xl font-bold text-red-400 mt-1">₺{totalCost.toLocaleString()}</p>
          <p className="text-xs text-slate-400">potansiyel kayıp</p>
        </GlowCard>
        <GlowCard className="p-4" glowColor="rgba(16, 185, 129, 0.15)">
          <p className="text-xs text-slate-500 uppercase">Bu Ay</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">₺2.3M</p>
          <p className="text-xs text-slate-400">önlenen kayıp</p>
        </GlowCard>
        <GlowCard className="p-4" glowColor="rgba(6, 182, 212, 0.15)">
          <p className="text-xs text-slate-500 uppercase">Tespit Oranı</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">%94</p>
          <p className="text-xs text-slate-400">AI doğruluk</p>
        </GlowCard>
      </div>

      {/* Detection Flow */}
      <GlowCard className="p-5" glowColor="rgba(139, 92, 246, 0.1)">
        <h3 className="font-semibold text-white mb-4">AI Tespit Akışı</h3>
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
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: item.color }}
                  whileHover={{ scale: 1.1, boxShadow: `0 0 20px ${item.color}` }}
                >
                  {item.step}
                </motion.div>
                <p className="text-xs font-medium text-white mt-2">{item.title}</p>
                <p className="text-[10px] text-slate-500">{item.desc}</p>
              </div>
              {idx < 4 && <ChevronRight className="w-5 h-5 text-slate-600" />}
            </React.Fragment>
          ))}
        </div>
      </GlowCard>

      {/* Ghost Equipment List */}
      <div className="grid grid-cols-2 gap-4">
        {ghostEquipmentItems.map((item) => (
          <GhostEquipmentCard key={item.id} item={item} onClick={() => {}} />
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
    <GlowCard className="p-5" glowColor="rgba(99, 102, 241, 0.1)">
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
              <motion.div
                className="h-full rounded-lg transition-all"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 1 }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                {item.value.toLocaleString()} ({item.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>

    {/* Risk Analysis */}
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <GlowCard className="p-5" glowColor="rgba(245, 158, 11, 0.1)">
          <h3 className="font-semibold text-white mb-4">Ret Riski Yüksek Faturalar</h3>
          <div className="space-y-3">
            {[
              { id: 'F-2024-1847', procedure: 'Rinoplasti', risk: 78, reason: 'Eksik konsültasyon raporu', value: 125000 },
              { id: 'F-2024-1852', procedure: 'Meme Estetiği', risk: 65, reason: 'SUT kodu uyumsuzluğu', value: 180000 },
              { id: 'F-2024-1855', procedure: 'Liposuction', risk: 52, reason: 'Ameliyat öncesi fotoğraf eksik', value: 75000 },
            ].map((invoice) => (
              <GlowCard
                key={invoice.id}
                className="p-3"
                glowColor={invoice.risk > 70 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)'}
                interactive
              >
                <div className="flex items-center justify-between">
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
                    <button className="text-xs text-cyan-400 hover:text-cyan-300 mt-1 flex items-center gap-1">
                      Doküman Ekle <ArrowRight size={10} />
                    </button>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </GlowCard>
      </div>

      <div className="space-y-4">
        <GlowCard className="p-4" glowColor="rgba(16, 185, 129, 0.15)">
          <p className="text-xs text-slate-500 uppercase">Bu Ay Onaylanan</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">₺45.2M</p>
          <p className="text-xs text-slate-400">1,847 fatura</p>
        </GlowCard>
        <GlowCard className="p-4" glowColor="rgba(245, 158, 11, 0.15)">
          <p className="text-xs text-slate-500 uppercase">Reddedilen</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">₺3.8M</p>
          <p className="text-xs text-slate-400">%7.8 ret oranı</p>
        </GlowCard>
        <GlowCard className="p-4" glowColor="rgba(6, 182, 212, 0.15)">
          <p className="text-xs text-slate-500 uppercase">Bekleyen</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">₺8.4M</p>
          <p className="text-xs text-slate-400">342 fatura</p>
        </GlowCard>
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
    <GlowCard className="p-5" glowColor="rgba(239, 68, 68, 0.1)">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Kritik Stok Seviyeleri</h3>
        <button className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-sm rounded-lg hover:bg-emerald-500/30 transition-colors flex items-center gap-1">
          <Truck size={14} />
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
          <GlowCard
            key={item.name}
            className="p-3"
            glowColor="rgba(239, 68, 68, 0.1)"
            interactive
          >
            <div className="flex items-center justify-between">
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
          </GlowCard>
        ))}
      </div>
    </GlowCard>
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
    <GlowCard className="p-5" glowColor="rgba(139, 92, 246, 0.1)">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">AI Agentları</h3>
        <div className="flex items-center gap-2">
          <LivePulse />
          <span className="text-xs text-emerald-400">4 agent aktif</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {aiAgents.map((agent) => (
          <AIAgentCard key={agent.id} agent={agent} onClick={() => {}} />
        ))}
      </div>
    </GlowCard>

    {/* AI Systems Visualization */}
    <div className="grid grid-cols-2 gap-6">
      <AIWorkingFlow />
      <FeedbackLoopVisualization />
    </div>

    {/* AI Recommendations */}
    <div className="grid grid-cols-2 gap-4">
      <GlowCard className="p-5" glowColor="rgba(139, 92, 246, 0.1)">
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
            <GlowCard key={idx} className="p-3" glowColor="rgba(139, 92, 246, 0.05)" interactive>
              <p className="text-sm text-white">{item.prediction}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-cyan-400">{item.impact}</span>
                <span className="text-xs text-slate-500">%{item.confidence} güven</span>
              </div>
            </GlowCard>
          ))}
        </div>
      </GlowCard>

      <GlowCard className="p-5" glowColor="rgba(245, 158, 11, 0.1)">
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
            <GlowCard key={idx} className="p-3" glowColor="rgba(245, 158, 11, 0.05)" interactive>
              <p className="text-sm text-white">{item.suggestion}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-emerald-400">{item.saving} tasarruf</span>
                {item.status === 'pending' ? (
                  <button className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                    Uygula <ArrowRight size={10} />
                  </button>
                ) : (
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Check size={10} /> Uygulandı
                  </span>
                )}
              </div>
            </GlowCard>
          ))}
        </div>
      </GlowCard>
    </div>

    {/* AI Activity Feed */}
    <AIActivityFeed />
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
            <span className="text-sm text-emerald-400">6 sistem bağlı</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-lg">
            <Database size={14} className="text-cyan-400" />
            <span className="text-sm text-cyan-400">5.9M kayıt</span>
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
          <GlowCard className="p-5 h-full" glowColor="rgba(139, 92, 246, 0.1)">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 mb-4">
              <Brain size={14} /> Birleşik Veri Modeli
            </h3>

            <div className="flex flex-col items-center justify-center py-8">
              {/* Central Hub */}
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl mb-6"
                animate={{ boxShadow: ['0 0 30px rgba(6, 182, 212, 0.3)', '0 0 60px rgba(6, 182, 212, 0.5)', '0 0 30px rgba(6, 182, 212, 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>

              {/* Entity Cards */}
              <div className="grid grid-cols-5 gap-3 w-full">
                {[
                  { name: 'HASTA', connections: 147, color: '#0ea5e9' },
                  { name: 'İŞLEM', connections: 89, color: '#f43f5e' },
                  { name: 'MALZEME', connections: 63, color: '#f59e0b' },
                  { name: 'PERSONEL', connections: 52, color: '#8b5cf6' },
                  { name: 'FİNANS', connections: 78, color: '#10b981' },
                ].map((entity) => (
                  <GlowCard
                    key={entity.name}
                    className="text-center p-3"
                    glowColor={`${entity.color}30`}
                    interactive
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
                  </GlowCard>
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
                <span>→ 6 sistem sorgulandı</span>
                <span>→ 847 kayıt analiz edildi</span>
                <span>→ 0.3s</span>
              </div>
            </div>
          </GlowCard>
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
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative">
      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      {/* Top Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-40 relative">
        {/* Top data flow animation */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
          <DataFlowLine delay={0} />
        </div>

        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"
                animate={{ boxShadow: ['0 0 15px rgba(6, 182, 212, 0.3)', '0 0 30px rgba(6, 182, 212, 0.5)', '0 0 15px rgba(6, 182, 212, 0.3)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain className="w-6 h-6" />
              </motion.div>
              <div>
                <h1 className="font-bold text-lg">CERRAHPAŞA</h1>
                <p className="text-[10px] text-cyan-400 tracking-widest">ZEKAI COMMAND CENTER</p>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-700 mx-4" />
            <div className="flex items-center gap-1">
              <LivePulse />
              <span className="text-emerald-400 text-sm font-medium ml-2">6 sistem bağlı</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
            >
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                placeholder="AI'ya sor: 'Bugün kaç ameliyat var?'"
                className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 w-80 text-sm focus:border-cyan-500 focus:outline-none transition-colors"
                onFocus={() => setShowAIChat(true)}
              />
            </motion.div>

            <motion.button
              onClick={() => setShowAIChat(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/30 hover:to-purple-500/30 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Brain size={18} />
              <span className="text-sm font-medium">AI Asistan</span>
            </motion.button>

            <div className="relative">
              <Bell className="w-5 h-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <motion.span
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {alerts.filter(a => a.type === 'critical' || a.type === 'warning').length}
              </motion.span>
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
        <aside className={`${sidebarCollapsed ? 'w-16' : 'w-64'} border-r border-slate-800 min-h-[calc(100vh-57px)] p-4 bg-slate-900/50 transition-all duration-300 relative`}>
          {/* Sidebar data flow */}
          <div className="absolute top-0 right-0 w-[1px] h-full overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
              style={{ height: '50px' }}
              animate={{ y: ['-50px', '100vh'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          <div className="space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  currentView === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </motion.button>
            ))}
          </div>

          {!sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <GlowCard className="p-4" glowColor="rgba(6, 182, 212, 0.2)">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
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
              </GlowCard>

              {/* Model Accuracy Card */}
              <GlowCard className="p-4 mt-4" glowColor="rgba(139, 92, 246, 0.15)">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">Model Doğruluğu</span>
                  <span className="text-xs text-purple-400">{liveData.modelAccuracy.toFixed(1)}%</span>
                </div>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${liveData.modelAccuracy}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-2">Son 7 günde +1.8% iyileşme</p>
              </GlowCard>
            </motion.div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'overview' && (
                <OverviewView
                  liveData={liveData}
                  setCurrentView={setCurrentView}
                  onAlertClick={setSelectedAlert}
                />
              )}
              {currentView === 'operations' && <OperationsView onAlertClick={setSelectedAlert} />}
              {currentView === 'ghost-equipment' && <GhostEquipmentView onAlertClick={setSelectedAlert} />}
              {currentView === 'billing' && <BillingView />}
              {currentView === 'inventory' && <InventoryView />}
              {currentView === 'ai-insights' && <AIInsightsView />}
              {currentView === 'data-ontology' && <DataOntologyView />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* AI Chat Modal */}
      <AnimatePresence>
        {showAIChat && <AIChatModal isOpen={showAIChat} onClose={() => setShowAIChat(false)} />}
      </AnimatePresence>

      {/* Action Modal */}
      <AnimatePresence>
        {selectedAlert && <ActionModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />}
      </AnimatePresence>
    </div>
  );
}
