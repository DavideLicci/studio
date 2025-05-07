'use client';

import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ThemeSwitcher } from './theme-switcher';
import { LanguageSwitcher } from './language-switcher';
import { useLanguage } from '@/hooks/use-language';
import { Separator } from '@/components/ui/separator';

export function SettingsPanel() {
  const { t } = useLanguage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('settings_label')}>
          <Settings className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4 space-y-4">
        <h4 className="font-medium leading-none">{t('settings_label')}</h4>
        <Separator />
        <ThemeSwitcher />
        <LanguageSwitcher />
      </PopoverContent>
    </Popover>
  );
}