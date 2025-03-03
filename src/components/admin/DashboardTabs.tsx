import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { Event } from '../../types';
import { EventList } from './EventList';
import { BookingsChart } from './analytics/BookingsChart';
import { CategoryDistribution } from './analytics/CategoryDistribution';
import { LocationPresets } from './presets/LocationPresets';
import { InstructorPresets } from './presets/InstructorPresets';
import { Card } from '../ui/Card';

interface DashboardTabsProps {
  ongoingEvents: Event[];
  analyticsData: {
    bookings: {
      labels: string[];
      bookings: number[];
    };
    categories: {
      labels: string[];
      values: number[];
    };
  };
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function DashboardTabs({ ongoingEvents, analyticsData }: DashboardTabsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const tabs = [
    { name: 'Events', content: <EventList /> },
    { 
      name: 'Analytics', 
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <div className="p-4">
              <BookingsChart data={analyticsData.bookings} />
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <CategoryDistribution data={analyticsData.categories} />
            </div>
          </Card>
        </div>
      ) 
    },
    { 
      name: 'Settings', 
      content: (
        <div className="space-y-6">
          <LocationPresets />
          <InstructorPresets />
        </div>
      ) 
    },
  ];

  return (
    <div className="w-full">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1 mb-6">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-orange-600 shadow'
                    : 'text-gray-600 hover:bg-white/[0.12] hover:text-orange-600'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl',
                'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
              )}
            >
              {tab.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}