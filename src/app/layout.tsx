
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ProviderTema } from '@/componenti/providers/provider-tema';
import { ProviderLingua } from '@/componenti/providers/provider-lingua';
import { Header } from '@/componenti/layout/header';
import { Footer } from '@/componenti/layout/footer';
import { Toaster } from "@/componenti/ui/toaster";

export const metadata: Metadata = {
  title: 'Sito personale',
  description: 'Un sito personale costruito con Next.js e Tailwind CSS, con cambio di tema e lingua.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <ProviderTema
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="portfolio-theme"
        >
          <ProviderLingua>
            <Header />
            <main className="flex-grow container max-w-screen-2xl py-8 px-4 md:px-6">
              {children}
            </main>
            <Footer />
            <Toaster />
          </ProviderLingua>
        </ProviderTema>
      </body>
    </html>
  );
}
