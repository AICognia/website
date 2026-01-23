'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaServer, FaBolt, FaNetworkWired, FaPuzzlePiece, FaCheckCircle } from 'react-icons/fa';
import BentoCard from './BentoCard';

const DeveloperPlatformSection: React.FC = () => {
  return (
    <section className="section-padding bg-slate-50/30 relative overflow-hidden">
      <div className="container-responsive">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 mb-6">
            <span className="text-[11px] uppercase tracking-wider font-semibold font-serif text-primary">
              Developer Platform
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-normal text-gray-900 mb-6 tracking-tight">
            Built for Scale, Ready for Anything
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed font-serif">
            Our infrastructure handles the complexity of voice AI—latency, telephony, and scale—so you can focus on building the best experience.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-6">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: API First */}
            <BentoCard className="md:col-span-2 p-10 relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-8 h-full items-center">
                <div className="flex-1 relative z-10">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaCode className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-normal text-slate-900 mb-3">API-First Architecture</h3>
                  <p className="text-slate-500 font-serif text-[15px] leading-relaxed mb-8">
                    Full programmatic control over calls, agents, and workflows. Webhooks for real-time state changes and data syncing.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['REST API', 'Webhooks', 'Real-time', 'SDK'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Snippet Visual */}
                <div className="hidden md:block w-full max-w-[320px] relative">
                  <div className="bg-slate-900 rounded-xl p-5 font-mono text-xs text-slate-300 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-500 border border-slate-800">
                    <div className="flex gap-1.5 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <div>
                      <span className="text-purple-400">const</span> <span className="text-blue-400">call</span> = <span className="text-purple-400">await</span> client.calls.<span className="text-yellow-300">create</span>({'{'}
                      <br />&nbsp;&nbsp;agent_id: <span className="text-green-400">'agt_123'</span>,
                      <br />&nbsp;&nbsp;to: <span className="text-green-400">'+15550123'</span>,
                      <br />&nbsp;&nbsp;metadata: {'{'} user_id: <span className="text-green-400">'99'</span> {'}'}
                      <br />{'}'});
                    </div>
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Card 2: Low Latency */}
            <BentoCard className="p-10 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FaBolt className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-serif font-normal text-slate-900 mb-3">Sub-500ms Latency</h3>
                <p className="text-slate-500 font-serif text-[15px] leading-relaxed mb-6">
                  Optimized edge network ensuring near-instant voice interaction.
                </p>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full w-fit">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Real-time</span>
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 3: Integrations */}
            <BentoCard className="p-10">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                <FaPuzzlePiece className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-serif font-normal text-slate-900 mb-3">One-Click Integrations</h3>
              <p className="text-slate-500 font-serif text-[15px] leading-relaxed mb-6">
                Connect with Salesforce, HubSpot, Zapier, and Cal.com instantly.
              </p>
              <div className="space-y-3">
                {['Salesforce', 'HubSpot', 'Zapier', 'Cal.com'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <FaCheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Card 4: Telephony */}
            <BentoCard className="md:col-span-2 p-10 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaServer className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif font-normal text-slate-900 mb-3">Enterprise Telephony</h3>
                  <p className="text-slate-500 font-serif text-[15px] leading-relaxed mb-8">
                    We handle the carrier logic. Provision numbers, manage SIP trunking, and ensure high deliverability rates globally.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Global Coverage', 'SIP Trunking', 'Number Provisioning'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1 flex justify-center items-center w-full">
                  <div className="flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <span className="font-bold text-xl text-slate-900">US</span>
                    </div>
                    <FaNetworkWired className="text-slate-300 w-6 h-6" />
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <span className="font-bold text-xl text-slate-900">EU</span>
                    </div>
                    <FaNetworkWired className="text-slate-300 w-6 h-6" />
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <span className="font-bold text-xl text-slate-900">ASIA</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/5 to-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
            </BentoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperPlatformSection;
