import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation files
const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.voiceAgent': 'Voice Agent',
    'nav.demoVideos': 'Demo Videos',
    'nav.services': 'Our Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.freeDemo': 'Get Free Demo',
    
    // Hero Section
    'hero.badge': '100+ Businesses Trust Us',
    'hero.title1': 'Transform Your Business',
    'hero.title2': 'with AI',
    'hero.title3': 'into the Future',
    'hero.subtitle': 'Setup within 48 hours, instant results! As an international AI consultancy operating in the US and Turkey, we automate all your communication channels with our Chatbot + Voice Agent solutions. Reduce costs by 70%, increase customer satisfaction to 95%.',
    'hero.benefit1': 'WhatsApp & Instagram Chatbot',
    'hero.benefit2': 'AI Voice Agent Support',
    'hero.benefit3': '24/7 Full Automation',
    'hero.benefit4': 'Quick Setup and Integration',
    'hero.trustBadge': 'GDPR Compliant',
    'hero.demoButton': 'Get Free Demo',
    'hero.watchDemo': 'Watch Demo',
    'hero.aiAssistants': 'Our AI Assistants',
    'hero.assistant1.title': 'Customer Support Assistant',
    'hero.assistant1.desc': '24/7 automated support',
    'hero.assistant2.title': 'Reservation Assistant',
    'hero.assistant2.desc': 'Automated reservation management',
    'hero.assistant3.title': 'Custom Solutions',
    'hero.assistant3.desc': 'AI solutions tailored for your business',
    
    // Voice Agent
    'voice.title': 'AI Voice Agent',
    'voice.subtitle': 'Your AI assistant that provides 24/7 automated support to your customers over the phone, speaking and understanding like a human',
    'voice.whatIs': 'What is Voice Agent?',
    'voice.description': 'Voice Agent is an AI-powered voice assistant that integrates with your business phone system and can naturally converse with your customers. It automatically handles operations like order tracking, appointment scheduling, and information provision.',
    'voice.feature1.title': 'Phone Support',
    'voice.feature1.desc': 'Your customers can get 24/7 support via phone',
    'voice.feature2.title': 'Multilingual',
    'voice.feature2.desc': 'Natural conversation in 20+ languages including English',
    'voice.feature3.title': 'Instant Response',
    'voice.feature3.desc': 'Fast and accurate responses like a human',
    'voice.tryNow': 'Try Now',
    'voice.callDemo': 'Call to test our voice assistant',
    'voice.callNow': 'Call now and try our AI voice assistant yourself',
    'voice.requestDemo': 'Request Demo',
    'voice.fullAutomation': 'Chatbot + Voice Agent = Full Automation',
    'voice.fullAutomationDesc': 'Automate all your communication channels with chatbot on WhatsApp and Instagram, voice agent on phone. Increase customer satisfaction, reduce your costs.',
    'voice.demoUS': 'US Voice Agent Demo',
    'voice.demoTR': 'Turkey Voice Agent Demo',
    
    // Contact CTA
    'contact.title': '🎯 Request Free Demo - Setup in Just 48 Hours!',
    'contact.subtitle': 'Apply today, have your AI assistant ready tomorrow! First 10 applications get 20% discount + 1 month free support.',
    'contact.name': 'Your Name',
    'contact.email': 'Your email address',
    'contact.phone': 'Phone number (optional)',
    'contact.message': 'Briefly describe your project...',
    'contact.send': 'Send',
    'contact.sending': 'Sending...',
    'contact.quickChannels': 'Quick Contact Channels',
    'contact.whatsapp': 'WhatsApp',
    'contact.whatsappDesc': 'For quick response',
    'contact.directCall': 'Direct call',
    'contact.emailUs': 'Send email',
    'contact.workingHours': 'Working Hours',
    'contact.weekdays': 'Monday - Friday: 09:00 - 18:00',
    'contact.saturday': 'Saturday: 10:00 - 16:00',
    'contact.aiAvailable': 'Our AI assistants are available 24/7',
    'contact.successMessage': 'Your message has been sent successfully! We will get back to you shortly.',
    'contact.errorMessage': 'An error occurred while sending the message. Please try again.',
    
    // Footer
    'footer.description': 'As an international AI consultancy company operating in the US and Turkey, we are your trusted partner in digital transformation.',
    'footer.services': 'Services',
    'footer.company': 'Company',
    'footer.support': 'Support',
    'footer.customerSupport': 'Customer Support System',
    'footer.reservationSystem': 'Reservation System',
    'footer.customSolutions': 'Custom Solutions',
    'footer.aboutUs': 'About Us',
    'footer.ourTeam': 'Our Team',
    'footer.career': 'Career',
    'footer.blog': 'Blog',
    'footer.documentation': 'Documentation',
    'footer.faq': 'FAQ',
    'footer.supportCenter': 'Support Center',
    'footer.contact': 'Contact',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    
    // About Section
    'about.title': 'Leading the AI Revolution',
    'about.subtitle': 'International AI Solutions for Global Businesses',
    'about.description': 'Cognia AI is an international technology company providing cutting-edge artificial intelligence solutions to businesses in the United States and Turkey. We empower companies to automate their operations, enhance customer experience, and scale globally.',
    'about.global': 'Global Presence',
    'about.globalDesc': 'Operating in the US and Turkey with international expertise',
    'about.innovation': 'Innovation First',
    'about.innovationDesc': 'Cutting-edge AI technology tailored for your business',
    'about.support': '24/7 Support',
    'about.supportDesc': 'Round-the-clock assistance in multiple languages',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive AI solutions for modern businesses',
    'services.customerSupport.title': 'Customer Support System',
    'services.customerSupport.desc': 'Answer your customers\' questions instantly with AI-powered support system.',
    'services.reservation.title': 'Reservation System',
    'services.reservation.desc': 'Smart reservation management for restaurants and businesses.',
    'services.custom.title': 'Custom AI Solutions',
    'services.custom.desc': 'We develop AI systems 100% compatible with your industry and business model.',
    'services.feature.whatsapp': 'WhatsApp/Instagram customer support chatbot',
    'services.feature.voicePhone': 'AI Voice Agent phone support',
    'services.feature.autoReply': 'Automatic response to FAQs',
    'services.feature.liveSupport': 'Live support routing',
    'services.feature.multilingual': 'Global reach with multi-language support',
    'services.feature.reservation': 'WhatsApp/Instagram reservation chatbot',
    'services.feature.phoneReservation': 'Phone reservation with Voice Agent',
    'services.feature.tableManagement': 'Automatic table and time management',
    'services.feature.cancellation': 'Reservation cancellation and modification',
    'services.feature.reminder': 'Customer information and reminders',
    'services.feature.customAI': 'Custom AI models for industry leaders',
    'services.feature.competitive': 'Solutions that keep you ahead of competitors',
    'services.feature.integration': 'Full integration and customization',
    'services.feature.scalable': 'Scalable and flexible architecture',
    'services.feature.updates': 'Continuous updates and support',
    
    // Demo Videos
    'demo.title': 'See AI in Action',
    'demo.subtitle': 'Watch how our AI assistants transform customer experience',
    'demo.whatsapp': 'WhatsApp AI Assistant',
    'demo.instagram': 'Instagram AI Assistant',
    'demo.voice': 'Voice AI Assistant',
    'demo.tryLive': 'Try Live Demo',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.q1': 'How quickly can the system be set up?',
    'faq.a1': 'We complete the setup within 48 hours. After analyzing your business needs, we configure and activate your AI assistant.',
    'faq.q2': 'Which languages are supported?',
    'faq.a2': 'Our system supports 20+ languages including English and Turkish. The AI assistant can communicate naturally in your customers\' preferred language.',
    'faq.q3': 'Is it compatible with existing systems?',
    'faq.a3': 'Yes, it seamlessly integrates with your CRM, ERP, and other business systems. We provide full API support.',
    'faq.q4': 'What is the pricing model?',
    'faq.a4': 'We offer customized pricing based on your business needs. Contact us for a free consultation and personalized quote.',
    
    // Company Info
    'company.international': 'Cognia AI is an international AI consultancy company with offices in the United States and Turkey, providing cutting-edge solutions to businesses globally.',
    'company.usOffice': 'US Office',
    'company.turkeyOffice': 'Turkey Office',
  },
  tr: {
    // Navbar
    'nav.home': 'Ana Sayfa',
    'nav.voiceAgent': 'Voice Agent',
    'nav.demoVideos': 'Demo Videolar',
    'nav.services': 'Hizmetlerimiz',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    'nav.freeDemo': 'Ücretsiz Demo',
    
    // Hero Section
    'hero.badge': '100+ İşletme Bizi Tercih Etti',
    'hero.title1': 'İşletmenizi',
    'hero.title2': 'Yapay Zeka',
    'hero.title3': 'ile Geleceğe Taşıyın',
    'hero.subtitle': '48 saat içinde kurulum, anında sonuç! ABD ve Türkiye\'de faaliyet gösteren uluslararası AI danışmanlık firması olarak, Chatbot + Voice Agent çözümlerimizle tüm iletişim kanallarınızı otomatikleştirin. Maliyetlerinizi %70 azaltın, müşteri memnuniyetini %95\'e çıkarın.',
    'hero.benefit1': 'WhatsApp & Instagram Chatbot',
    'hero.benefit2': 'AI Voice Agent ile Sesli Destek',
    'hero.benefit3': '7/24 Tam Otomasyon',
    'hero.benefit4': 'Hızlı Kurulum ve Entegrasyon',
    'hero.trustBadge': 'KVKK Uyumlu',
    'hero.demoButton': 'Ücretsiz Demo Al',
    'hero.watchDemo': 'Demo İzle',
    'hero.aiAssistants': 'AI Asistanlarımız',
    'hero.assistant1.title': 'Müşteri Destek Asistanı',
    'hero.assistant1.desc': '7/24 otomatik destek',
    'hero.assistant2.title': 'Rezervasyon Asistanı',
    'hero.assistant2.desc': 'Otomatik rezervasyon yönetimi',
    'hero.assistant3.title': 'Özel Çözümler',
    'hero.assistant3.desc': 'İşletmenize özel AI çözümleri',
    
    // Voice Agent
    'voice.title': 'AI Voice Agent',
    'voice.subtitle': 'Telefon üzerinden müşterilerinize 7/24 otomatik destek sağlayan, insan gibi konuşan ve anlayan AI asistanınız',
    'voice.whatIs': 'Voice Agent Nedir?',
    'voice.description': 'Voice Agent, işletmenizin telefon sistemine entegre olan ve müşterilerinizle doğal bir şekilde konuşabilen yapay zeka destekli ses asistanıdır. Sipariş takibi, randevu alma, bilgi verme gibi işlemleri otomatik olarak gerçekleştirir.',
    'voice.feature1.title': 'Telefon Desteği',
    'voice.feature1.desc': 'Müşterileriniz telefon ile 7/24 destek alabilir',
    'voice.feature2.title': 'Çoklu Dil',
    'voice.feature2.desc': 'Türkçe dahil 20+ dilde doğal konuşma',
    'voice.feature3.title': 'Anlık Yanıt',
    'voice.feature3.desc': 'İnsan gibi hızlı ve doğru yanıtlar',
    'voice.tryNow': 'Hemen Deneyin',
    'voice.callDemo': 'Sesli asistanımızı denemek için arayabilirsiniz',
    'voice.callNow': 'Hemen arayın ve AI sesli asistanımızı kendiniz deneyin',
    'voice.requestDemo': 'Demo Talep Et',
    'voice.fullAutomation': 'Chatbot + Voice Agent = Tam Otomasyon',
    'voice.fullAutomationDesc': 'WhatsApp ve Instagram üzerinden chatbot, telefon üzerinden voice agent ile tüm iletişim kanallarınızı otomatikleştirin. Müşteri memnuniyetini artırın, maliyetlerinizi düşürün.',
    'voice.demoUS': 'ABD Voice Agent Demo',
    'voice.demoTR': 'Türkiye Voice Agent Demo',
    
    // Contact CTA
    'contact.title': '🎯 Ücretsiz Demo İsteyin - Sadece 48 Saat İçinde Kurulum!',
    'contact.subtitle': 'Bugün başvurun, yarın AI asistanınız hazır olsun! İlk 10 başvuruya %20 indirim + ücretsiz 1 aylık destek.',
    'contact.name': 'Adınız Soyadınız',
    'contact.email': 'E-posta adresiniz',
    'contact.phone': 'Telefon numaranız (opsiyonel)',
    'contact.message': 'Projeniz hakkında kısaca bilgi verin...',
    'contact.send': 'Gönder',
    'contact.sending': 'Gönderiliyor...',
    'contact.quickChannels': 'Hızlı İletişim Kanallarımız',
    'contact.whatsapp': 'WhatsApp',
    'contact.whatsappDesc': 'Hızlı yanıt için',
    'contact.directCall': 'Direkt arama',
    'contact.emailUs': 'E-posta gönder',
    'contact.workingHours': 'Çalışma Saatlerimiz',
    'contact.weekdays': 'Pazartesi - Cuma: 09:00 - 18:00',
    'contact.saturday': 'Cumartesi: 10:00 - 16:00',
    'contact.aiAvailable': 'AI asistanlarımız 7/24 hizmetinizde',
    'contact.successMessage': 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
    'contact.errorMessage': 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
    
    // Footer
    'footer.description': 'ABD ve Türkiye\'de faaliyet gösteren uluslararası yapay zeka danışmanlık firması olarak, işletmelerin dijital dönüşümünde güvenilir partneriniziz.',
    'footer.services': 'Hizmetler',
    'footer.company': 'Kurumsal',
    'footer.support': 'Destek',
    'footer.customerSupport': 'Müşteri Destek Sistemi',
    'footer.reservationSystem': 'Rezervasyon Sistemi',
    'footer.customSolutions': 'Özel Çözümler',
    'footer.aboutUs': 'Hakkımızda',
    'footer.ourTeam': 'Ekibimiz',
    'footer.career': 'Kariyer',
    'footer.blog': 'Blog',
    'footer.documentation': 'Dokümantasyon',
    'footer.faq': 'SSS',
    'footer.supportCenter': 'Destek Merkezi',
    'footer.contact': 'İletişim',
    'footer.rights': 'Tüm hakları saklıdır.',
    'footer.privacy': 'Gizlilik Politikası',
    'footer.terms': 'Kullanım Şartları',
    
    // About Section
    'about.title': 'AI Devriminde Öncü',
    'about.subtitle': 'Global İşletmeler için Uluslararası AI Çözümleri',
    'about.description': 'Cognia AI, Amerika Birleşik Devletleri ve Türkiye\'de faaliyet gösteren, işletmelere en son teknoloji yapay zeka çözümleri sunan uluslararası bir teknoloji şirketidir. İşletmelerin operasyonlarını otomatikleştirmelerine, müşteri deneyimini geliştirmelerine ve global ölçekte büyümelerine yardımcı oluyoruz.',
    'about.global': 'Global Varlık',
    'about.globalDesc': 'ABD ve Türkiye\'de uluslararası uzmanlıkla faaliyet',
    'about.innovation': 'İnovasyon Öncelikli',
    'about.innovationDesc': 'İşletmenize özel son teknoloji AI çözümleri',
    'about.support': '7/24 Destek',
    'about.supportDesc': 'Çoklu dilde kesintisiz yardım',
    
    // Services
    'services.title': 'Hizmetlerimiz',
    'services.subtitle': 'Modern işletmeler için kapsamlı AI çözümleri',
    'services.customerSupport.title': 'Müşteri Destek Sistemi',
    'services.customerSupport.desc': 'AI destekli müşteri destek sistemiyle müşterilerinizin sorularını anında yanıtlayın.',
    'services.reservation.title': 'Rezervasyon Sistemi',
    'services.reservation.desc': 'Restoran ve işletmeniz için akıllı rezervasyon yönetimi.',
    'services.custom.title': 'İşletmenize Özel AI Çözümleri',
    'services.custom.desc': 'Sektörünüze ve iş modelinize %100 uyumlu, size özel tasarlanmış yapay zeka sistemleri geliştiriyoruz.',
    'services.feature.whatsapp': 'WhatsApp/Instagram müşteri destek chatbotu',
    'services.feature.voicePhone': 'AI Voice Agent ile telefon desteği',
    'services.feature.autoReply': 'Sık sorulan sorulara otomatik yanıt',
    'services.feature.liveSupport': 'Canlı destek yönlendirmesi',
    'services.feature.multilingual': 'Çoklu dil desteği ile global erişim',
    'services.feature.reservation': 'WhatsApp/Instagram rezervasyon chatbotu',
    'services.feature.phoneReservation': 'Voice Agent ile telefon rezervasyonu',
    'services.feature.tableManagement': 'Otomatik masa ve zaman yönetimi',
    'services.feature.cancellation': 'Rezervasyon iptali ve değişikliği',
    'services.feature.reminder': 'Müşteri bilgilendirme ve hatırlatma',
    'services.feature.customAI': 'Sektör liderleri için özel AI modelleri',
    'services.feature.competitive': 'Rakiplerinizden bir adım önde olmanızı sağlayan çözümler',
    'services.feature.integration': 'Tam entegrasyon ve özelleştirme',
    'services.feature.scalable': 'Ölçeklenebilir ve esnek yapı',
    'services.feature.updates': 'Sürekli güncelleme ve destek',
    
    // Demo Videos
    'demo.title': 'AI\'yı İş Başında Görün',
    'demo.subtitle': 'AI asistanlarımızın müşteri deneyimini nasıl dönüştürdüğünü izleyin',
    'demo.whatsapp': 'WhatsApp AI Asistan',
    'demo.instagram': 'Instagram AI Asistan',
    'demo.voice': 'Sesli AI Asistan',
    'demo.tryLive': 'Canlı Demo Deneyin',
    
    // FAQ
    'faq.title': 'Sıkça Sorulan Sorular',
    'faq.q1': 'Sistem ne kadar sürede kurulur?',
    'faq.a1': 'Kurulumu 48 saat içinde tamamlıyoruz. İşletmenizin ihtiyaçlarını analiz ettikten sonra AI asistanınızı yapılandırıp aktif hale getiriyoruz.',
    'faq.q2': 'Hangi diller destekleniyor?',
    'faq.a2': 'Sistemimiz Türkçe ve İngilizce dahil 20+ dili destekler. AI asistan müşterilerinizin tercih ettiği dilde doğal bir şekilde iletişim kurabilir.',
    'faq.q3': 'Mevcut sistemlerle uyumlu mu?',
    'faq.a3': 'Evet, CRM, ERP ve diğer iş sistemlerinizle sorunsuz entegre olur. Tam API desteği sağlıyoruz.',
    'faq.q4': 'Fiyatlandırma nasıl?',
    'faq.a4': 'İşletmenizin ihtiyaçlarına göre özelleştirilmiş fiyatlandırma sunuyoruz. Ücretsiz danışmanlık ve kişiselleştirilmiş teklif için bize ulaşın.',
    
    // Company Info
    'company.international': 'Cognia AI, Amerika Birleşik Devletleri ve Türkiye\'de ofisleri bulunan, global ölçekte işletmelere son teknoloji çözümler sunan uluslararası bir AI danışmanlık şirketidir.',
    'company.usOffice': 'ABD Ofisi',
    'company.turkeyOffice': 'Türkiye Ofisi',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Get saved language from localStorage or detect browser language
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('tr')) {
        setLanguage('tr');
      } else {
        setLanguage('en');
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
