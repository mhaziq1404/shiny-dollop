import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export function RequirementsSection({ control, register, errors }: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements"
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Requirements</h3>
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ description: '', type: 'required' })}
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Requirement
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <div className="flex-1">
            <Input
              label="Description"
              {...register(`requirements.${index}.description`)}
              error={errors?.requirements?.[index]?.description?.message}
            />
          </div>
          <div className="w-40">
            <Select
              label="Type"
              {...register(`requirements.${index}.type`)}
              error={errors?.requirements?.[index]?.type?.message}
            >
              <option value="required">Required</option>
              <option value="recommended">Recommended</option>
            </Select>
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
      ))}
    </div>
  );
}