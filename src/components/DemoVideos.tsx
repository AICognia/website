import React from 'react';
import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import { GiDiamondRing, GiClothes } from 'react-icons/gi';

const DemoVideos: React.FC = () => {
  const demos = [
    {
      title: 'Kuyumcu Bot Demo',
      description: 'Kuyumculuk sektörü için özel geliştirilmiş AI asistanımızı keşfedin. Ürün önerileri, stok kontrolü ve müşteri hizmetleri.',
      icon: <GiDiamondRing className="text-3xl" />,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder - replace with actual video
      color: 'from-yellow-500 to-amber-600'
    },
    {
      title: 'Giyim Bot Demo',
      description: 'Giyim sektörü için tasarlanmış AI çözümümüz. Beden önerileri, trend analizi ve kişiselleştirilmiş alışveriş deneyimi.',
      icon: <GiClothes className="text-3xl" />,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder - replace with actual video
      color: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-lightBlue to-darkBlue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Sektörel <span className="text-secondary">Demo Videolar</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Farklı sektörler için özelleştirilmiş AI çözümlerimizi canlı olarak görün
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {demos.map((demo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg border border-secondary/20 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${demo.color}`}></div>
              
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${demo.color} rounded-full flex items-center justify-center text-white mr-4`}>
                    {demo.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{demo.title}</h3>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6">{demo.description}</p>
                
                <div className="relative aspect-video bg-darkBlue/50 rounded-lg overflow-hidden group cursor-pointer">
                  <iframe
                    src={demo.videoUrl}
                    title={demo.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <FiPlay className="text-3xl text-white ml-1" />
                    </div>
                  </div>
                </div>
              </div>
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
          <p className="text-white/80 mb-6">
            Kendi sektörünüz için özel bir demo görmek ister misiniz?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactCTA = document.querySelector('.contact-cta-section');
              if (contactCTA) {
                contactCTA.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-gradient-primary text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-secondary/30"
          >
            Demo Talep Et
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default DemoVideos; 