
'use client';

import { Moon, Sun } from 'lucide-react';
import { useTema } from '@/hooks/use-tema';
import { useLingua } from '@/hooks/use-lingua';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/componenti/ui/select';
import { Label } from '@/componenti/ui/label';

export function SelettoreTema() {
  const { tema, setTema } = useTema();
  const { t } = useLingua();

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="selettore-tema" className="text-sm font-medium">
        {t('theme_label')}
      </Label>
      <Select value={tema} onValueChange={(valore) => setTema(valore as typeof tema)} name="selettore-tema" >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t('theme_label')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              {t('theme_light')}
            </div>
          </SelectItem>
          <SelectItem value="dark">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              {t('theme_dark')}
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
