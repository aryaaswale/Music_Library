import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import MainApp from '@/components/MainApp';

const Index = () => {
  const { isAuthenticated } = useAuth();

  // Show login form if not authenticated, otherwise show the main app
  return isAuthenticated ? <MainApp /> : <LoginForm />;
};

export default Index;
