import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import GlassCard from './GlassCard';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  metric?: {
    value: string;
    label: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "Practice Owner",
    company: "Mitchell Dental Group",
    content: "Cognia AI transformed our patient scheduling. We've seen a 73% reduction in missed appointments and our booking rate increased dramatically. The AI handles complex scheduling scenarios better than any human receptionist could.",
    rating: 5,
    metric: {
      value: "73%",
      label: "Fewer No-Shows"
    }
  },
  {
    id: 2,
    name: "James Rodriguez",
    role: "Managing Partner",
    company: "Rodriguez Law Firm",
    content: "The ROI was immediate. Within the first month, we recovered over $45,000 in previously lost leads. The AI never misses a call, and clients are amazed they're talking to an AI - it's that natural.",
    rating: 5,
    metric: {
      value: "$45K",
      label: "Revenue Recovered"
    }
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Operations Director",
    company: "Luxe Home Services",
    content: "Setup took less than 48 hours, and the AI was handling calls perfectly from day one. Our customer satisfaction scores are at an all-time high, and our team can focus on actual service delivery.",
    rating: 5,
    metric: {
      value: "48hr",
      label: "Setup Time"
    }
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500 text-sm" />
              ))}
            </div>
            <span className="text-green-400 text-sm font-medium">4.9/5 Average Rating</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">500+ Businesses</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how leading businesses are transforming their customer service with Cognia AI
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard variant="premium" className="h-full hover:scale-105 transition-transform duration-300 border border-cyan-500/20">
                <div className="p-6 flex flex-col h-full">
                  {/* Quote Icon */}
                  <FaQuoteLeft className="text-cyan-500/30 text-3xl mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-500" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 mb-6 flex-grow">
                    "{testimonial.content}"
                  </p>

                  {/* Metric Badge */}
                  {testimonial.metric && (
                    <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-cyan-400">
                          {testimonial.metric.value}
                        </span>
                        <span className="text-sm text-gray-400">
                          {testimonial.metric.label}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Author */}
                  <div className="border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Trust Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-wider">
            Trusted by Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {/* Placeholder for company logos */}
            <div className="text-gray-400 text-lg font-semibold">Healthcare+</div>
            <div className="text-gray-400 text-lg font-semibold">LegalTech Pro</div>
            <div className="text-gray-400 text-lg font-semibold">ServiceMaster</div>
            <div className="text-gray-400 text-lg font-semibold">AutoCare Plus</div>
            <div className="text-gray-400 text-lg font-semibold">BeautyWorks</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;