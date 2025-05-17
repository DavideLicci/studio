
'use client';

import Image from 'next/image';
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import { useLingua } from '@/hooks/use-lingua';

export default function PaginaBiografia() {
  const { t } = useLingua();

  return (
    <div className="max-w-3xl mx-auto space-y-12 p-4">
      <header className="text-center animate-in fade-in slide-in-from-top-10 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <TestoTradotto translationKey="biography_page_title" />
        </h1>
      </header>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90">
          <TestoTradotto translationKey="bio_title_intro" />
        </h2>
        <p><TestoTradotto translationKey="bio_p1" /></p>
      </section>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90">
          <TestoTradotto translationKey="bio_title_informatics" />
        </h2>
        <div className="my-6">
          <Image 
            src="https://placehold.co/700x300.png" 
            alt={t('bio_image_alt_informatics')} 
            width={700} 
            height={300}
            sizes="(max-width: 768px) 100vw, 700px"
            className="w-full h-auto rounded-lg shadow-md"
            data-ai-hint="code abstract" 
          />
        </div>
        <p><TestoTradotto translationKey="bio_p2_part1" /></p>
        <p><TestoTradotto translationKey="bio_p2_part2" /></p>
      </section>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90">
          <TestoTradotto translationKey="bio_title_interests" />
        </h2>
        <p><TestoTradotto translationKey="bio_p3_part1" /></p>
        <p><TestoTradotto translationKey="bio_p3_part2" /></p>
      </section>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90">
          <TestoTradotto translationKey="bio_title_relationships" />
        </h2>
        <p><TestoTradotto translationKey="bio_p4" /></p>
      </section>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-600">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90">
          <TestoTradotto translationKey="bio_title_future" />
        </h2>
        <div className="my-6">
          <Image 
            src="https://placehold.co/700x300.png" 
            alt={t('bio_image_alt_future')} 
            width={700} 
            height={300} 
            sizes="(max-width: 768px) 100vw, 700px"
            className="w-full h-auto rounded-lg shadow-md"
            data-ai-hint="biomedical future"
          />
        </div>
        <p><TestoTradotto translationKey="bio_p5_part1" /></p>
        <p><TestoTradotto translationKey="bio_p5_part2" /></p>
      </section>
      
      <section className="space-y-6 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-700">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90">
          <TestoTradotto translationKey="bio_title_philosophy" />
        </h2>
        <div className="my-6">
          <Image 
            src="https://placehold.co/700x300.png" 
            alt={t('bio_image_alt_philosophy')} 
            width={700} 
            height={300} 
            sizes="(max-width: 768px) 100vw, 700px"
            className="w-full h-auto rounded-lg shadow-md"
            data-ai-hint="path horizon"
          />
        </div>
        <blockquote className="my-8 p-6 border-l-4 border-primary bg-muted/50 rounded-r-md shadow-md animate-in fade-in zoom-in-95 delay-500 duration-700">
          <p className="text-2xl font-semibold italic text-primary mb-3">"<TestoTradotto translationKey="bio_quote_greek" />"</p>
          <p className="mt-2"><TestoTradotto translationKey="bio_quote_explanation" /></p>
          <p className="mt-3 text-2xl font-semibold italic text-primary">"<TestoTradotto translationKey="bio_quote_meaning" />"</p>
          <p className="mt-2"><TestoTradotto translationKey="bio_quote_meaning_elaboration" /></p>
        </blockquote>
        <p><TestoTradotto translationKey="bio_p6" /></p>
      </section>
    </div>
  );
}
