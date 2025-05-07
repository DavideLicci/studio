import { TranslatedText } from '@/components/shared/translated-text';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const skills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", 
  "Tailwind CSS", "HTML5", "CSS3", "Git", "Firebase", "GenAI", "Python"
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 p-4">
      <header className="text-center animate-in fade-in slide-in-from-top-10 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <TranslatedText translationKey="about_title" />
        </h1>
      </header>

      <section className="space-y-6 text-lg animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
        {/* Image removed and content centered */}
        <div className="text-center md:text-left">
          <p className="leading-relaxed mb-4">
            <TranslatedText translationKey="about_intro_1" />
          </p>
          <p className="leading-relaxed">
            <TranslatedText translationKey="about_intro_2" />
          </p>
        </div>
      </section>

      <section className="animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-center md:text-left">
              <TranslatedText translationKey="skills_title" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <li 
                  key={skill} 
                  className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-md transition-all duration-300 hover:bg-secondary/50 hover:scale-105 animate-in fade-in zoom-in-95"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
