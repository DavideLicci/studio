
'use client';
import { useContext } from 'react';
import { ContestoLingua } from '@/contexts/contesto-lingua';

export const useLingua = () => {
  const contesto = useContext(ContestoLingua);
  if (contesto === undefined) {
    throw new Error('useLingua deve essere usato all\'interno di un ProviderLingua');
  }
  return contesto;
};
