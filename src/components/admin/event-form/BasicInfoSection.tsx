import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { presetService } from '../../../services/presets';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { RichTextEditor } from '../../ui/RichTextEditor';

interface BasicInfoSectionProps {
  register: any;
  errors: any;
  setValue: any;
  watch: any;
}

export function BasicInfoSection({ register, errors, setValue, watch }: BasicInfoSectionProps) {
  const { data: locations } = useQuery(['locationPresets'], presetService.getLocations);
  const { data: instructors } = useQuery(['instructorPresets'], presetService.getInstructors);
  const description = watch('description');
  const category = watch('category');
  const startTime = watch('startTime');
  const endTime = watch('endTime');
  const instructor = watch('instructor');

  const isEndTimeBeforeStart = React.useMemo(() => {
    if (!startTime || !endTime) return false;
    return new Date(endTime) < new Date(startTime);
  }, [startTime, endTime]);

  // Validate instructor selection
  React.useEffect(() => {
    if (instructors?.length && instructor) {
      const isValidInstructor = instructors.some(i => i.name === instructor);
      if (!isValidInstructor) {
        setValue('instructor', '');
      }
    }
  }, [instructor, instructors, setValue]);

  const categories = [
    'Face-2-Face',
    'Online-Live'
  ];

  return (
    <div className="space-y-6">
      <Input
        label="Title"
        {...register('title')}
        error={errors.title?.message}
        required
      />
      
      <Input
        label="Image URL"
        placeholder="https://example.com/image.jpg"
        {...register('imageUrl')}
        error={errors.imageUrl?.message}
      />
      
      <RichTextEditor
        label="Description"
        value={description || ''}
        onChange={(value) => setValue('description', value)}
        error={errors.description?.message}
      />

      <Select
        label="Category"
        {...register('category')}
        error={errors.category?.message}
        required
      >
        <option value="">Select a category</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </Select>
      
      {category === 'Face-2-Face' ? (
        <Select
          label="Location"
          {...register('location')}
          error={errors.location?.message}
          required
        >
          <option value="">Select a location</option>
          {locations?.map(location => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </Select>
      ) : category === 'Online-Live' ? (
        <Input
          label="Meeting Link"
          placeholder="https://meet.google.com/... or https://zoom.us/..."
          {...register('location')}
          error={errors.location?.message}
          required
        />
      ) : null}

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          type="number"
          {...register('price', { valueAsNumber: true })}
          error={errors.price?.message}
          required
        />
        
        <Input
          label="Capacity"
          type="number"
          {...register('capacity', { valueAsNumber: true })}
          error={errors.capacity?.message}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Time"
          type="datetime-local"
          {...register('startTime')}
          error={errors.startTime?.message}
          required
        />
        
        <Input
          label="End Time"
          type="datetime-local"
          {...register('endTime')}
          error={errors.endTime?.message || (isEndTimeBeforeStart ? 'End time cannot be before start time' : undefined)}
          className={isEndTimeBeforeStart ? 'border-red-500' : ''}
          required
        />
      </div>
      
      <Select
        label="Instructor"
        {...register('instructor')}
        error={errors.instructor?.message}
        required
      >
        <option value="">Select an instructor</option>
        {instructors?.map(instructor => (
          <option key={instructor.id} value={instructor.name}>
            {instructor.name}
          </option>
        ))}
      </Select>
    </div>
  );
}