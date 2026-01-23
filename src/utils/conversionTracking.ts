interface ConversionEvent {
  eventName: string;
  value?: number;
  currency?: string;
  custom_data?: Record<string, any>;
}

class ConversionTracker {
  private isInitialized = false;

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    this.initLinkedIn();
    this.initMeta();
    this.initGA4();
  }

  private initLinkedIn() {
    (window as any)._linkedin_data_partner_ids = (window as any)._linkedin_data_partner_ids || [];
  }

  private initMeta() {}

  private initGA4() {}

  trackPageView(pagePath: string) {
    if ((window as any).lintrk) {
      (window as any).lintrk('track');
    }

    if ((window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }

    if ((window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: pagePath
      });
    }

  }

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

    if ((window as any).lintrk) {
      (window as any).lintrk('track', {
        conversion_id: 'demo_booking'
      });
    }

    if ((window as any).fbq) {
      (window as any).fbq('track', 'Schedule', {
        value: event.value,
        currency: event.currency,
        content_name: 'Demo Booking'
      });
    }

    if ((window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXX/XXXXX',
        value: event.value,
        currency: event.currency,
        transaction_id: Date.now().toString()
      });
    }

    if ((window as any).leadsy) {
      (window as any).leadsy.track('demo_booked', event);
    }

  }

  trackPhoneCall(phoneNumber: string) {
    if ((window as any).lintrk) {
      (window as any).lintrk('track', {
        conversion_id: 'phone_call'
      });
    }

    if ((window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: 'Phone Call'
      });
    }

    if ((window as any).gtag) {
      (window as any).gtag('event', 'phone_call_click', {
        phone_number: phoneNumber
      });
    }

  }

  trackFormSubmission(formName: string, formData?: Record<string, any>) {
    const event: ConversionEvent = {
      eventName: 'Lead',
      custom_data: {
        form_name: formName,
        ...formData
      }
    };

    if ((window as any).lintrk) {
      (window as any).lintrk('track', {
        conversion_id: 'form_submit'
      });
    }

    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: formName
      });
    }

    if ((window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        form_name: formName
      });
    }

  }

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

    if ((window as any).fbq) {
      (window as any).fbq('track', 'ViewContent', {
        content_name: 'ROI Calculator',
        value: calculatedValue,
        currency: 'USD'
      });
    }

    if ((window as any).gtag) {
      (window as any).gtag('event', 'calculator_used', {
        calculated_value: calculatedValue
      });
    }

  }

  trackExitIntent(action: 'shown' | 'claimed' | 'dismissed') {
    const event: ConversionEvent = {
      eventName: 'CustomEvent',
      custom_data: {
        event_type: 'exit_intent',
        action
      }
    };

    if (action === 'claimed') {
      this.trackDemoBooking('exit_intent_popup');
    }

    if ((window as any).gtag) {
      (window as any).gtag('event', 'exit_intent_' + action);
    }

  }

  trackButtonClick(buttonName: string, location: string) {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'cta_click', {
        button_name: buttonName,
        location: location
      });
    }

  }
}

const conversionTracker = new ConversionTracker();

if (typeof window !== 'undefined') {
  conversionTracker.init();
}

export default conversionTracker;