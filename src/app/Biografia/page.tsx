
'use client';

import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import { useLingua } from '@/hooks/use-lingua';
import { User, Code2, Palette, Users2, BrainCircuit, Feather } from 'lucide-react';

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
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90 flex items-center">
          <User className="mr-3 h-7 w-7 shrink-0" />
          <TestoTradotto translationKey="bio_title_intro" />
        </h2>
        <p><TestoTradotto translationKey="bio_p1" /></p>
      </section>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90 flex items-center">
          <Code2 className="mr-3 h-7 w-7 shrink-0" />
          <TestoTradotto translationKey="bio_title_informatics" />
        </h2>
        <p><TestoTradotto translationKey="bio_p2_part1" /></p>
        <p><TestoTradotto translationKey="bio_p2_part2" /></p>
      </section>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90 flex items-center">
          <Palette className="mr-3 h-7 w-7 shrink-0" />
          <TestoTradotto translationKey="bio_title_interests" />
        </h2>
        <p><TestoTradotto translationKey="bio_p3_part1" /></p>
        <p><TestoTradotto translationKey="bio_p3_part2" /></p>
      </section>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-500">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90 flex items-center">
          <Users2 className="mr-3 h-7 w-7 shrink-0" />
          <TestoTradotto translationKey="bio_title_relationships" />
        </h2>
        <p><TestoTradotto translationKey="bio_p4" /></p>
      </section>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-600">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90 flex items-center">
          <BrainCircuit className="mr-3 h-7 w-7 shrink-0" />
          <TestoTradotto translationKey="bio_title_future" />
        </h2>
        <p><TestoTradotto translationKey="bio_p5_part1" /></p>
        <p><TestoTradotto translationKey="bio_p5_part2" /></p>
      </section>
      
      <section className="space-y-6 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-700">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary/90 flex items-center">
          <Feather className="mr-3 h-7 w-7 shrink-0" />
          <TestoTradotto translationKey="bio_title_philosophy" />
        </h2>
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
