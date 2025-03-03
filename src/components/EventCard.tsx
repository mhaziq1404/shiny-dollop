import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../types';
import { formatDateTime, formatPrice } from '../lib/utils';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { UserGroupIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const availableSpaces = event.capacity - event.bookedSeats;
  const isFullyBooked = availableSpaces <= 0;

  // Strip HTML tags from description for clean text display
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const cleanDescription = stripHtml(event.description);

  return (
    <Card variant="interactive">
      <div className="flex flex-col h-full">
        {event.imageUrl && (
          <div className="relative h-48 mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-lg">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}

        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
            ${event.category === 'Online-Live' 
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
            }`}
          >
            {event.category}
          </span>
          <div className="flex items-center text-sm">
            <UserGroupIcon className="h-4 w-4 text-gray-400 mr-1" />
            <span className={`${isFullyBooked ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
              {isFullyBooked ? 'Fully Booked' : `${availableSpaces} spaces left`}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>

        <div className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {cleanDescription}
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">{formatDateTime(event.startTime)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CurrencyDollarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatPrice(event.price)}</span>
          </div>
        </div>
        
        <Link to={`/events/${event.id}`} className="block mt-auto">
          <Button 
            className="w-full"
            disabled={isFullyBooked}
          >
            {isFullyBooked ? 'Sold Out' : 'Book Now'}
          </Button>
        </Link>
      </div>
    </Card>
  );
}