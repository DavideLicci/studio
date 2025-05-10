'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/componenti/ui/alert-dialog";
import { Button } from "@/componenti/ui/button";
import { TestoTradotto } from "@/componenti/condivisi/testo-tradotto";
import type { Progetto } from "@/app/progetti/page"; // Aggiornato il percorso
import { useLingua } from "@/hooks/use-lingua";

interface DialogEliminaProgettoProps {
  progetto: Progetto | null;
  eAperto: boolean;
  onCambioApertura: (aperto: boolean) => void;
  onConfermaEliminazione: (idProgetto: string) => void;
}

export function DialogEliminaProgetto({ progetto, eAperto, onCambioApertura, onConfermaEliminazione }: DialogEliminaProgettoProps) {
  const { t } = useLingua();

  if (!progetto) return null;

  const gestisciConferma = () => {
    onConfermaEliminazione(progetto.id);
    onCambioApertura(false);
  };

  return (
    <AlertDialog open={eAperto} onOpenChange={onCambioApertura}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle><TestoTradotto translationKey="delete_confirmation_title" /></AlertDialogTitle>
          <AlertDialogDescription>
            <TestoTradotto 
              translationKey="delete_confirmation_desc" 
              replacements={{ title: progetto.titolo }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={() => onCambioApertura(false)}>
              <TestoTradotto translationKey="form_cancel_button" />
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={gestisciConferma}>
              <TestoTradotto translationKey="delete_button_confirm" />
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
