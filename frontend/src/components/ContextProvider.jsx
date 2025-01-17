import React, { createContext, useContext, useState } from 'react';

// Step 1: Create the context
const ScrollContext = createContext();

// Step 2: Create a provider component
export const ScrollProvider = ({ children }) => {
  const [issScrolled, setIsScrolled] = useState(false); // Global state

  return (
    <ScrollContext.Provider value={{ issScrolled, setIsScrolled }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Step 3: Create a custom hook for easier access to the context
export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollProvider');
  }
  return context;
};
