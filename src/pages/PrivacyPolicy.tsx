import React from 'react';
import { SEO } from '../components/SEO';
import { ShieldCheck, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Privacy Policy | Eman Fatima Portfolio"
        description="Official privacy policy for Eman Fatima's personal portfolio website covering data collection, handling, and security."
        canonicalUrl="https://emanfatimaportfolio.vercel.app/privacy-policy"
      />

      <section className="pt-16 pb-12 border-b border-[#202020]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
            <ShieldCheck className="w-4 h-4" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
          <p className="text-sm text-[#888888]">Last Updated: November 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-[#B3B3B3] text-sm sm:text-base leading-relaxed">
          {/* Section 1: Introduction */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p>
              This Privacy Policy explains how Eman Fatima ("we", "our", or "the portfolio") collects, uses, and safeguards
              information when you visit the official portfolio website hosted at https://emanfatimaportfolio.vercel.app. We
              are dedicated to protecting your privacy and ensuring transparent information practices.
            </p>
          </div>

          {/* Section 2: Information We Collect */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Information We Collect</h2>
            <p>
              We collect information that you voluntarily choose to submit through our website's contact form. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#888888]">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Subject line of your inquiry</li>
              <li>Message content provided in communication</li>
            </ul>
            <p>
              We do not collect sensitive financial information, government identification numbers, or unauthorized location
              telemetry.
            </p>
          </div>

          {/* Section 3: How Information Is Used */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. How Information Is Used</h2>
            <p>The information submitted is used solely for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#888888]">
              <li>Reviewing and responding to collaboration inquiries, questions, or opportunities.</li>
              <li>Maintaining professional correspondence regarding social media or digital marketing projects.</li>
              <li>Preventing automated spam and protecting the integrity of the website.</li>
            </ul>
            <p>We do not sell, rent, or trade your contact details with commercial marketing brokers.</p>
          </div>

          {/* Section 4: Cookies and Analytics */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. Cookies and Analytics</h2>
            <p>
              This personal website is designed to be lightweight and respectful of your browsing privacy. We do not deploy
              intrusive third-party tracking pixels, cross-site profiling cookies, or invasive behavioral ad networks. Essential
              local storage is utilized strictly for technical preferences, session persistence, and cached portfolio information.
            </p>
          </div>

          {/* Section 5: Data Security */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. Data Security</h2>
            <p>
              We implement industry-standard security protocols, including Transport Layer Security (HTTPS/TLS) encryption for
              all data in transit, encrypted database storage with Row Level Security (RLS) via Supabase, and role-based
              authentication. Only authorized administrators have access to view submitted contact messages.
            </p>
          </div>

          {/* Section 6: Third-Party Services */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Third-Party Services</h2>
            <p>
              Our website is hosted on Vercel and connects with Supabase for secure cloud database services. These enterprise
              infrastructure providers maintain independent security compliance and data handling standards in accordance
              with global cloud protocols.
            </p>
          </div>

          {/* Section 7: User Rights */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">7. User Rights</h2>
            <p>
              You have the right to request access to any personal correspondence you have submitted, request correction of
              inaccurate contact details, or request deletion of your submitted messages from our database at any time.
            </p>
          </div>

          {/* Section 8: Contact Information */}
          <div className="space-y-3 p-6 bg-[#181818] border border-[#262626] rounded-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#E50914]" />
              8. Contact Regarding Privacy
            </h2>
            <p>
              If you have any questions or requests regarding this Privacy Policy, please email Eman Fatima directly:
            </p>
            <p className="font-semibold text-white">
              Email:{' '}
              <a href="mailto:emanfatima9300@gmail.com" className="text-[#E50914] hover:underline">
                emanfatima9300@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
