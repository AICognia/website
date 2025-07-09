import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Ahmet Yılmaz',
      company: 'Yılmaz Tekstil',
      image: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      text: 'Başta biraz tereddütlerim vardı açıkçası, ama Cognia AI gerçekten işimizi değiştirdi! WhatsApp\'tan gelen siparişleri kaçırmıyoruz artık, gece gündüz müşteri sorularına anında cevap veriliyor. Geçen ay satışlarımız %40 arttı, inanılmaz!',
      highlight: 'Satışlarda %40 Artış'
    },
    {
      name: 'Ayşe Demir',
      company: 'Demir Restaurant',
      image: 'https://i.pravatar.cc/150?img=5',
      rating: 5,
      text: 'Instagram DM\'lerden rezervasyon almak tam bir kabustu, sürekli mesajları kaçırıyorduk. Şimdi Cognia AI var, misafirlerimiz anında rezervasyon yapabiliyor. Hem de Türkçe konuşuyor sanki gerçek bir insan gibi! Müşterilerimiz çok memnun.',
      highlight: '7/24 Otomatik Rezervasyon'
    },
    {
      name: 'Dr. Mehmet Kaya',
      company: 'Kaya Medikal',
      image: 'https://i.pravatar.cc/150?img=33',
      rating: 5,
      text: 'Yurtdışından gelen hastalarla iletişim kurmak çok zordu, sürekli tercüman arıyorduk. Cognia AI sayesinde İngilizce, Arapça, Rusça... 5 dilde anında destek sağlıyoruz. Hasta memnuniyeti arttı, işimiz kolaylaştı. Keşke daha önce tanışsaydık!',
      highlight: '5 Dilde Destek'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-darkBlue to-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Müşterilerimiz <span className="text-secondary">Ne Diyor?</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            100+ işletme Cognia AI ile dijital dönüşümünü tamamladı. İşte başarı hikayeleri:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-lg border border-secondary/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-secondary/30"
                />
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-white/70 text-sm">{testimonial.company}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar key={i} className="text-secondary fill-current" />
                ))}
              </div>

              <p className="text-white/80 mb-4">{testimonial.text}</p>
              
              <div className="bg-secondary/20 backdrop-blur-sm px-4 py-2 rounded-lg inline-block">
                <span className="text-secondary font-semibold text-sm">{testimonial.highlight}</span>
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
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-secondary/20">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/150?img=${i + 40}`}
                  alt={`Customer ${i}`}
                  className="w-10 h-10 rounded-full border-2 border-darkBlue object-cover"
                />
              ))}
            </div>
            <span className="text-white font-medium">+96 mutlu müşteri daha</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials; 