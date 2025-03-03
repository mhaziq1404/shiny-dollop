import React from 'react';
import { EventRequirement } from '../../types';
import { ExclamationCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface EventRequirementsProps {
  requirements: EventRequirement[];
}

export function EventRequirements({ requirements }: EventRequirementsProps) {
  const requiredItems = requirements.filter(req => req.type === 'required');
  const recommendedItems = requirements.filter(req => req.type === 'recommended');

  if (!requirements.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
      
      {requiredItems.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Required</h4>
          <ul className="space-y-2">
            {requiredItems.map((req, index) => (
              <li key={`required-${req.id || index}`} className="flex items-start space-x-2">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{req.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendedItems.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Recommended</h4>
          <ul className="space-y-2">
            {recommendedItems.map((req, index) => (
              <li key={`recommended-${req.id || index}`} className="flex items-start space-x-2">
                <InformationCircleIcon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">{req.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}