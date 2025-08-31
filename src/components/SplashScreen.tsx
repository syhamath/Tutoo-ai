import React, { useEffect } from "react";
import OwlIcon from "./OwlIcon";
import { Language } from '../types/app';

interface SplashScreenProps {
  onComplete: () => void;
  status?: string;
  language?: Language;
}

export default function SplashScreen({ onComplete, status, language = 'fr' }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #87CEEB 0%, #FFE4B5 50%, #98FB98 100%)"
      }}
    >
      {/* Animated Owl Logo */}
      <div className="relative">
        <OwlIcon size={120} className="bounce-gentle" />
        
        {/* Sparkle effects around the owl */}
        <div className="absolute -top-4 -left-4 text-2xl animate-pulse">✨</div>
        <div className="absolute -top-2 -right-6 text-xl animate-pulse delay-300">⭐</div>
        <div className="absolute -bottom-2 -left-6 text-lg animate-pulse delay-500">💫</div>
        <div className="absolute -bottom-4 -right-4 text-2xl animate-pulse delay-700">🌟</div>
      </div>

      {/* App Name */}
      <div className="mt-8 text-center space-y-2">
        <h1 
          className="text-4xl font-bold tracking-wide"
          style={{ color: "var(--murshidi-sky-blue)" }}
        >
          Tutoo
        </h1>
        <p 
          className="text-lg opacity-80"
          style={{ color: "var(--murshidi-sky-blue)" }}
        >
          Ton assistant IA pour apprendre
        </p>
        <p 
          className="text-base opacity-60"
          style={{ color: "var(--murshidi-sky-blue)" }}
          dir="rtl"
        >
          مساعدك الذكي للتعلم والنمو
        </p>
      </div>

      {/* Loading Animation */}
      <div className="mt-12 flex space-x-2">
        <div 
          className="w-3 h-3 rounded-full animate-bounce"
          style={{ backgroundColor: "var(--murshidi-sky-blue)" }}
        ></div>
        <div 
          className="w-3 h-3 rounded-full animate-bounce delay-100"
          style={{ backgroundColor: "var(--murshidi-yellow)" }}
        ></div>
        <div 
          className="w-3 h-3 rounded-full animate-bounce delay-200"
          style={{ backgroundColor: "var(--murshidi-green)" }}
        ></div>
      </div>

      {/* Status */}
      {status && (
        <div className="mt-6 text-center">
          <p className="text-sm opacity-70" style={{ color: "var(--murshidi-sky-blue)" }}>
            {status}
          </p>
        </div>
      )}

      {/* Version Info */}
      <div className="absolute bottom-8 text-center">
        <p className="text-sm opacity-50" style={{ color: "var(--murshidi-sky-blue)" }}>
          Version 1.0.0 • Made with ❤️ for Mauritania
        </p>
      </div>
    </div>
  );
}