
'use client';

import type { Dispatch, SetStateAction } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TranslatedText } from '@/components/shared/translated-text';
import { cn } from '@/lib/utils';

export type ProjectFilter = 'all' | 'technical' | 'humanistic';

interface ProjectFiltersProps {
  currentFilter: ProjectFilter;
  onFilterChange: Dispatch<SetStateAction<ProjectFilter>>;
}

export function ProjectFilters({ currentFilter, onFilterChange }: ProjectFiltersProps) {
  const filters: { labelKey: string; value: ProjectFilter }[] = [
    { labelKey: 'filter_all', value: 'all' },
    { labelKey: 'filter_technical', value: 'technical' },
    { labelKey: 'filter_humanistic', value: 'humanistic' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-8 animate-in fade-in duration-500">
      <Label className="text-md font-medium shrink-0">
        <TranslatedText translationKey="filter_by_category" />
      </Label>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={currentFilter === filter.value ? 'default' : 'outline'}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "transition-all duration-200 ease-in-out transform hover:scale-105",
              currentFilter === filter.value && "shadow-md"
            )}
          >
            <TranslatedText translationKey={filter.labelKey} />
          </Button>
        ))}
      </div>
    </div>
  );
}
