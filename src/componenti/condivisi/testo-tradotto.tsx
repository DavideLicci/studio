
'use client';

import { useLingua } from '@/hooks/use-lingua';

interface TestoTradottoProps extends React.HTMLAttributes<HTMLSpanElement> {
  translationKey: string; // La chiave di traduzione deve rimanere così per compatibilità con translations.json
  replacements?: Record<string, string | number>; // Le sostituzioni devono rimanere così per compatibilità
  as?: keyof JSX.IntrinsicElements; // Consenti di specificare il tag HTML
}

export function TestoTradotto({ translationKey, replacements, as: Componente = 'span', ...props }: TestoTradottoProps) {
  const { t } = useLingua();
  const tradotto = t(translationKey, replacements);

  // Se il testo tradotto contiene HTML, usa dangerouslySetInnerHTML
  // Per sicurezza, assicurati che le tue fonti di traduzione siano affidabili.
  // Un approccio più sicuro per HTML complesso è creare componenti.
  if (/<[a-z][\s\S]*>/i.test(tradotto)) {
    return <Componente {...props} dangerouslySetInnerHTML={{ __html: tradotto }} />;
  }

  return <Componente {...props}>{tradotto}</Componente>;
}
