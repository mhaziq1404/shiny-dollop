import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../lib/utils';
import {
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
    { name: 'Past Events', href: '/admin/past-events', icon: ClockIcon },
    { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="flex flex-col h-full bg-white border-r">
      {/* Logo Section */}
      <div className="p-6 border-b">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">EventSifoo</span>
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="bg-primary-lighter/20 p-2 rounded-full">
            <UserIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{user?.name}</div>
            <div className="text-sm text-gray-light">{user?.email}</div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-lighter/10 text-primary'
                  : 'text-gray hover:bg-gray-50'
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
}