import React from 'react';
import { Event } from '../../types';
import { UserGroupIcon } from '@heroicons/react/24/outline';

interface EventHeaderProps {
  event: Event;
}

export function EventHeader({ event }: EventHeaderProps) {
  const availableSpaces = event.capacity - event.bookedSeats;
  const isFullyBooked = availableSpaces <= 0;

  return (
    <div className="flex justify-between items-start mb-6">
      <h1 className="text-2xl font-bold text-gray-900 line-clamp-2 flex-1 mr-4">
        {event.title}
      </h1>
      <div className="flex items-center text-sm flex-shrink-0">
        <UserGroupIcon className="h-4 w-4 text-gray-400 mr-1" />
        <span className={`${isFullyBooked ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
          {isFullyBooked ? 'Fully Booked' : `${availableSpaces} spaces left`}
        </span>
      </div>
    </div>
  );
}