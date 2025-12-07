import React from 'react';
import { FaRobot, FaComments, FaBrain, FaCheckCircle, FaPhone, FaUserFriends, FaMicrophone, FaHeart, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const NaturalConversations: React.FC = () => {

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ScrollProgress />

      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Feature</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                Natural Conversations
                <br />
                Human-Like Interactions
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Advanced conversational AI that understands context, emotion, and intent. Customers won't believe they're talking to an AI.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/demo"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                </Link>
                <a
                  href="tel:+16163263328"
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                  <div className="w-14 h-14 mx-auto mb-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
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
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <item.icon className="text-xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.description}</p>
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '95%', label: 'Customer Satisfaction', suffix: '' },
              { value: '80%', label: 'Think It\'s Human', suffix: '' },
              { value: '3x', label: 'Engagement Rate', suffix: '' },
              { value: '60%', label: 'Faster Resolution', suffix: '↑' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready for Human-Like AI?"
          subtitle="Experience the future of customer conversations"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/demo"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Schedule Demo
              </Link>
              <Link
                to="/solutions"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                View All Features
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
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
