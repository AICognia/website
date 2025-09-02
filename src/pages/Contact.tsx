import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    interest: 'general'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Formspree endpoint for contact form
    const formspreeEndpoint = 'https://formspree.io/f/xkgbykwq';
    
    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert(language === 'tr' ? 'Mesajınız başarıyla gönderildi!' : 'Message sent successfully!');
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          interest: 'general',
          message: ''
        });
      } else {
        alert(language === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert(language === 'tr' ? 'Bir hata oluştu. Lütfen tekrar deneyin.' : 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#162B4D] to-[#0A1628] text-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {language === 'tr' ? 'İletişime Geçin' : "Let's Talk"}
            </h1>
            <p className="text-xl text-blue-100">
              {language === 'tr' ? 'Müşteri deneyiminizi dönüştürmeye hazır mısınız?' : 'Ready to transform your customer experience?'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:col-span-1"
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Get in Touch</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start gap-4">
                    <FaEnvelope className="text-[#162B4D] text-xl mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Email</p>
                      <p className="text-gray-600">admin@cogniaai.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <FaPhone className="text-[#162B4D] text-xl mt-1" />
                    <div>
                      <p className="font-semibold text-gray-900">Phone</p>
                      <p className="text-gray-600">Turkey: +90 531 773 9053</p>
                      <p className="text-gray-600">US: +1 217 693 8413</p>
                    </div>
                  </div>
                  

                </div>

                <div className="border-t pt-8">
                  <p className="font-semibold text-gray-900 mb-4">Follow Us</p>
                  <div className="flex gap-4">
                    <a href="#" className="text-gray-400 hover:text-[#162B4D] transition-colors">
                      <FaLinkedin className="text-2xl" />
                    </a>
                    <a href="https://instagram.com/cognia_ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#162B4D] transition-colors">
                      <FaInstagram className="text-2xl" />
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:col-span-2"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">{language === 'tr' ? 'Demo Talep Edin' : 'Request a Demo'}</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {language === 'tr' ? 'Adınız Soyadınız *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder={language === 'tr' ? 'Ahmet Yılmaz' : 'John Doe'}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {language === 'tr' ? 'İş E-postası *' : 'Work Email *'}
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder={language === 'tr' ? 'ahmet@sirket.com' : 'john@company.com'}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {language === 'tr' ? 'Şirket *' : 'Company *'}
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder={language === 'tr' ? 'Şirket A.Ş.' : 'Company Inc.'}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {language === 'tr' ? 'Telefon Numarası' : 'Phone Number'}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder={language === 'tr' ? '+90 (555) 123-4567' : '+1 (555) 123-4567'}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'tr' ? 'İlgi Alanım *' : "I'm interested in *"}
                      </label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="general">{language === 'tr' ? 'Genel Bilgi' : 'General Inquiry'}</option>
                        <option value="voice">{language === 'tr' ? 'Sesli Asistanlar' : 'Voice Agents'}</option>
                        <option value="chatbot">{language === 'tr' ? 'Sohbet Robotları' : 'Chatbots'}</option>
                        <option value="platform">{language === 'tr' ? 'Platform Erişimi' : 'Platform Access'}</option>
                        <option value="partnership">{language === 'tr' ? 'İş Ortaklığı' : 'Partnership'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {language === 'tr' ? 'Mesajınız' : 'Message'}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder={language === 'tr' ? 'Bize ihtiyaçlarınızdan bahsedin...' : 'Tell us about your needs...'}
                      />
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full px-8 py-4 bg-gradient-to-r from-[#162B4D] to-[#162B4D] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.02]"
                      >
                        {language === 'tr' ? 'Mesaj Gönder' : 'Send Message'}
                      </button>
                    </div>

                    <p className="text-sm text-gray-500 text-center">
                      {language === 'tr' ? 'Bu formu göndererek, Gizlilik Politikamızı ve Hizmet Koşullarımızı kabul etmiş olursunuz.' : 'By submitting this form, you agree to our Privacy Policy and Terms of Service.'}
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Response Promise */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                {language === 'tr' ? 'Size Hızlıca Dönüş Yapacağız' : 'We\'ll Get Back to You Quickly'}
              </h2>
              <p className="text-lg text-gray-600">
                {language === 'tr' 
                  ? 'Ekibimiz genellikle 24 saat içinde yanıt verir. Acil yardım için lütfen bizi doğrudan arayın.'
                  : 'Our team typically responds within 24 hours. For immediate assistance, please call us directly.'}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
