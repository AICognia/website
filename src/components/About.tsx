import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiTrendingUp } from 'react-icons/fi';
import { BsLightbulb, BsShieldCheck } from 'react-icons/bs';

const About: React.FC = () => {
  const values = [
    {
      icon: <BsLightbulb className="text-3xl" />,
      title: 'İnovasyon',
      description: 'En güncel AI teknolojilerini Türkiye pazarına uyarlıyoruz'
    },
    {
      icon: <FiUsers className="text-3xl" />,
      title: 'Müşteri Odaklılık',
      description: 'Çözümlerimizi müşterilerimizin gerçek ihtiyaçlarına göre şekillendiriyoruz'
    },
    {
      icon: <BsShieldCheck className="text-3xl" />,
      title: 'Güvenilirlik',
      description: 'KVKK uyumlu, güvenli ve sürdürülebilir çözümler sunuyoruz'
    },
    {
      icon: <FiTrendingUp className="text-3xl" />,
      title: 'Sürekli Gelişim',
      description: 'AI modellerimizi sürekli güncelleyerek en iyi performansı sağlıyoruz'
    }
  ];

  const stats = [
    { number: '2021', label: 'Kuruluş Yılı' },
    { number: '25+', label: 'Uzman Kadro' },
    { number: '100+', label: 'Mutlu Müşteri' },
    { number: '3M+', label: 'İşlenen Mesaj' }
  ];

  return (
    <section id="about" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Türkiye'nin <span className="text-gradient">AI Öncüsü</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Cognia AI olarak, Türkiye'deki işletmelerin dijital dönüşüm yolculuğunda 
              güvenilir partneri olmayı hedefliyoruz. Yapay zeka teknolojilerini, yerel 
              pazarın dinamiklerini anlayarak ve işletmelerin gerçek ihtiyaçlarına odaklanarak 
              geliştiriyoruz.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Uzman ekibimiz, dünya standartlarındaki AI teknolojilerini Türkiye'nin 
              kendine özgü iş yapış şekillerine uyarlayarak, işletmelerin verimliliğini 
              artırmalarına ve müşteri deneyimlerini iyileştirmelerine yardımcı oluyor.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Vizyonumuz</h3>
              <p className="text-gray-600 mb-6">
                Türkiye'deki her işletmenin yapay zeka teknolojilerinden faydalanabileceği 
                bir gelecek inşa etmek. KOBİ'lerden büyük ölçekli işletmelere kadar herkesin 
                erişebileceği, kullanımı kolay ve etkili AI çözümleri sunmak.
              </p>
              <h3 className="text-2xl font-bold mb-6">Misyonumuz</h3>
              <p className="text-gray-600">
                İşletmelerin dijital dönüşüm süreçlerinde yanlarında olmak, yapay zeka 
                teknolojilerini demokratikleştirerek rekabet güçlerini artırmalarına 
                yardımcı olmak ve Türkiye'nin teknoloji alanındaki gelişimine katkıda bulunmak.
              </p>
            </div>
            <div className="absolute -top-4 -right-4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">Değerlerimiz</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {value.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-primary rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Birlikte Büyüyelim</h3>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            İşletmenizin AI dönüşümünde yanınızdayız. Uzman ekibimizle tanışın ve 
            size özel çözümlerimizi keşfedin.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-primary px-8 py-3 rounded-lg font-medium hover:bg-light transition-colors"
          >
            Ekibimizle Tanışın
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
