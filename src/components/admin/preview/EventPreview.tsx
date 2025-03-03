import React from 'react';
import { Event } from '../../../types';
import { PreviewCard } from './PreviewCard';
import { EventDetails } from '../../event/EventDetails';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

interface EventPreviewProps {
  event: Partial<Event>;
  onClose: () => void;
}

export function EventPreview({ event, onClose }: EventPreviewProps) {
  // Strip HTML tags from description for clean text display
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html || '';
    return tmp.textContent || tmp.innerText || '';
  };

  // Create a complete event object from partial data
  const previewEvent: Event = {
    id: 'preview',
    title: event.title || 'Event Title',
    description: event.description || 'Event Description',
    imageUrl: event.imageUrl,
    location: event.location || 'Location',
    price: event.price || 0,
    capacity: event.capacity || 0,
    bookedSeats: 0,
    startTime: event.startTime || new Date().toISOString(),
    endTime: event.endTime || new Date().toISOString(),
    instructor: event.instructor || 'Instructor',
    category: event.category || 'category',
    requirements: event.requirements || [],
    activities: event.activities || []
  };

  const availableSpaces = previewEvent.capacity - previewEvent.bookedSeats;

  return (
    <PreviewCard title="Event Preview" onClose={onClose}>
      <div className="space-y-6">
        {/* Event Details */}
        <EventDetails event={previewEvent} />

        {/* Booking Section */}
        <Card variant="static" className="bg-gray-50">
          <div className="p-4 text-center">
            <Button className="w-full max-w-sm" disabled>
              Book Now (Preview)
            </Button>
          </div>
        </Card>
      </div>
    </PreviewCard>
  );
}