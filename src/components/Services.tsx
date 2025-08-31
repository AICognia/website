import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiCalendar, FiHeart, FiArrowRight, FiTool } from 'react-icons/fi';
import ServiceDetails from './ServiceDetails';
import { useLanguage } from '../contexts/LanguageContext';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  delay: number;
  onDetailsClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, color, delay, onDetailsClick }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-darkBlue/50 backdrop-blur-lg border border-secondary/30 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group hover:scale-105 hover:border-secondary/50 hover:bg-darkBlue/60 glow-effect"
    >
      <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 pulse-glow`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-secondary transition-colors">{title}</h3>
      <p className="text-white/80 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-secondary mr-2">•</span>
            <span className="text-white/70">{feature}</span>
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onDetailsClick}
        className="mt-6 w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-medium flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300"
      >
        <span>{t('services.learnMore') || 'Learn More'}</span>
        <FiArrowRight />
      </motion.button>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { t } = useLanguage();

  const services = [
    {
      icon: <FiShoppingCart className="text-white text-3xl" />,
      title: t('services.customerSupport.title'),
      description: t('services.customerSupport.desc'),
      features: [
        t('services.feature.whatsapp'),
        t('services.feature.voicePhone'),
        t('services.feature.autoReply'),
        t('services.feature.liveSupport'),
        t('services.feature.multilingual')
      ],
      color: 'bg-primary',
      delay: 0
    },
    {
      icon: <FiCalendar className="text-white text-3xl" />,
      title: t('services.reservation.title'),
      description: t('services.reservation.desc'),
      features: [
        t('services.feature.reservation'),
        t('services.feature.phoneReservation'),
        t('services.feature.tableManagement'),
        t('services.feature.cancellation'),
        t('services.feature.reminder')
      ],
      color: 'bg-secondary',
      delay: 0.2
    },
    {
      icon: <FiTool className="text-white text-3xl" />,
      title: t('services.custom.title'),
      description: t('services.custom.desc'),
      features: [
        t('services.feature.customAI'),
        t('services.feature.integration'),
        t('services.feature.competitive'),
        t('services.feature.scalable'),
        t('services.feature.updates')
      ],
      color: 'bg-gradient-to-r from-purple-600 to-pink-600',
      delay: 0.4
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-lightBlue to-primary dot-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            {t('services.title')}
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              onDetailsClick={() => {
                setSelectedService(service);
                setIsDetailsOpen(true);
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-darkBlue/50 backdrop-blur-lg border border-secondary/30 rounded-2xl shadow-xl p-8 glow-effect hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-white">{t('services.whyCognia') || 'Why Choose Cognia AI?'}</h3>
            <p className="text-white/80">{t('services.trustedPartner') || 'Your trusted partner in digital transformation'}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-5xl font-bold text-secondary mb-2 text-glow group-hover:scale-110 transition-transform duration-300">95%</div>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors">{t('services.satisfaction') || 'Customer Satisfaction'}</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-5xl font-bold text-secondary mb-2 text-glow group-hover:scale-110 transition-transform duration-300">24/7</div>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors">{t('services.support247') || 'Continuous Service'}</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-5xl font-bold text-secondary mb-2 text-glow group-hover:scale-110 transition-transform duration-300">100+</div>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors">{t('services.businesses') || 'Businesses Trust Us'}</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-5xl font-bold text-secondary mb-2 text-glow group-hover:scale-110 transition-transform duration-300">48h</div>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors">{t('services.setupTime') || 'Setup Time'}</p>
            </div>
          </div>
        </motion.div>
      </div>
      <ServiceDetails 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        service={selectedService}
      />
    </section>
  );
};

export default Services;