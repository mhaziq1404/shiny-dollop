import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { EventForm } from '../../components/admin/EventForm';
// import { eventService } from '../../services/api';
import { eventService } from '../../services/event.service';
import { toast } from 'react-hot-toast';

export function CreateEventPage() {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // if (!isAdmin) {
  //   // toast.error('Access denied. Admins only.');
  //   navigate('/admin/login', { replace: true });
  //   return null;
  // }

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await eventService.createEvent(data);
      toast.success('Event created successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to create event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
      <EventForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}