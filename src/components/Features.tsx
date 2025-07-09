import React from 'react';
import { motion } from 'framer-motion';
import { BsWhatsapp, BsInstagram } from 'react-icons/bs';

import { FiTruck, FiDatabase, FiBarChart2, FiGlobe } from 'react-icons/fi';
import { HiOutlineDocumentReport, HiOutlineUserGroup } from 'react-icons/hi';

const Features: React.FC = () => {
  const integrations = [
    { 
      name: 'WhatsApp', 
      icon: <BsWhatsapp className="text-4xl" />, 
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 hover:bg-green-500/20'
    },
    { 
      name: 'Instagram', 
      icon: <BsInstagram className="text-4xl" />, 
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/10 hover:bg-pink-500/20'
    },
    { 
      name: 'Trendyol', 
      icon: (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <rect width="100" height="100" rx="20" fill="#FF6600"/>
          <text x="50" y="60" textAnchor="middle" fill="white" fontSize="36" fontWeight="bold">T</text>
        </svg>
      ),
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10 hover:bg-orange-500/20'
    },
    { 
      name: 'Hepsiburada', 
      icon: (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <rect width="100" height="100" rx="20" fill="#FF6000"/>
          <text x="50" y="60" textAnchor="middle" fill="white" fontSize="36" fontWeight="bold">H</text>
        </svg>
      ),
      color: 'text-orange-600',
      bgColor: 'bg-orange-600/10 hover:bg-orange-600/20'
    },
    { 
      name: 'N11', 
      icon: (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <rect width="100" height="100" rx="20" fill="#D41F38"/>
          <text x="50" y="60" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">n11</text>
        </svg>
      ),
      color: 'text-red-600',
      bgColor: 'bg-red-600/10 hover:bg-red-600/20'
    },
    { 
      name: 'Çiçeksepeti', 
      icon: (
        <svg viewBox="0 0 100 100" className="w-10 h-10">
          <circle cx="50" cy="50" r="45" fill="#FF1744"/>
          <path d="M50 25 C35 25 25 35 25 50 C25 65 50 75 50 75 C50 75 75 65 75 50 C75 35 65 25 50 25 Z" fill="white" opacity="0.9"/>
          <circle cx="50" cy="45" r="8" fill="#FF1744"/>
        </svg>
      ),
      color: 'text-pink-600',
      bgColor: 'bg-pink-600/10 hover:bg-pink-600/20'
    },
  ];

  const additionalFeatures = [
    {
      icon: <FiDatabase className="text-2xl" />,
      title: 'Veri Analitiği',
      description: 'Müşteri davranışlarını analiz edin, satış trendlerini öngörün'
    },
    {
      icon: <FiBarChart2 className="text-2xl" />,
      title: 'Performans Raporlama',
      description: 'Gerçek zamanlı raporlar ile işletmenizi yakından takip edin'
    },
    {
      icon: <FiTruck className="text-2xl" />,
      title: 'Lojistik Entegrasyonu',
      description: 'Kargo firmalarıyla otomatik entegrasyon ve takip'
    },
    {
      icon: <HiOutlineDocumentReport className="text-2xl" />,
      title: 'Muhasebe Entegrasyonu',
      description: 'Logo, Netsis, SAP gibi sistemlerle tam uyum'
    },
    {
      icon: <HiOutlineUserGroup className="text-2xl" />,
      title: 'CRM Entegrasyonu',
      description: 'Müşteri ilişkileri yönetimini AI ile güçlendirin'
    },
    {
      icon: <FiGlobe className="text-2xl" />,
      title: 'Çoklu Dil Desteği',
      description: 'Türkçe, İngilizce, Arapça, Rusça ve daha fazlası'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-darkBlue to-lightBlue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Güçlü <span className="text-secondary">Entegrasyonlar</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Mevcut sistemlerinizle sorunsuz entegrasyon sağlayarak iş süreçlerinizi 
            kesintiye uğratmadan dijital dönüşümünüzü tamamlayın.
          </p>
        </motion.div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-secondary/20 glow-effect hover:scale-[1.02] transition-transform duration-300"
          >
            <h3 className="text-2xl font-bold text-center mb-8 text-white">Desteklenen Platformlar</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {integrations.map((integration, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className={`w-20 h-20 ${integration.bgColor} backdrop-blur-sm border border-secondary/30 rounded-xl shadow-lg flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-secondary/50 transition-all duration-300 pulse-glow`}>
                    {integration.icon}
                  </div>
                  <span className="text-sm font-medium text-white/80">{integration.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-darkBlue/50 backdrop-blur-lg border border-secondary/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group hover:scale-105 hover:border-secondary/50 hover:bg-darkBlue/60"
            >
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4 text-secondary group-hover:bg-secondary/30 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <h4 className="text-lg font-semibold mb-2 text-white group-hover:text-secondary transition-colors">{feature.title}</h4>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">
            İşletmenize Özel AI Çözümleri
          </h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Sektörünüze ve iş modelinize özel geliştirilmiş yapay zeka çözümlerimizle 
            rakiplerinizin bir adım önünde olun.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactCTA = document.querySelector('.contact-cta-section');
              if (contactCTA) {
                contactCTA.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/30"
          >
            Özel Çözüm Talep Et
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
