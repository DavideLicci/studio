
'use client';

import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { ContestoLingua, type Lingua, type Traduzioni } from '@/contexts/contesto-lingua';

interface ProviderLinguaProps {
  children: ReactNode;
  linguaPredefinita?: Lingua;
  chiaveStorage?: string;
}

export function ProviderLingua({
  children,
  linguaPredefinita = 'it',
  chiaveStorage = 'portfolio-lingua',
}: ProviderLinguaProps) {
  const [lingua, setLingua] = useState<Lingua>(() => {
    if (typeof window === 'undefined') {
      return linguaPredefinita;
    }
    try {
      const linguaMemorizzata = window.sessionStorage.getItem(chiaveStorage) as Lingua | null;
      return linguaMemorizzata || linguaPredefinita;
    } catch (e) {
      console.error('Impossibile leggere la lingua da sessionStorage', e);
      return linguaPredefinita;
    }
  });

  const [traduzioni, setTraduzioni] = useState<Traduzioni>({});
  const [staCaricando, setStaCaricando] = useState(true);

  useEffect(() => {
    async function caricaTraduzioni() {
      setStaCaricando(true);
      try {
        const risposta = await fetch('/traduzioni.json'); // Aggiornato il percorso
        if (!risposta.ok) {
          throw new Error(`Errore HTTP! stato: ${risposta.status}`);
        }
        const dati = await risposta.json();
        setTraduzioni(dati);
      } catch (errore) {
        console.error('Impossibile caricare le traduzioni:', errore);
        setTraduzioni({}); // Imposta a vuoto o fallback predefinito
      } finally {
        setStaCaricando(false);
      }
    }
    caricaTraduzioni();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(chiaveStorage, lingua);
      } catch (e) {
        console.error('Impossibile salvare la lingua in sessionStorage', e);
      }
    }
  }, [lingua, chiaveStorage]);

  const t = useCallback((chiave: string, sostituzioni?: Record<string, string | number>): string => {
    if (staCaricando) return chiave; // O una stringa indicatore di caricamento

    const setTraduzione = traduzioni[chiave];
    if (!setTraduzione) {
      console.warn(`Chiave di traduzione "${chiave}" non trovata.`);
      return chiave;
    }
    
    let testo = setTraduzione[lingua] || setTraduzione['en'] || chiave; // Fallback a EN poi alla chiave

    if (sostituzioni) {
      Object.entries(sostituzioni).forEach(([segnaposto, valore]) => {
        testo = testo.replace(new RegExp(`{${segnaposto}}`, 'g'), String(valore));
      });
    }
    
    return testo;
  }, [lingua, traduzioni, staCaricando]);

  return (
    <ContestoLingua.Provider value={{ lingua, setLingua, traduzioni, t }}>
      {children}
    </ContestoLingua.Provider>
  );
}
