import React from 'react';
import { motion } from 'framer-motion';
import {
  FaHospital, FaHotel, FaStore, FaGraduationCap, FaCar, FaBuilding,
  FaCheckCircle, FaPhone, FaCalendar, FaChartLine, FaGlobe,
  FaRobot, FaShieldAlt, FaCode, FaArrowRight
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';
import ScrollProgress from '../components/ScrollProgress';

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
      ],
      color: 'cyan' as const
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
      ],
      color: 'purple' as const
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
      ],
      color: 'blue' as const
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
      ],
      color: 'green' as const
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
      ],
      color: 'cyan' as const
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
      ],
      color: 'purple' as const
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

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-32 pt-40">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto text-center"
            >
              {/* Tech Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-8"
              >
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-purple-500" />
                  <div className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
                      {language === 'tr' ? 'Çözümlerimiz' : 'Our Solutions'}
                    </span>
                  </div>
                  <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-purple-500" />
                </div>
              </motion.div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin mb-6">
                <span className="block font-extralight text-gray-400">
                  {language === 'tr' ? 'Her Sektör İçin' : 'AI Solutions for'}
                </span>
                <span className="block font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {language === 'tr' ? 'AI Çözümleri' : 'Every Industry'}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 font-light">
                {language === 'tr'
                  ? 'Sektörünüze özel AI çözümleriyle müşteri deneyiminizi dönüştürün'
                  : 'Transform your customer experience with industry-specific AI solutions'}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {[
                  { value: '87%', label: language === 'tr' ? 'Dönüşüm' : 'Conversion' },
                  { value: '24/7', label: language === 'tr' ? 'Aktif' : 'Active' },
                  { value: '60%', label: language === 'tr' ? 'Tasarruf' : 'Savings' },
                  { value: '0.5s', label: language === 'tr' ? 'Yanıt' : 'Response' }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              <TechCard
                key={index}
                glowColor={industry.color}
                delay={index * 0.1}
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 mb-4 bg-gradient-to-br ${
                    industry.color === 'cyan' ? 'from-cyan-500/10 to-cyan-600/20' :
                    industry.color === 'blue' ? 'from-blue-500/10 to-blue-600/20' :
                    industry.color === 'purple' ? 'from-purple-500/10 to-purple-600/20' :
                    'from-green-500/10 to-green-600/20'
                  } rounded-xl flex items-center justify-center border ${
                    industry.color === 'cyan' ? 'border-cyan-500/20' :
                    industry.color === 'blue' ? 'border-blue-500/20' :
                    industry.color === 'purple' ? 'border-purple-500/20' :
                    'border-green-500/20'
                  }`}>
                    <industry.icon className={`text-2xl ${
                      industry.color === 'cyan' ? 'text-cyan-400' :
                      industry.color === 'blue' ? 'text-blue-400' :
                      industry.color === 'purple' ? 'text-purple-400' :
                      'text-green-400'
                    }`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className={`text-xl font-semibold mb-2 ${
                    industry.color === 'cyan' ? 'text-cyan-400' :
                    industry.color === 'blue' ? 'text-blue-400' :
                    industry.color === 'purple' ? 'text-purple-400' :
                    'text-green-400'
                  }`}>{industry.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 font-light">{industry.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 flex-grow">
                    {industry.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300 text-xs">
                        <FaCheckCircle className={`flex-shrink-0 mt-0.5 ${
                          industry.color === 'cyan' ? 'text-cyan-500' :
                          industry.color === 'blue' ? 'text-blue-500' :
                          industry.color === 'purple' ? 'text-purple-500' :
                          'text-green-500'
                        }`} />
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className={`flex items-center gap-2 text-xs ${
                      industry.color === 'cyan' ? 'text-cyan-400/70' :
                      industry.color === 'blue' ? 'text-blue-400/70' :
                      industry.color === 'purple' ? 'text-purple-400/70' :
                      'text-green-400/70'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                        industry.color === 'cyan' ? 'bg-cyan-400' :
                        industry.color === 'blue' ? 'bg-blue-400' :
                        industry.color === 'purple' ? 'bg-purple-400' :
                        'bg-green-400'
                      }`} />
                      <span>{language === 'tr' ? 'Aktif' : 'Active'}</span>
                    </div>
                  </div>
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
                  : 'Human-like natural dialogues',
                color: 'cyan' as const
              },
              {
                icon: FaCalendar,
                title: language === 'tr' ? 'Akıllı Planlama' : 'Smart Scheduling',
                description: language === 'tr'
                  ? 'Takvim entegrasyonu ile otomatik randevu'
                  : 'Auto-booking with calendar integration',
                color: 'blue' as const
              },
              {
                icon: FaGlobe,
                title: language === 'tr' ? 'Çoklu Dil' : 'Multi-Language',
                description: language === 'tr'
                  ? '20+ dilde akıcı konuşma'
                  : 'Fluent in 20+ languages',
                color: 'purple' as const
              },
              {
                icon: FaChartLine,
                title: language === 'tr' ? 'Analitik' : 'Analytics',
                description: language === 'tr'
                  ? 'Detaylı raporlar ve içgörüler'
                  : 'Detailed reports and insights',
                color: 'green' as const
              },
              {
                icon: FaShieldAlt,
                title: language === 'tr' ? 'Güvenlik' : 'Security',
                description: language === 'tr'
                  ? 'Kurumsal düzeyde veri güvenliği'
                  : 'Enterprise-grade data protection',
                color: 'cyan' as const
              },
              {
                icon: FaCode,
                title: language === 'tr' ? 'API Entegrasyonu' : 'API Integration',
                description: language === 'tr'
                  ? 'Mevcut sistemlerinizle sorunsuz entegrasyon'
                  : 'Seamless integration with your systems',
                color: 'blue' as const
              }
            ].map((feature, index) => (
              <TechCard key={index} glowColor={feature.color} delay={index * 0.1}>
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${
                    feature.color === 'cyan' ? 'from-cyan-500/10 to-cyan-600/20' :
                    feature.color === 'blue' ? 'from-blue-500/10 to-blue-600/20' :
                    feature.color === 'purple' ? 'from-purple-500/10 to-purple-600/20' :
                    'from-green-500/10 to-green-600/20'
                  } rounded-lg flex items-center justify-center border ${
                    feature.color === 'cyan' ? 'border-cyan-500/20' :
                    feature.color === 'blue' ? 'border-blue-500/20' :
                    feature.color === 'purple' ? 'border-purple-500/20' :
                    'border-green-500/20'
                  }`}>
                    <feature.icon className={`text-xl ${
                      feature.color === 'cyan' ? 'text-cyan-400' :
                      feature.color === 'blue' ? 'text-blue-400' :
                      feature.color === 'purple' ? 'text-purple-400' :
                      'text-green-400'
                    }`} />
                  </div>
                  <h3 className={`text-lg font-semibold mb-2 ${
                    feature.color === 'cyan' ? 'text-cyan-400' :
                    feature.color === 'blue' ? 'text-blue-400' :
                    feature.color === 'purple' ? 'text-purple-400' :
                    'text-green-400'
                  }`}>{feature.title}</h3>
                  <p className="text-sm text-gray-400 font-light">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* Why Choose Section */}
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
              { value: '60%', label: language === 'tr' ? 'Maliyet Azalışı' : 'Cost Reduction', suffix: '↓' },
              { value: '0.5s', label: language === 'tr' ? 'Yanıt Süresi' : 'Response Time', suffix: '' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${
                  index === 0 ? 'from-green-400 to-green-300' :
                  index === 1 ? 'from-cyan-400 to-cyan-300' :
                  index === 2 ? 'from-blue-400 to-blue-300' :
                  'from-purple-400 to-purple-300'
                } bg-clip-text text-transparent mb-2`}>
                  {stat.value}
                  {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider font-light">
                  {stat.label}
                </div>
              </motion.div>
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
            ? '48 saat içinde kurulum, anında sonuç'
            : 'Setup in 48 hours, immediate results'}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-200"></div>
                <div className="relative flex items-center justify-center gap-3 px-10 py-5 bg-black rounded-lg leading-none">
                  <span className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {language === 'tr' ? 'Ücretsiz Demo' : 'Schedule Free Demo'}
                  </span>
                  <FaArrowRight className="text-purple-400 text-sm group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>

              <motion.a
                href="tel:+16163263328"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group w-full sm:w-auto"
              >
                <div className="relative flex items-center justify-center gap-3 px-10 py-5 bg-black/50 backdrop-blur-sm border border-gray-700 hover:border-purple-500/50 rounded-lg transition-all duration-200">
                  <FaPhone className="text-purple-400 text-sm animate-pulse" />
                  <span className="text-lg font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
                    +1 616-326-3328
                  </span>
                </div>
              </motion.a>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default Solutions;