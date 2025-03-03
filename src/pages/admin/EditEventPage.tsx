import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import { EventForm } from '../../components/admin/EventForm';
import { eventService } from '../../services/event.service';
import { toast } from 'react-hot-toast';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';

export function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const { data: event, isLoading, error } = useQuery(
    ['event', id],
    () => eventService.getEvent(id!),
    {
      enabled: !!id,
    }
  );

  // Format dates and ensure all required fields are included
  const formatEventData = (eventData: any) => {
    if (!eventData) return null;
    
    const formatDateForInput = (dateString: string) => {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm
    };

    return {
      ...eventData,
      startTime: formatDateForInput(eventData.startTime),
      endTime: formatDateForInput(eventData.endTime),
      instructor: eventData.instructor, // Keep the original instructor value
      requirements: eventData.requirements || [],
      activities: eventData.activities || [],
      category: eventData.category || '',
      imageUrl: eventData.imageUrl || ''
    };
  };

  // Use location state if available, otherwise use formatted event data
  const initialData = location.state?.initialData || formatEventData(event);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load event" />;
  if (!initialData) return <ErrorMessage message="Event not found" />;

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Ensure all fields are included in the update
      const updateData = {
        ...data,
        instructor: data.instructor,
        category: data.category,
        requirements: data.requirements || [],
        activities: data.activities || []
      };
      
      await eventService.updateEvent(id!, updateData);
      toast.success('Event updated successfully');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Failed to update event');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Event</h1>
      <EventForm 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
        initialData={initialData}
      />
    </div>
  );
}