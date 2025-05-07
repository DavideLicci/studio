'use client';

import { useLanguage } from '@/hooks/use-language';

interface TranslatedTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  translationKey: string;
  replacements?: Record<string, string | number>;
  as?: keyof JSX.IntrinsicElements; // Allow specifying the HTML tag
}

export function TranslatedText({ translationKey, replacements, as: Component = 'span', ...props }: TranslatedTextProps) {
  const { t } = useLanguage();
  const translated = t(translationKey, replacements);

  // If the translated text contains HTML, use dangerouslySetInnerHTML
  // For security, ensure that your translation sources are trusted.
  // A safer approach for complex HTML is to create components.
  if (/<[a-z][\s\S]*>/i.test(translated)) {
    return <Component {...props} dangerouslySetInnerHTML={{ __html: translated }} />;
  }

  return <Component {...props}>{translated}</Component>;
}