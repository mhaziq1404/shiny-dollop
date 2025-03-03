import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

const templateSchema = z.object({
  name: z.string().min(3, 'Template name must be at least 3 characters'),
});

type TemplateFormData = z.infer<typeof templateSchema>;

interface SaveTemplateModalProps {
  onSave: (name: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

export function SaveTemplateModal({ onSave, onClose, isLoading }: SaveTemplateModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema)
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Save as Template</h2>
        <form onSubmit={handleSubmit(data => onSave(data.name))}>
          <Input
            label="Template Name"
            placeholder="e.g., Basic Workshop Template"
            {...register('name')}
            error={errors.name?.message}
          />
          <div className="flex justify-end space-x-3 mt-6">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Saving..."
            >
              Save Template
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}