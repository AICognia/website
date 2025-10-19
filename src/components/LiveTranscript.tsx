import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TranscriptLine {
  speaker: 'AI' | 'Patient' | 'Guest';
  text: string;
  timestamp: string;
}

interface LiveTranscriptProps {
  industry: 'healthcare' | 'hospitality';
}

const LiveTranscript: React.FC<LiveTranscriptProps> = ({ industry }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<TranscriptLine[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  const healthcareConversation: TranscriptLine[] = [
    { speaker: 'AI', text: "Thank you for calling Dr. Smith's office. How may I help you today?", timestamp: "0:02" },
    { speaker: 'Patient', text: "Hi, I need to schedule an appointment for a dental cleaning.", timestamp: "0:05" },
    { speaker: 'AI', text: "I'd be happy to help you schedule that. We have availability tomorrow at 2 PM or Thursday at 10 AM. Which works better for you?", timestamp: "0:08" },
    { speaker: 'Patient', text: "Thursday at 10 AM would be perfect.", timestamp: "0:12" },
    { speaker: 'AI', text: "Excellent! I've scheduled your cleaning for Thursday at 10 AM. May I have your name and phone number for our records?", timestamp: "0:15" },
    { speaker: 'Patient', text: "John Doe, 555-0123", timestamp: "0:18" },
    { speaker: 'AI', text: "Perfect, Mr. Doe. Your appointment is confirmed. We'll send you a reminder text the day before. Is there anything else I can help you with?", timestamp: "0:21" },
    { speaker: 'Patient', text: "No, that's all. Thank you!", timestamp: "0:24" },
    { speaker: 'AI', text: "You're welcome! We'll see you Thursday at 10 AM. Have a great day!", timestamp: "0:26" }
  ];

  const hospitalityConversation: TranscriptLine[] = [
    { speaker: 'AI', text: "Thank you for calling Grand Hotel. How may I assist you today?", timestamp: "0:02" },
    { speaker: 'Guest', text: "Hello, I'd like to book a room for this weekend.", timestamp: "0:05" },
    { speaker: 'AI', text: "I'd be delighted to help. For Friday and Saturday night, we have a King Suite available at $299 per night or a Standard Double at $199. Which would you prefer?", timestamp: "0:08" },
    { speaker: 'Guest', text: "The King Suite sounds great.", timestamp: "0:12" },
    { speaker: 'AI', text: "Excellent choice! May I have your name and email to complete the reservation?", timestamp: "0:15" },
    { speaker: 'Guest', text: "Jane Smith, jane.smith@email.com", timestamp: "0:18" },
    { speaker: 'AI', text: "Thank you, Ms. Smith. Your King Suite is reserved for Friday and Saturday. You'll receive a confirmation email shortly. Would you like to add our breakfast package for $30 per day?", timestamp: "0:21" },
    { speaker: 'Guest', text: "Yes, please add that.", timestamp: "0:24" },
    { speaker: 'AI', text: "Perfect! Your total is $658 including breakfast. We look forward to welcoming you on Friday. Check-in is at 3 PM.", timestamp: "0:27" }
  ];

  const conversation = industry === 'healthcare' ? healthcareConversation : hospitalityConversation;

  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentLineIndex < conversation.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, conversation[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
        setIsTyping(false);
      }, 2500);

      return () => clearTimeout(timer);
    } else {
      // Reset the conversation after completion
      const resetTimer = setTimeout(() => {
        setCurrentLineIndex(0);
        setDisplayedLines([]);
        setCallDuration(0);
      }, 5000);

      return () => clearTimeout(resetTimer);
    }
  }, [currentLineIndex, conversation]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-cyan-500/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
          </div>
          <span className="text-white font-semibold">Call in Progress</span>
        </div>
        <span className="text-cyan-300 font-mono text-lg">{formatTime(callDuration)}</span>
      </div>

      {/* Transcript Area */}
      <div className="bg-black/40 rounded-lg p-4 h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-600 scrollbar-track-gray-800">
        <AnimatePresence>
          {displayedLines.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 flex ${line.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] ${line.speaker === 'AI' ? 'order-2' : 'order-1'}`}>
                <div className={`text-xs font-semibold mb-1 ${
                  line.speaker === 'AI' ? 'text-cyan-400' : 'text-green-400'
                }`}>
                  {line.speaker}
                </div>
                <div className={`rounded-lg p-3 ${
                  line.speaker === 'AI' 
                    ? 'bg-cyan-600/20 text-cyan-100 border border-cyan-500/30' 
                    : 'bg-green-600/20 text-green-100 border border-green-500/30'
                }`}>
                  {line.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">{line.timestamp}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 p-3"
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-400">AI-powered transcription</span>
        <span className="text-cyan-400">Real-time conversation</span>
      </div>
    </div>
  );
};

export default LiveTranscript;
