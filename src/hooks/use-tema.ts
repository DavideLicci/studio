
'use client';
import { useContext } from 'react';
import { ContestoTema } from '@/contexts/contesto-tema';

export const useTema = () => {
  const contesto = useContext(ContestoTema);
  if (contesto === undefined) {
    throw new Error('useTema deve essere usato all\'interno di un ProviderTema');
  }
  return contesto;
};
