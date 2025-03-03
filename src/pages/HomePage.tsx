import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/event.service';
import { FeaturedEvent } from '../components/home/FeaturedEvent';
import { EventGrid } from '../components/home/EventGrid';
import { CategoryFilter } from '../components/home/CategoryFilter';
import { UpcomingEventsSection } from '../components/home/UpcomingEventsSection';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Card } from '../components/ui/Card';

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const navigate = useNavigate();
  const { loginWithEmail } = useAuth();
  
  const { data: events, isLoading, error } = useQuery(
    ['events'],
    () => eventService.getEvents()
  );

  const categories = useMemo(() => {
    if (!events) return [];
    return Array.from(new Set(events.map(event => event.category)));
  }, [events]);

  const filteredEvents = useMemo(() => {
    if (!events) return [];
    if (!selectedCategory) return events;
    return events.filter(event => event.category === selectedCategory);
  }, [events, selectedCategory]);

  const featuredEvent = useMemo(() => {
    if (!events?.length) return null;
    return events[0];
  }, [events]);

  // Handle messages from LW iframe
  useEffect(() => {
    const allowedOrigins = ['https://www.sifoo.com']; // Update with your trusted origins

    const handleMessage = async (event: MessageEvent) => {
      // Verify origin
      if (!allowedOrigins.includes(event.origin)) {
        console.warn('Received message from untrusted origin:', event.origin);
        return;
      }

      try {
        const email = event.data.data;
        console.log('Received email:', email);
        if (typeof email !== 'string' || !email.includes('@')) {
          throw new Error('Invalid email format');
        }

        await loginWithEmail(email);
        toast.success('Welcome back!');
        navigate("/", { replace: true });

        // Send confirmation back to parent
        if (event.source && 'postMessage' in event.source) {
          (event.source as Window).postMessage({ 
            type: 'AUTH_SUCCESS',
            message: 'Authentication successful'
          }, event.origin);
        }
      } catch (error) {
        toast.error('Authentication failed');

        // Send error back to parent
        if (event.source && 'postMessage' in event.source) {
          (event.source as Window).postMessage({ 
            type: 'AUTH_ERROR',
            message: 'Authentication failed'
          }, event.origin);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [loginWithEmail, navigate]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load events" />;

  if (!events?.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center py-12">
          <div className="max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Events Available
            </h2>
            <p className="text-gray-600">
              There are currently no events scheduled. Please check back later for upcoming events.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {featuredEvent && (
        <div className="mb-12">
          <FeaturedEvent event={featuredEvent} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Browse Events
            </h2>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              events={filteredEvents}
              selectedMonth={selectedMonth}
              onMonthSelect={setSelectedMonth}
            />
          </div>
          <EventGrid 
            events={filteredEvents} 
            excludeId={featuredEvent?.id}
            selectedMonth={selectedMonth}
          />
        </div>
        
        <div className="lg:sticky lg:top-8">
          <UpcomingEventsSection />
        </div>
      </div>
    </div>
  );
}