import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaDollarSign, FaChartLine, FaArrowUp, FaPhone, FaUsers, FaCalendarCheck } from 'react-icons/fa';
import { useLeadCapture } from '../contexts/LeadCaptureContext';

const MobileROICalculator: React.FC = () => {
  const { openLeadCapture } = useLeadCapture();
  const [activeTab, setActiveTab] = useState<'input' | 'results'>('input');
  const [inboundCallsPerDay, setInboundCallsPerDay] = useState<number>(50);
  const [missedCallRate, setMissedCallRate] = useState<number>(30);
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(150);
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(200);

  // Calculations
  const missedCallsPerMonth = (inboundCallsPerDay * missedCallRate / 100) * 30;
  const capturedCallsPerMonth = missedCallsPerMonth * 0.95; // AI captures 95%
  const newCustomersPerMonth = capturedCallsPerMonth * 0.3; // 30% conversion
  const additionalMonthlyRevenue = newCustomersPerMonth * avgCustomerValue;
  const additionalYearlyRevenue = additionalMonthlyRevenue * 12;
  const monthlySavings = Math.ceil(inboundCallsPerDay / 100) * 3500;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="lg:hidden">
      <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('input')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'input'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            <FaCalculator className="inline mr-2" />
            Metrics
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all ${
              activeTab === 'results'
                ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            <FaChartLine className="inline mr-2" />
            Results
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'input' ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Inbound Calls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FaPhone className="text-cyan-400" />
                    Daily Calls
                  </label>
                  <span className="text-lg font-bold text-cyan-400">{inboundCallsPerDay}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="10"
                    value={inboundCallsPerDay}
                    onChange={(e) => setInboundCallsPerDay(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider-thumb-cyan"
                  />
                  <div
                    className="absolute top-0 left-0 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full pointer-events-none"
                    style={{ width: `${(inboundCallsPerDay - 10) / 490 * 100}%` }}
                  />
                </div>
              </div>

              {/* Missed Call Rate */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300">
                    Missed Call Rate
                  </label>
                  <span className="text-lg font-bold text-purple-400">{missedCallRate}%</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={missedCallRate}
                    onChange={(e) => setMissedCallRate(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider-thumb-purple"
                  />
                  <div
                    className="absolute top-0 left-0 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none"
                    style={{ width: `${(missedCallRate - 10) / 50 * 100}%` }}
                  />
                </div>
              </div>

              {/* Customer Value */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FaDollarSign className="text-green-400" />
                    Avg Customer Value
                  </label>
                  <span className="text-lg font-bold text-green-400">${avgCustomerValue}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={avgCustomerValue}
                    onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider-thumb-green"
                  />
                  <div
                    className="absolute top-0 left-0 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full pointer-events-none"
                    style={{ width: `${(avgCustomerValue - 50) / 1950 * 100}%` }}
                  />
                </div>
              </div>

              {/* Leads */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <FaUsers className="text-blue-400" />
                    Monthly Leads
                  </label>
                  <span className="text-lg font-bold text-blue-400">{leadsPerMonth}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={leadsPerMonth}
                    onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider-thumb-blue"
                  />
                  <div
                    className="absolute top-0 left-0 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full pointer-events-none"
                    style={{ width: `${(leadsPerMonth - 50) / 950 * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Monthly Revenue */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Monthly Revenue</span>
                  <FaArrowUp className="text-cyan-400 text-xs" />
                </div>
                <div className="text-2xl font-bold text-cyan-400">
                  {formatCurrency(additionalMonthlyRevenue)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  From {Math.round(newCustomersPerMonth)} new customers
                </div>
              </div>

              {/* Yearly Impact */}
              <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Yearly Impact</span>
                  <FaChartLine className="text-green-400 text-xs" />
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {formatCurrency(additionalYearlyRevenue)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Total revenue increase
                </div>
              </div>

              {/* Cost Savings */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Monthly Savings</span>
                  <FaDollarSign className="text-purple-400 text-xs" />
                </div>
                <div className="text-2xl font-bold text-purple-400">
                  {formatCurrency(monthlySavings)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  On staffing costs
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button
                  onClick={() => openLeadCapture('roi_calculator_legacy')}
                  className="block w-full"
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-4 rounded-xl text-center">
                      <div className="flex items-center justify-center gap-2 text-base">
                        <FaCalendarCheck />
                        Get This ROI
                      </div>
                      <div className="text-xs opacity-90">Start Free Trial</div>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileROICalculator;