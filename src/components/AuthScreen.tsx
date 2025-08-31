import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, User, Mail, Lock, LogIn, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import OwlIcon from './OwlIcon';
import { SupabaseService } from '../utils/supabaseService';
import { Language, UserProfile } from '../types/app';

interface AuthScreenProps {
  language: Language;
  onLogin: (userType: "student" | "teacher" | "parent", profile?: UserProfile) => void;
  onBack: () => void;
}

export default function AuthScreen({ language, onLogin, onBack }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    userType: 'student' as 'student' | 'teacher' | 'parent',
  });

  const isRTL = language === 'ar';

  const text = {
    fr: {
      signIn: 'Se connecter',
      signUp: 'Créer un compte',
      email: 'Adresse e-mail',
      password: 'Mot de passe',
      nickname: 'Surnom',
      userType: 'Type d\'utilisateur',
      student: 'Élève',
      teacher: 'Enseignant',
      parent: 'Parent',
      signInButton: 'Se connecter',
      signUpButton: 'Créer mon compte',
      switchToSignUp: 'Pas encore de compte? Inscris-toi!',
      switchToSignIn: 'Déjà un compte? Connecte-toi!',
      loading: 'Chargement...',
      welcome: 'Bienvenue sur Tutoo!',
      welcomeMessage: 'Ton assistant d\'apprentissage personnel t\'attend.',
      signUpSuccess: 'Compte créé avec succès! Tu peux maintenant te connecter.',
      emailRequired: 'L\'adresse e-mail est requise',
      passwordRequired: 'Le mot de passe est requis',
      nicknameRequired: 'Le surnom est requis',
      invalidEmail: 'Adresse e-mail invalide',
      passwordTooShort: 'Le mot de passe doit contenir au moins 6 caractères',
      back: 'Retour',
    },
    ar: {
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      email: 'عنوان البريد الإلكتروني',
      password: 'كلمة المرور',
      nickname: 'اللقب',
      userType: 'نوع المستخدم',
      student: 'طالب',
      teacher: 'معلم',
      parent: 'ولي أمر',
      signInButton: 'دخول',
      signUpButton: 'إنشاء حسابي',
      switchToSignUp: 'ليس لديك حساب؟ سجل الآن!',
      switchToSignIn: 'لديك حساب؟ سجل دخولك!',
      loading: 'جاري التحميل...',
      welcome: 'مرحباً بك في توتو!',
      welcomeMessage: 'مساعدك الشخصي في التعلم في انتظارك.',
      signUpSuccess: 'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.',
      emailRequired: 'عنوان البريد الإلكتروني مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      nicknameRequired: 'اللقب مطلوب',
      invalidEmail: 'عنوان بريد إلكتروني غير صحيح',
      passwordTooShort: 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل',
      back: 'رجوع',
    }
  };

  const t = text[language];

  const validateForm = () => {
    setError('');
    
    if (!formData.email) {
      setError(t.emailRequired);
      return false;
    }
    
    if (!formData.email.includes('@')) {
      setError(t.invalidEmail);
      return false;
    }
    
    if (!formData.password) {
      setError(t.passwordRequired);
      return false;
    }
    
    if (formData.password.length < 6) {
      setError(t.passwordTooShort);
      return false;
    }
    
    if (isSignUp && !formData.nickname) {
      setError(t.nicknameRequired);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isSignUp) {
        const result = await SupabaseService.signUp(
          formData.email,
          formData.password,
          formData.nickname,
          formData.userType
        );

        if (result.success && result.data) {
          setSuccess(t.signUpSuccess);
          setIsSignUp(false);
          setFormData(prev => ({ ...prev, password: '' }));
        } else {
          setError(result.error || 'Erreur lors de la création du compte');
        }
      } else {
        const result = await SupabaseService.signIn(formData.email, formData.password);

        if (result.success && result.data) {
          // Get user profile from local storage or fetch it
          const userProfile = SupabaseService.getCurrentUser();
          onLogin(formData.userType, userProfile || undefined);
        } else {
          // Show more user-friendly error messages
          let errorMessage = result.error || 'Erreur lors de la connexion';
          
          if (errorMessage.includes('Failed to fetch') || errorMessage.includes('Network error')) {
            errorMessage = language === 'fr' 
              ? 'Connexion impossible. Vérifiez votre connexion internet.' 
              : 'فشل في الاتصال. تحقق من اتصالك بالإنترنت.';
          } else if (errorMessage.includes('Invalid credentials')) {
            errorMessage = language === 'fr' 
              ? 'Email ou mot de passe incorrect.' 
              : 'البريد الإلكتروني أو كلمة المرور غير صحيحة.';
          }
          
          setError(errorMessage);
        }
      }
    } catch (error) {
      setError('Une erreur inattendue est survenue');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
    if (success) setSuccess(''); // Clear success message when user starts typing
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-murshidi-light-blue via-white to-murshidi-light-yellow ${isRTL ? 'rtl' : 'ltr'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <OwlIcon size={80} className="mx-auto mb-4" />
            </motion.div>
            <h1 className="text-2xl font-bold text-murshidi-sky-blue mb-2">
              {t.welcome}
            </h1>
            <p className="text-gray-600 text-sm">
              {t.welcomeMessage}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection for Sign Up */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="userType">{t.userType}</Label>
                <select
                  id="userType"
                  value={formData.userType}
                  onChange={(e) => updateFormData('userType', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-murshidi-sky-blue focus:border-transparent"
                >
                  <option value="student">{t.student}</option>
                  <option value="teacher">{t.teacher}</option>
                  <option value="parent">{t.parent}</option>
                </select>
              </motion.div>
            )}

            {/* Nickname for Sign Up */}
            <AnimatePresence>
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <Label htmlFor="nickname">{t.nickname}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="nickname"
                      type="text"
                      value={formData.nickname}
                      onChange={(e) => updateFormData('nickname', e.target.value)}
                      className="pl-10"
                      placeholder={t.nickname}
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="pl-10"
                  placeholder={t.email}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className="pl-10 pr-10"
                  placeholder={t.password}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Alert */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">{success}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-murshidi-sky-blue hover:bg-murshidi-indigo text-white py-3 rounded-lg font-medium transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                />
              ) : (
                <>{isSignUp ? <UserPlus className="w-5 h-5 mr-2" /> : <LogIn className="w-5 h-5 mr-2" />}</>
              )}
              {isLoading ? t.loading : (isSignUp ? t.signUpButton : t.signInButton)}
            </Button>

            {/* Switch Mode */}
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setSuccess('');
                  setFormData(prev => ({ ...prev, password: '', nickname: '' }));
                }}
                className="text-murshidi-sky-blue hover:text-murshidi-indigo text-sm font-medium transition-colors duration-300 block w-full"
                disabled={isLoading}
              >
                {isSignUp ? t.switchToSignIn : t.switchToSignUp}
              </button>
              
              {!isSignUp && (
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      email: 'demo@tutoo.mr',
                      password: 'demo123',
                      nickname: 'Élève Démo',
                      userType: 'student'
                    });
                  }}
                  className="text-murshidi-purple hover:text-murshidi-indigo text-xs font-medium transition-colors duration-300"
                  disabled={isLoading}
                >
                  {language === 'fr' ? 'Essai gratuit (Mode démo)' : 'تجربة مجانية (الوضع التجريبي)'}
                </button>
              )}
            </div>
          </form>

          {/* Back Button */}
          <div className="mt-6 pt-6 border-t">
            <Button
              variant="outline"
              onClick={onBack}
              className="w-full"
              disabled={isLoading}
            >
              {t.back}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
