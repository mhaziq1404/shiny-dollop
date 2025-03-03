import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/20/solid';

const steps = [
  { id: 'event', name: 'Event Details' },
  { id: 'attendees', name: 'Attendee Info' },
  { id: 'checkout', name: 'Payment' },
  { id: 'confirmation', name: 'Confirmation' }
];

export function BookingBreadcrumb() {
  const location = useLocation();
  
  const getCurrentStep = () => {
    if (location.pathname.includes('/events/')) return 0;
    if (location.pathname.includes('/attendees/')) return 1;
    if (location.pathname.includes('/checkout/')) return 2;
    if (location.pathname.includes('/confirmation')) return 3;
    return 0;
  };

  const currentStep = getCurrentStep();

  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={`${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}
          >
            {stepIdx < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-orange-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-orange-600">
                  <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
              </>
            ) : stepIdx === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange-600 bg-white">
                  <span className="text-orange-600 text-sm font-medium">{stepIdx + 1}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span className="text-gray-500 text-sm font-medium">{stepIdx + 1}</span>
                </div>
              </>
            )}
            <span className="absolute left-0 top-full mt-2 text-sm font-medium text-gray-500">
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}