import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="text-center p-4 text-red-600 bg-red-50 rounded-md">
      {message}
    </div>
  );
}