import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const cardVariants = cva(
  "bg-white rounded-lg shadow-sm transition-shadow duration-200",
  {
    variants: {
      variant: {
        default: "hover:shadow-md",
        static: "",
        interactive: "hover:shadow-lg cursor-pointer",
        highlight: "border-2 border-orange-500",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md"
    }
  }
);

interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

export function Card({ 
  children, 
  className, 
  variant, 
  padding,
  ...props 
}: CardProps) {
  return (
    <div 
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    >
      {children}
    </div>
  );
}