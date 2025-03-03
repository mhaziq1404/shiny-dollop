import React from 'react';
import { Event } from '../../types';
import { formatPrice } from '../../lib/utils';
import { Card } from '../ui/Card';

interface OrderSummaryProps {
  event: Event;
  attendees: number;
}

export function OrderSummary({ event, attendees }: OrderSummaryProps) {
  const subtotal = event.price * attendees;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Event</span>
            <span className="font-medium">{event.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Attendees</span>
            <span className="font-medium">{attendees}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Price per person</span>
            <span className="font-medium">{formatPrice(event.price)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (10%)</span>
            <span className="font-medium">{formatPrice(tax)}</span>
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}