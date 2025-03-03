import React from 'react';
import { Link } from 'react-router-dom';
import { Event } from '../../types';
import { formatDateTime, formatPrice } from '../../lib/utils';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserIcon, 
  CurrencyDollarIcon,
  UserGroupIcon,
  TagIcon
} from '@heroicons/react/24/outline';

interface FeaturedEventProps {
  event: Event;
}

export function FeaturedEvent({ event }: FeaturedEventProps) {
  const availableSpaces = event.capacity - event.bookedSeats;
  const isFullyBooked = availableSpaces <= 0;

  return (
    <Card 
      variant="highlight" 
      className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white overflow-hidden"
      padding="none"
    >
      <div className="relative">
        {/* Background Image */}
        {event.imageUrl && (
          <div className="absolute inset-0">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Overlay - Now positioned above the content */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/90 via-orange-600/90 to-red-600/90" />

        {/* Content Container */}
        <div className="relative p-8">
          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm">
              Featured Event
            </span>
          </div>

          {/* Availability Badge */}
          <div className="absolute top-4 right-4">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
              ${isFullyBooked 
                ? 'bg-red-500/20 text-white' 
                : 'bg-green-500/20 text-white'}`}>
              <UserGroupIcon className="h-4 w-4 mr-1.5" />
              {isFullyBooked 
                ? 'Fully Booked' 
                : `${availableSpaces} spaces left`}
            </span>
          </div>

          {/* Event Content */}
          <div className="mt-6 mb-6">
            <h2 className="text-3xl font-bold mb-3">{event.title}</h2>
            <p className="text-white/90 text-lg leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <CalendarIcon className="h-6 w-6 text-white/70 flex-shrink-0" />
              <div>
                <p className="text-white/70 text-sm">When</p>
                <p className="font-medium">{formatDateTime(event.startTime)}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <MapPinIcon className="h-6 w-6 text-white/70 flex-shrink-0" />
              <div>
                <p className="text-white/70 text-sm">Where</p>
                <p className="font-medium">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <UserIcon className="h-6 w-6 text-white/70 flex-shrink-0" />
              <div>
                <p className="text-white/70 text-sm">Instructor</p>
                <p className="font-medium">{event.instructor}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CurrencyDollarIcon className="h-6 w-6 text-white/70 flex-shrink-0" />
              <div>
                <p className="text-white/70 text-sm">Price</p>
                <p className="font-medium">{formatPrice(event.price)}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <UserGroupIcon className="h-6 w-6 text-white/70 flex-shrink-0" />
              <div>
                <p className="text-white/70 text-sm">Capacity</p>
                <p className="font-medium">{event.capacity} attendees</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <TagIcon className="h-6 w-6 text-white/70 flex-shrink-0" />
              <div>
                <p className="text-white/70 text-sm">Category</p>
                <p className="font-medium capitalize">{event.category}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center px-8">
            <Link to={`/events/${event.id}`} className="w-full max-w-2xl">
              <Button 
                size="lg"
                className="w-full bg-white text-orange-600 hover:bg-white/90 shadow-lg hover:shadow-xl transform transition hover:-translate-y-0.5"
                disabled={isFullyBooked}
              >
                {isFullyBooked ? 'Sold Out' : 'Book Now'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}