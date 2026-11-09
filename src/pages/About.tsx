import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  Target,
  Compass,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Share2,
  Mail,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { dataService } from '../lib/supabase';
import type { Profile } from '../types';

export const About: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    dataService.getProfile().then(setProfile);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="About Eman Fatima | Computer Engineering & Digital Marketing"
        description="Learn about Eman Fatima, a BS Computer Engineering student in her 3rd semester blending technology, digital marketing, and social media management."
        canonicalUrl="https://emanfatimaportfolio.vercel.app/about"
      />

      {/* SECTION 1: About Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-[#202020]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
            <Sparkles className="w-4 h-4" />
            <span>Profile & Aspirations</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            About <span className="text-[#E50914]">Eman Fatima</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#B3B3B3] max-w-2xl mx-auto">
            Technology, Creativity and Digital Growth
          </p>
        </div>
      </section>

      {/* SECTION 2: Personal Introduction & Portrait */}
      <section className="py-20 border-b border-[#202020] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-[#303030] bg-[#111111] shadow-2xl">
                <img
                  src={profile?.profile_image || '/src/assets/images/eman_fatima_portrait_1794240983912.jpg'}
                  alt="Eman Fatima - Personal Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#111111]/90 backdrop-blur-md border border-[#303030]">
                  <p className="text-sm font-bold text-white">Eman Fatima</p>
                  <p className="text-xs text-[#E50914]">Undergraduate in Computer Engineering</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-[#B3B3B3] text-base sm:text-lg leading-relaxed">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#E50914]">01. Personal Introduction</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Dedicated to Digital Exploration</h2>
              </div>
              <p>
                {profile?.biography ||
                  "Hello! I'm Eman Fatima, a BS Computer Engineering student currently in my 3rd semester. I am interested in digital marketing, social media management, and technology. I enjoy learning new digital skills, exploring creative marketing strategies, and developing my professional capabilities."}
              </p>
              <p>
                My educational focus is centered around computing fundamentals and structured logical problem solving.
                Concurrently, I spend significant time understanding digital platforms—how algorithms present information,
                how brand storytelling resonates with diverse communities, and how strategic communication drives real-world
                engagement.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-[#888888]">
                <span className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#E50914]" /> Verified Profile
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5 text-white">
                  <Mail className="w-4 h-4 text-[#E50914]" /> emanfatima9300@gmail.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Educational Background */}
      <section className="py-20 border-b border-[#202020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E50914]">02. Academic Track</span>
            <h2 className="text-3xl font-bold text-white mt-1">Educational Background</h2>
          </div>

          <div className="bg-[#181818] border border-[#262626] rounded-2xl p-8 max-w-4xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914] shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">BS Computer Engineering</h3>
                  <p className="text-sm text-[#888888]">Undergraduate Academic Program</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/30 px-3 py-1.5 rounded-lg w-fit">
                Currently 3rd Semester
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#B3B3B3] leading-relaxed">
              Studying core engineering courses including Digital Logic Design, Discrete Mathematics, Data Structures &
              Object-Oriented Programming principles, alongside Circuit Theory. The curriculum equips me with rigorous
              analytical rigor, structured modular troubleshooting, and technological fluency.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: My Journey */}
      <section className="py-20 border-b border-[#202020] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E50914]">03. Evolution</span>
            <h2 className="text-3xl font-bold text-white mt-1">My Journey: Engineering Meets Marketing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#B3B3B3] text-sm sm:text-base leading-relaxed">
            <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#E50914]" />
                Analytical Discovery
              </h3>
              <p>
                Beginning my computer engineering degree exposed me to how large systems operate behind the scenes.
                Instead of viewing social media platforms merely as leisure apps, I became fascinated by how algorithmic feeds,
                audience targeting, and consumer engagement funnels work mathematically.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#E50914]" />
                Practical Skill Cultivation
              </h3>
              <p>
                I dedicated outside-of-class hours to mastering practical business productivity tools (Microsoft Office),
                studying Meta Business Suite operations, practicing content planning, and understanding email automation. This
                combination gives me a unique advantage: an engineering brain paired with creative marketing empathy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Professional Interests */}
      <section className="py-20 border-b border-[#202020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E50914]">04. Focus Areas</span>
            <h2 className="text-3xl font-bold text-white mt-1">Core Professional Interests</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914]">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Social Media Management</h3>
              <p className="text-sm text-[#B3B3B3]">
                Consistent content scheduling, brand voice consistency, customer relationship nurturing, and organic reach.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914]">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Digital Marketing</h3>
              <p className="text-sm text-[#B3B3B3]">
                Campaign structure, audience research, multi-platform promotional strategies, and lead generation workflows.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914]">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Email Marketing</h3>
              <p className="text-sm text-[#B3B3B3]">
                Direct inbox communication, subscriber segmentation, newsletter formatting, and deliverability optimization.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Facebook & Marketplace Marketing</h3>
              <p className="text-sm text-[#B3B3B3]">
                Product listing optimization, page management, direct buyer messaging, and local community outreach.
              </p>
            </div>

            <div className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-3 sm:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-lg bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914]">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Business Productivity Suites</h3>
              <p className="text-sm text-[#B3B3B3]">
                Advanced documentation in Microsoft Word, data modeling and formula calculations in Microsoft Excel, and
                compelling visual pitch decks in Microsoft PowerPoint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Personal Strengths */}
      <section className="py-20 border-b border-[#202020] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E50914]">05. Personal Traits</span>
            <h2 className="text-3xl font-bold text-white mt-1">Personal Strengths & Working Principles</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Continuous Learning',
                desc: 'Consistently seeking new tutorials, industry updates, and platform release notes to stay ahead.',
              },
              {
                title: 'Creativity & Aesthetic Eye',
                desc: 'Appreciation for clean visuals, balanced typography, and memorable brand aesthetics.',
              },
              {
                title: 'Clear Communication',
                desc: 'Prompt, respectful, and articulate interaction across written correspondence and team collaboration.',
              },
              {
                title: 'Adaptability & Resilience',
                desc: 'Eager to pivot strategies when platform algorithms or market dynamics shift.',
              },
              {
                title: 'Technical Curiosity',
                desc: 'Excited by the underlying computing systems, scripts, and software tools that power modern businesses.',
              },
              {
                title: 'Authenticity & Ethics',
                desc: 'Committed to honest reporting, verified claims, and building genuine long-term professional trust.',
              },
            ].map((strength, idx) => (
              <div key={idx} className="bg-[#181818] border border-[#262626] rounded-xl p-6 space-y-2">
                <div className="text-xs font-mono text-[#E50914]">0{idx + 1}.</div>
                <h3 className="text-base font-bold text-white">{strength.title}</h3>
                <p className="text-sm text-[#B3B3B3] leading-relaxed">{strength.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Future Goals */}
      <section className="py-20 border-b border-[#202020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E50914]">06. Vision</span>
            <h2 className="text-3xl font-bold text-white mt-1">Future Goals & Trajectory</h2>
          </div>

          <div className="bg-[#181818] border border-[#262626] rounded-2xl p-8 max-w-4xl space-y-4 text-base text-[#B3B3B3] leading-relaxed">
            <p>
              Over the remainder of my Computer Engineering degree, my objective is to continue bridging the gap between
              engineering problem solving and digital marketing growth.
            </p>
            <p>
              I aim to expand into advanced marketing automation, conversion rate analysis, and data-backed digital campaign
              management, while maintaining complete academic rigor in computer hardware and software design.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: Contact CTA */}
      <section className="py-20 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">Interested in Connecting with Eman?</h2>
        <p className="text-[#B3B3B3] max-w-xl mx-auto text-sm sm:text-base">
          I welcome conversations regarding digital marketing, social media projects, and technology discussions.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl transition-all shadow-lg shadow-[#E50914]/20"
        >
          <span>Get in Touch</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
