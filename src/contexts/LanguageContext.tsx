'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'tr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.voiceAgent': 'AI Call Center',
    'nav.demoVideos': 'Demo Videos',
    'nav.services': 'Our Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.freeDemo': 'Get Free Demo',
    
    // Hero Section
    'hero.badge': 'Enterprise AI Call Center Solution',
    'hero.title1': 'AI Call Center',
    'hero.title2': '',
    'hero.title3': '',
    'hero.subtitle': 'Complete call center automation with inbound and outbound capabilities. Handle customer support, lead qualification, appointment confirmations, and more. Setup within 1 week. Reduce costs by 70%, increase conversions by 40%.',
    'hero.benefit1': 'Inbound & Outbound Calls',
    'hero.benefit2': 'Lead Qualification & Follow-ups',
    'hero.benefit3': '24/7 Full Automation',
    'hero.benefit4': 'Appointment Scheduling & Confirmations',
    'hero.trustBadge': 'Enterprise Security',
    'hero.demoButton': 'Get Free Demo',
    'hero.watchDemo': 'Watch Demo',
    'hero.aiAssistants': 'Our AI Call Center Services',
    'hero.assistant1.title': 'Inbound Call Center',
    'hero.assistant1.desc': 'Handle all incoming calls 24/7',
    'hero.assistant2.title': 'Outbound Call Center',
    'hero.assistant2.desc': 'Lead qualification & appointment confirmations',
    'hero.assistant3.title': 'Full Service Solution',
    'hero.assistant3.desc': 'Complete call center replacement',
    
    // AI Call Center
    'voice.title': 'AI Call Center',
    'voice.subtitle': 'Complete call center solution that handles both inbound and outbound calls. From customer support to lead qualification, our AI agents work 24/7 with human-like conversation abilities.',
    'voice.whatIs': 'What is AI Call Center?',
    'voice.description': 'AI Call Center is a complete replacement for traditional call centers. It handles all inbound customer calls AND makes outbound calls for lead qualification, appointment confirmations, surveys, and follow-ups. Seamlessly integrates with your CRM and business systems.',
    'voice.feature1.title': 'Inbound Calls',
    'voice.feature1.desc': 'Handle all incoming customer calls 24/7',
    'voice.feature2.title': 'Outbound Calls',
    'voice.feature2.desc': 'Make calls for lead qualification & follow-ups',
    'voice.feature3.title': 'Smart Integration',
    'voice.feature3.desc': 'Connects with your CRM and business systems',
    'voice.tryNow': 'Try Now',
    'voice.callDemo': 'Call to experience our AI call center',
    'voice.callNow': 'Call now and experience our AI call center yourself',
    'voice.requestDemo': 'Request Demo',
    'voice.fullAutomation': 'Inbound + Outbound = Complete Call Center',
    'voice.fullAutomationDesc': 'Replace your entire call center with AI. Handle customer support, make outbound calls for lead qualification, appointment confirmations, and follow-ups. Reduce costs by 70%, increase efficiency by 300%.',
    'voice.demoUS': 'US Call Center Demo',
    'voice.demoTR': 'Turkey Call Center Demo',
    
    // Contact CTA
    'contact.title': '🎯 Launch Your AI Call Center - Setup in Just 1 Week!',
    'contact.subtitle': 'Replace your entire call center with AI. Handle unlimited calls, qualify leads automatically, confirm appointments. First 10 businesses get 20% discount + 1 month free support.',
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
    'footer.description': 'Complete AI call center solution for businesses in the US and Turkey. Replace your entire call center with AI that handles both inbound and outbound calls 24/7.',
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
    'about.title': 'AI Call Center Revolution',
    'about.subtitle': 'Complete Call Center Automation for Modern Businesses',
    'about.description': 'Cognia AI provides complete AI call center solutions to businesses in the United States and Turkey. We replace traditional call centers with AI that handles both inbound and outbound calls, qualifying leads, confirming appointments, and providing 24/7 customer support.',
    'about.global': 'Global Presence',
    'about.globalDesc': 'Operating in the US and Turkey with international expertise',
    'about.innovation': 'Innovation First',
    'about.innovationDesc': 'Cutting-edge AI technology tailored for your business',
    'about.support': '24/7 Support',
    'about.supportDesc': 'Round-the-clock assistance in multiple languages',
    
    // Services
    'services.title': 'AI Call Center Services',
    'services.subtitle': 'Complete call center replacement with AI technology',
    'services.customerSupport.title': 'Inbound Call Center',
    'services.customerSupport.desc': 'Handle all incoming calls with AI agents that provide 24/7 customer support, order taking, and information services.',
    'services.reservation.title': 'Outbound Call Center',
    'services.reservation.desc': 'Automated outbound calling for lead qualification, appointment confirmations, surveys, and follow-ups.',
    'services.custom.title': 'Full Service Solution',
    'services.custom.desc': 'Complete call center replacement with both inbound and outbound capabilities, custom trained for your business.',
    'services.feature.whatsapp': 'Inbound call handling 24/7',
    'services.feature.voicePhone': 'Outbound calling campaigns',
    'services.feature.autoReply': 'Lead qualification calls',
    'services.feature.liveSupport': 'Appointment confirmation calls',
    'services.feature.multilingual': 'Multi-language support (20+ languages)',
    'services.feature.reservation': 'Customer support & order taking',
    'services.feature.phoneReservation': 'Survey and feedback calls',
    'services.feature.tableManagement': 'Follow-up and reminder calls',
    'services.feature.cancellation': 'CRM and calendar integration',
    'services.feature.reminder': 'Real-time call analytics',
    'services.feature.customAI': 'Custom AI models for industry leaders',
    'services.feature.competitive': 'Solutions that keep you ahead of competitors',
    'services.feature.integration': 'Full integration and customization',
    'services.feature.scalable': 'Scalable and flexible architecture',
    'services.feature.updates': 'Continuous updates and support',
    
    // Demo Videos
    'demo.title': 'Chatbot Demo Videos',
    'demo.subtitle': 'See our WhatsApp and Instagram chatbots in action. You already tried our Voice Agent above!',
    'demo.whatsapp.title': 'WhatsApp Customer Support Demo',
    'demo.whatsapp.desc': 'Discover our AI assistant that provides 24/7 automatic customer support via WhatsApp. Instant responses, order tracking, and customer satisfaction.',
    'demo.reservation.title': 'AI Appointment System Demo',
    'demo.reservation.desc': 'With our smart appointment system, your customers can easily book appointments 24/7. This demo was prepared for restaurant reservations but can be easily integrated into all businesses requiring appointments such as barbers, massage parlors, clinics, and beauty centers. Your AI assistant checks availability, automatically adds appointments to your calendar, and sends reminders.',
    'demo.customDemo': 'Would you like to see a custom demo for your industry?',
    'demo.requestDemo': 'Request Demo',
    'demo.whatsapp': 'WhatsApp AI Assistant',
    'demo.instagram': 'Instagram AI Assistant',
    'demo.voice': 'Voice AI Assistant',
    'demo.tryLive': 'Try Live Demo',
    
    // Services Additional
    'services.whyCognia': 'Why Choose Cognia AI?',
    'services.trustedPartner': 'Your trusted partner in digital transformation across the US and Turkey',
    'services.satisfaction': 'Customer Satisfaction',
    'services.support247': 'Continuous Service',
    'services.businesses': 'Businesses Trust Us',
    'services.setupTime': 'Setup Time',
    'services.learnMore': 'Learn More',
    
    // About Additional
    'about.founded': 'Founded',
    'about.experts': 'Expert Team',
    'about.clients': 'Happy Clients',
    'about.messages': 'Messages Processed',
    'about.vision': 'Our Vision',
    'about.visionText': 'To empower businesses globally with cutting-edge AI solutions that transform how they operate, compete, and grow in the digital age.',
    'about.mission': 'Our Mission',
    'about.missionText': 'To democratize AI technology by making it accessible, affordable, and easy to implement for businesses of all sizes across the US and Turkey.',
    
    // FAQ Additional
    'faq.title': 'Frequently Asked Questions',
    'faq.moreQuestions': 'Have more questions?',
    'faq.talkToExperts': 'Talk to Our Experts',
    'faq.q1': 'How quickly can the system be set up?',
    'faq.a1': 'We complete the setup within 1 week. After analyzing your business needs, we configure and activate your AI assistant.',
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
    'nav.voiceAgent': 'AI Çağrı Merkezi',
    'nav.demoVideos': 'Demo Videolar',
    'nav.services': 'Hizmetlerimiz',
    'nav.about': 'Hakkımızda',
    'nav.contact': 'İletişim',
    'nav.freeDemo': 'Ücretsiz Demo',
    
    // Hero Section
    'hero.badge': 'Kurumsal AI Çağrı Merkezi Çözümü',
    'hero.title1': 'AI Çağrı Merkezi',
    'hero.title2': '',
    'hero.title3': '',
    'hero.subtitle': 'Gelen ve giden arama yetenekleriyle tam donanımlı çağrı merkezi otomasyonu. Müşteri desteği, potansiyel müşteri değerlendirmesi, randevu onayları ve daha fazlası. 1 hafta içinde kurulum. Maliyetleri %70 azaltın, dönüşümleri %40 artırın.',
    'hero.benefit1': 'WhatsApp & Instagram Chatbot',
    'hero.benefit2': 'AI Sesli Asistan ile Sesli Destek',
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
    'voice.title': 'AI Sesli Asistan',
    'voice.subtitle': 'Telefon üzerinden müşterilerinize 7/24 otomatik destek sağlayan, insan gibi konuşan ve anlayan AI asistanınız',
    'voice.whatIs': 'Sesli Asistan Nedir?',
    'voice.description': 'Sesli Asistan, işletmenizin telefon sistemine entegre olan ve müşterilerinizle doğal bir şekilde konuşabilen yapay zeka destekli ses asistanıdır. Sipariş takibi, randevu alma, bilgi verme gibi işlemleri otomatik olarak gerçekleştirir.',
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
    'voice.fullAutomation': 'Chatbot + Sesli Asistan = Tam Otomasyon',
    'voice.fullAutomationDesc': 'WhatsApp ve Instagram üzerinden chatbot, telefon üzerinden sesli asistan ile tüm iletişim kanallarınızı otomatikleştirin. Müşteri memnuniyetini artırın, maliyetlerinizi düşürün.',
    'voice.demoUS': 'ABD Sesli Asistan Demo',
    'voice.demoTR': 'Türkiye Sesli Asistan Demo',
    
    // Contact CTA
    'contact.title': '🎯 Ücretsiz Demo İsteyin - Sadece 1 Hafta İçinde Kurulum!',
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
    'services.feature.voicePhone': 'AI Sesli Asistan ile telefon desteği',
    'services.feature.autoReply': 'Sık sorulan sorulara otomatik yanıt',
    'services.feature.liveSupport': 'Canlı destek yönlendirmesi',
    'services.feature.multilingual': 'Çoklu dil desteği ile global erişim',
    'services.feature.reservation': 'WhatsApp/Instagram rezervasyon chatbotu',
    'services.feature.phoneReservation': 'Sesli Asistan ile telefon rezervasyonu',
    'services.feature.tableManagement': 'Otomatik masa ve zaman yönetimi',
    'services.feature.cancellation': 'Rezervasyon iptali ve değişikliği',
    'services.feature.reminder': 'Müşteri bilgilendirme ve hatırlatma',
    'services.feature.customAI': 'Sektör liderleri için özel AI modelleri',
    'services.feature.competitive': 'Rakiplerinizden bir adım önde olmanızı sağlayan çözümler',
    'services.feature.integration': 'Tam entegrasyon ve özelleştirme',
    'services.feature.scalable': 'Ölçeklenebilir ve esnek yapı',
    'services.feature.updates': 'Sürekli güncelleme ve destek',
    
    // Demo Videos
    'demo.title': 'Chatbot Demo Videolar',
    'demo.subtitle': 'WhatsApp ve Instagram chatbot\'larımızı canlı olarak görün. Sesli Asistan\'ımızı yukarıda deneyebildiniz!',
    'demo.whatsapp.title': 'WhatsApp Müşteri Destek Demo',
    'demo.whatsapp.desc': 'WhatsApp üzerinden 7/24 otomatik müşteri desteği sağlayan AI asistanımızı keşfedin. Anlık yanıtlar, sipariş takibi ve müşteri memnuniyeti.',
    'demo.reservation.title': 'AI Randevu Sistemi Demo',
    'demo.reservation.desc': 'Akıllı randevu sistemimiz ile müşterileriniz 7/24 kolayca randevu alabilir. Bu demo restoran rezervasyonu üzerinden hazırlanmıştır ancak berber, masaj salonu, klinik, güzellik merkezi gibi randevu gerektiren tüm işletmelere kolayca entegre edilebilir. AI asistanınız müsaitlik kontrolü yapar, randevuları otomatik olarak takviminize ekler ve hatırlatmalar gönderir.',
    'demo.customDemo': 'Kendi sektörünüz için özel bir demo görmek ister misiniz?',
    'demo.requestDemo': 'Demo Talep Et',
    'demo.whatsapp': 'WhatsApp AI Asistan',
    'demo.instagram': 'Instagram AI Asistan',
    'demo.voice': 'Sesli Asistan',
    'demo.tryLive': 'Canlı Demo Deneyin',
    
    // Services Additional
    'services.whyCognia': 'Neden Cognia AI?',
    'services.trustedPartner': 'ABD ve Türkiye\'de dijital dönüşüm yolculuğunuzda güvenilir partneriniz',
    'services.satisfaction': 'Müşteri Memnuniyeti',
    'services.support247': 'Kesintisiz Hizmet',
    'services.businesses': 'İşletme Bizi Tercih Etti',
    'services.setupTime': 'Kurulum Süresi',
    'services.learnMore': 'Detaylı Bilgi',
    
    // About Additional
    'about.founded': 'Kuruluş Yılı',
    'about.experts': 'Uzman Kadro',
    'about.clients': 'Mutlu Müşteri',
    'about.messages': 'İşlenen Mesaj',
    'about.vision': 'Vizyonumuz',
    'about.visionText': 'Türkiye\'deki ve dünyadaki her işletmenin yapay zeka teknolojilerinden faydalanabileceği bir gelecek inşa etmek. KOBİ\'lerden büyük ölçekli işletmelere kadar herkesin erişebileceği, kullanımı kolay ve etkili AI çözümleri sunmak.',
    'about.mission': 'Misyonumuz',
    'about.missionText': 'İşletmelerin dijital dönüşüm süreçlerinde yanlarında olmak, yapay zeka teknolojilerini demokratikleştirerek rekabet güçlerini artırmalarına yardımcı olmak ve Türkiye\'nin teknoloji alanındaki gelişimine katkıda bulunmak.',
    
    // FAQ Additional
    'faq.title': 'Sıkça Sorulan Sorular',
    'faq.moreQuestions': 'Başka sorularınız mı var?',
    'faq.talkToExperts': 'Uzmanlarımızla Konuşun',
    'faq.q1': 'Sistem ne kadar sürede kurulur?',
    'faq.a1': 'Kurulumu 1 hafta içinde tamamlıyoruz. İşletmenizin ihtiyaçlarını analiz ettikten sonra AI asistanınızı yapılandırıp aktif hale getiriyoruz.',
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
