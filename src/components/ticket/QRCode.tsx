import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card } from '../ui/Card';

interface QRCodeProps {
  bookingId: string;
  eventId: string;
}

export function TicketQRCode({ bookingId, eventId }: QRCodeProps) {
  const qrData = JSON.stringify({
    bookingId,
    eventId,
    timestamp: new Date().toISOString(),
  });

  return (
    <Card className="p-4 flex flex-col items-center">
      <div className="mb-4">
        <QRCodeSVG
          value={qrData}
          size={200}
          level="H"
          includeMargin
          imageSettings={{
            src: "/vite.svg",
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
      </div>
      <p className="text-sm text-gray-500 text-center">
        Scan this QR code at the venue
      </p>
      <p className="text-xs text-gray-400 mt-1">
        Booking ID: {bookingId}
      </p>
    </Card>
  );
}