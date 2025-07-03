import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const AgencyAuthContext = createContext();
const EXPIRY_KEY = "agencyAuthTokenExpiry";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day in milliseconds

export const useAgencyAuth = () => {
  return useContext(AgencyAuthContext);
};

export const AgencyAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const logoutTimeoutRef = useRef(null);

  const logout = () => {
    sessionStorage.removeItem("agencyAuthToken");
    sessionStorage.removeItem(EXPIRY_KEY);
    setIsAuthenticated(false);

    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
    }

    console.log("Agency logged out due to expiry or tab close");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("agencyAuthToken");
    const expiry = sessionStorage.getItem(EXPIRY_KEY);

    if (token && expiry) {
      const expiryTime = Number(expiry);
      const now = Date.now();
      const isExpired = now > expiryTime;

      if (isExpired) {
        logout();
      } else {
        setIsAuthenticated(true);
        const remainingTime = expiryTime - now;

        logoutTimeoutRef.current = setTimeout(logout, remainingTime);

        console.log(
          `Agency session active. Auto logout in ${Math.round(remainingTime / 1000)} seconds`
        );
      }
    } else {
      setIsAuthenticated(false);
    }

    return () => {
      if (logoutTimeoutRef.current) {
        clearTimeout(logoutTimeoutRef.current);
      }
    };
  }, []);

  const login = (token) => {
    const expiryTime = Date.now() + EXPIRATION_TIME;
    sessionStorage.setItem("agencyAuthToken", token);
    sessionStorage.setItem(EXPIRY_KEY, expiryTime.toString());
    setIsAuthenticated(true);

    if (logoutTimeoutRef.current) {
      clearTimeout(logoutTimeoutRef.current);
    }

    logoutTimeoutRef.current = setTimeout(logout, EXPIRATION_TIME);

    console.log("Agency logged in. Auto logout in 1 day or on tab close");
  };

  if (isAuthenticated === null) return null;

  return (
    <AgencyAuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AgencyAuthContext.Provider>
  );
};
