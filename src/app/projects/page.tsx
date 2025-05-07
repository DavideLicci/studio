
'use client';

import type { ChangeEvent } from 'react';
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TranslatedText } from '@/components/shared/translated-text';
import { ExternalLink, Briefcase, Brain, ImageOff, Pencil, Trash2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { ProjectFilters, type ProjectFilter } from '@/components/projects/project-filters';
import { AddProjectDialog } from '@/components/projects/add-project-form';
import { EditProjectDialog } from '@/components/projects/edit-project-form';
import { DeleteProjectDialog } from '@/components/projects/delete-project-dialog';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'humanistic';
  projectUrl?: string;
  imageDataUri?: string;
}

const PROJECTS_STORAGE_KEY = 'portfolioAppProjects_v1';

export default function ProjectsPage() {
  const { t } = useLanguage();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [currentFilter, setCurrentFilter] = useState<ProjectFilter>('all');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const storedProjectsJson = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (storedProjectsJson) {
        try {
          const storedProjects = JSON.parse(storedProjectsJson);
          setAllProjects(storedProjects);
        } catch (e) {
          console.error("Failed to parse projects from localStorage", e);
          localStorage.removeItem(PROJECTS_STORAGE_KEY);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && isClient) {
      // Only save if projects have been loaded or explicitly set,
      // to avoid overwriting localStorage with an empty array on initial render.
      if (allProjects.length > 0 || localStorage.getItem(PROJECTS_STORAGE_KEY)) {
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(allProjects));
      } else if (allProjects.length === 0 && !localStorage.getItem(PROJECTS_STORAGE_KEY)) {
        // If it's genuinely empty and nothing was in storage, still save empty to reflect this.
        localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify([]));
      }
    }
  }, [allProjects, isClient]);

  const handleAddProject = (newProject: Project) => {
    setAllProjects(prevProjects => [...prevProjects, newProject]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setAllProjects(prevProjects =>
      prevProjects.map(p => (p.id === updatedProject.id ? updatedProject : p))
    );
    setEditingProject(null);
  };

  const handleDeleteConfirm = (projectId: string) => {
    setAllProjects(prevProjects => prevProjects.filter(p => p.id !== projectId));
    setDeletingProject(null);
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
      <CardFooter className="p-6 bg-muted/20 dark:bg-muted/40 mt-auto flex-col space-y-3">
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
        <div className="flex w-full space-x-2">
          <Button variant="outline" className="w-1/2" onClick={() => setEditingProject(project)}>
            <Pencil className="mr-2 h-4 w-4" />
            <TranslatedText translationKey="edit_project_button" />
          </Button>
          <Button variant="destructive" className="w-1/2" onClick={() => setDeletingProject(project)}>
            <Trash2 className="mr-2 h-4 w-4" />
            <TranslatedText translationKey="delete_project_button" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

  if (!isClient) {
    // Render a loading state or null until client-side hydration is complete
    // to prevent hydration mismatch from localStorage access.
    // You can use your global loading component or a simpler one here.
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-4 md:p-8 space-y-8">
        {/* Simplified skeleton for projects page loading */}
        <div className="h-12 w-1/2 rounded-md bg-muted animate-pulse"></div>
        <div className="h-64 w-full max-w-3xl rounded-lg bg-muted animate-pulse"></div>
      </div>
    );
  }

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

      {editingProject && (
        <EditProjectDialog
          project={editingProject}
          isOpen={!!editingProject}
          onOpenChange={(open) => { if (!open) setEditingProject(null); }}
          onEditProject={handleUpdateProject}
        />
      )}

      {deletingProject && (
        <DeleteProjectDialog
          project={deletingProject}
          isOpen={!!deletingProject}
          onOpenChange={(open) => { if (!open) setDeletingProject(null); }}
          onConfirmDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
