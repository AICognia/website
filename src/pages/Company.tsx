import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaGlobeAmericas, FaBrain, FaCode, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import GradientOrbs from '../components/GradientOrbs';
import GridPattern from '../components/GridPattern';
import GlassCard from '../components/GlassCard';
import ParticleNetwork from '../components/ParticleNetwork';
import NoiseTexture from '../components/NoiseTexture';

const Company: React.FC = () => {
  const { language } = useLanguage();
  
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
    <div className="min-h-screen bg-gray-950 relative">
      <NoiseTexture />
      
      <SEO 
        page="company" 
        breadcrumbs={breadcrumbs}
        structuredData={[aboutStructuredData]}
      />
      
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <span className="text-cyan-400 text-sm font-medium">
                {language === 'tr' ? 'Hakkımızda' : 'About Us'}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {language === 'tr' ? 'AI İletişiminin' : 'Building the Future of'}
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {language === 'tr' ? 'Geleceğini İnşa Ediyoruz' : 'AI Communication'}
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-400">
              {language === 'tr' 
                ? 'İşletmelerin müşterileriyle nasıl bağlantı kurduğunu dönüştüren akıllı çözümler üretiyoruz.'
                : 'Pioneering intelligent solutions that transform how businesses connect with their customers.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-gray-900 relative overflow-hidden">
        <GridPattern className="opacity-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8 h-full">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 w-fit mb-6">
                  <FaRocket className="text-2xl text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  {language === 'tr' ? 'Misyonumuz' : 'Our Mission'}
                </h2>
                <p className="text-lg text-gray-400 mb-4">
                  {language === 'tr' 
                    ? 'Her işletmeyi anlayan, yanıt veren ve ölçekte olağanüstü deneyimler sunan AI ile güçlendirmek.'
                    : 'To empower every business with AI that understands, responds, and delivers exceptional experiences at scale.'}
                </p>
                <p className="text-lg text-gray-400">
                  {language === 'tr'
                    ? 'Teknolojinin insan bağlantısını geliştirdiği bir geleceğe inanıyoruz. Platformumuz, işletmelerin müşterilerine daha iyi hizmet vermesini sağlar.'
                    : 'We believe in a future where technology enhances human connection. Our platform enables businesses to serve customers better than ever before.'}
                </p>
              </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GlassCard className="p-8 h-full">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 w-fit mb-6">
                  <FaBrain className="text-2xl text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  {language === 'tr' ? 'Vizyonumuz' : 'Our Vision'}
                </h2>
                <p className="text-lg text-gray-400 mb-8">
                  {language === 'tr'
                    ? 'AI destekli iş iletişiminde küresel standart olmak ve milyonlarca işletmenin mükemmel müşteri hizmeti sunmasını sağlamak.'
                    : 'To become the global standard for AI-powered business communication, enabling millions of businesses to provide exceptional customer service.'}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">2024</div>
                    <div className="text-sm text-gray-500">
                      {language === 'tr' ? 'Kuruluş' : 'Founded'}
                  </div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">48h</div>
                    <div className="text-sm text-gray-500">
                      {language === 'tr' ? 'Kurulum' : 'Setup Time'}
                  </div>
                  </div>
                </div>
              </GlassCard>
              </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-gray-950 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {language === 'tr' ? 'Değerlerimiz' : 'Our Values'}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {language === 'tr' 
                ? 'Yaptığımız her şeyi yönlendiren ilkeler'
                : 'The principles that guide everything we do'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: <FaCode />,
                title: language === 'tr' ? 'İnovasyon' : 'Innovation',
                description: language === 'tr' 
                  ? 'AI teknolojisinin sınırlarını zorluyoruz'
                  : 'Pushing the boundaries of AI technology'
                },
                {
                  icon: <FaUsers />,
                title: language === 'tr' ? 'Müşteri Odaklı' : 'Customer First',
                description: language === 'tr'
                  ? 'Başarınız bizim önceliğimiz'
                  : 'Your success is our priority'
              },
              {
                icon: <FaShieldAlt />,
                title: language === 'tr' ? 'Güvenlik' : 'Security',
                description: language === 'tr'
                  ? 'Kurumsal düzeyde veri koruması'
                  : 'Enterprise-grade data protection'
                },
                {
                  icon: <FaGlobeAmericas />,
                title: language === 'tr' ? 'Küresel Erişim' : 'Global Reach',
                description: language === 'tr'
                  ? 'Her yerde, her zaman, her dilde'
                  : 'Anywhere, anytime, any language'
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 w-fit mb-4">
                    <span className="text-2xl text-cyan-400">{value.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
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
              {language === 'tr' ? 'Birlikte Büyüyelim' : "Let's Grow Together"}
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              {language === 'tr'
                ? 'AI destekli geleceğinizi bugün başlatın'
                : 'Start your AI-powered future today'}
            </p>
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold text-lg rounded-xl hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
            >
              <span>{language === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}</span>
              <FaRocket className="group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity -z-10" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Company;