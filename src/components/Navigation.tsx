import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Home, BookOpen, Trophy, User, Upload, Users, Sparkles } from 'lucide-react';
import type { Language, Screen, UserProfile } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  language: Language;
  userType: 'student' | 'teacher' | 'parent';
  userProfile?: UserProfile;
  onNavigate: (screen: Screen) => void;
}

const translations = {
  fr: {
    dashboard: 'Accueil',
    lesson: 'Leçons',
    progress: 'Progrès',
    profile: 'Profil',
    upload: 'Upload',
    parent: 'Enfants',
    tutorAI: 'IA Tuteur',
    level: 'Niv.'
  },
  ar: {
    dashboard: 'الرئيسية',
    lesson: 'الدروس',
    progress: 'التقدم',
    profile: 'الملف',
    upload: 'رفع',
    parent: 'الأطفال',
    tutorAI: 'الذكاء الاصطناعي',
    level: 'مستوى'
  }
};

const avatarThemes = {
  football: { icon: '⚽', gradient: 'from-green-400 to-green-600' },
  wizard: { icon: '🧙‍♂️', gradient: 'from-purple-400 to-purple-600' },
  dragon: { icon: '🐉', gradient: 'from-red-400 to-orange-600' },
  space: { icon: '🚀', gradient: 'from-blue-400 to-purple-600' }
};

export default function Navigation({ 
  currentScreen, 
  language, 
  userType, 
  userProfile,
  onNavigate 
}: NavigationProps) {
  const t = translations[language];

  const getNavItems = () => {
    const baseItems = [
      { 
        id: 'dashboard', 
        icon: Home, 
        label: t.dashboard,
        isActive: currentScreen === 'dashboard'
      }
    ];

    if (userType === 'student') {
      baseItems.push(
        { 
          id: 'lesson', 
          icon: BookOpen, 
          label: t.lesson,
          isActive: currentScreen === 'lesson'
        },
        { 
          id: 'progress', 
          icon: Trophy, 
          label: t.progress,
          isActive: currentScreen === 'progress'
        }
      );
    }

    if (userType === 'teacher') {
      baseItems.push(
        {
          id: 'upload',
          icon: Upload,
          label: t.upload,
          isActive: currentScreen === 'upload'
        },
        {
          id: 'tutor-ai',
          icon: Sparkles,
          label: t.tutorAI,
          isActive: currentScreen === 'tutor-ai'
        }
      );
    }

    if (userType === 'parent') {
      baseItems.push({
        id: 'parent',
        icon: Users,
        label: t.parent,
        isActive: currentScreen === 'parent'
      });
    }

    return baseItems;
  };

  const navItems = getNavItems();
  const currentTheme = userProfile ? avatarThemes[userProfile.avatar] : avatarThemes.football;

  return (
    <Card className="fixed bottom-4 left-4 right-4 mx-auto max-w-md rounded-3xl shadow-lg bg-white/95 backdrop-blur-sm border-0 z-50">
      <div className="p-3">
        <div className="flex items-center justify-between">
          {/* Navigation Items */}
          <div className="flex-1 flex justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate(item.id as Screen)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300 ${
                    item.isActive 
                      ? item.id === 'tutor-ai'
                        ? 'bg-murshidi-light-purple text-murshidi-purple'
                        : 'bg-murshidi-light-blue text-murshidi-sky-blue'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${item.id === 'tutor-ai' && item.isActive ? 'animate-pulse' : ''}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* User Profile Section (Students only) */}
          {userType === 'student' && userProfile && (
            <div className="ml-2 pl-2 border-l border-gray-200">
              <div className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center text-white shadow-md`}>
                  <span className="text-lg">{currentTheme.icon}</span>
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-gray-800 truncate max-w-16">
                    {userProfile.nickname}
                  </div>
                  <Badge variant="secondary" className="text-xs px-1 py-0 bg-murshidi-light-yellow text-murshidi-sky-blue">
                    {t.level} {userProfile.level}
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}