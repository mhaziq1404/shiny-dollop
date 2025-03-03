import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, children, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          ref={ref}
          className={`block w-full px-3 py-2 rounded-md border 
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'} 
            focus:border-transparent focus:outline-none focus:ring-2
            bg-white text-gray-900
            disabled:bg-gray-50 disabled:text-gray-500
            ${className}`}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';