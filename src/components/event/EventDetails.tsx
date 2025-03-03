import React from 'react';
import { Event } from '../../types';
import { EventHeader } from './EventHeader';
import { EventImage } from './EventImage';
import { EventDescription } from './EventDescription';
import { EventInfo } from './EventInfo';
import { EventRequirements } from './EventRequirements';
import { EventActivities } from './EventActivities';

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="space-y-8">
      {event.imageUrl && (
        <EventImage imageUrl={event.imageUrl} title={event.title} />
      )}
      
      <EventHeader event={event} />
      <EventDescription description={event.description} />
      <EventInfo event={event} />
      
      {event.requirements?.length > 0 && (
        <EventRequirements requirements={event.requirements} />
      )}
      
      {event.activities?.length > 0 && (
        <EventActivities activities={event.activities} />
      )}
    </div>
  );
}