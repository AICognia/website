import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CodeDisplayProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  animated?: boolean;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ 
  code, 
  language = 'javascript',
  showLineNumbers = true,
  animated = true 
}) => {
  const [displayedCode, setDisplayedCode] = useState(animated ? '' : code);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (!animated) return;
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < code.length) {
        setDisplayedCode(code.substring(0, currentIndex + 1));
        if (code[currentIndex] === '\n') {
          setCurrentLine(prev => prev + 1);
        }
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [code, animated]);

  const syntaxHighlight = (text: string) => {
    // Simple syntax highlighting
    return text
      .replace(/(['"])(.*?)\1/g, '<span class="text-green-400">$&</span>')
      .replace(/\b(const|let|var|function|return|if|else|for|while)\b/g, '<span class="text-purple-400">$&</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-cyan-400">$&</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-yellow-400">$&</span>')
      .replace(/\/\/.*/g, '<span class="text-gray-500">$&</span>');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gray-950 rounded-xl p-6 overflow-hidden border border-gray-800"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-800">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="text-gray-500 text-xs font-mono ml-4">{language}</span>
      </div>
      
      {/* Code content */}
      <div className="font-mono text-sm">
        {displayedCode.split('\n').map((line, index) => (
          <div key={index} className="flex items-start">
            {showLineNumbers && (
              <span className="text-gray-600 mr-4 select-none w-8 text-right">
                {index + 1}
              </span>
            )}
            <span 
              className="text-gray-300 flex-1"
              dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }}
            />
            {animated && index === currentLine && (
              <span className="animate-pulse text-cyan-400">│</span>
            )}
          </div>
        ))}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default CodeDisplay;
