import React, { useState, useEffect } from 'react';
import { FaCookie, FaCog } from 'react-icons/fa';
import CookieManager, { CookiePreferences } from '../utils/cookieManager';
import { useLanguage } from '../contexts/LanguageContext';

const CookieConsentBanner: React.FC = () => {
  const { language } = useLanguage();
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(CookieManager.getPreferences());
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Initialize cookie manager on mount
    CookieManager.initialize();
    setHasConsent(CookieManager.hasConsent());
  }, []);

  const handleAcceptAll = () => {
    const allEnabled: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    CookieManager.setPreferences(allEnabled);
    CookieManager.setConsent(true);
    setHasConsent(true);
    setShowPreferences(false);
  };

  const handleAcceptSelected = () => {
    CookieManager.setPreferences(preferences);
    CookieManager.setConsent(true);
    setHasConsent(true);
    setShowPreferences(false);
  };

  const handleDeclineAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    CookieManager.setPreferences(onlyNecessary);
    CookieManager.setConsent(true); // Still set consent to true to hide banner
    setHasConsent(true);
    setShowPreferences(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't toggle necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Don't show if already consented
  if (hasConsent) return null;

  const translations = {
    en: {
      title: 'Cookie Settings',
      description: 'We use cookies to enhance your experience on our website. You can manage your preferences below.',
      acceptAll: 'Accept All',
      acceptSelected: 'Accept Selected',
      declineAll: 'Decline All',
      customize: 'Customize',
      necessary: 'Necessary Cookies',
      necessaryDesc: 'Essential for the website to function properly. Cannot be disabled.',
      analytics: 'Analytics Cookies',
      analyticsDesc: 'Help us understand how visitors interact with our website.',
      marketing: 'Marketing Cookies',
      marketingDesc: 'Used to track visitors across websites for advertising purposes.',
      functional: 'Functional Cookies',
      functionalDesc: 'Enable enhanced functionality and personalization.',
      bannerText: 'We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.',
      learnMore: 'Learn More'
    },
    tr: {
      title: 'Çerez Ayarları',
      description: 'Web sitemizde deneyiminizi geliştirmek için çerezler kullanıyoruz. Tercihlerinizi aşağıdan yönetebilirsiniz.',
      acceptAll: 'Tümünü Kabul Et',
      acceptSelected: 'Seçilenleri Kabul Et',
      declineAll: 'Tümünü Reddet',
      customize: 'Özelleştir',
      necessary: 'Zorunlu Çerezler',
      necessaryDesc: 'Web sitesinin düzgün çalışması için gereklidir. Devre dışı bırakılamaz.',
      analytics: 'Analitik Çerezleri',
      analyticsDesc: 'Ziyaretçilerin web sitemizle nasıl etkileşime girdiğini anlamamıza yardımcı olur.',
      marketing: 'Pazarlama Çerezleri',
      marketingDesc: 'Reklam amaçlı olarak ziyaretçileri web siteleri arasında takip etmek için kullanılır.',
      functional: 'İşlevsel Çerezler',
      functionalDesc: 'Gelişmiş işlevsellik ve kişiselleştirmeyi etkinleştirir.',
      bannerText: 'Deneyiminizi iyileştirmek için çerezler kullanıyoruz. Bu siteyi ziyaret etmeye devam ederek çerez kullanımımızı kabul etmiş olursunuz.',
      learnMore: 'Daha Fazla Bilgi'
    }
  };

  const t = translations[language as keyof typeof translations];

  return (
    <>
      {/* Main Cookie Banner */}
      {!showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 animate-slide-up">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <FaCookie className="text-2xl text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-700">
                    {t.bannerText}{' '}
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="text-blue-600 hover:text-blue-700 underline font-medium"
                    >
                      {t.learnMore}
                    </button>
                  </p>
                </div>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <FaCog />
                  {t.customize}
                </button>
                <button
                  onClick={handleDeclineAll}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t.declineAll}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm bg-[#162B4D] text-white rounded-lg hover:bg-[#1a3661] transition-colors"
                >
                  {t.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <FaCookie className="text-amber-500" />
                {t.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{t.description}</p>
            </div>

            <div className="p-6 overflow-y-auto max-h-[50vh]">
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{t.necessary}</h3>
                      <p className="text-sm text-gray-600 mt-1">{t.necessaryDesc}</p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled
                        className="w-5 h-5 text-blue-600 rounded cursor-not-allowed opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{t.analytics}</h3>
                      <p className="text-sm text-gray-600 mt-1">{t.analyticsDesc}</p>
                    </div>
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={() => togglePreference('analytics')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{t.marketing}</h3>
                      <p className="text-sm text-gray-600 mt-1">{t.marketingDesc}</p>
                    </div>
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={() => togglePreference('marketing')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{t.functional}</h3>
                      <p className="text-sm text-gray-600 mt-1">{t.functionalDesc}</p>
                    </div>
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={() => togglePreference('functional')}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleDeclineAll}
                  className="px-6 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  {t.declineAll}
                </button>
                <button
                  onClick={handleAcceptSelected}
                  className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.acceptSelected}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 text-sm bg-[#162B4D] text-white rounded-lg hover:bg-[#1a3661] transition-colors"
                >
                  {t.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentBanner;
