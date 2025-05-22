
'use client';

import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/componenti/ui/card';
import { MapPin, Brain, CalendarDays, Users2, Lightbulb, TrendingUp, Briefcase } from 'lucide-react';

export default function PaginaPCTO() {
  const sezioni = [
    {
      icona: MapPin,
      titoloKey: 'pcto_section_dove_titolo',
      testoKey: 'pcto_section_dove_testo',
      delay: 200,
    },
    {
      icona: Brain,
      titoloKey: 'pcto_section_obiettivi_titolo',
      testoKey: 'pcto_section_obiettivi_testo',
      paragrafiExtraKeys: ['pcto_section_obiettivi_testo_p2'],
      delay: 300,
    },
    {
      icona: CalendarDays,
      titoloKey: 'pcto_section_struttura_titolo',
      testoKey: 'pcto_section_struttura_testo_intro',
      listaItemsKeys: [
        'pcto_section_struttura_lista_1',
        'pcto_section_struttura_lista_2',
        'pcto_section_struttura_lista_3',
      ],
      conclusioneKey: 'pcto_section_struttura_conclusione',
      delay: 400,
    },
    {
      icona: Users2,
      titoloKey: 'pcto_section_colpito_titolo',
      testoKey: 'pcto_section_colpito_testo_p1',
      paragrafiExtraKeys: ['pcto_section_colpito_testo_p2', 'pcto_section_colpito_testo_p3'],
      delay: 500,
    },
    {
      icona: Lightbulb,
      titoloKey: 'pcto_section_imparato_titolo',
      testoKey: 'pcto_section_imparato_testo_intro',
      listaItemsKeys: [
        'pcto_section_imparato_lista_1',
        'pcto_section_imparato_lista_2',
        'pcto_section_imparato_lista_3',
      ],
      delay: 600,
    },
    {
      icona: TrendingUp,
      titoloKey: 'pcto_section_futuro_titolo',
      testoKey: 'pcto_section_futuro_testo_p1',
      paragrafiExtraKeys: ['pcto_section_futuro_testo_p2'],
      delay: 700,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 p-4">
      <header className="text-center animate-in fade-in slide-in-from-top-10 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center justify-center">
          <Briefcase className="mr-3 h-10 w-10 text-primary" />
          <TestoTradotto translationKey="pcto_main_title" />
        </h1>
         <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          <TestoTradotto translationKey="pcto_main_subtitle" />
        </p>
      </header>

      {sezioni.map((sezione, index) => {
        const IconaComponente = sezione.icona;
        return (
          <section 
            key={index} 
            className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700"
            style={{ animationDelay: `${sezione.delay}ms` }}
          >
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-semibold text-primary/90 flex items-center">
                  <IconaComponente className="mr-3 h-7 w-7 shrink-0" />
                  <TestoTradotto translationKey={sezione.titoloKey} />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><TestoTradotto translationKey={sezione.testoKey} /></p>
                {sezione.paragrafiExtraKeys?.map((paragrafoKey, pIndex) => (
                  <p key={pIndex}><TestoTradotto translationKey={paragrafoKey} /></p>
                ))}
                {sezione.listaItemsKeys && (
                  <ul className="list-disc list-inside space-y-2 pl-4">
                    {sezione.listaItemsKeys.map((itemKey, iIndex) => (
                      <li key={iIndex}><TestoTradotto translationKey={itemKey} /></li>
                    ))}
                  </ul>
                )}
                {sezione.conclusioneKey && (
                  <p><TestoTradotto translationKey={sezione.conclusioneKey} /></p>
                )}
              </CardContent>
            </Card>
          </section>
        );
      })}
    </div>
  );
}
