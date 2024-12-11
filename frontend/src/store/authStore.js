import { create } from 'zustand';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

// Create a Zustand store for authentication
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Persist the user in the Zustand store when the auth state changes
    useAuthStore.getState().setUser(user);
  } else {
    // If no user, clear the user from the store
    useAuthStore.getState().clearUser();
  }
});

export default useAuthStore;
