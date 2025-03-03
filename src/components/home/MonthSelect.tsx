import React from 'react';
import { format, parseISO } from 'date-fns';
import { Select } from '../ui/Select';

interface MonthSelectProps {
  events: any[];
  selectedMonth: string | null;
  onMonthSelect: (month: string | null) => void;
}

export function MonthSelect({ events, selectedMonth, onMonthSelect }: MonthSelectProps) {
  // Get unique months from events
  const months = React.useMemo(() => {
    const uniqueMonths = new Set(
      events.map(event => format(parseISO(event.startTime), 'MMMM yyyy'))
    );
    return Array.from(uniqueMonths).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA.getTime() - dateB.getTime();
    });
  }, [events]);

  return (
    <Select
      label=""
      value={selectedMonth || ''}
      onChange={(e) => onMonthSelect(e.target.value || null)}
      className="mt-0"
    >
      <option value="">All Months</option>
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </Select>
  );
}