import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaRobot, FaPhone, FaChartLine, FaShieldAlt, FaBrain, FaGlobe, FaClock, FaCheckCircle, FaMicrophone, FaComments, FaDatabase, FaCloud } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import { structuredDataTemplates } from '../config/seoConfig';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  
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
      <section className="relative bg-gradient-to-br from-[#162B4D] via-[#0A1628] to-[#162B4D] text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative container mx-auto px-6 py-32 md:py-40">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {language === 'tr' ? 'İşletmenizi Yapay Zeka ile Geleceğe Taşıyın' : 'Transform Customer Experience with AI'}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
              {language === 'tr' ? '48 saat içinde kurulum, anında sonuç!' : 'Enterprise-grade conversational AI that scales infinitely'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
              >
                {t('nav.freeDemo')}
                <FaArrowRight className="ml-2" />
              </Link>
              <Link 
                to="/platform"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0A1628] transition-all"
              >
                {language === 'tr' ? 'Platformu Keşfet' : 'Explore Platform'}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Voice Agent Demo Numbers */}
      <section className="bg-gradient-to-r from-[#162B4D] to-[#0A1628] -mt-1 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-white mb-8">{t('voice.title')}</h3>
            <p className="text-xl text-gray-200 mb-10">
              {language === 'tr' ? 'Hemen arayın ve AI sesli asistanımızı deneyin' : 'Call now and experience our AI voice assistant'}
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white px-10 py-6 rounded-xl shadow-xl cursor-pointer"
              >
                <p className="text-gray-600 mb-3 font-semibold">{t('voice.demoTR')}</p>
                <a href="tel:+908508402689" className="text-2xl font-bold text-[#162B4D] hover:text-[#2A4A7C] transition-colors">
                  +90 850 840 2689
                </a>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white px-10 py-6 rounded-xl shadow-xl cursor-pointer"
              >
                <p className="text-gray-600 mb-3 font-semibold">{t('voice.demoUS')}</p>
                <a href="tel:+16163263328" className="text-2xl font-bold text-[#162B4D] hover:text-[#2A4A7C] transition-colors">
                  +1 616 326-3328
                </a>
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

      {/* Technology Features */}
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
                description: language === 'tr' ? '99% doğruluk oranıyla ses tanıma' : '99% accuracy speech recognition'
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


      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              {language === 'tr' ? 'Temel Avantajlar' : 'Key Benefits'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <motion.div 
                whileInView={{ scale: [0.8, 1] }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="text-5xl font-bold text-[#162B4D] mb-2">24/7</div>
                <p className="text-gray-600">{language === 'tr' ? 'Kesintisiz Hizmet' : 'Availability'}</p>
              </motion.div>
              <motion.div 
                whileInView={{ scale: [0.8, 1] }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="text-5xl font-bold text-[#162B4D] mb-2">{language === 'tr' ? 'Çoklu' : 'Multi'}</div>
                <p className="text-gray-600">{language === 'tr' ? 'Dil Desteği' : 'Language Support'}</p>
              </motion.div>
              <motion.div 
                whileInView={{ scale: [0.8, 1] }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="text-5xl font-bold text-[#162B4D] mb-2">{language === 'tr' ? 'Anında' : 'Instant'}</div>
                <p className="text-gray-600">{language === 'tr' ? 'Yanıt Süresi' : 'Response Time'}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* Process Section */}
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
