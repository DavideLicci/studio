// src/componenti/layout/header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { PannelloImpostazioni } from './pannello-impostazioni';
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import { Avatar, AvatarFallback, AvatarImage } from '@/componenti/ui/avatar';
import { useState, useEffect } from 'react';
// Importa i tipi relativi al ContestoLingua se necessario per la funzione t
import { useToast } from '@/hooks/use-toast'; // Per il feedback
import { useLingua } from '@/hooks/use-lingua'; 

const CHIAVE_STORAGE_IMMAGINE_PROFILO = 'immagineProfiloPortfolio_v1';

export function Header() {
  const pathname = usePathname();
  const [immagineProfiloUri, setImmagineProfiloUri] = useState<string | null>(null);
  const [eClient, setEClient] = useState(false);
  const { t } = useLingua();
  const { toast } = useToast();

  useEffect(() => {
    setEClient(true);
    if (typeof window !== 'undefined') {
      const immagineMemorizzata = localStorage.getItem(CHIAVE_STORAGE_IMMAGINE_PROFILO);
      if (immagineMemorizzata) {
        setImmagineProfiloUri(immagineMemorizzata);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && eClient) {
      if (immagineProfiloUri) {
        localStorage.setItem(CHIAVE_STORAGE_IMMAGINE_PROFILO, immagineProfiloUri);
      } else {
        localStorage.removeItem(CHIAVE_STORAGE_IMMAGINE_PROFILO);
      }
    }
  }, [immagineProfiloUri, eClient]);

  const gestisciCambioImmagineProfilo = (datiImmagineUri: string | null) => {
    setImmagineProfiloUri(datiImmagineUri);
    if (datiImmagineUri) {
      toast({
        title: t('toast_profile_image_updated_title'),
        description: t('toast_profile_image_updated_desc'),
      });
    } else {
       toast({
        title: t('toast_profile_image_removed_title'),
        description: t('toast_profile_image_removed_desc'),
      });
    }
  };

  const elementiNavigazione = [
    { href: '/', labelKey: 'nav_home' },
    { href: '/progetti', labelKey: 'nav_projects' },
    { href: '/Biografia', labelKey: 'nav_about' }, // Corretto il percorso
    { href: '/pcto', labelKey: 'nav_pcto' },      // Nuovo link PCTO
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 text-lg font-semibold text-primary hover:text-primary/80 transition-colors">
          <Avatar className="h-8 w-8">
            {eClient && immagineProfiloUri ? (
              <AvatarImage src={immagineProfiloUri} alt={t('profile_avatar_alt_text')} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                {/* Usa le iniziali dal titolo dell'app tradotto o un fallback generico */}
                {eClient ? (t('app_title').split(' ').map(parola => parola[0]).join('').toUpperCase() || 'SP') : 'SP'}
              </AvatarFallback>
            )}
          </Avatar>
          <TestoTradotto translationKey="app_title" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {elementiNavigazione.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-all hover:text-foreground/80 hover:scale-105',
                pathname === item.href ? 'text-foreground font-semibold' : 'text-foreground/70'
              )}
            >
              <TestoTradotto translationKey={item.labelKey} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
           <PannelloImpostazioni 
             immagineProfiloCorrenteUri={immagineProfiloUri}
             onCambioImmagineProfilo={gestisciCambioImmagineProfilo} 
           />
           {/* Attivatore Menu Mobile (opzionale, può essere implementato in seguito) */}
        </div>
      </div>
    </header>
  );
}
