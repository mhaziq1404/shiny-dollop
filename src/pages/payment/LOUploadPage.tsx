import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LOUpload } from '../../components/payment/LOUpload';
import { Button } from '../../components/ui/Button';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export function LOUploadPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleUpload = async (file: File) => {
    // Handle file upload logic here
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
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
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Local Order Upload
      </h1>
      <LOUpload bookingId={id!} onUpload={handleUpload} />
    </div>
  );
}