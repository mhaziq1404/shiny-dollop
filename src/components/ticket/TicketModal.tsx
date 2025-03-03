import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { formatDateTime } from '../../lib/utils';
import { Event, Booking } from '../../types';
import { TicketQRCode } from './QRCode';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
  booking: Booking;
}

export function TicketModal({ isOpen, onClose, event, booking }: TicketModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 md:p-6 border-b relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold pr-8">Event Ticket</h2>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="flex flex-col space-y-6">
            {/* Event Details */}
            <div>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-gray-600 mt-1">{formatDateTime(event.startTime)}</p>
              <p className="text-gray-600">{event.location}</p>
            </div>
            
            {/* QR Code Section - Moved up for better mobile visibility */}
            <div className="flex justify-center py-4">
              <TicketQRCode bookingId={booking.id} eventId={event.id} />
            </div>
            
            {/* Attendees Section */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Attendees</h4>
              <div className="space-y-2">
                {booking.attendeeInfo.map((attendee, index) => (
                  <div key={index} className="text-sm bg-gray-50 p-3 rounded">
                    <p className="font-medium">{attendee.name}</p>
                    <p className="text-gray-500">{attendee.email}</p>
                    {attendee.phone && (
                      <p className="text-gray-500">{attendee.phone}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Notice Box */}
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-orange-800">
                Please arrive 15 minutes before the event starts. Present this QR code at the entrance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}