import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHospital, FaHotel, FaStore, FaGraduationCap, FaCar, FaBuilding,
  FaCheckCircle, FaPhone, FaCalendar, FaChartLine, FaGlobe,
  FaRobot, FaShieldAlt, FaCode 
} from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import GradientOrbs from '../components/GradientOrbs';
import GridPattern from '../components/GridPattern';
import GlassCard from '../components/GlassCard';
import ParticleNetwork from '../components/ParticleNetwork';
import NoiseTexture from '../components/NoiseTexture';

const Solutions: React.FC = () => {
  const { language } = useLanguage();

  const industries = [
    {
      icon: <FaHospital />,
      title: language === 'tr' ? 'Tıbbi & Dental' : 'Medical & Dental',
      description: language === 'tr'
        ? 'Doktor, diş hekimi, fizyoterapi, veteriner klinikleri'
        : 'Doctors, dentists, physiotherapy, veterinary clinics',
      features: [
        language === 'tr' ? 'Randevu planlama & iptaller' : 'Appointment scheduling & cancellations',
        language === 'tr' ? 'Sigorta doğrulama' : 'Insurance verification',
        language === 'tr' ? 'HIPAA uyumlu' : 'HIPAA compliant'
      ],
      color: 'cyan'
    },
    {
      icon: <FaStore />,
      title: language === 'tr' ? 'Güzellik & Wellness' : 'Beauty & Wellness',
      description: language === 'tr'
        ? 'Kuaför salonları, spa, nail salon, masaj terapisi'
        : 'Hair salons, spas, nail salons, massage therapy',
      features: [
        language === 'tr' ? 'Hizmet seçimi & fiyatlama' : 'Service selection & pricing',
        language === 'tr' ? 'Uzman tercihi' : 'Staff preference booking',
        language === 'tr' ? 'Hatırlatma mesajları' : 'Reminder notifications'
      ],
      color: 'purple'
    },
    {
      icon: <FaBuilding />,
      title: language === 'tr' ? 'Ev Servisleri' : 'Home Services',
      description: language === 'tr'
        ? 'Tesisatçı, elektrikçi, HVAC, temizlik servisleri'
        : 'Plumbers, electricians, HVAC, cleaning services',
      features: [
        language === 'tr' ? 'Acil durum yanıtı 24/7' : 'Emergency response 24/7',
        language === 'tr' ? 'Fiyat tahmini' : 'Service quotes',
        language === 'tr' ? 'Zaman penceresi ayarlama' : 'Time window scheduling'
      ],
      color: 'orange'
    },
    {
      icon: <FaHotel />,
      title: language === 'tr' ? 'Restoranlar & Kafeler' : 'Restaurants & Cafes',
      description: language === 'tr'
        ? 'Fine dining, fast food, kafeler, catering'
        : 'Fine dining, fast food, cafes, catering',
      features: [
        language === 'tr' ? 'Masa rezervasyonu' : 'Table reservations',
        language === 'tr' ? 'Paket sipariş alma' : 'Takeout ordering',
        language === 'tr' ? 'Özel etkinlik planlama' : 'Event booking'
      ],
      color: 'green'
    },
    {
      icon: <FaCar />,
      title: language === 'tr' ? 'Otomotiv Servisleri' : 'Auto Services',
      description: language === 'tr'
        ? 'Oto tamirhaneleri, lastik servisleri, detaylı temizlik'
        : 'Auto repair shops, tire services, car detailing',
      features: [
        language === 'tr' ? 'Servis randevusu' : 'Service appointments',
        language === 'tr' ? 'Tahmini maliyet' : 'Cost estimates',
        language === 'tr' ? 'Parça durumu sorgusu' : 'Parts availability check'
      ],
      color: 'red'
    },
    {
      icon: <FaGraduationCap />,
      title: language === 'tr' ? 'Hukuk & Finans' : 'Legal & Financial',
      description: language === 'tr'
        ? 'Avukat büroları, muhasebeciler, danışmanlık firmaları'
        : 'Law firms, accountants, consulting firms',
      features: [
        language === 'tr' ? 'Konsültasyon rezervasyonu' : 'Consultation booking',
        language === 'tr' ? 'Belge toplama' : 'Document collection',
        language === 'tr' ? 'Vaka değerlendirmesi' : 'Case evaluation'
      ],
      color: 'indigo'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative">
      <NoiseTexture />
      
      <SEO page="solutions" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white py-32 pt-40 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <ParticleNetwork />
        </div>
        <GridPattern className="opacity-10" />
        <GradientOrbs />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
              <span className="text-purple-400 text-sm font-medium">
                {language === 'tr' ? 'Çözümlerimiz' : 'Our Solutions'}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {language === 'tr' ? 'Her Sektör İçin' : 'AI Solutions for'}
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                {language === 'tr' ? 'AI Çözümleri' : 'Every Industry'}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-400">
              {language === 'tr'
                ? 'Sektörünüze özel AI çözümleriyle müşteri deneyiminizi dönüştürün'
                : 'Transform your customer experience with industry-specific AI solutions'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <GridPattern className="opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === 'tr' ? 'Sektörlere Göre Çözümler' : 'Solutions by Industry'}
                  </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    {language === 'tr' 
                ? 'Her sektörün kendine özgü ihtiyaçlarını anlıyoruz'
                : 'We understand the unique needs of each industry'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                        key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-8 h-full hover:scale-105 transition-transform duration-300">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-${industry.color}-500/20 to-${industry.color}-600/20 w-fit mb-6`}>
                    <span className={`text-3xl text-${industry.color}-400`}>{industry.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{industry.title}</h3>
                  <p className="text-gray-400 mb-6">{industry.description}</p>
                  <ul className="space-y-2">
                    {industry.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                        <FaCheckCircle className="text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
              </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-gray-950 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === 'tr' ? 'Platform Özellikleri' : 'Platform Features'}
          </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {language === 'tr'
                ? 'Güçlü özellikler, basit kullanım'
                : 'Powerful features, simple to use'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <FaRobot />,
                title: language === 'tr' ? 'Doğal Konuşma' : 'Natural Conversation',
                description: language === 'tr'
                  ? 'İnsan gibi doğal diyaloglar'
                  : 'Human-like natural dialogues'
              },
              {
                icon: <FaCalendar />,
                title: language === 'tr' ? 'Akıllı Planlama' : 'Smart Scheduling',
                description: language === 'tr'
                  ? 'Takvim entegrasyonu ile otomatik randevu'
                  : 'Auto-booking with calendar integration'
              },
              {
                icon: <FaGlobe />,
                title: language === 'tr' ? 'Çoklu Dil' : 'Multi-Language',
                description: language === 'tr'
                  ? '20+ dilde akıcı konuşma'
                  : 'Fluent in 20+ languages'
              },
              {
                icon: <FaChartLine />,
                title: language === 'tr' ? 'Analitik' : 'Analytics',
                description: language === 'tr'
                  ? 'Detaylı raporlar ve içgörüler'
                  : 'Detailed reports and insights'
              },
              {
                icon: <FaShieldAlt />,
                title: language === 'tr' ? 'Güvenlik' : 'Security',
                description: language === 'tr'
                  ? 'Kurumsal düzeyde veri güvenliği'
                  : 'Enterprise-grade data protection'
              },
              {
                icon: <FaCode />,
                title: language === 'tr' ? 'API Entegrasyonu' : 'API Integration',
                description: language === 'tr'
                  ? 'Mevcut sistemlerinizle sorunsuz entegrasyon'
                  : 'Seamless integration with your systems'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="text-3xl text-cyan-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section - Enhanced Design */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <GridPattern className="opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === 'tr' ? 'Neden Cognia AI?' : 'Why Choose Cognia AI?'}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {language === 'tr'
                ? 'İşletmenizi büyütürken maliyetleri düşürün, müşteri memnuniyetini artırın.'
                : 'Transform your customer service with AI that delivers measurable results.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                stat: '87%',
                label: language === 'tr' ? 'Dönüşüm Artışı' : 'Conversion Rate',
                description: language === 'tr' ? 'Müşteri dönüşümünde artış' : 'Increase in customer conversion',
                color: 'from-cyan-500 to-teal-500',
                icon: '📈'
              },
              {
                stat: '24/7',
                label: language === 'tr' ? 'Kesintisiz Hizmet' : 'Always Available',
                description: language === 'tr' ? 'Gece gündüz aktif' : 'Never miss a call',
                color: 'from-purple-500 to-pink-500',
                icon: '🌍'
              },
              {
                stat: '60%',
                label: language === 'tr' ? 'Maliyet Azalışı' : 'Cost Reduction',
                description: language === 'tr' ? 'Operasyonel maliyetlerde düşüş' : 'Lower operational costs',
                color: 'from-green-500 to-emerald-500',
                icon: '💰'
              },
              {
                stat: '0.5s',
                label: language === 'tr' ? 'Yanıt Süresi' : 'Response Time',
                description: language === 'tr' ? 'Anında müşteri yanıtı' : 'Instant customer response',
                color: 'from-orange-500 to-red-500',
                icon: '⚡'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-8 h-full text-center hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <div className={`text-5xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent mb-3`}>
                    {benefit.stat}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.label}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <GradientOrbs />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === 'tr' 
                ? 'Sektörünüze Özel AI Çözümünü Keşfedin'
                : 'Discover Your Industry-Specific AI Solution'}
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              {language === 'tr'
                ? '48 saat içinde kurulum, anında sonuç'
                : 'Setup in 48 hours, immediate results'}
          </p>
          <a
            href="https://calendly.com/emrebenian-cogniaai/30min"
            target="_blank"
            rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
              <span>{language === 'tr' ? 'Ücretsiz Demo' : 'Schedule Free Demo'}</span>
              <FaPhone className="group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
          </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;