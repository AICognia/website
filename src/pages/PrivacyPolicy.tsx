import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const PrivacyPolicy: React.FC = () => {
  const { language } = useLanguage();
  const lastUpdated = 'October 6, 2025';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO page="privacy" />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
          </h1>
          
          <p className="text-sm text-gray-600 mb-8">Last updated: {lastUpdated}</p>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section>
              <p className="text-gray-700 leading-relaxed">
                Welcome to CogniaAI ("we", "us", "our", "CogniaAI.com"). Your privacy is important to us. 
                This Privacy Policy explains how we collect, use, share, and protect your personal data when 
                you visit or use our website, services, or applications (collectively, the "Services"). 
                By using our Services, you agree to the collection and use of data in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Controller & Contact Information</h2>
              <div className="ml-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Controller</h3>
                  <p className="text-gray-700">
                    Cognia AI LLC<br />
                    Texas, United States<br />
                    Registered Office: Virtual
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Privacy / Data Protection Contact</h3>
                  <p className="text-gray-700">
                    Email: <a href="mailto:emrebenian@cogniaai.com" className="text-blue-600 hover:text-blue-700 underline">emrebenian@cogniaai.com</a>
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. What Data We Collect</h2>
              <p className="mb-4 text-gray-700">We may collect the following types of personal data, depending on your interaction with us:</p>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left border-b font-semibold text-gray-900">Category</th>
                      <th className="px-4 py-2 text-left border-b font-semibold text-gray-900">Data Types</th>
                      <th className="px-4 py-2 text-left border-b font-semibold text-gray-900">Source / How Collected</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Account & Identity</td>
                      <td className="px-4 py-3">Name, username, email address, password (hashed), profile info</td>
                      <td className="px-4 py-3">When you register, create an account, or update your profile</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Contact & Communication</td>
                      <td className="px-4 py-3">Email, phone number, mailing address</td>
                      <td className="px-4 py-3">When you contact us (e.g. support, feedback) or sign up for newsletters</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Usage & Analytics</td>
                      <td className="px-4 py-3">IP address, device identifiers, browser, OS, pages visited, time stamps, click behavior</td>
                      <td className="px-4 py-3">Automatically via cookies, logs, analytics tools</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Service-specific input</td>
                      <td className="px-4 py-3">Text, documents, media, prompts you submit via our AI tools or APIs</td>
                      <td className="px-4 py-3">When you use our AI, upload or input content, or interact with features</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Payment & Billing</td>
                      <td className="px-4 py-3">Payment method (partial masked), billing address, transaction history</td>
                      <td className="px-4 py-3">If you make purchases, subscribe, or upgrade features</td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">Support & Feedback</td>
                      <td className="px-4 py-3">Support tickets, chat transcripts, user comments</td>
                      <td className="px-4 py-3">When you contact our support or provide feedback</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-gray-700">We may also derive or infer additional information (e.g. usage patterns, preferred settings).</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. How We Use Your Data</h2>
              <p className="mb-4 text-gray-700">We use your personal data for the following purposes:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
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
              <p className="mt-4 text-gray-700">We will always strive to limit usage to what is necessary for these purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Legal Basis for Processing (if applicable under GDPR / UK / EU laws)</h2>
              <p className="mb-4 text-gray-700">Where applicable under European data protection law, our legal bases include:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li><strong className="font-semibold">Consent</strong> — when you explicitly opt-in (e.g. newsletters, cookies)</li>
                <li><strong className="font-semibold">Contract / Performance of a contract</strong> — to deliver Services you request</li>
                <li><strong className="font-semibold">Legitimate interests</strong> — for analytics, fraud detection, site security, improving Services (balanced with your rights)</li>
                <li><strong className="font-semibold">Legal obligation</strong> — where required by law</li>
                <li><strong className="font-semibold">Vital interests</strong> — in rare cases such as emergencies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Cookies & Tracking Technologies</h2>
              <p className="mb-4 text-gray-700">We and our partners use cookies and similar technologies (e.g. web beacons, local storage) to:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Remember your preferences and settings</li>
                <li>Provide analytics, usage statistics, and performance insights</li>
                <li>Serve targeted or contextual advertising (if relevant)</li>
                <li>Enable certain features (e.g. "remember me", auto-login)</li>
              </ul>
              <p className="mt-4 text-gray-700">
                You can manage or disable cookies via your browser or device settings, but note that disabling 
                some cookies may reduce functionality or degrade your experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Data Sharing & Disclosure</h2>
              <p className="mb-4 text-gray-700">We may share your personal data under the following circumstances:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li><strong className="font-semibold">With service providers / subprocessors</strong> — e.g. hosting, payment processors, analytics, customer support — under contract with confidentiality and data protection obligations</li>
                <li><strong className="font-semibold">Third-party APIs / integrations</strong> — if you connect third-party services to your account (you control what is shared)</li>
                <li><strong className="font-semibold">Aggregated / anonymized data</strong> — which cannot reasonably identify individuals</li>
                <li><strong className="font-semibold">Business transfers</strong> — in context of mergers, acquisitions, or sale of assets (with protections)</li>
                <li><strong className="font-semibold">Legal or regulatory requests</strong> — when required by law, court order, or to enforce rights</li>
                <li><strong className="font-semibold">To protect rights & safety</strong> — e.g. to prevent fraud, abuse, or security violations</li>
              </ul>
              <p className="mt-4 font-semibold text-gray-900">We will not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. International Transfers</h2>
              <p className="text-gray-700">
                Because we may host or process your data using cloud services or servers located in different countries 
                (e.g. United States, Turkey, EU), your data may be transferred outside your home jurisdiction. 
                Where transfers occur, we will ensure appropriate safeguards are in place (e.g. Standard Contractual Clauses, 
                EU adequacy, etc.) to protect your rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">8. Data Retention</h2>
              <p className="text-gray-700">
                We retain personal data no longer than necessary for the purposes for which it was collected or as required by law. 
                Retention periods vary by data category (e.g. account data while account is active, transactional data for tax compliance). 
                We also periodically delete, anonymize, or archive data as appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">9. Your Rights & Controls</h2>
              <p className="mb-4 text-gray-700">Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Right to access your personal data</li>
                <li>Right to rectify / correct inaccurate or incomplete data</li>
                <li>Right to delete your data (right to be forgotten), subject to legal limits</li>
                <li>Right to restrict or object to certain processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent (for consent-based processing)</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="mt-4 text-gray-700">
                You may exercise these rights by contacting us at{' '}
                <a href="mailto:emrebenian@cogniaai.com" className="text-blue-600 hover:text-blue-700 underline">emrebenian@cogniaai.com</a>. 
                We may request proof of identity before fulfilling certain requests.
              </p>
              <p className="mt-4 text-gray-700">You may also:</p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Unsubscribe from marketing emails</li>
                <li>Disable cookies and trackers (via browser settings)</li>
                <li>Delete or deactivate your account (subject to consequences for access)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">10. Security</h2>
              <p className="mb-4 text-gray-700">
                We take reasonable technical, administrative, and organizational measures designed to protect 
                your data from unauthorized access, disclosure, alteration, or destruction. These measures include:
              </p>
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li>Encryption in transit (e.g. TLS / HTTPS)</li>
                <li>Encryption or hashing of stored sensitive data (e.g. passwords)</li>
                <li>Access controls, least privilege, internal audits</li>
                <li>Regular security assessments, vulnerability scans, updates</li>
                <li>Incident response procedures and breach notification</li>
              </ul>
              <p className="mt-4 text-gray-700">
                While we strive for strong security, no system is perfect. In case of a data breach, 
                we will follow legal obligations to notify affected users and authorities.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">11. Children & Minors</h2>
              <p className="text-gray-700">
                Our Services are not intended for children under the age of 13 (or higher threshold under local law). 
                We do not knowingly collect personal data from children without parental consent. 
                If you believe we have collected data from a minor, please contact us to request deletion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">12. Third-Party Links & Embedded Content</h2>
              <p className="text-gray-700">
                Our Services may include links to external websites, embedded content, or third-party services 
                (e.g. social media, analytics, maps). We are not responsible for the privacy practices of those 
                external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">13. Changes to the Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time to reflect changes in practices, features, 
                legal requirements, or new technology. We will post the updated policy on our website with a new 
                "Last updated" date and, where appropriate, notify you (e.g. via email). Your continued use after 
                modifications means you accept the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">14. Disclaimer & Liability</h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, we disclaim liability for losses, damages, or claims 
                arising from the use (or inability to use) the Services or third-party links, except where 
                liability cannot be excluded under applicable law. This policy does not create contractual 
                rights beyond those in our Terms of Use.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600">
                  For any questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <a 
                  href="mailto:emrebenian@cogniaai.com" 
                  className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Privacy Team
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
