import React from 'react';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/event.service';
import { ReviewSection } from '../components/checkout/ReviewSection';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { PaymentOptions } from '../components/payment/PaymentOptions';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { BookingBreadcrumb } from '../components/booking/BookingBreadcrumb';

export function CheckoutPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const attendees = location.state?.attendees || 1;
  const attendeeInfo = location.state?.attendeeInfo;

  const { data: event, isLoading, error } = useQuery(
    ['event', id],
    () => eventService.getEvent(id!),
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <ErrorMessage message="Failed to load event details" />
      </div>
    );
  }

  if (!event || !attendeeInfo) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BookingBreadcrumb />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Review and Confirm</h1>
      
      <div className="space-y-6">
        <ReviewSection attendees={attendeeInfo} />
        <OrderSummary event={event} attendees={attendees} />
        <PaymentOptions eventId={id!} amount={event.price * attendees} attendees={attendees} attendeeInfo={attendeeInfo} />
      </div>
    </div>
  );
}