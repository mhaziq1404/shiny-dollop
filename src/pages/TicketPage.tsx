import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/event.service';
import { bookingService } from '../services/booking.service';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { Card } from '../components/ui/Card';
import { formatDateTime } from '../lib/utils';
import { TicketQRCode } from '../components/ticket/QRCode';
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export function TicketPage() {
  const { id } = useParams<{ id: string }>();
  const { data: booking, isLoading: isLoadingBooking } = useQuery(
    ['booking', id],
    () => bookingService.getBooking(id!)
  );
  
  const { data: event, isLoading: isLoadingEvent } = useQuery(
    ['event', booking?.eventId],
    () => eventService.getEvent(booking!.eventId),
    { enabled: !!booking }
  );

  if (isLoadingBooking || isLoadingEvent) {
    return <LoadingSpinner />;
  }

  if (!booking || !event) {
    return <ErrorMessage message="Ticket not found" />;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="p-6">
            <div className="text-center border-b pb-6">
              <h1 className="text-2xl font-bold text-gray-900">Event Ticket</h1>
              <p className="text-gray-500 mt-1">Valid for entry</p>
            </div>
            
            <div className="py-6 space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
                <p className="text-gray-600 mt-1">{event.description}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{formatDateTime(event.startTime)}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center">
                  <UserGroupIcon className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{booking.attendees} {booking.attendees === 1 ? 'Attendee' : 'Attendees'}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm text-gray-600">
                  Please arrive 15 minutes before the event starts. Present this ticket at the entrance.
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col justify-center">
          <TicketQRCode bookingId={booking.id} eventId={event.id} />
        </div>
      </div>
    </div>
  );
}