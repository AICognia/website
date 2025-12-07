import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
          {/* Left Side - Call Demo Preview */}
          <div className="relative">
            {/* Terminal-style container */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden">
              {/* Terminal Header */}
              <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm text-gray-400">AI Call Handler</span>
                </div>
              </div>

              {/* Call Transcript */}
              <div className="p-6 space-y-4 min-h-[400px]">
                {/* Customer message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-blue-400">C</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                      <p className="text-sm text-gray-300">
                        Hi, I'd like to schedule an appointment for next week.
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-400">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg px-4 py-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300">
                        Of course! I'd be happy to help you schedule an appointment. What day works best for you next week?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Customer response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-blue-400">C</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                      <p className="text-sm text-gray-300">
                        Tuesday afternoon would be perfect.
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-purple-400">AI</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg px-4 py-3">
                      <p className="text-sm text-gray-300">
                        Great! I have availability at 2:00 PM, 3:30 PM, and 4:45 PM on Tuesday. Which time works best for you?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="text-xs text-gray-500 italic px-3">
                  Natural conversation flow • Real-time responses • 24/7 availability
                </div>
              </div>
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
              <Link
                to="/demo"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Book a Demo
                <FaArrowRight />
              </Link>
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
