import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from '../firebase'; // Import the auth object from Firebase
import useAuthStore from '../store/authStore'; // Import the Zustand store
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

function Logout() {
  const clearUser = useAuthStore((state) => state.clearUser); // Access the setUser function from Zustand

  const handleLogout = async () => {
    try {
      // Sign the user out of Firebase
      await signOut(auth);
      // Clear the user from the Zustand store
      clearUser();
      // console.log('User logged out successfully')
      // Navigate to / page
      // window.location.href = '/';
      toast.success('Logged out successfully');
      Navigate('/');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <button
      className="lg:py-2 lg:px-5 py-1 px-3 border border-[#000000] text-[#000000] rounded hover:shadow-md hover:bg-[#000000] hover:text-white transition-all duration-300 lg:text-sm text-xs"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
