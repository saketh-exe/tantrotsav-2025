import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom'; // useNavigate hook for navigation
import axios from 'axios'; // Axios for making HTTP requests
import { toast } from 'react-hot-toast';

function Register() {
  const setUser = useAuthStore((state) => state.setUser); // Access the setUser function from Zustand
  const navigate = useNavigate(); // Hook to navigate to different routes

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        {
          email: user.email,
        }
      );

      if (response.data.message === 'User exists') {
        toast.success('User exists');
        setUser(user);
        return navigate('/');
      }

      // Save the user to Zustand store
      setUser(user);

      // Redirect to UserDetails form for registration
      navigate('/register');
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  return (
    <button
      className="lg:py-2 lg:px-5 py-1 px-3 text-sm lg:text-md border border-[#000000] text-[#000000] rounded hover:shadow-md hover:bg-[#000000] hover:text-white transition-all duration-300 w-24"
      onClick={signInWithGoogle}
    >
      Register
    </button>
  );
}

export default Register;
