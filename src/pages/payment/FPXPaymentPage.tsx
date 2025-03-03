import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';

export function FPXPaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { html } = location.state || {};

  const sanitizeHtmlString = (htmlString) => {
    return htmlString
      .trim()
      .replace(/^"/, "")
      .replace(/"$/, "")
      .replace(/\\r\\n/g, "\n")
      .replace(/\\"/g, '"');
  };

  const sanitizedHtml = sanitizeHtmlString(html);

  useEffect(() => {
    if (!sanitizedHtml) {
      navigate('/');
      return;
    }

    // Write the HTML content to the document
    document.open();
    document.write(sanitizedHtml);
    document.close();

    // Handle browser back button
    window.onpopstate = function() {
      window.location.reload();
    };

    // Cleanup
    return () => {
      window.onpopstate = null;
    };
  }, [sanitizedHtml, navigate]);

  if (!sanitizedHtml) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <div className="p-6 text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">Redirecting to payment page...</p>
          </div>
        </Card>
      </div>
    );
  }

  return null; // The content will be written directly to the document
}