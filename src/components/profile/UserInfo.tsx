import React from 'react';
import { User } from '../../types';
import { Card } from '../ui/Card';

interface UserInfoProps {
  user: User;
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <Card>
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
          <span className="text-2xl text-gray-600">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
        <p className="text-gray-500 mt-1">{user.email}</p>
        <div className="mt-6 border-t pt-4">
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </Card>
  );
}