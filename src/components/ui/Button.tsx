import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { LoadingSpinner } from './LoadingSpinner';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-[#ff4200] text-white hover:bg-primary-dark focus:ring-[#ff4200]",
        secondary: "bg-white text-[#ff4200] border border-[#ff4200] hover:bg-[#ff4200]/10 focus:ring-[#ff4200]",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
}

export function Button({
  className,
  variant,
  size,
  isLoading,
  loadingText,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner className="h-4 w-4 border-white" />
          {loadingText && <span className="ml-2">{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </button>
  );
}