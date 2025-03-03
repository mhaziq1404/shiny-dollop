import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { EventPreview } from './preview/EventPreview';
import { Event, EventTemplate } from '../../types';
import { BasicInfoSection } from './event-form/BasicInfoSection';
import { RequirementsSection } from './event-form/RequirementsSection';
import { ActivitiesSection } from './event-form/ActivitiesSection';
import { TemplateSelect } from './event-form/TemplateSelect';
import { SaveTemplateModal } from './event-form/SaveTemplateModal';
import { templateService } from '../../services/template.service';
import { toast } from 'react-hot-toast';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const eventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().url('Invalid image URL').optional(),
  location: z.string().min(1, 'Location is required'),
  price: z.number().min(0, 'Price must be positive'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  instructor: z.string().min(1, 'Instructor is required'),
  category: z.string().min(2, 'Category must be at least 2 characters'),
  requirements: z.array(z.object({
    description: z.string().min(1, 'Requirement description is required'),
    type: z.enum(['required', 'recommended'])
  })),
  activities: z.array(z.object({
    title: z.string().min(1, 'Activity title is required'),
    description: z.string().min(1, 'Activity description is required'),
    day: z.string().min(1, 'Day is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required')
  }))
});

type EventFormData = z.infer<typeof eventSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormData) => Promise<void>;
  isSubmitting: boolean;
  initialData?: Partial<EventFormData>;
}

export function EventForm({ onSubmit, isSubmitting, initialData }: EventFormProps) {
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);

  const { data: templates = [], refetch: refetchTemplates } = useQuery(
    ['eventTemplates'],
    templateService.getTemplates
  );

  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      ...initialData,
      requirements: initialData?.requirements || [],
      activities: initialData?.activities || []
    }
  });

  // Watch form values for preview and activities
  const formValues = watch();

  const handleFormSubmit = async (data: EventFormData) => {
    // Format the data before submission
    const formattedData = {
      ...data,
      activities: data.activities.map(activity => ({
        ...activity,
        startTime: activity.startTime.toString().padStart(5, '0'),
        endTime: activity.endTime.toString().padStart(5, '0')
      }))
    };

    await onSubmit(formattedData);
  };

  const handleTemplateSelect = (template: EventTemplate | null) => {
    if (template) {
      reset({
        ...template.eventDetails,
        startTime: formValues.startTime || '',
        endTime: formValues.endTime || ''
      });
      toast.success(`Loaded template: ${template.name}`);
    }
  };

  const handleSaveTemplate = async (name: string) => {
    try {
      setIsSavingTemplate(true);
      
      // Create template data without date-specific fields
      const templateData = {
        title: formValues.title,
        description: formValues.description,
        imageUrl: formValues.imageUrl,
        location: formValues.location,
        price: formValues.price,
        capacity: formValues.capacity,
        instructor: formValues.instructor,
        category: formValues.category,
        requirements: formValues.requirements || [],
        activities: formValues.activities.map(activity => ({
          title: activity.title,
          description: activity.description,
          startTime: activity.startTime.toString().padStart(5, '0'),
          endTime: activity.endTime.toString().padStart(5, '0')
        }))
      };

      await templateService.saveTemplate(name, templateData);
      await refetchTemplates();
      setShowSaveTemplate(false);
      toast.success('Template saved successfully');
    } catch (error) {
      console.error('Template save error:', error);
      toast.error('Failed to save template');
    } finally {
      setIsSavingTemplate(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              {initialData ? 'Edit Event' : 'Create New Event'}
            </h2>
            <div className="flex space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowSaveTemplate(true)}
              >
                Save as Template
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>
            </div>
          </div>

          <TemplateSelect
            templates={templates}
            onSelect={handleTemplateSelect}
          />

          <BasicInfoSection
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />

          <RequirementsSection
            control={control}
            register={register}
            errors={errors}
          />

          <ActivitiesSection
            control={control}
            register={register}
            errors={errors}
            watch={watch}
          />

          <Button
            type="submit"
            isLoading={isSubmitting}
            loadingText="Saving..."
            className="w-full"
          >
            {initialData ? 'Update Event' : 'Create Event'}
          </Button>
        </form>
      </Card>

      {showPreview && formValues && (
        <EventPreview
          event={formValues as Partial<Event>}
          onClose={() => setShowPreview(false)}
        />
      )}

      {showSaveTemplate && (
        <SaveTemplateModal
          onSave={handleSaveTemplate}
          onClose={() => setShowSaveTemplate(false)}
          isLoading={isSavingTemplate}
        />
      )}
    </div>
  );
}