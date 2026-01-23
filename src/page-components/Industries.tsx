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
  FaBuilding,
  FaLaptopCode,
  FaUniversity,
  FaBolt,
  FaLandmark,
  FaHome,
  FaArrowRight,
  FaCheckCircle,
  FaPhone
} from 'react-icons/fa'
import { useLanguage } from '../contexts/LanguageContext'
import SEO from '../components/SEO'
import TechSection from '../components/TechSection'
import TechCard from '../components/TechCard'

const industries = [
  {
    name: 'Healthcare',
    nameTr: 'Sağlık',
    path: '/industries/healthcare',
    icon: FaHospital,
    description: 'Secure AI for patient scheduling and care coordination',
    descriptionTr: 'Hasta planlaması ve bakım koordinasyonu için güvenli AI',
    features: ['HIPAA Compliant', '24/7 Patient Calls', 'EHR Integration'],
    featuresTr: ['HIPAA Uyumlu', '7/24 Hasta Aramaları', 'EHR Entegrasyonu']
  },
  {
    name: 'Legal Services',
    nameTr: 'Hukuk Hizmetleri',
    path: '/industries/legal',
    icon: FaBalanceScale,
    description: 'Confidential client intake and appointment management',
    descriptionTr: 'Gizli müşteri alımı ve randevu yönetimi',
    features: ['Client Screening', 'Intake Automation', 'Secure Handling'],
    featuresTr: ['Müşteri Taraması', 'Alım Otomasyonu', 'Güvenli İşlem']
  },
  {
    name: 'Hospitality',
    nameTr: 'Konaklama',
    path: '/industries/hospitality',
    icon: FaHotel,
    description: 'AI concierge for hotels, restaurants and resorts',
    descriptionTr: 'Oteller, restoranlar ve tatil köyleri için AI concierge',
    features: ['Reservation Handling', 'Guest Services', 'Multi-language'],
    featuresTr: ['Rezervasyon İşlemleri', 'Misafir Hizmetleri', 'Çoklu Dil']
  },
  {
    name: 'Retail',
    nameTr: 'Perakende',
    path: '/industries/retail',
    icon: FaShoppingCart,
    description: 'Omnichannel customer service and order management',
    descriptionTr: 'Omnichannel müşteri hizmetleri ve sipariş yönetimi',
    features: ['Order Tracking', 'Returns Processing', 'Customer Support'],
    featuresTr: ['Sipariş Takibi', 'İade İşlemleri', 'Müşteri Desteği']
  },
  {
    name: 'Automotive',
    nameTr: 'Otomotiv',
    path: '/industries/automotive',
    icon: FaCar,
    description: 'Service scheduling and lead qualification for dealerships',
    descriptionTr: 'Bayiler için servis planlaması ve potansiyel müşteri değerlendirmesi',
    features: ['Service Booking', 'Lead Qualification', 'Follow-up Calls'],
    featuresTr: ['Servis Rezervasyonu', 'Lead Değerlendirme', 'Takip Aramaları']
  },
  {
    name: 'Enterprise',
    nameTr: 'Kurumsal',
    path: '/industries/enterprise',
    icon: FaBuilding,
    description: 'Scalable AI solutions with custom integrations',
    descriptionTr: 'Özel entegrasyonlarla ölçeklenebilir AI çözümleri',
    features: ['Custom Integration', 'Volume Handling', 'Analytics'],
    featuresTr: ['Özel Entegrasyon', 'Yüksek Hacim', 'Analitik']
  },
  {
    name: 'Technology',
    nameTr: 'Teknoloji',
    path: '/industries/technology',
    icon: FaLaptopCode,
    description: 'Technical support automation and customer onboarding',
    descriptionTr: 'Teknik destek otomasyonu ve müşteri karşılama',
    features: ['Tech Support', 'Onboarding', 'Tier-1 Automation'],
    featuresTr: ['Teknik Destek', 'Onboarding', 'Tier-1 Otomasyon']
  },
  {
    name: 'Financial Services',
    nameTr: 'Finansal Hizmetler',
    path: '/industries/financial-services',
    icon: FaUniversity,
    description: 'Secure AI for banks, insurance and fintech',
    descriptionTr: 'Bankalar, sigorta ve fintech için güvenli AI',
    features: ['Compliance Ready', 'Account Services', 'Fraud Detection'],
    featuresTr: ['Uyumluluk', 'Hesap Hizmetleri', 'Dolandırıcılık Tespiti']
  },
  {
    name: 'Energy & Utilities',
    nameTr: 'Enerji & Altyapı',
    path: '/industries/energy',
    icon: FaBolt,
    description: 'Billing inquiries, outage reporting and service requests',
    descriptionTr: 'Fatura sorguları, arıza bildirimi ve servis talepleri',
    features: ['Billing Support', 'Outage Reports', 'Service Requests'],
    featuresTr: ['Fatura Desteği', 'Arıza Raporları', 'Servis Talepleri']
  },
  {
    name: 'Public Sector',
    nameTr: 'Kamu Sektörü',
    path: '/industries/public-sector',
    icon: FaLandmark,
    description: 'ADA-compliant citizen services and information hotlines',
    descriptionTr: 'ADA uyumlu vatandaş hizmetleri ve bilgi hatları',
    features: ['ADA Compliant', 'Citizen Services', 'Multi-language'],
    featuresTr: ['ADA Uyumlu', 'Vatandaş Hizmetleri', 'Çoklu Dil']
  },
  {
    name: 'Home Services',
    nameTr: 'Ev Hizmetleri',
    path: '/industries/HomeServices',
    icon: FaHome,
    description: 'Service scheduling for contractors, plumbers and HVAC',
    descriptionTr: 'Müteahhitler, tesisatçılar ve HVAC için servis planlaması',
    features: ['Emergency Calls', 'Job Scheduling', 'Customer Follow-up'],
    featuresTr: ['Acil Aramalar', 'İş Planlaması', 'Müşteri Takibi']
  }
]

const Industries: React.FC = () => {
  const { language } = useLanguage()

  return (
    <div className="w-full">
      <SEO
        page="solutions"
        customTitle={language === 'tr' ? 'Sektörler | Her Sektör İçin AI Çözümleri | Cognia AI' : 'Industries We Serve | AI Solutions for Every Sector | Cognia AI'}
        customDescription={language === 'tr' ? 'Sektörünüze özel AI çözümlerini keşfedin.' : 'Discover AI solutions tailored for your industry.'}
      />

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
              {language === 'tr' ? 'Her Sektör İçin' : 'AI Solutions for'}
              <br />
              {language === 'tr' ? 'AI Çözümleri' : 'Every Industry'}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[rgba(55,50,47,0.70)] max-w-3xl mx-auto px-2">
              {language === 'tr'
                ? 'Her sektörün kendine özgü zorlukları var. AI çözümlerimiz özel ihtiyaçlarınıza ve uyumluluk gereksinimlerinize göre şekillendirildi.'
                : 'We understand that each industry has unique challenges. Our AI solutions are tailored to meet your specific needs and compliance requirements.'}
            </p>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <TechSection
        title={language === 'tr' ? 'Hizmet Verdiğimiz Sektörler' : 'Industries We Serve'}
        subtitle={language === 'tr'
          ? 'Sektöre özel AI çözümleri ile operasyonlarınızı dönüştürün'
          : 'Transform your operations with industry-specific AI solutions'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
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
        title={language === 'tr' ? 'Neden Cognia AI?' : 'Why Choose Cognia AI?'}
        subtitle={language === 'tr'
          ? 'Ölçülebilir sonuçlarla müşteri hizmetlerinizi dönüştürün'
          : 'Transform your customer service with measurable results'}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {[
            { value: '87%', label: language === 'tr' ? 'Dönüşüm Artışı' : 'Conversion Rate', suffix: '↑' },
            { value: '24/7', label: language === 'tr' ? 'Kesintisiz' : 'Always On', suffix: '' },
            { value: '76%', label: language === 'tr' ? 'Maliyet Azalışı' : 'Cost Reduction', suffix: '↓' },
            { value: '0.5s', label: language === 'tr' ? 'Yanıt Süresi' : 'Response Time', suffix: '' }
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
                {stat.suffix && <span className="text-base sm:text-xl lg:text-2xl ml-0.5 sm:ml-1">{stat.suffix}</span>}
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
        title={language === 'tr' ? 'Sektörünüzü Görmüyor musunuz?' : "Don't See Your Industry?"}
        subtitle={language === 'tr'
          ? 'Her türlü işletmeyle çalışıyoruz. Sizin için özel bir çözüm oluşturalım.'
          : 'We work with businesses of all types. Let us create a custom solution for you.'}
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
