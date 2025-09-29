import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalculator, FaChartLine } from 'react-icons/fa';

interface ROIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROIModal: React.FC<ROIModalProps> = ({ isOpen, onClose }) => {
  const [missedCallsPerDay, setMissedCallsPerDay] = useState<number>(5);
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(150);
  const [conversionRate, setConversionRate] = useState<number>(30);
  const [showResults, setShowResults] = useState(false);
  
  // Calculations
  const missedCallsPerMonth = missedCallsPerDay * 30;
  const missedCallsPerYear = missedCallsPerDay * 365;
  const potentialCustomersPerMonth = (missedCallsPerMonth * conversionRate) / 100;
  const potentialCustomersPerYear = (missedCallsPerYear * conversionRate) / 100;
  const monthlyRevenueLoss = potentialCustomersPerMonth * avgCustomerValue;
  const yearlyRevenueLoss = potentialCustomersPerYear * avgCustomerValue;
  
  // With AI Receptionist
  const capturedRate = 0.87; // 87% conversion rate with AI
  const newCustomersPerMonth = missedCallsPerMonth * capturedRate;
  const newCustomersPerYear = missedCallsPerYear * capturedRate;
  const additionalMonthlyRevenue = newCustomersPerMonth * avgCustomerValue;
  const additionalYearlyRevenue = newCustomersPerYear * avgCustomerValue;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    if (isOpen) {
      setShowResults(false);
      setTimeout(() => setShowResults(true), 500);
    }
  }, [isOpen, missedCallsPerDay, avgCustomerValue, conversionRate]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-4xl z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <FaTimes className="text-white text-xl" />
                </button>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="text-5xl mb-3"
                  >
                    🚨
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">You're Losing Money Right Now!</h2>
                  <p className="text-cyan-100">See exactly how much revenue you're missing</p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <FaCalculator className="mr-2 text-teal-600" />
                        Quick Calculator
                      </h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Missed calls per day:
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={missedCallsPerDay}
                        onChange={(e) => setMissedCallsPerDay(Number(e.target.value))}
                        className="w-full accent-teal-600"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>1</span>
                        <span className="font-bold text-2xl text-teal-700">{missedCallsPerDay}</span>
                        <span>50</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Average customer value:
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="1000"
                        step="50"
                        value={avgCustomerValue}
                        onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                        className="w-full accent-teal-600"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>$50</span>
                        <span className="font-bold text-2xl text-teal-700">${avgCustomerValue}</span>
                        <span>$1000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your conversion rate (%):
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        step="5"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(Number(e.target.value))}
                        className="w-full accent-teal-600"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>10%</span>
                        <span className="font-bold text-2xl text-teal-700">{conversionRate}%</span>
                        <span>70%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Results Section */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center">
                      <FaChartLine className="mr-2 text-green-500" />
                      Your Potential
                    </h3>
                    
                    <AnimatePresence>
                      {showResults && (
                        <>
                          {/* Current Loss */}
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-red-50 border-2 border-red-200 p-4 rounded-xl"
                          >
                            <h4 className="font-semibold text-red-700 mb-2">
                              ❌ You're Currently Losing:
                            </h4>
                            <div className="text-3xl font-bold text-red-600">
                              {formatCurrency(monthlyRevenueLoss)}<span className="text-sm">/mo</span>
                            </div>
                            <div className="text-lg text-red-500">
                              {formatCurrency(yearlyRevenueLoss)}<span className="text-sm">/year</span>
                            </div>
                          </motion.div>
                          
                          {/* With Cognia */}
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 p-4 rounded-xl"
                          >
                            <h4 className="font-semibold text-green-700 mb-2">
                              ✅ With Cognia AI You'll Gain:
                            </h4>
                            <div className="text-3xl font-bold text-green-600">
                              +{formatCurrency(additionalMonthlyRevenue)}<span className="text-sm">/mo</span>
                            </div>
                            <div className="text-lg text-green-500">
                              +{formatCurrency(additionalYearlyRevenue)}<span className="text-sm">/year</span>
                            </div>
                            <div className="mt-2 text-sm text-green-600">
                              📈 {Math.round(newCustomersPerMonth)} new customers/month
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                    
                    {/* CTA */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="pt-4"
                    >
                      <a
                        href="tel:+16163263328"
                        className="w-full block text-center px-6 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg"
                      >
                        📞 Call Now: +1 616 326-3328
                      </a>
                      <p className="text-center text-sm text-gray-500 mt-2">
                        Start capturing this revenue today!
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ROIModal;
