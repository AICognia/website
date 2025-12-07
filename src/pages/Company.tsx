import React from 'react';
import { FaRocket, FaUsers, FaGlobeAmericas, FaBrain, FaCode, FaShieldAlt, FaHandshake, FaChartLine, FaClock, FaLightbulb } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';
import ScrollProgress from '../components/ScrollProgress';

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
      <ScrollProgress />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO
          page="company"
          breadcrumbs={breadcrumbs}
          structuredData={[aboutStructuredData]}
        />

        {/* Hero Section - Scale.com style */}
        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">
                  {language === 'tr' ? 'Hakkımızda' : 'About Us'}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                {language === 'tr' ? 'AI İletişiminin' : 'Building the Future of'}
                <br />
                {language === 'tr' ? 'Geleceğini İnşa Ediyoruz' : 'AI Communication'}
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {language === 'tr'
                  ? 'İşletmelerin müşterileriyle nasıl bağlantı kurduğunu dönüştüren akıllı çözümler üretiyoruz.'
                  : 'Pioneering intelligent solutions that transform how businesses connect with their customers.'}
              </p>
            </div>
          </div>
        </section>

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
            <TechCard>
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FaRocket className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-2">
                      {language === 'tr' ? 'Misyonumuz' : 'Our Mission'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {language === 'tr'
                    ? 'Her işletmeyi anlayan, yanıt veren ve ölçekte olağanüstü deneyimler sunan AI ile güçlendirmek.'
                    : 'To empower every business with AI that understands, responds, and delivers exceptional experiences at scale.'}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {language === 'tr'
                    ? 'Teknolojinin insan bağlantısını geliştirdiği bir geleceğe inanıyoruz. Platformumuz, işletmelerin müşterilerine daha iyi hizmet vermesini sağlar.'
                    : 'We believe in a future where technology enhances human connection. Our platform enables businesses to serve customers better than ever before.'}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {language === 'tr'
                    ? 'Müşteri memnuniyetini en üst düzeye çıkarmak ve iş süreçlerini optimize etmek için sürekli yenilikçi çözümler geliştiriyoruz.'
                    : 'We continuously develop innovative solutions to maximize customer satisfaction and optimize business processes.'}
                </p>
              </div>
            </TechCard>

            {/* Vision Card */}
            <TechCard>
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <FaBrain className="text-xl text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-medium text-white mb-2">
                      {language === 'tr' ? 'Vizyonumuz' : 'Our Vision'}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {language === 'tr'
                    ? 'AI destekli iş iletişiminde küresel standart olmak ve milyonlarca işletmenin mükemmel müşteri hizmeti sunmasını sağlamak.'
                    : 'To become the global standard for AI-powered business communication, enabling millions of businesses to provide exceptional customer service.'}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {language === 'tr'
                    ? 'Gelecekte her işletmenin AI destekli bir asistana sahip olacağı ve müşteri deneyiminin tamamen kişiselleştirileceği bir dünya hayal ediyoruz.'
                    : 'We envision a future where every business has an AI-powered assistant and customer experiences are fully personalized.'}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {language === 'tr'
                    ? 'İnsan zekası ve yapay zekanın mükemmel uyumunu sağlayarak, işletmelerin potansiyellerini maksimuma çıkarmalarına yardımcı oluyoruz.'
                    : 'By achieving perfect harmony between human intelligence and AI, we help businesses maximize their potential.'}
                </p>
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
                icon: FaCode,
                title: language === 'tr' ? 'İnovasyon' : 'Innovation',
                description: language === 'tr'
                  ? 'AI teknolojisinin sınırlarını zorluyoruz'
                  : 'Pushing the boundaries of AI technology'
              },
              {
                icon: FaUsers,
                title: language === 'tr' ? 'Müşteri Odaklı' : 'Customer First',
                description: language === 'tr'
                  ? 'Başarınız bizim önceliğimiz'
                  : 'Your success is our priority'
              },
              {
                icon: FaShieldAlt,
                title: language === 'tr' ? 'Güvenlik' : 'Security',
                description: language === 'tr'
                  ? 'Kurumsal düzeyde veri koruması'
                  : 'Enterprise-grade data protection'
              },
              {
                icon: FaGlobeAmericas,
                title: language === 'tr' ? 'Küresel Erişim' : 'Global Reach',
                description: language === 'tr'
                  ? 'Her yerde, her zaman, her dilde'
                  : 'Anywhere, anytime, any language'
              },
              {
                icon: FaHandshake,
                title: language === 'tr' ? 'Güvenilirlik' : 'Reliability',
                description: language === 'tr'
                  ? '%99.9 uptime garantisi'
                  : '99.9% uptime guarantee'
              },
              {
                icon: FaChartLine,
                title: language === 'tr' ? 'Ölçülebilir Sonuçlar' : 'Measurable Results',
                description: language === 'tr'
                  ? 'Gerçek zamanlı performans metrikleri'
                  : 'Real-time performance metrics'
              },
              {
                icon: FaClock,
                title: language === 'tr' ? 'Hızlı Kurulum' : 'Fast Setup',
                description: language === 'tr'
                  ? '1 hafta içinde hazır'
                  : 'Ready within 1 week'
              },
              {
                icon: FaLightbulb,
                title: language === 'tr' ? 'Sürekli Gelişim' : 'Continuous Improvement',
                description: language === 'tr'
                  ? 'Öğrenen sistem, gelişen performans'
                  : 'Learning system, evolving performance'
              }
            ].map((value, index) => (
              <TechCard key={index}>
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <value.icon className="text-xl text-white" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">
                    {value.description}
                  </p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        {/* CTA Section */}
        <TechSection
          badge={language === 'tr' ? 'İletişim' : 'Contact'}
          title={language === 'tr' ? 'Birlikte Büyüyelim' : "Let's Grow Together"}
          subtitle={language === 'tr'
            ? 'AI destekli geleceğinizi bugün başlatın'
            : 'Start your AI-powered future today'}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
            >
              <span>{language === 'tr' ? 'Bize Ulaşın' : 'Contact Us'}</span>
              <span>→</span>
            </Link>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default Company;
