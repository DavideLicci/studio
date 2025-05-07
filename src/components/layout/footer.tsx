'use client';

import { TranslatedText } from '@/components/shared/translated-text';
import { useState, useEffect } from 'react';

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  if (currentYear === null) {
    return null; // Or a loading state for the footer
  }

  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          <TranslatedText translationKey="footer_text" replacements={{ year: currentYear }} />
        </p>
      </div>
    </footer>
  );
}