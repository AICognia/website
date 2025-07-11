import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Cognia AI sistemleri ne kadar sürede kurulur?',
      answer: 'Standart sistemlerimiz ortalama 48 saat içinde kurulup aktif hale getirilebilir. Özel entegrasyonlar gerektiren projeler için süre 1-2 hafta arasında değişebilir. Kurulum sürecinde işletmenizin normal operasyonları kesintiye uğramaz.'
    },
    {
      question: 'WhatsApp ve Instagram entegrasyonu nasıl çalışır?',
      answer: 'Meta Business API kullanarak WhatsApp Business ve Instagram hesaplarınızı sistemimize bağlıyoruz. Müşterileriniz size mesaj attığında, AI asistanımız otomatik olarak yanıt verir. Tüm konuşmalar kayıt altına alınır ve istediğiniz zaman müdahale edebilirsiniz.'
    },
    {
      question: 'AI yanlış bilgi verirse ne olur?',
      answer: 'Sistemlerimiz sürekli öğrenen yapay zeka modelleri kullanır ve %95+ doğruluk oranına sahiptir. Yine de, kritik konularda sistem otomatik olarak insan müdahalesine yönlendirir. Ayrıca tüm yanıtları önceden onaylayabilir ve özelleştirebilirsiniz.'
    },
    {
      question: 'Mevcut sistemlerimle entegrasyon sağlanabilir mi?',
      answer: 'Evet! WhatsApp Business, Instagram, Facebook Messenger gibi iletişim kanalları, CRM sistemleri, muhasebe yazılımları ve daha birçok platformla sorunsuz entegrasyon sağlıyoruz. API desteği olan her sistemle çalışabiliriz.'
    },
    {
      question: 'Veri güvenliği nasıl sağlanıyor?',
      answer: 'KVKK ve GDPR uyumlu sistemlerimiz, 256-bit SSL şifreleme kullanır. Verileriniz Türkiye\'deki güvenli sunucularda saklanır. ISO 27001 sertifikasına sahibiz ve düzenli güvenlik denetimleri yapılır.'
    },
    {
      question: 'Destek hizmeti nasıl işliyor?',
      answer: '7/24 teknik destek sağlıyoruz. WhatsApp, telefon ve e-posta üzerinden ulaşabilirsiniz. Ayrıca her müşterimize özel bir başarı yöneticisi atanır ve düzenli performans raporları paylaşılır.'
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Sıkça Sorulan <span className="text-gradient">Sorular</span>
          </h2>
          <p className="text-xl text-gray-600">
            Merak ettiğiniz her şeyi yanıtladık
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-left">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  {openIndex === index ? (
                    <FiMinus className="text-primary" size={20} />
                  ) : (
                    <FiPlus className="text-primary" size={20} />
                  )}
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Başka sorularınız mı var?</p>
          <button
            onClick={() => {
              const contactCTA = document.querySelector('.contact-cta-section');
              if (contactCTA) {
                contactCTA.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/30"
          >
            Uzmanlarımızla Konuşun
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 