import React, { useState } from 'react';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { bookingService } from '../../services/booking.service';
import { formatDateTime } from '../../lib/utils';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScanResult {
  bookingId: string;
  eventId: string;
  timestamp: string;
}

export function QRScanner({ isOpen, onClose }: QRScannerProps) {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [booking, setBooking] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleScan = async (result: string) => {
    try {
      const data: ScanResult = JSON.parse(result);
      setScanResult(data);

      console.log('data', data);
      
      setIsLoading(true);
      const bookingData = await bookingService.getBooking(data.bookingId);
      setBooking(bookingData);
    } catch (error) {
      toast.error('Invalid QR code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error: any) => {
    toast.error('Failed to scan QR code');
    console.error('QR Scanner error:', error);
  };

  const handleClose = () => {
    setScanResult(null);
    setBooking(null);
    onClose();
  };

  const simulateScan = () => {
    const mockQRData = {
      bookingId: 'booking-1',
      eventId: '1',
      timestamp: new Date().toISOString()
    };
    handleScan(JSON.stringify(mockQRData));
  };

  const markAttendance = async (attendeeIndex: number) => {
    if (!booking) return;

    setIsUpdating(true);
    try {
      const currentAttendance = booking.attendeeInfo[attendeeIndex]?.attended || false;
      const updatedBooking = await bookingService.updateAttendance(
        booking.id,
        attendeeIndex,
        !currentAttendance
      );
      
      setBooking(updatedBooking);
      toast.success(
        !currentAttendance
          ? 'Attendance marked successfully'
          : 'Attendance unmarked'
      );
    } catch (error) {
      toast.error('Failed to update attendance');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Scan Ticket QR Code</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {!scanResult ? (
            <div className="space-y-6">
              <div className="aspect-square max-w-md mx-auto">
                <QrScanner
                  onDecode={handleScan}
                  onError={handleError}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="secondary"
                  onClick={simulateScan}
                >
                  Test Scan (Simulate)
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {isLoading ? (
                <div className="text-center py-8">Loading booking details...</div>
              ) : booking ? (
                <Card>
                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg">Booking Details</h3>
                      <p className="text-gray-600">Booking ID: {booking.id}</p>
                      <p className="text-gray-600">
                        Scanned at: {formatDateTime(scanResult.timestamp)}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium">Attendees:</h4>
                      {booking.attendeeInfo.map((attendee: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-4 rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{attendee.name}</p>
                              <p className="text-sm text-gray-600">{attendee.email}</p>
                              {attendee.phone && (
                                <p className="text-sm text-gray-600">{attendee.phone}</p>
                              )}
                              {attendee.attended && attendee.attendedAt && (
                                <p className="text-sm text-green-600 mt-1">
                                  Checked in at: {formatDateTime(attendee.attendedAt)}
                                </p>
                              )}
                            </div>
                            <Button
                              variant={attendee.attended ? "secondary" : "primary"}
                              size="sm"
                              onClick={() => markAttendance(index)}
                              disabled={isUpdating}
                              className={`flex items-center ${
                                attendee.attended ? 'bg-green-50 text-green-600 hover:bg-green-100' : ''
                              }`}
                            >
                              {attendee.attended ? (
                                <>
                                  <CheckCircleIcon className="h-4 w-4 mr-1" />
                                  Present
                                </>
                              ) : (
                                'Mark Present'
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setScanResult(null);
                          setBooking(null);
                        }}
                      >
                        Scan Another
                      </Button>
                      <Button onClick={handleClose}>
                        Close
                      </Button>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="text-center text-red-600">
                  Failed to load booking details
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}