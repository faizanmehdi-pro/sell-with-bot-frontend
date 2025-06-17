import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => { // ✅ Changed name here
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminAuthToken'); // ✅ Use separate token key
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem('adminAuthToken', token); // ✅ Use separate token key
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('adminAuthToken'); // ✅ Use separate token key
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return null; // You can show a loader here instead
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
