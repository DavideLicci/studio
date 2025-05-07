import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/shared/translated-text';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <Image 
          src="https://picsum.photos/seed/homepage/800/400" 
          alt="Portfolio Hero Image" 
          width={800} 
          height={400}
          className="rounded-lg shadow-xl mb-8 object-cover data-ai-hint='abstract tech'"
          data-ai-hint="abstract tech"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <TranslatedText translationKey="home_title" />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10">
          <TranslatedText translationKey="home_subtitle" />
        </p>
        <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
          <Link href="/projects">
            <TranslatedText translationKey="home_cta_projects" />
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}