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

  /**
   * Check if user has given consent
   */
  static hasConsent(): boolean {
    return Cookies.get(this.CONSENT_KEY) === 'true';
  }

  /**
   * Set consent status
   */
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

  /**
   * Get cookie preferences
   */
  static getPreferences(): CookiePreferences {
    const saved = Cookies.get(this.PREFERENCES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall back to defaults if parsing fails
      }
    }
    
    // Default preferences
    return {
      necessary: true, // Always true
      analytics: false,
      marketing: false,
      functional: false
    };
  }

  /**
   * Set cookie preferences
   */
  static setPreferences(preferences: CookiePreferences): void {
    // Necessary cookies are always enabled
    preferences.necessary = true;
    
    Cookies.set(this.PREFERENCES_KEY, JSON.stringify(preferences), {
      expires: this.CONSENT_EXPIRY_DAYS,
      sameSite: 'strict',
      secure: true
    });

    // Apply preferences
    this.applyPreferences(preferences);
  }

  /**
   * Apply cookie preferences (enable/disable tracking scripts)
   */
  private static applyPreferences(preferences: CookiePreferences): void {
    // Google Analytics
    if (preferences.analytics) {
      // Enable Google Analytics
      this.enableGoogleAnalytics();
    } else {
      // Disable Google Analytics
      this.disableGoogleAnalytics();
    }

    // Marketing cookies
    if (!preferences.marketing) {
      // Remove marketing cookies
      this.removeMarketingCookies();
    }

    // Functional cookies
    if (!preferences.functional) {
      // Remove functional cookies except language preference
      this.removeFunctionalCookies();
    }
  }

  /**
   * Enable Google Analytics
   */
  private static enableGoogleAnalytics(): void {
    // Only enable if gtag is available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  }

  /**
   * Disable Google Analytics
   */
  private static disableGoogleAnalytics(): void {
    // Disable tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
    
    // Remove GA cookies
    const gaCookies = document.cookie.match(/_ga[^=]*/g);
    if (gaCookies) {
      gaCookies.forEach(cookie => {
        Cookies.remove(cookie, { path: '/' });
        Cookies.remove(cookie, { path: '/', domain: '.cogniaai.com' });
      });
    }
  }

  /**
   * Remove marketing cookies
   */
  private static removeMarketingCookies(): void {
    const marketingCookies = ['_fbp', '_fbc', 'fr', 'tr'];
    marketingCookies.forEach(cookie => {
      Cookies.remove(cookie, { path: '/' });
      Cookies.remove(cookie, { path: '/', domain: '.cogniaai.com' });
    });
  }

  /**
   * Remove functional cookies (except language)
   */
  private static removeFunctionalCookies(): void {
    // Get all cookies
    const allCookies = Cookies.get();
    
    // List of cookies to keep
    const keepCookies = [
      this.CONSENT_KEY,
      this.PREFERENCES_KEY,
      'cognia_language', // Keep language preference
    ];
    
    // Remove cookies not in the keep list
    Object.keys(allCookies).forEach(cookieName => {
      if (!keepCookies.includes(cookieName) && 
          !cookieName.startsWith('_ga') && // Don't touch GA cookies here
          !cookieName.startsWith('_fb')) { // Don't touch FB cookies here
        Cookies.remove(cookieName);
      }
    });
  }

  /**
   * Clear all non-essential cookies
   */
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

  /**
   * Set a functional cookie (only if consent given)
   */
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

  /**
   * Get a cookie value
   */
  static getCookie(name: string): string | undefined {
    return Cookies.get(name);
  }

  /**
   * Initialize cookie consent on page load
   */
  static initialize(): void {
    // Set default consent state for Google Analytics
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
