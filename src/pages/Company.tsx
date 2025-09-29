import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaGlobeAmericas, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const Company: React.FC = () => {
  const { t, language } = useLanguage();
  
  const breadcrumbs = [
    { name: language === 'tr' ? 'Ana Sayfa' : 'Home', url: '/' },
    { name: language === 'tr' ? 'Hakkımızda' : 'About', url: '/company' }
  ];

  const aboutStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Cognia AI',
      description: language === 'tr' 
        ? 'Uluslararası AI danışmanlık şirketi' 
        : 'International AI consultancy company',
      foundingDate: '2023',
      mission: language === 'tr'
        ? 'Her işletmeyi anlayan, yanıt veren ve ölçekte olağanüstü deneyimler sunan AI ile güçlendirmek.'
        : 'To empower every business with AI that understands, responds, and delivers exceptional experiences at scale.'
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        page="company" 
        breadcrumbs={breadcrumbs}
        structuredData={[aboutStructuredData]}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('nav.about')}
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              {language === 'tr' ? 'Konuşma AI\'nın geleceğini şekillendiriyoruz' : 'Pioneering the future of conversational AI'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-gray-900">{language === 'tr' ? 'Misyonumuz' : 'Our Mission'}</h2>
                <p className="text-lg text-gray-600 mb-6">
                  {language === 'tr' 
                    ? 'Her işletmeyi anlayan, yanıt veren ve ölçekte olağanüstü deneyimler sunan AI ile güçlendirmek.'
                    : 'To empower every business with AI that understands, responds, and delivers exceptional experiences at scale.'}
                </p>
                <p className="text-lg text-gray-600">
                  {language === 'tr'
                    ? 'Teknolojinin insan bağlantısını değiştirmediği, geliştirdiği bir geleceğe inanıyoruz. Platformumuz, işletmelerin müşterilerine daha iyi, daha hızlı ve daha kişisel hizmet vermesini sağlar.'
                    : 'We believe in a future where technology enhances human connection, not replaces it. Our platform enables businesses to serve customers better, faster, and more personally than ever before.'}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-12"
              >
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-[#162B4D]">AI</div>
                    <div className="text-gray-600 mt-2">{language === 'tr' ? 'Destekli' : 'Powered'}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#162B4D]">24/7</div>
                    <div className="text-gray-600 mt-2">{language === 'tr' ? 'Destek' : 'Support'}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#162B4D]">{language === 'tr' ? 'Çoklu' : 'Multi'}</div>
                    <div className="text-gray-600 mt-2">{language === 'tr' ? 'Platform' : 'Platform'}</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#162B4D]">{language === 'tr' ? 'Global' : 'Global'}</div>
                    <div className="text-gray-600 mt-2">{language === 'tr' ? 'Erişim' : 'Reach'}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">{language === 'tr' ? 'Değerlerimiz' : 'Our Values'}</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: <FaRocket />,
                  title: language === 'tr' ? "İnovasyon" : "Innovation",
                  description: language === 'tr' ? "AI ile mümkün olanın sınırlarını zorlamak" : "Pushing boundaries of what's possible with AI"
                },
                {
                  icon: <FaUsers />,
                  title: language === 'tr' ? "Müşteri Öncelikli" : "Customer First",
                  description: language === 'tr' ? "Başarınız birincil misyonumuz" : "Your success is our primary mission"
                },
                {
                  icon: <FaGlobeAmericas />,
                  title: language === 'tr' ? "Global Etki" : "Global Impact",
                  description: language === 'tr' ? "AI'ı dünya çapında işletmeler için erişilebilir kılmak" : "Making AI accessible to businesses worldwide"
                },
                {
                  icon: <FaTrophy />,
                  title: language === 'tr' ? "Mükemmellik" : "Excellence",
                  description: language === 'tr' ? "Her zaman sınıfının en iyi çözümlerini sunmak" : "Delivering best-in-class solutions every time"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl text-[#162B4D] mb-4 flex justify-center">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* Join Us CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{language === 'tr' ? 'Yolculuğumuza Katılın' : 'Join Our Journey'}</h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            {language === 'tr' ? 'Müşteri deneyiminin geleceğini şekillendiren takımın bir parçası olun' : 'Be part of the team that\'s shaping the future of customer experience'}
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-700 to-cyan-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              {language === 'tr' ? 'Kariyer Fırsatları' : 'View Careers'}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all"
            >
              {language === 'tr' ? 'Bizimle İş Ortağı Olun' : 'Partner With Us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company;
