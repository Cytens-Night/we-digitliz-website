import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | wedigitlize',
  description: 'Terms of Service for wedigitlize',
};

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-[#1d1d1f] dark:text-white">Terms of Service</h1>
      
      <div className="space-y-8 text-[#3c3c43] dark:text-white/70 leading-relaxed text-lg">
        <section>
          <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
          <p>
            These Terms of Service ("Terms") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and WEDIGITLIZE LTD ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">1. Agreement to Terms</h2>
          <p>
            By accessing the Site, you agree that you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms, then you are expressly prohibited from using the Site and you must discontinue use immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights and unfair competition laws.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">3. User Representations</h2>
          <p>
            By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script, or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">4. Modifications and Interruptions</h2>
          <p>
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">5. Governing Law</h2>
          <p>
            These Terms shall be governed by and defined following the laws of the United Kingdom. WEDIGITLIZE LTD and yourself irrevocably consent that the courts of the United Kingdom shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
          </p>
        </section>
      </div>
    </div>
  );
}
