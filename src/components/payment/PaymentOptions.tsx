import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { paymentService } from '../../services/payment.service';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BanknotesIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface PaymentOptionsProps {
  eventId: string;
  amount: number;
  attendees: number;
  attendeeInfo: Array<{
    name: string;
    email: string;
    phone?: string;
    dietaryRequirements?: string;
  }>;
}

export function PaymentOptions({ eventId, amount, attendees, attendeeInfo }: PaymentOptionsProps) {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<'fpx' | 'lo'>('fpx');

  const { mutate: createFPXPayment, isLoading } = useMutation({
    mutationFn: () => paymentService.createFPXPayment({
      eventId,
      attendees,
      attendeeInfo
    }),
    onSuccess: (html) => {
      navigate('/payment/fpx', { 
        state: { html }
      });
    },
    onError: (error) => {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }
  });

  const handleLO = () => {
    navigate(`/payment/upload/${eventId}`, {
      state: { attendees, attendeeInfo }
    });
  };

  const handleSubmit = () => {
    if (selectedMethod === 'fpx') {
      createFPXPayment();
    } else {
      handleLO();
    }
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Select Payment Method</h2>
        <div className="space-y-4">
          {/* FPX Option */}
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="fpx"
              checked={selectedMethod === 'fpx'}
              onChange={(e) => setSelectedMethod('fpx')}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500"
            />
            <div className="flex items-center space-x-3">
              <BanknotesIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">FPX Online Banking</p>
                <p className="text-sm text-gray-500">Pay securely with your bank account</p>
              </div>
            </div>
          </label>

          {/* Local Order Option */}
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="lo"
              checked={selectedMethod === 'lo'}
              onChange={(e) => setSelectedMethod('lo')}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500"
            />
            <div className="flex items-center space-x-3">
              <DocumentArrowUpIcon className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Local Order</p>
                <p className="text-sm text-gray-500">Upload your Local Order document</p>
              </div>
            </div>
          </label>

          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText={selectedMethod === 'fpx' ? "Processing payment..." : "Proceeding..."}
            className="w-full mt-6"
          >
            {selectedMethod === 'fpx' ? (
              <>
                <BanknotesIcon className="h-5 w-5 mr-2" />
                Proceed
              </>
            ) : (
              <>
                <DocumentArrowUpIcon className="h-5 w-5 mr-2" />
                Proceed
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}