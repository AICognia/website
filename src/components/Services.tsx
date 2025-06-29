import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiCalendar, FiHeart } from 'react-icons/fi';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  color: string;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, features, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow"
    >
      <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="text-secondary mr-2">•</span>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`mt-6 w-full ${color} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity`}
      >
        Detaylı Bilgi
      </motion.button>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <FiShoppingCart className="text-white text-3xl" />,
      title: 'E-Ticaret Sistemi',
      description: 'Online satışlarınızı yapay zeka ile güçlendirin. Müşteri deneyimini artırırken operasyonel verimliliğinizi maksimize edin.',
      features: [
        'WhatsApp/Instagram müşteri destek chatbotu',
        'Türk muhasebe sistemleriyle e-fatura entegrasyonu',
        'Çoklu platform envanter takibi (Trendyol, Hepsiburada, N11)',
        'Otomatik sipariş yönetimi ve takibi',
        'Kişiselleştirilmiş ürün önerileri'
      ],
      color: 'bg-primary',
      delay: 0
    },
    {
      icon: <FiCalendar className="text-white text-3xl" />,
      title: 'Rezervasyon Sistemi',
      description: 'Restoran ve işletmeniz için akıllı rezervasyon yönetimi. Müşterileriniz WhatsApp ve Instagram üzerinden kolayca rezervasyon yapabilir.',
      features: [
        'WhatsApp/Instagram rezervasyon chatbotu',
        'Otomatik masa ve zaman yönetimi',
        'Menü bilgisi ve özel istek yönetimi',
        'Rezervasyon iptali ve değişikliği',
        'Müşteri bilgilendirme ve hatırlatma'
      ],
      color: 'bg-secondary',
      delay: 0.2
    },
    {
      icon: <FiHeart className="text-white text-3xl" />,
      title: 'Medikal Turizm Sistemi',
      description: 'Sağlık turizminde hasta deneyimini baştan sona yönetin. Operasyon planlamasından konaklama organizasyonuna kadar her detay kontrol altında.',
      features: [
        'Hasta iletişim ve danışmanlık chatbotu',
        'Operasyon ve tedavi planlaması',
        'Konaklama ve transfer organizasyonu',
        'Çoklu dil desteği (İngilizce, Arapça, Rusça)',
        'Hasta takip ve raporlama sistemi'
      ],
      color: 'bg-gradient-primary',
      delay: 0.4
    }
  ];

  return (
    <section id="services" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            AI Destekli <span className="text-gradient">Çözümlerimiz</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            İşletmenizin ihtiyaçlarına özel tasarlanmış yapay zeka sistemlerimizle 
            rekabet avantajı elde edin ve müşteri memnuniyetini artırın.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Neden Cognia AI?</h3>
            <p className="text-gray-600">Türkiye'nin dijital dönüşüm yolculuğunda güvenilir partneriniz</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">%95</div>
              <p className="text-gray-600">Müşteri Memnuniyeti</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">7/24</div>
              <p className="text-gray-600">Kesintisiz Hizmet</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-gray-600">Aktif Kullanıcı</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">48 Saat</div>
              <p className="text-gray-600">Kurulum Süresi</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
