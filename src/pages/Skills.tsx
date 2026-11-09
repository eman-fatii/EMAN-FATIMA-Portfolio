import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Share2,
  TrendingUp,
  FileSpreadsheet,
  Award,
  ArrowRight,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { SkillCard } from '../components/SkillCard';
import { CertificateCard } from '../components/CertificateCard';
import { dataService } from '../lib/supabase';
import type { Skill, Certificate } from '../types';

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const loadSkillsData = async () => {
      const [skillsData, certsData] = await Promise.all([
        dataService.getSkills(),
        dataService.getCertificates(),
      ]);
      setSkills(skillsData);
      setCertificates(certsData);
    };
    loadSkillsData();
  }, []);

  const socialMediaSkills = skills.filter((s) => s.category === 'Social Media');
  const digitalMarketingSkills = skills.filter((s) => s.category === 'Digital Marketing');
  const productivitySkills = skills.filter((s) => s.category === 'Productivity Tools');

  const filteredSkills =
    activeCategory === 'all'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Skills & Expertise | Eman Fatima Portfolio"
        description="Explore Eman Fatima's skills in Social Media Account Management, Digital Marketing, Email Marketing, Facebook Marketing, and Microsoft Office tools."
        canonicalUrl="https://emanfatimaportfolio.vercel.app/skills"
      />

      {/* SECTION 1: Skills Hero */}
      <section className="relative overflow-hidden pt-16 pb-20 border-b border-[#202020]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
            <Sparkles className="w-4 h-4" />
            <span>Capabilities & Applications</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            My Skills & <span className="text-[#E50914]">Expertise</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#B3B3B3] max-w-2xl mx-auto">
            Practical digital marketing capabilities, social media workflows, and productivity tool proficiencies
            cultivated alongside engineering studies.
          </p>

          {/* Interactive Filter Tabs (Button-based filter per frontend-design rules) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'Social Media', label: 'Social Media' },
              { id: 'Digital Marketing', label: 'Digital Marketing' },
              { id: 'Productivity Tools', label: 'Productivity Tools' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/25'
                    : 'bg-[#181818] text-[#B3B3B3] hover:text-white border border-[#262626] hover:border-[#383838]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filtered Display Grid */}
      {activeCategory !== 'all' ? (
        <section className="py-20 border-b border-[#202020]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* SECTION 2: Social Media Management */}
          <section className="py-20 border-b border-[#202020]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-12 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E50914]">
                  <Share2 className="w-4 h-4" />
                  <span>Category 01</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Social Media Management</h2>
                <p className="text-sm text-[#B3B3B3]">
                  Delivering consistent brand voice, organized monthly calendars, and audience community engagement.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialMediaSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: Digital Marketing */}
          <section className="py-20 border-b border-[#202020] bg-[#0c0c0c]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-12 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E50914]">
                  <TrendingUp className="w-4 h-4" />
                  <span>Category 02</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Digital Marketing & Outbound Channels</h2>
                <p className="text-sm text-[#B3B3B3]">
                  Direct audience outreach, Marketplace product presentation, and email subscriber workflows.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {digitalMarketingSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 4: Productivity Tools */}
          <section className="py-20 border-b border-[#202020]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-12 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#E50914]">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Category 03</span>
                </div>
                <h2 className="text-3xl font-bold text-white">Productivity & Office Suites</h2>
                <p className="text-sm text-[#B3B3B3]">
                  Professional document formulation, structured data analysis, and compelling visual slide decks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productivitySkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* SECTION 5: Certificates and Learning */}
      <section className="py-20 border-b border-[#202020] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#E50914]">Verified Certifications</span>
            <h2 className="text-3xl font-bold text-white">Certificates & Credentials</h2>
            <p className="text-sm text-[#B3B3B3]">
              Credentials dynamically retrieved from Supabase database.
            </p>
          </div>

          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
          ) : (
            <div className="bg-[#181818] border border-[#262626] rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-3">
              <Award className="w-10 h-10 text-[#E50914] mx-auto" />
              <h3 className="text-lg font-bold text-white">No Unverified Certificates Displayed</h3>
              <p className="text-sm text-[#B3B3B3] leading-relaxed">
                As per our strict verification standards, no placeholder awards are shown. Validated course certifications
                will appear automatically once finalized.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 6: Learning and Development */}
      <section className="py-20 border-b border-[#202020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#181818] border border-[#262626] rounded-2xl p-8 md:p-12 space-y-6 max-w-4xl mx-auto">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#E50914]">Continuous Progression</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Learning & Capability Roadmap</h2>
            </div>
            <p className="text-sm sm:text-base text-[#B3B3B3] leading-relaxed">
              Skill building is an iterative discipline. Every week, I allocate dedicated time to review new social media
              algorithm updates, test different copy variants, study email deliverability best practices, and deepen my
              understanding of software logic.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-4 bg-[#111111] rounded-xl border border-[#2c2c2c]">
                <CheckCircle2 className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Regular Hands-on Practice</h4>
                  <p className="text-xs text-[#888888] mt-1">Executing practical mock campaigns and organizing real document files.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-[#111111] rounded-xl border border-[#2c2c2c]">
                <CheckCircle2 className="w-5 h-5 text-[#E50914] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Rigorous Academic Foundation</h4>
                  <p className="text-xs text-[#888888] mt-1">Grounding marketing tactics in sound engineering logic and data analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Contact CTA */}
      <section className="py-20 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">Want to Collaborate on a Marketing Project?</h2>
        <p className="text-[#B3B3B3] max-w-xl mx-auto text-sm sm:text-base">
          Let's discuss how my social media management and digital marketing skills can support your goals.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl transition-all shadow-lg shadow-[#E50914]/20"
        >
          <span>Connect with Eman</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
};
