import React from 'react';
import { FaCheckCircle, FaShoppingCart, FaBox, FaCreditCard, FaPhone, FaTruck, FaUndo, FaClipboardList, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import DynamicTechBackground from '../../components/DynamicTechBackground';
import TechSection from '../../components/TechSection';
import TechCard from '../../components/TechCard';
import ScrollProgress from '../../components/ScrollProgress';

const OrderProcessing: React.FC = () => {

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ScrollProgress />

      <div className="fixed inset-0 z-0">
        <DynamicTechBackground />
      </div>

      <div className="relative z-10">
        <SEO page="solutions" />

        <section className="relative py-32">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                <span className="text-xs text-gray-400 uppercase tracking-widest">Use Case</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                Order Processing
                <br />
                Automated Order Management
              </h1>

              <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
                Streamline order taking, status updates, and returns. Handle customer orders via phone with automated processing and real-time inventory checks.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/demo"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
                >
                  <FaCalendarCheck />
                  Schedule Demo
                  <FaArrowRight className="text-sm" />
                </Link>
                <a
                  href="tel:+16163263328"
                  className="flex items-center justify-center gap-3 px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
                >
                  <FaPhone className="text-sm" />
                  +1 616-326-3328
                </a>
              </div>
            </div>
          </div>
        </section>

        <TechSection
          badge="Features"
          title="Complete Order Management Solution"
          subtitle="From order placement to delivery tracking"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="text-2xl text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
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
          <div className="max-w-6xl mx-auto">
            <TechCard>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">E-Commerce Platforms</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Shopify, WooCommerce, Magento</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>BigCommerce, Salesforce Commerce</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Custom e-commerce solutions</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-4">Order Management</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Inventory management systems</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
                      <FaCheckCircle className="flex-shrink-0 mt-0.5 text-white" />
                      <span>Shipping and logistics platforms</span>
                    </li>
                    <li className="flex items-start gap-2 text-gray-300 text-sm">
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: '35%', label: 'More Phone Orders', suffix: '↑' },
              { value: '24/7', label: 'Order Taking', suffix: '' },
              { value: '98%', label: 'Order Accuracy', suffix: '' },
              { value: '50%', label: 'Faster Processing', suffix: '↑' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  {stat.value}
                  {stat.suffix && <span className="text-2xl ml-1">{stat.suffix}</span>}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </TechSection>

        <TechSection
          badge="Get Started"
          title="Ready to Automate Order Processing?"
          subtitle="Handle more orders with zero errors"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                to="/demo"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg font-semibold rounded-xl transition-all shadow-lg shadow-cyan-500/25"
              >
                <FaCalendarCheck />
                Schedule Demo
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                to="/industries/retail"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 text-white text-lg font-medium rounded-md transition-colors"
              >
                Retail Solutions
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-500">
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
