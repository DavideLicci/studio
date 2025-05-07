
'use client';

import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { TranslatedText } from '@/components/shared/translated-text';
import type { Project } from '@/app/projects/page'; // Adjust path if Project type moves
import { useLanguage } from '@/hooks/use-language';
import Image from 'next/image';
import { PlusCircle, UploadCloud, X } from 'lucide-react';

const projectSchema = z.object({
  title: z.string().min(1, { message: "form_field_required" }),
  description: z.string().min(1, { message: "form_field_required" }),
  category: z.enum(['technical', 'humanistic'], { errorMap: () => ({ message: "form_field_required" }) }),
  projectUrl: z.string().url({ message: "form_valid_url_required" }).optional().or(z.literal('')),
  imageDataUri: z.string().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface AddProjectFormProps {
  onAddProject: (newProject: Project) => void;
}

export function AddProjectDialog({ onAddProject }: AddProjectFormProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      projectUrl: '',
      imageDataUri: '',
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        form.setValue('imageDataUri', reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      form.setValue('imageDataUri', undefined);
    }
  };

  const onSubmit = (data: ProjectFormData) => {
    const newProject: Project = {
      id: Date.now().toString(), // Simple unique ID
      title: data.title,
      description: data.description,
      category: data.category,
      projectUrl: data.projectUrl || undefined,
      imageDataUri: data.imageDataUri || undefined,
    };
    onAddProject(newProject);
    form.reset();
    setImagePreview(null);
    setIsOpen(false);
  };

  const handleClose = () => {
    form.reset();
    setImagePreview(null);
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
      else setIsOpen(true);
    }}>
      <DialogTrigger asChild>
        <Button className="mb-8 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 animate-in fade-in slide-in-from-bottom-5 delay-300">
          <PlusCircle className="mr-2 h-5 w-5" />
          <TranslatedText translationKey="add_project_button" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle><TranslatedText translationKey="form_add_project_dialog_title" /></DialogTitle>
          <DialogDescription>
            <TranslatedText translationKey="form_add_project_dialog_desc" />
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title"><TranslatedText translationKey="form_title_label" /></Label>
            <Input id="title" {...form.register('title')} className="bg-background" />
            {form.formState.errors.title && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.title.message as string)}</p>}
          </div>

          <div>
            <Label htmlFor="description"><TranslatedText translationKey="form_description_label" /></Label>
            <Textarea id="description" {...form.register('description')} className="bg-background" />
            {form.formState.errors.description && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.description.message as string)}</p>}
          </div>

          <div>
            <Label htmlFor="category"><TranslatedText translationKey="form_category_label" /></Label>
            <Select onValueChange={(value) => form.setValue('category', value as 'technical' | 'humanistic')} value={form.watch('category')}>
              <SelectTrigger className="w-full bg-background">
                <SelectValue placeholder={t('form_select_category_placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">{t('form_category_technical')}</SelectItem>
                <SelectItem value="humanistic">{t('form_category_humanistic')}</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.category && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.category.message as string)}</p>}
          </div>

          <div>
            <Label htmlFor="projectUrl"><TranslatedText translationKey="form_project_url_label" /></Label>
            <Input id="projectUrl" {...form.register('projectUrl')} className="bg-background" />
            {form.formState.errors.projectUrl && <p className="text-sm text-destructive mt-1">{t(form.formState.errors.projectUrl.message as string)}</p>}
          </div>
          
          <div>
            <Label htmlFor="image"><TranslatedText translationKey="form_image_label" /></Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="bg-background" />
            {isUploading && <p className="text-sm text-muted-foreground mt-1">{t('form_uploading_image')}</p>}
            {imagePreview && (
              <div className="mt-2 relative w-full h-48">
                <Image src={imagePreview} alt={t('project_image_alt')} layout="fill" objectFit="contain" className="rounded-md border" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-1 right-1 bg-background/50 hover:bg-background/75"
                  onClick={() => {
                    setImagePreview(null);
                    form.setValue('imageDataUri', undefined);
                    const fileInput = document.getElementById('image') as HTMLInputElement;
                    if (fileInput) fileInput.value = ''; // Reset file input
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline" onClick={handleClose}>
                    <TranslatedText translationKey="form_cancel_button" />
                </Button>
            </DialogClose>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? <UploadCloud className="mr-2 h-4 w-4 animate-pulse" /> : null}
              <TranslatedText translationKey="form_submit_button" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
