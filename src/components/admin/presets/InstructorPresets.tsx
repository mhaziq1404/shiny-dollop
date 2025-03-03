import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { presetService } from '../../../services/presets';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Card } from '../../ui/Card';
import { toast } from 'react-hot-toast';
import { UserIcon, LinkIcon } from '@heroicons/react/24/outline';

interface InstructorFormData {
  name: string;
  profileUrl: string;
}

export function InstructorPresets() {
  const [formData, setFormData] = React.useState<InstructorFormData>({
    name: '',
    profileUrl: ''
  });
  const queryClient = useQueryClient();

  const { data: instructors } = useQuery(
    ['instructorPresets'],
    presetService.getInstructors
  );

  const addMutation = useMutation(
    (instructor: InstructorFormData) => presetService.addInstructor(instructor),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['instructorPresets']);
        setFormData({ name: '', profileUrl: '' });
        toast.success('Instructor added');
      },
    }
  );

  const deleteMutation = useMutation(
    (id: string) => presetService.deleteInstructor(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['instructorPresets']);
        toast.success('Instructor removed');
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    addMutation.mutate(formData);
  };

  const isValidUrl = (url: string) => {
    if (!url) return true;
    try {
      new URL(url);
      return url.includes('linkedin.com');
    } catch {
      return false;
    }
  };

  return (
    <Card>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Instructor Presets</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                label="Instructor Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Add new instructor"
              />
            </div>
            <div className="flex-1">
              <Input
                label="LinkedIn Profile URL (optional)"
                value={formData.profileUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, profileUrl: e.target.value }))}
                placeholder="https://linkedin.com/in/..."
                error={!isValidUrl(formData.profileUrl) ? 'Invalid LinkedIn URL' : undefined}
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={!formData.name.trim() || !isValidUrl(formData.profileUrl)}
          >
            Add Instructor
          </Button>
        </form>
        <div className="mt-4 space-y-2">
          {instructors?.map((instructor) => (
            <div
              key={instructor.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded"
            >
              <div className="flex items-center space-x-3">
                <UserIcon className="h-5 w-5 text-gray-400" />
                <span className="font-medium">{instructor.name}</span>
                {instructor.profileUrl && (
                  <a
                    href={instructor.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                    title="View LinkedIn Profile"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
              <Button
                variant="secondary"
                onClick={() => deleteMutation.mutate(instructor.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}