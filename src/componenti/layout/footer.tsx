
'use client';

import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import { useState, useEffect } from 'react';

export function Footer() {
  const [annoCorrente, setAnnoCorrente] = useState<number | null>(null);

  useEffect(() => {
    setAnnoCorrente(new Date().getFullYear());
  }, []);
  
  if (annoCorrente === null) {
    return null; // O uno stato di caricamento per il footer
  }

  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
      <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          <TestoTradotto translationKey="footer_text" replacements={{ year: annoCorrente }} />
        </p>
      </div>
    </footer>
  );
}
