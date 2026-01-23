'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaChartLine, FaDollarSign, FaPhone, FaUserCheck } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const ROICalculator: React.FC = () => {
  const { language } = useLanguage();

  // Inbound Call Metrics
  const [inboundCallsPerDay, setInboundCallsPerDay] = useState<number>(50);
  const [missedCallRate, setMissedCallRate] = useState<number>(30); // percentage of calls missed
  const [avgCustomerValue, setAvgCustomerValue] = useState<number>(150);
  const [inboundConversionRate] = useState<number>(30);

  // Outbound Call Metrics
  const [leadsPerMonth, setLeadsPerMonth] = useState<number>(200);
  const [appointmentsPerMonth, setAppointmentsPerMonth] = useState<number>(100);
  const [outboundConversionBoost] = useState<number>(25); // % improvement in conversion from outbound

  // Calculations for Inbound
  const missedCallsPerDay = (inboundCallsPerDay * missedCallRate) / 100;
  const missedCallsPerMonth = missedCallsPerDay * 30;
  const missedCallsPerYear = missedCallsPerDay * 365;
  // const potentialCustomersPerMonth = (missedCallsPerMonth * inboundConversionRate) / 100;
  // const potentialCustomersPerYear = (missedCallsPerYear * inboundConversionRate) / 100;
  // const monthlyRevenueLoss = potentialCustomersPerMonth * avgCustomerValue;
  // const yearlyRevenueLoss = potentialCustomersPerYear * avgCustomerValue;

  // With AI Call Center - Inbound
  const captureRate = 0.95; // AI captures 95% of previously missed calls
  const capturedCallsPerMonth = missedCallsPerMonth * captureRate;
  const capturedCallsPerYear = missedCallsPerYear * captureRate;
  const newInboundCustomersPerMonth = (capturedCallsPerMonth * inboundConversionRate) / 100;
  const newInboundCustomersPerYear = (capturedCallsPerYear * inboundConversionRate) / 100;
  const additionalInboundMonthlyRevenue = newInboundCustomersPerMonth * avgCustomerValue;
  const additionalInboundYearlyRevenue = newInboundCustomersPerYear * avgCustomerValue;

  // With AI Call Center - Outbound
  const qualifiedLeadsPerMonth = (leadsPerMonth * 0.7); // AI qualifies 70% of leads effectively
  const additionalConversionsPerMonth = (qualifiedLeadsPerMonth * outboundConversionBoost) / 100;
  // const appointmentShowRate = 0.85; // 85% show rate with confirmations vs 60% without
  const additionalAppointmentRevenue = (appointmentsPerMonth * 0.25) * avgCustomerValue; // 25% more appointments show up
  const additionalOutboundMonthlyRevenue = (additionalConversionsPerMonth * avgCustomerValue) + additionalAppointmentRevenue;
  const additionalOutboundYearlyRevenue = additionalOutboundMonthlyRevenue * 12;

  // Total ROI
  // const totalMonthlyRevenue = additionalInboundMonthlyRevenue + additionalOutboundMonthlyRevenue;
  const totalYearlyRevenue = additionalInboundYearlyRevenue + additionalOutboundYearlyRevenue;

  // Cost savings from not needing human call center agents
  const callCenterAgentCost = 3500; // Average monthly cost per agent
  const agentsReplaced = Math.ceil(inboundCallsPerDay / 100); // 1 agent per 100 calls/day
  const monthlyCostSavings = agentsReplaced * callCenterAgentCost;
  const yearlyCostSavings = monthlyCostSavings * 12;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-xl p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl">
      {/* Section Tabs */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Input Section */}
        <div className="flex-1 space-y-4 sm:space-y-6">
          <h3 className="text-xl sm:text-2xl font-serif font-normal text-white flex items-center">
            <FaCalculator className="mr-2 sm:mr-3 text-primary text-lg sm:text-xl" />
            <span className="truncate">{language === 'tr' ? 'Çağrı Merkezi Metrikleriniz' : 'Your Call Center Metrics'}</span>
          </h3>

          {/* Inbound Metrics */}
          <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-primary flex items-center">
              <FaPhone className="mr-2 text-sm sm:text-base" />
              <span className="truncate">{language === 'tr' ? 'Gelen Aramalar' : 'Inbound Calls'}</span>
            </h4>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
                {language === 'tr' ? 'Günlük gelen arama sayısı:' : 'Inbound calls per day:'}
              </label>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={inboundCallsPerDay}
                onChange={(e) => setInboundCallsPerDay(Number(e.target.value))}
                className="w-full accent-primary h-2 sm:h-auto"
              />
              <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                <span>10</span>
                <span className="font-bold text-base sm:text-lg text-primary">{inboundCallsPerDay}</span>
                <span>500</span>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
                {language === 'tr' ? 'Kaçan arama oranı (%):' : 'Missed call rate (%):'}
              </label>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={missedCallRate}
                onChange={(e) => setMissedCallRate(Number(e.target.value))}
                className="w-full accent-primary h-2 sm:h-auto"
              />
              <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                <span>10%</span>
                <span className="font-bold text-base sm:text-lg text-primary">{missedCallRate}%</span>
                <span>60%</span>
              </div>
            </div>
          </div>

          {/* Outbound Metrics */}
          <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg space-y-3 sm:space-y-4">
            <h4 className="text-base sm:text-lg font-semibold text-purple-400 flex items-center">
              <FaUserCheck className="mr-2 text-sm sm:text-base" />
              <span className="truncate">{language === 'tr' ? 'Giden Aramalar' : 'Outbound Calls'}</span>
            </h4>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
                {language === 'tr' ? 'Aylık potansiyel müşteri sayısı:' : 'Leads to qualify per month:'}
              </label>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={leadsPerMonth}
                onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                className="w-full accent-purple-500 h-2 sm:h-auto"
              />
              <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                <span>50</span>
                <span className="font-bold text-base sm:text-lg text-purple-400">{leadsPerMonth}</span>
                <span>1000</span>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
                {language === 'tr' ? 'Aylık randevu sayısı:' : 'Appointments per month:'}
              </label>
              <input
                type="range"
                min="20"
                max="500"
                step="20"
                value={appointmentsPerMonth}
                onChange={(e) => setAppointmentsPerMonth(Number(e.target.value))}
                className="w-full accent-purple-500 h-2 sm:h-auto"
              />
              <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                <span>20</span>
                <span className="font-bold text-base sm:text-lg text-purple-400">{appointmentsPerMonth}</span>
                <span>500</span>
              </div>
            </div>
          </div>

          {/* Value Metrics */}
          <div className="bg-gray-900/50 p-3 sm:p-4 rounded-lg">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-2">
                {language === 'tr' ? 'Ortalama müşteri değeri ($):' : 'Average customer value ($):'}
              </label>
              <input
                type="range"
                min="50"
                max="2000"
                step="50"
                value={avgCustomerValue}
                onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
                className="w-full accent-green-500 h-2 sm:h-auto"
              />
              <div className="flex justify-between text-xs sm:text-sm text-gray-500">
                <span>$50</span>
                <span className="font-bold text-base sm:text-lg text-green-400">${avgCustomerValue}</span>
                <span>$2000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1 space-y-4 sm:space-y-6">
          <h3 className="text-xl sm:text-2xl font-serif font-normal text-white flex items-center">
            <FaChartLine className="mr-2 sm:mr-3 text-green-400 text-lg sm:text-xl" />
            <span className="truncate">{language === 'tr' ? 'AI Çağrı Merkezi ROI' : 'AI Call Center ROI'}</span>
          </h3>

          {/* Inbound Revenue */}
          <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg">
            <h4 className="font-semibold text-primary mb-2">
              📞 {language === 'tr' ? 'Gelen Arama Geliri:' : 'Inbound Call Revenue:'}
            </h4>
            <div className="text-2xl font-bold text-primary">
              +{formatCurrency(additionalInboundMonthlyRevenue)}<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div className="text-sm text-primary/80">
              +{formatCurrency(additionalInboundYearlyRevenue)}<span className="text-xs font-normal text-gray-500">/year</span>
            </div>
          </div>

          {/* Outbound Revenue */}
          <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-400 mb-2">
              📤 {language === 'tr' ? 'Giden Arama Geliri:' : 'Outbound Call Revenue:'}
            </h4>
            <div className="text-2xl font-bold text-purple-400">
              +{formatCurrency(additionalOutboundMonthlyRevenue)}<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div className="text-sm text-purple-400/80">
              +{formatCurrency(additionalOutboundYearlyRevenue)}<span className="text-xs font-normal text-gray-500">/year</span>
            </div>
          </div>

          {/* Cost Savings */}
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">
              💰 {language === 'tr' ? 'Maliyet Tasarrufu:' : 'Cost Savings:'}
            </h4>
            <div className="text-2xl font-bold text-green-400">
              +{formatCurrency(monthlyCostSavings)}<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div className="text-sm text-green-400/80">
              {agentsReplaced} {language === 'tr' ? 'ajan maliyeti' : 'agent costs eliminated'}
            </div>
          </div>

          {/* Key Stats */}
          <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round(capturedCallsPerMonth)}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'tr' ? 'Yakalanan arama/ay' : 'Calls captured/mo'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {Math.round(qualifiedLeadsPerMonth)}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'tr' ? 'Nitelikli müşteri/ay' : 'Leads qualified/mo'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total ROI Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 p-6 bg-gradient-to-r from-primary/10 via-purple-500/10 to-green-500/10 rounded-xl border border-primary/30"
      >
        <div className="text-center">
          <FaDollarSign className="text-5xl text-primary mx-auto mb-3" />
          <h3 className="text-xl font-serif font-normal text-white mb-3">
            {language === 'tr' ? 'Toplam Yıllık Değer:' : 'Total Annual Value:'}
          </h3>
          <div className="text-5xl font-bold bg-gradient-to-r from-primary-light via-purple-400 to-green-400 bg-clip-text text-transparent">
            {formatCurrency(totalYearlyRevenue + yearlyCostSavings)}
          </div>
          <div className="mt-3 text-sm text-gray-400">
            {language === 'tr' ?
              `${formatCurrency(totalYearlyRevenue)} yeni gelir + ${formatCurrency(yearlyCostSavings)} tasarruf` :
              `${formatCurrency(totalYearlyRevenue)} new revenue + ${formatCurrency(yearlyCostSavings)} saved`}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ROICalculator;