import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, CloudOff, CheckCircle, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Language } from '../types/app';

interface ConnectionStatusProps {
  language: Language;
}

export default function ConnectionStatus({ language }: ConnectionStatusProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showAlert, setShowAlert] = useState(false);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(true);

  const isRTL = language === 'ar';

  const text = {
    fr: {
      online: 'Connexion rétablie',
      offline: 'Hors ligne',
      offlineMessage: 'Pas de connexion internet. Tes progrès seront sauvegardés localement.',
      backendOffline: 'Mode démo',
      backendOfflineMessage: 'Fonctionnement en mode démo. Certaines fonctionnalités peuvent être limitées.',
      syncWhenOnline: 'Tes données seront synchronisées quand la connexion sera rétablie.'
    },
    ar: {
      online: 'تم استعادة الاتصال',
      offline: 'غير متصل',
      offlineMessage: 'لا يوجد اتصال بالإنترنت. سيتم حفظ تقدمك محلياً.',
      backendOffline: 'الوضع التجريبي',
      backendOfflineMessage: 'يعمل في الوضع التجريبي. قد تكون بعض الميزات محدودة.',
      syncWhenOnline: 'ستتم مزامنة بياناتك عند استعادة الاتصال.'
    }
  };

  const t = text[language];

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowAlert(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check Supabase connection status
    const checkSupabaseConnection = async () => {
      try {
        const response = await fetch('https://pdzephiufkfjuybcniqv.supabase.co/functions/v1/make-server-ad5853f1/health', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkemVwaGl1ZmtmanV5YmNuaXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4MTE4ODYsImV4cCI6MjA3MTM4Nzg4Nn0.1lmDTYbWB9Mv5xQ_4ggp4jL_wiDzf6pLNy0peYkJp54`
          }
        });
        setIsSupabaseConnected(response.ok);
      } catch (error) {
        setIsSupabaseConnected(false);
      }
    };

    // Check connection immediately and then every 30 seconds
    checkSupabaseConnection();
    const interval = setInterval(checkSupabaseConnection, 30000);

    // Show offline alert if already offline
    if (!navigator.onLine) {
      setShowAlert(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  if (!showAlert && isOnline && isSupabaseConnected) {
    return null;
  }

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 left-4 right-4 z-50 ${isRTL ? 'rtl' : 'ltr'}`}
        >
          {!isOnline ? (
            <Alert className="border-orange-200 bg-orange-50">
              <WifiOff className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-700">
                <strong>{t.offline}</strong> - {t.offlineMessage}
                <br />
                <span className="text-sm opacity-75">{t.syncWhenOnline}</span>
              </AlertDescription>
            </Alert>
          ) : !isSupabaseConnected ? (
            <Alert className="border-blue-200 bg-blue-50">
              <CloudOff className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                <strong>{t.backendOffline}</strong> - {t.backendOfflineMessage}
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                <Wifi className="inline w-4 h-4 mr-1" />
                {t.online}
              </AlertDescription>
            </Alert>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
