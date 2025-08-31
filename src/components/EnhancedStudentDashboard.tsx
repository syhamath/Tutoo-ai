import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Star, Trophy, Target, Calendar, BookOpen, Zap, Crown } from 'lucide-react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import OwlIcon from './OwlIcon';
import { UserProfile, Course, Language } from '../types/app';
import { GameificationEngine } from '../utils/gameification';

interface EnhancedStudentDashboardProps {
  language: Language;
  userProfile?: UserProfile;
  courses: Record<string, Course[]>;
  onSubjectSelect: (subject: string) => void;
  onContinueAdventure: () => void;
}

export default function EnhancedStudentDashboard({
  language,
  userProfile,
  courses,
  onSubjectSelect,
  onContinueAdventure,
}: EnhancedStudentDashboardProps) {
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [weeklyGoals, setWeeklyGoals] = useState({
    lessonsGoal: { current: 0, target: 15, percentage: 0 },
    xpGoal: { current: 0, target: 1000, percentage: 0 }
  });

  const isRTL = language === 'ar';

  // Text content
  const text = {
    fr: {
      welcome: 'Salut',
      continueAdventure: 'Continuer l\'Aventure',
      myProgress: 'Mes Progrès',
      weeklyGoals: 'Objectifs Hebdomadaires',
      lessons: 'Leçons',
      experience: 'Expérience',
      achievements: 'Récompenses',
      recentBadges: 'Badges Récents',
      streakCounter: 'Série',
      days: 'jours',
      level: 'Niveau',
      subjects: 'Matières',
      startLearning: 'Commencer',
      locked: 'Verrouillé',
      unlocked: 'Débloqué',
      completed: 'Terminé',
      inProgress: 'En cours',
    },
    ar: {
      welcome: 'مرحباً',
      continueAdventure: 'متابعة المغامرة',
      myProgress: 'تقدمي',
      weeklyGoals: 'الأهداف الأسبوعية',
      lessons: 'الدروس',
      experience: 'الخبرة',
      achievements: 'الإنجازات',
      recentBadges: 'الشارات الحديثة',
      streakCounter: 'السلسلة',
      days: 'أيام',
      level: 'المستوى',
      subjects: 'المواد',
      startLearning: 'ابدأ',
      locked: 'مقفل',
      unlocked: 'مفتوح',
      completed: 'مكتمل',
      inProgress: 'قيد التقدم',
    }
  };

  const t = text[language];

  // Calculate weekly goals on mount
  useEffect(() => {
    if (userProfile) {
      const goals = GameificationEngine.calculateWeeklyGoals(userProfile.weeklyProgress);
      setWeeklyGoals(goals);
      
      const message = GameificationEngine.getMotivationalMessage(userProfile, language);
      setMotivationalMessage(message);
    }
  }, [userProfile, language]);

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin">
          <OwlIcon size={64} />
        </div>
      </div>
    );
  }

  const recentBadges = userProfile.badges
    .filter(badge => badge.earned)
    .sort((a, b) => new Date(b.earnedDate || '').getTime() - new Date(a.earnedDate || '').getTime())
    .slice(0, 3);

  const allSubjects = Object.keys(courses);
  const nextLevelProgress = (userProfile.xp / userProfile.xpToNextLevel) * 100;

  return (
    <div className={`min-h-screen p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              className="bounce-gentle"
              whileHover={{ scale: 1.1 }}
            >
              <OwlIcon size={80} className="drop-shadow-lg" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-murshidi-sky-blue">
                {t.welcome} {userProfile.nickname}! 👋
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                {motivationalMessage}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Level and XP Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 bg-gradient-to-r from-murshidi-light-blue to-murshidi-light-yellow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Crown className="w-8 h-8 text-murshidi-yellow" />
                <div>
                  <h3 className="text-xl font-bold">{t.level} {userProfile.level}</h3>
                  <p className="text-sm text-gray-600">
                    {userProfile.xp} / {userProfile.xpToNextLevel} XP
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-orange-600">{userProfile.streak} {t.days}</span>
              </div>
            </div>
            <Progress value={nextLevelProgress} className="h-3" />
          </Card>
        </motion.div>

        {/* Continue Adventure Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card 
            className="p-6 bg-gradient-to-r from-murshidi-green to-emerald-500 text-white cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={onContinueAdventure}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{t.continueAdventure}</h3>
                <p className="opacity-90">Reprends là où tu t'es arrêté!</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-12 h-12 bg-white bg-opacity-20 rounded-full p-3" />
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Weekly Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-murshidi-purple" />
              {t.weeklyGoals}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t.lessons}</span>
                  <span className="text-sm text-gray-600">
                    {weeklyGoals.lessonsGoal.current}/{weeklyGoals.lessonsGoal.target}
                  </span>
                </div>
                <Progress value={weeklyGoals.lessonsGoal.percentage} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{t.experience}</span>
                  <span className="text-sm text-gray-600">
                    {weeklyGoals.xpGoal.current}/{weeklyGoals.xpGoal.target}
                  </span>
                </div>
                <Progress value={weeklyGoals.xpGoal.percentage} className="h-2" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Recent Badges */}
        {recentBadges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-6 h-6 text-murshidi-yellow" />
                {t.recentBadges}
              </h3>
              <div className="flex gap-4">
                {recentBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-murshidi-yellow to-orange-400 rounded-full flex items-center justify-center text-2xl mb-2 shadow-lg">
                      {badge.icon}
                    </div>
                    <p className="text-xs font-medium text-gray-700">{badge.name}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Subjects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-murshidi-indigo" />
            {t.subjects}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSubjects.map((subject, index) => {
              const subjectCourses = courses[subject] || [];
              const totalProgress = subjectCourses.reduce((sum, course) => sum + course.totalProgress, 0) / subjectCourses.length || 0;
              
              const subjectConfig = {
                math: { icon: '🧮', color: 'from-purple-400 to-purple-600', name: 'Mathématiques' },
                french: { icon: '📚', color: 'from-green-400 to-green-600', name: 'Français' },
                science: { icon: '🔬', color: 'from-blue-400 to-blue-600', name: 'Sciences' },
                history: { icon: '🏛️', color: 'from-orange-400 to-orange-600', name: 'Histoire' },
                geography: { icon: '🌍', color: 'from-teal-400 to-teal-600', name: 'Géographie' },
              }[subject] || { icon: '📖', color: 'from-gray-400 to-gray-600', name: subject };

              return (
                <motion.div
                  key={subject}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card 
                    className={`p-6 cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${subjectConfig.color} text-white`}
                    onClick={() => onSubjectSelect(subject)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{subjectConfig.icon}</div>
                      <Badge variant="secondary" className="bg-white bg-opacity-20">
                        {Math.round(totalProgress)}%
                      </Badge>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{subjectConfig.name}</h4>
                    <div className="flex items-center gap-2 text-sm opacity-90">
                      <Star className="w-4 h-4" />
                      <span>{subjectCourses.length} cours disponibles</span>
                    </div>
                    <Progress value={totalProgress} className="mt-3 h-2 bg-white bg-opacity-20" />
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}