'use client'
import React from 'react';
import { FaShoppingCart, FaBox, FaTruck, FaChartLine, FaCheckCircle, FaPhone, FaWarehouse, FaClock, FaArrowRight, FaDollarSign, FaUndo, FaCreditCard, FaClipboardList, FaCalendarCheck } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import { Sparkles } from '../../components/ui/sparkles';

const OrderProcessing: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent text-gray-900 relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="min-h-screen flex items-center justify-center relative py-10 md:py-20">
          <div className="container-responsive relative z-10 flex-1 flex items-center pt-24 sm:pt-20 md:pt-0">
            <div className="bento-grid items-center w-full max-w-6xl">

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
                className="col-span-12 lg:col-span-8 bento-card flex flex-col justify-between pointer-events-auto p-4 sm:p-6 md:p-8"
              >
                <div className="relative z-10 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50/80 backdrop-blur-sm border border-slate-200/50 rounded-full mb-4 md:mb-8">
                    <FaShoppingCart className="w-3 h-3 md:w-4 md:h-4 text-orange-600" />
                    <span className="body-small uppercase tracking-widest text-slate-600 text-xs md:text-sm">E-Commerce</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-normal leading-tight mb-4 md:mb-8">
                    Order Processing
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-orange-400">Automated Order Management</span>
                  </h1>

                  <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mb-6 md:mb-12">
                    Streamline order taking, tracking, and fulfillment. Handle customer inquiries, process orders,
                    and manage inventory automatically across all channels while reducing operational costs by 40%.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-6">
                    <Link
                      href="/demo"
                      className="btn-primary h-12 md:h-14 px-6 md:px-10 rounded-lg text-base md:text-lg w-full sm:w-auto text-center flex items-center justify-center"
                    >
                      <span>Request Demo</span>
                    </Link>
                    <a
                      href="tel:+16163263328"
                      className="group h-12 md:h-14 px-6 md:px-10 rounded-lg bg-slate-50/80 border border-slate-200 text-slate-600 font-semibold transition-all flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg hover:bg-white hover:border-orange-200 active:scale-[0.98] w-full sm:w-auto"
                    >
                      <FaPhone className="text-xs md:text-sm group-hover:text-orange-600 transition-colors" />
                      <span className="group-hover:text-orange-600 transition-colors">Talk to Expert</span>
                    </a>
                  </div>
                </div>

                <div className="relative z-10 mt-6 md:mt-8 grid grid-cols-3 gap-4 md:gap-8">
                  <div className="text-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600">40%</div>
                    <div className="text-xs md:text-sm text-slate-500">Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600">2x</div>
                    <div className="text-xs md:text-sm text-slate-500">Faster Fulfillment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-600">100%</div>
                    <div className="text-xs md:text-sm text-slate-500">Order Accuracy</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
                className="col-span-12 lg:col-span-4 bento-card flex flex-col justify-between pointer-events-auto p-4 sm:p-6 md:p-8"
              >
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <FaBox className="text-orange-600 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Smart Ordering</h3>
                      <p className="text-sm md:text-base text-slate-600">AI-powered order taking with product recommendations and upselling.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <FaTruck className="text-blue-600 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Auto Tracking</h3>
                      <p className="text-sm md:text-base text-slate-600">Real-time order tracking and automated shipping notifications.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                      <FaWarehouse className="text-green-600 text-lg md:text-xl" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 md:mb-2">Inventory Sync</h3>
                      <p className="text-sm md:text-base text-slate-600">Automatic inventory management across all sales channels.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        <TechSection
          badge="Features"
          title="Complete Order Management Solution"
          subtitle="From order placement to delivery tracking"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-7xl mx-auto px-4 md:px-0">
            {[
              {
                icon: FaShoppingCart,
                title: 'Phone Orders',
                description: 'Take new orders over the phone with real-time inventory checks and product recommendations.'
              },
              {
                icon: FaBox,
                title: 'Inventory Sync',
                description: 'Check real-time stock levels and prevent overselling with live inventory integration.'
              },
              {
                icon: FaTruck,
                title: 'Order Tracking',
                description: 'Provide instant order status updates, tracking numbers, and estimated delivery dates.'
              },
              {
                icon: FaUndo,
                title: 'Returns & Exchanges',
                description: 'Process returns, exchanges, and refund requests with automated RMA generation.'
              },
              {
                icon: FaCreditCard,
                title: 'Payment Processing',
                description: 'Securely collect payment information and process orders through your payment gateway.'
              },
              {
                icon: FaClipboardList,
                title: 'Order Modifications',
                description: 'Handle order changes, cancellations, and address updates before shipment.'
              }
            ].map((feature, index) => (
              <TechCard key={index}>
                <div className="text-center p-2 md:p-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 md:mb-4 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-xl md:text-2xl text-orange-600" />
                  </div>
                  <h3 className="text-lg md:text-xl font-medium text-[#37322F] mb-2">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-[rgba(49,45,43,0.70)]">{feature.description}</p>
                </div>
              </TechCard>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Integrations"
          title="Works With Your E-Commerce Platform"
          subtitle="Seamless integration with popular systems"
        >
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            <TechCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-2 md:p-4">
                <div>
                  <h3 className="text-lg md:text-xl font-medium text-[#37322F] mb-3 md:mb-4">E-Commerce Platforms</h3>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-xs md:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Shopify, WooCommerce, Magento</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs md:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>BigCommerce, Salesforce Commerce</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs md:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Custom e-commerce solutions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-medium text-[#37322F] mb-3 md:mb-4">Order Management</h3>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-xs md:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Inventory management systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs md:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Shipping and logistics platforms</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-xs md:text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Payment gateways (Stripe, PayPal)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TechCard>
          </div>
        </TechSection>

        <TechSection
          badge="Benefits"
          title="Results for Retail & E-Commerce"
          subtitle="Increase sales and reduce order errors"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto px-4 md:px-0">
            {[
              { value: '35%', label: 'More Phone Orders', suffix: '' },
              { value: '24/7', label: 'Order Taking', suffix: '' },
              { value: '98%', label: 'Order Accuracy', suffix: '' },
              { value: '50%', label: 'Faster Processing', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#37322F] mb-1 md:mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-xl md:text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-[rgba(49,45,43,0.70)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready to Automate Order Processing?"
          subtitle="Handle more orders with zero errors"
        >
          <div className="max-w-4xl mx-auto text-center px-4 md:px-0">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-stretch sm:items-center mb-6 md:mb-8">
              <Link
                href="/demo"
                className="flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-light hover:to-blue-500 text-white text-base md:text-lg font-semibold rounded-xl transition-all shadow-lg shadow-primary/25 w-full sm:w-auto"
              >
                <FaCalendarCheck />
                Schedule Demo
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href="/industries/retail"
                className="px-6 md:px-8 py-3 md:py-4 border border-slate-200 hover:bg-slate-50 text-slate-600 text-base md:text-lg font-medium rounded-md transition-colors w-full sm:w-auto text-center"
              >
                Retail Solutions
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 text-xs text-gray-500">
              <span className="flex items-center gap-2"><FaCheckCircle />24/7 Order Taking</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Inventory Sync</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Auto Processing</span>
              <span className="flex items-center gap-2"><FaCheckCircle />Easy Integration</span>
            </div>
          </div>
        </TechSection>
      </div>
    </div>
  );
};

export default OrderProcessing;
