
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication in localStorage
    const auth = localStorage.getItem('litvi-admin-auth');
    setIsAuthenticated(auth === 'true');
    setIsLoading(false);
  }, []);

  const login = () => {
    localStorage.setItem('litvi-admin-auth', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('litvi-admin-auth');
    setIsAuthenticated(false);
    navigate('/');
  };

  return { isAuthenticated, isLoading, login, logout };
};
