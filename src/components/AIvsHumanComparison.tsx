import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaDollarSign, FaCheckCircle, FaTimesCircle, FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface ComparisonItem {
  metric: string;
  human: { value: string; icon: React.ReactNode; color: string };
  ai: { value: string; icon: React.ReactNode; color: string };
}

const AIvsHumanComparison: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState(0);

  const comparisons: ComparisonItem[] = [
    {
      metric: 'Availability',
      human: { value: 'Business Hours Only', icon: <FaTimesCircle />, color: 'text-red-500' },
      ai: { value: '24/7/365', icon: <FaCheckCircle />, color: 'text-green-500' }
    },
    {
      metric: 'Response Time',
      human: { value: '3 rings average', icon: <FaClock className="text-red-500" />, color: 'text-red-600' },
      ai: { value: '0 seconds', icon: <FaClock className="text-green-500" />, color: 'text-green-600' }
    },
    {
      metric: 'Cost Per Hour',
      human: { value: '$15-25/hour', icon: <FaDollarSign className="text-red-500" />, color: 'text-red-600' },
      ai: { value: '$0.10/minute', icon: <FaDollarSign className="text-green-500" />, color: 'text-green-600' }
    },
    {
      metric: 'Follow-up Rate',
      human: { value: '67% follow-up', icon: <FaArrowDown className="text-red-500" />, color: 'text-red-600' },
      ai: { value: '100% follow-up', icon: <FaArrowUp className="text-green-500" />, color: 'text-green-600' }
    },
    {
      metric: 'Languages',
      human: { value: '1-2 languages', icon: <FaTimesCircle />, color: 'text-red-500' },
      ai: { value: '20+ languages', icon: <FaCheckCircle />, color: 'text-green-500' }
    }
  ];

  // Auto-cycle through metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % comparisons.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [comparisons.length]);

  // Performance metrics data
  const performanceData = {
    human: {
      afterHoursCalls: 11,
      leadConversion: 23,
      missedCalls: 95,
      revenueImpact: 0
    },
    ai: {
      afterHoursCalls: 89,
      leadConversion: 340,
      missedCalls: 5,
      revenueImpact: 50000
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center bg-yellow-500 px-4 py-2 rounded-full mb-6">
            <span className="text-black font-bold">AI VS HUMAN PERFORMANCE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why AI Outperforms Traditional Reception
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See the dramatic difference in performance, cost, and customer satisfaction
          </p>
        </motion.div>

        {/* Split Screen Comparison */}
        <div className="grid lg:grid-cols-2 gap-0 mb-12 max-w-6xl mx-auto">
          {/* Human Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-red-900 to-red-800 p-8 rounded-l-2xl border-r-4 border-gray-700"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaTimesCircle className="mr-3 text-red-400" />
              Traditional Human Reception
            </h3>

            {/* Metrics List */}
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: activeMetric === index ? 1.05 : 1,
                    opacity: activeMetric === index ? 1 : 0.7
                  }}
                  className="bg-black/30 rounded-lg p-4 border border-red-500/30"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-semibold">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      {item.human.icon}
                      <span className={`font-bold ${item.human.color}`}>{item.human.value}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Performance Graph */}
            <div className="mt-6 bg-black/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">After Hours Calls</span>
                    <span className="text-red-400">{performanceData.human.afterHoursCalls}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${performanceData.human.afterHoursCalls}%` }}
                      className="bg-red-500 h-full rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Lead Conversion</span>
                    <span className="text-red-400">{performanceData.human.leadConversion}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${performanceData.human.leadConversion}%` }}
                      className="bg-red-500 h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-green-900 to-green-800 p-8 rounded-r-2xl"
          >
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaCheckCircle className="mr-3 text-green-400" />
              Cognia AI Reception
            </h3>

            {/* Metrics List */}
            <div className="space-y-4">
              {comparisons.map((item, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: activeMetric === index ? 1.05 : 1,
                    opacity: activeMetric === index ? 1 : 0.7
                  }}
                  className="bg-black/30 rounded-lg p-4 border border-green-500/30"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300 font-semibold">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      {item.ai.icon}
                      <span className={`font-bold ${item.ai.color}`}>{item.ai.value}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Performance Graph */}
            <div className="mt-6 bg-black/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">After Hours Calls</span>
                    <span className="text-green-400">{performanceData.ai.afterHoursCalls}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${performanceData.ai.afterHoursCalls}%` }}
                      className="bg-green-500 h-full rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Lead Conversion</span>
                    <span className="text-green-400">+{performanceData.ai.leadConversion}%</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      className="bg-green-500 h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Results Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-cyan-600 to-cyan-500 rounded-2xl p-8 max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">391%</div>
              <p className="text-cyan-100">Higher Conversion</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">-95%</div>
              <p className="text-cyan-100">Fewer Missed Calls</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">$50K/mo</div>
              <p className="text-cyan-100">Revenue Increase</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">1/10th</div>
              <p className="text-cyan-100">The Cost</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIvsHumanComparison;
