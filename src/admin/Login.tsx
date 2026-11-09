import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SEO } from '../components/SEO';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('emanfatima9300@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState<string | null>(null);

  const { signIn, resetPassword, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/admin/dashboard';
  const stateMessage = (location.state as { message?: string })?.message;

  if (isAdmin) {
    navigate('/admin/dashboard', { replace: true });
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please provide both your administrator email and password.');
      return;
    }

    setIsLoading(true);
    const result = await signIn(email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    const res = await resetPassword(resetEmail);
    setResetStatus(res.message);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <SEO
        title="Admin Authentication | Eman Fatima Portfolio"
        description="Secure administrator access for Eman Fatima's portfolio dashboard."
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
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Administrator Access</h1>
          <p className="text-xs text-[#888888]">
            Sign in to manage profile, skills, certificates, and published blogs.
          </p>
        </div>

        {stateMessage && (
          <div className="mt-4 p-3 rounded-lg bg-yellow-950/40 border border-yellow-800/60 text-yellow-200 text-xs text-center">
            {stateMessage}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-6 bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3] block">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="emanfatima9300@gmail.com"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-sm text-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#B3B3B3]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModal(true)}
                  className="text-xs text-[#E50914] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl pl-10 pr-10 py-2.5 text-sm text-white transition-colors"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#E50914] hover:bg-[#B00020] disabled:bg-[#401215] rounded-xl transition-all shadow-lg shadow-[#E50914]/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Sign In as Admin</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#262626] text-center text-xs text-[#888888]">
            <span>Need to provision a new admin account? </span>
            <Link to="/admin/signup" className="text-[#E50914] font-semibold hover:underline">
              Provision with Invite Key
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-[#303030] rounded-2xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Reset Password</h3>
            <p className="text-xs text-[#B3B3B3]">
              Enter your admin email to receive instructions for resetting your password.
            </p>
            {resetStatus && (
              <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs">
                {resetStatus}
              </div>
            )}
            <form onSubmit={handleResetSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="emanfatima9300@gmail.com"
                className="w-full bg-[#111111] border border-[#303030] focus:border-[#E50914] focus:outline-none rounded-xl p-3 text-sm text-white"
              />
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setForgotModal(false)}
                  className="px-3 py-2 text-xs font-semibold text-[#888888] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#E50914] hover:bg-[#B00020] rounded-lg"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
