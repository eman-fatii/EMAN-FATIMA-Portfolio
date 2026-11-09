import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Eye, EyeOff, ArrowLeft, KeyRound, UserCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SEO } from '../components/SEO';

export const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { signUp, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (isAdmin) {
    navigate('/admin/dashboard', { replace: true });
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }

    if (!email.trim()) {
      setError('Please provide your email address.');
      return;
    }

    if (!password) {
      setError('Please create a password.');
      return;
    }

    if (password.length < 4) {
      setError('Password must contain at least 4 characters.');
      return;
    }

    setIsLoading(true);
    const result = await signUp(name.trim(), email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError(result.error || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <SEO
        title="Create Account | Eman Fatima Portfolio"
        description="Create an account to manage Eman Fatima's portfolio dashboard."
      />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#E50914]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#888888] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </Link>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#181818] border border-[#303030] flex items-center justify-center text-[#E50914] mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Create Account</h1>
          <p className="text-xs text-[#888888]">
            Sign up to access and manage the portfolio system.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-6 bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Input 1: Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                Full Name <span className="text-[#E50914]">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eman Fatima"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-white transition-colors"
                />
              </div>
            </div>

            {/* Input 2: Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                Email Address <span className="text-[#E50914]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="emanfatima9300@gmail.com"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-white transition-colors"
                />
              </div>
            </div>

            {/* Input 3: Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                Password <span className="text-[#E50914]">*</span>
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create password"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-10 py-2.5 text-sm text-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#B00020] disabled:bg-[#401215] rounded-xl transition-all shadow-lg shadow-[#E50914]/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#262626] text-center text-xs text-[#888888]">
            <span>Already have an account? </span>
            <Link to="/admin/login" className="text-[#E50914] font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
