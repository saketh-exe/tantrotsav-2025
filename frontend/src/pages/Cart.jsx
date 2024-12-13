import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore'; // Assuming you are using Zustand or any other state management
import { FaShoppingCart } from 'react-icons/fa'; // Import React Icons
import CartItem from '../components/CartItem';

function Cart() {
  const { user } = useAuthStore(); // Get the user info
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching cart items

  useEffect(() => {
    if (!user) return; // If no user, do not fetch cart items

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.email}/cart`
        );
        setCartItems(response.data.cart); // Set the cart items
        console.log('Cart items:', response.data.cart);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setIsLoading(false); // Set loading to false after the API call
      }
    };

    fetchCartItems();
  }, [user]); // Refetch cart when the user changes

  const proceedToCheckout = () => {
    // Logic to proceed to checkout
    console.log('Proceeding to checkout...');
  };

  if (isLoading) {
    return <div>Loading your cart...</div>;
  }

  // Calculate total cost
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.eventId.registrationFee,
    0
  );

  return (
    <div className="flex max-w-6xl mx-auto p-6 space-x-6">
      {/* Left Side: Cart Items */}
      <div className="flex-1 max-h-screen overflow-y-auto">
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-center mb-6">Your Cart</h2>
              <p className="text-lg text-gray-500">
                Your cart is empty. Add some events!
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6">Your Cart</h2>
            <div className="space-y-6 pb-2">
              {cartItems.map((item) => (
                <CartItem
                  key={item.eventId._id}
                  item={item}
                  setCartItems={setCartItems}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Right Side: Cart Summary (Fixed) */}
      {cartItems.length > 0 && (
        <div className="w-96 sticky top-0 pt-14 max-h-screen">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-lg">Cart Summary</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Items in Cart:</p>
              <p>{cartItems.length}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Total Cost:</p>
              <p className="font-semibold text-xl">₹{totalCost}</p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={proceedToCheckout}
                className="w-full bg-black text-white py-2 px-6 rounded-lg font-semibold hover:bg-white hover:text-black border-2 border-black transition-colors duration-300"
                disabled={cartItems.length === 0}
              >
                <FaShoppingCart className="mr-2 inline-block" /> Proceed to
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
