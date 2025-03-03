import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { BookingBreadcrumb } from '../components/booking/BookingBreadcrumb';
import { UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const attendeeSchema = z.object({
  attendees: z.array(z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    dietaryRequirements: z.string().optional()
  }))
});

type AttendeeFormData = z.infer<typeof attendeeSchema>;

export function AttendeeInfoPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const attendeeCount = location.state?.attendees || 1;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<AttendeeFormData>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: {
      attendees: Array(attendeeCount).fill({
        name: '',
        email: '',
        phone: '',
        dietaryRequirements: ''
      })
    }
  });

  const onSubmit = (data: AttendeeFormData) => {
    navigate(`/checkout/${id}`, { 
      state: { 
        attendees: attendeeCount,
        attendeeInfo: data.attendees 
      } 
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BookingBreadcrumb />
      <Card className="mt-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Attendee Information</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {Array.from({ length: attendeeCount }).map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-100 rounded-full p-2 mr-3">
                    <UserIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Attendee {index + 1}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter full name"
                    {...register(`attendees.${index}.name`)}
                    error={errors.attendees?.[index]?.name?.message}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter email address"
                    {...register(`attendees.${index}.email`)}
                    error={errors.attendees?.[index]?.email?.message}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter phone number (optional)"
                    {...register(`attendees.${index}.phone`)}
                  />
                  <Input
                    label="Dietary Requirements"
                    placeholder="Any dietary requirements? (optional)"
                    {...register(`attendees.${index}.dietaryRequirements`)}
                  />
                </div>
              </div>
            ))}
            <Button
              type="submit"
              className="w-full"
              isLoading={isSubmitting}
              loadingText="Processing..."
            >
              Continue to Review
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}