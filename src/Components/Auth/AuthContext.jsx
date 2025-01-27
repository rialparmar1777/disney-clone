import React, { createContext, useContext, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage the logged-in user state

  const login = (userData) => {
    setUser(userData); // Set the logged-in user
    localStorage.setItem("user", JSON.stringify(userData)); // Save to local storage (optional)
  };

  const logout = () => {
    setUser(null); // Clear user state
    localStorage.removeItem("user"); // Remove from local storage (optional)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing AuthContext
export const useAuth = () => useContext(AuthContext);
