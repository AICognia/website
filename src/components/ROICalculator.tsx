import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalculator, FaChartLine, FaDollarSign } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

const ROICalculator: React.FC = () => {
  const { language } = useLanguage();
  
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
    <div className="bg-gray-800/50 backdrop-blur-xl p-8 rounded-2xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <FaCalculator className="mr-3 text-cyan-400" />
            {language === 'tr' ? 'İşletme Bilgileriniz' : 'Your Business Metrics'}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {language === 'tr' ? 'Günlük kaçan çağrı sayısı:' : 'Missed calls per day:'}
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={missedCallsPerDay}
              onChange={(e) => setMissedCallsPerDay(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>1</span>
              <span className="font-bold text-lg text-cyan-400">{missedCallsPerDay}</span>
              <span>50</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {language === 'tr' ? 'Ortalama müşteri değeri ($):' : 'Average customer value ($):'}
            </label>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={avgCustomerValue}
              onChange={(e) => setAvgCustomerValue(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>$50</span>
              <span className="font-bold text-lg text-cyan-400">${avgCustomerValue}</span>
              <span>$1000</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {language === 'tr' ? 'Mevcut dönüşüm oranı (%):' : 'Current conversion rate (%):'}
            </label>
            <input
              type="range"
              min="10"
              max="70"
              step="5"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>10%</span>
              <span className="font-bold text-lg text-cyan-400">{conversionRate}%</span>
              <span>70%</span>
            </div>
          </div>
        </div>
        
        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white flex items-center">
            <FaChartLine className="mr-3 text-green-400" />
            {language === 'tr' ? 'Potansiyel Geliriniz' : 'Your Potential Revenue'}
          </h3>
          
          {/* Current Loss */}
          <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
            <h4 className="font-semibold text-red-400 mb-2">
              {language === 'tr' ? '❌ Şu anda kaybediyorsunuz:' : '❌ Currently losing:'}
            </h4>
            <div className="text-3xl font-bold text-red-400">
              {formatCurrency(monthlyRevenueLoss)}<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div className="text-lg text-red-400/80">
              {formatCurrency(yearlyRevenueLoss)}<span className="text-sm font-normal text-gray-500">/year</span>
            </div>
          </div>
          
          {/* With AI Receptionist */}
          <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
            <h4 className="font-semibold text-green-400 mb-2">
              {language === 'tr' ? '✅ Cognia AI ile kazanacağınız:' : '✅ With Cognia AI you\'ll gain:'}
            </h4>
            <div className="text-3xl font-bold text-green-400">
              +{formatCurrency(additionalMonthlyRevenue)}<span className="text-sm font-normal text-gray-500">/month</span>
            </div>
            <div className="text-lg text-green-400/80">
              +{formatCurrency(additionalYearlyRevenue)}<span className="text-sm font-normal text-gray-500">/year</span>
            </div>
          </div>
          
          {/* Key Stats */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-cyan-400">
                  {Math.round(newCustomersPerMonth)}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'tr' ? 'Aylık yeni müşteri' : 'New customers/month'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">
                  {Math.round(newCustomersPerYear)}
                </div>
                <div className="text-xs text-gray-500">
                  {language === 'tr' ? 'Yıllık yeni müşteri' : 'New customers/year'}
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
        className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-xl border border-cyan-500/30"
      >
        <div className="text-center">
          <FaDollarSign className="text-4xl text-cyan-400 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-white mb-2">
            {language === 'tr' ? 'Toplam ROI (1 Yıl):' : 'Total ROI (Year 1):'}
          </h3>
          <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            {formatCurrency(additionalYearlyRevenue)}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ROICalculator;