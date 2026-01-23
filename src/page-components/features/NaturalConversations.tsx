import React from 'react';
import { FaRobot, FaComments, FaBrain, FaCheckCircle, FaPhone, FaUserFriends, FaMicrophone, FaHeart, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
const NaturalConversations: React.FC = () => {

  return (
    <div className="min-h-screen bg-transparent text-gray-900 relative overflow-hidden">

      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="relative py-16 sm:py-24 lg:py-32">
          <div className="w-full max-w-none px-4 sm:px-6 md:px-8 lg:px-0 lg:max-w-[1060px] mx-auto pt-24 sm:pt-20 md:pt-16 lg:pt-0">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-gray-50 border border-gray-200 rounded-full mb-4 sm:mb-6">
                <span className="text-xs text-[rgba(49,45,43,0.70)] uppercase tracking-widest">Feature</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-thin text-[#37322F] mb-4 sm:mb-6">
                Natural Conversations
                <br />
                Human-Like Interactions
              </h1>

              <p className="text-base sm:text-lg text-[rgba(49,45,43,0.70)] max-w-3xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
                Advanced conversational AI that understands context, emotion, and intent. Customers won't believe they're talking to an AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                <Link
                  href="/demo"
                  className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                </Link>
                <a
                  href="tel:+16163263328"
                  className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-gray-200 hover:bg-gray-50 text-white text-base sm:text-lg font-medium rounded-md transition-colors w-full sm:w-auto"
                >
                  <FaPhone className="text-sm" />
                  +1 616-326-3328
                </a>
              </div>
            </div>
          </div>
        </section>

        <TechSection
          badge="Capabilities"
          title="Human-Quality AI Conversations"
          subtitle="Beyond scripted responses"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: FaBrain,
                title: 'Context Awareness',
                description: 'Remembers conversation history and understands references to previous topics.'
              },
              {
                icon: FaHeart,
                title: 'Emotion Detection',
                description: 'Recognizes customer sentiment and adjusts tone appropriately for empathy.'
              },
              {
                icon: FaComments,
                title: 'Natural Flow',
                description: 'Handles interruptions, clarifications, and tangents just like humans do.'
              },
              {
                icon: FaMicrophone,
                title: 'Voice Quality',
                description: 'Lifelike voice synthesis with natural pauses, intonation, and rhythm.'
              },
              {
                icon: FaUserFriends,
                title: 'Personalization',
                description: 'Adapts communication style based on customer preferences and history.'
              },
              {
                icon: FaRobot,
                title: 'Continuous Learning',
                description: 'AI improves over time by learning from every conversation.'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto mb-3 sm:mb-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-xl sm:text-2xl text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Technology"
          title="Advanced AI Capabilities"
          subtitle="Powered by cutting-edge language models"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                title: 'Intent Recognition',
                description: 'Understands what customers want, even when they don\'t express it directly. Handles vague requests and asks clarifying questions.',
                icon: FaBrain
              },
              {
                title: 'Multi-Turn Dialogue',
                description: 'Maintains context across multiple exchanges. Can pick up conversations where they left off, even days later.',
                icon: FaComments
              },
              {
                title: 'Sentiment Analysis',
                description: 'Detects frustration, urgency, satisfaction, and other emotions. Escalates to human when needed.',
                icon: FaHeart
              },
              {
                title: 'Smart Interruption Handling',
                description: 'Gracefully handles when customers interrupt, change topics, or provide information out of order.',
                icon: FaUserFriends
              }
            ].map((item, index) => (
              <TechCard key={index}>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0">
                    <item.icon className="text-lg sm:text-xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-medium text-[#37322F] mb-2 sm:mb-3">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{item.description}</p>
                  </div>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Benefits"
          title="Why Natural Conversations Matter"
          subtitle="Better experience leads to better outcomes"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { value: '95%', label: 'Customer Satisfaction', suffix: '' },
              { value: '80%', label: 'Think It\'s Human', suffix: '' },
              { value: '3x', label: 'Engagement Rate', suffix: '' },
              { value: '60%', label: 'Faster Resolution', suffix: '↑' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#37322F] mb-1 sm:mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-lg sm:text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready for Human-Like AI?"
          subtitle="Experience the future of customer conversations"
        >
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-0">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-blue-600 hover:from-primary-light hover:to-blue-500 text-white text-base sm:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
              >
                <FaCalendarCheck />
                Schedule Demo
              </Link>
              <Link
                href="/solutions"
                className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-200 hover:bg-gray-50 text-white text-base sm:text-lg font-medium rounded-md transition-colors w-full sm:w-auto text-center"
              >
                View All Features
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />Natural Flow</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Context Aware</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Emotion Detection</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Learns Over Time</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default NaturalConversations;
