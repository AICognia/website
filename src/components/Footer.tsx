import React from 'react';
import { motion } from 'framer-motion';

import { BsWhatsapp, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'E-Ticaret Sistemi', href: '#services' },
      { name: 'Rezervasyon Sistemi', href: '#services' },
      { name: 'Medikal Turizm', href: '#services' },
      { name: 'Özel Çözümler', href: '#contact' }
    ],
    company: [
      { name: 'Hakkımızda', href: '#about' },
      { name: 'Ekibimiz', href: '#about' },
      { name: 'Kariyer', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    support: [
      { name: 'Dokümantasyon', href: '#' },
      { name: 'SSS', href: '#' },
      { name: 'Destek Merkezi', href: '#' },
      { name: 'İletişim', href: '#contact' }
    ]
  };

  const socialLinks = [
    { icon: <BsWhatsapp />, href: 'https://wa.me/905317739053', label: 'WhatsApp' },
    { icon: <BsInstagram />, href: 'https://instagram.com/cogniaai', label: 'Instagram' },
    { icon: <BsLinkedin />, href: 'https://linkedin.com/company/cogniaai', label: 'LinkedIn' },
    { icon: <BsTwitter />, href: 'https://twitter.com/cogniaai', label: 'Twitter' }
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold mb-4">Cognia AI</h3>
            <p className="text-gray-400 mb-6">
              Türkiye'nin önde gelen yapay zeka danışmanlık firması olarak, 
              işletmelerin dijital dönüşümünde güvenilir partneriniziz.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Hizmetler</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Kurumsal</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Destek</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-left"
            >
              <p className="text-gray-400">
                © {currentYear} Cognia AI. Tüm hakları saklıdır.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center md:text-right"
            >
              <button 
                onClick={() => console.log('Gizlilik Politikası')}
                className="text-gray-400 hover:text-primary transition-colors mr-4"
              >
                Gizlilik Politikası
              </button>
              <button 
                onClick={() => console.log('Kullanım Şartları')}
                className="text-gray-400 hover:text-primary transition-colors"
              >
                Kullanım Şartları
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
