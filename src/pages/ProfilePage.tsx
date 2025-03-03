import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { UpcomingEvents } from '../components/profile/UpcomingEvents';
import { UserInfo } from '../components/profile/UserInfo';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { userService } from '../services/api';

export function ProfilePage() {
  const { data: user, isLoading, error } = useQuery(['user'], userService.getCurrentUser);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <ErrorMessage message="Failed to load profile" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <UserInfo user={user} />
        </div>
        <div className="lg:col-span-2">
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}