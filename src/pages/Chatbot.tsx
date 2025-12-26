import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaPaperPlane, FaSpinner, FaRobot, FaUser, FaTimes, FaGlobe } from 'react-icons/fa';
import DynamicTechBackground from '../components/DynamicTechBackground';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Message Bubble Component
const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start gap-2 lg:gap-3 max-w-[85%] lg:max-w-[70%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-white/10 border border-white/20'
            : 'bg-cyan-400/10 border border-cyan-400/30'
        }`}>
          {isUser ? (
            <FaUser className="text-white text-[10px] lg:text-xs" />
          ) : (
            <FaRobot className="text-cyan-400 text-[10px] lg:text-xs" />
          )}
        </div>

        {/* Message Content */}
        <div className={`px-3 py-2 lg:px-4 lg:py-3 rounded-2xl ${
          isUser
            ? 'bg-white/10 border border-white/10'
            : 'bg-black/50 border border-cyan-400/20'
        }`}>
          <p className="text-sm lg:text-base text-white leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Typing Indicator Component
const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex justify-start"
  >
    <div className="flex items-start gap-2 lg:gap-3">
      <div className="w-7 h-7 lg:w-8 lg:h-8 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center">
        <FaRobot className="text-cyan-400 text-[10px] lg:text-xs" />
      </div>
      <div className="px-3 py-2 lg:px-4 lg:py-3 bg-black/50 border border-cyan-400/20 rounded-2xl">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-cyan-400 rounded-full"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// Error Display Component
const ErrorDisplay: React.FC<{ error: string; onDismiss: () => void }> = ({ error, onDismiss }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    className="flex justify-center"
  >
    <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-xl">
      <p className="text-xs lg:text-sm text-red-400">{error}</p>
      <button
        onClick={onDismiss}
        className="text-red-400 hover:text-red-300 transition-colors"
      >
        <FaTimes className="text-xs" />
      </button>
    </div>
  </motion.div>
);

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session ID
  useEffect(() => {
    if (!sessionStorage.getItem('chatSessionId')) {
      sessionStorage.setItem('chatSessionId', crypto.randomUUID());
    }
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://cogniaai.app.n8n.cloud/webhook/5e6880d6-f561-4e50-937c-21187b924220', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.trim(),
          sessionId: sessionStorage.getItem('chatSessionId'),
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Handle various response formats from n8n
      let aiResponse: string;
      if (typeof data === 'string') {
        aiResponse = data;
      } else {
        aiResponse = data.output || data.message || data.response || data.text || data.reply || JSON.stringify(data);
      }

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Webhook error:', err);
      setError('Connection failed. Please try again.');
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      <Helmet>
        <title>AI Chat Assistant | Cognia AI</title>
        <meta name="description" content="Chat with our AI assistant to learn more about Cognia AI services." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <div className="h-screen h-[100dvh] w-screen max-w-full relative bg-black text-white overflow-x-hidden overflow-y-hidden">
        {/* Dynamic Tech Background */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          <header className="flex-shrink-0 py-3 lg:py-6 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="w-full px-4">
              <div className="flex items-center justify-center gap-2 lg:gap-3">
                <img
                  src="/cognia-c-icon.png"
                  alt="Cognia"
                  className="h-10 lg:h-16 w-auto"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(168, 139, 250, 0.9)) drop-shadow(0 0 20px rgba(96, 165, 250, 0.7))'
                  }}
                />
                <span
                  className="text-2xl lg:text-4xl font-medium text-white tracking-tight"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textShadow: '0 0 15px rgba(168, 139, 250, 0.6), 0 0 30px rgba(96, 165, 250, 0.4)'
                  }}
                >
                  Cognia
                </span>
              </div>
            </div>
          </header>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto py-4 lg:py-6">
            <div className="w-full px-4 lg:max-w-3xl lg:mx-auto h-full">
              {/* Welcome Message (when empty) */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center mb-4 lg:mb-6 shadow-lg shadow-cyan-400/20">
                    <FaRobot className="text-cyan-400 text-2xl lg:text-3xl" />
                  </div>
                  <h2 className="text-xl lg:text-2xl font-thin text-white mb-2">
                    How can I <span className="text-cyan-400">help</span>?
                  </h2>
                  <p className="text-gray-500 text-xs lg:text-sm flex items-center gap-1.5">
                    <FaGlobe className="text-cyan-400/60" />
                    <span>30+ languages supported</span>
                  </p>
                </motion.div>
              )}

              {/* Message List */}
              {messages.length > 0 && (
                <div className="space-y-3 lg:space-y-4">
                  <AnimatePresence mode="popLayout">
                    {messages.map((message) => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                  </AnimatePresence>

                  {/* Loading Indicator */}
                  <AnimatePresence>
                    {isLoading && <TypingIndicator />}
                  </AnimatePresence>

                  {/* Error Display */}
                  <AnimatePresence>
                    {error && <ErrorDisplay error={error} onDismiss={() => setError(null)} />}
                  </AnimatePresence>

                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0 border-t border-white/10 bg-black/80 backdrop-blur-xl safe-area-bottom">
            <div className="w-full px-4 lg:max-w-3xl lg:mx-auto py-3 lg:py-4">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Message in any language..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 lg:py-4 pr-12 bg-white/5 border border-white/10 rounded-xl lg:rounded-2xl text-sm lg:text-base text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-all disabled:opacity-50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 lg:w-10 lg:h-10 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg lg:rounded-xl flex items-center justify-center transition-colors"
                >
                  {isLoading ? (
                    <FaSpinner className="text-white text-sm animate-spin" />
                  ) : (
                    <FaPaperPlane className="text-white text-xs lg:text-sm" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
