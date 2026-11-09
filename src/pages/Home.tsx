import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Mail,
  GraduationCap,
  Sparkles,
  BookOpen,
  Award,
  Calendar,
  Linkedin,
  CheckCircle,
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { SkillCard } from '../components/SkillCard';
import { CertificateCard } from '../components/CertificateCard';
import { BlogCard } from '../components/BlogCard';
import { dataService } from '../lib/supabase';
import type { Profile, Skill, Certificate, BlogPost } from '../types';

export const Home: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [profData, skillsData, certsData, blogsData] = await Promise.all([
          dataService.getProfile(),
          dataService.getSkills(),
          dataService.getCertificates(),
          dataService.getBlogPosts(false),
        ]);
        setProfile(profData);
        setSkills(skillsData.slice(0, 8));
        setCertificates(certsData);
        setBlogs(blogsData.slice(0, 3));
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <SEO
        title="Eman Fatima | Personal Portfolio & Digital Marketing Skills"
        description="Welcome to Eman Fatima's official portfolio. Explore her Computer Engineering education, digital marketing interests, social media management skills, email marketing, and professional profile."
        canonicalUrl="https://emanfatimaportfolio.vercel.app/"
      />

      {/* ========================================================
          SECTION 1: HERO SECTION
          ======================================================== */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#202020]">
        {/* Subtle Ambient Red Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Typographic Presentation */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed Metadata Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
                <Sparkles className="w-4 h-4" />
                <span>Undergraduate Portfolio & Skill Showcase</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#E50914]">Eman Fatima</span>
              </h1>

              {/* Secondary Heading */}
              <p className="text-xl sm:text-2xl font-semibold text-[#B3B3B3]">
                Computer Engineering Student <span className="text-[#E50914]">|</span> Digital Marketing Enthusiast
              </p>

              {/* Lead Description */}
              <p className="text-base sm:text-lg text-[#B3B3B3] leading-relaxed max-w-2xl">
                {profile?.hero_intro ||
                  "I'm Eman Fatima, a BS Computer Engineering student passionate about digital marketing, social media management, and creating meaningful digital experiences."}
              </p>

              {/* Call-to-Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/skills"
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl transition-all duration-200 shadow-lg shadow-[#E50914]/25 hover:shadow-[#E50914]/40 active:scale-[0.98] inline-flex items-center gap-2"
                >
                  <span>Explore My Skills</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#181818] hover:bg-[#222222] border border-[#303030] hover:border-[#E50914]/50 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-[#E50914]" />
                  <span>Contact Me</span>
                </Link>
              </div>

              {/* Social Media Links (LinkedIn Only) */}
              <div className="pt-4 flex items-center gap-3 text-[#888888]">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#888888]">Professional Profile:</span>
                <a
                  href="https://www.linkedin.com/in/eman-fatima-a927683a2/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Eman Fatima LinkedIn Profile"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#181818] border border-[#303030] hover:border-[#0A66C2] rounded-lg text-xs font-semibold text-white transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  <span>linkedin.com/in/eman-fatima-a927683a2</span>
                </a>
              </div>
            </div>

            {/* Right Column: High-Fidelity Profile Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-full max-w-sm sm:max-w-md aspect-square rounded-2xl overflow-hidden border border-[#303030] bg-[#111111] shadow-2xl shadow-black/80">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_1.44.49_PM_377591ba.jpeg"
                  alt="Eman Fatima – Computer Engineering Student and Digital Marketer"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#111111]/90 backdrop-blur-md border border-[#303030] flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">Eman Fatima</h3>
                    <p className="text-xs text-[#B3B3B3]">BS Computer Engineering · 3rd Semester</p>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E50914] animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Metric & Trust Strip (Domain Rule: Below Hero Split) */}
          <div className="mt-16 pt-8 border-t border-[#202020] grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">3rd Sem</span>
              <p className="text-xs text-[#888888] font-medium">BS Computer Engineering</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">8 Core</span>
              <p className="text-xs text-[#888888] font-medium">Verified Practical Skills</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">Direct</span>
              <p className="text-xs text-[#888888] font-medium">Collaboration Inquiries</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-[#E50914]">100%</span>
              <p className="text-xs text-[#888888] font-medium">Authentic & Verified Info</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: ABOUT ME
          ======================================================== */}
      <section className="py-20 border-b border-[#202020] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E50914]">
              <span>Background & Vision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get to Know Me
            </h2>
            <div className="w-12 h-1 bg-[#E50914] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-5 text-[#B3B3B3] text-base leading-relaxed">
              <p>
                {profile?.biography ||
                  "Hello! I'm Eman Fatima, a BS Computer Engineering student currently in my 3rd semester. I am interested in digital marketing, social media management, and technology. I enjoy learning new digital skills, exploring creative marketing strategies, and developing my professional capabilities."}
              </p>
              <p>
                As an engineering student, I appreciate the analytical mindset required to dissect algorithms,
                optimize workflows, and evaluate data funnels. I bring that same disciplined approach to digital
                marketing—treating social media campaigns, email segmentation, and marketplace reach as dynamic
                systems that can be measured and elevated.
              </p>
              <p>
                I prioritize transparency and authentic growth. I believe in mastering tools thoroughly—from Meta
                Business workflows to Microsoft Office productivity suites—to deliver dependable execution for
                every endeavor.
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#E50914] hover:text-[#ff3b47] transition-colors"
                >
                  <span>Read Full Professional Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#181818] border border-[#262626] rounded-2xl p-6 space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white pb-3 border-b border-[#262626]">
                Academic Details
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs text-[#888888] block">Degree Program</span>
                  <span className="font-semibold text-white">BS Computer Engineering</span>
                </div>
                <div>
                  <span className="text-xs text-[#888888] block">Academic Standing</span>
                  <span className="font-semibold text-white">3rd Semester</span>
                </div>
                <div>
                  <span className="text-xs text-[#888888] block">Primary Focus</span>
                  <span className="font-semibold text-white">Technology & Digital Marketing</span>
                </div>
                <div>
                  <span className="text-xs text-[#888888] block">Official Email</span>
                  <a
                    href="mailto:emanfatima9300@gmail.com"
                    className="font-semibold text-[#E50914] hover:underline"
                  >
                    emanfatima9300@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: FEATURED SKILLS
          ======================================================== */}
      <section className="py-20 border-b border-[#202020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-2">
                <span>Core Competencies</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Skills
              </h2>
            </div>
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#E50914] transition-colors"
            >
              <span>View All Skills & Details</span>
              <ArrowRight className="w-4 h-4 text-[#E50914]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: EDUCATION
          ======================================================== */}
      <section className="py-20 border-b border-[#202020] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-2">
              <span>Academic Pathway</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Educational Foundation
            </h2>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-[#2e2e2e] space-y-12">
            <div className="relative">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#E50914] ring-4 ring-[#0c0c0c]" />
              <div className="bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-white">Bachelor of Science in Computer Engineering</h3>
                  <span className="text-xs font-mono text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/30 px-3 py-1 rounded-md">
                    Currently Enrolled · 3rd Semester
                  </span>
                </div>
                <p className="text-sm text-[#B3B3B3] leading-relaxed">
                  Engaged in fundamental computing, digital logic design, computer systems architecture, and
                  software principles. Exploring the direct application of engineering systems thinking to digital
                  marketing architectures and algorithmic platform operations.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#888888]">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#E50914]" />
                    <span>Undergraduate Degree</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#E50914]" />
                    <span>Active Student Status</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: CERTIFICATES
          ======================================================== */}
      <section className="py-20 border-b border-[#202020]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-2">
              <span>Credentials & Verification</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Certifications & Recognitions
            </h2>
            <p className="text-sm text-[#B3B3B3] mt-2">
              Official certifications dynamically updated as courses and exams are completed.
            </p>
          </div>

          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))}
            </div>
          ) : (
            /* Professional Empty State as required by prompt */
            <div className="bg-[#181818] border border-[#262626] rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914]">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">Certifications Currently in Progress</h3>
              <p className="text-sm text-[#B3B3B3] leading-relaxed">
                In strict adherence to authentic representation, no unverified credentials or fabricated awards are
                displayed. As coursework in digital marketing, social media analytics, and computing certifications are
                formally completed, they will be dynamically verified and published here through the admin dashboard.
              </p>
              <div className="pt-2">
                <Link
                  to="/skills"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#E50914] hover:underline"
                >
                  <span>Explore current verified practical skills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION 6: LATEST BLOG ARTICLES
          ======================================================== */}
      <section className="py-20 border-b border-[#202020] bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#E50914] mb-2">
                <span>Knowledge & Perspectives</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Latest Articles
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#E50914] transition-colors"
            >
              <span>Visit Complete Blog</span>
              <ArrowRight className="w-4 h-4 text-[#E50914]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: CONTACT CTA
          ======================================================== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E50914]/10 via-transparent to-[#B00020]/10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Let's Connect and Create Something Great
          </h2>
          <p className="text-base sm:text-lg text-[#B3B3B3] max-w-2xl mx-auto leading-relaxed">
            Have an opportunity or want to connect? Whether for digital marketing projects, social media management,
            or discussing technology, feel free to get in touch.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 text-sm font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-xl transition-all duration-200 shadow-xl shadow-[#E50914]/20 hover:shadow-[#E50914]/40 active:scale-[0.98] inline-flex items-center gap-2"
            >
              <span>Contact Me</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:emanfatima9300@gmail.com"
              className="px-8 py-3.5 text-sm font-semibold text-white bg-[#181818] hover:bg-[#222222] border border-[#303030] hover:border-[#E50914]/50 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#E50914]" />
              <span>Send Email</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
