
'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TranslatedText } from "@/components/shared/translated-text";
import type { Project } from "@/app/projects/page";
import { useLanguage } from "@/hooks/use-language";

interface DeleteProjectDialogProps {
  project: Project | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDelete: (projectId: string) => void;
}

export function DeleteProjectDialog({ project, isOpen, onOpenChange, onConfirmDelete }: DeleteProjectDialogProps) {
  const { t } = useLanguage();

  if (!project) return null;

  const handleConfirm = () => {
    onConfirmDelete(project.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle><TranslatedText translationKey="delete_confirmation_title" /></AlertDialogTitle>
          <AlertDialogDescription>
            <TranslatedText 
              translationKey="delete_confirmation_desc" 
              replacements={{ title: project.title }}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <TranslatedText translationKey="form_cancel_button" />
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleConfirm}>
              <TranslatedText translationKey="delete_button_confirm" />
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
