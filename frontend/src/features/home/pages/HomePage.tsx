import React from 'react';
import { Button } from '../../../shared/ui/Button';
import { authService } from '../../auth/services/authService';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome Home</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-lg text-center">
        You have successfully authenticated. This is a generic home page to demonstrate routing.
      </p>
      <Button onClick={() => authService.logout()}>
        Log out
      </Button>
    </div>
  );
};
