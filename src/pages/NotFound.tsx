import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass, Mail, AlertTriangle } from 'lucide-react';
import { SEO } from '../components/SEO';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[80vh] bg-[#080808] text-white flex items-center justify-center p-4">
      <SEO
        title="404 – Page Not Found | Eman Fatima"
        description="The requested page could not be located on Eman Fatima's official portfolio."
      />
      <div className="max-w-lg w-full bg-[#181818] border border-[#262626] rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-[#111111] border border-[#303030] flex items-center justify-center text-[#E50914] mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-mono font-extrabold text-[#E50914]">404</span>
          <h1 className="text-2xl font-bold text-white">Page Not Found</h1>
          <p className="text-sm text-[#B3B3B3] leading-relaxed">
            The link you followed may be broken, or the page may have been moved or updated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          <Link
            to="/skills"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#111111] border border-[#303030] hover:border-[#E50914] rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#E50914]" />
            <span>Explore Skills</span>
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#111111] border border-[#303030] hover:border-[#E50914] rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#E50914]" />
            <span>Contact</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
