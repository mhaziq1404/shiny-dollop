import React from 'react';

interface EventImageProps {
  imageUrl: string;
  title: string;
}

export function EventImage({ imageUrl, title }: EventImageProps) {
  return (
    <div className="relative h-64 -mx-6 -mt-6 mb-8 overflow-hidden rounded-t-lg">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}