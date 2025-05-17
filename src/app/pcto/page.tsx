
import { TestoTradotto } from '@/componenti/condivisi/testo-tradotto';
import { Card, CardContent, CardHeader, CardTitle } from '@/componenti/ui/card';

export default function PaginaPCTO() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 p-4">
      <header className="text-center animate-in fade-in slide-in-from-top-10 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <TestoTradotto translationKey="pcto_title" />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          <TestoTradotto translationKey="pcto_intro" />
        </p>
      </header>

      <section className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-center">
              <TestoTradotto translationKey="pcto_coming_soon" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground py-8">
              {/* Puoi aggiungere un'immagine segnaposto o un'icona qui più tardi se lo desideri */}
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 opacity-50 lucide lucide-construction"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M17 12h.01"/><path d="M12 12h.01"/><path d="M7 12h.01"/><path d="M5 22v-3"/><path d="M19 22v-3"/><path d="m2 10-1.42-1.42c-.195-.195-.303-.45-.303-.718V5.42c0-.55.45-1 1-1h2.58c.27 0 .52.11.71.29L6 5"/><path d="m22 10 1.42-1.42c.195-.195.303-.45.303-.718V5.42c0-.55-.45-1-1-1h-2.58c-.27 0-.52.11-.71.29L18 5"/></svg>
              <p><TestoTradotto translationKey="pcto_coming_soon" /></p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
