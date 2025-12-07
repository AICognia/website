import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDollarSign, FaChartLine, FaPhone, FaEnvelope, FaShare, FaCheckCircle, FaCalendarCheck } from 'react-icons/fa';
import conversionTracker from '../utils/conversionTracking';
import { useLeadCapture } from '../contexts/LeadCaptureContext';

interface MobileROICalculatorRedesignedProps {
  onEmailCapture?: (email: string, roiData: ROIData) => void;
}

interface ROIData {
  monthlyRevenue: number;
  yearlyRevenue: number;
  monthlySavings: number;
  yearlySavings: number;
  totalValue: number;
}

const MobileROICalculatorRedesigned: React.FC<MobileROICalculatorRedesignedProps> = ({ onEmailCapture }) => {
  const { openLeadCapture } = useLeadCapture();
  const [dailyCalls, setDailyCalls] = useState<number>(50);
  const [missedRate, setMissedRate] = useState<number>(30);
  const [customerValue, setCustomerValue] = useState<number>(150);

  // Email capture state
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  // Calculations
  const missedCallsPerMonth = (dailyCalls * missedRate / 100) * 30;
  const capturedCalls = missedCallsPerMonth * 0.95;
  const newCustomers = capturedCalls * 0.3;
  const monthlyRevenue = Math.round(newCustomers * customerValue);
  const yearlyRevenue = monthlyRevenue * 12;
  const agentsReplaced = Math.ceil(dailyCalls / 100);
  const monthlySavings = agentsReplaced * 3500;
  const yearlySavings = monthlySavings * 12;
  const totalYearlyValue = yearlyRevenue + yearlySavings;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    conversionTracker.trackFormSubmission('roi_email_capture');

    const roiData: ROIData = {
      monthlyRevenue,
      yearlyRevenue,
      monthlySavings,
      yearlySavings,
      totalValue: totalYearlyValue
    };

    onEmailCapture?.(email, roiData);
    setEmailSent(true);

    // In a real implementation, you'd send this to your backend
    console.log('ROI Report requested:', { email, roiData });
  };

  const handleShare = async () => {
    const shareText = `I could save ${formatCurrency(totalYearlyValue)}/year with AI call handling! Check out Cognia AI.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My ROI Calculation - Cognia AI',
          text: shareText,
          url: 'https://cogniaai.com'
        });
        conversionTracker.trackButtonClick('Share ROI', 'roi_calculator');
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText + ' https://cogniaai.com');
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="lg:hidden">
      <div className="bg-gradient-to-b from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-4 py-3 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaChartLine className="text-cyan-400" />
              <span className="text-sm font-semibold text-white">ROI Calculator</span>
            </div>
            <span className="text-xs text-gray-400">Live Results</span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Input: Daily Calls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-400 flex items-center gap-2">
                <FaPhone className="text-cyan-400" />
                Daily Calls
              </label>
              <span className="text-lg font-bold text-cyan-400">{dailyCalls}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                value={dailyCalls}
                onChange={(e) => setDailyCalls(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #22d3ee ${(dailyCalls - 10) / 290 * 100}%, rgba(255,255,255,0.1) ${(dailyCalls - 10) / 290 * 100}%)`
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-600">
              <span>10</span>
              <span>300+</span>
            </div>
          </div>

          {/* Input: Missed Rate */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-400">
                Missed Call Rate
              </label>
              <span className="text-lg font-bold text-purple-400">{missedRate}%</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={missedRate}
                onChange={(e) => setMissedRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #a855f7 ${(missedRate - 10) / 40 * 100}%, rgba(255,255,255,0.1) ${(missedRate - 10) / 40 * 100}%)`
                }}
              />
            </div>
          </div>

          {/* Input: Customer Value */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-gray-400 flex items-center gap-2">
                <FaDollarSign className="text-green-400" />
                Avg Customer Value
              </label>
              <span className="text-lg font-bold text-green-400">${customerValue}</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={customerValue}
                onChange={(e) => setCustomerValue(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #22c55e ${(customerValue - 50) / 950 * 100}%, rgba(255,255,255,0.1) ${(customerValue - 50) / 950 * 100}%)`
                }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-4" />

          {/* Live Results - Always Visible */}
          <div className="space-y-3">
            {/* Monthly Revenue */}
            <motion.div
              key={monthlyRevenue}
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl"
            >
              <div>
                <div className="text-xs text-gray-400">Monthly Revenue</div>
                <div className="text-xs text-cyan-400/70">From captured calls</div>
              </div>
              <div className="text-xl font-bold text-cyan-400">
                +{formatCurrency(monthlyRevenue)}
              </div>
            </motion.div>

            {/* Monthly Savings */}
            <motion.div
              key={monthlySavings}
              initial={{ scale: 1.02 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-xl"
            >
              <div>
                <div className="text-xs text-gray-400">Monthly Savings</div>
                <div className="text-xs text-green-400/70">{agentsReplaced} agent{agentsReplaced > 1 ? 's' : ''} replaced</div>
              </div>
              <div className="text-xl font-bold text-green-400">
                +{formatCurrency(monthlySavings)}
              </div>
            </motion.div>

            {/* Total Yearly Value - Highlighted */}
            <motion.div
              key={totalYearlyValue}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-green-500/20 rounded-xl" />
              <div className="relative p-4 border border-white/20 rounded-xl text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Total Yearly Value
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                  {formatCurrency(totalYearlyValue)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Revenue + Savings per year
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            {!showEmailCapture && !emailSent ? (
              <>
                {/* Primary CTA */}
                <button
                  onClick={() => {
                    conversionTracker.trackDemoBooking('roi_calculator_mobile');
                    openLeadCapture('roi_calculator_mobile');
                  }}
                  className="block w-full"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-50" />
                    <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3.5 px-4 rounded-xl text-center flex items-center justify-center gap-2">
                      <FaCalendarCheck />
                      Get This ROI — Book Demo
                    </div>
                  </div>
                </button>

                {/* Secondary Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEmailCapture(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-sm"
                  >
                    <FaEnvelope className="text-cyan-400" />
                    Email Report
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-sm"
                  >
                    <FaShare className="text-cyan-400" />
                    Share
                  </button>
                </div>
              </>
            ) : emailSent ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-center"
              >
                <FaCheckCircle className="text-green-400 text-2xl mx-auto mb-2" />
                <div className="text-white font-medium">Report Sent!</div>
                <div className="text-xs text-gray-400 mt-1">Check your email for your personalized ROI report</div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleEmailSubmit}
                className="space-y-3"
              >
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowEmailCapture(false)}
                    className="flex-1 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-cyan-500 text-white font-semibold rounded-xl text-sm"
                  >
                    Send Report
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 text-center">
                  We'll send your personalized ROI breakdown. No spam.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileROICalculatorRedesigned;
