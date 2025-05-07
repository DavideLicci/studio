'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor="theme-selector" className="text-sm font-medium">
        {t('theme_label')}
      </Label>
      <Select value={theme} onValueChange={(value) => setTheme(value as typeof theme)} name="theme-selector" >
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