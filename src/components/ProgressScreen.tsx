import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Star, Calendar, Target, Award, Zap, Crown } from 'lucide-react';
import type { Language, UserProfile } from '../App';

interface ProgressScreenProps {
  language: Language;
  userProfile?: UserProfile;
  onBack: () => void;
}

const translations = {
  fr: {
    title: 'Tes Exploits',
    overview: 'Vue d\'ensemble',
    badges: 'Badges',
    trophies: 'Trophées',
    streak: 'Série',
    level: 'Niveau',
    totalXp: 'XP Total',
    badgesEarned: 'Badges gagnés',
    currentStreak: 'Série actuelle',
    days: 'jours',
    bestStreak: 'Meilleure série',
    weeklyGoal: 'Objectif hebdomadaire',
    dailyStreak: 'Série quotidienne',
    earnedOn: 'Gagné le',
    notEarned: 'Pas encore gagné',
    progress: 'Progrès',
    mastery: 'Maîtrise',
    special: 'Spécial',
    stickers: 'Autocollants',
    stickerBook: 'Carnet d\'autocollants',
    collect: 'Collectionne',
    allStickers: 'tous les autocollants'
  },
  ar: {
    title: 'إنجازاتك',
    overview: 'نظرة عامة',
    badges: 'الأوسمة',
    trophies: 'الكؤوس',
    streak: 'السلسلة',
    level: 'المستوى',
    totalXp: 'النقاط الكلية',
    badgesEarned: 'الأوسمة المكتسبة',
    currentStreak: 'السلسلة الحالية',
    days: 'أيام',
    bestStreak: 'أفضل سلسلة',
    weeklyGoal: 'الهدف الأسبوعي',
    dailyStreak: 'السلسلة اليومية',
    earnedOn: 'حصل عليه في',
    notEarned: 'لم يحصل عليه بعد',
    progress: 'التقدم',
    mastery: 'الإتقان',
    special: 'خاص',
    stickers: 'الملصقات',
    stickerBook: 'كتاب الملصقات',
    collect: 'اجمع',
    allStickers: 'كل الملصقات'
  }
};

const avatarThemes = {
  football: { icon: '⚽', gradient: 'from-green-400 to-green-600' },
  wizard: { icon: '🧙‍♂️', gradient: 'from-purple-400 to-purple-600' },
  dragon: { icon: '🐉', gradient: 'from-red-400 to-orange-600' },
  space: { icon: '🚀', gradient: 'from-blue-400 to-purple-600' }
};

const badgeCategories = {
  progress: { icon: '🎯', color: 'bg-blue-100 text-blue-700' },
  mastery: { icon: '🧠', color: 'bg-purple-100 text-purple-700' },
  streak: { icon: '🔥', color: 'bg-orange-100 text-orange-700' },
  special: { icon: '✨', color: 'bg-yellow-100 text-yellow-700' }
};

const stickerCollection = [
  { id: 'star', emoji: '⭐', name: 'Étoile', unlocked: true },
  { id: 'trophy', emoji: '🏆', name: 'Trophée', unlocked: true },
  { id: 'medal', emoji: '🏅', name: 'Médaille', unlocked: true },
  { id: 'crown', emoji: '👑', name: 'Couronne', unlocked: true },
  { id: 'diamond', emoji: '💎', name: 'Diamant', unlocked: false },
  { id: 'rocket', emoji: '🚀', name: 'Fusée', unlocked: false },
  { id: 'magic', emoji: '✨', name: 'Magie', unlocked: false },
  { id: 'fire', emoji: '🔥', name: 'Feu', unlocked: false },
  { id: 'lightning', emoji: '⚡', name: 'Éclair', unlocked: false },
  { id: 'rainbow', emoji: '🌈', name: 'Arc-en-ciel', unlocked: false },
  { id: 'unicorn', emoji: '🦄', name: 'Licorne', unlocked: false },
  { id: 'dragon', emoji: '🐲', name: 'Dragon', unlocked: false }
];

export default function ProgressScreen({ language, userProfile, onBack }: ProgressScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const t = translations[language];

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const currentTheme = avatarThemes[userProfile.avatar];
  const earnedBadges = userProfile.badges.filter(badge => badge.earned);
  const unlockedStickers = stickerCollection.filter(sticker => sticker.unlocked);

  // Generate weekly calendar for streak visualization
  const weekDays = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const currentWeek = Array.from({ length: 7 }, (_, i) => ({
    day: weekDays[i],
    completed: i < userProfile.streak % 7
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-yellow-100 to-green-200">
      {/* Header */}
      <div className="p-4 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-full w-10 h-10 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-white/60 p-1">
            <TabsTrigger value="overview" className="rounded-xl">📊 {t.overview}</TabsTrigger>
            <TabsTrigger value="badges" className="rounded-xl">🏆 {t.badges}</TabsTrigger>
            <TabsTrigger value="streak" className="rounded-xl">🔥 {t.streak}</TabsTrigger>
            <TabsTrigger value="stickers" className="rounded-xl">⭐ {t.stickers}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* User Level Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 rounded-3xl shadow-lg">
                <div className={`bg-gradient-to-br ${currentTheme.gradient} rounded-2xl p-6 text-white relative overflow-hidden`}>
                  <div className="flex items-center gap-4">
                    <div className="text-6xl">{currentTheme.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{userProfile.nickname}</h2>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-white/20 text-white border-0">
                          {t.level} {userProfile.level}
                        </Badge>
                        <span className="text-white/90">
                          {userProfile.xp} / {userProfile.xpToNextLevel} XP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-4 rounded-3xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-murshidi-sky-blue mb-1">
                    {userProfile.totalXp}
                  </div>
                  <div className="text-sm text-gray-600">{t.totalXp}</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-4 rounded-3xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-murshidi-green mb-1">
                    {earnedBadges.length}
                  </div>
                  <div className="text-sm text-gray-600">{t.badgesEarned}</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-4 rounded-3xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-1">
                    {userProfile.streak}
                  </div>
                  <div className="text-sm text-gray-600">{t.currentStreak} {t.days}</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-4 rounded-3xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-1">
                    {unlockedStickers.length}
                  </div>
                  <div className="text-sm text-gray-600">{t.stickers}</div>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {userProfile.badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`p-4 rounded-3xl shadow-lg ${badge.earned ? 'bg-gradient-to-r from-yellow-100 to-yellow-200' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl ${badge.earned ? 'opacity-100' : 'opacity-30'}`}>
                        {badge.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${badge.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                          {badge.name}
                        </h3>
                        <p className={`text-sm ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                          {badge.description}
                        </p>
                        {badge.earned && badge.earnedDate && (
                          <p className="text-xs text-green-600 mt-1">
                            {t.earnedOn} {badge.earnedDate}
                          </p>
                        )}
                        {!badge.earned && (
                          <p className="text-xs text-gray-400 mt-1">{t.notEarned}</p>
                        )}
                      </div>
                      <Badge className={badgeCategories[badge.category].color}>
                        {badgeCategories[badge.category].icon}
                      </Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Streak Tab */}
          <TabsContent value="streak" className="space-y-4">
            {/* Current Streak */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-orange-200 to-red-200">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔥</div>
                  <h2 className="text-3xl font-bold text-orange-800 mb-2">
                    {userProfile.streak} {t.days}
                  </h2>
                  <p className="text-orange-700">{t.currentStreak}</p>
                </div>
              </Card>
            </motion.div>

            {/* Weekly Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 rounded-3xl shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {t.weeklyGoal}
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {currentWeek.map((day, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-xl flex items-center justify-center font-semibold ${
                        day.completed
                          ? 'bg-green-400 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {day.day}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Stickers Tab */}
          <TabsContent value="stickers" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 rounded-3xl shadow-lg">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  {t.stickerBook}
                </h3>
                <p className="text-gray-600 mb-4">
                  {t.collect} {stickerCollection.length} {t.allStickers}!
                </p>
                
                <div className="grid grid-cols-4 gap-3">
                  {stickerCollection.map((sticker, index) => (
                    <motion.div
                      key={sticker.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center p-2 ${
                        sticker.unlocked
                          ? 'bg-gradient-to-br from-yellow-200 to-yellow-300 shadow-md'
                          : 'bg-gray-200'
                      }`}
                    >
                      <div className={`text-2xl mb-1 ${sticker.unlocked ? 'opacity-100' : 'opacity-30'}`}>
                        {sticker.emoji}
                      </div>
                      <div className={`text-xs text-center font-medium ${
                        sticker.unlocked ? 'text-gray-700' : 'text-gray-400'
                      }`}>
                        {sticker.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}