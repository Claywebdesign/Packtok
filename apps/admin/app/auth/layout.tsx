import Image from "next/image";
import type React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Image
                src="/navbar-logo.png"
                alt="Packtok Admin Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-gray-600 text-sm">Complete Packaging Solution</p>
          </div>

          {children}
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="hidden lg:block relative w-1/2 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <Image
            src="/admin-login-illustration.png"
            alt="Admin Login Illustration"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
