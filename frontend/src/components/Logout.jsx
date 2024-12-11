import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { auth } from '../firebase'; // Import the auth object from Firebase
import useAuthStore from '../store/authStore'; // Import the Zustand store

function Logout() {
  const clearUser = useAuthStore((state) => state.clearUser); // Access the setUser function from Zustand

  const handleLogout = async () => {
    try {
      // Sign the user out of Firebase
      await signOut(auth);
      // Clear the user from the Zustand store
      clearUser();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <button
      className="py-2 px-5 border border-[#C50B4C] text-[#C50B4C] rounded hover:shadow-md hover:bg-[#C50B4C] hover:text-white transition-all duration-300"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
