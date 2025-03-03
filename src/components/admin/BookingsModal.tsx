import React, { useState, useMemo } from 'react';
import { Booking } from '../../types';
import { formatDateTime } from '../../lib/utils';
import { XMarkIcon, MagnifyingGlassIcon, PencilIcon, PrinterIcon } from '@heroicons/react/24/outline';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { toast } from 'react-hot-toast';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface BookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  eventTitle: string;
  onUpdateBooking: (bookingId: string, updatedBooking: Booking) => Promise<void>;
}

interface AttendeeInfo {
  name: string;
  email: string;
  phone?: string;
  attended?: boolean;
}

export function BookingsModal({ isOpen, onClose, bookings, eventTitle, onUpdateBooking }: BookingsModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [attendeeInfo, setAttendeeInfo] = useState<AttendeeInfo[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const filteredBookings = useMemo(() => {
    if (!searchQuery.trim()) return bookings;

    const query = searchQuery.toLowerCase();
    return bookings.filter((booking) => {
      if (booking.id.toLowerCase().includes(query)) return true;
      return booking.attendeeInfo.some(
        (attendee) =>
          attendee.name.toLowerCase().includes(query) ||
          attendee.email.toLowerCase().includes(query) ||
          attendee.phone?.toLowerCase().includes(query)
      );
    });
  }, [bookings, searchQuery]);

  const handleEdit = (booking: Booking) => {
    setEditingBooking(booking);
    setAttendeeInfo([...booking.attendeeInfo]);
  };

  const handleAttendeeChange = (index: number, field: keyof AttendeeInfo, value: string | boolean) => {
    const newAttendeeInfo = [...attendeeInfo];
    newAttendeeInfo[index] = { ...newAttendeeInfo[index], [field]: value };
    setAttendeeInfo(newAttendeeInfo);
  };

  const handleAttendanceChange = async (booking: Booking, attendeeIndex: number) => {
    try {
      const updatedAttendeeInfo = [...booking.attendeeInfo];
      updatedAttendeeInfo[attendeeIndex] = {
        ...updatedAttendeeInfo[attendeeIndex],
        attended: !updatedAttendeeInfo[attendeeIndex].attended
      };

      const updatedBooking = {
        ...booking,
        attendeeInfo: updatedAttendeeInfo
      };

      await onUpdateBooking(booking.id, updatedBooking);
      toast.success('Attendance updated successfully');
    } catch (error) {
      toast.error('Failed to update attendance');
    }
  };

  const handleSave = async () => {
    if (!editingBooking) return;

    try {
      setIsSubmitting(true);
      const updatedBooking = {
        ...editingBooking,
        attendeeInfo,
        attendees: attendeeInfo.length
      };
      await onUpdateBooking(editingBooking.id, updatedBooking);
      setEditingBooking(null);
      toast.success('Attendee information updated successfully');
    } catch (error) {
      toast.error('Failed to update attendee information');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = async () => {
    try {
      setIsPrinting(true);
      const tableElement = document.getElementById('attendees-table');
      if (!tableElement) return;

      const printTable = tableElement.cloneNode(true) as HTMLElement;
      printTable.style.width = '100%';
      const tempDiv = document.createElement('div');
      tempDiv.appendChild(printTable);
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(printTable, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      document.body.removeChild(tempDiv);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });

      pdf.setFontSize(16);
      pdf.text(`Attendees List - ${eventTitle}`, 14, 15);
      pdf.setFontSize(10);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 14, 30, pdfWidth - 28, pdfHeight - 40);

      pdf.save(`attendees-list-${eventTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      toast.success('PDF generated successfully');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setIsPrinting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        <div className="p-6 border-b flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Attendees for {eventTitle}
            </h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handlePrint}
                isLoading={isPrinting}
                loadingText="Generating..."
                disabled={filteredBookings.length === 0}
              >
                <PrinterIcon className="h-4 w-4 mr-2" />
                Print as PDF
              </Button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {!editingBooking && (
            <div className="relative">
              <Input
                type="text"
                placeholder="Search by name, email, or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-hidden p-6">
          {editingBooking ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Edit Attendees</h3>
                <div className="space-x-2">
                  <Button
                    variant="secondary"
                    onClick={() => setEditingBooking(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    isLoading={isSubmitting}
                    loadingText="Saving..."
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 overflow-y-auto max-h-[calc(90vh-300px)]">
                {attendeeInfo.map((attendee, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <Input
                      label={`Attendee ${index + 1} Name`}
                      value={attendee.name}
                      onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={attendee.email}
                      onChange={(e) => handleAttendeeChange(index, 'email', e.target.value)}
                      required
                    />
                    <Input
                      label="Phone (optional)"
                      type="tel"
                      value={attendee.phone || ''}
                      onChange={(e) => handleAttendeeChange(index, 'phone', e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {filteredBookings.length === 0 ? (
                <p className="text-gray-500 text-center">
                  {searchQuery ? 'No bookings found matching your search' : 'No bookings found'}
                </p>
              ) : (
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
                  <table id="attendees-table" className="w-full">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[80px]">
                          Attendance
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[120px]">
                          Booking ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[180px]">
                          Booking Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Attendee Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-[100px]">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBookings.map((booking) => (
                        booking.attendeeInfo.map((attendee, attendeeIndex) => (
                          <tr key={`${booking.id}-${attendeeIndex}`}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={attendee.attended || false}
                                onChange={() => handleAttendanceChange(booking, attendeeIndex)}
                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded cursor-pointer"
                              />
                            </td>
                            {attendeeIndex === 0 && (
                              <>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900" rowSpan={booking.attendeeInfo.length}>
                                  {booking.id}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500" rowSpan={booking.attendeeInfo.length}>
                                  {formatDateTime(booking.createdAt)}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap" rowSpan={booking.attendeeInfo.length}>
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    booking.status === 'confirmed' 
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {booking.status}
                                  </span>
                                </td>
                              </>
                            )}
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                              {attendee.name}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {attendee.email}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {attendee.phone || '-'}
                            </td>
                            {attendeeIndex === 0 && (
                              <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium" rowSpan={booking.attendeeInfo.length}>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  onClick={() => handleEdit(booking)}
                                >
                                  <PencilIcon className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                              </td>
                            )}
                          </tr>
                        ))
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}