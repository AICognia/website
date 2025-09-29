import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaCalculator, FaChartLine, FaDollarSign } from 'react-icons/fa';

interface ROIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROIModal: React.FC<ROIModalProps> = ({ isOpen, onClose }) => {
  const [missedCallsPerDay, setMissedCallsPerDay] = useState<number>(5);
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(150);
  const [conversionRate, setConversionRate] = useState<number>(30);
  
  // Calculations
  const missedCallsPerMonth = missedCallsPerDay * 30;
  const missedCallsPerYear = missedCallsPerDay * 365;
  const potentialCustomersPerMonth = (missedCallsPerMonth * conversionRate) / 100;
  const potentialCustomersPerYear = (missedCallsPerYear * conversionRate) / 100;
  const monthlyRevenueLoss = potentialCustomersPerMonth * avgCustomerValue;
  const yearlyRevenueLoss = potentialCustomersPerYear * avgCustomerValue;
  
  // With AI Receptionist - Capturing previously missed calls
  const captureRate = 0.95; // AI captures 95% of previously missed calls
  const capturedCallsPerMonth = missedCallsPerMonth * captureRate;
  const capturedCallsPerYear = missedCallsPerYear * captureRate;
  // Apply your existing conversion rate to the captured calls
  const newCustomersPerMonth = (capturedCallsPerMonth * conversionRate) / 100;
  const newCustomersPerYear = (capturedCallsPerYear * conversionRate) / 100;
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
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-5xl z-50"
          >
            <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors z-10"
              >
                <FaTimes className="text-gray-700 text-xl" />
              </button>
              
              {/* Content */}
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Input Section */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <FaCalculator className="mr-3 text-blue-500" />
                      Your Business Metrics
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
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>1</span>
                        <span className="font-bold text-lg text-blue-600">{missedCallsPerDay}</span>
                        <span>50</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Average customer value ($):
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="1000"
                        step="50"
                        value={avgCustomerValue}
                        onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>$50</span>
                        <span className="font-bold text-lg text-blue-600">${avgCustomerValue}</span>
                        <span>$1000</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current conversion rate (%):
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        step="5"
                        value={conversionRate}
                        onChange={(e) => setConversionRate(Number(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>10%</span>
                        <span className="font-bold text-lg text-blue-600">{conversionRate}%</span>
                        <span>70%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Results Section */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                      <FaChartLine className="mr-3 text-green-500" />
                      Your Potential Revenue
                    </h3>
                    
                    {/* Current Loss */}
                    <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-red-700 mb-2">
                        ❌ Currently losing:
                      </h4>
                      <div className="text-3xl font-bold text-red-600">
                        {formatCurrency(monthlyRevenueLoss)}<span className="text-sm font-normal">/month</span>
                      </div>
                      <div className="text-lg text-red-500">
                        {formatCurrency(yearlyRevenueLoss)}<span className="text-sm font-normal">/year</span>
                      </div>
                    </div>
                    
                    {/* With AI Receptionist */}
                    <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 mb-2">
                        ✅ With Cognia AI you'll gain:
                      </h4>
                      <div className="text-3xl font-bold text-green-600">
                        +{formatCurrency(additionalMonthlyRevenue)}<span className="text-sm font-normal">/month</span>
                      </div>
                      <div className="text-lg text-green-500">
                        +{formatCurrency(additionalYearlyRevenue)}<span className="text-sm font-normal">/year</span>
                      </div>
                    </div>
                    
                    {/* Key Stats */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(newCustomersPerMonth)}
                          </div>
                          <div className="text-xs text-gray-600">
                            New customers/month
                          </div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.round(newCustomersPerYear)}
                          </div>
                          <div className="text-xs text-gray-600">
                            New customers/year
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* ROI Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-orange-300"
                >
                  <div className="text-center">
                    <FaDollarSign className="text-4xl text-orange-500 mx-auto mb-2" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Total ROI (Year 1):
                    </h3>
                    <div className="text-4xl font-bold text-orange-600">
                      {formatCurrency(additionalYearlyRevenue)}
                    </div>
                  </div>
                </motion.div>
                
                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-center"
                >
                  <a
                    href="tel:+16163263328"
                    className="inline-block px-8 py-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl hover:from-teal-700 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    📞 Call Now to Start Saving: +1 616 326-3328
                  </a>
                  <p className="text-sm text-gray-500 mt-3">
                    Start capturing this revenue today!
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ROIModal;