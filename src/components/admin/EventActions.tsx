import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { CancelEventModal } from './CancelEventModal';
import { toast } from 'react-hot-toast';

interface EventActionsProps {
  eventId: string;
  eventTitle: string;
  onCancel: (id: string, reason: string) => Promise<void>;
  isCancelling: boolean;
}

export function EventActions({ eventId, eventTitle, onCancel, isCancelling }: EventActionsProps) {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancel = async (reason: string) => {
    try {
      await onCancel(eventId, reason);
      setShowCancelModal(false);
      toast.success('Event cancelled successfully');
    } catch (error) {
      toast.error('Failed to cancel event');
    }
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button
          variant="secondary"
          onClick={() => navigate(`/admin/events/edit/${eventId}`)}
        >
          Edit
        </Button>
        <Button
          variant="secondary"
          onClick={() => setShowCancelModal(true)}
        >
          Cancel Event
        </Button>
      </div>

      <CancelEventModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancel}
        eventTitle={eventTitle}
        isLoading={isCancelling}
      />
    </>
  );
}