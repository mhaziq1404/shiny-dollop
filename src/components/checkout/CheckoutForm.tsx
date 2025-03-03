import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry date (MM/YY)'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Input
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>
        <div>
          <Input
            label="Full Name"
            {...register('fullName')}
            error={errors.fullName?.message}
          />
        </div>
        <div>
          <Input
            label="Card Number"
            {...register('cardNumber')}
            placeholder="1234 5678 9012 3456"
            error={errors.cardNumber?.message}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Expiry Date"
            {...register('expiryDate')}
            placeholder="MM/YY"
            error={errors.expiryDate?.message}
          />
          <Input
            label="CVV"
            type="password"
            {...register('cvv')}
            placeholder="123"
            error={errors.cvv?.message}
          />
        </div>
        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText="Processing..."
          className="w-full"
        >
          Complete Purchase
        </Button>
      </form>
    </Card>
  );
}