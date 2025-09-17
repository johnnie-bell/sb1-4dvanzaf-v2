'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Language, getTranslation, Translations } from '@/lib/i18n';
import { localStore } from '@/lib/localStore';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStore.get<Language>('language', 'en');
    // Validate saved language is supported
    if (['en', 'es', 'fr', 'nl'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      setLanguageState('en');
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStore.set('language', lang);
  };

  const t = (key: keyof Translations): string => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}