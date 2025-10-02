// src/pages/AuthPage.tsx

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { supabase } from "../lib/supabaseClient";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  // Always call hooks first - never conditionally
  const { session, loading } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if Supabase credentials are configured
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-serif font-bold text-center mb-6 text-red-600">
            Configuration Error
          </h1>
          <div className="space-y-4 text-sm text-gray-700">
            <p>Supabase credentials are not configured.</p>
            <p>
              Please create a{" "}
              <code className="bg-gray-100 px-1 rounded">.env</code> file in the
              root directory with:
            </p>
            <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
              {`VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here`}
            </pre>
            <p>
              You can find these credentials in your Supabase project dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If loading, show a basic loading message to prevent a blank screen while checking the session.
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center text-gray-700">
        Authenticating...
      </div>
    );
  }

  // If the user is authenticated, redirect them away from the /auth page.
  if (session) {
    return <Navigate to="/" replace />;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      setGoogleLoading(false);
    }
  };

  // Render a beautiful custom auth form
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-800 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">AK</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">
            Welcome to AntiQkart
          </h1>
          <p className="text-slate-600">
            {isSignUp ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleAuth}
            disabled={googleLoading || authLoading}
            className="w-full mb-6 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-3 font-medium shadow-sm"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleAuth} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading || googleLoading}
              className="w-full bg-gradient-to-r from-slate-600 to-slate-800 text-white py-3 px-4 rounded-xl hover:from-slate-700 hover:to-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 font-medium shadow-lg"
            >
              {authLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : isSignUp ? (
                "Create Account"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Toggle Sign In/Up */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-slate-600 hover:text-slate-800 text-sm font-medium transition-colors duration-200"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-slate-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
