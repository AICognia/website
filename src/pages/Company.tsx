import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaGlobeAmericas, FaBrain, FaCode, FaShieldAlt, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Dynamic Background */}
      <DynamicTechBackground />

      <SEO
        page="company"
        breadcrumbs={breadcrumbs}
        structuredData={[aboutStructuredData]}
      />

      {/* Hero Section */}
      <TechSection noPadding className="pt-40 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Tech Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-purple-500" />
              <div className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full">
                <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
                  {language === 'tr' ? 'Hakkımızda' : 'About Us'}
                </span>
              </div>
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-purple-500" />
            </div>
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin mb-8">
            <span className="block">
              <span className="font-extralight text-gray-400">
                {language === 'tr' ? 'AI İletişiminin' : 'Building the Future of'}
              </span>
            </span>
            <span className="block font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {language === 'tr' ? 'Geleceğini İnşa Ediyoruz' : 'AI Communication'}
            </span>
          </h1>

          {/* Subtitle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gray-600" />
            <p className="text-lg sm:text-xl text-gray-400 font-light max-w-3xl">
              {language === 'tr'
                ? 'İşletmelerin müşterileriyle nasıl bağlantı kurduğunu dönüştüren akıllı çözümler üretiyoruz.'
                : 'Pioneering intelligent solutions that transform how businesses connect with their customers.'}
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gray-600" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: '2024', label: language === 'tr' ? 'Kuruluş' : 'Founded' },
              { value: '48h', label: language === 'tr' ? 'Kurulum' : 'Setup Time' },
              { value: '24/7', label: language === 'tr' ? 'Destek' : 'Support' },
              { value: '100%', label: language === 'tr' ? 'Güvenli' : 'Secure' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4"
              >
                <div className={`text-2xl sm:text-3xl font-bold mb-1 ${
                  index === 0 ? 'text-purple-400' :
                  index === 1 ? 'text-pink-400' :
                  index === 2 ? 'text-cyan-400' :
                  'text-green-400'
                }`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </TechSection>

      {/* Mission & Vision Section */}
      <TechSection
        badge={language === 'tr' ? 'Misyon & Vizyon' : 'Mission & Vision'}
        title={language === 'tr' ? 'Neden Cognia AI?' : 'Why Cognia AI?'}
        subtitle={language === 'tr'
          ? 'Geleceği birlikte inşa ediyoruz'
          : 'Building the future together'}
      >
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mission Card */}
          <TechCard glowColor="cyan" delay={0.1}>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 shrink-0">
                <FaRocket className="text-2xl text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === 'tr' ? 'Misyonumuz' : 'Our Mission'}
                </h3>
                <div className="h-[1px] w-20 bg-gradient-to-r from-cyan-500 to-transparent" />
              </div>
            </div>
            <p className="text-gray-400 font-light leading-relaxed mb-4">
              {language === 'tr'
                ? 'Her işletmeyi anlayan, yanıt veren ve ölçekte olağanüstü deneyimler sunan AI ile güçlendirmek.'
                : 'To empower every business with AI that understands, responds, and delivers exceptional experiences at scale.'}
            </p>
            <p className="text-sm text-gray-500 font-light leading-relaxed">
              {language === 'tr'
                ? 'Teknolojinin insan bağlantısını geliştirdiği bir geleceğe inanıyoruz. Platformumuz, işletmelerin müşterilerine daha iyi hizmet vermesini sağlar.'
                : 'We believe in a future where technology enhances human connection. Our platform enables businesses to serve customers better than ever before.'}
            </p>
          </TechCard>

          {/* Vision Card */}
          <TechCard glowColor="purple" delay={0.2}>
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 shrink-0">
                <FaBrain className="text-2xl text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {language === 'tr' ? 'Vizyonumuz' : 'Our Vision'}
                </h3>
                <div className="h-[1px] w-20 bg-gradient-to-r from-purple-500 to-transparent" />
              </div>
            </div>
            <p className="text-gray-400 font-light leading-relaxed mb-6">
              {language === 'tr'
                ? 'AI destekli iş iletişiminde küresel standart olmak ve milyonlarca işletmenin mükemmel müşteri hizmeti sunmasını sağlamak.'
                : 'To become the global standard for AI-powered business communication, enabling millions of businesses to provide exceptional customer service.'}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">Global</div>
                <div className="text-xs text-gray-500">
                  {language === 'tr' ? 'Erişim' : 'Reach'}
                </div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm border border-pink-500/20 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-pink-400">AI-First</div>
                <div className="text-xs text-gray-500">
                  {language === 'tr' ? 'Yaklaşım' : 'Approach'}
                </div>
              </div>
            </div>
          </TechCard>
        </div>
      </TechSection>

      {/* Values Section */}
      <TechSection
        badge={language === 'tr' ? 'Değerlerimiz' : 'Our Values'}
        title={language === 'tr' ? 'İlkelerimiz' : 'Our Principles'}
        subtitle={language === 'tr'
          ? 'Yaptığımız her şeyi yönlendiren değerler'
          : 'The values that guide everything we do'}
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            {
              icon: <FaCode />,
              title: language === 'tr' ? 'İnovasyon' : 'Innovation',
              description: language === 'tr'
                ? 'AI teknolojisinin sınırlarını zorluyoruz'
                : 'Pushing the boundaries of AI technology',
              color: 'cyan' as const,
              borderColor: 'border-cyan-500/20'
            },
            {
              icon: <FaUsers />,
              title: language === 'tr' ? 'Müşteri Odaklı' : 'Customer First',
              description: language === 'tr'
                ? 'Başarınız bizim önceliğimiz'
                : 'Your success is our priority',
              color: 'blue' as const,
              borderColor: 'border-blue-500/20'
            },
            {
              icon: <FaShieldAlt />,
              title: language === 'tr' ? 'Güvenlik' : 'Security',
              description: language === 'tr'
                ? 'Kurumsal düzeyde veri koruması'
                : 'Enterprise-grade data protection',
              color: 'purple' as const,
              borderColor: 'border-purple-500/20'
            },
            {
              icon: <FaGlobeAmericas />,
              title: language === 'tr' ? 'Küresel Erişim' : 'Global Reach',
              description: language === 'tr'
                ? 'Her yerde, her zaman, her dilde'
                : 'Anywhere, anytime, any language',
              color: 'green' as const,
              borderColor: 'border-green-500/20'
            }
          ].map((value, index) => (
            <TechCard key={index} glowColor={value.color} delay={index * 0.1}>
              <div className="flex flex-col h-full">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${
                  value.color === 'cyan' ? 'from-cyan-500/20 to-cyan-600/20' :
                  value.color === 'blue' ? 'from-blue-500/20 to-blue-600/20' :
                  value.color === 'purple' ? 'from-purple-500/20 to-purple-600/20' :
                  'from-green-500/20 to-green-600/20'
                } w-fit mb-4`}>
                  <span className={`text-2xl ${
                    value.color === 'cyan' ? 'text-cyan-400' :
                    value.color === 'blue' ? 'text-blue-400' :
                    value.color === 'purple' ? 'text-purple-400' :
                    'text-green-400'
                  }`}>{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-sm text-gray-400 font-light leading-relaxed flex-grow">
                  {value.description}
                </p>
              </div>
            </TechCard>
          ))}
        </div>
      </TechSection>

      {/* Team Culture Section */}
      <TechSection
        badge={language === 'tr' ? 'Ekibimiz' : 'Our Team'}
        title={language === 'tr' ? 'Uzman Kadro' : 'Expert Team'}
        subtitle={language === 'tr'
          ? 'AI ve müşteri deneyimi konusunda uzmanlaşmış profesyoneller'
          : 'Professionals specialized in AI and customer experience'}
      >
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <TechCard glowColor="blue" delay={0.1}>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-3">50+</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {language === 'tr' ? 'AI Mühendisi' : 'AI Engineers'}
              </h3>
              <p className="text-sm text-gray-400 font-light">
                {language === 'tr'
                  ? 'Dünya çapında uzmanlar'
                  : 'World-class experts'}
              </p>
            </div>
          </TechCard>

          <TechCard glowColor="purple" delay={0.2}>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-3">15+</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {language === 'tr' ? 'Ülke' : 'Countries'}
              </h3>
              <p className="text-sm text-gray-400 font-light">
                {language === 'tr'
                  ? 'Küresel ekip yapısı'
                  : 'Global team structure'}
              </p>
            </div>
          </TechCard>

          <TechCard glowColor="green" delay={0.3}>
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400 mb-3">24/7</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {language === 'tr' ? 'Destek' : 'Support'}
              </h3>
              <p className="text-sm text-gray-400 font-light">
                {language === 'tr'
                  ? 'Kesintisiz yardım'
                  : 'Continuous assistance'}
              </p>
            </div>
          </TechCard>
        </div>
      </TechSection>

      {/* CTA Section */}
      <TechSection className="py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-thin mb-6">
            <span className="font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {language === 'tr' ? 'Birlikte Büyüyelim' : "Let's Grow Together"}
            </span>
          </h2>

          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-gray-600" />
            <p className="text-lg text-gray-400 font-light">
              {language === 'tr'
                ? 'AI destekli geleceğinizi bugün başlatın'
                : 'Start your AI-powered future today'}
            </p>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-gray-600" />
          </div>

          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 hover:border-cyan-400/50 text-cyan-400 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          >
            <span>{language === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}</span>
            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
          </Link>
        </motion.div>
      </TechSection>
    </div>
  );
};

export default Company;