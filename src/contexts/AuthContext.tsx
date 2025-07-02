import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType, JWTPayload } from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - as required in assignment
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@musicverse.com',
    password: 'admin123',
    role: 'admin' as const,
    name: 'Admin User'
  },
  {
    id: '2',
    email: 'user@musicverse.com',
    password: 'user123',
    role: 'user' as const,
    name: 'Regular User'
  }
];

// Mock JWT functions - simple in-memory approach as requested
const createMockJWT = (user: Omit<User, 'id'> & { id: string }): string => {
  const payload: JWTPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  
  // In real app, this would be properly signed
  return btoa(JSON.stringify(payload));
};

const verifyMockJWT = (token: string): JWTPayload | null => {
  try {
    const payload = JSON.parse(atob(token)) as JWTPayload;
    
    if (payload.exp < Date.now()) {
      return null; // Token expired
    }
    
    return payload;
  } catch {
    return null;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('music_auth_token');
    if (token) {
      const payload = verifyMockJWT(token);
      if (payload) {
        setUser({
          id: payload.id,
          email: payload.email,
          role: payload.role,
          name: payload.name
        });
      } else {
        localStorage.removeItem('music_auth_token');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const mockUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );

    if (mockUser) {
      const token = createMockJWT(mockUser);
      localStorage.setItem('music_auth_token', token);
      
      setUser({
        id: mockUser.id,
        email: mockUser.email,
        role: mockUser.role,
        name: mockUser.name
      });
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('music_auth_token');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};