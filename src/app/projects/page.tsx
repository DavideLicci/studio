
'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/shared/translated-text';
import { ExternalLink, Briefcase, Brain, ImageOff } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { ProjectFilters, type ProjectFilter } from '@/components/projects/project-filters';
import { AddProjectDialog } from '@/components/projects/add-project-form';

export interface Project {
  id: string;
  title: string; // Actual display string
  description: string; // Actual display string
  category: 'technical' | 'humanistic';
  projectUrl?: string;
  imageDataUri?: string;
  // Keep original keys for potential future use or re-translation if needed, though not strictly used for display now
  originalTitleKey?: string; 
  originalDescriptionKey?: string;
}

// Remove initial projects
const initialProjectsData: Omit<Project, 'title' | 'description'> & { titleKey: string; descriptionKey: string }[] = [];

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [currentFilter, setCurrentFilter] = useState<ProjectFilter>('all');

  useEffect(() => {
    const translatedInitialProjects = initialProjectsData.map(p => ({
      ...p,
      title: t(p.titleKey),
      description: t(p.descriptionKey),
      originalTitleKey: p.titleKey,
      originalDescriptionKey: p.descriptionKey,
    }));
    // This ensures user-added projects persist across language changes but predefined ones are re-translated.
    // A more robust solution might involve storing user-added projects in localStorage.
    setAllProjects(prevProjects => {
      const userAddedProjects = prevProjects.filter(p => !p.originalTitleKey);
      return [...translatedInitialProjects, ...userAddedProjects];
    });
  }, [t]);

  const handleAddProject = (newProject: Project) => {
    setAllProjects(prevProjects => [...prevProjects, newProject]);
  };

  const projectsToDisplay = useMemo(() => {
    if (currentFilter === 'all') {
      return allProjects;
    }
    return allProjects.filter(p => p.category === currentFilter);
  }, [allProjects, currentFilter]);

  const technicalProjects = projectsToDisplay.filter(p => p.category === 'technical');
  const humanisticProjects = projectsToDisplay.filter(p => p.category === 'humanistic');

  const renderProjectCard = (project: Project, index: number) => (
    <Card
      key={project.id}
      className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out animate-in fade-in zoom-in-95"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      {project.imageDataUri ? (
        <div className="relative w-full h-48 bg-muted">
          <Image 
            src={project.imageDataUri} 
            alt={t('project_image_alt', { title: project.title })} 
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{objectFit: 'cover'}}
            data-ai-hint={`${project.category} ${project.title.substring(0,15)}`}
          />
        </div>
      ) : (
        <div className="w-full h-48 bg-muted flex items-center justify-center">
          <ImageOff className="w-16 h-16 text-muted-foreground/50" />
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl flex items-center">
          {project.category === 'technical' ?
            <Briefcase className="mr-2 h-6 w-6 text-primary/80 shrink-0" /> :
            <Brain className="mr-2 h-6 w-6 text-primary/80 shrink-0" />
          }
          {project.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-6 pt-0 space-y-3">
        <CardDescription className="text-base leading-relaxed">
          {project.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="p-6 bg-muted/20 dark:bg-muted/40 mt-auto">
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
    <div className="space-y-12">
      <header className="text-center animate-in fade-in slide-in-from-top-10 duration-500">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <TranslatedText translationKey="projects_title" />
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          <TranslatedText translationKey="projects_intro" />
        </p>
      </header>

      <div className="flex flex-col sm:flex-row justify-between items-center">
        <ProjectFilters currentFilter={currentFilter} onFilterChange={setCurrentFilter} />
        <AddProjectDialog onAddProject={handleAddProject} />
      </div>
      
      {(currentFilter === 'all' || currentFilter === 'technical') && (
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
      )}

      {(currentFilter === 'all' || currentFilter === 'humanistic') && (
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
      )}
    </div>
  );
}
