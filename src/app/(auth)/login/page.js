"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function HeroLoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const fetchUser = useAuthStore((s) => s.fetchUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleLoginSuccess(response) {
    await fetchUser();
    const redirectUrl = response.headers.get("Location") || "/dashboard";
    router.push(redirectUrl);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      handleLoginSuccess(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-backgroundSecondary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-accent">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white mb-2">Welcome back</h2>
              <p className="text-white/70">Enter your credentials to access your account</p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8 space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="login-email" className="text-sm font-medium text-textPrimary block">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-textMuted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input id="login-email" type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange}
                    className="pl-10 w-full bg-backgroundSecondary border border-borderColor text-textPrimary rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent p-3 transition" required />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="text-sm font-medium text-textPrimary block">Password</label>
                  <Link href="/forgot-password" className="text-sm font-medium text-accent hover:text-accent/80 transition">Forgot password?</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-textMuted" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input id="login-password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange}
                    className="pl-10 w-full bg-backgroundSecondary border border-borderColor text-textPrimary rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent p-3 transition" required />
                </div>
              </div>

              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-accent focus:ring-accent border-borderColor rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-textSecondary">Remember me</label>
              </div>

              <button type="submit" disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-base font-semibold text-white bg-accent hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition duration-200 disabled:opacity-50">
                {isLoading && (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm text-textSecondary">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-accent hover:text-accent/80 transition">Sign up now</Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-textSecondary">&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
