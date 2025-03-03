import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // If we're already at /admin/login, render children to avoid infinite redirect
  if (location.pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not authenticated, redirect to admin login
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated but not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and admin, render children
  return <>{children}</>;
}