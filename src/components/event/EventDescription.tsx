import React from 'react';

interface EventDescriptionProps {
  description: string;
}

export function EventDescription({ description }: EventDescriptionProps) {
  return (
    <div className="prose max-w-none">
      <div 
        className="text-gray-600 break-words"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}