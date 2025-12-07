import React from 'react';
import conversionTracker from '../utils/conversionTracking';
import SoundVisualizer from './SoundVisualizer';

const OptimizedHero: React.FC = () => {
  return (
    <>
      <section className="relative bg-black text-white overflow-hidden">
        {/* Background - Pure black */}
        <div className="absolute inset-0 bg-black" />

        <div className="relative container mx-auto px-6 lg:px-12 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Main Headline - Very thin typography like Scale.com */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-thin leading-tight text-white">
                Next Gen AI from
                <br />
                Call to Conversion
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-gray-400 max-w-lg">
                Cognia AI delivers proven call handling, evaluations, and outcomes to businesses, enterprises, and industry leaders.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Primary CTA - White button like Scale.com */}
                <a
                  href="https://calendly.com/emrebenian-cogniaai/30min"
                  onClick={() => {
                    conversionTracker.trackDemoBooking('hero_cta');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-md transition-colors"
                >
                  Book a Demo
                  <span>→</span>
                </a>

                {/* Secondary CTA - Border button */}
                <a
                  href="tel:+16163263328"
                  onClick={() => {
                    conversionTracker.trackPhoneCall('+16163263328');
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/20 hover:bg-white/5 text-white text-sm font-medium rounded-md transition-colors"
                >
                  Call Us
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Right Side - Sound Visualizer */}
            <div className="relative hidden lg:flex items-center justify-center">
              <SoundVisualizer />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OptimizedHero;
