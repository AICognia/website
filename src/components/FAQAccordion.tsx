import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'How long does setup take?',
    answer: 'We set up your system within 1 week. After analyzing your needs, we configure and activate your AI assistant. Most businesses are live within 5-7 days.',
  },
  {
    question: 'Does it integrate with existing systems?',
    answer: 'Yes, it integrates seamlessly with your CRM, ERP, calendar, and other business systems. We support Salesforce, HubSpot, Google Calendar, Calendly, and 50+ other tools via API.',
  },
  {
    question: 'What about data security?',
    answer: 'We are HIPAA compliant. All data is encrypted in transit and at rest. We conduct regular security audits and never share your data with third parties.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a 1 week free trial with no credit card required. You can test the AI with real calls and see the results before committing.',
  },
];

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative bg-black py-20 lg:py-28">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full">
            FAQ
          </span>
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-4">
            Common Questions
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-5 bg-white/[0.02] border rounded-xl transition-all duration-300 text-left ${
                  openIndex === index
                    ? 'border-cyan-500/30 bg-cyan-500/[0.03]'
                    : 'border-white/5 hover:border-white/15 hover:bg-white/[0.03]'
                }`}
              >
                <span className="text-white font-medium pr-4">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex-shrink-0 transition-colors ${openIndex === index ? 'text-cyan-400' : 'text-gray-400'}`}
                >
                  <FaChevronDown className="text-sm" />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 text-sm text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA after FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
          >
            Talk to Us
            <FaArrowRight className="text-sm" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQAccordion;
