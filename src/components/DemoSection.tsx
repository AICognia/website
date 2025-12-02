import React from 'react';

const DemoSection: React.FC = () => {
  return (
    <section className="relative bg-black text-white py-32">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Top Badge & Title */}
        <div className="text-center mb-20">
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              LIVE AI
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6">
            Experience Real-Time AI Conversations
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            See how our AI receptionists handle real customer interactions with natural, human-like responses.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Side - Video Demo */}
          <div className="relative">
            {/* Video container */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
              <video
                className="w-full h-auto"
                autoPlay
                loop
                muted
                playsInline
                controls
                controlsList="nodownload"
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%23000'/%3E%3C/svg%3E"
              >
                <source src="https://qnhjatjqyogmh5x3.public.blob.vercel-storage.com/MORGAN.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Section Title */}
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-4">
                AI-Powered Call Center
              </h3>
              <p className="text-base text-gray-400 leading-relaxed">
                Our advanced AI receptionists handle customer calls with natural,
                human-like conversations. From appointment scheduling to answering questions,
                our AI delivers exceptional customer service 24/7.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-white rounded-full mt-2"></div>
                <p className="text-sm text-gray-400">
                  <span className="text-white font-medium">Natural Conversations:</span> AI that understands context and responds like a human
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-white rounded-full mt-2"></div>
                <p className="text-sm text-gray-400">
                  <span className="text-white font-medium">Instant Response:</span> 0.5s average response time, faster than any human
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-1 bg-white rounded-full mt-2"></div>
                <p className="text-sm text-gray-400">
                  <span className="text-white font-medium">Always Available:</span> Handle unlimited calls simultaneously, 24/7/365
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="https://calendly.com/emrebenian-cogniaai/30min"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-100 text-black text-sm font-medium rounded-md transition-colors"
              >
                Book a Demo
                <span>→</span>
              </a>
              <a
                href="tel:+16163263328"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-white/20 hover:bg-white/5 text-white text-sm font-medium rounded-md transition-colors"
              >
                Try Live Demo
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
