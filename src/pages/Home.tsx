import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRobot, FaPhone, FaChartLine, FaShieldAlt, FaBrain, FaGlobe, FaClock, FaCheckCircle, FaMicrophone, FaComments, FaDatabase, FaCloud } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import ROICalculator from '../components/ROICalculator';
import { structuredDataTemplates } from '../config/seoConfig';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const [showCalculator, setShowCalculator] = useState(false);
  
  // FAQ structured data for the home page
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: language === 'tr' ? 'Kurulum ne kadar sürer?' : 'How long does setup take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: language === 'tr' 
            ? '48 saat içinde sisteminizi kuruyoruz. İhtiyaçlarınızı analiz ettikten sonra AI asistanınızı yapılandırıp aktif hale getiriyoruz.' 
            : 'We set up your system within 48 hours. After analyzing your needs, we configure and activate your AI assistant.'
        }
      },
      {
        '@type': 'Question',
        name: language === 'tr' ? 'Hangi dilleri destekliyorsunuz?' : 'Which languages do you support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: language === 'tr' 
            ? 'Türkçe ve İngilizce dahil 20\'den fazla dili destekliyoruz. AI asistanınız müşterilerinizin tercih ettiği dilde doğal bir şekilde iletişim kurabilir.' 
            : 'We support over 20 languages including Turkish and English. Your AI assistant can communicate naturally in your customers\' preferred language.'
        }
      },
      {
        '@type': 'Question',
        name: language === 'tr' ? 'Mevcut sistemlerimle entegre olur mu?' : 'Does it integrate with existing systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: language === 'tr' 
            ? 'Evet, CRM, ERP ve diğer iş sistemlerinizle sorunsuz entegre olur. API desteği sağlıyoruz.' 
            : 'Yes, it integrates seamlessly with your CRM, ERP, and other business systems. We provide API support.'
        }
      }
    ]
  };
  
  return (
    <div className="min-h-screen">
      <SEO 
        page="home" 
        structuredData={[
          structuredDataTemplates.organization,
          structuredDataTemplates.webSite,
          structuredDataTemplates.service,
          faqStructuredData
        ]}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#162B4D] via-[#0A1628] to-[#162B4D] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {/* Abstract Pattern Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="relative container mx-auto px-6 py-24 md:py-32">
          {/* Logo Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-12"
          >
            <img 
              src="/cognia_logo_final.svg" 
              alt="Cognia AI" 
              className="h-24 md:h-32 w-auto"
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
              {language === 'tr' ? 'Hiç Müşteri Kaçırmayın. 7/24 Randevu Alın.' : 'Never Miss a Lead. Book 24/7.'}
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-blue-100 max-w-3xl mx-auto">
              {language === 'tr' ? 'Gece, hafta sonu, tatillerde bile müşterilerinizi kaydedin. 3x daha fazla randevu.' : 'Book appointments while you sleep. 3x more customers, guaranteed.'}
            </p>
            <p className="text-lg text-cyan-200 mb-10">
              {language === 'tr' ? '📈 3x daha fazla müşteri • ⚡ 48 saat kurulum • 🌍 20+ dil' : '📈 3x more bookings • ⚡ 48hr setup • 🌍 20+ languages'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link 
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-400 text-[#0A1628] font-bold rounded-lg hover:from-cyan-300 hover:to-blue-300 transition-all transform hover:scale-105 shadow-xl"
              >
                {language === 'tr' ? '🚀 Ücretsiz Demo Başlat' : '🚀 Start Free Demo'}
                <FaArrowRight className="ml-2" />
              </Link>
              <a 
                href="tel:+16163263328"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0A1628] transition-all"
              >
                📞 {language === 'tr' ? 'Hemen Arayın' : 'Call Now'}: +1 616 326-3328
              </a>
            </div>
            {/* Value Proposition */}
            <p className="text-sm text-cyan-200">
              💰 {language === 'tr' ? 'Her kaçan çağrı = Kaybedilen müşteri. Biz hiç kaçırmıyoruz.' : 'Every missed call = Lost revenue. We never miss.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Voice Agent Demo Numbers */}
      <section className="bg-gradient-to-r from-[#162B4D] to-[#0A1628] py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-sm font-medium text-green-300">🔴 {language === 'tr' ? 'CANLI - Şu an test edebilirsiniz!' : 'LIVE - Test it right now!'}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">{t('voice.title')}</h3>
            <p className="text-xl text-gray-200 mb-10">
              {language === 'tr' ? '🎆 Hemen arayın ve AI sesli asistanımızı deneyin' : '🎆 Call now and experience our AI voice assistant'}
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 px-12 py-8 rounded-xl shadow-xl cursor-pointer"
              >
                <p className="text-white mb-3 font-bold text-lg">{t('voice.demoUS')}</p>
                <a href="tel:+16163263328" className="text-3xl font-bold text-white hover:text-yellow-200 transition-colors">
                  +1 616 326-3328
                </a>
                <p className="text-cyan-100 mt-2 text-sm">🇺🇸 {language === 'tr' ? 'ABD Numarası' : 'US Number'}</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white px-10 py-6 rounded-xl shadow-xl cursor-pointer"
              >
                <p className="text-gray-600 mb-3 font-semibold">{t('voice.demoTR')}</p>
                <a href="tel:+908508402689" className="text-xl font-bold text-[#162B4D] hover:text-[#2A4A7C] transition-colors">
                  +90 850 840 2689
                </a>
                <p className="text-gray-500 mt-2 text-sm">🇹🇷 {language === 'tr' ? 'Türkiye Numarası' : 'Turkey Number'}</p>
              </motion.div>
            </div>
            <div className="mt-10">
              <p className="text-white/80 text-sm">
                {language === 'tr' ? '* 7/24 aktif, hemen test edebilirsiniz' : '* Available 24/7, test immediately'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Benefits Section - MOVED UP FOR BETTER CONVERSION */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'tr' ? 'Teknoloji Özellikleri' : 'Technology Features'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'tr' ? 'İşletmenizi güçlendirecek gelişmiş AI teknolojileri' : 'Advanced AI technologies to empower your business'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaBrain className="text-3xl" />,
                title: language === 'tr' ? 'Doğal Dil İşleme' : 'Natural Language Processing',
                description: language === 'tr' ? 'Müşteri niyetini anlayan gelişmiş NLP' : 'Advanced NLP that understands customer intent'
              },
              {
                icon: <FaMicrophone className="text-3xl" />,
                title: language === 'tr' ? 'Ses Tanıma' : 'Speech Recognition',
                description: language === 'tr' ? 'Gürültülü ortamlarda bile mükemmel performans' : 'Perfect performance even in noisy environments'
              },
              {
                icon: <FaComments className="text-3xl" />,
                title: language === 'tr' ? 'Çok Kanallı' : 'Multi-Channel',
                description: language === 'tr' ? 'WhatsApp, Instagram, Telefon, Web' : 'WhatsApp, Instagram, Phone, Web'
              },
              {
                icon: <FaGlobe className="text-3xl" />,
                title: language === 'tr' ? '20+ Dil' : '20+ Languages',
                description: language === 'tr' ? 'Global müşterilerinizle konuşun' : 'Speak with your global customers'
              },
              {
                icon: <FaClock className="text-3xl" />,
                title: language === 'tr' ? '7/24 Hizmet' : '24/7 Service',
                description: language === 'tr' ? 'Kesintisiz müşteri desteği' : 'Uninterrupted customer support'
              },
              {
                icon: <FaDatabase className="text-3xl" />,
                title: language === 'tr' ? 'CRM Entegrasyonu' : 'CRM Integration',
                description: language === 'tr' ? 'Mevcut sistemlerinizle entegre' : 'Integrates with your existing systems'
              },
              {
                icon: <FaCloud className="text-3xl" />,
                title: language === 'tr' ? 'Bulut Tabanlı' : 'Cloud Based',
                description: language === 'tr' ? 'Güvenli ve ölçeklenebilir altyapı' : 'Secure and scalable infrastructure'
              },
              {
                icon: <FaCheckCircle className="text-3xl" />,
                title: language === 'tr' ? 'Kolay Kurulum' : 'Easy Setup',
                description: language === 'tr' ? '48 saat içinde canlıya alın' : 'Go live within 48 hours'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-[#162B4D] mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'tr' ? 'Neden Cognia AI?' : 'Why Choose Cognia AI'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'tr' ? 'Sonuç odaklı teknoloji çözümleri' : 'Technology solutions that deliver results'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaRobot />,
                title: language === 'tr' ? 'Gelişmiş AI' : 'Advanced AI',
                description: language === 'tr' ? 'Son teknoloji doğal dil işleme' : 'State-of-the-art NLP and machine learning'
              },
              {
                icon: <FaPhone />,
                title: language === 'tr' ? 'Çoklu Kanal' : 'Omnichannel',
                description: language === 'tr' ? 'Ses, chat ve mesajlaşma tek platformda' : 'Voice, chat, and messaging in one platform'
              },
              {
                icon: <FaChartLine />,
                title: language === 'tr' ? 'Ölçeklenebilir' : 'Scalable',
                description: language === 'tr' ? 'Anında milyonlarca konuşma işleme' : 'Handle millions of conversations instantly'
              },
              {
                icon: <FaShieldAlt />,
                title: language === 'tr' ? 'Güvenlik' : 'Security',
                description: language === 'tr' ? 'Kurumsal düzeyde veri güvenliği' : 'Enterprise-grade data protection'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl text-[#162B4D] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center bg-green-100 px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-semibold text-green-700">📈 {language === 'tr' ? 'KANITLANMIŞ SONUÇLAR' : 'PROVEN RESULTS'}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {language === 'tr' ? 'Yatırımınızın Karşılığını Alın' : 'Real ROI, Real Results'}
              </h2>
              <p className="text-xl text-gray-600">
                {language === 'tr' ? 'Hızlı kurulum, hemen tasarruf başlat' : 'Quick setup, immediate cost savings'}
              </p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-2xl text-white shadow-xl"
              >
                <div className="text-5xl font-bold mb-3">3x</div>
                <h3 className="text-xl font-semibold mb-2">{language === 'tr' ? 'Daha Fazla Randevu' : 'More Bookings'}</h3>
                <p className="text-green-100">{language === 'tr' ? 'Gece ve hafta sonları dahil tüm randevuları alın' : 'Book appointments 24/7, including nights & weekends'}</p>
                <div className="mt-4 text-sm text-green-200">
                  📈 {language === 'tr' ? 'Gelir artışı garantili' : 'Guaranteed revenue increase'}
                </div>
              </motion.div>
              <motion.div 
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-2xl text-white shadow-xl"
              >
                <div className="text-5xl font-bold mb-3">87%</div>
                <h3 className="text-xl font-semibold mb-2">{language === 'tr' ? 'Dönüşüm Oranı' : 'Conversion Rate'}</h3>
                <p className="text-blue-100">{language === 'tr' ? 'Arayan müşterilerin randevuya dönüşümü' : 'Of callers successfully book appointments'}</p>
                <div className="mt-4 text-sm text-blue-200">
                  🔒 {language === 'tr' ? 'Hiç müşteri kaybetmeyin' : 'Never lose a customer'}
                </div>
              </motion.div>
              <motion.div 
                whileInView={{ scale: [0.9, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-2xl text-white shadow-xl"
              >
                <div className="text-5xl font-bold mb-3">$45K</div>
                <h3 className="text-xl font-semibold mb-2">{language === 'tr' ? 'Yıllık Ek Gelir' : 'Additional Revenue'}</h3>
                <p className="text-purple-100">{language === 'tr' ? 'Ortalama işletme başına yıllık artış' : 'Average annual revenue increase per business'}</p>
                <div className="mt-4 text-sm text-purple-200">
                  💰 {language === 'tr' ? 'Kaçan çağrıları gelire dönüştürün' : 'Turn missed calls into revenue'}
                </div>
              </motion.div>
            </div>
            {/* ROI Calculator Section */}
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              {!showCalculator ? (
                <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    🧮 {language === 'tr' ? 'Kaç Müşteri Kaybediyorsunuz?' : 'How Much Revenue Are You Losing?'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {language === 'tr' ? 'Özel ROI hesaplamanızı hemen yapın' : 'Calculate your personalized ROI instantly'}
                  </p>
                  <button
                    onClick={() => setShowCalculator(true)}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white font-bold rounded-lg hover:from-orange-500 hover:to-red-500 transition-all transform hover:scale-105 shadow-lg"
                  >
                    {language === 'tr' ? '📊 ROI Hesaplayıcıyı Aç' : '📊 Open ROI Calculator'}
                    <FaChartLine className="ml-2" />
                  </button>
                </div>
              ) : (
                <ROICalculator />
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section - MOVED UP FOR BETTER FLOW */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">
              {language === 'tr' ? 'Nasıl Başlıyoruz?' : 'How We Get Started'}
            </h2>
            <p className="text-xl text-center mb-16 text-gray-600">
              {language === 'tr' ? '3 basit adımda AI asistanınız hazır' : 'Your AI assistant ready in 3 simple steps'}
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#162B4D] to-[#0A1628] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {language === 'tr' ? 'İhtiyaç Analizi' : 'Needs Analysis'}
                </h3>
                <p className="text-gray-600">
                  {language === 'tr' 
                    ? 'İşletmenizin ihtiyaçlarını anlıyoruz ve size özel çözüm tasarlıyoruz'
                    : 'We understand your business needs and design a custom solution'}
                </p>
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#162B4D] to-[#0A1628] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {language === 'tr' ? 'Kurulum & Entegrasyon' : 'Setup & Integration'}
                </h3>
                <p className="text-gray-600">
                  {language === 'tr' 
                    ? '48 saat içinde sistemlerinizle entegre edip AI asistanınızı kuruyoruz'
                    : 'We integrate with your systems and set up your AI assistant within 48 hours'}
                </p>
              </motion.div>
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#162B4D] to-[#0A1628] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {language === 'tr' ? 'Canlıya Alım' : 'Go Live'}
                </h3>
                <p className="text-gray-600">
                  {language === 'tr' 
                    ? 'AI asistanınız aktif! 7/24 müşterilerinize hizmet vermeye başlıyor'
                    : 'Your AI assistant is active! Starting to serve your customers 24/7'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center bg-purple-100 px-4 py-2 rounded-full mb-4">
              <span className="text-sm font-semibold text-purple-700">🌟 {language === 'tr' ? 'EN İYİ ÖZELLİKLER' : 'BEST-IN-CLASS FEATURES'}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {language === 'tr' ? 'Rakiplerimizden Farkımız' : 'What Sets Us Apart'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'tr' ? 'Gerçek sonuçlar getiren kurumsal düzeyde AI teknolojisi' : 'Enterprise-grade AI technology that delivers real results'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaBrain className="text-3xl" />,
                title: language === 'tr' ? 'Doğal Dil İşleme' : 'Natural Language Processing',
                description: language === 'tr' ? 'Müşteri niyetini %99 doğrulukla anlar' : 'Understands customer intent with 99% accuracy',
                stat: '99%'
              },
              {
                icon: <FaMicrophone className="text-3xl" />,
                title: language === 'tr' ? 'Ses Tanıma' : 'Speech Recognition',
                description: language === 'tr' ? 'Gürültülü ortamlarda bile mükemmel performans' : 'Perfect performance even in noisy environments'
              },
              {
                icon: <FaComments className="text-3xl" />,
                title: language === 'tr' ? 'Çok Kanallı' : 'Multi-Channel',
                description: language === 'tr' ? 'WhatsApp, Instagram, Telefon, Web' : 'WhatsApp, Instagram, Phone, Web'
              },
              {
                icon: <FaGlobe className="text-3xl" />,
                title: language === 'tr' ? '20+ Dil' : '20+ Languages',
                description: language === 'tr' ? 'Global müşterilerinizle konuşun' : 'Speak with your global customers'
              },
              {
                icon: <FaClock className="text-3xl" />,
                title: language === 'tr' ? '7/24 Hizmet' : '24/7 Service',
                description: language === 'tr' ? 'Yılda 8760 saat kesintisiz hizmet' : '8,760 hours of uptime per year',
                stat: '99.9%'
              },
              {
                icon: <FaDatabase className="text-3xl" />,
                title: language === 'tr' ? 'CRM Entegrasyonu' : 'CRM Integration',
                description: language === 'tr' ? 'Mevcut sistemlerinizle entegre' : 'Integrates with your existing systems'
              },
              {
                icon: <FaCloud className="text-3xl" />,
                title: language === 'tr' ? 'Bulut Tabanlı' : 'Cloud Based',
                description: language === 'tr' ? 'Güvenli ve ölçeklenebilir altyapı' : 'Secure and scalable infrastructure'
              },
              {
                icon: <FaCheckCircle className="text-3xl" />,
                title: language === 'tr' ? 'Kolay Kurulum' : 'Easy Setup',
                description: language === 'tr' ? '48 saat içinde canlıya alın' : 'Go live within 48 hours'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="text-[#162B4D] mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
                {feature.stat && (
                  <div className="mt-3 text-2xl font-bold text-cyan-600">{feature.stat}</div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {language === 'tr' ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions'}
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: language === 'tr' ? 'Kurulum ne kadar sürer?' : 'How long does setup take?',
                  a: language === 'tr' 
                    ? '48 saat içinde sisteminizi kuruyoruz. İhtiyaçlarınızı analiz ettikten sonra AI asistanınızı yapılandırıp aktif hale getiriyoruz.' 
                    : 'We set up your system within 48 hours. After analyzing your needs, we configure and activate your AI assistant.'
                },
                {
                  q: language === 'tr' ? 'Hangi dilleri destekliyorsunuz?' : 'Which languages do you support?',
                  a: language === 'tr' 
                    ? 'Türkçe ve İngilizce dahil 20\'den fazla dili destekliyoruz. AI asistanınız müşterilerinizin tercih ettiği dilde doğal bir şekilde iletişim kurabilir.' 
                    : 'We support over 20 languages including Turkish and English. Your AI assistant can communicate naturally in your customers\' preferred language.'
                },
                {
                  q: language === 'tr' ? 'Mevcut sistemlerimle entegre olur mu?' : 'Does it integrate with existing systems?',
                  a: language === 'tr' 
                    ? 'Evet, CRM, ERP ve diğer iş sistemlerinizle sorunsuz entegre olur. API desteği sağlıyoruz.' 
                    : 'Yes, it integrates seamlessly with your CRM, ERP, and other business systems. We provide API support.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600">
                    {faq.a}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#162B4D] to-[#0A1628] text-white">
        <div className="container mx-auto px-6 text-center">
                      <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {language === 'tr' ? 'Müşteri Deneyiminizi Dönüştürmeye Hazır mısınız?' : 'Ready to Transform Your Customer Experience?'}
            </h2>
            <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
              {language === 'tr' ? 'AI destekli müşteri etkileşiminin gücünü deneyimleyin' : 'Experience the power of AI-driven customer engagement'}
            </p>
          <Link 
            to="/contact"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-[#162B4D] to-[#162B4D] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 text-lg"
          >
                          {language === 'tr' ? 'Hemen Başlayın' : 'Get Started Today'}
            <FaArrowRight className="ml-3" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
