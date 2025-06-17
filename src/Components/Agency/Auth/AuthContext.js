import React, { createContext, useContext, useState, useEffect } from "react";

const AgencyAuthContext = createContext();

export const useAgencyAuth = () => {
  return useContext(AgencyAuthContext);
};

export const AgencyAuthProvider = ({ children }) => {
  // ✅ Changed name here
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("agencyAuthToken"); // ✅ Use separate token key
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem("agencyAuthToken", token); // ✅ Use separate token key
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("agencyAuthToken"); // ✅ Use separate token key
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return null; // You can show a loader here instead
  }

  return (
    <AgencyAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AgencyAuthContext.Provider>
  );
};
