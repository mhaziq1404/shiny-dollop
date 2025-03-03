import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-orange-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          className={`block w-full px-4 py-2 rounded-md border 
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-orange-500'} 
            focus:border-transparent focus:outline-none focus:ring-2
            placeholder:text-gray-400 text-gray-900
            disabled:bg-gray-50 disabled:text-gray-500
            ${className}`}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';