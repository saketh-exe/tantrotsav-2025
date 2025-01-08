// RoleContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRoleState] = useState(null);

  const setRole = (newRole) => {
    setRoleState(newRole);
  };

  const logout = () => {
    setRoleState(null);
    Cookies.remove('auth_token'); // Remove cookie on logout
  };

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch('/api/auth/validate', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        const data = await response.json();
        setRoleState(data.role);
      } catch {
        setRoleState(null);
      }
    };

    fetchRole();
  }, []);

  return (
    <RoleContext.Provider value={{ role, setRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

// Named export of custom hook
export const useRole = () => useContext(RoleContext);
