import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy | wedigitlize',
  description: 'Cookie Policy for wedigitlize',
};

export default function CookiePolicy() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-[#1d1d1f] dark:text-white">Cookie Policy</h1>
      
      <div className="space-y-8 text-[#3c3c43] dark:text-white/70 leading-relaxed text-lg">
        <section>
          <p className="mb-4">Last updated: {new Date().toLocaleDateString('en-GB')}</p>
          <p>
            This Cookie Policy explains how WEDIGITLIZE LTD ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">1. What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">2. Why do we use cookies?</h2>
          <p className="mb-4">
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our online properties. Third parties serve cookies through our website for advertising, analytics, and other purposes.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">3. Types of cookies we use</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.
            </li>
            <li>
              <strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.
            </li>
            <li>
              <strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">4. How can I control cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[#1d1d1f] dark:text-white">5. Updates to this Cookie Policy</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
        </section>
      </div>
    </div>
  );
}
