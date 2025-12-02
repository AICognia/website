import React, { useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';
import DynamicTechBackground from '../components/DynamicTechBackground';
import TechSection from '../components/TechSection';
import TechCard from '../components/TechCard';
import ScrollProgress from '../components/ScrollProgress';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();
  const lastUpdated = 'October 6, 2025';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO page="privacy" />
      <ScrollProgress />

      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="fixed inset-0 z-0">
          <DynamicTechBackground />
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative py-32">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-6">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">
                    {language === 'tr' ? 'Gizlilik' : 'Privacy'}
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin text-white mb-6">
                  {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
                </h1>

                <p className="text-sm text-gray-400">
                  Last updated: <span className="text-gray-300">{lastUpdated}</span>
                </p>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <TechSection>
            <div className="max-w-5xl mx-auto">
              <TechCard>
                <div className="space-y-10">
                {/* Introduction */}
                <section>
                  <p className="text-gray-400 font-light leading-relaxed">
                    Welcome to CogniaAI ("we", "us", "our", "CogniaAI.com"). Your privacy is important to us.
                    This Privacy Policy explains how we collect, use, share, and protect your personal data when
                    you visit or use our website, services, or applications (collectively, the "Services").
                    By using our Services, you agree to the collection and use of data in accordance with this policy.
                  </p>
                </section>

                {/* 1. Controller & Contact Information */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">1.</span> Controller & Contact Information
                  </h2>
                  <div className="ml-8 space-y-6">
                    <TechCard glowColor="blue" hoverable={false}>
                      <h3 className="font-semibold text-white mb-3">Data Controller</h3>
                      <p className="text-gray-400 font-light">
                        Cognia AI LLC<br />
                        Texas, United States<br />
                        Registered Office: Virtual
                      </p>
                    </TechCard>

                    <TechCard glowColor="purple" hoverable={false}>
                      <h3 className="font-semibold text-white mb-3">Privacy / Data Protection Contact</h3>
                      <p className="text-gray-400 font-light">
                        Email: <a href="mailto:emrebenian@cogniaai.com" className="text-purple-400 hover:text-purple-300 underline">emrebenian@cogniaai.com</a>
                      </p>
                    </TechCard>
                  </div>
                </section>

                {/* 2. What Data We Collect */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">2.</span> What Data We Collect
                  </h2>
                  <p className="mb-6 text-gray-400 font-light">We may collect the following types of personal data, depending on your interaction with us:</p>

                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Data Types</th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-cyan-400 uppercase tracking-wider">Source / How Collected</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        <tr className="hover:bg-black/30 transition-colors">
                          <td className="px-4 py-4 text-sm font-semibold text-white">Account & Identity</td>
                          <td className="px-4 py-4 text-sm text-gray-400">Name, username, email address, password (hashed), profile info</td>
                          <td className="px-4 py-4 text-sm text-gray-500">When you register, create an account, or update your profile</td>
                        </tr>
                        <tr className="hover:bg-black/30 transition-colors">
                          <td className="px-4 py-4 text-sm font-semibold text-white">Contact & Communication</td>
                          <td className="px-4 py-4 text-sm text-gray-400">Email, phone number, mailing address</td>
                          <td className="px-4 py-4 text-sm text-gray-500">When you contact us (e.g. support, feedback) or sign up for newsletters</td>
                        </tr>
                        <tr className="hover:bg-black/30 transition-colors">
                          <td className="px-4 py-4 text-sm font-semibold text-white">Usage & Analytics</td>
                          <td className="px-4 py-4 text-sm text-gray-400">IP address, device identifiers, browser, OS, pages visited, time stamps, click behavior</td>
                          <td className="px-4 py-4 text-sm text-gray-500">Automatically via cookies, logs, analytics tools</td>
                        </tr>
                        <tr className="hover:bg-black/30 transition-colors">
                          <td className="px-4 py-4 text-sm font-semibold text-white">Service-specific input</td>
                          <td className="px-4 py-4 text-sm text-gray-400">Text, documents, media, prompts you submit via our AI tools or APIs</td>
                          <td className="px-4 py-4 text-sm text-gray-500">When you use our AI, upload or input content, or interact with features</td>
                        </tr>
                        <tr className="hover:bg-black/30 transition-colors">
                          <td className="px-4 py-4 text-sm font-semibold text-white">Payment & Billing</td>
                          <td className="px-4 py-4 text-sm text-gray-400">Payment method (partial masked), billing address, transaction history</td>
                          <td className="px-4 py-4 text-sm text-gray-500">If you make purchases, subscribe, or upgrade features</td>
                        </tr>
                        <tr className="hover:bg-black/30 transition-colors">
                          <td className="px-4 py-4 text-sm font-semibold text-white">Support & Feedback</td>
                          <td className="px-4 py-4 text-sm text-gray-400">Support tickets, chat transcripts, user comments</td>
                          <td className="px-4 py-4 text-sm text-gray-500">When you contact our support or provide feedback</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-gray-400 font-light">We may also derive or infer additional information (e.g. usage patterns, preferred settings).</p>
                </section>

                {/* 3. How We Use Your Data */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">3.</span> How We Use Your Data
                  </h2>
                  <p className="mb-4 text-gray-400 font-light">We use your personal data for the following purposes:</p>
                  <ul className="list-disc ml-8 space-y-2 text-gray-400 font-light">
                    <li>To provide, maintain, improve, and operate our Services</li>
                    <li>To verify your identity, manage user accounts, and authenticate logins</li>
                    <li>To process payments, manage billing, subscriptions, and refunds</li>
                    <li>To communicate with you (email newsletters, announcements, support)</li>
                    <li>To analyze usage, detect anomalies, understand trends, and optimize performance</li>
                    <li>To personalize content, features, and recommendations</li>
                    <li>To enforce our Terms of Use, prevent fraud or misuse, and protect security</li>
                    <li>To comply with legal obligations and respond to lawful requests</li>
                    <li>For internal research and development purposes</li>
                  </ul>
                  <p className="mt-4 text-gray-400 font-light">We will always strive to limit usage to what is necessary for these purposes.</p>
                </section>

                {/* 4. Legal Basis for Processing */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">4.</span> Legal Basis for Processing (if applicable under GDPR / UK / EU laws)
                  </h2>
                  <p className="mb-4 text-gray-400 font-light">Where applicable under European data protection law, our legal bases include:</p>
                  <ul className="list-disc ml-8 space-y-2 text-gray-400 font-light">
                    <li><strong className="font-semibold text-white">Consent</strong> — when you explicitly opt-in (e.g. newsletters, cookies)</li>
                    <li><strong className="font-semibold text-white">Contract / Performance of a contract</strong> — to deliver Services you request</li>
                    <li><strong className="font-semibold text-white">Legitimate interests</strong> — for analytics, fraud detection, site security, improving Services (balanced with your rights)</li>
                    <li><strong className="font-semibold text-white">Legal obligation</strong> — where required by law</li>
                    <li><strong className="font-semibold text-white">Vital interests</strong> — in rare cases such as emergencies</li>
                  </ul>
                </section>

                {/* 5. Cookies & Tracking Technologies */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">5.</span> Cookies & Tracking Technologies
                  </h2>
                  <p className="mb-4 text-gray-400 font-light">We and our partners use cookies and similar technologies (e.g. web beacons, local storage) to:</p>
                  <ul className="list-disc ml-8 space-y-2 text-gray-400 font-light">
                    <li>Remember your preferences and settings</li>
                    <li>Provide analytics, usage statistics, and performance insights</li>
                    <li>Serve targeted or contextual advertising (if relevant)</li>
                    <li>Enable certain features (e.g. "remember me", auto-login)</li>
                  </ul>
                  <p className="mt-4 text-gray-400 font-light">
                    You can manage or disable cookies via your browser or device settings, but note that disabling
                    some cookies may reduce functionality or degrade your experience.
                  </p>
                </section>

                {/* 6. Data Sharing & Disclosure */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">6.</span> Data Sharing & Disclosure
                  </h2>
                  <p className="mb-4 text-gray-400 font-light">We may share your personal data under the following circumstances:</p>
                  <ul className="list-disc ml-8 space-y-2 text-gray-400 font-light">
                    <li><strong className="font-semibold text-white">With service providers / subprocessors</strong> — e.g. hosting, payment processors, analytics, customer support — under contract with confidentiality and data protection obligations</li>
                    <li><strong className="font-semibold text-white">Third-party APIs / integrations</strong> — if you connect third-party services to your account (you control what is shared)</li>
                    <li><strong className="font-semibold text-white">Aggregated / anonymized data</strong> — which cannot reasonably identify individuals</li>
                    <li><strong className="font-semibold text-white">Business transfers</strong> — in context of mergers, acquisitions, or sale of assets (with protections)</li>
                    <li><strong className="font-semibold text-white">Legal or regulatory requests</strong> — when required by law, court order, or to enforce rights</li>
                    <li><strong className="font-semibold text-white">To protect rights & safety</strong> — e.g. to prevent fraud, abuse, or security violations</li>
                  </ul>
                  <p className="mt-4 text-cyan-400 font-semibold">We will not sell your personal information to third parties.</p>
                </section>

                {/* 7. International Transfers */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">7.</span> International Transfers
                  </h2>
                  <p className="text-gray-400 font-light">
                    Because we may host or process your data using cloud services or servers located in different countries
                    (e.g. United States, Turkey, EU), your data may be transferred outside your home jurisdiction.
                    Where transfers occur, we will ensure appropriate safeguards are in place (e.g. Standard Contractual Clauses,
                    EU adequacy, etc.) to protect your rights.
                  </p>
                </section>

                {/* 8. Data Retention */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">8.</span> Data Retention
                  </h2>
                  <p className="text-gray-400 font-light">
                    We retain personal data no longer than necessary for the purposes for which it was collected or as required by law.
                    Retention periods vary by data category (e.g. account data while account is active, transactional data for tax compliance).
                    We also periodically delete, anonymize, or archive data as appropriate.
                  </p>
                </section>

                {/* 9. Your Rights & Controls */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">9.</span> Your Rights & Controls
                  </h2>
                  <p className="mb-4 text-gray-400 font-light">Depending on your jurisdiction, you may have the following rights:</p>
                  <ul className="list-disc ml-8 space-y-2 text-gray-400 font-light">
                    <li>Right to access your personal data</li>
                    <li>Right to rectify / correct inaccurate or incomplete data</li>
                    <li>Right to delete your data (right to be forgotten), subject to legal limits</li>
                    <li>Right to restrict or object to certain processing</li>
                    <li>Right to data portability</li>
                    <li>Right to withdraw consent (for consent-based processing)</li>
                    <li>Right to lodge a complaint with a supervisory authority</li>
                  </ul>
                  <p className="mt-4 text-gray-400 font-light">
                    You may exercise these rights by contacting us at{' '}
                    <a href="mailto:emrebenian@cogniaai.com" className="text-cyan-400 hover:text-cyan-300 underline">emrebenian@cogniaai.com</a>.
                    We may request proof of identity before fulfilling certain requests.
                  </p>
                  <p className="mt-4 text-gray-400 font-light">You may also:</p>
                  <ul className="list-disc ml-8 space-y-2 text-gray-400 font-light">
                    <li>Unsubscribe from marketing emails</li>
                    <li>Disable cookies and trackers (via browser settings)</li>
                    <li>Delete or deactivate your account (subject to consequences for access)</li>
                  </ul>
                </section>

                {/* 10. Security */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">10.</span> Security
                  </h2>
                  <p className="mb-4 text-gray-400 font-light">
                    We take reasonable technical, administrative, and organizational measures designed to protect
                    your data from unauthorized access, disclosure, alteration, or destruction. These measures include:
                  </p>
                  <ul className="list-disc ml-8 space-y-2 text-gray-400 font-light">
                    <li>Encryption in transit (e.g. TLS / HTTPS)</li>
                    <li>Encryption or hashing of stored sensitive data (e.g. passwords)</li>
                    <li>Access controls, least privilege, internal audits</li>
                    <li>Regular security assessments, vulnerability scans, updates</li>
                    <li>Incident response procedures and breach notification</li>
                  </ul>
                  <p className="mt-4 text-gray-400 font-light">
                    While we strive for strong security, no system is perfect. In case of a data breach,
                    we will follow legal obligations to notify affected users and authorities.
                  </p>
                </section>

                {/* 11. Children & Minors */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">11.</span> Children & Minors
                  </h2>
                  <p className="text-gray-400 font-light">
                    Our Services are not intended for children under the age of 13 (or higher threshold under local law).
                    We do not knowingly collect personal data from children without parental consent.
                    If you believe we have collected data from a minor, please contact us to request deletion.
                  </p>
                </section>

                {/* 12. Third-Party Links & Embedded Content */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">12.</span> Third-Party Links & Embedded Content
                  </h2>
                  <p className="text-gray-400 font-light">
                    Our Services may include links to external websites, embedded content, or third-party services
                    (e.g. social media, analytics, maps). We are not responsible for the privacy practices of those
                    external sites. We encourage you to review their privacy policies.
                  </p>
                </section>

                {/* 13. Changes to the Privacy Policy */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">13.</span> Changes to the Privacy Policy
                  </h2>
                  <p className="text-gray-400 font-light">
                    We may update this Privacy Policy from time to time to reflect changes in practices, features,
                    legal requirements, or new technology. We will post the updated policy on our website with a new
                    "Last updated" date and, where appropriate, notify you (e.g. via email). Your continued use after
                    modifications means you accept the revised policy.
                  </p>
                </section>

                {/* 14. Disclaimer & Liability */}
                <section>
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-cyan-400">14.</span> Disclaimer & Liability
                  </h2>
                  <p className="text-gray-400 font-light">
                    To the maximum extent permitted by law, we disclaim liability for losses, damages, or claims
                    arising from the use (or inability to use) the Services or third-party links, except where
                    liability cannot be excluded under applicable law. This policy does not create contractual
                    rights beyond those in our Terms of Use.
                  </p>
                </section>

                {/* Contact Section */}
                <section className="mt-12 pt-8 border-t border-gray-700">
                  <div className="text-center">
                    <p className="text-gray-400 font-light mb-6">
                      For any questions or concerns about this Privacy Policy, please contact us at:
                    </p>
                    <a
                      href="mailto:emrebenian@cogniaai.com"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                    >
                      <FaEnvelope />
                      <span>Contact Privacy Team</span>
                    </a>
                  </div>
                </section>
                </div>
              </TechCard>
            </div>
          </TechSection>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;