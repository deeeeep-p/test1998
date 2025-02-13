import React, { createContext, useState, useContext } from "react";

// Create the context
const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const saveToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <TokenContext.Provider value={{ token, saveToken, clearToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook for using the context
export const useToken = () => {
  return useContext(TokenContext);
};
