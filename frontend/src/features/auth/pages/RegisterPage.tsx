import React from 'react';
import { AuthLayout } from '../../../layouts/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout heading="Sign Up">
      <RegisterForm />
    </AuthLayout>
  );
};
