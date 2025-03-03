import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar } from '../../components/admin/Sidebar';
import { BookingsChart } from '../../components/admin/analytics/BookingsChart';
import { CategoryDistribution } from '../../components/admin/analytics/CategoryDistribution';
import { RevenueChart } from '../../components/admin/analytics/RevenueChart';
import { AttendeeChart } from '../../components/admin/analytics/AttendeeChart';
import { InstructorEventsChart } from '../../components/admin/analytics/InstructorEventsChart';
import { Card } from '../../components/ui/Card';
import { mockAnalytics } from '../../mocks/analytics.mock';

export function AdminAnalyticsPage() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar onLogout={logout} />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="p-4">
                <RevenueChart data={mockAnalytics.revenue} />
              </div>
            </Card>
            <Card>
              <div className="p-4">
                <BookingsChart data={mockAnalytics.bookings} />
              </div>
            </Card>
            <Card>
              <div className="p-4">
                <AttendeeChart data={mockAnalytics.attendees} />
              </div>
            </Card>
            <Card>
              <div className="p-4">
                <CategoryDistribution data={mockAnalytics.categories} />
              </div>
            </Card>
            <Card className="md:col-span-2">
              <div className="p-4">
                <InstructorEventsChart data={mockAnalytics.instructors} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}