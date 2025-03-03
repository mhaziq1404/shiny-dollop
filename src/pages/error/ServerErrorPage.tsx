import React from 'react';
import { ErrorPage } from '../../components/error/ErrorPage';

export function ServerErrorPage() {
  return (
    <ErrorPage
      type="server"
      title="Server Error"
      message="Sorry, something went wrong on our end. Please try again later or contact support if the problem persists."
      actionText="Try Again"
      actionPath={window.location.pathname}
    />
  );
}