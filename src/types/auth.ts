export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface JWTPayload {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name: string;
  exp: number;
}