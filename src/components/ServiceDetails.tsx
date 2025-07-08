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

  const detailedDescriptions: { [key: string]: string } = {
    'E-Ticaret Sistemi': `
      E-Ticaret AI Sistemimiz, online satış süreçlerinizi baştan sona otomatikleştirir ve optimize eder. 
      
      WhatsApp ve Instagram üzerinden gelen müşteri mesajlarına anında yanıt veren chatbot sistemimiz, 
      7/24 müşteri desteği sağlar. Müşterilerinizin ürün sorularını yanıtlar, stok durumu hakkında bilgi verir 
      ve sipariş takibi yapar.
      
      Türk muhasebe sistemleriyle tam uyumlu e-fatura entegrasyonumuz sayesinde, tüm satış işlemleriniz 
      otomatik olarak faturalandırılır. Trendyol, Hepsiburada, N11 gibi platformlardaki mağazalarınızı 
      tek bir panelden yönetebilir, envanter senkronizasyonu yapabilirsiniz.
      
      AI destekli ürün öneri sistemimiz, müşteri davranışlarını analiz ederek kişiselleştirilmiş öneriler sunar 
      ve satışlarınızı artırır.
    `,
    'Rezervasyon Sistemi': `
      Restoran ve işletmeniz için geliştirdiğimiz AI Rezervasyon Sistemi, müşterilerinizin rezervasyon 
      deneyimini tamamen değiştirir.
      
      WhatsApp ve Instagram üzerinden doğal dilde rezervasyon alabilir, müşterileriniz sadece 
      "Bu akşam 4 kişilik masa var mı?" diye sorarak rezervasyon yapabilir. Sistem otomatik olarak 
      uygun masaları kontrol eder ve anında onay verir.
      
      Menü bilgileri, özel istekler, alerji bilgileri gibi detayları da yönetebilen sistemimiz, 
      rezervasyon hatırlatmaları gönderir ve iptal/değişiklik taleplerini kolayca işler.
      
      Restoran doluluk oranlarını optimize eder, no-show oranlarını düşürür ve müşteri memnuniyetini artırır.
    `,
    'Medikal Turizm Sistemi': `
      Medikal Turizm AI Sistemimiz, yurtdışından gelen hastaların tüm süreçlerini kolaylaştırır ve 
      hasta memnuniyetini maksimize eder.
      
      Çoklu dil desteği (İngilizce, Arapça, Rusça ve daha fazlası) ile hastalarınız kendi dillerinde 
      iletişim kurabilir. AI destekli danışmanlık chatbotu, tedavi seçenekleri hakkında bilgi verir, 
      fiyatlandırma yapar ve ön değerlendirme sağlar.
      
      Operasyon planlaması, hastane rezervasyonları, konaklama organizasyonu, havaalanı transferleri 
      gibi tüm lojistik süreçler sistem üzerinden yönetilir. Hasta dosyaları, tıbbi raporlar ve 
      tedavi süreçleri dijital olarak takip edilir.
      
      Tedavi sonrası takip sistemi ile hastalarınızla iletişimi sürdürür, memnuniyet anketleri yapar 
      ve referans ağınızı genişletirsiniz.
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
              {detailedDescriptions[service.title] || service.description}
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

          {service.title === 'E-Ticaret Sistemi' && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Demo Video</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium mb-2">Giyim Sektörü Demo</h4>
                  <div className="bg-gray-100 rounded-lg p-8 text-center">
                    <div className="max-w-md mx-auto">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-600 mb-2 font-medium">Demo Video Yakında Eklenecek</p>
                      <p className="text-sm text-gray-500">
                        E-ticaret AI sistemimizin nasıl çalıştığını görmek için bizimle iletişime geçin. 
                        Size özel bir demo sunmaktan mutluluk duyarız.
                      </p>
                      <button
                        onClick={() => {
                          const contactCTA = document.querySelector('.contact-cta-section');
                          if (contactCTA) {
                            contactCTA.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="mt-4 text-primary hover:text-primary/80 font-medium text-sm"
                      >
                        Demo Talep Et →
                      </button>
                    </div>
                  </div>
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