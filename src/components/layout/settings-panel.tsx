
'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Settings, UploadCloud, UserCircle, X } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TranslatedText } from '@/components/shared/translated-text';
import { useToast } from '@/hooks/use-toast';

interface SettingsPanelProps {
  currentProfileImageUri: string | null;
  onProfileImageChange: (imageDataUri: string | null) => void;
}

export function SettingsPanel({ currentProfileImageUri, onProfileImageChange }: SettingsPanelProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // Limit file size to 2MB
        toast({
          variant: "destructive",
          title: t('toast_file_too_large_title'),
          description: t('toast_file_too_large_desc', { maxSize: "2MB" }),
        });
        if (event.target) event.target.value = ""; // Clear the input
        return;
      }

      setIsUploading(true);
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          onProfileImageChange(reader.result as string);
          setIsUploading(false);
        };
        reader.onerror = () => {
          setIsUploading(false);
          toast({
            variant: "destructive",
            title: t('toast_image_upload_failed_title'),
            description: t('toast_image_upload_failed_desc'),
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        setIsUploading(false);
        console.error("Error reading file:", error);
        toast({
          variant: "destructive",
          title: t('toast_image_upload_failed_title'),
          description: t('toast_image_upload_failed_desc'),
        });
      } finally {
        if (event.target) event.target.value = ""; // Clear the input after processing
      }
    }
  };

  const handleRemoveImage = () => {
    onProfileImageChange(null);
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
        <ThemeSwitcher />
        <LanguageSwitcher />
        <Separator />
        
        <div className="space-y-2">
          <Label className="text-sm font-medium"><TranslatedText translationKey="profile_image_label" /></Label>
          <div className="flex items-center space-x-3">
            <Avatar className="h-16 w-16">
              {currentProfileImageUri ? (
                <AvatarImage src={currentProfileImageUri} alt={t('profile_avatar_alt_text')} />
              ) : (
                <AvatarFallback className="bg-muted">
                  <UserCircle className="h-10 w-10 text-muted-foreground" />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col space-y-2 flex-grow">
              <Button variant="outline" size="sm" asChild className="w-full" disabled={isUploading}>
                <label htmlFor="profile-image-upload" className={`cursor-pointer flex items-center justify-center ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isUploading ? (
                    <UploadCloud className="mr-2 h-4 w-4 animate-pulse" />
                  ) : (
                    <UploadCloud className="mr-2 h-4 w-4" />
                  )}
                  <TranslatedText translationKey={currentProfileImageUri ? "change_profile_image_button" : "upload_profile_image_button"} />
                </label>
              </Button>
              <Input 
                id="profile-image-upload" 
                type="file" 
                accept="image/png, image/jpeg, image/gif, image/webp" 
                className="hidden" 
                onChange={handleImageFileChange}
                disabled={isUploading}
              />
              {currentProfileImageUri && (
                <Button variant="destructive" size="sm" onClick={handleRemoveImage} className="w-full" disabled={isUploading}>
                  <X className="mr-2 h-4 w-4" />
                  <TranslatedText translationKey="remove_profile_image_button" />
                </Button>
              )}
            </div>
          </div>
          {isUploading && <p className="text-xs text-muted-foreground text-center pt-1">{t('uploading_profile_image')}</p>}
        </div>
      </PopoverContent>
    </Popover>
  );
}
