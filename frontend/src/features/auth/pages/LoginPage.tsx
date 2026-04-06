import React from 'react';
import { AuthLayout } from '../../../layouts/AuthLayout';
import { LoginForm } from '../components/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout heading="Sign In">
      <LoginForm />
    </AuthLayout>
  );
};
