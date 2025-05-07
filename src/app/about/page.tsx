import { TranslatedText } from '@/components/shared/translated-text';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const skills = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", 
  "Tailwind CSS", "HTML5", "CSS3", "Git", "Firebase"
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 p-4">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <TranslatedText translationKey="about_title" />
        </h1>
      </header>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <Image 
            src="https://picsum.photos/seed/aboutMe/500/500" 
            alt="Profile picture"
            width={500}
            height={500}
            className="rounded-lg shadow-xl object-cover aspect-square"
            data-ai-hint="professional portrait"
          />
        </div>
        <div className="space-y-6 text-lg">
          <p className="leading-relaxed">
            <TranslatedText translationKey="about_intro_1" />
          </p>
          <p className="leading-relaxed">
            <TranslatedText translationKey="about_intro_2" />
          </p>
        </div>
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-center md:text-left">
              <TranslatedText translationKey="skills_title" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <li key={skill} className="flex items-center space-x-2 p-3 bg-secondary/30 rounded-md">
                  <CheckCircle className="h-5 w-5 text-primary" />
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