import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/ui/Button';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome Home</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-lg text-center">
        You have successfully authenticated. This is a generic home page to demonstrate routing.
      </p>
      <Button onClick={() => navigate('/login')}>
        Log out
      </Button>
    </div>
  );
};
