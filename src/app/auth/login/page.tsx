'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '../../../components/auth/LoginForm';
import { RegisterForm } from '../../../components/auth/RegisterForm';
import { GoogleLoginButton } from '../../../components/auth/GoogleLoginButton';
import { ForgotPasswordForm } from '../../../components/auth/ForgotPasswordForm';
import { useAuth } from '../../../context/AuthProvider';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>('login');
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (mounted && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router, mounted]);

  const handleSuccess = () => {
    router.push('/');
  };

  const handleSwitchToRegister = () => setMode('register');
  const handleSwitchToLogin = () => setMode('login');
  const handleSwitchToForgotPassword = () => setMode('forgot-password');

  if (!mounted || isAuthenticated) {
    return null; // Will redirect or loading
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {mode === 'login' && (
          <div className="space-y-4">
            <LoginForm
              onSuccess={handleSuccess}
              onSwitchToRegister={handleSwitchToRegister}
              onSwitchToForgotPassword={handleSwitchToForgotPassword}
            />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>
            <GoogleLoginButton onSuccess={handleSuccess} />
          </div>
        )}

        {mode === 'register' && (
          <div className="space-y-4">
            <RegisterForm
              onSuccess={handleSuccess}
              onSwitchToLogin={handleSwitchToLogin}
            />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500">Or continue with</span>
              </div>
            </div>
            <GoogleLoginButton onSuccess={handleSuccess} text="Sign up with Google" />
          </div>
        )}

        {mode === 'forgot-password' && (
          <ForgotPasswordForm
            onSuccess={handleSuccess}
            onBackToLogin={handleSwitchToLogin}
          />
        )}
      </div>
    </div>
  );
}
