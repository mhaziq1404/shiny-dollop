import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../../services/api';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { UpcomingEventCard } from './UpcomingEventCard';
import { Card } from '../ui/Card';

export function UpcomingEvents() {
  const { data: bookings, isLoading, error } = useQuery(
    ['userBookings'],
    bookingService.getUserBookings
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load upcoming events" />;
  }

  if (!bookings?.length) {
    return (
      <Card>
        <div className="text-center py-6">
          <p className="text-gray-500">No upcoming events</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Events</h2>
      {bookings.map((booking) => (
        <UpcomingEventCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}