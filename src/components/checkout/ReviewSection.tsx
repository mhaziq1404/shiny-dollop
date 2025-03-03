import React from 'react';
import { Card } from '../ui/Card';
import { UserIcon, EnvelopeIcon, PhoneIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface AttendeeInfo {
  name: string;
  email: string;
  phone?: string;
  dietaryRequirements?: string;
}

interface ReviewSectionProps {
  attendees: AttendeeInfo[];
}

export function ReviewSection({ attendees }: ReviewSectionProps) {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Attendee Information</h2>
        <div className="space-y-6">
          {attendees.map((attendee, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-100 rounded-full p-2 mr-3">
                  <UserIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="font-medium text-gray-900">Attendee {index + 1}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-12">
                <div className="flex items-center space-x-2 text-gray-600">
                  <UserIcon className="h-4 w-4" />
                  <span>{attendee.name}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <EnvelopeIcon className="h-4 w-4" />
                  <span>{attendee.email}</span>
                </div>
                {attendee.phone && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <PhoneIcon className="h-4 w-4" />
                    <span>{attendee.phone}</span>
                  </div>
                )}
                {attendee.dietaryRequirements && (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <ClipboardDocumentListIcon className="h-4 w-4" />
                    <span>{attendee.dietaryRequirements}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}