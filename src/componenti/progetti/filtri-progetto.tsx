
'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/componenti/ui/button';
import { Label } from '@/componenti/ui/label';
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import { cn } from '@/lib/utils';

export type TipoFiltroProgetto = 'tutti' | 'tecnico' | 'umanistico';

interface FiltriProgettoProps {
  filtroCorrente: TipoFiltroProgetto;
  onCambioFiltro: Dispatch<SetStateAction<TipoFiltroProgetto>>;
}

export function FiltriProgetto({ filtroCorrente, onCambioFiltro }: FiltriProgettoProps) {
  const filtri: { chiaveEtichetta: string; valore: TipoFiltroProgetto }[] = [
    { chiaveEtichetta: 'filter_all', valore: 'tutti' },
    { chiaveEtichetta: 'filter_technical', valore: 'tecnico' },
    { chiaveEtichetta: 'filter_humanistic', valore: 'umanistico' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-8 animate-in fade-in duration-500">
      <Label className="text-md font-medium shrink-0">
        <TestoTradotto translationKey="filter_by_category" />
      </Label>
      <div className="flex flex-wrap gap-2">
        {filtri.map((filtro) => (
          <Button
            key={filtro.valore}
            variant={filtroCorrente === filtro.valore ? 'default' : 'outline'}
            onClick={() => onCambioFiltro(filtro.valore)}
            className={cn(
              "transition-all duration-200 ease-in-out transform hover:scale-105",
              filtroCorrente === filtro.valore && "shadow-md"
            )}
          >
            <TestoTradotto translationKey={filtro.chiaveEtichetta} />
          </Button>
        ))}
      </div>
    </div>
  );
}
