import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiHeadphones, FiMic, FiZap, FiGlobe, FiClock, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { BsArrowRight, BsCheckCircleFill } from 'react-icons/bs';

const VoiceAgent: React.FC = () => {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  useEffect(() => {
    // Load ElevenLabs script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    script.onload = () => setIsWidgetLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const features = [
    {
      icon: <FiZap className="text-2xl" />,
      title: 'Anlık Yanıt',
      description: '0.5 saniyeden kısa yanıt süresi'
    },
    {
      icon: <FiGlobe className="text-2xl" />,
      title: 'Çoklu Dil',
      description: '20+ dilde doğal konuşma'
    },
    {
      icon: <FiClock className="text-2xl" />,
      title: '7/24 Hizmet',
      description: 'Kesintisiz müşteri desteği'
    },
    {
      icon: <FiTrendingUp className="text-2xl" />,
      title: '%98 Doğruluk',
      description: 'Yüksek başarı oranı'
    }
  ];

  const capabilities = [
    'Sipariş durumu sorgulama',
    'Randevu ve rezervasyon alma',
    'Ürün bilgisi ve öneriler',
    'Şikayet ve önerileri kaydetme',
    'Fiyat bilgisi ve kampanyalar',
    'Teknik destek sağlama'
  ];

  const stats = [
    { value: '10M+', label: 'Çağrı İşlendi' },
    { value: '%95', label: 'Müşteri Memnuniyeti' },
    { value: '100+', label: 'Aktif İşletme' },
    { value: '24/7', label: 'Kesintisiz Hizmet' }
  ];

  return (
    <section id="voice-agent" className="py-20 bg-gradient-to-br from-darkBlue via-primary to-lightBlue relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-secondary/30"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            <span className="text-white font-medium">Yeni Nesil AI Teknolojisi</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Geleceğin <span className="text-secondary text-glow">Voice Agent</span> Teknolojisi
          </h2>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            İnsan gibi konuşan, anlayan ve yanıt veren AI Voice Agent'ımız ile 
            müşterilerinize <span className="font-bold text-secondary">unutulmaz bir deneyim</span> sunun
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg border border-secondary/30 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-secondary mb-2 text-glow">{stat.value}</div>
              <div className="text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Features and Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-darkBlue/50 backdrop-blur-lg border border-secondary/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:border-secondary/50 group"
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
                    <div className="text-secondary">{feature.icon}</div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Capabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-darkBlue/50 backdrop-blur-lg border border-secondary/30 rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiUsers className="mr-3 text-secondary" />
                Neler Yapabilir?
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2"
                  >
                    <BsCheckCircleFill className="text-secondary flex-shrink-0" />
                    <span className="text-white/80 text-sm">{capability}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
              >
                <button
                  onClick={() => {
                    const contactCTA = document.querySelector('.contact-cta-section');
                    if (contactCTA) {
                      contactCTA.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full bg-gradient-to-r from-secondary to-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 group"
                >
                  <span>İşletmenize Özel Demo Talep Edin</span>
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-darkBlue/60 to-lightBlue/60 backdrop-blur-xl border border-secondary/40 rounded-3xl p-8 md:p-10 shadow-2xl hover:scale-[1.02] transition-transform duration-300">
              {/* Demo Header */}
              <div className="text-center mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 bg-gradient-to-r from-secondary to-primary rounded-full mx-auto mb-6 flex items-center justify-center"
                >
                  <FiHeadphones className="text-white text-3xl" />
                </motion.div>
                
                <h3 className="text-3xl font-bold text-white mb-4">
                  Hemen Deneyin!
                </h3>
                <p className="text-white/80 text-lg">
                  Aşağıdaki butona tıklayarak AI Voice Agent'ımızla 
                  <span className="font-semibold text-secondary"> canlı konuşma</span> başlatın
                </p>
              </div>

              {/* Widget Container */}
              <div className="bg-white/5 border border-secondary/20 rounded-2xl p-8 mb-6">
                {!isWidgetLoaded && (
                  <div className="text-center text-white/60 mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary mx-auto mb-2"></div>
                    Voice Agent yükleniyor...
                  </div>
                )}
                
                <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
                  {React.createElement('elevenlabs-convai', { 'agent-id': 'agent_8901k1raws42edfb7egfm21788dc' })}
                </div>

                <div className="mt-6 space-y-2 text-sm text-white/70">
                  <p className="flex items-center">
                    <FiMic className="mr-2 text-secondary" />
                    Mikrofonunuza izin verin
                  </p>
                  <p className="flex items-center">
                    <FiPhone className="mr-2 text-secondary" />
                    Doğal bir şekilde konuşun
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
                  <FiZap className="text-secondary text-2xl mx-auto mb-2" />
                  <p className="text-secondary font-semibold">Yanıt Süresi</p>
                  <p className="text-white text-xl font-bold">&lt; 0.5s</p>
                </div>
                <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-4 text-center">
                  <FiTrendingUp className="text-secondary text-2xl mx-auto mb-2" />
                  <p className="text-secondary font-semibold">Başarı Oranı</p>
                  <p className="text-white text-xl font-bold">%98+</p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-6 -right-6 w-24 h-24 bg-secondary/30 rounded-full filter blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/30 rounded-full filter blur-2xl"
            />
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-darkBlue/60 to-lightBlue/60 backdrop-blur-xl border border-secondary/30 rounded-3xl p-10 text-center shadow-2xl"
        >
          <h3 className="text-3xl font-bold text-white mb-6">
            Chatbot + Voice Agent = <span className="text-secondary text-glow">Tam Otomasyon</span>
          </h3>
          <p className="text-white/80 text-lg max-w-4xl mx-auto mb-8 leading-relaxed">
            WhatsApp ve Instagram üzerinden chatbot, telefon üzerinden voice agent ile 
            müşterilerinizin <span className="font-bold">tüm iletişim kanallarını</span> otomatikleştirin. 
            <span className="font-semibold text-secondary"> Maliyetlerinizi %70 azaltın</span>, 
            müşteri memnuniyetini maksimuma çıkarın!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactCTA = document.querySelector('.contact-cta-section');
                if (contactCTA) {
                  contactCTA.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-xl hover:shadow-secondary/30 group"
            >
              <span>Ücretsiz Demo Talep Et</span>
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const demoVideos = document.getElementById('demo-videos');
                if (demoVideos) {
                  demoVideos.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-white/20 transition-all duration-300 border border-white/20 group"
            >
              <span>Chatbot Demolarını İzle</span>
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceAgent; 