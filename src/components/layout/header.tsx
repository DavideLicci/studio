// src/components/layout/header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SettingsPanel } from './settings-panel';
import { TranslatedText } from '@/components/shared/translated-text';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const navItems = [
  { href: '/', labelKey: 'nav_home' },
  { href: '/projects', labelKey: 'nav_projects' },
  { href: '/about', labelKey: 'nav_about' },
  { href: '/contacts', labelKey: 'nav_contacts' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 text-lg font-semibold text-primary hover:text-primary/80 transition-colors">
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src="/path/to/profile.jpg" alt="User Name" /> */}
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
              PP
            </AvatarFallback>
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
           <SettingsPanel />
           {/* Mobile Menu Trigger (optional, can be implemented later) */}
        </div>
      </div>
    </header>
  );
}
