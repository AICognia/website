import React from 'react';
import { motion } from 'framer-motion';
import { FaCloud, FaLock, FaCogs, FaChartBar, FaCode, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Platform: React.FC = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#162B4D] via-[#0A1628] to-[#162B4D] text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {language === 'tr' ? 'Cognia Platformu' : 'The Cognia Platform'}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {language === 'tr' ? 'Ölçeklenebilir kurumsal AI altyapısı' : 'Enterprise-grade AI infrastructure built for scale'}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#0A1628] font-semibold rounded-lg hover:bg-blue-50 transition-all"
            >
              {language === 'tr' ? 'Erişim Talep Et' : 'Request Access'}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                {language === 'tr' ? 'Kurumsal İhtiyaçlar İçin' : 'Built for Enterprise'}
              </h2>
              <p className="text-xl text-gray-600">
                {language === 'tr' ? 'Güçlü, güvenli ve sınırsız ölçeklenebilir' : 'Powerful, secure, and infinitely scalable'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl"
              >
                <FaCloud className="text-4xl text-[#162B4D] mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{language === 'tr' ? 'Bulut Tabanlı' : 'Cloud Native'}</h3>
                <p className="text-gray-600">
                  {language === 'tr' ? 'Verileriniz üzerinde tam kontrol ile herhangi bir bulutta veya yerinde dağıtın' : 'Deploy on any cloud or on-premise with full control over your data'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl"
              >
                <FaLock className="text-4xl text-green-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{language === 'tr' ? 'Kurumsal Güvenlik' : 'Enterprise Security'}</h3>
                <p className="text-gray-600">
                  {language === 'tr' ? 'İşletmeniz için uçtan uca şifreleme ve veri koruması' : 'End-to-end encryption and data protection for your business'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl"
              >
                <FaCogs className="text-4xl text-purple-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">{language === 'tr' ? 'Kolay Entegrasyon' : 'Easy Integration'}</h3>
                <p className="text-gray-600">
                  {language === 'tr' ? 'Tüm büyük CRM, ERP ve çağrı merkezi platformları için hazır bağlantılar' : 'Pre-built connectors for all major CRM, ERP, and contact center platforms'}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
              {language === 'tr' ? 'Temel Yetenekler' : 'Core Capabilities'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FaChartBar className="text-[#162B4D] text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{language === 'tr' ? 'Gelişmiş Analitik' : 'Advanced Analytics'}</h3>
                  <p className="text-gray-600">
                    {language === 'tr' ? 'Özelleştirilebilir panolar ve raporlama ile her konuşmaya gerçek zamanlı içgörüler' : 'Real-time insights into every conversation with customizable dashboards and reporting'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FaCode className="text-green-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{language === 'tr' ? 'Geliştirici Araçları' : 'Developer Tools'}</h3>
                  <p className="text-gray-600">
                    {language === 'tr' ? 'Özel uygulamalar için kapsamlı API\'ler, SDK\'lar ve dokümantasyon' : 'Comprehensive APIs, SDKs, and documentation for custom implementations'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FaGlobe className="text-purple-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{language === 'tr' ? 'Global Destek' : 'Global Support'}</h3>
                  <p className="text-gray-600">
                    {language === 'tr' ? 'Bölgesel aksanlar ve kültürel anlayışla 45\'ten fazla dil' : '45+ languages with regional accents and cultural understanding'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FaCogs className="text-orange-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{language === 'tr' ? 'Kod Yazmadan Geliştirme' : 'No-Code Builder'}</h3>
                  <p className="text-gray-600">
                    {language === 'tr' ? 'Karmaşık konuşma deneyimleri oluşturmak için görsel akış tasarımcısı' : 'Visual flow designer for creating complex conversational experiences'}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#162B4D] to-[#0A1628] text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {language === 'tr' ? 'Geleceği İnşa Etmeye Hazır mısınız?' : 'Ready to Build the Future?'}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {language === 'tr' ? 'Cognia platformunda önde gelen kurumlara katılın' : 'Join leading enterprises on the Cognia platform'}
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-[#162B4D] font-semibold rounded-lg hover:bg-blue-50 transition-all"
            >
              {language === 'tr' ? 'Başlayın' : 'Get Started'}
            </Link>
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#162B4D] transition-all"
            >
              {language === 'tr' ? 'Dokümantasyon' : 'View Documentation'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Platform;
