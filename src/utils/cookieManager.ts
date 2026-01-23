import Cookies from 'js-cookie';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export class CookieManager {
  private static CONSENT_KEY = 'cognia_cookie_consent';
  private static PREFERENCES_KEY = 'cognia_cookie_preferences';
  private static CONSENT_EXPIRY_DAYS = 365;

  static hasConsent(): boolean {
    return Cookies.get(this.CONSENT_KEY) === 'true';
  }

  static setConsent(consent: boolean): void {
    if (consent) {
      Cookies.set(this.CONSENT_KEY, 'true', { 
        expires: this.CONSENT_EXPIRY_DAYS,
        sameSite: 'strict',
        secure: true
      });
    } else {
      Cookies.remove(this.CONSENT_KEY);
      this.clearAllCookies();
    }
  }

  static getPreferences(): CookiePreferences {
    const saved = Cookies.get(this.PREFERENCES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
      }
    }

    return {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
  }

  static setPreferences(preferences: CookiePreferences): void {
    preferences.necessary = true;
    
    Cookies.set(this.PREFERENCES_KEY, JSON.stringify(preferences), {
      expires: this.CONSENT_EXPIRY_DAYS,
      sameSite: 'strict',
      secure: true
    });

    this.applyPreferences(preferences);
  }

  private static applyPreferences(preferences: CookiePreferences): void {
    if (preferences.analytics) {
      this.enableGoogleAnalytics();
    } else {
      this.disableGoogleAnalytics();
    }

    if (!preferences.marketing) {
      this.removeMarketingCookies();
    }

    if (!preferences.functional) {
      this.removeFunctionalCookies();
    }
  }

  private static enableGoogleAnalytics(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }

  private static disableGoogleAnalytics(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }

    const gaCookies = document.cookie.match(/_ga[^=]*/g);
    if (gaCookies) {
      gaCookies.forEach(cookie => {
        Cookies.remove(cookie, { path: '/' });
        Cookies.remove(cookie, { path: '/', domain: '.cogniaai.com' });
      });
    }
  }

  private static removeMarketingCookies(): void {
    const marketingCookies = ['_fbp', '_fbc', 'fr', 'tr'];
    marketingCookies.forEach(cookie => {
      Cookies.remove(cookie, { path: '/' });
      Cookies.remove(cookie, { path: '/', domain: '.cogniaai.com' });
    });
  }

  private static removeFunctionalCookies(): void {
    const allCookies = Cookies.get();

    const keepCookies = [
      this.CONSENT_KEY,
      this.PREFERENCES_KEY,
      'cognia_language',
    ];

    Object.keys(allCookies).forEach(cookieName => {
      if (!keepCookies.includes(cookieName) &&
          !cookieName.startsWith('_ga') &&
          !cookieName.startsWith('_fb')) {
        Cookies.remove(cookieName);
      }
    });
  }

  static clearAllCookies(): void {
    const allCookies = Cookies.get();
    const essentialCookies = [this.CONSENT_KEY, this.PREFERENCES_KEY, 'cognia_language'];
    
    Object.keys(allCookies).forEach(cookieName => {
      if (!essentialCookies.includes(cookieName)) {
        Cookies.remove(cookieName, { path: '/' });
        Cookies.remove(cookieName, { path: '/', domain: '.cogniaai.com' });
      }
    });
  }

  static setFunctionalCookie(name: string, value: string, days: number = 30): boolean {
    const preferences = this.getPreferences();
    if (preferences.functional) {
      Cookies.set(name, value, { 
        expires: days,
        sameSite: 'strict',
        secure: true
      });
      return true;
    }
    return false;
  }

  static getCookie(name: string): string | undefined {
    return Cookies.get(name);
  }

  static initialize(): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const hasConsent = this.hasConsent();
      const preferences = this.getPreferences();
      
      (window as any).gtag('consent', 'default', {
        'analytics_storage': hasConsent && preferences.analytics ? 'granted' : 'denied',
        'ad_storage': hasConsent && preferences.marketing ? 'granted' : 'denied'
      });
    }
  }
}

export default CookieManager;
