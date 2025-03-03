import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../services/event.service';
import { BookingForm } from '../components/BookingForm';
import { EventDetails } from '../components/event/EventDetails';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { BookingBreadcrumb } from '../components/booking/BookingBreadcrumb';

export function EventPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  
  const { data: event, isLoading, error } = useQuery(
    ['event', id],
    () => eventService.getEvent(id!),
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message="Failed to load event details" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message="Event not found" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BookingBreadcrumb />
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <EventDetails event={event} />
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Book This Event
            </h2>
            <BookingForm
              eventId={event.id}
              onSuccess={() => {
                queryClient.invalidateQueries(['event', id]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}