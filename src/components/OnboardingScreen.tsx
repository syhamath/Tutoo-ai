import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Users, BookOpen } from 'lucide-react';
import OwlIcon from '../src/assets/icons/OwlIcon';
import type { Language } from '../App';

interface OnboardingScreenProps {
  language: Language;
  setLanguage: (language: Language) => void;
  onComplete: (userType: 'student' | 'teacher' | 'parent') => void;
}

const translations = {
  fr: {
    welcome: 'Bienvenue sur',
    slogan: 'Votre compagnon d\'apprentissage, à tout moment',
    chooseLanguage: 'Choisir la langue',
    chooseRole: 'Je suis...',
    student: 'Étudiant',
    teacher: 'Enseignant',
    parent: 'Parent',
    getStarted: 'Commencer'
  },
  ar: {
    welcome: 'أهلاً بك في',
    slogan: 'رفيقك في التعلم، في أي وقت',
    chooseLanguage: 'اختر اللغة',
    chooseRole: 'أنا...',
    student: 'طالب',
    teacher: 'معلم',
    parent: 'ولي أمر',
    getStarted: 'ابدأ'
  }
};

export default function OnboardingScreen({ language, setLanguage, onComplete }: OnboardingScreenProps) {
  const [selectedRole, setSelectedRole] = React.useState<'student' | 'teacher' | 'parent' | null>(null);
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-murshidi-sky-blue to-murshidi-yellow">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Title */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
            <OwlIcon size={64} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{t.welcome}</h1>
            <h1 className="text-4xl font-bold text-white mb-4">Tutoo</h1>
            <p className="text-white/90 text-lg">{t.slogan}</p>
          </div>
        </div>

        {/* Language Selection */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm rounded-card shadow-card">
          <h3 className="text-lg font-semibold mb-4 text-center">{t.chooseLanguage}</h3>
          <div className="flex gap-3">
            <Button
              variant={language === 'fr' ? 'default' : 'outline'}
              onClick={() => setLanguage('fr')}
              className="flex-1 h-12 rounded-xl"
              style={{ backgroundColor: language === 'fr' ? 'var(--murshidi-sky-blue)' : 'transparent' }}
            >
              Français
            </Button>
            <Button
              variant={language === 'ar' ? 'default' : 'outline'}
              onClick={() => setLanguage('ar')}
              className="flex-1 h-12 rounded-xl"
              style={{ backgroundColor: language === 'ar' ? 'var(--murshidi-sky-blue)' : 'transparent' }}
            >
              العربية
            </Button>
          </div>
        </Card>

        {/* Role Selection */}
        <Card className="p-6 bg-white/95 backdrop-blur-sm rounded-card shadow-card">
          <h3 className="text-lg font-semibold mb-4 text-center">{t.chooseRole}</h3>
          <div className="space-y-3">
            <Button
              variant={selectedRole === 'student' ? 'default' : 'outline'}
              onClick={() => setSelectedRole('student')}
              className="w-full h-14 rounded-xl flex items-center gap-3 justify-start px-4"
              style={{ backgroundColor: selectedRole === 'student' ? 'var(--murshidi-green)' : 'transparent' }}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <OwlIcon size={20} />
              </div>
              {t.student}
            </Button>
            <Button
              variant={selectedRole === 'teacher' ? 'default' : 'outline'}
              onClick={() => setSelectedRole('teacher')}
              className="w-full h-14 rounded-xl flex items-center gap-3 justify-start px-4"
              style={{ backgroundColor: selectedRole === 'teacher' ? 'var(--murshidi-green)' : 'transparent' }}
            >
              <BookOpen className="w-6 h-6" />
              {t.teacher}
            </Button>
            <Button
              variant={selectedRole === 'parent' ? 'default' : 'outline'}
              onClick={() => setSelectedRole('parent')}
              className="w-full h-14 rounded-xl flex items-center gap-3 justify-start px-4"
              style={{ backgroundColor: selectedRole === 'parent' ? 'var(--murshidi-green)' : 'transparent' }}
            >
              <Users className="w-6 h-6" />
              {t.parent}
            </Button>
          </div>
        </Card>

        {/* Get Started Button */}
        <Button
          onClick={() => selectedRole && onComplete(selectedRole)}
          disabled={!selectedRole}
          className="w-full h-14 rounded-xl text-lg font-semibold"
          style={{ backgroundColor: 'var(--murshidi-yellow)', color: '#000' }}
        >
          {t.getStarted}
        </Button>
      </div>
    </div>
  );
}