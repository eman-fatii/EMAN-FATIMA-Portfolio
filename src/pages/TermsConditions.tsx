import React from 'react';
import { SEO } from '../components/SEO';
import { FileCheck, Mail } from 'lucide-react';

export const TermsConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Terms and Conditions | Eman Fatima Portfolio"
        description="Terms and conditions for visiting and interacting with Eman Fatima's official personal portfolio website."
        canonicalUrl="https://emanfatimaportfolio.vercel.app/terms-and-conditions"
      />

      <section className="pt-16 pb-12 border-b border-[#202020]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
            <FileCheck className="w-4 h-4" />
            <span>Usage Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms & Conditions</h1>
          <p className="text-sm text-[#888888]">Effective Date: November 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-[#B3B3B3] text-sm sm:text-base leading-relaxed">
          {/* 1. Introduction */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">1. Introduction</h2>
            <p>
              Welcome to the personal website of Eman Fatima (https://emanfatimaportfolio.vercel.app). By accessing or browsing
              this website, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do
              not utilize this website.
            </p>
          </div>

          {/* 2. Website Usage */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">2. Permitted Website Usage</h2>
            <p>
              This website is published as a professional portfolio to display academic credentials in Computer Engineering,
              demonstrate competencies in digital marketing and social media account management, and provide educational blog
              content. You may view, download for offline reference, or share links to public pages solely for legitimate,
              lawful informational and evaluation purposes.
            </p>
          </div>

          {/* 3. Intellectual Property */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">3. Intellectual Property</h2>
            <p>
              All original text, written articles, visual designs, project layouts, graphics, and code architectures are the
              intellectual property of Eman Fatima unless explicitly cited otherwise. You may not reproduce, redistribute, or
              monetize original blog articles or design materials without explicit written permission.
            </p>
          </div>

          {/* 4. User Responsibilities */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">4. User Responsibilities</h2>
            <p>When interacting with this website, you agree not to:</p>
            <ul className="list-disc pl-5 space-y-1 text-[#888888]">
              <li>Submit abusive, defamatory, or fraudulent content through the contact forms.</li>
              <li>Attempt to breach or probe the website's security or administrative authentication boundaries.</li>
              <li>Deploy malicious scripts, automated spiders, or denial-of-service disruptions.</li>
            </ul>
          </div>

          {/* 5. External Links */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">5. External Links</h2>
            <p>
              This website may contain links to external third-party platforms (such as LinkedIn, Meta, GitHub, or academic
              references). Eman Fatima does not control and is not liable for the privacy practices, content, or policies of
              external websites.
            </p>
          </div>

          {/* 6. Limitation of Liability */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">6. Limitation of Liability</h2>
            <p>
              The content on this website is provided "as is" for informational and educational purposes. While every effort is
              made to ensure accuracy, Eman Fatima makes no express guarantees regarding absolute availability or uninterrupted
              uptime.
            </p>
          </div>

          {/* 7. Changes to Terms */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">7. Changes to Terms</h2>
            <p>
              We reserve the right to revise or update these Terms and Conditions at our sole discretion. Any amendments will be
              reflected immediately upon posting to this page with an updated effective date.
            </p>
          </div>

          {/* 8. Contact Information */}
          <div className="space-y-3 p-6 bg-[#181818] border border-[#262626] rounded-xl">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#E50914]" />
              8. Contact Regarding Terms
            </h2>
            <p>Questions regarding these terms should be directed to:</p>
            <p className="font-semibold text-white">
              Eman Fatima ·{' '}
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
