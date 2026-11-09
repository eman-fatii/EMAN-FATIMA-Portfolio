import React, { useState } from 'react';
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Linkedin,
  Facebook,
  Instagram,
  Github,
  Twitter,
  ChevronDown,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { dataService } from '../lib/supabase';

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam bot field
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; text: string }>({
    type: null,
    text: '',
  });

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Eman Fatima studying?',
      a: 'Eman Fatima is currently enrolled in a Bachelor of Science (BS) in Computer Engineering, currently in her 3rd semester, integrating computational principles with digital marketing systems.',
    },
    {
      q: 'What specific digital marketing skills does Eman offer?',
      a: 'Eman specializes in Social Media Account Management, Social Media Marketing, Email Marketing, Facebook Marketing, Facebook Marketplace listing strategies, and Microsoft Office productivity suites (Word, Excel, PowerPoint).',
    },
    {
      q: 'Is Eman available for collaboration or freelance inquiries?',
      a: 'Yes! Eman welcomes inquiries regarding social media management, content planning, marketing workflows, and student-level digital collaboration.',
    },
    {
      q: 'What is the fastest way to get in touch?',
      a: 'You can submit the contact form directly on this page or email emanfatima9300@gmail.com. Submissions are checked regularly.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, text: '' });

    // Anti-spam honeypot detection
    if (formData.honeypot) {
      setStatus({ type: 'success', text: 'Thank you! Your message has been received.' });
      return;
    }

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    try {
      await dataService.submitContactMessage({
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || 'General Inquiry',
        message: formData.message.trim(),
      });

      setStatus({
        type: 'success',
        text: 'Thank you! Your message has been sent successfully to Eman Fatima. Expect a reply soon.',
      });
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } catch {
      setStatus({
        type: 'error',
        text: 'Failed to send message. Please try emailing directly to emanfatima9300@gmail.com',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Contact Eman Fatima | Inquiries & Collaboration"
        description="Get in touch with Eman Fatima, Computer Engineering student and digital marketing practitioner. Reach out for social media and marketing inquiries."
        canonicalUrl="https://emanfatimaportfolio.vercel.app/contact"
        schemaData={faqSchema}
      />

      {/* SECTION 1: Contact Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-[#202020]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
            <Sparkles className="w-4 h-4" />
            <span>Direct Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Let's Start a <span className="text-[#E50914]">Conversation</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#B3B3B3] max-w-2xl mx-auto">
            Have a project, marketing inquiry, or opportunity to discuss? Send a direct message below.
          </p>
        </div>
      </section>

      {/* MAIN SECTION: Split layout for Direct Email/Socials & Form */}
      <section className="py-20 border-b border-[#202020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: SECTION 2 Email Contact + SECTION 4 Socials + SECTION 5 Collaboration */}
            <div className="lg:col-span-5 space-y-8">
              {/* SECTION 2: Email Contact */}
              <div className="bg-[#181818] border border-[#262626] rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-[#888888]">Direct Email</span>
                    <h3 className="text-base font-bold text-white">Eman Fatima</h3>
                  </div>
                </div>
                <p className="text-sm text-[#B3B3B3]">
                  Prefer sending an email from your personal client? Click below:
                </p>
                <a
                  href="mailto:emanfatima9300@gmail.com"
                  className="inline-flex items-center justify-between w-full px-4 py-3 bg-[#111111] border border-[#303030] hover:border-[#E50914] rounded-xl text-sm font-semibold text-white transition-colors"
                >
                  <span className="text-[#E50914]">emanfatima9300@gmail.com</span>
                  <span className="text-xs text-[#888888]">Open Client →</span>
                </a>
              </div>

              {/* SECTION 4: Social Media Profiles */}
              <div className="bg-[#181818] border border-[#262626] rounded-2xl p-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-[#888888]">Digital Presence</span>
                <h3 className="text-lg font-bold text-white">Social Media Networks</h3>
                <p className="text-sm text-[#B3B3B3]">
                  Connect with Eman across verified professional channels:
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#111111] border border-[#262626] hover:border-[#E50914] rounded-lg text-xs font-semibold text-[#B3B3B3] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#E50914]" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#111111] border border-[#262626] hover:border-[#E50914] rounded-lg text-xs font-semibold text-[#B3B3B3] hover:text-white transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-[#E50914]" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#111111] border border-[#262626] hover:border-[#E50914] rounded-lg text-xs font-semibold text-[#B3B3B3] hover:text-white transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E50914]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-3 bg-[#111111] border border-[#262626] hover:border-[#E50914] rounded-lg text-xs font-semibold text-[#B3B3B3] hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#E50914]" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* SECTION 5: Collaboration Section */}
              <div className="bg-[#181818] border border-[#262626] rounded-2xl p-6 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#E50914]">Partnership</span>
                <h3 className="text-lg font-bold text-white">Have a Project or Opportunity?</h3>
                <p className="text-sm text-[#B3B3B3] leading-relaxed">
                  Available for social media management, organic audience expansion, email campaign support, and
                  technical productivity solutions.
                </p>
              </div>
            </div>

            {/* Right Column: SECTION 3 Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-10 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">Send a Message</h3>
                  <p className="text-sm text-[#B3B3B3] mt-1">
                    Fill out the form below. Messages are stored securely and delivered to Eman.
                  </p>
                </div>

                {status.type === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{status.text}</span>
                  </div>
                )}

                {status.type === 'error' && (
                  <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <span>{status.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot field (hidden from real users, catches automated spam bots) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_honeypot"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                        Full Name <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                        Email Address <span className="text-[#E50914]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. user@example.com"
                        className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Social Media Management Project"
                      className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl px-4 py-3 text-sm text-white transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                      Message <span className="text-[#E50914]">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your inquiry, project scope, or opportunity..."
                      className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-4 text-sm text-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-sm font-semibold text-white bg-[#E50914] hover:bg-[#B00020] disabled:bg-[#401215] rounded-xl transition-all shadow-lg shadow-[#E50914]/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Eman</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Frequently Asked Questions (AEO & GEO Optimization) */}
      <section className="py-20 border-b border-[#202020] bg-[#0c0c0c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
              <HelpCircle className="w-4 h-4" />
              <span>Questions & Clarity</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-[#B3B3B3]">
              Accurate information answering common inquiries about Eman Fatima.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#181818] border border-[#262626] rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-[#E50914] transition-colors"
                >
                  <span className="text-base">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#888888] shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-[#E50914]' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-[#B3B3B3] leading-relaxed border-t border-[#262626] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Final CTA */}
      <section className="py-20 text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Looking Forward to Connecting
        </h2>
        <p className="text-sm text-[#B3B3B3] max-w-md mx-auto">
          Every legitimate message receives a prompt, thoughtful response.
        </p>
      </section>
    </div>
  );
};
