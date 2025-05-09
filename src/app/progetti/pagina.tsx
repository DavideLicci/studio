'use client';

import type { ChangeEvent } from 'react';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/componenti/ui/card';
import { Button } from '@/componenti/ui/button';
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import { ExternalLink, Briefcase, Brain, ImageOff, Pencil, Trash2 } from 'lucide-react';
import { useLingua } from '@/hooks/use-lingua';
import { FiltriProgetto, type TipoFiltroProgetto } from '@/componenti/progetti/filtri-progetto';
import { DialogAggiungiProgetto } from '@/componenti/progetti/form-aggiungi-progetto';
import { DialogModificaProgetto } from '@/componenti/progetti/form-modifica-progetto';
import { DialogEliminaProgetto } from '@/componenti/progetti/dialog-elimina-progetto';

export interface Progetto {
  id: string;
  titolo: string;
  descrizione: string;
  categoria: 'tecnico' | 'umanistico';
  urlProgetto?: string;
  datiImmagineUri?: string;
}

const CHIAVE_STORAGE_PROGETTI = 'progettiAppPortfolio_v1';

export default function PaginaProgetti() {
  const { t } = useLingua();
  const [tuttiIProgetti, setTuttiIProgetti] = useState<Progetto[]>([]);
  const [filtroCorrente, setFiltroCorrente] = useState<TipoFiltroProgetto>('tutti');
  const [progettoInModifica, setProgettoInModifica] = useState<Progetto | null>(null);
  const [progettoInEliminazione, setProgettoInEliminazione] = useState<Progetto | null>(null);
  const [eClient, setEClient] = useState(false);

  useEffect(() => {
    setEClient(true);
    if (typeof window !== 'undefined') {
      const progettiMemorizzatiJson = localStorage.getItem(CHIAVE_STORAGE_PROGETTI);
      if (progettiMemorizzatiJson) {
        try {
          const progettiMemorizzati = JSON.parse(progettiMemorizzatiJson);
          setTuttiIProgetti(progettiMemorizzati);
        } catch (e) {
          console.error("Impossibile analizzare i progetti da localStorage", e);
          localStorage.removeItem(CHIAVE_STORAGE_PROGETTI);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && eClient) {
      // Salva solo se i progetti sono stati caricati o impostati esplicitamente,
      // per evitare di sovrascrivere localStorage con un array vuoto al rendering iniziale.
      if (tuttiIProgetti.length > 0 || localStorage.getItem(CHIAVE_STORAGE_PROGETTI)) {
        localStorage.setItem(CHIAVE_STORAGE_PROGETTI, JSON.stringify(tuttiIProgetti));
      } else if (tuttiIProgetti.length === 0 && !localStorage.getItem(CHIAVE_STORAGE_PROGETTI)) {
        // Se è effettivamente vuoto e non c'era nulla in memoria, salva comunque vuoto per riflettere questo.
        localStorage.setItem(CHIAVE_STORAGE_PROGETTI, JSON.stringify([]));
      }
    }
  }, [tuttiIProgetti, eClient]);

  const gestisciAggiungiProgetto = (nuovoProgetto: Progetto) => {
    setTuttiIProgetti(progettiPrecedenti => [...progettiPrecedenti, nuovoProgetto]);
  };

  const gestisciAggiornaProgetto = (progettoAggiornato: Progetto) => {
    setTuttiIProgetti(progettiPrecedenti =>
      progettiPrecedenti.map(p => (p.id === progettoAggiornato.id ? progettoAggiornato : p))
    );
    setProgettoInModifica(null);
  };

  const gestisciConfermaEliminazione = (idProgetto: string) => {
    setTuttiIProgetti(progettiPrecedenti => progettiPrecedenti.filter(p => p.id !== idProgetto));
    setProgettoInEliminazione(null);
  };

  const progettiDaVisualizzare = useMemo(() => {
    if (filtroCorrente === 'tutti') {
      return tuttiIProgetti;
    }
    return tuttiIProgetti.filter(p => p.categoria === filtroCorrente);
  }, [tuttiIProgetti, filtroCorrente]);

  const progettiTecnici = progettiDaVisualizzare.filter(p => p.categoria === 'tecnico');
  const progettiUmanistici = progettiDaVisualizzare.filter(p => p.categoria === 'umanistico');

  const renderCardProgetto = (progetto: Progetto, indice: number) => (
    <Card
      key={progetto.id}
      className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out animate-in fade-in zoom-in-95"
      style={{ animationDelay: `${indice * 70}ms` }}
    >
      {progetto.datiImmagineUri ? (
        <div className="relative w-full h-48 bg-muted">
          <Image 
            src={progetto.datiImmagineUri} 
            alt={t('project_image_alt', { title: progetto.titolo })} 
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{objectFit: 'cover'}}
            data-ai-hint={`${progetto.categoria} ${progetto.titolo.substring(0,15)}`}
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-muted flex items-center justify-center">
          <ImageOff className="w-16 h-16 text-muted-foreground/50" />
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl flex items-center">
          {progetto.categoria === 'tecnico' ?
            <Briefcase className="mr-2 h-6 w-6 text-primary/80 shrink-0" /> :
            <Brain className="mr-2 h-6 w-6 text-primary/80 shrink-0" />
          }
          {progetto.titolo}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0 space-y-3">
        <CardDescription className="text-base leading-relaxed">
          {progetto.descrizione}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 bg-muted/20 dark:bg-muted/40 mt-auto flex-col space-y-3">
        {progetto.urlProgetto ? (
          <Button asChild className="w-full transform hover:scale-105 transition-transform">
            <Link href={progetto.urlProgetto} target="_blank" rel="noopener noreferrer">
              <TestoTradotto translationKey="view_project_details" />
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            <TestoTradotto translationKey="view_project_details" />
          </Button>
        )}
        <div className="flex w-full space-x-2">
          <Button variant="outline" className="w-1/2" onClick={() => setProgettoInModifica(progetto)}>
            <Pencil className="mr-2 h-4 w-4" />
            <TestoTradotto translationKey="edit_project_button" />
          </Button>
          <Button variant="destructive" className="w-1/2" onClick={() => setProgettoInEliminazione(progetto)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <TestoTradotto translationKey="delete_project_button" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  if (!eClient) {
    // Mostra uno stato di caricamento o null fino al completamento dell'idratazione lato client
    // per prevenire discrepanze di idratazione dall'accesso a localStorage.
    // Puoi usare il tuo componente di caricamento globale o uno più semplice qui.
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4 md:p-8 space-y-8">
        {/* Scheletro semplificato per il caricamento della pagina dei progetti */}
        <div className="h-12 w-1/2 rounded-md bg-muted animate-pulse"></div>
        <div className="h-64 w-full max-w-3xl rounded-lg bg-muted animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <header className="text-center animate-in fade-in slide-in-from-top-10 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <TestoTradotto translationKey="projects_title" />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          <TestoTradotto translationKey="projects_intro" />
        </p>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <FiltriProgetto filtroCorrente={filtroCorrente} onCambioFiltro={setFiltroCorrente} />
        <DialogAggiungiProgetto onAggiungiProgetto={gestisciAggiungiProgetto} />
      </div>
      
      {(filtroCorrente === 'tutti' || filtroCorrente === 'tecnico') && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
          <h2 className="text-3xl font-semibold text-center md:text-left flex items-center justify-center md:justify-start">
            <Briefcase className="mr-3 h-7 w-7 text-primary" />
            <TestoTradotto translationKey="projects_technical_title" />
          </h2>
          {progettiTecnici.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {progettiTecnici.map(renderCardProgetto)}
            </div>
          ) : (
            <p className="text-muted-foreground text-center md:text-left"><TestoTradotto translationKey="projects_no_technical_projects" /></p>
          )}
        </section>
      )}

      {(filtroCorrente === 'tutti' || filtroCorrente === 'umanistico') && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
          <h2 className="text-3xl font-semibold text-center md:text-left flex items-center justify-center md:justify-start">
            <Brain className="mr-3 h-7 w-7 text-primary" />
            <TestoTradotto translationKey="projects_humanistic_title" />
          </h2>
          {progettiUmanistici.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {progettiUmanistici.map(renderCardProgetto)}
            </div>
          ) : (
            <p className="text-muted-foreground text-center md:text-left"><TestoTradotto translationKey="projects_no_humanistic_projects" /></p>
          )}
        </section>
      )}

      {progettoInModifica && (
        <DialogModificaProgetto
          progetto={progettoInModifica}
          eAperto={!!progettoInModifica}
          onCambioApertura={(aperto) => { if (!aperto) setProgettoInModifica(null); }}
          onModificaProgetto={gestisciAggiornaProgetto}
        />
      )}

      {progettoInEliminazione && (
        <DialogEliminaProgetto
          progetto={progettoInEliminazione}
          eAperto={!!progettoInEliminazione}
          onCambioApertura={(aperto) => { if (!aperto) setProgettoInEliminazione(null); }}
          onConfermaEliminazione={gestisciConfermaEliminazione}
        />
      )}
    </div>
  );
}
