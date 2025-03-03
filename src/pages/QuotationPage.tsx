import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { eventService } from '../services/event.service';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { formatDateTime, formatPrice } from '../lib/utils';
import { ArrowLeftIcon, XMarkIcon, HomeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface RecipientInfo {
  name: string;
  organization: string;
  address: string;
  city: string;
  postcode: string;
}

export function QuotationPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [recipientInfo, setRecipientInfo] = useState<RecipientInfo>({
    name: '',
    organization: '',
    address: '',
    city: '',
    postcode: ''
  });

  const attendees = location.state?.attendees || 1;

  const { data: event, isLoading, error } = useQuery(
    ['event', id],
    () => eventService.getEvent(id!),
    {
      enabled: !!id,
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRecipientInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowForm(false);
  };

  const generatePDF = async () => {
    if (!event) return;

    const quotationElement = document.getElementById('quotation');
    if (!quotationElement) return;

    setIsGenerating(true);
    try {
      const canvas = await html2canvas(quotationElement, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`quotation-${event.title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      setShowPopup(true);
    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load event details" />;
  if (!event) return <ErrorMessage message="Event not found" />;

  const subtotal = event.price * attendees;

  if (showForm) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="flex items-center"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recipient Information</h2>
            
            <Input
              label="Name"
              name="name"
              value={recipientInfo.name}
              onChange={handleInputChange}
              required
            />
            
            <Input
              label="Organization"
              name="organization"
              value={recipientInfo.organization}
              onChange={handleInputChange}
              required
            />
            
            <Input
              label="Address"
              name="address"
              value={recipientInfo.address}
              onChange={handleInputChange}
              required
            />
            
            <Input
              label="City"
              name="city"
              value={recipientInfo.city}
              onChange={handleInputChange}
              required
            />
            
            <Input
              label="Postcode"
              name="postcode"
              value={recipientInfo.postcode}
              onChange={handleInputChange}
              required
            />

            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit">
                Generate Quotation
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <Button
          variant="secondary"
          onClick={() => setShowForm(true)}
          className="flex items-center"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Edit Recipient Info
        </Button>
        <Button
          onClick={generatePDF}
          isLoading={isGenerating}
          loadingText="Generating PDF..."
        >
          Download PDF
        </Button>
      </div>

      <div id="quotation" className="bg-white p-8 shadow-lg">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-gray-500 text-base font-semibold">WhatTheFoo by Sifoo™</h1>
            <p className="text-gray-500 text-xs">www.sifoo.com/whatthefoo</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-orange-600 mb-2">QUOTATION</h2>
            <p className="text-sm">Date: {new Date().toLocaleDateString('en-MY')}</p>
            <p className="text-sm">No: QU-WTFOO-{new Date().toISOString().slice(0,10).replace(/-/g,'')}</p>
          </div>
        </div>

        {/* Company Info and Client Details */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-gray-700 text-sm font-semibold mb-1">WhatTheFoo Creative Solutions</h3>
            <p className="text-gray-600 text-xs">(002470524-A)</p>
            <p className="text-gray-600 text-xs">No. 5-2, Jalan Tasik Utama 6</p>
            <p className="text-gray-600 text-xs">Medan Niaga Tasik Damai</p>
            <p className="text-gray-600 text-xs">Sungai Besi</p>
            <p className="text-gray-600 text-xs">57000 Kuala Lumpur</p>
            <div className="mt-2 text-xs text-gray-600">
              <p>www.sifoo.com : web   contact@sifoo.com : email</p>
              <p>03-9055 4002 : phone   03-2726 8966 : fax</p>
            </div>
          </div>
          <div>
            <h3 className="text-gray-700 text-sm font-semibold mb-1">To:</h3>
            <p className="text-gray-600 text-xs">{recipientInfo.name}</p>
            <p className="text-gray-600 text-xs">{recipientInfo.organization}</p>
            <p className="text-gray-600 text-xs">{recipientInfo.address}</p>
            <p className="text-gray-600 text-xs">{recipientInfo.city}</p>
            <p className="text-gray-600 text-xs">{recipientInfo.postcode}</p>
          </div>
        </div>

        {/* Description Table */}
        <div className="mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-2 px-3 text-xs font-medium">Description</th>
                <th className="text-right py-2 px-3 text-xs font-medium">Quantity</th>
                <th className="text-right py-2 px-3 text-xs font-medium">Unit Price</th>
                <th className="text-right py-2 px-3 text-xs font-medium">Amount (RM)</th>
              </tr>
            </thead>
            <tbody className="divide-y text-xs">
              <tr>
                <td className="py-3 px-3">
                  <div className="space-y-1">
                    <p className="font-medium">Yuran penyertaan untuk kursus terbuka seperti berikut:</p>
                    <p>Tajuk: {event.title}</p>
                    <p>Tarikh: {formatDateTime(event.startTime)}</p>
                    <p>Masa: 9 pagi - 5 petang</p>
                    <p>Tempat: {event.location}</p>
                  </div>
                </td>
                <td className="py-3 px-3 text-right align-top">{attendees}</td>
                <td className="py-3 px-3 text-right align-top">{formatPrice(event.price)}</td>
                <td className="py-3 px-3 text-right align-top">{formatPrice(subtotal)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex flex-col items-end space-y-1 mb-8 text-xs">
          <div className="flex justify-between w-48 py-1">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between w-48 py-1">
            <span>Total No Tax 0%</span>
            <span>0.00</span>
          </div>
          <div className="flex justify-between w-48 py-1 font-semibold">
            <span>Total Due RM</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>

        {/* Terms */}
        <div className="text-xs">
          <h4 className="font-semibold text-gray-700 mb-2">Terms</h4>
          <p>Pembayaran secara TUNAI sahaja.</p>
          <p className="mt-3">This quotation is valid only for 30 days from date of issue.</p>
          <p className="mt-2">Payment has to be made to: <span className="font-medium">WHATTHEFOO CREATIVE SOLUTIONS (8602 342 734 / CIMB Berhad)</span></p>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quotation Downloaded Successfully!
              </h3>
              <p className="text-gray-600">
                What would you like to do next?
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/')}
                className="w-full flex items-center justify-center"
              >
                <HomeIcon className="h-5 w-5 mr-2" />
                Return to Homepage
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate(`/events/${id}`)}
                className="w-full flex items-center justify-center"
              >
                <ArrowRightIcon className="h-5 w-5 mr-2" />
                Continue to Event Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}