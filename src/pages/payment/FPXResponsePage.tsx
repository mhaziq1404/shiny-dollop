import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { paymentService } from '../../services/payment.service';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { toast } from 'react-hot-toast';

export function FPXResponsePage() {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  const { data: paymentStatus, isError } = useQuery(
    ['paymentStatus'],
    paymentService.checkPaymentStatus,
    {
      enabled: localStorage.getItem('isPaying') === 'true',
      refetchInterval: 5000, // Poll every 5 seconds
      retry: 3,
    }
  );

  useEffect(() => {
    const isPaying = localStorage.getItem('isPaying');
    
    if (!isPaying) {
      navigate('/');
      return;
    }

    if (paymentStatus) {
      if (paymentStatus.status === 'completed') {
        localStorage.removeItem('isPaying');
        toast.success('Payment successful!');
        navigate('/confirmation', { 
          state: { 
            booking: paymentStatus.booking,
            event: paymentStatus.event
          }
        });
      } else if (paymentStatus.status === 'failed') {
        localStorage.removeItem('isPaying');
        toast.error('Payment failed. Please try again.');
        navigate('/checkout/' + paymentStatus.eventId);
      }
      setIsChecking(false);
    }

    if (isError) {
      localStorage.removeItem('isPaying');
      toast.error('Failed to verify payment status');
      navigate('/');
    }
  }, [paymentStatus, isError, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <div className="p-6 text-center">
          <LoadingSpinner />
          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            Verifying Payment
          </h2>
          <p className="mt-2 text-gray-600">
            Please wait while we verify your payment status...
          </p>
        </div>
      </Card>
    </div>
  );
}