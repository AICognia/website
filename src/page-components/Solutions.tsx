import React from 'react';
import {
  FaHospital, FaHotel, FaStore, FaGraduationCap, FaCar, FaBuilding,
  FaCheckCircle, FaPhone, FaCalendar, FaChartLine, FaGlobe,
  FaRobot, FaShieldAlt, FaCode, FaCalendarCheck, FaArrowRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';
import Link from 'next/link';

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
    <div className="w-full">
      <SEO page="solutions" />

      {/* Hero Section - Scale.com style */}
      <section className="relative pt-24 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 lg:pb-32">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] mx-auto">
          <div className="max-w-4xl mx-auto text-center py-10 sm:py-16 lg:py-20 border-b border-[rgba(55,50,47,0.12)] shadow-[0_1px_0px_white]">
            <div className="inline-block px-2.5 sm:px-3 py-1 bg-[rgba(55,50,47,0.04)] border border-[rgba(55,50,47,0.12)] rounded-full mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs text-[rgba(55,50,47,0.70)] uppercase tracking-widest">
                {language === 'tr' ? 'Çözümlerimiz' : 'Our Solutions'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-normal text-[#37322F] mb-4 sm:mb-6">
              {language === 'tr' ? 'Her Sektör İçin' : 'AI Solutions for'}
              <br />
              {language === 'tr' ? 'AI Çözümleri' : 'Every Industry'}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[rgba(55,50,47,0.70)] max-w-3xl mx-auto px-2">
              {language === 'tr'
                ? 'Sektörünüze özel AI çözümleriyle müşteri deneyiminizi dönüştürün'
                : 'Transform your customer experience with industry-specific AI solutions'}
            </p>
          </div>
        </div>
      </section>

      {/* Trusted by Industry Leaders - Sliding Section */}
      <section className="relative py-10 sm:py-12 lg:py-16 overflow-hidden border-b border-[rgba(55,50,47,0.12)] shadow-[0_1px_0px_white]">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-12">
            <div className="inline-block px-2.5 sm:px-3 py-1 bg-[rgba(55,50,47,0.04)] border border-[rgba(55,50,47,0.12)] rounded-full mb-4">
              <span className="text-[10px] sm:text-xs text-[rgba(55,50,47,0.70)] uppercase tracking-widest">
                {language === 'tr' ? 'Güvenilen Sektörler' : 'Trusted by Industry Leaders'}
              </span>
            </div>
          </div>

          {/* Sliding Industries */}
          <div className="relative">
            <div className="flex gap-2 sm:gap-3 lg:gap-4 animate-slideIndustries">
              {/* First set */}
              {[
                'Healthcare', 'Finance', 'Retail', 'Legal', 'Real Estate',
                'Automotive', 'Hospitality', 'Education', 'Insurance', 'Technology',
                'Manufacturing', 'Consulting', 'E-commerce', 'Logistics', 'Telecommunications'
              ].map((industry, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-transparent border border-[rgba(55,50,47,0.12)] rounded-md text-[rgba(55,50,47,0.80)] font-normal text-sm sm:text-base lg:text-lg tracking-wide"
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
                  className="flex-shrink-0 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 bg-transparent border border-[rgba(55,50,47,0.12)] rounded-md text-[rgba(55,50,47,0.80)] font-normal text-sm sm:text-base lg:text-lg tracking-wide"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {industries.map((industry, index) => (
            <TechCard key={index}>
              <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-3 sm:mb-4 bg-[rgba(55,50,47,0.04)] border border-[rgba(55,50,47,0.12)] rounded-md flex items-center justify-center">
                  <industry.icon className="text-lg sm:text-xl lg:text-2xl text-[rgba(55,50,47,0.80)]" />
                </div>

                {/* Title & Description */}
                <h3 className="text-base sm:text-lg lg:text-xl font-serif font-normal text-[#37322F] mb-1.5 sm:mb-2">{industry.title}</h3>
                <p className="text-xs sm:text-sm text-[rgba(55,50,47,0.70)] mb-3 sm:mb-4">{industry.description}</p>

                {/* Features */}
                <ul className="space-y-1.5 sm:space-y-2 flex-grow">
                  {industry.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-[rgba(55,50,47,0.80)] text-xs sm:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-[rgba(55,50,47,0.60)] text-[10px] sm:text-xs" />
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
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto">
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
                <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mx-auto mb-2 sm:mb-3 lg:mb-4 bg-[rgba(55,50,47,0.04)] border border-[rgba(55,50,47,0.12)] rounded-md flex items-center justify-center">
                  <feature.icon className="text-base sm:text-lg lg:text-xl text-[rgba(55,50,47,0.80)]" />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-serif font-normal text-[#37322F] mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-[10px] sm:text-xs lg:text-sm text-[rgba(55,50,47,0.70)]">{feature.description}</p>
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {[
            { value: '87%', label: language === 'tr' ? 'Dönüşüm Artışı' : 'Conversion Rate', suffix: '↑' },
            { value: '24/7', label: language === 'tr' ? 'Kesintisiz' : 'Always On', suffix: '' },
            { value: '76%', label: language === 'tr' ? 'Maliyet Azalışı' : 'Cost Reduction', suffix: '↓' },
            { value: '0.5s', label: language === 'tr' ? 'Yanıt Süresi' : 'Response Time', suffix: '' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#37322F] mb-1 sm:mb-2">
                {stat.value}
                {stat.suffix && <span className="text-base sm:text-xl lg:text-2xl ml-0.5 sm:ml-1">{stat.suffix}</span>}
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-[rgba(55,50,47,0.70)]">
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
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/demo"
              className="btn-primary w-full sm:w-auto"
            >
              <span>{language === 'tr' ? 'Ücretsiz Demo' : 'Schedule Free Demo'}</span>
            </Link>

            <a
              href="tel:+16163263328"
              className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-[rgba(55,50,47,0.12)] hover:bg-[rgba(55,50,47,0.04)] text-[rgba(55,50,47,0.80)] text-base sm:text-lg font-medium rounded-md transition-colors"
            >
              <FaPhone className="text-xs sm:text-sm" />
              +1 616-326-3328
            </a>
          </div>
        </div>
      </TechSection>

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
    </div >
  );
};

export default Solutions;
