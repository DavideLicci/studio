
'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Settings, UploadCloud, UserCircle, X } from 'lucide-react';
import { Button } from '@/componenti/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/componenti/ui/popover';
import { SelettoreTema } from './selettore-tema';
import { SelettoreLingua } from './selettore-lingua';
import { useLingua } from '@/hooks/use-lingua';
import { Separator } from '@/componenti/ui/separator';
import { Label } from '@/componenti/ui/label';
import { Input } from '@/componenti/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/componenti/ui/avatar';
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import { useToast } from '@/hooks/use-toast';

interface PannelloImpostazioniProps {
  immagineProfiloCorrenteUri: string | null;
  onCambioImmagineProfilo: (datiImmagineUri: string | null) => void;
}

export function PannelloImpostazioni({ immagineProfiloCorrenteUri, onCambioImmagineProfilo }: PannelloImpostazioniProps) {
  const { t } = useLingua();
  const { toast } = useToast();
  const [staCaricando, setStaCaricando] = useState(false);

  const gestisciCambioFileImmagine = async (evento: ChangeEvent<HTMLInputElement>) => {
    const file = evento.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limita la dimensione del file a 2MB
        toast({
          variant: "destructive",
          title: t('toast_file_too_large_title'),
          description: t('toast_file_too_large_desc', { maxSize: "2MB" }),
        });
        if (evento.target) evento.target.value = ""; // Pulisci l'input
        return;
      }

      setStaCaricando(true);
      try {
        const lettore = new FileReader();
        lettore.onloadend = () => {
          onCambioImmagineProfilo(lettore.result as string);
          setStaCaricando(false);
        };
        lettore.onerror = () => {
          setStaCaricando(false);
          toast({
            variant: "destructive",
            title: t('toast_image_upload_failed_title'),
            description: t('toast_image_upload_failed_desc'),
          });
        };
        lettore.readAsDataURL(file);
      } catch (errore) {
        setStaCaricando(false);
        console.error("Errore durante la lettura del file:", errore);
        toast({
          variant: "destructive",
          title: t('toast_image_upload_failed_title'),
          description: t('toast_image_upload_failed_desc'),
        });
      } finally {
        if (evento.target) evento.target.value = ""; // Pulisci l'input dopo l'elaborazione
      }
    }
  };

  const gestisciRimozioneImmagine = () => {
    onCambioImmagineProfilo(null);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('settings_label')}>
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 space-y-4">
        <h4 className="font-medium leading-none">{t('settings_label')}</h4>
        <Separator />
        <SelettoreTema />
        <SelettoreLingua />
        <Separator />
        
        <div className="space-y-2">
          <Label className="text-sm font-medium"><TestoTradotto translationKey="profile_image_label" /></Label>
          <div className="flex items-center space-x-3">
            <Avatar className="h-16 w-16">
              {immagineProfiloCorrenteUri ? (
                <AvatarImage src={immagineProfiloCorrenteUri} alt={t('profile_avatar_alt_text')} />
              ) : (
                <AvatarFallback className="bg-muted">
                  <UserCircle className="h-10 w-10 text-muted-foreground" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col space-y-2 flex-grow">
              <Button variant="outline" size="sm" asChild className="w-full" disabled={staCaricando}>
                <label htmlFor="carica-immagine-profilo" className={`cursor-pointer flex items-center justify-center ${staCaricando ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {staCaricando ? (
                    <UploadCloud className="mr-2 h-4 w-4 animate-pulse" />
                  ) : (
                    <UploadCloud className="mr-2 h-4 w-4" />
                  )}
                  <TestoTradotto translationKey={immagineProfiloCorrenteUri ? "change_profile_image_button" : "upload_profile_image_button"} />
                </label>
              </Button>
              <Input 
                id="carica-immagine-profilo" 
                type="file" 
                accept="image/png, image/jpeg, image/gif, image/webp" 
                className="hidden" 
                onChange={gestisciCambioFileImmagine}
                disabled={staCaricando}
              />
              {immagineProfiloCorrenteUri && (
                <Button variant="destructive" size="sm" onClick={gestisciRimozioneImmagine} className="w-full" disabled={staCaricando}>
                  <X className="mr-2 h-4 w-4" />
                  <TestoTradotto translationKey="remove_profile_image_button" />
                </Button>
              )}
            </div>
          </div>
          {staCaricando && <p className="text-xs text-muted-foreground text-center pt-1">{t('uploading_profile_image')}</p>}
        </div>
      </PopoverContent>
    </Popover>
  );
}
