import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { eventService } from '../../services/event.service';
import { Sidebar } from '../../components/admin/Sidebar';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { formatDateTime } from '../../lib/utils';
import { UserGroupIcon } from '@heroicons/react/24/outline';

export function AdminPastEventsPage() {
  const { logout } = useAuth();
  const { data: events, isLoading } = useQuery(
    ['events'],
    () => eventService.getEvents()
  );

  const pastEvents = events?.filter(event => {
    const endDate = new Date(event.endTime);
    return endDate < new Date();
  }).sort((a, b) => {
    // Sort by end date, most recent first
    return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
  });

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar onLogout={logout} />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Past Events</h1>

          {isLoading ? (
            <LoadingSpinner />
          ) : pastEvents?.length === 0 ? (
            <Card>
              <div className="p-6 text-center text-gray-500">
                No past events found
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastEvents?.map((event) => (
                <Card key={event.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatDateTime(event.startTime)} - {formatDateTime(event.endTime)}
                      </p>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          <span>{event.bookedSeats} / {event.capacity} attendees</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          Location: {event.location}
                        </span>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      bg-gray-100 text-gray-800`}>
                      Completed
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}