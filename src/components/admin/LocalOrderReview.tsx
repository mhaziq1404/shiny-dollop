import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { formatDateTime } from '../../lib/utils';
import { toast } from 'react-hot-toast';
import { DocumentIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface LocalOrder {
  id: string;
  bookingId: string;
  eventId: string;
  fileName: string;
  uploadedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  fileUrl: string;
  eventTitle: string;
  attendees: number;
}

export function LocalOrderReview() {
  const [selectedFile, setSelectedFile] = useState<LocalOrder | null>(null);
  const queryClient = useQueryClient();

  const { data: localOrders = [], isLoading } = useQuery(
    ['localOrders'],
    async () => {
      // Mock data - replace with actual API call
      return [
        {
          id: 'lo-1',
          bookingId: 'booking-1',
          eventId: '1',
          fileName: 'LO-123456.pdf',
          uploadedAt: new Date().toISOString(),
          status: 'pending',
          fileUrl: '#',
          eventTitle: 'Adobe Illustrator Zero',
          attendees: 2
        },
        {
          id: 'lo-2',
          bookingId: 'booking-2',
          eventId: '2',
          fileName: 'LO-789012.pdf',
          uploadedAt: new Date().toISOString(),
          status: 'pending',
          fileUrl: '#',
          eventTitle: 'Adobe InDesign Workshop',
          attendees: 1
        }
      ] as LocalOrder[];
    }
  );

  const approveMutation = useMutation(
    async (id: string) => {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      return id;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['localOrders']);
        toast.success('Local Order approved successfully');
        setSelectedFile(null);
      }
    }
  );

  const rejectMutation = useMutation(
    async (id: string) => {
      // Mock API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      return id;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['localOrders']);
        toast.success('Local Order rejected');
        setSelectedFile(null);
      }
    }
  );

  const pendingOrders = localOrders.filter(order => order.status === 'pending');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Pending Local Orders</h2>
      
      {pendingOrders.length === 0 ? (
        <Card>
          <div className="p-6 text-center text-gray-500">
            No pending Local Orders to review
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <Card key={order.id} className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <DocumentIcon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{order.eventTitle}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded: {formatDateTime(order.uploadedAt)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Attendees: {order.attendees}
                    </p>
                    <p className="text-sm text-gray-500">
                      File: {order.fileName}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(order.fileUrl, '_blank')}
                  >
                    View File
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => approveMutation.mutate(order.id)}
                    isLoading={approveMutation.isLoading}
                  >
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => rejectMutation.mutate(order.id)}
                    isLoading={rejectMutation.isLoading}
                  >
                    <XMarkIcon className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}