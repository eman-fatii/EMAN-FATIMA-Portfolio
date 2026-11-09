import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ShieldCheck, UserPlus, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Skills', path: '/skills' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080808]/90 backdrop-blur-md border-b border-[#252525]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark with Circular Logo Image */}
        <Link
          to="/"
          className="group flex items-center gap-3 text-lg sm:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 transition-colors"
        >
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-11-08_at_1.44.49_PM_377591ba.jpeg"
            alt="Eman Fatima Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-[#E50914] shadow-md shadow-[#E50914]/25 shrink-0 group-hover:scale-105 transition-transform"
          />
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-wider text-white group-hover:text-[#E50914] transition-colors">
              EMAN FATIMA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]"></span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative py-1 whitespace-nowrap transition-colors duration-200 ${
                  isActive ? 'text-white font-semibold' : 'text-[#B3B3B3] hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Actions (Create Account / Login / Admin + CTA) */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isAdmin ? (
            <>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-[#E50914]/15 border border-[#E50914]/40 text-[#E50914] hover:bg-[#E50914]/25 transition-colors whitespace-nowrap"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Dashboard</span>
              </Link>
              <button
                onClick={handleSignOut}
                title="Sign out of Admin session"
                className="p-2 text-[#888888] hover:text-white hover:bg-[#181818] rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#B3B3B3] hover:text-white hover:bg-[#181818] rounded-lg transition-colors whitespace-nowrap"
              >
                <LogIn className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Login</span>
              </Link>
              <Link
                to="/admin/signup"
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#181818] hover:bg-[#222222] border border-[#353535] hover:border-[#E50914]/60 rounded-lg transition-colors whitespace-nowrap"
              >
                <UserPlus className="w-3.5 h-3.5 text-[#E50914]" />
                <span>Create Account</span>
              </Link>
            </div>
          )}

          <button
            onClick={() => navigate('/contact')}
            className="group relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-lg transition-all duration-200 shadow-lg shadow-[#E50914]/20 hover:shadow-[#E50914]/40 active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            <span>Let's Connect</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#B3B3B3] hover:text-white hover:bg-[#181818] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111111] border-b border-[#252525] px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#181818] text-[#E50914] font-semibold'
                      : 'text-[#B3B3B3] hover:text-white hover:bg-[#181818]/60'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Admin and Auth Links in Mobile */}
            <div className="pt-3 border-t border-[#252525] space-y-2">
              {isAdmin ? (
                <>
                  <NavLink
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm font-semibold py-2 px-3 text-[#E50914] bg-[#E50914]/10 rounded-lg"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Admin Dashboard</span>
                  </NavLink>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="w-full flex items-center gap-2 text-sm font-semibold py-2 px-3 text-[#888888] hover:text-white rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/admin/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-[#181818] border border-[#303030] rounded-lg"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/admin/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-[#181818] border border-[#E50914]/50 rounded-lg"
                  >
                    <UserPlus className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Create Account</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-lg transition-colors shadow-md shadow-[#E50914]/20"
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
