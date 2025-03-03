import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Booking } from '../../types';
import { eventService } from '../../services/event.service';
import { formatDateTime } from '../../lib/utils';
import { Card } from '../ui/Card';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface UpcomingEventCardProps {
  booking: Booking;
}

export function UpcomingEventCard({ booking }: UpcomingEventCardProps) {
  const navigate = useNavigate();
  const { data: event, isLoading } = useQuery(
    ['event', booking.eventId],
    () => eventService.getEvent(booking.eventId)
  );

  if (isLoading || !event) {
    return <LoadingSpinner />;
  }

  return (
    <Card>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
          <p className="text-gray-500 mt-1">{formatDateTime(event.startTime)}</p>
          <p className="text-gray-500">Location: {event.location}</p>
          <p className="text-gray-500">Attendees: {booking.attendees}</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => navigate(`/tickets/${booking.id}`)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            View Details
          </button>
          <button className="text-red-600 hover:text-red-800">
            Cancel
          </button>
        </div>
      </div>
    </Card>
  );
}