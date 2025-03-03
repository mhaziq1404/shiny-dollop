import React from 'react';
import { Event } from '../../types';
import { EventCard } from '../EventCard';
import { format, parseISO } from 'date-fns';

interface EventGridProps {
  events: Event[];
  excludeId?: string;
  selectedMonth: string | null;
}

interface GroupedEvents {
  [key: string]: Event[];
}

export function EventGrid({ events, excludeId, selectedMonth }: EventGridProps) {
  const filteredEvents = React.useMemo(() => {
    let filtered = excludeId 
      ? events.filter(event => event.id !== excludeId)
      : events;

    if (selectedMonth) {
      filtered = filtered.filter(event => 
        format(parseISO(event.startTime), 'MMMM yyyy') === selectedMonth
      );
    }

    return filtered;
  }, [events, excludeId, selectedMonth]);

  // Group events by month
  const groupedEvents = filteredEvents.reduce((acc: GroupedEvents, event) => {
    const monthYear = format(parseISO(event.startTime), 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(event);
    return acc;
  }, {});

  // Sort events within each month by date
  Object.keys(groupedEvents).forEach(month => {
    groupedEvents[month].sort((a, b) => 
      new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
  });

  if (filteredEvents.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No events found for the selected month.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {Object.entries(groupedEvents).map(([month, monthEvents]) => (
        <section key={month}>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {month}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {monthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}