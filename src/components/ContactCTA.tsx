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
    <section className="py-16 bg-gradient-to-br from-primary to-primary/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-8 lg:p-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Hemen <span className="text-primary">İletişime Geçin</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                AI dönüşümünüz için ilk adımı atın. Uzman ekibimiz size özel çözümler sunmak için hazır.
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-posta adresiniz"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon numaranız (opsiyonel)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Projeniz hakkında kısaca bilgi verin..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
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
              className="bg-primary/5 p-8 lg:p-12 flex flex-col justify-center"
            >
              <h3 className="text-2xl font-bold mb-6">Hızlı İletişim Kanallarımız</h3>
              
              <div className="space-y-4 mb-8">
                <a
                  href="https://wa.me/905317739053"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <BsWhatsapp className="text-green-500 text-2xl" />
                  </div>
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-sm text-gray-600">Hızlı yanıt için</p>
                  </div>
                </a>
                
                <a
                  href="tel:+905317739053"
                  className="flex items-center space-x-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FiPhone className="text-primary text-2xl" />
                  </div>
                  <div>
                    <p className="font-semibold">+90 531 773 9053</p>
                    <p className="text-sm text-gray-600">Direkt arama</p>
                  </div>
                </a>
                
                <a
                  href="mailto:admin@cogniaai.com"
                  className="flex items-center space-x-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FiMail className="text-primary text-2xl" />
                  </div>
                  <div>
                    <p className="font-semibold">admin@cogniaai.com</p>
                    <p className="text-sm text-gray-600">E-posta gönder</p>
                  </div>
                </a>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h4 className="font-semibold mb-2">Çalışma Saatlerimiz</h4>
                <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
                <p className="text-gray-600">Cumartesi: 10:00 - 16:00</p>
                <p className="text-sm text-gray-500 mt-2">AI asistanlarımız 7/24 hizmetinizde</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA; 