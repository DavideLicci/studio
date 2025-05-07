'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { LanguageContext, type Language, type Translations } from '@/contexts/language-context';

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: Language;
  storageKey?: string;
}

export function LanguageProvider({
  children,
  defaultLanguage = 'it',
  storageKey = 'portfolio-lang',
}: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === 'undefined') {
      return defaultLanguage;
    }
    try {
      const storedLanguage = window.sessionStorage.getItem(storageKey) as Language | null;
      return storedLanguage || defaultLanguage;
    } catch (e) {
      console.error('Failed to read language from sessionStorage', e);
      return defaultLanguage;
    }
  });

  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchTranslations() {
      setIsLoading(true);
      try {
        const response = await fetch('/translations.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to fetch translations:', error);
        setTranslations({}); // Set to empty or default fallback
      } finally {
        setIsLoading(false);
      }
    }
    fetchTranslations();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(storageKey, language);
      } catch (e) {
        console.error('Failed to save language to sessionStorage', e);
      }
    }
  }, [language, storageKey]);

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    if (isLoading) return key; // Or a loading indicator string

    const translationSet = translations[key];
    if (!translationSet) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    
    let text = translationSet[language] || translationSet['en'] || key; // Fallback to EN then key

    if (replacements) {
      Object.entries(replacements).forEach(([placeholder, value]) => {
        text = text.replace(new RegExp(`{${placeholder}}`, 'g'), String(value));
      });
    }
    
    return text;
  }, [language, translations, isLoading]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations, t }}>
      {children}
    </LanguageContext.Provider>
  );
}