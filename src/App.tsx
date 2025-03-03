import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './components/auth/RequireAuth';
import { AdminRoute } from './components/admin/AdminRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { EventPage } from './pages/EventPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ProfilePage } from './pages/ProfilePage';
import { TicketPage } from './pages/TicketPage';
import { AttendeeInfoPage } from './pages/AttendeeInfoPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { QuotationPage } from './pages/QuotationPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminPastEventsPage } from './pages/admin/AdminPastEventsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { CreateEventPage } from './pages/admin/CreateEventPage';
import { EditEventPage } from './pages/admin/EditEventPage';
import { LOUploadPage } from './pages/payment/LOUploadPage';
import { FPXPaymentPage } from './pages/payment/FPXPaymentPage';
import { FPXResponsePage } from './pages/payment/FPXResponsePage';
import { Navigation } from './components/Navigation';
import { queryClient } from './lib/queryClient';
import { NotFoundPage } from './pages/error/NotFoundPage';
import { ForbiddenPage } from './pages/error/ForbiddenPage';
import { ServerErrorPage } from './pages/error/ServerErrorPage';

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gray-100 font-poppins">
            <Navigation />
            <main>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/events/:id" element={<EventPage />} />
                <Route path="/quotation/:id" element={<QuotationPage />} />

                {/* Protected routes */}
                <Route
                  path="/attendees/:id"
                  element={
                    <RequireAuth>
                      <AttendeeInfoPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/checkout/:id"
                  element={
                    <RequireAuth>
                      <CheckoutPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/payment/upload/:id"
                  element={
                    <RequireAuth>
                      <LOUploadPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/payment/fpx"
                  element={
                    <RequireAuth>
                      <FPXPaymentPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/payment/fpx/response"
                  element={
                    <RequireAuth>
                      <FPXResponsePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/confirmation"
                  element={
                    <RequireAuth>
                      <ConfirmationPage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <ProfilePage />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/tickets/:id"
                  element={
                    <RequireAuth>
                      <TicketPage />
                    </RequireAuth>
                  }
                />

                {/* Admin routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route
                  path="/admin"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboardPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/analytics"
                  element={
                    <AdminRoute>
                      <AdminAnalyticsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <AdminRoute>
                      <AdminSettingsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/past-events"
                  element={
                    <AdminRoute>
                      <AdminPastEventsPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/events/new"
                  element={
                    <AdminRoute>
                      <CreateEventPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/events/edit/:id"
                  element={
                    <AdminRoute>
                      <EditEventPage />
                    </AdminRoute>
                  }
                />

                {/* Error routes */}
                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="/500" element={<ServerErrorPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
          </div>
          <Toaster position="top-right" />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}