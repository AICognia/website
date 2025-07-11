import React from 'react';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ServiceDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    title: string;
    description: string;
    features: string[];
    detailedDescription?: string;
    videoUrl?: string;
  } | null;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  const details: { [key: string]: string } = {
    'Müşteri Destek Sistemi': `
Müşteri Destek AI Sistemimiz, müşterilerinizle olan iletişimi 7/24 kesintisiz ve profesyonel bir şekilde yönetir.
WhatsApp ve Instagram üzerinden gelen tüm müşteri sorularını anında yanıtlar, karmaşık talepleri canlı desteğe yönlendirir.

Sistem, sık sorulan soruları otomatik olarak yanıtlar, ürün ve hizmet bilgilerini paylaşır, sipariş takibi yapar ve 
müşteri memnuniyetini sürekli ölçer. Çoklu dil desteği sayesinde global müşteri kitlenize ulaşabilirsiniz.

AI destekli analizlerle müşteri davranışlarını öğrenir, kişiselleştirilmiş yanıtlar verir ve müşteri deneyimini
sürekli iyileştirir. Tüm konuşmalar kayıt altına alınır ve detaylı raporlarla sunulur.
    `,
    'Rezervasyon Sistemi': `
Rezervasyon AI Sistemimiz, restoran ve işletmeniz için tam otomatik rezervasyon yönetimi sağlar.
Müşterileriniz WhatsApp veya Instagram üzerinden doğal dilde yazarak kolayca rezervasyon yapabilir.

Sistem, müsait masa ve saatleri otomatik kontrol eder, rezervasyon onaylarını anında gönderir ve 
hatırlatma mesajları ile no-show oranlarını minimize eder. Özel gün rezervasyonları, grup rezervasyonları 
ve VIP müşteri yönetimi özellikleriyle işletmenizin prestijini artırır.

Menü bilgileri, fiyatlar ve özel kampanyalar hakkında bilgi verir, müşteri tercihlerini kaydeder ve 
kişiselleştirilmiş öneriler sunar. Rezervasyon iptali ve değişikliği de tamamen otomatiktir.
    `
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{service.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Detaylı Bilgi</h3>
            <div className="text-gray-600 whitespace-pre-line">
              {details[service.title] || service.description}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Özellikler</h3>
            <ul className="space-y-3">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {service.videoUrl && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Demo Video</h3>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-500">Video yakında eklenecek</p>
              </div>
            </div>
          )}

          {service.title === 'Müşteri Destek Sistemi' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Güçlü Entegrasyonlar</h3>
              <p className="text-gray-600 mb-4">
                Müşteri destek sistemimiz tüm iletişim kanallarınızla sorunsuz entegre olur
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <span className="text-green-600 font-bold text-lg">WhatsApp Business</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <span className="text-pink-600 font-bold text-lg">Instagram DM</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <span className="text-blue-600 font-bold text-lg">Facebook Messenger</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <span className="text-purple-600 font-bold text-lg">Web Chat</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-primary/5 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Hemen Başlayın</h3>
            <p className="text-gray-600 mb-4">
              Bu sistemi işletmenizde kullanmaya başlamak için bizimle iletişime geçin.
            </p>
            <button
              onClick={() => {
                onClose();
                const contactCTA = document.querySelector('.contact-cta-section');
                if (contactCTA) {
                  contactCTA.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              İletişime Geç
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceDetails; 