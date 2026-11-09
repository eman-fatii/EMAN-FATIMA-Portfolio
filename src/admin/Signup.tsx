import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, KeyRound, Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SEO } from '../components/SEO';

export const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
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

    if (!email.trim() || !password || !inviteCode.trim()) {
      setError('All fields including the Administrator Provisioning Key are mandatory.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const result = await signUp(email.trim(), password, inviteCode.trim());
    setIsLoading(false);

    if (result.success) {
      navigate('/admin/dashboard', { replace: true });
    } else {
      setError(result.error || 'Failed to provision administrator account.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <SEO
        title="Admin Provisioning | Eman Fatima Portfolio"
        description="Restricted administrator onboarding for verified portfolio owner."
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#888888] hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Login</span>
        </Link>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#181818] border border-[#303030] flex items-center justify-center text-[#E50914] mx-auto">
            <KeyRound className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Admin Provisioning</h1>
          <p className="text-xs text-[#888888]">
            Restricted invitation-only setup for verified portfolio administration.
          </p>
        </div>

        {error && (
          <div className="mt-4 p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-6 bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          <div className="p-3 rounded-xl bg-[#111111] border border-[#303030] text-xs text-[#B3B3B3] flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
            <span>
              Security Rule: Public visitor registrations are prohibited. Enter your project's provisioning key
              configured in .env (<code className="text-white font-mono">EMAN_PORTFOLIO_ADMIN_2026</code>).
            </span>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                Provisioning Secret Key <span className="text-[#E50914]">*</span>
              </label>
              <input
                type="text"
                required
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="EMAN_PORTFOLIO_ADMIN_2026"
                className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                Admin Email <span className="text-[#E50914]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="emanfatima9300@gmail.com"
                className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                Password <span className="text-[#E50914]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl pl-4 pr-10 py-2.5 text-sm text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                Confirm Password <span className="text-[#E50914]">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#B00020] disabled:bg-[#401215] rounded-xl transition-all shadow-lg shadow-[#E50914]/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Provisioning Account...</span>
                </>
              ) : (
                <span>Complete Admin Setup</span>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#262626] text-center text-xs text-[#888888]">
            <span>Already provisioned? </span>
            <Link to="/admin/login" className="text-[#E50914] font-semibold hover:underline">
              Log in directly
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
