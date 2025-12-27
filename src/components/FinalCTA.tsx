import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaCheckCircle, FaSpinner, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import conversionTracker from '../utils/conversionTracking';

// Helper function to get cookie value by name
const getCookie = (name: string): string => {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift();
      return cookieValue || '';
    }
    return '';
  } catch (e) {
    console.warn('Failed to read cookie:', name, e);
    return '';
  }
};

// Generate fbc from fbclid if cookie doesn't exist
// Format: fb.1.{timestamp}.{fbclid}
const generateFbc = (fbclid: string): string => {
  if (!fbclid) return '';
  const timestamp = Date.now();
  return `fb.1.${timestamp}.${fbclid}`;
};

const FinalCTA: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Capture all attribution signals using ref (not state) for reliability
  const attributionDataRef = useRef({
    landing_url: typeof window !== 'undefined' ? window.location.href : '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    fbclid: '',
    gclid: '',
    referrer: '',
    // Meta CAPI required fields
    fbp: '', // _fbp cookie from Meta Pixel
    fbc: '', // _fbc cookie or generated from fbclid
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
  });

  // Capture attribution signals on component mount
  useEffect(() => {
    const STORAGE_KEY = 'cognia_attribution';
    const EXPIRY_MS = 86400000; // 24 hours

    // Extract current URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const currentFbclid = urlParams.get('fbclid') || '';

    // Capture Meta Pixel cookies (fbp and fbc)
    const fbpCookie = getCookie('_fbp');
    const fbcCookie = getCookie('_fbc');
    const fbcValue = fbcCookie || generateFbc(currentFbclid);

    // Capture current page signals
    const currentSignals = {
      landing_url: window.location.href,
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || '',
      fbclid: currentFbclid,
      gclid: urlParams.get('gclid') || '',
      referrer: document.referrer || '',
      fbp: fbpCookie,
      fbc: fbcValue,
      user_agent: navigator.userAgent || '',
      timestamp: Date.now(),
    };

    // Check if we have any meaningful signals from current URL
    const hasCurrentSignals = currentSignals.utm_source || currentSignals.fbclid ||
                              currentSignals.gclid || currentSignals.referrer;

    // Try to restore from localStorage if current signals are empty
    let finalSignals = { ...currentSignals };

    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        const isRecent = (Date.now() - parsed.timestamp) < EXPIRY_MS;

        if (isRecent) {
          finalSignals = {
            landing_url: currentSignals.landing_url || parsed.landing_url || '',
            utm_source: currentSignals.utm_source || parsed.utm_source || '',
            utm_medium: currentSignals.utm_medium || parsed.utm_medium || '',
            utm_campaign: currentSignals.utm_campaign || parsed.utm_campaign || '',
            utm_content: currentSignals.utm_content || parsed.utm_content || '',
            utm_term: currentSignals.utm_term || parsed.utm_term || '',
            fbclid: currentSignals.fbclid || parsed.fbclid || '',
            gclid: currentSignals.gclid || parsed.gclid || '',
            referrer: currentSignals.referrer || parsed.referrer || '',
            fbp: currentSignals.fbp,
            fbc: currentSignals.fbc || generateFbc(parsed.fbclid || ''),
            user_agent: currentSignals.user_agent,
            timestamp: currentSignals.timestamp,
          };
        }
      }
    } catch (e) {
      console.warn('Failed to read attribution from localStorage:', e);
    }

    // Save to localStorage if we have meaningful signals
    if (hasCurrentSignals || finalSignals.utm_source || finalSignals.fbclid || finalSignals.gclid) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalSignals));
      } catch (e) {
        console.warn('Failed to save attribution to localStorage:', e);
      }
    }

    // Update ref with final signals
    attributionDataRef.current = finalSignals;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.businessName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Generate tracking token for deduplication
    const trackingToken = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    try {
      const response = await fetch('https://formspree.io/f/mqarlrwl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          // Form data
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          tracking_token: trackingToken,
          event_id: trackingToken,
          // Attribution data - UTM parameters
          landing_url: attributionDataRef.current.landing_url || window.location.href,
          utm_source: attributionDataRef.current.utm_source || 'website',
          utm_medium: attributionDataRef.current.utm_medium,
          utm_campaign: attributionDataRef.current.utm_campaign,
          utm_content: attributionDataRef.current.utm_content,
          utm_term: attributionDataRef.current.utm_term,
          // Attribution data - Click IDs
          fbclid: attributionDataRef.current.fbclid,
          gclid: attributionDataRef.current.gclid,
          referrer: attributionDataRef.current.referrer,
          // Meta CAPI required fields
          fbp: attributionDataRef.current.fbp,
          fbc: attributionDataRef.current.fbc,
          user_agent: attributionDataRef.current.user_agent,
          // Meta fields
          _subject: `Demo Request from ${formData.name}${formData.businessName ? ` - ${formData.businessName}` : ''}`,
          form_type: 'demo_booking',
          source: 'final_cta',
          submitted_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      conversionTracker.trackDemoBooking('final_cta');
      conversionTracker.trackButtonClick('Lead Form Submitted', 'final_cta');

      // Fire Meta Pixel Lead event with event_id for deduplication
      if ((window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Demo Request',
          content_category: 'general',
        }, {
          eventID: trackingToken,
        });
      }

      // Build Calendly URL with prefilled data
      const calendlyBase = 'https://calendly.com/emrebenian-cogniaai/30min';
      const calendlyParams = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        a1: formData.phone,
        utm_source: 'website',
        utm_medium: 'form',
        utm_content: trackingToken,
        utm_campaign: 'final_cta',
      });

      // Wait for pixel to send before redirect
      await new Promise(resolve => setTimeout(resolve, 500));

      setIsSubmitted(true);

      // Redirect to Calendly
      setTimeout(() => {
        window.location.href = `${calendlyBase}?${calendlyParams.toString()}`;
      }, 1000);

    } catch (err) {
      console.error('Form submission error:', err);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-black py-20 lg:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/20 via-black to-black" />

      <div className="relative container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-sm text-cyan-400 font-medium">Limited spots available this month</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl lg:text-5xl font-light text-white mb-4">
            Stop Losing Calls.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Start Closing More.
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Join 50+ businesses that never miss a call.
            Get your AI receptionist live in 1 week.
          </p>

          {/* Form */}
          <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-4" data-fb-noscript="true">
                    {/* Name & Business Name Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full name *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all text-sm"
                        autoComplete="name"
                      />
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Business name *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all text-sm"
                        autoComplete="organization"
                      />
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Work email *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all text-sm"
                        autoComplete="email"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone number *"
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:bg-white/[0.07] transition-all text-sm"
                        autoComplete="tel"
                      />
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="text-red-400 text-sm text-left"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm group flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin text-xs" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Get Your AI Receptionist</span>
                          <FaArrowRight className="text-xs group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Privacy note */}
                  <p className="mt-4 text-center text-xs text-gray-600">
                    By submitting, you agree to our{' '}
                    <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-400 underline underline-offset-2 transition-colors">
                      Privacy Policy
                    </Link>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8 text-center"
                >
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheck className="text-2xl text-green-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">
                    You're all set
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 max-w-sm mx-auto">
                    Redirecting to Calendly to schedule your demo...
                  </p>
                  <a
                    href="https://calendly.com/emrebenian-cogniaai/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium rounded-xl transition-all text-sm shadow-lg shadow-cyan-500/25"
                  >
                    Open Calendly
                    <FaArrowRight className="text-xs" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500 mt-8">
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              1 Week Free Trial
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              No Credit Card Required
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              HIPAA Compliant
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
