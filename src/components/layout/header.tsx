// src/components/layout/header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SettingsPanel } from './settings-panel';
import { TranslatedText } from '@/components/shared/translated-text';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState, useEffect } from 'react';
import type { useLanguage } from '@/hooks/use-language'; // Import LanguageContext related types if needed for t function
import { useToast } from '@/hooks/use-toast'; // For feedback
import { useLanguage as useLang } from '@/hooks/use-language'; // aliased to avoid conflict

const PROFILE_IMAGE_STORAGE_KEY = 'portfolioProfileImage_v1';

export function Header() {
  const pathname = usePathname();
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { t } = useLang();
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedImage = localStorage.getItem(PROFILE_IMAGE_STORAGE_KEY);
      if (storedImage) {
        setProfileImageUri(storedImage);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      if (profileImageUri) {
        localStorage.setItem(PROFILE_IMAGE_STORAGE_KEY, profileImageUri);
      } else {
        localStorage.removeItem(PROFILE_IMAGE_STORAGE_KEY);
      }
    }
  }, [profileImageUri, isClient]);

  const handleProfileImageChange = (imageDataUri: string | null) => {
    setProfileImageUri(imageDataUri);
    if (imageDataUri) {
      toast({
        title: t('toast_profile_image_updated_title'),
        description: t('toast_profile_image_updated_desc'),
      });
    } else {
       toast({
        title: t('toast_profile_image_removed_title'),
        description: t('toast_profile_image_removed_desc'),
      });
    }
  };

  const navItems = [
    { href: '/', labelKey: 'nav_home' },
    { href: '/projects', labelKey: 'nav_projects' },
    { href: '/about', labelKey: 'nav_about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 text-lg font-semibold text-primary hover:text-primary/80 transition-colors">
          <Avatar className="h-8 w-8">
            {isClient && profileImageUri ? (
              <AvatarImage src={profileImageUri} alt={t('profile_avatar_alt_text')} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                PP
              </AvatarFallback>
            )}
          </Avatar>
          <TranslatedText translationKey="app_title" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'transition-all hover:text-foreground/80 hover:scale-105',
                pathname === item.href ? 'text-foreground font-semibold' : 'text-foreground/70'
              )}
            >
              <TranslatedText translationKey={item.labelKey} />
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
           <SettingsPanel 
             currentProfileImageUri={profileImageUri}
             onProfileImageChange={handleProfileImageChange} 
           />
           {/* Mobile Menu Trigger (optional, can be implemented later) */}
        </div>
      </div>
    </header>
  );
}
