import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';
import { eventService } from '../../services/event.service';
import { UpcomingEvents } from '../UpcomingEvents';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { format, parseISO } from 'date-fns';
import { Event } from '../../types';
import { EventCard } from '../EventCard';

export function UpcomingEventsSection() {
  const { isAuthenticated } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { data: events, isLoading } = useQuery(
    ['events'],
    eventService.getEvents
  );

  if (isAuthenticated) {
    return <UpcomingEvents />;
  }

  if (isLoading) {
    return (
      <Card>
        <div className="p-6">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  if (!events?.length) {
    return (
      <Card>
        <div className="p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Events Found
          </h3>
          <p className="text-gray-600 mb-4">
            There are no upcoming events at the moment.
          </p>
        </div>
      </Card>
    );
  }

  // Group events by month
  const groupedEvents = events.reduce((acc: Record<string, Event[]>, event) => {
    const monthYear = format(parseISO(event.startTime), 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

  // Sort events within each month by date
  Object.values(groupedEvents).forEach(monthEvents => {
    monthEvents.sort((a, b) => 
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          All Events
        </h2>
      </div>

      <Card>
        <div className="p-6">
          <div className="space-y-6">
            {Object.entries(groupedEvents).map(([month, monthEvents]) => (
              <div key={month}>
                <h4 className="font-medium text-gray-900 mb-3">{month}</h4>
                <div className="space-y-2">
                  {monthEvents.map(event => (
                    <div 
                      key={event.id}
                      className="cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                      onClick={() => setSelectedEvent(event)}
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
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-lg overflow-hidden">
            <div className="p-6">
              <EventCard event={selectedEvent} />
              <div className="mt-4 flex justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setSelectedEvent(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}