
'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ContestoTema, type Tema } from '@/contexts/contesto-tema';

interface ProviderTemaProps {
  children: ReactNode;
  temaPredefinito?: Tema;
  chiaveStorage?: string;
}

export function ProviderTema({
  children,
  temaPredefinito = 'system',
  chiaveStorage = 'portfolio-tema',
}: ProviderTemaProps) {
  const [tema, setTema] = useState<Tema>(() => {
    if (typeof window === 'undefined') {
      return temaPredefinito;
    }
    try {
      const temaMemorizzato = window.localStorage.getItem(chiaveStorage) as Tema | null;
      return temaMemorizzato || temaPredefinito;
    } catch (e) {
      console.error('Impossibile leggere il tema da localStorage', e);
      return temaPredefinito;
    }
  });

  const [temaRisolto, setTemaRisolto] = useState<'light' | 'dark'>('light');

  const applicaTema = useCallback((temaSelezionato: Tema) => {
    let temaCorrente: 'light' | 'dark';
    if (temaSelezionato === 'system') {
      temaCorrente = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else {
      temaCorrente = temaSelezionato;
    }

    setTemaRisolto(temaCorrente);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(temaCorrente);
  }, []);
  

  useEffect(() => {
    applicaTema(tema);
  }, [tema, applicaTema]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(chiaveStorage, tema);
      } catch (e) {
        console.error('Impossibile salvare il tema in localStorage', e);
      }
    }
  }, [tema, chiaveStorage]);

  // Ascolta i cambiamenti del tema di sistema se il tema è 'system'
  useEffect(() => {
    if (tema === 'system' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const gestisciCambio = () => {
        applicaTema('system');
      };
      mediaQuery.addEventListener('change', gestisciCambio);
      return () => mediaQuery.removeEventListener('change', gestisciCambio);
    }
  }, [tema, applicaTema]);


  return (
    <ContestoTema.Provider value={{ tema, setTema, temaRisolto }}>
      {children}
    </ContestoTema.Provider>
  );
}
