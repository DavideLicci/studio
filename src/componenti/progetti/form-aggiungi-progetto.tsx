
'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
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
  DialogTrigger,
  DialogClose,
} from '@/componenti/ui/dialog';
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import type { Progetto } from '@/app/progetti/pagina'; // Modifica il percorso se il tipo Progetto si sposta
import { useLingua } from '@/hooks/use-lingua';
import Image from 'next/image';
import { PlusCircle, UploadCloud, X } from 'lucide-react';

const schemaProgetto = z.object({
  titolo: z.string().min(1, { message: "form_field_required" }),
  descrizione: z.string().min(1, { message: "form_field_required" }),
  categoria: z.enum(['tecnico', 'umanistico'], { errorMap: () => ({ message: "form_field_required" }) }),
  urlProgetto: z.string().url({ message: "form_valid_url_required" }).optional().or(z.literal('')),
  datiImmagineUri: z.string().optional(),
});

type DatiFormProgetto = z.infer<typeof schemaProgetto>;

interface FormAggiungiProgettoProps {
  onAggiungiProgetto: (nuovoProgetto: Progetto) => void;
}

export function DialogAggiungiProgetto({ onAggiungiProgetto }: FormAggiungiProgettoProps) {
  const { t } = useLingua();
  const [eAperto, setEAperto] = useState(false);
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
    const nuovoProgetto: Progetto = {
      id: Date.now().toString(), // ID univoco semplice
      titolo: dati.titolo,
      descrizione: dati.descrizione,
      categoria: dati.categoria,
      urlProgetto: dati.urlProgetto || undefined,
      datiImmagineUri: dati.datiImmagineUri || undefined,
    };
    onAggiungiProgetto(nuovoProgetto);
    form.reset();
    setAnteprimaImmagine(null);
    setEAperto(false);
  };

  const gestisciChiusura = () => {
    form.reset();
    setAnteprimaImmagine(null);
    setEAperto(false);
  }

  return (
    <Dialog open={eAperto} onOpenChange={(aperto) => {
      if (!aperto) gestisciChiusura();
      else setEAperto(true);
    }}>
      <DialogTrigger asChild>
        <Button className="mb-8 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-in fade-in slide-in-from-bottom-5 delay-300">
          <PlusCircle className="mr-2 h-5 w-5" />
          <TestoTradotto translationKey="add_project_button" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle><TestoTradotto translationKey="form_add_project_dialog_title" /></DialogTitle>
          <DialogDescription>
            <TestoTradotto translationKey="form_add_project_dialog_desc" />
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="titolo"><TestoTradotto translationKey="form_title_label" /></Label>
            <Input id="titolo" {...form.register('titolo')} className="bg-background" />
            {form.formState.errors.titolo && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.titolo.message as string)}</p>}
          </div>

          <div>
            <Label htmlFor="descrizione"><TestoTradotto translationKey="form_description_label" /></Label>
            <Textarea id="descrizione" {...form.register('descrizione')} className="bg-background" />
            {form.formState.errors.descrizione && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.descrizione.message as string)}</p>}
          </div>

          <div>
            <Label htmlFor="categoria"><TestoTradotto translationKey="form_category_label" /></Label>
            <Select onValueChange={(valore) => form.setValue('categoria', valore as 'tecnico' | 'umanistico')} value={form.watch('categoria')}>
              <SelectTrigger className="w-full bg-background">
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
            <Label htmlFor="urlProgetto"><TestoTradotto translationKey="form_project_url_label" /></Label>
            <Input id="urlProgetto" {...form.register('urlProgetto')} className="bg-background" />
            {form.formState.errors.urlProgetto && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.urlProgetto.message as string)}</p>}
          </div>
          
          <div>
            <Label htmlFor="immagine"><TestoTradotto translationKey="form_image_label" /></Label>
            <Input id="immagine" type="file" accept="image/*" onChange={gestisciCambioImmagine} className="bg-background" />
            {staCaricando && <p className="text-sm text-muted-foreground mt-1">{t('form_uploading_image')}</p>}
            {anteprimaImmagine && (
              <div className="mt-2 relative w-full h-48">
                <Image src={anteprimaImmagine} alt={t('project_image_alt')} layout="fill" objectFit="contain" className="rounded-md border" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-1 right-1 bg-background/50 hover:bg-background/75"
                  onClick={() => {
                    setAnteprimaImmagine(null);
                    form.setValue('datiImmagineUri', undefined);
                    const fileInput = document.getElementById('immagine') as HTMLInputElement;
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
              <TestoTradotto translationKey="form_submit_button" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
