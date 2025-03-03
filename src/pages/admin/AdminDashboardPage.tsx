import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { EventList } from '../../components/admin/EventList';
import { LocalOrderReview } from '../../components/admin/LocalOrderReview';
import { QRScanner } from '../../components/admin/QRScanner';
import { Button } from '../../components/ui/Button';
import { Sidebar } from '../../components/admin/Sidebar';
import { QrCodeIcon } from '@heroicons/react/24/outline';

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showScanner, setShowScanner] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <Sidebar onLogout={logout} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={() => setShowScanner(true)}
              >
                <QrCodeIcon className="h-5 w-5 mr-2" />
                Scan Ticket
              </Button>
              <Button
                onClick={() => navigate('/admin/events/new')}
                variant="primary"
              >
                Add New Event
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <LocalOrderReview />
            <EventList />
          </div>
        </div>
      </div>

      <QRScanner 
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
      />
    </div>
  );
}