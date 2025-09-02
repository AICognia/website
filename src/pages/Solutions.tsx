import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaComments, FaCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Solutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'voice' | 'chatbot'>('voice');
  const { language } = useLanguage();

  const voiceFeatures = language === 'tr' ? [
    "Doğal dil anlama",
    "Çoklu dil desteği",
    "Gerçek zamanlı işleme",
    "Özel ses sentezi",
    "Duygu algılama",
    "Bağlam farkındalığı"
  ] : [
    "Natural language understanding",
    "Multi-language support",
    "Real-time processing",
    "Custom voice synthesis",
    "Emotion detection",
    "Context awareness"
  ];

  const chatbotFeatures = language === 'tr' ? [
    "Çok kanallı dağıtım",
    "Niyet tanıma",
    "Otomatik iş akışları",
    "Zengin medya desteği",
    "Duygu analizi",
    "Sorunsuz devir"
  ] : [
    "Omnichannel deployment",
    "Intent recognition",
    "Automated workflows",
    "Rich media support",
    "Sentiment analysis",
    "Seamless handoff"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#162B4D] to-[#0A1628] text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {language === 'tr' ? 'Ölçeklenebilir AI Çözümleri' : 'AI Solutions That Scale'}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {language === 'tr' ? 'Kurumsal ihtiyaçlar için sesli ve yazılı yapay zeka' : 'Voice and chat AI built for enterprise needs'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg shadow-lg p-2 inline-flex">
              <button
                onClick={() => setActiveTab('voice')}
                className={`px-8 py-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'voice'
                    ? 'bg-gradient-to-r from-[#162B4D] to-[#162B4D] text-white'
                    : 'text-gray-600 hover:text-[#162B4D]'
                }`}
              >
                <FaPhone className="inline mr-2" />
                {language === 'tr' ? 'Sesli Asistanlar' : 'Voice Agents'}
              </button>
              <button
                onClick={() => setActiveTab('chatbot')}
                className={`px-8 py-4 rounded-lg font-semibold transition-all ${
                  activeTab === 'chatbot'
                    ? 'bg-gradient-to-r from-[#162B4D] to-[#162B4D] text-white'
                    : 'text-gray-600 hover:text-[#162B4D]'
                }`}
              >
                <FaComments className="inline mr-2" />
                {language === 'tr' ? 'Sohbet Robotları' : 'Chatbots'}
              </button>
            </div>
          </div>

          {/* Voice Agent Section */}
          {activeTab === 'voice' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-gray-900">
                    {language === 'tr' ? 'Akıllı Sesli Asistan' : 'Voice AI That Understands'}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {language === 'tr' 
                      ? 'Karmaşık konuşmaları doğal bir şekilde yöneten, maliyetleri azaltırken müşteri memnuniyetini artıran akıllı ses asistanlarını devreye alın.' 
                      : 'Deploy intelligent voice agents that handle complex conversations naturally, reducing costs while improving customer satisfaction.'}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {voiceFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <FaCheck className="text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#162B4D] to-[#162B4D] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    {language === 'tr' ? 'Daha Fazla Bilgi' : 'Learn More'}
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-12 flex items-center justify-center">
                  <div className="text-center">
                    <FaPhone className="text-6xl text-[#162B4D] mb-4 mx-auto" />
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
                      <div className="text-gray-600">{language === 'tr' ? 'İlk aramada çözüm' : 'First-call resolution'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Chatbot Section */}
          {activeTab === 'chatbot' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-gray-900">
                    {language === 'tr' ? 'Akıllı Sohbet Otomasyonu' : 'Intelligent Chat Automation'}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    {language === 'tr' 
                      ? 'Tüm dijital kanallarda anında ve doğru yanıtlar sağlayan, karmaşık sorunları sorunsuz bir şekilde yönlendiren AI sohbet robotlarını devreye alın.' 
                      : 'Deploy AI chatbots across all digital channels to provide instant, accurate responses while seamlessly escalating complex issues.'}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {chatbotFeatures.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <FaCheck className="text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#162B4D] to-[#162B4D] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    {language === 'tr' ? 'Daha Fazla Bilgi' : 'Learn More'}
                    <FaArrowRight className="ml-2" />
                  </Link>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 flex items-center justify-center">
                  <div className="text-center">
                    <FaComments className="text-6xl text-purple-600 mb-4 mx-auto" />
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                      <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
                      <div className="text-gray-600">{language === 'tr' ? 'Anında yanıt süresi' : 'Instant response time'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            {language === 'tr' ? 'Sektörel Çözümler' : 'Industry Solutions'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { 
                title: language === 'tr' ? "Finansal Hizmetler" : "Financial Services", 
                description: language === 'tr' ? "Güvenli kimlik doğrulama ve hesap yönetimi" : "Secure authentication and account management" 
              },
              { 
                title: language === 'tr' ? "Sağlık" : "Healthcare", 
                description: language === 'tr' ? "Hasta randevuları ve tıbbi sorular" : "Patient scheduling and medical inquiries" 
              },
              { 
                title: language === 'tr' ? "Perakende" : "Retail", 
                description: language === 'tr' ? "Sipariş takibi ve müşteri desteği" : "Order tracking and customer support" 
              },
              { 
                title: language === 'tr' ? "Telekomünikasyon" : "Telecommunications", 
                description: language === 'tr' ? "Teknik destek ve faturalama" : "Technical support and billing" 
              },
              { 
                title: language === 'tr' ? "Seyahat & Konaklama" : "Travel & Hospitality", 
                description: language === 'tr' ? "Rezervasyonlar ve concierge hizmetleri" : "Bookings and concierge services" 
              },
              { 
                title: language === 'tr' ? "Sigorta" : "Insurance", 
                description: language === 'tr' ? "Hasar işlemleri ve poliçe bilgileri" : "Claims processing and policy information" 
              }
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{industry.title}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#162B4D] to-[#0A1628] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{language === 'tr' ? 'Çözümlerimizi İş Başında Görün' : 'See Our Solutions in Action'}</h2>
          <p className="text-xl mb-8 text-blue-100">
            {language === 'tr' ? 'Kurumsal AI\'ın gücünü deneyimleyin' : 'Experience the power of enterprise AI'}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-white text-[#162B4D] font-semibold rounded-lg hover:bg-blue-50 transition-all"
          >
            {language === 'tr' ? 'Demo Planla' : 'Schedule a Demo'}
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
