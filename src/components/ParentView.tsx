import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, TrendingUp, Clock, Award, BookOpen } from 'lucide-react';
import type { Language } from '../App';

interface ParentViewProps {
  language: Language;
  onBack: () => void;
}

const translations = {
  fr: {
    parentDashboard: 'Tableau de bord parent',
    childProgress: 'Progrès d\'Ahmed',
    weeklyActivity: 'Activité de la semaine',
    timeSpent: 'Temps d\'apprentissage',
    lessonsCompleted: 'Leçons terminées',
    quizScore: 'Score moyen quiz',
    achievements: 'Récompenses cette semaine',
    recommendations: 'Recommandations',
    subjects: 'Matières',
    hours: 'heures',
    lessons: 'leçons',
    math: 'Mathématiques',
    french: 'Français',
    geography: 'Histoire & Géographie',
    science: 'Sciences',
    physics: 'Physique',
    chemistry: 'Chimie',
    arabic: 'Arabe',
    english: 'Anglais',
    strongIn: 'Fort en',
    needsHelp: 'Besoin d\'aide en',
    suggestion1: 'Ahmed progresse bien en mathématiques. Continuez les exercices de fractions.',
    suggestion2: 'Encouragez-le à pratiquer plus de vocabulaire français.',
    suggestion3: 'Excellente participation aux quiz de géographie!'
  },
  ar: {
    parentDashboard: 'لوحة تحكم الوالدين',
    childProgress: 'تقدم أحمد',
    weeklyActivity: 'النشاط الأسبوعي',
    timeSpent: 'وقت التعلم',
    lessonsCompleted: 'الدروس المكتملة',
    quizScore: 'معدل نقاط الاختبار',
    achievements: 'الإنجازات هذا الأسبوع',
    recommendations: 'التوصيات',
    subjects: 'المواد',
    hours: 'ساعات',
    lessons: 'دروس',
    math: 'الرياضيات',
    french: 'الفرنسية',
    geography: 'التاريخ والجغرافيا',
    science: 'العلوم',
    physics: 'الفيزياء',
    chemistry: 'الكيمياء',
    arabic: 'اللغة العربية',
    english: 'الإنجليزية',
    strongIn: 'قوي في',
    needsHelp: 'يحتاج مساعدة في',
    suggestion1: 'أحمد يتقدم جيداً في الرياضيات. واصلوا تمارين الكسور.',
    suggestion2: 'شجعوه على ممارسة المزيد من المفردات الفرنسية.',
    suggestion3: 'مشاركة ممتازة في اختبارات الجغرافيا!'
  }
};

const weeklyStats = {
  timeSpent: 8.5,
  lessonsCompleted: 12,
  averageQuizScore: 85,
  strongSubjects: ['math', 'arabic', 'geography'],
  weakSubjects: ['french', 'english']
};

const subjectProgress = [
  { id: 'math', name: 'math', progress: 85, color: 'var(--murshidi-sky-blue)' },
  { id: 'french', name: 'french', progress: 60, color: 'var(--murshidi-yellow)' },
  { id: 'geography', name: 'geography', progress: 78, color: 'var(--murshidi-green)' },
  { id: 'science', name: 'science', progress: 45, color: '#9333EA' },
  { id: 'physics', name: 'physics', progress: 55, color: '#EF4444' },
  { id: 'chemistry', name: 'chemistry', progress: 40, color: '#F59E0B' },
  { id: 'arabic', name: 'arabic', progress: 82, color: '#10B981' },
  { id: 'english', name: 'english', progress: 35, color: '#8B5CF6' }
];

const achievements = [
  { icon: '🎯', name: 'Quiz Master', description: '5 quiz parfaits' },
  { icon: '📚', name: 'Lecteur', description: '10 leçons cette semaine' },
  { icon: '⏰', name: 'Régulier', description: 'Connexion quotidienne' }
];

export default function ParentView({ language, onBack }: ParentViewProps) {
  const t = translations[language];

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="rounded-full w-10 h-10 p-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">{t.parentDashboard}</h1>
      </div>

      {/* Child Info */}
      <Card className="p-4 rounded-card shadow-card murshidi-gradient text-white">
        <h2 className="text-lg font-semibold mb-2">{t.childProgress}</h2>
        <p className="opacity-90">{t.weeklyActivity}</p>
      </Card>

      {/* Weekly Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 rounded-card shadow-card text-center">
          <Clock className="w-6 h-6 text-murshidi-sky-blue mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{weeklyStats.timeSpent}</p>
          <p className="text-sm text-gray-600">{t.hours}</p>
          <p className="text-xs text-gray-500">{t.timeSpent}</p>
        </Card>

        <Card className="p-4 rounded-card shadow-card text-center">
          <BookOpen className="w-6 h-6 text-murshidi-green mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{weeklyStats.lessonsCompleted}</p>
          <p className="text-sm text-gray-600">{t.lessons}</p>
          <p className="text-xs text-gray-500">{t.lessonsCompleted}</p>
        </Card>

        <Card className="p-4 rounded-card shadow-card text-center">
          <TrendingUp className="w-6 h-6 text-murshidi-yellow mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-800">{weeklyStats.averageQuizScore}%</p>
          <p className="text-sm text-gray-600">Score</p>
          <p className="text-xs text-gray-500">{t.quizScore}</p>
        </Card>
      </div>

      {/* Subject Progress */}
      <Card className="p-4 rounded-card shadow-card">
        <h3 className="text-lg font-semibold mb-4">{t.subjects}</h3>
        <div className="space-y-4">
          {subjectProgress.map((subject) => (
            <div key={subject.id}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{t[subject.name as keyof typeof t] as string}</span>
                <span className="text-sm text-gray-600">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-3" />
            </div>
          ))}
        </div>
      </Card>

      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 rounded-card shadow-card">
          <h4 className="font-semibold text-murshidi-green mb-3">{t.strongIn}</h4>
          <div className="space-y-2">
            {weeklyStats.strongSubjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="bg-murshidi-light-green text-murshidi-green block w-fit">
                {t[subject as keyof typeof t] as string}
              </Badge>
            ))}
          </div>
        </Card>

        <Card className="p-4 rounded-card shadow-card">
          <h4 className="font-semibold text-orange-600 mb-3">{t.needsHelp}</h4>
          <div className="space-y-2">
            {weeklyStats.weakSubjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="bg-orange-50 text-orange-600 block w-fit">
                {t[subject as keyof typeof t] as string}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Achievements */}
      <Card className="p-4 rounded-card shadow-card">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-murshidi-yellow" />
          {t.achievements}
        </h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-murshidi-light-yellow rounded-lg">
              <span className="text-2xl">{achievement.icon}</span>
              <div>
                <p className="font-medium">{achievement.name}</p>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-4 rounded-card shadow-card">
        <h3 className="text-lg font-semibold mb-4">{t.recommendations}</h3>
        <div className="space-y-3">
          <div className="p-3 bg-murshidi-light-blue rounded-lg">
            <p className="text-sm">{t.suggestion1}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-sm">{t.suggestion2}</p>
          </div>
          <div className="p-3 bg-murshidi-light-green rounded-lg">
            <p className="text-sm">{t.suggestion3}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}