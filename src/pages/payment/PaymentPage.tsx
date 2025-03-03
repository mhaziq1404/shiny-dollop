import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../../services/event.service';
import { PaymentOptions } from '../../components/payment/PaymentOptions';
import { OrderSummary } from '../../components/checkout/OrderSummary';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';

export function PaymentPage() {
  const { id } = useParams<{ id: string }>();
  const { data: event, isLoading, error } = useQuery(
    ['event', id],
    () => eventService.getEvent(id!)
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load payment details" />;
  if (!event) return <ErrorMessage message="Event not found" />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Payment</h1>
      <div className="space-y-6">
        <OrderSummary event={event} attendees={1} />
        <PaymentOptions bookingId={id!} amount={event.price} />
      </div>
    </div>
  );
}