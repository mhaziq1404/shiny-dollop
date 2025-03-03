import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline';

interface LOUploadProps {
  bookingId: string;
  onUpload: (file: File) => Promise<void>;
}

export function LOUpload({ bookingId, onUpload }: LOUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    try {
      await onUpload(file);
      navigate('/confirmation');
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="text-xl font-semibold mb-6">Upload Local Order</h2>
        
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
              <div className="mt-4 text-center">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-indigo-600 hover:text-indigo-500">
                    Upload a file
                  </span>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  PDF, DOC up to 10MB
                </p>
              </div>
            </div>
          </div>

          {file && (
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-600">
                Selected file: {file.name}
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={!file || isUploading}
            isLoading={isUploading}
            loadingText="Uploading..."
            className="w-full"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
}