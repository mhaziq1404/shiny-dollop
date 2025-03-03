import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { XMarkIcon } from '@heroicons/react/24/outline';

const cancelSchema = z.object({
  reason: z.string().min(10, 'Cancellation reason must be at least 10 characters'),
});

type CancelFormData = z.infer<typeof cancelSchema>;

interface CancelEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => Promise<void>;
  eventTitle: string;
  isLoading: boolean;
}

export function CancelEventModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  eventTitle,
  isLoading 
}: CancelEventModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CancelFormData>({
    resolver: zodResolver(cancelSchema)
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Cancel Event</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              Are you sure you want to cancel <span className="font-medium">{eventTitle}</span>?
              This action cannot be undone.
            </p>
          </div>

          <form onSubmit={handleSubmit(data => onConfirm(data.reason))}>
            <Textarea
              label="Cancellation Reason"
              placeholder="Please provide a reason for cancelling this event..."
              {...register('reason')}
              error={errors.reason?.message}
              required
            />

            <div className="mt-6 flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
              >
                Keep Event
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                loadingText="Cancelling..."
              >
                Cancel Event
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}