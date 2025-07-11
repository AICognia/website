import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPhone, FiMail } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';

const ContactCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error' | null, message: string}>({
    type: null,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const response = await fetch('https://formspree.io/f/xkgbykwq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Hızlı İletişim Formu - ${formData.name}`
        })
      });
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.'
        });
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-primary/80 contact-cta-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-darkBlue/50 backdrop-blur-lg border border-secondary/30 rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12"
            >
              <h3 className="text-3xl font-bold mb-2 text-white text-glow">
                🎯 Ücretsiz Demo İsteyin - Sadece 48 Saat İçinde Kurulum!
              </h3>
              <p className="text-lg text-white/80 mb-8">
                <span className="font-bold text-secondary">Bugün başvurun</span>, yarın AI asistanınız hazır olsun! 
                İlk 10 başvuruya <span className="font-bold">%20 indirim</span> + ücretsiz 1 aylık destek.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız Soyadınız"
                    className="mt-1 block w-full rounded-lg bg-white/10 backdrop-blur-sm border border-secondary/30 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 hover:bg-white/15 hover:border-secondary/40"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-posta adresiniz"
                    className="mt-1 block w-full rounded-lg bg-white/10 backdrop-blur-sm border border-secondary/30 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all duration-300 hover:bg-white/15 hover:border-secondary/40"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon numaranız (opsiyonel)"
                  className="mt-1 block w-full rounded-lg bg-white/10 backdrop-blur-sm border border-secondary/30 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none transition-all duration-300 hover:bg-white/15 hover:border-secondary/40"
                />
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Projeniz hakkında kısaca bilgi verin..."
                  className="mt-1 block w-full rounded-lg bg-white/10 backdrop-blur-sm border border-secondary/30 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none transition-all duration-300 hover:bg-white/15 hover:border-secondary/40"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-xl hover:shadow-secondary/30"
                >
                  <span>{isSubmitting ? 'Gönderiliyor...' : 'Gönder'}</span>
                  <FiSend />
                </motion.button>
              </form>

              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-darkBlue/30 p-8 lg:p-12 flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-6 text-white">Hızlı İletişim Kanallarımız</h3>
              
              <div className="space-y-4 mb-8">
                <a
                  href="https://wa.me/905317739053"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm border border-secondary/20 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <BsWhatsapp className="text-green-500 text-2xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">WhatsApp</p>
                    <p className="text-sm text-white/70">Hızlı yanıt için</p>
                  </div>
                </a>
                
                <a
                  href="tel:+905317739053"
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm border border-secondary/20 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <FiPhone className="text-secondary text-2xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">+90 531 773 9053</p>
                    <p className="text-sm text-white/70">Direkt arama</p>
                  </div>
                </a>
                
                <a
                  href="mailto:admin@cogniaai.com"
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm border border-secondary/20 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <FiMail className="text-secondary text-2xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">admin@cogniaai.com</p>
                    <p className="text-sm text-white/70">E-posta gönder</p>
                  </div>
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-secondary/20 rounded-lg p-6">
                <h4 className="font-semibold mb-2 text-white">Çalışma Saatlerimiz</h4>
                <p className="text-white/70">Pazartesi - Cuma: 09:00 - 18:00</p>
                <p className="text-white/70">Cumartesi: 10:00 - 16:00</p>
                <p className="text-sm text-white/60 mt-2">AI asistanlarımız 7/24 hizmetinizde</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA; 