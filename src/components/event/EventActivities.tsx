import React from 'react';
import { EventActivity } from '../../types';
import { ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface EventActivitiesProps {
  activities: EventActivity[];
}

export function EventActivities({ activities }: EventActivitiesProps) {
  if (!activities.length) return null;

  // Group activities by day
  const groupedActivities = activities.reduce((acc, activity) => {
    const day = activity.day;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(activity);
    return acc;
  }, {} as Record<string, EventActivity[]>);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Schedule</h3>
      {Object.entries(groupedActivities).map(([day, dayActivities], dayIndex) => (
        <div key={day} className="space-y-4">
          <h4 className="flex items-center text-base font-medium text-gray-700">
            <CalendarIcon className="h-5 w-5 mr-2 text-orange-500" />
            Day {dayIndex + 1} ({new Date(day).toLocaleDateString()})
          </h4>
          <div className="space-y-3">
            {dayActivities.map((activity, index) => (
              <div key={`activity-${activity.id || index}`} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="text-base font-medium text-gray-900">{activity.title}</h5>
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    <span>{activity.startTime} - {activity.endTime}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}