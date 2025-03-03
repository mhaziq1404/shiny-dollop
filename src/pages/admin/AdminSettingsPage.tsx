import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Sidebar } from '../../components/admin/Sidebar';
import { LocationPresets } from '../../components/admin/presets/LocationPresets';
import { InstructorPresets } from '../../components/admin/presets/InstructorPresets';

export function AdminSettingsPage() {
  const { logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar onLogout={logout} />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
          
          <div className="space-y-6">
            <LocationPresets />
            <InstructorPresets />
          </div>
        </div>
      </div>
    </div>
  );
}