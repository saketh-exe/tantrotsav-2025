import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import useAuthStore from '../store/authStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const setUser = useAuthStore((state) => state.setUser); // Access the setUser function from Zustand
  const navigate = useNavigate(); // Hook to navigate to different routes

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

    

      try {
        // Send the user's email to the backend to check if the user exists
        const response = await axios.post(
          `/api/auth/login`,
          { email: user.email }
        );
        console.log('Response from the backend:', response.data);

        setUser(user);
        // If the user doesn't exist, redirect to the register page
        if (response.status === 404) {
          navigate('/register');
        }
      } catch (error) {
        // Handle network or other request errors here
        if (error.response && error.response.status === 404) {
          // If the error is a 404, handle as user not found and redirect
          navigate('/register');
        } else {
          console.error('Error during sign-in:', error.message);
          // Optionally, handle other error codes here
        }
      }
    } catch (error) {
      console.error('Error during sign-in:', error.message);
      // Handle errors from Firebase sign-in
    }
  };

  return (
    <button
      className="lg:py-2 lg:px-5 py-1 px-3 text-sm lg:text-md border bg-black border-[#000000] text-[#ffffff] rounded hover:shadow-md hover:bg-transparent hover:text-black transition-all duration-300 w-24"
      onClick={signInWithGoogle}
    >
      Login
    </button>
  );
}

export default SignIn;
