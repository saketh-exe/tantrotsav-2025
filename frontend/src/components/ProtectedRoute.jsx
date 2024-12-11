import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore'; // Assuming you are using Zustand for authentication state

const ProtectedRoute = () => {
  const user = useAuthStore((state) => state.user); // Access the user from Zustand

  useEffect(() => {
    if (!user) {
      // Show toast notification when the user is redirected
      toast.error('You need to log in first!');
    }
  }, [user]); // Only run when the user state changes

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If the user is logged in, render the nested routes
  return <Outlet />;
};

export default ProtectedRoute;
