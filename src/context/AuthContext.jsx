import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const  [isLoggedIn, setIsLoggedIn ]=useState(false)
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isLoggedIn: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    try {
        if (storedUser && typeof storedUser === 'string') {
          const parsedUser = JSON.parse(storedUser);
          setAuth({
            user: parsedUser,
            token: storedToken,
            isLoggedIn: true,
          });
        }
      } catch (error) {
        console.error('Failed to parse user data from localStorage:', error);
       
        setAuth({
          user: null,
          token: null,
          isLoggedIn: false,
        });
      }
    }, []);
  const login = (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    setAuth({ user, token, isLoggedIn: true });
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setAuth({ user: null, token: null, isLoggedIn: false });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout,isLoggedIn,setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
