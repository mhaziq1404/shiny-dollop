import React from 'react';
import { Event } from '../../types';
import { formatDateTime, formatPrice } from '../../lib/utils';
import { CalendarIcon, MapPinIcon, UserIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface EventInfoProps {
  event: Event;
}

export function EventInfo({ event }: EventInfoProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex items-start space-x-3">
        <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-gray-500">When</h3>
          <p className="mt-1">{formatDateTime(event.startTime)}</p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-gray-500">Where</h3>
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center"
          >
            {event.location}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-gray-500">Price</h3>
          <p className="mt-1">{formatPrice(event.price)}</p>
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <UserIcon className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-gray-500">Instructor</h3>
          <p className="mt-1">{event.instructor}</p>
        </div>
      </div>
    </div>
  );
}