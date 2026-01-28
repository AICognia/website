'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FaShieldAlt,
  FaDatabase,
  FaCog,
  FaBalanceScale,
  FaCookieBite,
  FaShareAlt,
  FaGlobeAmericas,
  FaClock,
  FaUserShield,
  FaLock,
  FaChild,
  FaExternalLinkAlt,
  FaFileAlt,
  FaExclamationTriangle,
  FaEnvelope,
  FaArrowRight
} from 'react-icons/fa'
import SEO from '../components/SEO'
import HeroBackgroundGrid from '../components/HeroBackgroundGrid'
import MobileHeroBackground from '../components/MobileHeroBackground'

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = 'October 6, 2025'

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const glassBlur = 22

  const glassStyle = {
    borderWidth: '0.5px',
    background: 'var(--hero-glass-bg)',
    backdropFilter: `blur(${glassBlur}px)`,
    WebkitBackdropFilter: `blur(${glassBlur}px)`,
    boxShadow: 'var(--hero-glass-shadow)',
  }

  const sections = [
    {
      id: 1,
      icon: FaShieldAlt,
      title: 'Controller & Contact Information',
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-gray-800/50 dark:border-gray-700">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-gray-100">Data Controller</h4>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Cognia AI LLC<br />
              Texas, United States<br />
              Registered Office: Virtual
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-gray-800/50 dark:border-gray-700">
            <h4 className="font-semibold mb-2 text-slate-900 dark:text-gray-100">Privacy / Data Protection Contact</h4>
            <p className="text-sm text-slate-600 dark:text-gray-400">
              Email: <a href="mailto:emrebenian@cogniaai.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">emrebenian@cogniaai.com</a>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: FaDatabase,
      title: 'What Data We Collect',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-gray-400">
            We may collect the following types of personal data, depending on your interaction with us:
          </p>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-gray-700">
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Category</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Data Types</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider hidden md:table-cell text-blue-600 dark:text-blue-400">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-gray-700">
                {[
                  { cat: 'Account & Identity', data: 'Name, username, email address, password (hashed), profile info', src: 'When you register, create an account, or update your profile' },
                  { cat: 'Contact & Communication', data: 'Email, phone number, mailing address', src: 'When you contact us or sign up for newsletters' },
                  { cat: 'Usage & Analytics', data: 'IP address, device identifiers, browser, OS, pages visited, timestamps', src: 'Automatically via cookies, logs, analytics tools' },
                  { cat: 'Service Input', data: 'Text, documents, media, prompts you submit', src: 'When you use our AI tools or APIs' },
                  { cat: 'Payment & Billing', data: 'Payment method (masked), billing address, transaction history', src: 'If you make purchases or subscribe' },
                  { cat: 'Support & Feedback', data: 'Support tickets, chat transcripts, user comments', src: 'When you contact support or provide feedback' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-3 py-3 font-medium text-slate-800 dark:text-gray-200">{row.cat}</td>
                    <td className="px-3 py-3 text-slate-600 dark:text-gray-400">{row.data}</td>
                    <td className="px-3 py-3 hidden md:table-cell text-slate-500 dark:text-gray-500">{row.src}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-slate-500 dark:text-gray-500">
            We may also derive or infer additional information (e.g. usage patterns, preferred settings).
          </p>
        </div>
      )
    },
    {
      id: 3,
      icon: FaCog,
      title: 'How We Use Your Data',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-gray-400">
            We use your personal data for the following purposes:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
            {[
              'To provide, maintain, improve, and operate our Services',
              'To verify your identity, manage user accounts, and authenticate logins',
              'To process payments, manage billing, subscriptions, and refunds',
              'To communicate with you (email newsletters, announcements, support)',
              'To analyze usage, detect anomalies, understand trends, and optimize performance',
              'To personalize content, features, and recommendations',
              'To enforce our Terms of Use, prevent fraud or misuse, and protect security',
              'To comply with legal obligations and respond to lawful requests',
              'For internal research and development purposes'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500 dark:bg-blue-400" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500 dark:text-gray-500">
            We will always strive to limit usage to what is necessary for these purposes.
          </p>
        </div>
      )
    },
    {
      id: 4,
      icon: FaBalanceScale,
      title: 'Legal Basis for Processing',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-gray-400">
            Where applicable under European data protection law, our legal bases include:
          </p>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-gray-400">
            {[
              { term: 'Consent', desc: 'when you explicitly opt-in (e.g. newsletters, cookies)' },
              { term: 'Contract / Performance of a contract', desc: 'to deliver Services you request' },
              { term: 'Legitimate interests', desc: 'for analytics, fraud detection, site security, improving Services (balanced with your rights)' },
              { term: 'Legal obligation', desc: 'where required by law' },
              { term: 'Vital interests', desc: 'in rare cases such as emergencies' }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500 dark:bg-blue-400" />
                <span><strong className="text-slate-800 dark:text-gray-200">{item.term}</strong> — {item.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 5,
      icon: FaCookieBite,
      title: 'Cookies & Tracking Technologies',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-gray-400">
            We and our partners use cookies and similar technologies (e.g. web beacons, local storage) to:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
            {[
              'Remember your preferences and settings',
              'Provide analytics, usage statistics, and performance insights',
              'Serve targeted or contextual advertising (if relevant)',
              'Enable certain features (e.g. "remember me", auto-login)'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500 dark:bg-blue-400" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500 dark:text-gray-500">
            You can manage or disable cookies via your browser or device settings, but note that disabling some cookies may reduce functionality or degrade your experience.
          </p>
        </div>
      )
    },
    {
      id: 6,
      icon: FaShareAlt,
      title: 'Data Sharing & Disclosure',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-gray-400">
            We may share your personal data under the following circumstances:
          </p>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-gray-400">
            {[
              { term: 'With service providers / subprocessors', desc: 'e.g. hosting, payment processors, analytics, customer support — under contract with confidentiality and data protection obligations' },
              { term: 'Third-party APIs / integrations', desc: 'if you connect third-party services to your account (you control what is shared)' },
              { term: 'Aggregated / anonymized data', desc: 'which cannot reasonably identify individuals' },
              { term: 'Business transfers', desc: 'in context of mergers, acquisitions, or sale of assets (with protections)' },
              { term: 'Legal or regulatory requests', desc: 'when required by law, court order, or to enforce rights' },
              { term: 'To protect rights & safety', desc: 'e.g. to prevent fraud, abuse, or security violations' }
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500 dark:bg-blue-400" />
                <span><strong className="text-slate-800 dark:text-gray-200">{item.term}</strong> — {item.desc}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            We will not sell your personal information to third parties.
          </p>
        </div>
      )
    },
    {
      id: 7,
      icon: FaGlobeAmericas,
      title: 'International Transfers',
      content: (
        <p className="text-sm text-slate-600 dark:text-gray-400">
          Because we may host or process your data using cloud services or servers located in different countries (e.g. United States, Turkey, EU), your data may be transferred outside your home jurisdiction. Where transfers occur, we will ensure appropriate safeguards are in place (e.g. Standard Contractual Clauses, EU adequacy, etc.) to protect your rights.
        </p>
      )
    },
    {
      id: 8,
      icon: FaClock,
      title: 'Data Retention',
      content: (
        <p className="text-sm text-slate-600 dark:text-gray-400">
          We retain personal data no longer than necessary for the purposes for which it was collected or as required by law. Retention periods vary by data category (e.g. account data while account is active, transactional data for tax compliance). We also periodically delete, anonymize, or archive data as appropriate.
        </p>
      )
    },
    {
      id: 9,
      icon: FaUserShield,
      title: 'Your Rights & Controls',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-gray-400">
            Depending on your jurisdiction, you may have the following rights:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
            {[
              'Right to access your personal data',
              'Right to rectify / correct inaccurate or incomplete data',
              'Right to delete your data (right to be forgotten), subject to legal limits',
              'Right to restrict or object to certain processing',
              'Right to data portability',
              'Right to withdraw consent (for consent-based processing)',
              'Right to lodge a complaint with a supervisory authority'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500 dark:bg-blue-400" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 dark:text-gray-400">
            You may exercise these rights by contacting us at{' '}
            <a href="mailto:emrebenian@cogniaai.com" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">emrebenian@cogniaai.com</a>.
            We may request proof of identity before fulfilling certain requests.
          </p>
          <p className="text-sm text-slate-500 dark:text-gray-500">
            You may also: Unsubscribe from marketing emails, disable cookies and trackers (via browser settings), delete or deactivate your account (subject to consequences for access).
          </p>
        </div>
      )
    },
    {
      id: 10,
      icon: FaLock,
      title: 'Security',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-gray-400">
            We take reasonable technical, administrative, and organizational measures designed to protect your data from unauthorized access, disclosure, alteration, or destruction. These measures include:
          </p>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-gray-400">
            {[
              'Encryption in transit (e.g. TLS / HTTPS)',
              'Encryption or hashing of stored sensitive data (e.g. passwords)',
              'Access controls, least privilege, internal audits',
              'Regular security assessments, vulnerability scans, updates',
              'Incident response procedures and breach notification'
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-blue-500 dark:bg-blue-400" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-500 dark:text-gray-500">
            While we strive for strong security, no system is perfect. In case of a data breach, we will follow legal obligations to notify affected users and authorities.
          </p>
        </div>
      )
    },
    {
      id: 11,
      icon: FaChild,
      title: 'Children & Minors',
      content: (
        <p className="text-sm text-slate-600 dark:text-gray-400">
          Our Services are not intended for children under the age of 13 (or higher threshold under local law). We do not knowingly collect personal data from children without parental consent. If you believe we have collected data from a minor, please contact us to request deletion.
        </p>
      )
    },
    {
      id: 12,
      icon: FaExternalLinkAlt,
      title: 'Third-Party Links & Embedded Content',
      content: (
        <p className="text-sm text-slate-600 dark:text-gray-400">
          Our Services may include links to external websites, embedded content, or third-party services (e.g. social media, analytics, maps). We are not responsible for the privacy practices of those external sites. We encourage you to review their privacy policies.
        </p>
      )
    },
    {
      id: 13,
      icon: FaFileAlt,
      title: 'Changes to the Privacy Policy',
      content: (
        <p className="text-sm text-slate-600 dark:text-gray-400">
          We may update this Privacy Policy from time to time to reflect changes in practices, features, legal requirements, or new technology. We will post the updated policy on our website with a new "Last updated" date and, where appropriate, notify you (e.g. via email). Your continued use after modifications means you accept the revised policy.
        </p>
      )
    },
    {
      id: 14,
      icon: FaExclamationTriangle,
      title: 'Disclaimer & Liability',
      content: (
        <p className="text-sm text-slate-600 dark:text-gray-400">
          To the maximum extent permitted by law, we disclaim liability for losses, damages, or claims arising from the use (or inability to use) the Services or third-party links, except where liability cannot be excluded under applicable law. This policy does not create contractual rights beyond those in our Terms of Use.
        </p>
      )
    }
  ]

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <SEO page="privacy" />

      {/* Hero Section - Mobile */}
      <section className="lg:hidden relative overflow-hidden transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="absolute inset-0">
          <MobileHeroBackground />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'var(--hero-gradient-mobile)',
          }}
        />
        <div className="relative z-10 px-5 pt-24 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-5"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 dark:bg-blue-500/20 dark:border-blue-400/30">
              <FaShieldAlt className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300">Privacy</span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-[1.875rem] leading-[1.15] font-serif font-light tracking-tight mb-4 text-slate-900 dark:text-white"
          >
            Privacy{' '}
            <span className="text-blue-600 dark:text-blue-400">Policy</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-sm mb-4 text-slate-500 dark:text-gray-400"
          >
            Last updated: {lastUpdated}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-base leading-relaxed text-slate-600 dark:text-gray-300"
          >
            Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal data.
          </motion.p>
        </div>
      </section>

      {/* Hero Section - Desktop */}
      <section className="hidden lg:flex min-h-[50vh] flex-col items-center overflow-hidden relative mb-0 pt-0 select-none transition-colors duration-300 bg-gray-900 dark:bg-gray-900 light:bg-white" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <HeroBackgroundGrid isPlaying={false} />
        <div className="absolute inset-0 bg-gradient-to-b via-transparent pointer-events-none from-white/10 to-white dark:from-gray-900/10 dark:to-gray-900" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent pointer-events-none from-white via-white/40 dark:from-gray-900 dark:via-gray-900/40" />
        <div
          className="absolute inset-y-0 left-0 w-[65%] pointer-events-none z-[5]"
          style={{
            background: 'var(--hero-radial-desktop)',
          }}
        />
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10 flex-1 flex items-center justify-center pt-16 lg:pt-24 pb-16">
          <motion.div
            className="max-w-3xl text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-8 mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 dark:bg-none dark:bg-blue-900/40 dark:border-blue-500/30"
              style={{
                boxShadow: 'var(--hero-badge-shadow)',
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <FaShieldAlt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-400">
                Privacy
              </span>
            </motion.div>

            <h1 className="text-5xl xl:text-6xl 2xl:text-7xl font-serif font-light leading-[1.08] mb-6 text-slate-900 dark:text-gray-100">
              Privacy{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-500">
                Policy
              </span>
            </h1>

            <p className="text-sm mb-6 text-slate-500 dark:text-gray-500">
              Last updated: {lastUpdated}
            </p>

            <p className="text-xl max-w-2xl mx-auto leading-relaxed text-slate-600 dark:text-gray-400">
              Welcome to CogniaAI. Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal data when you visit or use our website, services, or applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="space-y-6 sm:space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-2xl border p-6 sm:p-8 border-slate-200 dark:border-gray-700"
                  style={glassStyle}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                        {section.id}.
                      </span>
                      <h2 className="text-xl sm:text-2xl font-serif font-normal text-slate-900 dark:text-gray-100">
                        {section.title}
                      </h2>
                    </div>
                  </div>
                  <div className="ml-0 sm:ml-14">
                    {section.content}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 rounded-2xl border p-8 sm:p-12 text-center border-slate-200 dark:border-gray-700"
            style={glassStyle}
          >
            <h2 className="text-2xl sm:text-3xl font-serif font-light mb-4 text-slate-900 dark:text-gray-100">
              Questions About Privacy?
            </h2>
            <p className="text-base max-w-xl mx-auto mb-6 text-slate-600 dark:text-gray-400">
              For any questions or concerns about this Privacy Policy, please contact our privacy team.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="mailto:emrebenian@cogniaai.com"
                className="btn-primary h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base w-full sm:w-auto"
              >
                <FaEnvelope />
                <span>Contact Privacy Team</span>
              </a>
              <Link
                href="/contact"
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl flex items-center justify-center gap-2 text-base border transition-colors w-full sm:w-auto border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <span>General Contact</span>
                <FaArrowRight className="text-sm" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy
