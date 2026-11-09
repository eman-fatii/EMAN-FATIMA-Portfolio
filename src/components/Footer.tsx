import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, Shield, Linkedin, Facebook, Instagram, Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#080808] border-t border-[#252525] pt-16 pb-12 text-[#B3B3B3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#202020]">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-block text-xl font-extrabold text-white tracking-wider">
              EMAN FATIMA<span className="text-[#E50914]">.</span>
            </Link>
            <p className="text-sm leading-relaxed text-[#B3B3B3] max-w-md">
              BS Computer Engineering student (3rd Semester) exploring the synergy between engineering logic,
              digital marketing frameworks, and social media execution. Dedicated to continuous learning and
              delivering impactful digital capabilities.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="mailto:emanfatima9300@gmail.com"
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-[#181818] border border-[#303030] px-3.5 py-2 rounded-lg hover:border-[#E50914] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#E50914]" />
                <span>emanfatima9300@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Eman
                </Link>
              </li>
              <li>
                <Link to="/skills" className="hover:text-white transition-colors">
                  Skills & Expertise
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Articles & Insights
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Admin */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Trust & Access</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>robots.txt</span>
                  <ArrowUpRight className="w-3 h-3 text-[#707070]" />
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>sitemap.xml</span>
                  <ArrowUpRight className="w-3 h-3 text-[#707070]" />
                </a>
              </li>
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>llms.txt</span>
                  <ArrowUpRight className="w-3 h-3 text-[#707070]" />
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#707070] hover:text-[#E50914] transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Gateway</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707070]">
          <p>© 2026 Eman Fatima. All rights reserved. Official Portfolio.</p>
          <div className="flex items-center gap-4 text-[#8a8a8a]">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              className="hover:text-[#E50914] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook Profile"
              className="hover:text-[#E50914] transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram Profile"
              className="hover:text-[#E50914] transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              className="hover:text-[#E50914] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter Profile"
              className="hover:text-[#E50914] transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
