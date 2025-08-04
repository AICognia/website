import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiHeadphones, FiZap, FiGlobe } from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';

const VoiceAgent: React.FC = () => {

  const features = [
    {
      icon: <FiPhone className="text-2xl" />,
      title: 'Telefon Desteği',
      description: 'Müşterileriniz telefon ile 7/24 destek alabilir'
    },
    {
      icon: <FiGlobe className="text-2xl" />,
      title: 'Çoklu Dil',
      description: 'Türkçe dahil 20+ dilde doğal konuşma'
    },
    {
      icon: <FiZap className="text-2xl" />,
      title: 'Anlık Yanıt',
      description: 'İnsan gibi hızlı ve doğru yanıtlar'
    }
  ];

  return (
    <section id="voice-agent" className="py-20 bg-gradient-to-br from-lightBlue to-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            AI <span className="text-secondary">Voice Agent</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Telefon üzerinden müşterilerinize 7/24 otomatik destek sağlayan, 
            insan gibi konuşan ve anlayan AI asistanınız
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Voice Agent Nedir?
              </h3>
              <p className="text-white/80 mb-6 leading-relaxed">
                Voice Agent, işletmenizin telefon sistemine entegre olan ve müşterilerinizle 
                doğal bir şekilde konuşabilen yapay zeka destekli ses asistanıdır. 
                Sipariş takibi, randevu alma, bilgi verme gibi işlemleri otomatik olarak gerçekleştirir.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 bg-darkBlue/30 backdrop-blur-sm p-4 rounded-lg border border-secondary/20"
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-secondary">{feature.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{feature.title}</h4>
                    <p className="text-white/70">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const contactCTA = document.querySelector('.contact-cta-section');
                if (contactCTA) {
                  contactCTA.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="mt-8 bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 group"
            >
              <span>Demo Talep Et</span>
              <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Column - Demo Widget */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-darkBlue/40 backdrop-blur-lg border border-secondary/30 rounded-2xl p-8 shadow-xl">
              <div className="text-center">
                <FiHeadphones className="text-5xl text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-6">
                  Hemen Deneyin
                </h3>

                {/* Widget with proper spacing */}
                <div className="relative min-h-[150px] flex items-center justify-center mt-8">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: '<elevenlabs-convai agent-id="agent_8901k1raws42edfb7egfm21788dc"></elevenlabs-convai>' 
                    }} 
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 bg-darkBlue/30 backdrop-blur-lg border border-secondary/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Chatbot + Voice Agent = Tam Otomasyon
          </h3>
          <p className="text-white/80 max-w-3xl mx-auto">
            WhatsApp ve Instagram üzerinden chatbot, telefon üzerinden voice agent ile 
            tüm iletişim kanallarınızı otomatikleştirin. Müşteri memnuniyetini artırın, 
            maliyetlerinizi düşürün.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VoiceAgent; 