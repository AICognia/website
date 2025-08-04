import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiCalendar, FiHeart, FiArrowRight, FiTool } from 'react-icons/fi';
import ServiceDetails from './ServiceDetails';

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
        <span>Detaylı Bilgi</span>
        <FiArrowRight />
      </motion.button>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const services = [
    {
      icon: <FiShoppingCart className="text-white text-3xl" />,
      title: 'Müşteri Destek Sistemi',
      description: 'AI destekli chatbot ve voice agent ile müşterilerinizin sorularını anında yanıtlayın. WhatsApp, Instagram ve telefon üzerinden 7/24 otomatik destek sağlayın.',
      features: [
        'WhatsApp/Instagram müşteri destek chatbotu',
        'AI Voice Agent ile telefon desteği',
        'Sık sorulan sorulara otomatik yanıt',
        'Canlı destek yönlendirmesi',
        'Çoklu dil desteği ile global erişim'
      ],
      color: 'bg-primary',
      delay: 0
    },
    {
      icon: <FiCalendar className="text-white text-3xl" />,
      title: 'Rezervasyon Sistemi',
      description: 'Restoran ve işletmeniz için akıllı rezervasyon yönetimi. Müşterileriniz WhatsApp, Instagram veya telefon üzerinden kolayca rezervasyon yapabilir.',
      features: [
        'WhatsApp/Instagram rezervasyon chatbotu',
        'Voice Agent ile telefon rezervasyonu',
        'Otomatik masa ve zaman yönetimi',
        'Rezervasyon iptali ve değişikliği',
        'Müşteri bilgilendirme ve hatırlatma'
      ],
      color: 'bg-secondary',
      delay: 0.2
    },
    {
      icon: <FiTool className="text-white text-3xl" />,
      title: 'İşletmenize Özel Çözümler',
      description: 'Sektörünüze ve iş modelinize özel AI çözümleri geliştiriyoruz. E-ticaret, sağlık, eğitim, turizm ve daha fazlası için özelleştirilmiş sistemler.',
      features: [
        'Sektöre özel AI model geliştirme',
        'Mevcut sistemlerle %100 entegrasyon',
        'Özel chatbot ve otomasyon çözümleri',
        'Veri analizi ve tahminleme sistemleri',
        'Rekabet avantajı sağlayan özel özellikler'
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
            AI Destekli <span className="text-secondary">Çözümlerimiz</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            <span className="font-bold">Sadece 48 saat</span> içinde işletmenizi dijital dönüşüme hazırlayın! 
            <span className="font-bold">Chatbot + Voice Agent</span> çözümlerimizle tüm iletişim kanallarınızı otomatikleştirin.
            <span className="font-semibold">Rakiplerinizin önüne geçin</span>, müşteri memnuniyetini zirveye taşıyın.
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
            <h3 className="text-2xl font-bold mb-4 text-white">Neden Cognia AI?</h3>
            <p className="text-white/80">Türkiye'nin dijital dönüşüm yolculuğunda güvenilir partneriniz</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-5xl font-bold text-secondary mb-2 text-glow group-hover:scale-110 transition-transform duration-300">%95</div>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors">Müşteri Memnuniyeti</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-5xl font-bold text-secondary mb-2 text-glow group-hover:scale-110 transition-transform duration-300">7/24</div>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors">Kesintisiz Hizmet</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-5xl font-bold text-secondary mb-2 text-glow group-hover:scale-110 transition-transform duration-300">100+</div>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors">İşletme Bizi Tercih Etti</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl md:text-5xl font-bold text-secondary mb-2 text-glow group-hover:scale-110 transition-transform duration-300">48 Saat</div>
              <p className="text-sm md:text-base text-white/70 group-hover:text-white transition-colors">Kurulum Süresi</p>
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
