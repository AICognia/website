import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const Hero: React.FC = () => {
  const benefits = [
    'WhatsApp & Instagram Entegrasyonu',
    'Türkiye\'ye Özel Çözümler',
    '7/24 Müşteri Desteği',
    'Hızlı Kurulum ve Entegrasyon'
  ];

  const scrollToContact = () => {
    const contactCTA = document.querySelector('.contact-cta-section');
    if (contactCTA) {
      contactCTA.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light via-white to-light pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6">
              İşletmenizi{' '}
              <span className="text-gradient">Yapay Zeka</span>{' '}
              ile Geleceğe Taşıyın
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Türkiye'nin önde gelen AI danışmanlık firması olarak, işletmenize özel yapay zeka çözümleri sunuyoruz. 
              E-ticaret, rezervasyon ve medikal turizm sistemlerimizle verimliliğinizi artırın.
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
                  <span className="text-sm text-gray-700">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
              >
                <span>Hemen Başlayın</span>
                <FiArrowRight />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="border-2 border-primary text-primary px-8 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-all"
              >
                Demo Talep Et
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
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <img 
                    src="/cognia-logo.svg" 
                    alt="Cognia AI" 
                    className="h-16 w-auto rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-center mb-4">AI Asistanlarımız</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-light rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">E-Ticaret Asistanı</h4>
                      <p className="text-sm text-gray-600">Satış ve müşteri desteği</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-light rounded-lg">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <span className="text-secondary font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Rezervasyon Asistanı</h4>
                      <p className="text-sm text-gray-600">Otomatik rezervasyon yönetimi</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-light rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Medikal Turizm Asistanı</h4>
                      <p className="text-sm text-gray-600">Hasta yönlendirme ve planlama</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
