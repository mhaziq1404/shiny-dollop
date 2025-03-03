import React from 'react';
import { ErrorPage } from '../../components/error/ErrorPage';

export function NotFoundPage() {
  return (
    <ErrorPage
      type="notFound"
      title="Page Not Found"
      message="Sorry, we couldn't find the page you're looking for. Please check the URL or navigate back home."
    />
  );
}