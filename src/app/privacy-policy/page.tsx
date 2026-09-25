import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | wedigitlize',
  description: 'Privacy Policy for wedigitlize',
};

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-[#1d1d1f] dark:text-white">Privacy Policy</h1>
      
      <div className="space-y-8 text-[#3c3c43] dark:text-white/70 leading-relaxed text-lg">
        <section>
          <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
          <p>
            Welcome to wedigitlize ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">1. Information We Collect</h2>
          <p className="mb-4">
            We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Personal Information Provided by You:</strong> We collect names, phone numbers, email addresses, contact preferences, and other similar information.</li>
            <li><strong>Information Automatically Collected:</strong> We automatically collect certain information when you visit, use, or navigate the Website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Website, and other technical information.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">2. How We Use Your Information</h2>
          <p className="mb-4">
            We process your information for purposes based on legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent. We use the information we collect or receive to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Facilitate account creation and logon process.</li>
            <li>Send you marketing and promotional communications.</li>
            <li>Fulfill and manage your orders and requests.</li>
            <li>Administer prize draws and competitions.</li>
            <li>Deliver targeted advertising to you.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">3. Will Your Information Be Shared With Anyone?</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">4. Cookies and Other Tracking Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <a href="/cookie-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Cookie Policy</a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">5. Contact Us</h2>
          <p>
            If you have questions or comments about this notice, you may email us at info@wedigitlize.com or by post to:<br/><br/>
            <strong>WEDIGITLIZE LTD</strong><br/>
            Company number 17465598<br/>
            United Kingdom
          </p>
        </section>
      </div>
    </div>
  );
}
