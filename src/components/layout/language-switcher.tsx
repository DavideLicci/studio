'use client';

import { useLanguage } from '@/hooks/use-language';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="lang-selector" className="text-sm font-medium">
        {t('language_label')}
      </Label>
      <Select value={language} onValueChange={(value) => setLanguage(value as typeof language)} name="lang-selector">
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