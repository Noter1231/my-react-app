import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Kiểm tra xem có user trong localStorage không khi component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      // Giả lập API call
      if (username === 'admin' && password === '1') {
        const userData = {
          id: '1',
          name: 'Admin',
          role: 'admin' as const,
          token: 'dummy-token-' + Date.now(),
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return Promise.resolve();
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

