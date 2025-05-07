
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export type Lingua = 'it' | 'en';

export interface Traduzioni {
  [chiave: string]: {
    [lingua in Lingua]?: string;
  };
}

interface TipoContestoLingua {
  lingua: Lingua;
  setLingua: Dispatch<SetStateAction<Lingua>>;
  traduzioni: Traduzioni;
  t: (chiave: string, sostituzioni?: Record<string, string | number>) => string;
}

export const ContestoLingua = createContext<TipoContestoLingua | undefined>(undefined);
