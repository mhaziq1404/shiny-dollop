import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { BookingBreadcrumb } from '../components/booking/BookingBreadcrumb';
import { formatDateTime, formatPrice } from '../lib/utils';

export function ConfirmationPage() {
  const location = useLocation();
  const booking = location.state?.booking;
  const event = location.state?.event;

  if (!booking || !event) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <BookingBreadcrumb />
      <Card className="text-center">
        <div className="mb-6">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900 mt-4">Booking Confirmed!</h1>
          <p className="text-gray-600 mt-2">
            Thank you for your booking. Your ticket has been sent to your email.
          </p>
        </div>

        <div className="border-t border-b border-gray-200 py-6 my-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-gray-600">{formatDateTime(event.startTime)}</p>
            </div>
            <div>
              <p className="text-gray-600">Location: {event.location}</p>
              <p className="text-gray-600">Booking Reference: {booking.id}</p>
              <p className="text-gray-600">Number of Attendees: {booking.attendees}</p>
              <p className="text-gray-600">Total Amount: {formatPrice(event.price * booking.attendees)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => window.print()}
            variant="secondary"
            className="w-full"
          >
            Print Ticket
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            variant="primary"
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}