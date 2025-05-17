
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';

export default function PaginaBiografia() {
  return (
    <div className="max-w-3xl mx-auto space-y-10 p-4">
      <header className="text-center animate-in fade-in slide-in-from-top-10 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          <TestoTradotto translationKey="biography_page_title" />
        </h1>
      </header>

      <section className="space-y-5 text-lg leading-relaxed text-foreground/90 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
        <p><TestoTradotto translationKey="bio_p1" /></p>
        <p><TestoTradotto translationKey="bio_p2" /></p>
        <p><TestoTradotto translationKey="bio_p3" /></p>
        <p><TestoTradotto translationKey="bio_p4" /></p>
        <p><TestoTradotto translationKey="bio_p5" /></p>
        
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
