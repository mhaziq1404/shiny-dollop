import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const bookingSchema = z.object({
  attendees: z
    .number()
    .min(1, 'At least 1 attendee is required')
    .max(10, 'Maximum 10 attendees allowed'),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  eventId: string;
}

export function BookingForm({ eventId }: BookingFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      attendees: 1,
    },
  });

  const onSubmit = (data: BookingFormData) => {
    navigate(`/attendees/${eventId}`, { state: { attendees: data.attendees } });
  };

  const handleGenerateQuotation = () => {
    const attendees = watch('attendees');
    // Navigate to quotation page with attendees count
    navigate(`/quotation/${eventId}`, { state: { attendees } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Number of Attendees"
        type="number"
        {...register('attendees', { valueAsNumber: true })}
        min="1"
        max="10"
        error={errors.attendees?.message}
      />
      <Button type="submit" className="w-full">
        Proceed to Checkout
      </Button>
      <Button 
        type="button" 
        variant="secondary" 
        className="w-full"
        onClick={handleGenerateQuotation}
      >
        Generate Quotation Letter
      </Button>
    </form>
  );
}