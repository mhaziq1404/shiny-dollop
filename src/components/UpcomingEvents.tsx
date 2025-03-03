import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/event.service';
import { bookingService } from '../services/booking.service';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { ErrorMessage } from './ui/ErrorMessage';
import { Card } from './ui/Card';
import { formatDateTime } from '../lib/utils';
import { CalendarIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

export function UpcomingEvents() {
  const { data: bookings, isLoading: isLoadingBookings } = useQuery(
    ['userBookings'],
    bookingService.getUserBookings
  );

  const { data: events, isLoading: isLoadingEvents } = useQuery(
    ['events'],
    eventService.getEvents,
    {
      enabled: !!bookings?.length,
    }
  );

  if (isLoadingBookings || isLoadingEvents) {
    return <LoadingSpinner />;
  }

  if (!bookings?.length) {
    return (
      <Card>
        <div className="text-center py-6">
          <p className="text-gray-500">No upcoming events</p>
          <p className="text-sm text-gray-400 mt-2">Book an event to see it here!</p>
        </div>
      </Card>
    );
  }

  const upcomingEvents = events?.filter(event => {
    const eventDate = new Date(event.startTime);
    const now = new Date();
    return eventDate > now;
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()) || [];

  // Take only the next two upcoming events
  const nextEvents = upcomingEvents.slice(0, 2);

  // Group all events by month
  const groupedEvents = events?.reduce((acc: Record<string, typeof events>, event) => {
    const monthYear = format(parseISO(event.startTime), 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {}) || {};

  // Sort events within each month
  Object.values(groupedEvents).forEach(monthEvents => {
    monthEvents.sort((a, b) => 
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  });

  return (
    <div className="space-y-6">
      {/* Your Next Events Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Next Events</h2>
        <Card>
          <div className="p-6">
            <div className="space-y-4">
              {nextEvents.map(event => {
                const booking = bookings.find(b => b.eventId === event.id);
                if (!booking) return null;

                return (
                  <div 
                    key={event.id}
                    className="border-b last:border-0 pb-4 last:pb-0"
                  >
                    <h3 className="font-semibold text-gray-900">{event.title}</h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        {formatDateTime(event.startTime)}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-2" />
                        {booking.attendees} {booking.attendees === 1 ? 'Attendee' : 'Attendees'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* All Events Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">All Events</h2>
        <Card>
          <div className="p-6">
            <div className="space-y-6">
              {Object.entries(groupedEvents).map(([month, monthEvents]) => (
                <div key={month}>
                  <h4 className="font-medium text-gray-900 mb-3">{month}</h4>
                  <div className="space-y-2">
                    {monthEvents.map(event => (
                      <Link 
                        key={event.id}
                        to={`/events/${event.id}`}
                        className="block hover:bg-gray-50 rounded-lg p-2 transition-colors"
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-1 min-w-0 mr-4">
                            <h5 className="font-medium text-gray-900 truncate">{event.title}</h5>
                            <p className="text-sm text-gray-500">
                              {format(parseISO(event.startTime), 'PPp')}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <span className={`text-xs px-1.5 py-0.5 rounded-full whitespace-nowrap
                              ${event.category === 'Online-Live' 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {event.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}