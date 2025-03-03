import React from 'react';
import { Card } from '../../ui/Card';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface PreviewCardProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function PreviewCard({ title, onClose, children }: PreviewCardProps) {
  return (
    <Card variant="static" className="relative border border-orange-200 bg-orange-50/50">
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <span className="text-sm text-orange-600 font-medium">Preview Mode</span>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <div className="bg-white rounded-lg p-6 shadow-sm">
          {children}
        </div>
      </div>
    </Card>
  );
}