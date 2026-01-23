'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaHospital,
  FaBalanceScale,
  FaHotel,
  FaShoppingCart,
  FaCar,
  FaArrowRight,
  FaCheckCircle,
  FaPhone
} from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import TechSection from '../components/TechSection'
import TechCard from '../components/TechCard'

const industries = [
  {
    name: 'Healthcare',
    nameTr: 'Sağlık',
    path: '/industries/healthcare',
    icon: FaHospital,
    description: 'AI-powered patient scheduling, appointment reminders, and care coordination',
    descriptionTr: 'AI destekli hasta planlaması, randevu hatırlatmaları ve bakım koordinasyonu',
    features: ['HIPAA Compliant', '24/7 Patient Calls', 'EHR Integration'],
    featuresTr: ['HIPAA Uyumlu', '7/24 Hasta Aramaları', 'EHR Entegrasyonu']
  },
  {
    name: 'Legal Services',
    nameTr: 'Hukuk Hizmetleri',
    path: '/industries/legal',
    icon: FaBalanceScale,
    description: 'Confidential client intake, appointment scheduling, and case inquiries',
    descriptionTr: 'Gizli müşteri alımı, randevu planlaması ve dava sorguları',
    features: ['Client Screening', 'Intake Automation', 'Confidential Handling'],
    featuresTr: ['Müşteri Taraması', 'Alım Otomasyonu', 'Gizli İşlem']
  },
  {
    name: 'Hospitality',
    nameTr: 'Konaklama',
    path: '/industries/hospitality',
    icon: FaHotel,
    description: 'AI concierge for reservations, guest services, and inquiries',
    descriptionTr: 'Rezervasyonlar, misafir hizmetleri ve sorular için AI concierge',
    features: ['Reservation Handling', 'Guest Services', '45+ Languages'],
    featuresTr: ['Rezervasyon İşlemleri', 'Misafir Hizmetleri', '45+ Dil']
  },
  {
    name: 'Retail',
    nameTr: 'Perakende',
    path: '/industries/retail',
    icon: FaShoppingCart,
    description: 'Customer service, order tracking, and support automation',
    descriptionTr: 'Müşteri hizmetleri, sipariş takibi ve destek otomasyonu',
    features: ['Order Tracking', 'Returns Processing', 'Customer Support'],
    featuresTr: ['Sipariş Takibi', 'İade İşlemleri', 'Müşteri Desteği']
  },
  {
    name: 'Automotive',
    nameTr: 'Otomotiv',
    path: '/industries/automotive',
    icon: FaCar,
    description: 'Service scheduling, lead qualification, and follow-up calls',
    descriptionTr: 'Servis planlaması, potansiyel müşteri değerlendirmesi ve takip aramaları',
    features: ['Service Booking', 'Lead Qualification', 'Follow-up Calls'],
    featuresTr: ['Servis Rezervasyonu', 'Lead Değerlendirme', 'Takip Aramaları']
  }
]

const Industries: React.FC = () => {
  const { language } = useLanguage()

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 lg:pb-32">
        <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] mx-auto">
          <div className="max-w-4xl mx-auto text-center py-10 sm:py-16 lg:py-20 border-b border-[rgba(55,50,47,0.12)] shadow-[0_1px_0px_white]">
            <div className="inline-block px-2.5 sm:px-3 py-1 bg-[rgba(55,50,47,0.04)] border border-[rgba(55,50,47,0.12)] rounded-full mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs text-[rgba(55,50,47,0.70)] uppercase tracking-widest">
                {language === 'tr' ? 'Sektörler' : 'Industries'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-normal text-[#37322F] mb-4 sm:mb-6">
              {language === 'tr' ? 'Hizmet Verdiğimiz' : 'Industries'}
              <br />
              {language === 'tr' ? 'Sektörler' : 'We Serve'}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[rgba(55,50,47,0.70)] max-w-3xl mx-auto px-2">
              {language === 'tr'
                ? 'Sektörünüze özel AI çözümleri ile müşteri deneyiminizi dönüştürün. Her sektörün kendine özgü ihtiyaçlarını anlıyoruz.'
                : 'Transform your customer experience with industry-specific AI solutions. We understand the unique needs of each sector.'}
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <TechSection
        title={language === 'tr' ? 'Sektöre Özel Çözümler' : 'Industry Solutions'}
        subtitle={language === 'tr'
          ? 'AI destekli çözümlerle operasyonlarınızı optimize edin'
          : 'Optimize your operations with AI-powered solutions'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={industry.path}>
                  <TechCard className="h-full group">
                    <div className="flex flex-col h-full">
                      {/* Icon */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 mb-3 sm:mb-4 bg-[rgba(55,50,47,0.04)] border border-[rgba(55,50,47,0.12)] rounded-md flex items-center justify-center group-hover:bg-[rgba(55,50,47,0.08)] transition-colors">
                        <Icon className="text-lg sm:text-xl lg:text-2xl text-[rgba(55,50,47,0.80)]" />
                      </div>

                      {/* Title & Description */}
                      <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                        <h3 className="text-base sm:text-lg lg:text-xl font-serif font-normal text-[#37322F]">
                          {language === 'tr' ? industry.nameTr : industry.name}
                        </h3>
                        <FaArrowRight className="w-3 h-3 text-[rgba(55,50,47,0.40)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                      <p className="text-xs sm:text-sm text-[rgba(55,50,47,0.70)] mb-3 sm:mb-4">
                        {language === 'tr' ? industry.descriptionTr : industry.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-1.5 sm:space-y-2 flex-grow">
                        {(language === 'tr' ? industry.featuresTr : industry.features).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 sm:gap-2 text-[rgba(55,50,47,0.80)] text-xs sm:text-sm">
                            <FaCheckCircle className="flex-shrink-0 text-[rgba(55,50,47,0.60)] text-[10px] sm:text-xs" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TechCard>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </TechSection>

      {/* Stats Section */}
      <TechSection
        title={language === 'tr' ? 'Ölçülebilir Sonuçlar' : 'Measurable Results'}
        subtitle={language === 'tr'
          ? 'Müşterilerimizin elde ettiği sonuçlar'
          : 'Results our clients achieve'}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto">
          {[
            { value: '87%', label: language === 'tr' ? 'Dönüşüm Artışı' : 'Higher Conversion', suffix: '' },
            { value: '24/7', label: language === 'tr' ? 'Kesintisiz Hizmet' : 'Always Available', suffix: '' },
            { value: '76%', label: language === 'tr' ? 'Maliyet Azalışı' : 'Cost Reduction', suffix: '' },
            { value: '<1s', label: language === 'tr' ? 'Yanıt Süresi' : 'Response Time', suffix: '' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#37322F] mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs lg:text-sm text-[rgba(55,50,47,0.70)]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </TechSection>

      {/* CTA Section */}
      <TechSection
        title={language === 'tr' ? 'Başlamaya Hazır mısınız?' : 'Ready to Get Started?'}
        subtitle={language === 'tr'
          ? 'Sektörünüze özel AI çözümünüzü birlikte oluşturalım'
          : 'Let us create a custom AI solution for your industry'}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/demo"
              className="btn-primary w-full sm:w-auto"
            >
              <span>{language === 'tr' ? 'Ücretsiz Demo' : 'Schedule Free Demo'}</span>
            </Link>

            <a
              href="tel:+16163263328"
              className="flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-[rgba(55,50,47,0.12)] hover:bg-[rgba(55,50,47,0.04)] text-[rgba(55,50,47,0.80)] text-base sm:text-lg font-medium rounded-md transition-colors"
            >
              <FaPhone className="text-xs sm:text-sm" />
              +1 616-326-3328
            </a>
          </div>
        </div>
      </TechSection>
    </div>
  )
}

export default Industries
