import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/event.service';
import { EventCard } from './EventCard';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorMessage } from './ui/ErrorMessage';

export function EventList() {
  const { data: events, isLoading, error } = useQuery(
    ['events'],
    eventService.getEvents
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load events" />;
  }

  if (!events?.length) {
    return <div className="text-center text-gray-500">No events available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}