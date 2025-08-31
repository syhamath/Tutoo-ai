import React from 'react';
import { WifiOff } from 'lucide-react';
import type { Language } from '../App';

interface OfflineIndicatorProps {
  language: Language;
}

const translations = {
  fr: {
    offline: 'Vous êtes hors ligne',
    subtitle: 'Dernières leçons disponibles'
  },
  ar: {
    offline: 'أنت غير متصل',
    subtitle: 'الدروس الأخيرة متاحة'
  }
};

export default function OfflineIndicator({ language }: OfflineIndicatorProps) {
  const t = translations[language];

  return (
    <div className="bg-orange-500 text-white px-4 py-3 text-center">
      <div className="flex items-center justify-center gap-2 text-sm">
        <WifiOff className="w-4 h-4" />
        <span className="font-medium">{t.offline}</span>
        <span>–</span>
        <span>{t.subtitle}</span>
      </div>
    </div>
  );
}