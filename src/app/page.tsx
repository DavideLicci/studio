
import { Button } from '@/componenti/ui/button';
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center p-4 md:p-8">
      <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 ease-out">
        {/* Image removed as per request */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 mt-8"> {/* Added mt-8 for spacing after image removal */}
          <TestoTradotto translationKey="home_title" />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          <TestoTradotto translationKey="home_subtitle" />
        </p>
        <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
          <Link href="/progetti">
            <TestoTradotto translationKey="home_cta_projects" />
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
