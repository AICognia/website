// Conversion Tracking Utilities for LinkedIn, Meta, and Google Ads

interface ConversionEvent {
  eventName: string;
  value?: number;
  currency?: string;
  custom_data?: Record<string, any>;
}

class ConversionTracker {
  private isInitialized = false;

  // Initialize tracking pixels
  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // LinkedIn Insight Tag placeholder
    this.initLinkedIn();

    // Meta Pixel placeholder
    this.initMeta();

    // Google Analytics 4 placeholder
    this.initGA4();
  }

  private initLinkedIn() {
    // LinkedIn Partner ID would go here
    // Example: _linkedin_partner_id = 'YOUR_PARTNER_ID';
    (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
    // (window as any)._linkedin_data_partner_ids.push('YOUR_PARTNER_ID');
  }

  private initMeta() {
    // Meta Pixel ID would go here
    // fbq('init', 'YOUR_PIXEL_ID');
  }

  private initGA4() {
    // GA4 Measurement ID would go here
    // gtag('config', 'G-XXXXXXXXXX');
  }

  // Track page views
  trackPageView(pagePath: string) {
    // LinkedIn
    if ((window as any).lintrk) {
      (window as any).lintrk('track');
    }

    // Meta
    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: pagePath
      });
    }

    // Custom tracking
    console.log('Page view tracked:', pagePath);
  }

  // Track demo bookings
  trackDemoBooking(source: string = 'website') {
    const event: ConversionEvent = {
      eventName: 'Schedule',
      value: 2000, // $2000 average deal value
      currency: 'USD',
      custom_data: {
        source,
        timestamp: new Date().toISOString()
      }
    };

    // LinkedIn Conversion
    if ((window as any).lintrk) {
      (window as any).lintrk('track', {
        conversion_id: 'demo_booking'
      });
    }

    // Meta Conversion
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Schedule', {
        value: event.value,
        currency: event.currency,
        content_name: 'Demo Booking'
      });
    }

    // Google Analytics Conversion
    if ((window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXX/XXXXX', // Would be replaced with actual conversion ID
        value: event.value,
        currency: event.currency,
        transaction_id: Date.now().toString()
      });
    }

    // Leadsy.ai tracking (existing integration)
    if ((window as any).leadsy) {
      (window as any).leadsy.track('demo_booked', event);
    }

    console.log('Demo booking tracked:', event);
  }

  // Track phone calls
  trackPhoneCall(phoneNumber: string) {
    // LinkedIn
    if ((window as any).lintrk) {
      (window as any).lintrk('track', {
        conversion_id: 'phone_call'
      });
    }

    // Meta
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: 'Phone Call'
      });
    }

    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'phone_call_click', {
        phone_number: phoneNumber
      });
    }

    console.log('Phone call tracked:', phoneNumber);
  }

  // Track form submissions
  trackFormSubmission(formName: string, formData?: Record<string, any>) {
    const event: ConversionEvent = {
      eventName: 'Lead',
      custom_data: {
        form_name: formName,
        ...formData
      }
    };

    // LinkedIn
    if ((window as any).lintrk) {
      (window as any).lintrk('track', {
        conversion_id: 'form_submit'
      });
    }

    // Meta
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: formName
      });
    }

    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        form_name: formName
      });
    }

    console.log('Form submission tracked:', event);
  }

  // Track ROI calculator usage
  trackROICalculator(calculatedValue: number) {
    const event: ConversionEvent = {
      eventName: 'ViewContent',
      value: calculatedValue,
      currency: 'USD',
      custom_data: {
        content_type: 'roi_calculator',
        calculated_savings: calculatedValue
      }
    };

    // Meta
    if ((window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'ROI Calculator',
        value: calculatedValue,
        currency: 'USD'
      });
    }

    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'calculator_used', {
        calculated_value: calculatedValue
      });
    }

    console.log('ROI calculator tracked:', event);
  }

  // Track exit intent popup interactions
  trackExitIntent(action: 'shown' | 'claimed' | 'dismissed') {
    const event: ConversionEvent = {
      eventName: 'CustomEvent',
      custom_data: {
        event_type: 'exit_intent',
        action
      }
    };

    if (action === 'claimed') {
      // Track as conversion
      this.trackDemoBooking('exit_intent_popup');
    }

    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'exit_intent_' + action);
    }

    console.log('Exit intent tracked:', event);
  }

  // Track button clicks
  trackButtonClick(buttonName: string, location: string) {
    // Google Analytics
    if ((window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        button_name: buttonName,
        location: location
      });
    }

    console.log('Button click tracked:', { buttonName, location });
  }
}

// Create singleton instance
const conversionTracker = new ConversionTracker();

// Auto-initialize on first import
if (typeof window !== 'undefined') {
  conversionTracker.init();
}

export default conversionTracker;