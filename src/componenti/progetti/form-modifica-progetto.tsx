'use client';

import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/componenti/ui/button';
import { Input } from '@/componenti/ui/input';
import { Label } from '@/componenti/ui/label';
import { Textarea } from '@/componenti/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/componenti/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/componenti/ui/dialog';
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import type { Progetto } from '@/app/progetti/page'; // Aggiornato il percorso
import { useLingua } from '@/hooks/use-lingua';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';

const schemaProgetto = z.object({
  titolo: z.string().min(1, { message: "form_field_required" }),
  descrizione: z.string().min(1, { message: "form_field_required" }),
  categoria: z.enum(['tecnico', 'umanistico'], { errorMap: () => ({ message: "form_field_required" }) }),
  urlProgetto: z.string().url({ message: "form_valid_url_required" }).optional().or(z.literal('')),
  datiImmagineUri: z.string().optional(),
});

type DatiFormProgetto = z.infer<typeof schemaProgetto>;

interface DialogModificaProgettoProps {
  progetto: Progetto | null;
  eAperto: boolean;
  onCambioApertura: (aperto: boolean) => void;
  onModificaProgetto: (progettoAggiornato: Progetto) => void;
}

export function DialogModificaProgetto({ progetto, eAperto, onCambioApertura, onModificaProgetto }: DialogModificaProgettoProps) {
  const { t } = useLingua();
  const [anteprimaImmagine, setAnteprimaImmagine] = useState<string | null>(null);
  const [staCaricando, setStaCaricando] = useState(false);

  const form = useForm<DatiFormProgetto>({
    resolver: zodResolver(schemaProgetto),
    defaultValues: {
      titolo: '',
      descrizione: '',
      urlProgetto: '',
      datiImmagineUri: '',
    },
  });

  useEffect(() => {
    if (progetto && eAperto) {
      form.reset({
        titolo: progetto.titolo,
        descrizione: progetto.descrizione,
        categoria: progetto.categoria,
        urlProgetto: progetto.urlProgetto || '',
        datiImmagineUri: progetto.datiImmagineUri || '',
      });
      setAnteprimaImmagine(progetto.datiImmagineUri || null);
    } else if (!eAperto) {
      form.reset();
      setAnteprimaImmagine(null);
    }
  }, [progetto, eAperto, form]);

  const gestisciCambioImmagine = (evento: ChangeEvent<HTMLInputElement>) => {
    const file = evento.target.files?.[0];
    if (file) {
      setStaCaricando(true);
      const lettore = new FileReader();
      lettore.onloadend = () => {
        setAnteprimaImmagine(lettore.result as string);
        form.setValue('datiImmagineUri', lettore.result as string);
        setStaCaricando(false);
      };
      lettore.readAsDataURL(file);
    } else {
      setAnteprimaImmagine(null);
      form.setValue('datiImmagineUri', undefined);
    }
  };

  const onSubmit = (dati: DatiFormProgetto) => {
    if (!progetto) return;
    const progettoAggiornato: Progetto = {
      ...progetto, // Mantieni l'ID originale
      titolo: dati.titolo,
      descrizione: dati.descrizione,
      categoria: dati.categoria,
      urlProgetto: dati.urlProgetto || undefined,
      datiImmagineUri: dati.datiImmagineUri || undefined,
    };
    onModificaProgetto(progettoAggiornato);
    onCambioApertura(false); // Chiudi dialog
  };

  const gestisciChiusura = () => {
    onCambioApertura(false);
  }

  return (
    <Dialog open={eAperto} onOpenChange={gestisciChiusura}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle><TestoTradotto translationKey="form_edit_project_dialog_title" /></DialogTitle>
          <DialogDescription>
            <TestoTradotto translationKey="form_edit_project_dialog_desc" />
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="modifica-titolo"><TestoTradotto translationKey="form_title_label" /></Label>
            <Input id="modifica-titolo" {...form.register('titolo')} className="bg-background" />
            {form.formState.errors.titolo && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.titolo.message as string)}</p>}
          </div>

          <div>
            <Label htmlFor="modifica-descrizione"><TestoTradotto translationKey="form_description_label" /></Label>
            <Textarea id="modifica-descrizione" {...form.register('descrizione')} className="bg-background" />
            {form.formState.errors.descrizione && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.descrizione.message as string)}</p>}
          </div>

          <div>
            <Label htmlFor="modifica-categoria"><TestoTradotto translationKey="form_category_label" /></Label>
            <Select onValueChange={(valore) => form.setValue('categoria', valore as 'tecnico' | 'umanistico')} value={form.watch('categoria')}>
              <SelectTrigger id="modifica-categoria" className="w-full bg-background">
                <SelectValue placeholder={t('form_select_category_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tecnico">{t('form_category_technical')}</SelectItem>
                <SelectItem value="umanistico">{t('form_category_humanistic')}</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.categoria && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.categoria.message as string)}</p>}
          </div>

          <div>
            <Label htmlFor="modifica-urlProgetto"><TestoTradotto translationKey="form_project_url_label" /></Label>
            <Input id="modifica-urlProgetto" {...form.register('urlProgetto')} className="bg-background" />
            {form.formState.errors.urlProgetto && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.urlProgetto.message as string)}</p>}
          </div>
          
          <div>
            <Label htmlFor="modifica-immagine"><TestoTradotto translationKey="form_image_label" /></Label>
            <Input id="modifica-immagine" type="file" accept="image/*" onChange={gestisciCambioImmagine} className="bg-background" />
            {staCaricando && <p className="text-sm text-muted-foreground mt-1">{t('form_uploading_image')}</p>}
            {anteprimaImmagine && (
              <div className="mt-2 relative w-full h-48">
                <Image src={anteprimaImmagine} alt={t('project_image_alt', { title: form.getValues('titolo') || 'Progetto' })} layout="fill" objectFit="contain" className="rounded-md border" />
                <Button 
                  type="button"
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-1 right-1 bg-background/50 hover:bg-background/75"
                  onClick={() => {
                    setAnteprimaImmagine(null);
                    form.setValue('datiImmagineUri', undefined);
                    const fileInput = document.getElementById('modifica-immagine') as HTMLInputElement;
                    if (fileInput) fileInput.value = ''; // Resetta input file
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline" onClick={gestisciChiusura}>
                    <TestoTradotto translationKey="form_cancel_button" />
                </Button>
            </DialogClose>
            <Button type="submit" disabled={staCaricando}>
              {staCaricando ? <UploadCloud className="mr-2 h-4 w-4 animate-pulse" /> : null}
              <TestoTradotto translationKey="form_save_changes_button" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
