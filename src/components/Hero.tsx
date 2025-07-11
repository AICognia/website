import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiPlay } from 'react-icons/fi';
import { BsShieldCheck } from 'react-icons/bs';
import ServiceDetails from './ServiceDetails';

const Hero: React.FC = () => {
  const [selectedService, setSelectedService] = React.useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

  const benefits = [
    'WhatsApp & Instagram Entegrasyonu',
    'Türkiye\'ye Özel Çözümler',
    '7/24 Müşteri Desteği',
    'Hızlı Kurulum ve Entegrasyon'
  ];

  const trustBadges = [
    { icon: <BsShieldCheck />, text: 'KVKK Uyumlu' },
  ];

  const aiAssistants = [
    {
      number: '1',
      title: 'Müşteri Destek Asistanı',
      description: '7/24 otomatik destek',
      service: {
        title: 'Müşteri Destek Sistemi',
        description: 'AI destekli müşteri destek sistemiyle müşterilerinizin sorularını anında yanıtlayın.',
        features: [
          'WhatsApp/Instagram müşteri destek chatbotu',
          'Sık sorulan sorulara otomatik yanıt',
          'Canlı destek yönlendirmesi',
          'Müşteri memnuniyeti takibi',
          'Çoklu dil desteği ile global erişim'
        ]
      }
    },
    {
      number: '2',
      title: 'Rezervasyon Asistanı',
      description: 'Otomatik rezervasyon yönetimi',
      service: {
        title: 'Rezervasyon Sistemi',
        description: 'Restoran ve işletmeniz için akıllı rezervasyon yönetimi.',
        features: [
          'WhatsApp/Instagram rezervasyon chatbotu',
          'Otomatik masa ve zaman yönetimi',
          'Menü bilgisi ve özel istek yönetimi',
          'Rezervasyon iptali ve değişikliği',
          'Müşteri bilgilendirme ve hatırlatma'
        ]
      }
    },
    {
      number: '3',
      title: 'Özel Çözümler',
      description: 'İşletmenize özel AI çözümleri',
      service: {
        title: 'İşletmenize Özel AI Çözümleri',
        description: 'Sektörünüze ve iş modelinize %100 uyumlu, size özel tasarlanmış yapay zeka sistemleri geliştiriyoruz.',
        features: [
          'Sektör liderleri için özel AI modelleri',
          'Rakiplerinizden bir adım önde olmanızı sağlayan çözümler',
          'Tam entegrasyon ve özelleştirme',
          'Ölçeklenebilir ve esnek yapı',
          'Sürekli güncelleme ve destek'
        ]
      }
    }
  ];

  const scrollToContact = () => {
    const contactCTA = document.querySelector('.contact-cta-section');
    if (contactCTA) {
      contactCTA.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-darkBlue via-primary to-lightBlue gradient-shift pt-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-6 mb-8"
          >
            {trustBadges.map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-secondary/20"
              >
                <span className="text-secondary">{badge.icon}</span>
                <span className="text-white text-sm font-medium">{badge.text}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-secondary/30"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                </span>
                <span className="text-white text-sm">🚀 %300 Verimlilik Artışı Garantisi</span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                İşletmenizi{' '}
                <span className="text-secondary font-extrabold text-glow">Yapay Zeka</span>{' '}
                ile Geleceğe Taşıyın
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                <span className="font-bold text-secondary">48 saat içinde kurulum</span>, anında sonuç! 
                Türkiye'nin önde gelen AI danışmanlık firması olarak, işletmenize özel yapay zeka çözümleri sunuyoruz. 
                Müşteri destek ve rezervasyon sistemlerimizle <span className="font-semibold">maliyetlerinizi %70 azaltın</span>, 
                <span className="font-semibold"> müşteri memnuniyetini %95'e çıkarın</span>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <FiCheckCircle className="text-secondary flex-shrink-0" />
                    <span className="text-sm text-white">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToContact}
                  className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/30 group"
                >
                  <span>Ücretsiz Demo Al</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const demoVideosSection = document.getElementById('demo-videos');
                    if (demoVideosSection) {
                      demoVideosSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <FiPlay />
                  <span>Demo İzle</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-darkBlue/80 to-lightBlue/80 backdrop-blur-xl border border-secondary/40 rounded-3xl shadow-2xl p-10 glow-effect hover:scale-[1.02] transition-transform duration-300">
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col items-center justify-center mb-10"
                  >
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative floating">
                        <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-2xl">
                          <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" style={{stopColor: '#00E5FF', stopOpacity: 1}} />
                              <stop offset="100%" style={{stopColor: '#00ACC1', stopOpacity: 1}} />
                            </linearGradient>
                          </defs>
                          <path 
                            d="M 35 20 L 60 10 L 85 20 L 85 30 L 75 30 L 75 25 L 60 18 L 45 25 L 35 35 L 35 65 L 45 75 L 60 82 L 75 75 L 75 70 L 85 70 L 85 80 L 60 90 L 35 80 L 20 65 L 20 35 Z" 
                            fill="none" 
                            stroke="url(#logoGradient)" 
                            strokeWidth="3.5"
                            strokeLinejoin="miter"
                          />
                          <path 
                            d="M 40 30 L 55 23 L 70 30 L 70 35 L 65 35 L 65 32 L 55 27 L 45 32 L 40 37 L 40 63 L 45 68 L 55 73 L 65 68 L 65 65 L 70 65 L 70 70 L 55 77 L 40 70 L 32 62 L 32 38 Z" 
                            fill="none" 
                            stroke="#00D4FF" 
                            strokeWidth="2"
                            strokeLinejoin="miter"
                            opacity="0.7"
                          />
                        </svg>
                      </div>
                      <div className="text-5xl font-light text-white">Cognia</div>
                    </div>
                    <h3 className="text-3xl font-bold text-center text-white">AI Asistanlarımız</h3>
                  </motion.div>
                  <div className="space-y-4">
                    {aiAssistants.map((assistant, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => {
                          setSelectedService(assistant.service);
                          setIsDetailsOpen(true);
                        }}
                        className="group flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-secondary/20 hover:bg-white/15 hover:border-secondary/30 transition-all duration-300 cursor-pointer transform hover:scale-105"
                      >
                        <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                          <span className="text-secondary font-bold text-lg">{assistant.number}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white group-hover:text-secondary transition-colors">{assistant.title}</h4>
                          <p className="text-sm text-white/70">{assistant.description}</p>
                        </div>
                        <FiArrowRight className="text-white/50 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl animate-pulse"></div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <ServiceDetails 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        service={selectedService}
      />
    </>
  );
};

export default Hero;
