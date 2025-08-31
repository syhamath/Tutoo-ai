import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { Play, Trophy, Star, Zap, Target, ChevronLeft, ChevronRight, TrendingUp, AlertCircle } from 'lucide-react';
import type { Language, UserProfile, Course } from '../App';

interface StudentDashboardProps {
  language: Language;
  userProfile?: UserProfile;
  courses: Record<string, Course[]>;
  onSubjectSelect: (subject: string) => void;
  onContinueAdventure: () => void;
}

const translations = {
  fr: {
    welcome: 'Salut',
    level: 'Niveau',
    xpProgress: 'Progression XP',
    dayStreak: 'Série de',
    days: 'jours',
    continueAdventure: 'Continuer l\'Aventure',
    subjects: 'Tes Matières',
    progress: 'Progrès',
    locked: 'Verrouillé',
    unlockAt: 'Débloque au niveau',
    recentBadges: 'Badges Récents',
    weeklyProgress: 'Progrès de la Semaine',
    areasToImprove: 'À Améliorer',
    improveTip: 'Concentre-toi sur ces sujets!',
    math: 'Mathématiques',
    french: 'Français',
    geography: 'Histoire & Géo',
    science: 'Sciences',
    physics: 'Physique',
    chemistry: 'Chimie',
    arabic: 'Arabe',
    english: 'Anglais',
    quickStats: 'Tes Exploits',
    totalXp: 'XP Total',
    badgesEarned: 'Badges',
    lessonsCompleted: 'Leçons',
    viewAll: 'Voir tout',
    xpEarned: 'XP gagnés'
  },
  ar: {
    welcome: 'مرحباً',
    level: 'المستوى',
    xpProgress: 'تقدم النقاط',
    dayStreak: 'سلسلة',
    days: 'أيام',
    continueAdventure: 'متابعة المغامرة',
    subjects: 'موادك',
    progress: 'التقدم',
    locked: 'مقفل',
    unlockAt: 'يفتح في المستوى',
    recentBadges: 'الأوسمة الحديثة',
    weeklyProgress: 'تقدم الأسبوع',
    areasToImprove: 'للتحسين',
    improveTip: 'ركز على هذه المواضيع!',
    math: 'الرياضيات',
    french: 'الفرنسية',
    geography: 'التاريخ والجغرافيا',
    science: 'العلوم',
    physics: 'الفيزياء',
    chemistry: 'الكيمياء',
    arabic: 'اللغة العربية',
    english: 'الإنجليزية',
    quickStats: 'إنجازاتك',
    totalXp: 'النقاط الكلية',
    badgesEarned: 'الأوسمة',
    lessonsCompleted: 'الدروس',
    viewAll: 'عرض الكل',
    xpEarned: 'النقاط المكتسبة'
  }
};

const avatarThemes = {
  football: { icon: '⚽', gradient: 'from-green-400 to-green-600' },
  wizard: { icon: '🧙‍♂️', gradient: 'from-purple-400 to-purple-600' },
  dragon: { icon: '🐉', gradient: 'from-red-400 to-orange-600' },
  space: { icon: '🚀', gradient: 'from-blue-400 to-purple-600' }
};

export default function StudentDashboard({ 
  language, 
  userProfile, 
  courses, 
  onSubjectSelect, 
  onContinueAdventure 
}: StudentDashboardProps) {
  const t = translations[language];
  
  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const currentTheme = avatarThemes[userProfile.avatar];
  const allCourses = Object.values(courses).flat();
  const unlockedCourses = allCourses.filter(course => course.unlocked);
  const completedLessons = allCourses.reduce((total, course) => 
    total + course.lessons.filter(lesson => lesson.completed).length, 0
  );
  const earnedBadges = userProfile.badges.filter(badge => badge.earned);

  const xpPercentage = (userProfile.xp / userProfile.xpToNextLevel) * 100;
  const maxWeeklyLessons = Math.max(...userProfile.weeklyProgress.map(day => day.lessonsCompleted));

  return (
    <div className="p-4 space-y-6">
      {/* Enhanced Header with Avatar + XP + Level */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Card className="p-6 rounded-3xl shadow-lg overflow-hidden">
          {/* Background Pattern */}
          <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-10`}></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              {/* Large Avatar */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center shadow-lg`}>
                <span className="text-3xl">{currentTheme.icon}</span>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">
                  {t.welcome}, {userProfile.nickname}! 👋
                </h1>
                <div className="flex items-center gap-4">
                  <Badge className="bg-murshidi-yellow text-black font-bold px-3 py-1">
                    {t.level} {userProfile.level}
                  </Badge>
                  <div className="flex items-center gap-1 text-orange-600">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm font-semibold">{t.dayStreak}: {userProfile.streak} {t.days}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* XP Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">{t.xpProgress}</span>
                <span className="text-sm font-bold text-murshidi-sky-blue">
                  {userProfile.xp} / {userProfile.xpToNextLevel} XP
                </span>
              </div>
              <Progress value={xpPercentage} className="h-4 rounded-full bg-murshidi-light-blue">
                <div 
                  className="h-full bg-gradient-to-r from-murshidi-sky-blue to-murshidi-yellow rounded-full transition-all duration-300"
                  style={{ width: `${xpPercentage}%` }}
                />
              </Progress>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Weekly Progress Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-4 rounded-3xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-murshidi-sky-blue" />
            {t.weeklyProgress}
          </h3>
          
          <div className="grid grid-cols-7 gap-3">
            {userProfile.weeklyProgress.map((day, index) => {
              const height = maxWeeklyLessons > 0 ? (day.lessonsCompleted / maxWeeklyLessons) * 100 : 0;
              const isToday = index === userProfile.weeklyProgress.length - 1;
              
              return (
                <motion.div
                  key={day.date}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-2">
                    <div 
                      className={`w-full rounded-xl mx-auto transition-all duration-300 ${
                        day.lessonsCompleted > 0 
                          ? 'bg-gradient-to-t from-murshidi-sky-blue to-murshidi-yellow' 
                          : 'bg-gray-200'
                      } ${isToday ? 'ring-2 ring-murshidi-orange' : ''}`}
                      style={{ 
                        height: `${Math.max(height, 10)}px`,
                        minHeight: '20px'
                      }}
                    />
                  </div>
                  <div className={`text-xs font-semibold ${isToday ? 'text-murshidi-orange' : 'text-gray-600'}`}>
                    {day.day}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {day.lessonsCompleted} leçons
                  </div>
                  {day.xpEarned > 0 && (
                    <div className="text-xs text-murshidi-sky-blue font-medium">
                      +{day.xpEarned} XP
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </Card>
      </motion.div>

      {/* Areas to Improve */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-4 rounded-3xl shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            {t.areasToImprove}
          </h3>
          <p className="text-sm text-gray-600 mb-4">{t.improveTip}</p>
          
          <div className="space-y-3">
            {userProfile.areasToImprove.slice(0, 3).map((area, index) => (
              <motion.div
                key={area.topic}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl ${area.color} flex items-center justify-center text-lg`}>
                  {area.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{area.topic}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={area.score} className="flex-1 h-2" />
                    <span className="text-sm font-medium text-gray-600">{area.score}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Badges Earned Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-4 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-murshidi-yellow" />
              {t.recentBadges}
            </h3>
            <Button variant="ghost" size="sm" className="text-murshidi-sky-blue">
              {t.viewAll}
            </Button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {earnedBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-2xl p-4 text-center min-w-[100px] shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                <div className="text-xs font-semibold text-gray-800 mb-1">{badge.name}</div>
                <div className="text-xs text-gray-600">{badge.description.substring(0, 30)}...</div>
                {badge.earnedDate && (
                  <div className="text-xs text-green-600 mt-1 font-medium">
                    {new Date(badge.earnedDate).toLocaleDateString('fr-FR')}
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Placeholder for unearned badges */}
            {userProfile.badges.filter(badge => !badge.earned).slice(0, 2).map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex-shrink-0 bg-gray-200 rounded-2xl p-4 text-center min-w-[100px] opacity-60"
              >
                <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                <div className="text-xs font-semibold text-gray-500 mb-1">{badge.name}</div>
                <div className="text-xs text-gray-400">À débloquer</div>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Continue Adventure Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          onClick={onContinueAdventure}
          className="w-full h-16 rounded-3xl text-xl font-bold text-white shadow-lg transform transition-all duration-300 hover:scale-105 star-trail"
          style={{ background: 'linear-gradient(135deg, var(--murshidi-sky-blue), var(--murshidi-yellow))' }}
        >
          <Play className="w-6 h-6 mr-3" />
          {t.continueAdventure}
        </Button>
      </motion.div>

      {/* Subjects Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Target className="w-6 h-6 text-murshidi-sky-blue" />
          {t.subjects}
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(courses).map(([subject, courseList], index) => {
            const course = courseList[0]; // Get first course for each subject
            const isUnlocked = course?.unlocked ?? false;
            const requiredLevel = 2 + index; // Each subject unlocks at different levels
            
            return (
              <motion.div
                key={subject}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={isUnlocked ? { scale: 1.03 } : {}}
                whileTap={isUnlocked ? { scale: 0.97 } : {}}
              >
                <Card
                  className={`p-4 rounded-3xl shadow-lg cursor-pointer transition-all duration-300 ${
                    isUnlocked 
                      ? 'hover:shadow-xl' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={() => isUnlocked && onSubjectSelect(subject)}
                >
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-gray-400/20 rounded-3xl flex items-center justify-center z-10">
                      <div className="text-center bg-white rounded-2xl p-3 shadow-lg">
                        <div className="text-2xl mb-1">🔒</div>
                        <div className="text-sm font-semibold text-gray-700">
                          {t.unlockAt} {requiredLevel}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className={`${course?.color || 'bg-gray-300'} rounded-2xl p-4 mb-3 relative overflow-hidden`}>
                    <div className="text-3xl mb-2">{course?.icon || '📚'}</div>
                    <div className="text-white">
                      <h3 className="font-bold text-lg mb-1">{course?.title || t[subject as keyof typeof t]}</h3>
                      {isUnlocked && (
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={course?.totalProgress || 0} 
                            className="flex-1 h-2 bg-white/30" 
                          />
                          <span className="text-sm font-semibold">
                            {course?.totalProgress || 0}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {isUnlocked && course && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {course.lessons.length} leçons
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= (course.totalProgress / 33)
                                ? 'text-murshidi-yellow fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}