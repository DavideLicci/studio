
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
        <p>Mi chiamo Davide Licci, ho 19 anni e sono nato ad Ancona, ma ho sempre vissuto a Jesi. Frequento l’Istituto Tecnico IIS Marconi Pieralisi, indirizzo Informatica, e sono il più piccolo di tre fratelli.</p>
        <p>Mi piace pensare che non ho scelto informatica per un solo motivo, ma per una combinazione di fattori. È come se avessi trovato in questo mondo una sintesi tra logica e immaginazione, tra struttura e possibilità. La programmazione mi ha insegnato il valore della precisione, ma anche dell’errore. Ogni bug risolto è una lezione, ogni progetto un’occasione per capire come la tecnologia possa dialogare con l’umano.</p>
        <p>Fuori dalla scuola, coltivo diverse passioni che mi aiutano a rimanere in equilibrio: leggere, allenarmi, suonare la chitarra e ascoltare musica. In tutto questo, cerco sempre di crescere come persona. Mi definirei determinato ed empatico, anche se so di essere spesso testardo. A volte me ne pento, ma altre volte è proprio quella testardaggine a farmi andare avanti.</p>
        <p>Le relazioni nella mia vita — familiari, scolastiche o affettive — mi hanno insegnato molto. Alcune sono state complicate, altre mi hanno sorpreso, ma tutte mi hanno lasciato qualcosa. Penso che conoscere gli altri sia un modo per conoscere meglio se stessi, e viceversa.</p>
        <p>Per il mio futuro, sto valutando di iscrivermi a Medicina o Ingegneria Biomedica ad Ancona. Mi affascina l’idea di unire scienza e tecnologia al servizio della salute, della vita. È come se cercassi, in qualche modo, di restituire qualcosa. Anche la filosofia e la psicologia mi accompagnano spesso nei miei pensieri: mi piace ragionare su ciò che ci rende umani, e immaginare come l’intelligenza artificiale possa interagire con la nostra interiorità, senza sostituirla.</p>
        
        <blockquote className="my-8 p-6 border-l-4 border-primary bg-muted/50 rounded-r-md shadow-md animate-in fade-in zoom-in-95 delay-500 duration-700">
          <p className="text-2xl font-semibold italic text-primary mb-3">"Ioien" (ἰοίην).</p>
          <p className="mt-2">È un ottativo del verbo greco "eimi", che significa “andare, andare oltre, venire”. È l’unica parola sopravvissuta di una poesia di Saffo, e viene spesso interpretata come un desiderio di superamento o evasione. Per me significa esattamente questo:</p>
          <p className="mt-3 text-2xl font-semibold italic text-primary">"possa io andare oltre".</p>
          <p className="mt-2">Oltre i miei limiti, oltre le aspettative, oltre le paure.</p>
        </blockquote>
        
        <p>E se c’è qualcosa che voglio davvero lasciare, è questa volontà di andare avanti, anche quando non è facile. Perché ogni passo, se fatto con consapevolezza, è già un superamento.</p>
      </section>
    </div>
  );
}
