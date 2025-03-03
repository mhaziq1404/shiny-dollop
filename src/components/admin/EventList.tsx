import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../../services/event.service';
import { bookingService } from '../../services/booking.service';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatDateTime } from '../../lib/utils';
import { EventActions } from './EventActions';
import { BookingsModal } from './BookingsModal';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { Booking } from '../../types';

export function EventList() {
  const [selectedEvent, setSelectedEvent] = useState<{id: string, title: string} | null>(null);
  const queryClient = useQueryClient();
  
  const { data: events = [], isLoading: isLoadingEvents } = useQuery(
    ['admin-events'],
    () => eventService.getEvents()
  );

  const { data: bookings, isLoading: isLoadingBookings } = useQuery(
    ['admin-bookings'],
    () => bookingService.getAllBookings()
  );

  const cancelMutation = useMutation(
    ({ id, reason }: { id: string; reason: string }) => 
      eventService.cancelEvent(id, reason),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['admin-events']);
      },
    }
  );

  const updateBookingMutation = useMutation(
    ({ bookingId, updatedBooking }: { bookingId: string; updatedBooking: Booking }) =>
      bookingService.updateBooking(bookingId, updatedBooking),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['admin-bookings']);
      },
    }
  );

  if (isLoadingEvents || isLoadingBookings) return <LoadingSpinner />;
  if (!events?.length) return <p>No events found</p>;

  const now = new Date();

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.startTime);
    const dateB = new Date(b.startTime);
    return dateA.getTime() - dateB.getTime();
  });

  const ongoingEvents = sortedEvents.filter(event => {
    const start = new Date(event.startTime);
    const end = new Date(event.endTime);
    return start <= now && end >= now && !event.cancelled;
  });

  const upcomingEvents = sortedEvents.filter(event => {
    const start = new Date(event.startTime);
    return start > now && !event.cancelled;
  });

  const getEventBookings = (eventId: string) => {
    return bookings?.filter(booking => booking.eventId === eventId) || [];
  };

  const handleUpdateBooking = async (bookingId: string, updatedBooking: Booking) => {
    await updateBookingMutation.mutateAsync({ bookingId, updatedBooking });
  };

  const handleCancelEvent = async (eventId: string, reason: string) => {
    await cancelMutation.mutateAsync({ id: eventId, reason });
  };

  const renderEventCard = (event: any) => {
    const eventBookings = getEventBookings(event.id);
    const totalAttendees = eventBookings.reduce((sum, booking) => sum + booking.attendees, 0);

    return (
      <Card key={event.id} className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold">{event.title}</h3>
              {event.cancelled && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Cancelled
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{formatDateTime(event.startTime)}</p>
            <div className="flex items-center mt-2 space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <UserGroupIcon className="h-4 w-4 mr-1" />
                <span>{totalAttendees} / {event.capacity} attendees</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedEvent({ id: event.id, title: event.title })}
              >
                View Attendees
              </Button>
            </div>
            {event.cancelled && (
              <div className="mt-2 text-sm text-red-600">
                Reason: {event.cancellationReason}
              </div>
            )}
          </div>
          {!event.cancelled && (
            <EventActions
              eventId={event.id}
              eventTitle={event.title}
              onCancel={handleCancelEvent}
              isCancelling={cancelMutation.isLoading}
            />
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Ongoing Events</h2>
        <div className="space-y-4">
          {ongoingEvents.map(renderEventCard)}
          {ongoingEvents.length === 0 && (
            <p className="text-gray-500">No ongoing events</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {upcomingEvents.map(renderEventCard)}
          {upcomingEvents.length === 0 && (
            <p className="text-gray-500">No upcoming events</p>
          )}
        </div>
      </section>

      {selectedEvent && (
        <BookingsModal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          bookings={getEventBookings(selectedEvent.id)}
          eventTitle={selectedEvent.title}
          onUpdateBooking={handleUpdateBooking}
        />
      )}
    </div>
  );
}