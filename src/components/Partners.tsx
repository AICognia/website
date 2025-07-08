import React from 'react';
import { motion } from 'framer-motion';

const Partners: React.FC = () => {
  const partners = [
    { name: 'Trendyol', logo: '🛍️' },
    { name: 'Hepsiburada', logo: '🛒' },
    { name: 'N11', logo: '📦' },
    { name: 'WhatsApp Business', logo: '💬' },
    { name: 'Instagram Business', logo: '📸' },
    { name: 'Meta', logo: '🌐' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-darkBlue to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Güvenilir İş Ortaklarımız</h3>
          <p className="text-white/80">Sektörün liderleriyle entegre çalışıyoruz</p>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          <motion.div 
            className="flex overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
              className="flex gap-16 py-8"
            >
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20 whitespace-nowrap"
                >
                  <span className="text-3xl">{partner.logo}</span>
                  <span className="text-white font-medium">{partner.name}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners; 