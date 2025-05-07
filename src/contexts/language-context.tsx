import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export type Language = 'it' | 'en';

export interface Translations {
  [key: string]: {
    [lang in Language]?: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: Dispatch<SetStateAction<Language>>;
  translations: Translations;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);