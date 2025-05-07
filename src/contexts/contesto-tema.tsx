
import type { Dispatch, SetStateAction } from 'react';
import { createContext } from 'react';

export type Tema = 'light' | 'dark' | 'system';

interface TipoContestoTema {
  tema: Tema;
  setTema: Dispatch<SetStateAction<Tema>>;
  temaRisolto: 'light' | 'dark';
}

export const ContestoTema = createContext<TipoContestoTema | undefined>(undefined);
