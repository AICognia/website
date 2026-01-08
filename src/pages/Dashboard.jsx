import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { Bell, TrendingUp, TrendingDown, AlertTriangle, AlertCircle, Search, Send, BarChart3, Activity, Users, Package, DollarSign, Download, Brain, Clock, ArrowUpRight, ArrowDownRight, FileText, Target, Calendar, Mail, Lightbulb, ChevronRight, Sparkles, Zap, CheckCircle2, XCircle, ArrowRight, Sun, Coffee } from 'lucide-react';

// Premium Color Palette
const colors = {
  // Backgrounds
  bg: '#05080f',
  bgSurface: '#0a0f1a',
  bgCard: '#0f1629',
  bgCardElevated: '#151d30',
  bgHover: '#1a2540',
  
  // Primary
  primary: '#6366f1',
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',
  primaryGlow: 'rgba(99, 102, 241, 0.15)',
  
  // Accent
  accent: '#f59e0b',
  accentLight: '#fbbf24',
  
  // Semantic
  success: '#10b981',
  successLight: '#34d399',
  successBg: 'rgba(16, 185, 129, 0.1)',
  warning: '#f59e0b',
  warningBg: 'rgba(245, 158, 11, 0.1)',
  danger: '#ef4444',
  dangerLight: '#f87171',
  dangerBg: 'rgba(239, 68, 68, 0.1)',
  info: '#06b6d4',
  infoBg: 'rgba(6, 182, 212, 0.1)',
  
  // Text
  text: '#f8fafc',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textDim: '#475569',
  
  // Borders
  border: '#1e293b',
  borderLight: '#334155',
};

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

// Sidebar Component
const Sidebar = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'dashboard', icon: Activity, label: 'Dashboard' },
    { id: 'ai', icon: Brain, label: 'AI Asistan' },
    { id: 'analytics', icon: BarChart3, label: 'Analitik' },
  ];

  return (
    <aside style={{
      width: 72,
      backgroundColor: colors.bgSurface,
      borderRight: `1px solid ${colors.border}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px 0',
    }}>
      {/* Logo */}
      <div style={{
        width: 44,
        height: 44,
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
        borderRadius: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        boxShadow: `0 4px 20px ${colors.primaryGlow}`,
      }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>C</span>
      </div>

      {/* Navigation */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            title={item.label}
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              border: 'none',
              backgroundColor: activeView === item.id ? colors.primaryGlow : 'transparent',
              color: activeView === item.id ? colors.primary : colors.textMuted,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <item.icon size={22} />
          </button>
        ))}
      </nav>

      {/* Alert Badge */}
      <div style={{ marginTop: 'auto', marginBottom: 16 }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: colors.dangerBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <Bell size={20} color={colors.danger} />
          <span style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 8,
            height: 8,
            backgroundColor: colors.danger,
            borderRadius: '50%',
          }} />
        </div>
      </div>
    </aside>
  );
};

// Header Component
const Header = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <header style={{
      height: 72,
      backgroundColor: colors.bgSurface,
      borderBottom: `1px solid ${colors.border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: colors.text, letterSpacing: '-0.02em' }}>
            Cognia Platform
          </h1>
          <p style={{ margin: 0, fontSize: 13, color: colors.textMuted }}>Enterprise Data Intelligence</p>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 14px',
          backgroundColor: colors.successBg,
          borderRadius: 20,
          border: `1px solid ${colors.success}30`,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.success }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: colors.success }}>5 sistem bağlı</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Search */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 16px',
          backgroundColor: colors.bgCard,
          borderRadius: 10,
          border: `1px solid ${colors.border}`,
          width: 280,
        }}>
          <Search size={16} color={colors.textMuted} />
          <input
            placeholder="Ara veya AI'ya sor..."
            style={{
              border: 'none',
              background: 'none',
              color: colors.text,
              fontSize: 14,
              outline: 'none',
              width: '100%',
            }}
          />
          <span style={{ fontSize: 11, color: colors.textDim, backgroundColor: colors.bgSurface, padding: '2px 6px', borderRadius: 4 }}>⌘K</span>
        </div>

        {/* Time */}
        <div style={{ textAlign: 'right', minWidth: 100 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: colors.text, fontFamily: 'monospace' }}>
            {time.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={{ fontSize: 11, color: colors.textMuted }}>
            {time.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
          </div>
        </div>

        {/* User */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '8px 12px',
          backgroundColor: colors.bgCard,
          borderRadius: 10,
          cursor: 'pointer',
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 600,
            color: 'white',
          }}>EB</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>Emre B.</div>
            <div style={{ fontSize: 11, color: colors.textMuted }}>Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Daily Brief Hero Component
const DailyBriefHero = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Günaydın' : hour < 18 ? 'İyi günler' : 'İyi akşamlar';
  const Icon = hour < 12 ? Coffee : hour < 18 ? Sun : Sparkles;

  return (
    <div style={{
      background: `linear-gradient(135deg, ${colors.bgCard} 0%, ${colors.bgCardElevated} 100%)`,
      borderRadius: 20,
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    }}>
      {/* Hero Header */}
      <div style={{
        padding: '28px 32px',
        borderBottom: `1px solid ${colors.border}`,
        background: `linear-gradient(90deg, ${colors.primaryGlow} 0%, transparent 50%)`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={20} color="white" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: colors.text, letterSpacing: '-0.02em' }}>
                  {greeting}, Emre
                </h2>
                <p style={{ margin: 0, fontSize: 14, color: colors.textMuted }}>{dailyBrief.date}</p>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 16px',
              backgroundColor: colors.bgSurface,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              color: colors.textSecondary,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}>
              <Mail size={16} />
              E-posta
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 16px',
              backgroundColor: colors.bgSurface,
              border: `1px solid ${colors.border}`,
              borderRadius: 10,
              color: colors.textSecondary,
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}>
              <Download size={16} />
              PDF
            </button>
          </div>
        </div>

        {/* AI Summary */}
        <div style={{
          marginTop: 20,
          padding: '16px 20px',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          borderRadius: 12,
          borderLeft: `3px solid ${colors.primary}`,
          display: 'flex',
          alignItems: 'flex-start',
          gap: 14,
        }}>
          <Sparkles size={20} color={colors.primary} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: colors.primary, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              AI Günlük Özeti
            </div>
            <p style={{ margin: 0, fontSize: 15, color: colors.text, lineHeight: 1.6 }}>
              {dailyBrief.summary}
            </p>
          </div>
        </div>

        {/* Quick KPIs */}
        <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
          {[
            { label: 'Dünkü Ciro', ...dailyBrief.kpiSummary.ciro },
            { label: 'Sipariş', ...dailyBrief.kpiSummary.siparis },
            { label: 'Yeni Müşteri', ...dailyBrief.kpiSummary.musteri },
          ].map((kpi, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontSize: 11, color: colors.textMuted, marginBottom: 2 }}>{kpi.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: colors.text }}>{kpi.value}</span>
                  <span style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: kpi.status === 'up' ? colors.success : colors.danger,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}>
                    {kpi.status === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {kpi.change}
                  </span>
                </div>
              </div>
              {i < 2 && <div style={{ width: 1, height: 36, backgroundColor: colors.border, marginLeft: 12 }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Insights & Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', borderTop: `1px solid ${colors.border}` }}>
        {/* Insights */}
        <div style={{ padding: '24px 28px', borderRight: `1px solid ${colors.border}` }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Öne Çıkanlar
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {dailyBrief.insights.map((insight, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 14,
                padding: '14px 16px',
                backgroundColor: colors.bgSurface,
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: insight.type === 'success' ? colors.successBg : insight.type === 'danger' ? colors.dangerBg : colors.warningBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <insight.icon size={18} color={insight.type === 'success' ? colors.success : insight.type === 'danger' ? colors.danger : colors.warning} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 4 }}>{insight.title}</div>
                  <div style={{ fontSize: 13, color: colors.textMuted, lineHeight: 1.5 }}>{insight.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ padding: '24px 28px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Önerilen Aksiyonlar
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {dailyBrief.actions.map((action, i) => (
              <div key={i} style={{
                padding: '16px 18px',
                backgroundColor: colors.bgSurface,
                borderRadius: 12,
                border: `1px solid ${action.priority === 'high' ? colors.danger + '40' : colors.border}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: action.priority === 'high' ? colors.danger : colors.warning,
                    }} />
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: action.priority === 'high' ? colors.danger : colors.warning,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      {action.priority === 'high' ? 'Yüksek Öncelik' : 'Orta Öncelik'}
                    </span>
                  </div>
                  <span style={{ fontSize: 11, color: colors.textMuted }}>{action.dept}</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: colors.text, marginBottom: 12 }}>{action.text}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: colors.textMuted }}>Etki: {action.impact}</span>
                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 16px',
                    backgroundColor: action.priority === 'high' ? colors.primary : 'transparent',
                    border: action.priority === 'high' ? 'none' : `1px solid ${colors.border}`,
                    borderRadius: 8,
                    color: action.priority === 'high' ? 'white' : colors.textSecondary,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}>
                    Başlat
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// KPI Card Component
const KPICard = ({ label, value, change, changeType, target, icon: Icon }) => (
  <div style={{
    backgroundColor: colors.bgCard,
    borderRadius: 16,
    border: `1px solid ${colors.border}`,
    padding: '20px 24px',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
      <div style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: colors.primaryGlow,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon size={22} color={colors.primary} />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        padding: '6px 10px',
        borderRadius: 8,
        backgroundColor: changeType === 'up' ? colors.successBg : colors.dangerBg,
        color: changeType === 'up' ? colors.success : colors.danger,
        fontSize: 13,
        fontWeight: 600,
      }}>
        {changeType === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, color: colors.text, marginBottom: 4, letterSpacing: '-0.02em' }}>{value}</div>
    <div style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 12 }}>{label}</div>
    {target && (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        backgroundColor: colors.bgSurface,
        borderRadius: 8,
      }}>
        <Target size={14} color={colors.success} />
        <span style={{ fontSize: 12, color: colors.textMuted }}>Hedef: {target}</span>
        <CheckCircle2 size={14} color={colors.success} style={{ marginLeft: 'auto' }} />
      </div>
    )}
  </div>
);

// Alert Card Component
const AlertCard = ({ alert }) => {
  const styles = {
    critical: { bg: colors.dangerBg, border: colors.danger, color: colors.danger, label: 'KRİTİK', icon: AlertCircle },
    warning: { bg: colors.warningBg, border: colors.warning, color: colors.warning, label: 'UYARI', icon: AlertTriangle },
    info: { bg: colors.infoBg, border: colors.info, color: colors.info, label: 'BİLGİ', icon: Bell },
  };
  const s = styles[alert.severity] || styles.warning;
  const IconComponent = s.icon;

  return (
    <div style={{
      backgroundColor: s.bg,
      borderLeft: `3px solid ${s.border}`,
      borderRadius: '0 12px 12px 0',
      padding: '16px 18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <IconComponent size={14} color={s.color} />
          <span style={{ fontSize: 10, fontWeight: 700, color: s.color, letterSpacing: '0.5px' }}>{s.label}</span>
          <span style={{ fontSize: 11, color: colors.textMuted }}>• {alert.time} önce</span>
        </div>
        <button style={{
          background: 'none',
          border: 'none',
          padding: 4,
          cursor: 'pointer',
          opacity: 0.5,
        }}>
          <XCircle size={14} color={colors.textMuted} />
        </button>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 6 }}>{alert.title}</div>
      <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 12, lineHeight: 1.5 }}>{alert.message}</div>
      {alert.aiSuggestion && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          borderRadius: 8,
          marginBottom: 12,
        }}>
          <Sparkles size={12} color={colors.primary} />
          <span style={{ fontSize: 12, color: colors.primary, fontWeight: 500 }}>AI Önerisi: {alert.aiSuggestion}</span>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          flex: 1,
          padding: '10px 14px',
          backgroundColor: alert.severity === 'critical' ? s.border : 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: 8,
          color: alert.severity === 'critical' ? 'white' : colors.text,
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}>
          {alert.action}
          <ChevronRight size={14} />
        </button>
        <button style={{
          padding: '10px 14px',
          backgroundColor: 'transparent',
          border: `1px solid ${colors.border}`,
          borderRadius: 8,
          color: colors.textSecondary,
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
        }}>
          Sonra
        </button>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ label, current, target, unit }) => {
  const percentage = Math.min((current / target) * 100, 100);
  const isOnTarget = current >= target;

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: colors.textSecondary }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: isOnTarget ? colors.success : colors.text }}>
          {current}{unit} / {target}{unit}
        </span>
      </div>
      <div style={{ height: 6, backgroundColor: colors.bgSurface, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: isOnTarget ? colors.success : percentage > 70 ? colors.primary : colors.warning,
          borderRadius: 3,
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  );
};

// Dashboard View
const DashboardView = () => (
  <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
    {/* Daily Brief Hero */}
    <DailyBriefHero />

    {/* KPIs Row */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
      <KPICard label="Toplam Gelir" value="₺24.8M" change="+12.5%" changeType="up" target="₺23M" icon={DollarSign} />
      <KPICard label="Sipariş Sayısı" value="1,847" change="+8.2%" changeType="up" target="1,600" icon={Package} />
      <KPICard label="Aktif Müşteri" value="12,459" change="+5.7%" changeType="up" target="12,000" icon={Users} />
      <KPICard label="Ort. Sipariş" value="₺13.4K" change="-2.1%" changeType="down" icon={TrendingUp} />
    </div>

    {/* Main Grid */}
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20 }}>
      {/* Revenue Chart */}
      <div style={{
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        padding: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>Gelir & AI Tahmini</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: colors.textMuted }}>Aylık performans ve 3 aylık projeksiyon</p>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Gerçekleşen', color: colors.primary },
              { label: 'AI Tahmini', color: colors.primaryLight, dashed: true },
              { label: 'Hedef', color: colors.success, dashed: true },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <div style={{
                  width: 16,
                  height: 3,
                  backgroundColor: item.color,
                  borderRadius: 2,
                  opacity: item.dashed ? 0.6 : 1,
                }} />
                <span style={{ color: colors.textMuted }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={revenueData}>
            <defs>
              <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.primary} stopOpacity={0.25} />
                <stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
            <XAxis dataKey="ay" stroke={colors.textMuted} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={colors.textMuted} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}K`} />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.bgCardElevated,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: colors.text, fontWeight: 600, marginBottom: 4 }}
              formatter={(value, name) => [value ? `₺${value.toLocaleString()}K` : '-', name === 'gerceklesen' ? 'Gerçekleşen' : name === 'tahmin' ? 'AI Tahmini' : 'Hedef']}
            />
            <Area type="monotone" dataKey="gerceklesen" stroke={colors.primary} strokeWidth={2.5} fill="url(#gradientArea)" />
            <Line type="monotone" dataKey="tahmin" stroke={colors.primaryLight} strokeWidth={2.5} strokeDasharray="6 4" dot={{ fill: colors.primaryLight, r: 4 }} />
            <Line type="monotone" dataKey="hedef" stroke={colors.success} strokeWidth={2} strokeDasharray="4 4" dot={false} opacity={0.5} />
          </ComposedChart>
        </ResponsiveContainer>

        <div style={{
          marginTop: 16,
          padding: '12px 16px',
          backgroundColor: colors.primaryGlow,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <Lightbulb size={18} color={colors.primary} />
          <span style={{ fontSize: 13, color: colors.textSecondary }}>
            <strong style={{ color: colors.text }}>AI Tahmini:</strong> Eylül-Ekim döneminde %18 büyüme öngörülüyor. Model güveni: %94
          </span>
        </div>
      </div>

      {/* Right Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Alerts */}
        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>Aktif Uyarılar</h3>
            <span style={{
              padding: '4px 10px',
              backgroundColor: colors.dangerBg,
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 600,
              color: colors.danger,
            }}>3 yeni</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {alerts.map(alert => <AlertCard key={alert.id} alert={alert} />)}
          </div>
        </div>

        {/* Performance */}
        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 20,
        }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: colors.text }}>Hedef Durumu</h3>
          {performanceMetrics.map((m, i) => (
            <ProgressBar key={i} {...m} />
          ))}
        </div>
      </div>
    </div>

    {/* Bottom Row */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
      {/* Top Products */}
      <div style={{
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        padding: 24,
      }}>
        <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: colors.text }}>En İyi Ürünler</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {topProducts.map((p, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '14px 16px',
              backgroundColor: colors.bgSurface,
              borderRadius: 10,
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.textMuted, width: 24 }}>{i + 1}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: colors.text, flex: 1 }}>{p.name}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: colors.text, width: 90 }}>{p.revenue}</span>
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: p.status === 'up' ? colors.success : colors.danger,
                width: 60,
                textAlign: 'right',
              }}>{p.growth}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Activity Feed */}
      <div style={{
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        padding: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>Canlı Aktivite</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.success, animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, color: colors.success }}>Canlı</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { time: '14:23:45', event: 'Yeni sipariş alındı', source: 'ERP', type: 'success' },
            { time: '14:22:18', event: 'Stok güncellendi', source: 'Depo', type: 'info' },
            { time: '14:21:02', event: 'AI raporu oluşturuldu', source: 'AI', type: 'primary' },
            { time: '14:19:33', event: 'Ödeme onaylandı', source: 'Finans', type: 'success' },
            { time: '14:17:55', event: 'Anomali tespit edildi', source: 'ML', type: 'warning' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              backgroundColor: colors.bgSurface,
              borderRadius: 8,
              borderLeft: `3px solid ${
                item.type === 'success' ? colors.success :
                item.type === 'warning' ? colors.warning :
                item.type === 'primary' ? colors.primary : colors.info
              }`,
            }}>
              <span style={{ fontSize: 11, fontFamily: 'monospace', color: colors.textMuted }}>{item.time}</span>
              <span style={{ fontSize: 13, color: colors.text, flex: 1 }}>{item.event}</span>
              <span style={{
                fontSize: 10,
                padding: '3px 8px',
                borderRadius: 4,
                backgroundColor: item.type === 'primary' ? colors.primaryGlow : 
                  item.type === 'warning' ? colors.warningBg : 
                  item.type === 'success' ? colors.successBg : colors.infoBg,
                color: item.type === 'primary' ? colors.primary : 
                  item.type === 'warning' ? colors.warning : 
                  item.type === 'success' ? colors.success : colors.info,
                fontWeight: 600,
              }}>{item.source}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sources Panel */}
      <div style={{
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        padding: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>Veri Kaynakları</h3>
          <span style={{
            fontSize: 11,
            padding: '4px 10px',
            borderRadius: 6,
            backgroundColor: colors.successBg,
            color: colors.success,
            fontWeight: 600,
          }}>5 Aktif</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { name: 'ERP Sistemi', status: 'active', latency: '12ms', records: '2.4M' },
            { name: 'CRM Veritabanı', status: 'active', latency: '8ms', records: '856K' },
            { name: 'Finans Modülü', status: 'active', latency: '15ms', records: '3.1M' },
            { name: 'Lojistik API', status: 'active', latency: '23ms', records: '1.2M' },
            { name: 'E-Ticaret', status: 'active', latency: '18ms', records: '428K' },
          ].map((source, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 14px',
              backgroundColor: colors.bgSurface,
              borderRadius: 8,
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: colors.success,
                boxShadow: `0 0 8px ${colors.success}`,
              }} />
              <span style={{ fontSize: 13, color: colors.text, flex: 1 }}>{source.name}</span>
              <span style={{ fontSize: 11, color: colors.textMuted, fontFamily: 'monospace' }}>{source.latency}</span>
              <span style={{ fontSize: 11, color: colors.textSecondary, fontWeight: 500 }}>{source.records}</span>
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 16,
          padding: '12px 14px',
          backgroundColor: colors.primaryGlow,
          borderRadius: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ fontSize: 12, color: colors.textSecondary }}>Toplam Kayıt</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: colors.primary }}>7.9M</span>
        </div>
      </div>
    </div>

    {/* Third Row - Regional Distribution */}
    <div style={{
      backgroundColor: colors.bgCard,
      borderRadius: 16,
      border: `1px solid ${colors.border}`,
      padding: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>Bölgesel Performans</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 4, backgroundColor: colors.primary, borderRadius: 2 }} />
            <span style={{ fontSize: 11, color: colors.textMuted }}>Bu Ay</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 4, backgroundColor: colors.textMuted, borderRadius: 2, opacity: 0.4 }} />
            <span style={{ fontSize: 11, color: colors.textMuted }}>Geçen Ay</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        {regionalData.map((r, i) => (
          <div key={i} style={{
            padding: 16,
            backgroundColor: colors.bgSurface,
            borderRadius: 12,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 8 }}>{r.region}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: colors.text, marginBottom: 4 }}>{r.revenue}</div>
            <div style={{
              fontSize: 13,
              fontWeight: 600,
              color: r.change.startsWith('-') ? colors.danger : colors.success,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}>
              {r.change.startsWith('-') ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
              {r.change}
            </div>
            <div style={{
              marginTop: 12,
              height: 6,
              backgroundColor: colors.bg,
              borderRadius: 3,
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${r.value}%`,
                height: '100%',
                backgroundColor: r.change.startsWith('-') ? colors.danger : colors.primary,
                borderRadius: 3,
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// AI Assistant View
const AIView = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Merhaba! Ben Cognia AI asistanınız. 5 veri kaynağına bağlıyım ve 7.9 milyon kayda erişimim var.\n\nBana Türkçe sorular sorabilirsiniz. Örneğin:\n• "Geçen aya göre en çok düşen ürünler hangileri?"\n• "Marmara bölgesi performansını özetle"\n• "Stok durumu kritik ürünleri listele"\n• "Önümüzdeki ay için satış tahmini"'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

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

    // Simulate processing steps
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

### Dikkat Noktaları
⚠️ İstanbul Anadolu: Rakip aktivitesi artıyor
⚠️ Müşteri edinme maliyeti %8 yükseldi

**💡 AI Önerisi:**
Başarı modelini İç Anadolu'ya uyarlamak için bölge müdürleri arası bilgi transferi toplantısı düzenlenmeli.

*Güven skoru: %96 | 156K kayıt analiz edildi*`;
      } else if (query.toLowerCase().includes('stok')) {
        response = `## 📦 Stok Durumu Raporu

### 🔴 Kritik (Acil Aksiyon)
| Ürün | Stok | Günlük Satış | Tükenme |
|------|------|--------------|---------|
| Premium Widget A | 52 | 12.4 | **4.2 gün** |

### 🟡 Düşük (İzlenmeli)
| Ürün | Stok | Günlük Satış | Tükenme |
|------|------|--------------|---------|
| Deluxe Widget D | 156 | 8.2 | 19 gün |

### 🟢 Normal
- Standard Widget B: 324 adet (42 gün)
- Economy Widget C: 890 adet (28 gün)

### 🔵 Fazla Stok
- Basic Widget E: 1,240 adet (89 gün) - Depo maliyeti artıyor

**💡 AI Önerisi:**
1. Premium Widget A: 250 adet acil sipariş (ABC Ltd. - 3 gün teslimat)
2. Basic Widget E: %10 indirim kampanyası ile stok eritme

*Güven skoru: %98 | Gerçek zamanlı veri*`;
      } else if (query.toLowerCase().includes('tahmin') || query.toLowerCase().includes('forecast')) {
        response = `## 🔮 Q1 2026 Satış Tahmini

### Genel Projeksiyon
| Ay | Tahmin | Hedef | Güven Aralığı |
|----|--------|-------|---------------|
| Ocak | ₺26.9M | ₺27M | ₺25.5M - ₺28.3M |
| Şubat | ₺28.5M | ₺28M | ₺26.8M - ₺30.2M |
| Mart | ₺30.2M | ₺29M | ₺28.1M - ₺32.3M |

**Q1 Toplam: ₺85.6M** (Hedef: ₺84M, +1.9%)

### Büyüme Sürücüleri
📈 Economy Widget C: +35% talep artışı bekleniyor
📈 Kurumsal segment: Yeni müşteri pipeline güçlü
📈 Marmara: Momentum devam edecek

### Risk Faktörleri
📉 İç Anadolu trendi tersine çevrilmezse: -₺2.1M
📉 Premium Widget A stok sorunu çözülmezse: -₺850K

**💡 AI Önerisi:**
Hedefi %5 yukarı revize etmek için İç Anadolu aksiyon planı kritik.

*Model güveni: %91 | 3 yıllık veri + 12 değişken*`;
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
    <div style={{ display: 'flex', height: 'calc(100vh - 72px)', padding: 28, gap: 24 }}>
      {/* Chat */}
      <div style={{
        flex: 1,
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Brain size={24} color="white" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: colors.text }}>Cognia AI</h2>
            <div style={{ fontSize: 13, color: colors.success, display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.success }} />
              Türkçe NLP aktif • 7.9M kayıt bağlı
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%',
                padding: '16px 20px',
                borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                backgroundColor: msg.role === 'user' ? colors.primary : colors.bgCardElevated,
                color: colors.text,
                fontSize: 14,
                lineHeight: 1.7,
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div style={{
              padding: '20px 24px',
              backgroundColor: colors.bgCardElevated,
              borderRadius: 16,
              width: 'fit-content',
              minWidth: 320,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.info, animation: 'pulse 1s infinite' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.info }}>AI İşliyor</span>
              </div>
              {processingSteps.map((step, i) => {
                const isActive = i === processingStep;
                const isDone = i < processingStep;
                return (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 10,
                    opacity: isDone ? 1 : isActive ? 1 : 0.4,
                  }}>
                    <div style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: isDone ? colors.success : isActive ? colors.info : 'transparent',
                      border: isDone || isActive ? 'none' : `2px solid ${colors.textMuted}`,
                    }}>
                      {isDone && <CheckCircle2 size={12} color="white" />}
                    </div>
                    <span style={{ fontSize: 13, color: isDone ? colors.success : isActive ? colors.text : colors.textMuted }}>
                      {step.label}
                    </span>
                    {step.sources && isActive && (
                      <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
                        {step.sources.map((s, j) => (
                          <span key={j} style={{
                            fontSize: 10,
                            padding: '2px 8px',
                            backgroundColor: colors.infoBg,
                            color: colors.info,
                            borderRadius: 4,
                            fontWeight: 500,
                          }}>{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: 20, borderTop: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Türkçe soru sorun..."
              style={{
                flex: 1,
                padding: '16px 20px',
                borderRadius: 12,
                border: `1px solid ${colors.border}`,
                backgroundColor: colors.bgSurface,
                color: colors.text,
                fontSize: 15,
                outline: 'none',
              }}
            />
            <button
              onClick={handleSend}
              disabled={isProcessing}
              style={{
                padding: '16px 28px',
                borderRadius: 12,
                border: 'none',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                color: 'white',
                fontSize: 15,
                fontWeight: 600,
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                opacity: isProcessing ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Send size={18} />
              Gönder
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 24,
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: colors.text }}>Örnek Sorular</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Geçen aya göre en çok düşen ürünler?',
              'Marmara bölgesi performansını özetle',
              'Stok durumu kritik ürünleri listele',
              'Önümüzdeki ay satış tahmini',
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 10,
                  border: `1px solid ${colors.border}`,
                  backgroundColor: 'transparent',
                  color: colors.textSecondary,
                  fontSize: 14,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Query History */}
        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: colors.text }}>Son Sorgular</h3>
            <Clock size={14} color={colors.textMuted} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { query: 'Q4 satış projeksiyonu', time: '2 saat önce', dept: 'Satış' },
              { query: 'Stok optimizasyonu', time: '5 saat önce', dept: 'Operasyon' },
              { query: 'Müşteri segmentasyonu', time: 'Dün', dept: 'Pazarlama' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '10px 12px',
                backgroundColor: colors.bgSurface,
                borderRadius: 8,
                cursor: 'pointer',
              }}>
                <div style={{ fontSize: 13, color: colors.text, marginBottom: 4 }}>{item.query}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: colors.textMuted }}>{item.time}</span>
                  <span style={{
                    fontSize: 10,
                    padding: '2px 8px',
                    backgroundColor: colors.primaryGlow,
                    color: colors.primary,
                    borderRadius: 4,
                    fontWeight: 500,
                  }}>{item.dept}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources Panel */}
        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 24,
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: colors.text }}>Bağlı Veri Kaynakları</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dataSources.map((source, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                backgroundColor: colors.bgSurface,
                borderRadius: 8,
              }}>
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: colors.success,
                  boxShadow: `0 0 6px ${colors.success}`,
                }} />
                <span style={{ fontSize: 13, color: colors.text, flex: 1 }}>{source.name}</span>
                <span style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500 }}>{source.records}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 16,
            padding: '10px 12px',
            backgroundColor: colors.successBg,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 12, color: colors.success }}>Toplam Kayıt</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: colors.success }}>7.9M</span>
          </div>
        </div>

        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 24,
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, color: colors.text }}>AI Yetenekleri</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: AlertTriangle, label: 'Anomali Tespiti', desc: 'Beklenmedik değişimleri yakalar' },
              { icon: TrendingUp, label: 'Tahminleme', desc: 'Gelecek performansı öngörür' },
              { icon: FileText, label: 'Günlük Özet', desc: 'Her sabah yönetici briefingi' },
              { icon: Zap, label: 'Türkçe NLP', desc: 'Doğal dilde soru-cevap' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: colors.primaryGlow,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <item.icon size={18} color={colors.primary} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: colors.textMuted }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Analytics View
const AnalyticsView = () => {
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

  const MiniSparkline = ({ data, color, width = 80, height = 24 }) => {
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
    <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 600, color: colors.text }}>Analitik Dashboard</h2>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: colors.textMuted }}>Detaylı performans analizi ve AI öngörüleri</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            backgroundColor: colors.bgCard,
            border: `1px solid ${colors.border}`,
            borderRadius: 10,
            color: colors.textSecondary,
            fontSize: 13,
            cursor: 'pointer',
          }}>
            <Calendar size={16} />
            Son 8 Hafta
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
            border: 'none',
            borderRadius: 10,
            color: 'white',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            <Download size={16} />
            Rapor İndir
          </button>
        </div>
      </div>

      {/* AI Insights Banner */}
      <div style={{
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        padding: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `linear-gradient(135deg, ${colors.info}, ${colors.primary})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Sparkles size={18} color="white" />
          </div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>AI Otomatik Tespitler</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {aiInsights.map((insight, i) => (
            <div key={i} style={{
              padding: 16,
              backgroundColor: colors.bgSurface,
              borderRadius: 12,
              border: `1px solid ${insight.type === 'warning' ? colors.warningBg : colors.border}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <insight.icon size={18} color={
                  insight.type === 'trend' ? colors.success :
                  insight.type === 'warning' ? colors.warning : colors.info
                } />
                <span style={{ fontSize: 12, fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase' }}>
                  {insight.title}
                </span>
                <span style={{ marginLeft: 'auto', fontSize: 11, color: colors.success }}>%{insight.confidence}</span>
              </div>
              <p style={{ margin: 0, fontSize: 13, color: colors.text, lineHeight: 1.5 }}>{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        {/* Trend Chart */}
        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>Haftalık Performans Trendi</h3>
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 3, backgroundColor: colors.primary, borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: colors.textMuted }}>Ciro (₺K)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 3, backgroundColor: colors.info, borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: colors.textMuted }}>Sipariş</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 3, backgroundColor: colors.textMuted, borderRadius: 2, opacity: 0.5 }} />
                <span style={{ fontSize: 11, color: colors.textMuted }}>Geçen Yıl</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={trendData}>
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={colors.primary} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={colors.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
              <XAxis dataKey="week" stroke={colors.textMuted} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" stroke={colors.textMuted} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke={colors.textMuted} fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: colors.bgCardElevated, border: `1px solid ${colors.border}`, borderRadius: 8 }} />
              <Area yAxisId="left" type="monotone" dataKey="ciro" stroke={colors.primary} strokeWidth={2} fill="url(#trendGrad)" />
              <Line yAxisId="left" type="monotone" dataKey="oncekiYil" stroke={colors.textMuted} strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              <Line yAxisId="right" type="monotone" dataKey="siparis" stroke={colors.info} strokeWidth={2} dot={{ fill: colors.info, r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Category Comparison */}
        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>Kategori Karşılaştırması</h3>
            <span style={{ fontSize: 12, color: colors.textMuted }}>Bu Ay vs Geçen Ay</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryComparison} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} horizontal={false} />
              <XAxis type="number" stroke={colors.textMuted} fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke={colors.textMuted} fontSize={11} tickLine={false} axisLine={false} width={70} />
              <Tooltip contentStyle={{ backgroundColor: colors.bgCardElevated, border: `1px solid ${colors.border}`, borderRadius: 8 }} />
              <Bar dataKey="gecenAy" fill={colors.textMuted} radius={[0, 4, 4, 0]} name="Geçen Ay" opacity={0.5} />
              <Bar dataKey="buAy" radius={[0, 4, 4, 0]} name="Bu Ay">
                {categoryComparison.map((entry, i) => (
                  <Cell key={i} fill={entry.change >= 0 ? colors.primary : colors.danger} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funnel and Heatmap Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 20 }}>
        {/* Sales Funnel */}
        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 24,
        }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 600, color: colors.text }}>Satış Hunisi</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { stage: 'Ziyaretçi', value: 12500, percent: 100, color: colors.info },
              { stage: 'Potansiyel', value: 4200, percent: 33.6, color: colors.primary },
              { stage: 'Teklif', value: 1850, percent: 14.8, color: colors.primaryLight },
              { stage: 'Müzakere', value: 720, percent: 5.8, color: colors.warning },
              { stage: 'Kazanılan', value: 312, percent: 2.5, color: colors.success },
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}>
                  <span style={{ fontSize: 13, color: colors.textSecondary }}>{item.stage}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{item.value.toLocaleString()}</span>
                </div>
                <div style={{
                  height: 28,
                  backgroundColor: colors.bgSurface,
                  borderRadius: 6,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <div style={{
                    width: `${item.percent}%`,
                    height: '100%',
                    backgroundColor: item.color,
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: item.percent > 10 ? 'auto' : 40,
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>{item.percent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 16,
            padding: '12px 14px',
            backgroundColor: colors.successBg,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: 12, color: colors.textSecondary }}>Dönüşüm Oranı</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.success }}>2.5%</span>
          </div>
        </div>

        {/* Performance Heatmap */}
        <div style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          border: `1px solid ${colors.border}`,
          padding: 24,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>Haftalık Performans Isı Haritası</h3>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: colors.textMuted }}>Düşük</span>
              <div style={{ display: 'flex', gap: 2 }}>
                {['#1e3a5f', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'].map((c, i) => (
                  <div key={i} style={{ width: 16, height: 10, backgroundColor: c, borderRadius: 2 }} />
                ))}
              </div>
              <span style={{ fontSize: 11, color: colors.textMuted }}>Yüksek</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto repeat(7, 1fr)', gap: 4 }}>
            {/* Header */}
            <div style={{ padding: 8 }} />
            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, i) => (
              <div key={i} style={{ padding: 8, textAlign: 'center', fontSize: 11, color: colors.textMuted, fontWeight: 500 }}>{day}</div>
            ))}
            {/* Rows */}
            {[
              { label: 'Satış', data: [85, 72, 90, 88, 95, 45, 30] },
              { label: 'Sipariş', data: [78, 80, 85, 75, 92, 40, 25] },
              { label: 'Ziyaret', data: [90, 88, 95, 92, 98, 60, 45] },
              { label: 'Dönüşüm', data: [65, 70, 75, 68, 82, 55, 40] },
            ].map((row, ri) => (
              <React.Fragment key={ri}>
                <div style={{ padding: '8px 12px', fontSize: 12, color: colors.textSecondary, display: 'flex', alignItems: 'center' }}>{row.label}</div>
                {row.data.map((val, ci) => {
                  const intensity = val / 100;
                  const bgColor = `rgba(59, 130, 246, ${0.2 + intensity * 0.8})`;
                  return (
                    <div key={ci} style={{
                      padding: 8,
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 600,
                      color: intensity > 0.6 ? 'white' : colors.text,
                      backgroundColor: bgColor,
                      borderRadius: 6,
                      cursor: 'pointer',
                    }}>
                      {val}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div style={{
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        border: `1px solid ${colors.border}`,
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: `1px solid ${colors.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: colors.text }}>Detaylı Ürün Performansı</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Search size={16} color={colors.textMuted} />
            <input
              placeholder="Ürün ara..."
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: colors.text,
                fontSize: 13,
                outline: 'none',
                width: 120,
              }}
            />
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: colors.bgSurface }}>
              {['Ürün', 'Ciro', 'Adet', 'Değişim', 'Kar Marjı', 'Stok', 'Trend'].map(h => (
                <th key={h} style={{
                  padding: '14px 24px',
                  textAlign: 'left',
                  fontSize: 11,
                  fontWeight: 600,
                  color: colors.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productDetails.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${colors.border}` }}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {row.stock < 100 && <AlertCircle size={16} color={colors.danger} />}
                    <span style={{ fontSize: 14, fontWeight: 500, color: colors.text }}>{row.name}</span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 14, fontWeight: 600, color: colors.text }}>
                  ₺{(row.revenue / 1000000).toFixed(2)}M
                </td>
                <td style={{ padding: '16px 24px', fontSize: 14, color: colors.textSecondary }}>
                  {row.units.toLocaleString()}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    color: row.change >= 0 ? colors.success : colors.danger,
                  }}>
                    {row.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    <span style={{ fontSize: 14, fontWeight: 600 }}>
                      {row.change >= 0 ? '+' : ''}{row.change}%
                    </span>
                  </div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: 14, color: colors.text }}>{row.margin}%</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 600,
                    backgroundColor: row.stock < 100 ? colors.dangerBg : row.stock > 1000 ? colors.warningBg : colors.successBg,
                    color: row.stock < 100 ? colors.danger : row.stock > 1000 ? colors.warning : colors.success,
                  }}>
                    {row.stock}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <MiniSparkline
                    data={row.trend}
                    color={row.change >= 0 ? colors.success : colors.danger}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main App
export default function CogniaPlatform() {
  const [activeView, setActiveView] = useState('dashboard');

  // Add global styles for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      * {
        scrollbar-width: thin;
        scrollbar-color: #1e293b #0a0f1a;
      }
      *::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      *::-webkit-scrollbar-track {
        background: #0a0f1a;
      }
      *::-webkit-scrollbar-thumb {
        background: #1e293b;
        border-radius: 4px;
      }
      *::-webkit-scrollbar-thumb:hover {
        background: #334155;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      backgroundColor: colors.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif',
      color: colors.text,
    }}>
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Header />
        <main style={{ flex: 1, overflow: 'auto', backgroundColor: colors.bgSurface }}>
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'ai' && <AIView />}
          {activeView === 'analytics' && <AnalyticsView />}
        </main>
      </div>
    </div>
  );
}
