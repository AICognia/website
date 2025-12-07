import React from 'react';
import {
  FaHospital, FaHotel, FaStore, FaGraduationCap, FaCar, FaBuilding,
  FaCheckCircle, FaPhone, FaCalendar, FaChartLine, FaGlobe,
  FaRobot, FaShieldAlt, FaCode, FaCalendarCheck, FaArrowRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';
import ScrollProgress from '../components/ScrollProgress';
import { Link } from 'react-router-dom';

const Solutions: React.FC = () => {
  const { language } = useLanguage();

  const industries = [
    {
      icon: FaHospital,
      title: language === 'tr' ? 'Tıbbi & Dental' : 'Medical & Dental',
      description: language === 'tr'
        ? 'Doktor, diş hekimi, fizyoterapi, veteriner klinikleri'
        : 'Doctors, dentists, physiotherapy, veterinary clinics',
      features: [
        language === 'tr' ? 'Gelen hasta aramaları 24/7' : 'Inbound patient calls 24/7',
        language === 'tr' ? 'Randevu onayı için giden aramalar' : 'Outbound appointment confirmations',
        language === 'tr' ? 'Hasta takibi ve hatırlatmalar' : 'Patient follow-ups and reminders'
      ]
    },
    {
      icon: FaStore,
      title: language === 'tr' ? 'Güzellik & Wellness' : 'Beauty & Wellness',
      description: language === 'tr'
        ? 'Kuaför salonları, spa, nail salon, masaj terapisi'
        : 'Hair salons, spas, nail salons, massage therapy',
      features: [
        language === 'tr' ? 'Gelen rezervasyon aramaları' : 'Inbound booking calls',
        language === 'tr' ? 'Müşteri takibi için giden aramalar' : 'Outbound client follow-ups',
        language === 'tr' ? 'Randevu hatırlatma aramaları' : 'Appointment reminder calls'
      ]
    },
    {
      icon: FaBuilding,
      title: language === 'tr' ? 'Ev Servisleri' : 'Home Services',
      description: language === 'tr'
        ? 'Tesisatçı, elektrikçi, HVAC, temizlik servisleri'
        : 'Plumbers, electricians, HVAC, cleaning services',
      features: [
        language === 'tr' ? 'Acil servis aramaları 24/7' : 'Emergency service calls 24/7',
        language === 'tr' ? 'Müşteri adayı değerlendirme aramaları' : 'Lead qualification calls',
        language === 'tr' ? 'Servis takip aramaları' : 'Service follow-up calls'
      ]
    },
    {
      icon: FaHotel,
      title: language === 'tr' ? 'Restoranlar & Kafeler' : 'Restaurants & Cafes',
      description: language === 'tr'
        ? 'Fine dining, fast food, kafeler, catering'
        : 'Fine dining, fast food, cafes, catering',
      features: [
        language === 'tr' ? 'Gelen rezervasyon ve sipariş aramaları' : 'Inbound reservation and order calls',
        language === 'tr' ? 'Rezervasyon onayı aramaları' : 'Reservation confirmation calls',
        language === 'tr' ? 'Müşteri memnuniyeti aramaları' : 'Customer satisfaction calls'
      ]
    },
    {
      icon: FaCar,
      title: language === 'tr' ? 'Otomotiv Servisleri' : 'Auto Services',
      description: language === 'tr'
        ? 'Oto tamirhaneleri, lastik servisleri, detaylı temizlik'
        : 'Auto repair shops, tire services, car detailing',
      features: [
        language === 'tr' ? 'Gelen servis randevu aramaları' : 'Inbound service appointment calls',
        language === 'tr' ? 'Servis hatırlatma aramaları' : 'Service reminder calls',
        language === 'tr' ? 'Müşteri takip aramaları' : 'Customer follow-up calls'
      ]
    },
    {
      icon: FaGraduationCap,
      title: language === 'tr' ? 'Hukuk & Finans' : 'Legal & Financial',
      description: language === 'tr'
        ? 'Avukat büroları, muhasebeciler, danışmanlık firmaları'
        : 'Law firms, accountants, consulting firms',
      features: [
        language === 'tr' ? 'Gelen danışma aramaları' : 'Inbound consultation calls',
        language === 'tr' ? 'Müşteri adayı değerlendirme' : 'Lead qualification screening',
        language === 'tr' ? 'Randevu hatırlatma aramaları' : 'Appointment reminder calls'
      ]
    }
  ];

  return (
    <div className="min-h-screen relative bg-black text-white">
      <ScrollProgress />

      {/* Dynamic Tech Background */}
      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        {/* Hero Section - Scale.com style */}
        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  {language === 'tr' ? 'Çözümlerimiz' : 'Our Solutions'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                {language === 'tr' ? 'Her Sektör İçin' : 'AI Solutions for'}
                <br />
                {language === 'tr' ? 'AI Çözümleri' : 'Every Industry'}
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {language === 'tr'
                  ? 'Sektörünüze özel AI çözümleriyle müşteri deneyiminizi dönüştürün'
                  : 'Transform your customer experience with industry-specific AI solutions'}
              </p>
            </div>
          </div>
        </section>

        {/* Trusted by Industry Leaders - Sliding Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-4">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  {language === 'tr' ? 'Güvenilen Sektörler' : 'Trusted by Industry Leaders'}
                </span>
              </div>
            </div>

            {/* Sliding Industries */}
            <div className="relative">
              <div className="flex gap-4 animate-slideIndustries">
                {/* First set */}
                {[
                  'Healthcare', 'Finance', 'Retail', 'Legal', 'Real Estate',
                  'Automotive', 'Hospitality', 'Education', 'Insurance', 'Technology',
                  'Manufacturing', 'Consulting', 'E-commerce', 'Logistics', 'Telecommunications'
                ].map((industry, index) => (
                  <div
                    key={`first-${index}`}
                    className="flex-shrink-0 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-light text-lg tracking-wide"
                  >
                    {industry}
                  </div>
                ))}
                {/* Duplicate for infinite scroll */}
                {[
                  'Healthcare', 'Finance', 'Retail', 'Legal', 'Real Estate',
                  'Automotive', 'Hospitality', 'Education', 'Insurance', 'Technology',
                  'Manufacturing', 'Consulting', 'E-commerce', 'Logistics', 'Telecommunications'
                ].map((industry, index) => (
                  <div
                    key={`second-${index}`}
                    className="flex-shrink-0 px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-light text-lg tracking-wide"
                  >
                    {industry}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <TechSection
          badge={language === 'tr' ? 'Sektörler' : 'Industries'}
          title={language === 'tr' ? 'Sektörlere Göre Çözümler' : 'Solutions by Industry'}
          subtitle={language === 'tr'
            ? 'Her sektörün kendine özgü ihtiyaçlarını anlıyoruz'
            : 'We understand the unique needs of each industry'}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {industries.map((industry, index) => (
              <TechCard key={index}>
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 mb-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <industry.icon className="text-2xl text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-medium text-white mb-2">{industry.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{industry.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 flex-grow">
                    {industry.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                        <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* Platform Features */}
        <TechSection
          badge={language === 'tr' ? 'Özellikler' : 'Features'}
          title={language === 'tr' ? 'Platform Özellikleri' : 'Platform Features'}
          subtitle={language === 'tr' ? 'Güçlü özellikler, basit kullanım' : 'Powerful features, simple to use'}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: FaRobot,
                title: language === 'tr' ? 'Doğal Konuşma' : 'Natural Conversation',
                description: language === 'tr'
                  ? 'İnsan gibi doğal diyaloglar'
                  : 'Human-like natural dialogues'
              },
              {
                icon: FaCalendar,
                title: language === 'tr' ? 'Akıllı Planlama' : 'Smart Scheduling',
                description: language === 'tr'
                  ? 'Takvim entegrasyonu ile otomatik randevu'
                  : 'Auto-booking with calendar integration'
              },
              {
                icon: FaGlobe,
                title: language === 'tr' ? 'Çoklu Dil' : 'Multi-Language',
                description: language === 'tr'
                  ? '20+ dilde akıcı konuşma'
                  : 'Fluent in 20+ languages'
              },
              {
                icon: FaChartLine,
                title: language === 'tr' ? 'Analitik' : 'Analytics',
                description: language === 'tr'
                  ? 'Detaylı raporlar ve içgörüler'
                  : 'Detailed reports and insights'
              },
              {
                icon: FaShieldAlt,
                title: language === 'tr' ? 'Güvenlik' : 'Security',
                description: language === 'tr'
                  ? 'Kurumsal düzeyde veri güvenliği'
                  : 'Enterprise-grade data protection'
              },
              {
                icon: FaCode,
                title: language === 'tr' ? 'API Entegrasyonu' : 'API Integration',
                description: language === 'tr'
                  ? 'Mevcut sistemlerinizle sorunsuz entegrasyon'
                  : 'Seamless integration with your systems'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="text-xl text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* Stats Section */}
        <TechSection
          badge={language === 'tr' ? 'Avantajlar' : 'Benefits'}
          title={language === 'tr' ? 'Neden Cognia AI?' : 'Why Choose Cognia AI?'}
          subtitle={language === 'tr'
            ? 'İşletmenizi büyütürken maliyetleri düşürün'
            : 'Transform your customer service with measurable results'}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '87%', label: language === 'tr' ? 'Dönüşüm Artışı' : 'Conversion Rate', suffix: '↑' },
              { value: '24/7', label: language === 'tr' ? 'Kesintisiz' : 'Always On', suffix: '' },
              { value: '76%', label: language === 'tr' ? 'Maliyet Azalışı' : 'Cost Reduction', suffix: '↓' },
              { value: '0.5s', label: language === 'tr' ? 'Yanıt Süresi' : 'Response Time', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </TechSection>

        {/* CTA Section */}
        <TechSection
          badge={language === 'tr' ? 'Başlayın' : 'Get Started'}
          title={language === 'tr'
            ? 'Sektörünüze Özel AI Çözümünü Keşfedin'
            : 'Discover Your Industry AI Solution'}
          subtitle={language === 'tr'
            ? '1 hafta içinde kurulum, anında sonuç'
            : 'Setup in 1 week, immediate results'}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/demo"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                {language === 'tr' ? 'Ücretsiz Demo' : 'Schedule Free Demo'}
                <FaArrowRight className="text-sm" />
              </Link>

              <a
                href="tel:+16163263328"
                className="flex items-center gap-3 px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                <FaPhone className="text-sm" />
                +1 616-326-3328
              </a>
            </div>
          </div>
        </TechSection>
      </div>

      <style>{`
        @keyframes slideIndustries {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slideIndustries {
          animation: slideIndustries 40s linear infinite;
        }

        .animate-slideIndustries:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Solutions;
