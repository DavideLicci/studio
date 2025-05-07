import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/shared/translated-text';
import Link from 'next/link';
import { ExternalLink, Briefcase, Brain } from 'lucide-react'; // Added icons for categories

interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: 'technical' | 'humanistic';
  projectUrl?: string;
}

const projectsData: Project[] = [
  {
    id: 'alpha',
    titleKey: 'project_1_title',
    descriptionKey: 'project_1_desc',
    category: 'technical',
    projectUrl: '#',
  },
  {
    id: 'beta',
    titleKey: 'project_2_title',
    descriptionKey: 'project_2_desc',
    category: 'technical',
    projectUrl: '#',
  },
  {
    id: 'gamma',
    titleKey: 'project_3_title',
    descriptionKey: 'project_3_desc',
    category: 'humanistic', 
  },
   {
    id: 'delta',
    titleKey: 'project_4_title',
    descriptionKey: 'project_4_desc',
    category: 'humanistic',
    projectUrl: '#',
  },
];

export default function ProjectsPage() {
  const technicalProjects = projectsData.filter(p => p.category === 'technical');
  const humanisticProjects = projectsData.filter(p => p.category === 'humanistic');

  const renderProjectCard = (project: Project, index: number) => (
    <Card 
      key={project.id} 
      className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out animate-in fade-in zoom-in-95"
      style={{ animationDelay: `${index * 100}ms` }}
      >
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          {project.category === 'technical' ? 
            <Briefcase className="mr-2 h-6 w-6 text-primary/70" /> : 
            <Brain className="mr-2 h-6 w-6 text-primary/70" />
          }
          <TranslatedText translationKey={project.titleKey} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0 space-y-3">
        <CardDescription className="text-base leading-relaxed">
          <TranslatedText translationKey={project.descriptionKey} />
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 bg-muted/10 dark:bg-muted/30 mt-auto">
        {project.projectUrl ? (
          <Button asChild className="w-full transform hover:scale-105 transition-transform">
            <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
              <TranslatedText translationKey="view_project_details" />
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        ) : (
           <Button variant="outline" className="w-full" disabled>
              <TranslatedText translationKey="view_project_details" />
           </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="space-y-16">
      <header className="text-center animate-in fade-in slide-in-from-top-10 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <TranslatedText translationKey="projects_title" />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          <TranslatedText translationKey="projects_intro" />
        </p>
      </header>

      <section className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
        <h2 className="text-3xl font-semibold text-center md:text-left flex items-center justify-center md:justify-start">
          <Briefcase className="mr-3 h-7 w-7 text-primary" />
          <TranslatedText translationKey="projects_technical_title" />
        </h2>
        {technicalProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicalProjects.map(renderProjectCard)}
          </div>
        ) : (
          <p className="text-muted-foreground text-center md:text-left"><TranslatedText translationKey="projects_no_technical_projects" /></p>
        )}
      </section>

      <section className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-400">
        <h2 className="text-3xl font-semibold text-center md:text-left flex items-center justify-center md:justify-start">
          <Brain className="mr-3 h-7 w-7 text-primary" />
          <TranslatedText translationKey="projects_humanistic_title" />
        </h2>
        {humanisticProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {humanisticProjects.map(renderProjectCard)}
          </div>
        ) : (
           <p className="text-muted-foreground text-center md:text-left"><TranslatedText translationKey="projects_no_humanistic_projects" /></p>
        )}
      </section>
    </div>
  );
}
