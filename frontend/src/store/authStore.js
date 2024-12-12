import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import axios from 'axios';

// Create a Zustand store for authentication
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  isUserRegistered: false,
  setUserRegistrationStatus: (status) => set({ isUserRegistered: status }),
  loading: true, // Add loading state
  setLoading: (status) => set({ loading: status }), // Set loading state
}));

// Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Persist the user in the Zustand store when the auth state changes
    useAuthStore.getState().setUser(user);
    useAuthStore.getState().setLoading(true); // Set loading to true while checking registration

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/${user.email}`
      );
      if (response.data.code === 200) {
        // Set the user registration status
        console.log(response);
        useAuthStore.getState().setUser(response.data.user);
        useAuthStore.getState().setUserRegistrationStatus(true);
      } else {
        useAuthStore.getState().setUserRegistrationStatus(false);
      }
    } catch {
      useAuthStore.getState().setUserRegistrationStatus(false);
    } finally {
      useAuthStore.getState().setLoading(false); // Set loading to false after checking
    }
  } else {
    // If no user, clear the user from the store
    useAuthStore.getState().clearUser();
    useAuthStore.getState().setUserRegistrationStatus(false);
    useAuthStore.getState().setLoading(false); // Set loading to false
  }
});

export default useAuthStore;
