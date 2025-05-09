'use client';

import { useLingua } from '@/hooks/use-lingua';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/componenti/ui/select';
import { Label } from '@/componenti/ui/label';

export function SelettoreLingua() {
  const { lingua, setLingua, t } = useLingua();

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="selettore-lingua" className="text-sm font-medium">
        {t('language_label')}
      </Label>
      <Select value={lingua} onValueChange={(valore) => setLingua(valore as typeof lingua)} name="selettore-lingua">
        <SelectTrigger className="w-full">
          <SelectValue placeholder={t('language_label')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="it">{t('lang_it')}</SelectItem>
          <SelectItem value="en">{t('lang_en')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
