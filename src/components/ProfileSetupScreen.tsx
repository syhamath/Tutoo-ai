import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion } from 'motion/react';
import type { Language, Theme, UserProfile } from '../App';

interface ProfileSetupScreenProps {
  language: Language;
  userProfile?: UserProfile;
  onComplete: (profile: Partial<UserProfile>) => void;
}

const translations = {
  fr: {
    title: 'Créons ton Avatar!',
    subtitle: 'Choisis ton héros et commence ton aventure',
    nickname: 'Ton surnom',
    nicknamePlaceholder: 'Ex: Super Champion',
    chooseAvatar: 'Choisis ton avatar',
    themePreview: 'Aperçu du thème',
    startAdventure: 'Commencer l\'Aventure!',
    football: {
      name: 'Joueur de Foot',
      description: 'Marque des buts dans tes apprentissages!',
      theme: 'Stade et terrains de foot'
    },
    wizard: {
      name: 'Magicien',
      description: 'Lance des sorts de connaissance!',
      theme: 'Château magique et potions'
    },
    dragon: {
      name: 'Dresseur de Dragon',
      description: 'Élève ton dragon avec tes réussites!',
      theme: 'Montagnes et dragons volants'
    },
    space: {
      name: 'Héros Spatial',
      description: 'Explore les galaxies du savoir!',
      theme: 'Vaisseaux spatiaux et planètes'
    }
  },
  ar: {
    title: 'لننشئ شخصيتك!',
    subtitle: 'اختر بطلك وابدأ مغامرتك',
    nickname: 'لقبك',
    nicknamePlaceholder: 'مثال: البطل الخارق',
    chooseAvatar: 'اختر شخصيتك',
    themePreview: 'معاينة الموضوع',
    startAdventure: 'ابدأ المغامرة!',
    football: {
      name: 'لاعب كرة القدم',
      description: 'سجل أهدافاً في تعلمك!',
      theme: 'ملاعب وكرات القدم'
    },
    wizard: {
      name: 'الساحر',
      description: 'اقذف تعاويذ المعرفة!',
      theme: 'القلعة السحرية والوصفات'
    },
    dragon: {
      name: 'مدرب التنين',
      description: 'ربِّ تنينك بنجاحاتك!',
      theme: 'الجبال والتنانين الطائرة'
    },
    space: {
      name: 'البطل الفضائي',
      description: 'استكشف مجرات المعرفة!',
      theme: 'المركبات الفضائية والكواكب'
    }
  }
};

const avatarThemes = {
  football: {
    icon: '⚽',
    gradient: 'from-green-400 to-green-600',
    color: 'text-green-700',
    bgPattern: '🏟️'
  },
  wizard: {
    icon: '🧙‍♂️',
    gradient: 'from-purple-400 to-purple-600', 
    color: 'text-purple-700',
    bgPattern: '🏰'
  },
  dragon: {
    icon: '🐉',
    gradient: 'from-red-400 to-orange-600',
    color: 'text-red-700',
    bgPattern: '🏔️'
  },
  space: {
    icon: '🚀',
    gradient: 'from-blue-400 to-purple-600',
    color: 'text-blue-700',
    bgPattern: '🌌'
  }
};

export default function ProfileSetupScreen({ 
  language, 
  userProfile, 
  onComplete 
}: ProfileSetupScreenProps) {
  const [nickname, setNickname] = useState(userProfile?.nickname || '');
  const [selectedAvatar, setSelectedAvatar] = useState<Theme>(userProfile?.avatar || 'football');
  
  const t = translations[language];

  const handleComplete = () => {
    if (nickname.trim()) {
      onComplete({
        nickname: nickname.trim(),
        avatar: selectedAvatar
      });
    }
  };

  const currentTheme = avatarThemes[selectedAvatar];

  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t.title}</h1>
        <p className="text-lg text-gray-600">{t.subtitle}</p>
      </motion.div>

      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Profile Setup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Nickname Input */}
            <Card className="p-6 mb-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                ✨ {t.nickname}
              </h3>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder={t.nicknamePlaceholder}
                className="text-lg p-4 rounded-2xl border-2 focus:border-murshidi-sky-blue"
                maxLength={20}
              />
            </Card>

            {/* Avatar Selection */}
            <Card className="p-6 rounded-3xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                🎭 {t.chooseAvatar}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {(Object.keys(avatarThemes) as Theme[]).map((theme) => {
                  const themeData = avatarThemes[theme];
                  const themeInfo = t[theme];
                  const isSelected = selectedAvatar === theme;
                  
                  return (
                    <motion.div
                      key={theme}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        className={`p-4 cursor-pointer transition-all duration-300 rounded-2xl ${
                          isSelected 
                            ? `ring-4 ring-murshidi-sky-blue bg-gradient-to-br ${themeData.gradient} text-white` 
                            : 'hover:shadow-lg bg-white'
                        }`}
                        onClick={() => setSelectedAvatar(theme)}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">{themeData.icon}</div>
                          <h4 className={`font-semibold mb-1 ${isSelected ? 'text-white' : themeData.color}`}>
                            {themeInfo.name}
                          </h4>
                          <p className={`text-sm ${isSelected ? 'text-white/90' : 'text-gray-600'}`}>
                            {themeInfo.description}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Right Side - Theme Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 rounded-3xl shadow-lg h-full">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                👁️ {t.themePreview}
              </h3>
              
              {/* Theme Preview */}
              <div className={`h-64 rounded-2xl bg-gradient-to-br ${currentTheme.gradient} p-6 mb-4 relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 text-6xl flex items-center justify-center">
                  {currentTheme.bgPattern}
                </div>
                
                {/* Avatar Display */}
                <div className="relative z-10 text-center text-white">
                  <div className="text-6xl mb-4">{currentTheme.icon}</div>
                  <div className="bg-white/20 rounded-2xl p-4">
                    <h4 className="text-2xl font-bold mb-2">
                      {nickname || 'Ton Nom'}
                    </h4>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">Niveau 1</span>
                      <div className="w-20 h-2 bg-white/30 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Description */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-gray-700 text-center">
                  <strong>{t[selectedAvatar].theme}</strong>
                </p>
                <p className="text-sm text-gray-600 mt-2 text-center">
                  Tes réussites et progrès s'afficheront avec ce thème!
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <Button
            onClick={handleComplete}
            disabled={!nickname.trim()}
            className="text-xl px-12 py-6 rounded-3xl font-bold text-white shadow-lg transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{ 
              background: nickname.trim() 
                ? `linear-gradient(135deg, var(--murshidi-sky-blue), var(--murshidi-yellow))`
                : 'gray'
            }}
          >
            <span className="flex items-center gap-3">
              ✨ {t.startAdventure}
            </span>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}