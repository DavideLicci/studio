import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/shared/translated-text';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  titleKey: string;
  descriptionKey: string;
  imageUrl: string;
  imageHint: string;
  projectUrl?: string;
}

const projectsData: Project[] = [
  {
    id: 'alpha',
    titleKey: 'project_1_title',
    descriptionKey: 'project_1_desc',
    imageUrl: 'https://picsum.photos/seed/projectAlpha/600/400',
    imageHint: 'modern website',
    projectUrl: '#',
  },
  {
    id: 'beta',
    titleKey: 'project_2_title',
    descriptionKey: 'project_2_desc',
    imageUrl: 'https://picsum.photos/seed/projectBeta/600/400',
    imageHint: 'mobile app',
    projectUrl: '#',
  },
  {
    id: 'gamma',
    titleKey: 'project_3_title',
    descriptionKey: 'project_3_desc',
    imageUrl: 'https://picsum.photos/seed/projectGamma/600/400',
    imageHint: 'dashboard interface',
  },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <TranslatedText translationKey="projects_title" />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          <TranslatedText translationKey="projects_intro" />
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="p-0">
              <Image
                src={project.imageUrl}
                alt={project.id}
                width={600}
                height={400}
                className="object-cover w-full h-48 md:h-56"
                data-ai-hint={project.imageHint}
              />
            </CardHeader>
            <CardContent className="flex-grow p-6 space-y-3">
              <CardTitle className="text-2xl">
                <TranslatedText translationKey={project.titleKey} />
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                <TranslatedText translationKey={project.descriptionKey} />
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 bg-muted/50">
              {project.projectUrl ? (
                <Button asChild className="w-full">
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
        ))}
      </div>
    </div>
  );
}