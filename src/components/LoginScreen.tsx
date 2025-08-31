import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import OwlIcon from "../src/assets/icons/OwlIcon";
import type { Language } from "../App";

interface LoginScreenProps {
  language: Language;
  onLogin: (userType: "student" | "parent" | "teacher") => void;
  onBackToOnboarding: () => void;
}

const translations = {
  fr: {
    welcome: "Bienvenue sur Tutoo",
    subtitle: "Ton assistant IA pour apprendre et grandir",
    email: "Adresse e-mail",
    password: "Mot de passe",
    login: "Se connecter",
    noAccount: "Pas de compte ?",
    createAccount: "Créer un compte",
    forgotPassword: "Mot de passe oublié ?",
    or: "ou",
    continueAsGuest: "Continuer en tant qu'invité",
    studentLogin: "Connexion Élève",
    parentLogin: "Connexion Parent", 
    teacherLogin: "Connexion Enseignant",
    back: "Retour"
  },
  ar: {
    welcome: "مرحباً بك في توتو",
    subtitle: "مساعدك الذكي للتعلم والنمو",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    noAccount: "ليس لديك حساب؟",
    createAccount: "إنشاء حساب",
    forgotPassword: "نسيت كلمة المرور؟",
    or: "أو",
    continueAsGuest: "المتابعة كضيف",
    studentLogin: "دخول الطالب",
    parentLogin: "دخول الوالدين",
    teacherLogin: "دخول المعلم",
    back: "رجوع"
  }
};

export default function LoginScreen({
  language,
  onLogin,
  onBackToOnboarding,
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedUserType, setSelectedUserType] = useState<"student" | "parent" | "teacher" | null>(null);
  
  const t = translations[language];

  const handleLogin = () => {
    if (selectedUserType) {
      onLogin(selectedUserType);
    }
  };

  const handleGuestLogin = () => {
    onLogin("student"); // Default to student for guest access
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: "linear-gradient(135deg, #87CEEB 0%, #FFE4B5 50%, #98FB98 100%)"
    }}>
      <Card className="w-full max-w-md rounded-card shadow-card border-0">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <OwlIcon size={80} className="wiggle" />
          </div>
          <div>
            <CardTitle className="text-2xl" style={{ color: "var(--murshidi-sky-blue)" }}>
              {t.welcome}
            </CardTitle>
            <CardDescription className="mt-2">
              {t.subtitle}
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-3">
            <Label>Choisir votre rôle / اختر دورك</Label>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant={selectedUserType === "student" ? "default" : "outline"}
                onClick={() => setSelectedUserType("student")}
                className={`h-12 ${selectedUserType === "student" ? "bg-murshidi-sky-blue hover:bg-murshidi-sky-blue/90" : ""}`}
              >
                🎓 {t.studentLogin}
              </Button>
              <Button
                variant={selectedUserType === "parent" ? "default" : "outline"}
                onClick={() => setSelectedUserType("parent")}
                className={`h-12 ${selectedUserType === "parent" ? "bg-murshidi-green hover:bg-murshidi-green/90" : ""}`}
              >
                👨‍👩‍👧‍👦 {t.parentLogin}
              </Button>
              <Button
                variant={selectedUserType === "teacher" ? "default" : "outline"}
                onClick={() => setSelectedUserType("teacher")}
                className={`h-12 ${selectedUserType === "teacher" ? "bg-murshidi-purple hover:bg-murshidi-purple/90" : ""}`}
              >
                👩‍🏫 {t.teacherLogin}
              </Button>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
                placeholder="exemple@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="password">{t.password}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            disabled={!selectedUserType || !email || !password}
            className="w-full h-12 rounded-xl bg-murshidi-sky-blue hover:bg-murshidi-sky-blue/90 text-white"
          >
            {t.login}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t.or}</span>
            </div>
          </div>

          {/* Guest Access */}
          <Button
            variant="outline"
            onClick={handleGuestLogin}
            className="w-full h-12 rounded-xl border-murshidi-yellow text-murshidi-sky-blue hover:bg-murshidi-light-yellow"
          >
            {t.continueAsGuest}
          </Button>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <button 
              className="text-sm text-murshidi-sky-blue hover:underline"
              onClick={() => {/* Handle forgot password */}}
            >
              {t.forgotPassword}
            </button>
            <div className="text-sm text-muted-foreground">
              {t.noAccount}{" "}
              <button 
                className="text-murshidi-sky-blue hover:underline"
                onClick={onBackToOnboarding}
              >
                {t.createAccount}
              </button>
            </div>
          </div>

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={onBackToOnboarding}
            className="w-full h-12 rounded-xl text-murshidi-sky-blue hover:bg-murshidi-light-blue"
          >
            ← {t.back}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}