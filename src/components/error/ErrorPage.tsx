import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import {
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  ServerStackIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';

interface ErrorPageProps {
  title: string;
  message: string;
  type?: 'notFound' | 'forbidden' | 'server' | 'general';
  actionText?: string;
  actionPath?: string;
}

export function ErrorPage({ 
  title, 
  message, 
  type = 'general',
  actionText = 'Go Back Home',
  actionPath = '/'
}: ErrorPageProps) {
  const navigate = useNavigate();

  const icons = {
    notFound: QuestionMarkCircleIcon,
    forbidden: ShieldExclamationIcon,
    server: ServerStackIcon,
    general: ExclamationTriangleIcon
  };

  const colors = {
    notFound: 'text-blue-500',
    forbidden: 'text-red-500',
    server: 'text-orange-500',
    general: 'text-yellow-500'
  };

  const Icon = icons[type];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Icon className={`h-24 w-24 ${colors[type]}`} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {message}
        </p>
        <Button onClick={() => navigate(actionPath)}>
          {actionText}
        </Button>
      </div>
    </div>
  );
}