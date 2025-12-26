import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FaPaperPlane, FaSpinner, FaRobot, FaUser, FaTimes } from 'react-icons/fa';
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
      <div className={`flex items-start gap-3 max-w-[85%] lg:max-w-[70%] ${isUser ? 'flex-row-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-white/10 border border-white/20'
            : 'bg-cyan-400/10 border border-cyan-400/30'
        }`}>
          {isUser ? (
            <FaUser className="text-white text-xs" />
          ) : (
            <FaRobot className="text-cyan-400 text-xs" />
          )}
        </div>

        {/* Message Content */}
        <div className={`px-4 py-3 rounded-2xl ${
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
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center">
        <FaRobot className="text-cyan-400 text-xs" />
      </div>
      <div className="px-4 py-3 bg-black/50 border border-cyan-400/20 rounded-2xl">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{ y: [0, -4, 0] }}
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
    <div className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl">
      <p className="text-sm text-red-400">{error}</p>
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
      setError('Unable to connect. Please try again.');
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
      </Helmet>

      <div className="min-h-screen relative bg-black text-white">
        {/* Dynamic Tech Background */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="py-6 lg:py-8 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center shadow-lg shadow-cyan-400/20">
                  <FaRobot className="text-cyan-400 text-lg" />
                </div>
                <div className="text-center">
                  <h1 className="text-xl lg:text-2xl font-medium text-white">Cognia AI Assistant</h1>
                  <p className="text-xs lg:text-sm text-gray-400">Ask me anything</p>
                </div>
              </div>
            </div>
          </header>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto py-6 lg:py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-3xl">
              {/* Welcome Message (when empty) */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12 lg:py-20"
                >
                  <div className="w-20 h-20 bg-cyan-400/10 border border-cyan-400/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-cyan-400/20">
                    <FaRobot className="text-cyan-400 text-3xl" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-thin text-white mb-3">
                    How can I <span className="text-cyan-400">help you</span> today?
                  </h2>
                  <p className="text-gray-400 text-sm lg:text-base max-w-md mx-auto">
                    I'm here to answer your questions about Cognia AI's voice agent and receptionist solutions.
                  </p>
                </motion.div>
              )}

              {/* Message List */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </AnimatePresence>
              </div>

              {/* Loading Indicator */}
              <AnimatePresence>
                {isLoading && (
                  <div className="mt-4">
                    <TypingIndicator />
                  </div>
                )}
              </AnimatePresence>

              {/* Error Display */}
              <AnimatePresence>
                {error && (
                  <div className="mt-4">
                    <ErrorDisplay error={error} onDismiss={() => setError(null)} />
                  </div>
                )}
              </AnimatePresence>

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-white/10 bg-black/80 backdrop-blur-xl">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-3xl py-4 lg:py-6">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="w-full px-5 py-4 pr-14 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30 transition-all disabled:opacity-50"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/40 disabled:shadow-none"
                >
                  {isLoading ? (
                    <FaSpinner className="text-white animate-spin" />
                  ) : (
                    <FaPaperPlane className="text-white text-sm" />
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 mt-3">
                Powered by <span className="text-cyan-400/70">Cognia AI</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
