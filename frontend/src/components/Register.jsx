import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import useAuthStore from '../store/authStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate hook for navigation

function Register() {
  const setUser = useAuthStore((state) => state.setUser); // Access the setUser function from Zustand
  const navigate = useNavigate(); // Hook to navigate to different routes

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('User Info:', user);

      try {
        // Send the user's email to the backend to check if the user exists
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`,
          {
            name: user.displayName,
            email: user.email,
            profileImage: user.photoURL,
          }
        );
        console.log('Response from the backend:', response.data);
        // Set the user in Zustand regardless of the response status
        setUser(user);
        if (response.status === 200) {
          // If user is successfully registered, redirect to the dashboard
          navigate('/dashboard'); // Redirect to the dashboard or any other page
        } else if (response.status === 404) {
          // If the user already exists, redirect to the profile completion page or any other page
          navigate('/profile'); // Redirect to a page where the user can complete their profile
        }
      } catch (error) {
        // Handle network or other request errors here
        console.error('Error during sign-in:', error.message);
        // Optionally, handle other error codes here
      }
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      // Handle errors from Firebase sign-in
    }
  };

  return (
    <button
      className="py-2 px-5 border border-[#C50B4C] text-[#C50B4C] rounded hover:shadow-md hover:bg-[#C50B4C] hover:text-white transition-all duration-300"
      onClick={signInWithGoogle}
    >
      Register
    </button>
  );
}

export default Register;
