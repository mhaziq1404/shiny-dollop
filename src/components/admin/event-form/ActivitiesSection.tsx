import React from 'react';
import { useFieldArray, UseFormWatch } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Select } from '../../ui/Select';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface ActivitiesSectionProps {
  control: any;
  register: any;
  errors: any;
  watch: UseFormWatch<any>;
}

export function ActivitiesSection({ control, register, errors, watch }: ActivitiesSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "activities"
  });

  const startTime = watch('startTime');
  const endTime = watch('endTime');

  const dayOptions = React.useMemo(() => {
    if (!startTime || !endTime) return [];

    const eventStartDate = new Date(startTime);
    const eventEndDate = new Date(endTime);
    const options = [];
    
    for (let date = new Date(eventStartDate); date <= eventEndDate; date.setDate(date.getDate() + 1)) {
      options.push({
        value: date.toISOString().split('T')[0],
        label: `Day ${options.length + 1} (${date.toLocaleDateString()})`
      });
    }
    
    return options;
  }, [startTime, endTime]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Activities</h3>
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ 
            title: '', 
            description: '', 
            day: dayOptions[0]?.value || '',
            startTime: '',
            endTime: ''
          })}
          disabled={!dayOptions.length}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      </div>

      {!dayOptions.length && (
        <p className="text-sm text-gray-500">
          Please set the event start and end dates first to add activities.
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                label="Title"
                {...register(`activities.${index}.title`)}
                error={errors?.activities?.[index]?.title?.message}
              />
            </div>
            <Button
              type="button"
              variant="secondary"
              className="mt-7"
              onClick={() => remove(index)}
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>

          <Textarea
            label="Description"
            {...register(`activities.${index}.description`)}
            error={errors?.activities?.[index]?.description?.message}
          />

          <div className="grid grid-cols-3 gap-4">
            <Select
              label="Day"
              {...register(`activities.${index}.day`)}
              error={errors?.activities?.[index]?.day?.message}
            >
              <option value="">Select Day</option>
              {dayOptions.map(day => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </Select>

            <Input
              type="time"
              label="Start Time"
              {...register(`activities.${index}.startTime`)}
              error={errors?.activities?.[index]?.startTime?.message}
            />
            <Input
              type="time"
              label="End Time"
              {...register(`activities.${index}.endTime`)}
              error={errors?.activities?.[index]?.endTime?.message}
            />
          </div>
        </div>
      ))}
    </div>
  );
}