import React from 'react';
import { ErrorPage } from '../../components/error/ErrorPage';

export function ForbiddenPage() {
  return (
    <ErrorPage
      type="forbidden"
      title="Access Denied"
      message="Sorry, you don't have permission to access this page. Please contact an administrator if you believe this is a mistake."
    />
  );
}