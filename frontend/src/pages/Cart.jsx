import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore'; // Assuming you are using Zustand or any other state management
import { FaShoppingCart } from 'react-icons/fa'; // Import React Icons
import CartItem from '../components/CartItem';
// import { useNavigate } from 'react-router-dom';
import CCAvenue from '../utils/CCAvenue';
import crypto from 'crypto';

function Cart() {
  const { user } = useAuthStore(); // Get the user info
  const [cartItems, setCartItems] = useState([]); // State to hold cart items
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching cart items
  // const router = useNavigate();

  useEffect(() => {
    if (!user) return; // If no user, do not fetch cart items

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `/api/users/${user.email}/cart`
        );
        setCartItems(response.data.cart); // Set the cart items
        // console.log('Cart items:', response.data.cart);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setIsLoading(false); // Set loading to false after the API call
      }
    };

    fetchCartItems();
  }, [user]); // Refetch cart when the user changes

  const proceedToCheckout = async () => {
    if (cartItems.length === 0) return;

    const totalCost = cartItems.reduce(
      (sum, item) => sum + item.eventId.registrationFee,
      0
    );

    const generateOrderId = (userEmail) => {
      const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp
      const emailHash = crypto
        .createHash('sha256')
        .update(userEmail)
        .digest('hex')
        .slice(0, 4); // First 4 chars of email hash
      return `ORD${emailHash}${timestamp}`;
    };

    let paymentData = {
      merchant_id: '2156706', // Replace with actual merchant ID
      order_id: generateOrderId(user.email), // Generate unique order ID
      amount: totalCost.toFixed(2).toString(),
      currency: 'INR',
      billing_email: user.email,
      billing_name: user.name, // Assuming `name` exists in `user`
      redirect_url: `https://tantrotsav.amrita.edu/api/ccavenue-handle`,
      cancel_url: `https://tantrotsav.amrita.edu/api/ccavenue-handle`,
    };
    // console.log('Payment Data:', paymentData);
    try {
      const encReq = CCAvenue.getEncryptedOrder(paymentData);

      // console.log('Encrypted Request:', encReq);

      const accessCode = import.meta.env.VITE_ACCESS_CODE; // Replace with actual access code
      // console.log('Access Code:', accessCode);
      const paymentURL = `https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}&encRequest=${encReq}&access_code=${accessCode}`;

      // Redirect to CCAvenue Payment Gateway
      window.location.href = paymentURL;
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  if (isLoading) {
    return <div>Loading your cart...</div>;
  }

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.eventId.registrationFee,
    0
  );

  return (
    <div className="flex py-28 w-full bg-gradient-to-br from-gray-900 to-green-950 justify-center flex-col md:flex-row min-h-screen h-fit">
      {/* Left Side: Cart Items */}
      <div className="w-full flex flex-col items-center md:w-1/2">
        {cartItems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Cart</h2>
              <p className="text-lg text-gray-100">
                Your cart is empty. Add some events!
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-white">Your Cart</h2>
            <div className="w-11/12 md:w-3/4 ">
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

      {/* Right Side: Cart Summary */}
      {cartItems.length > 0 && (
        <div className="flex justify-center align-middle md:ml-4 ">
          <div className="bg-gray-200 p-4 rounded-lg shadow-md h-fit">
            <div className="flex justify-between items-center mb-4">
              <p className="font-semibold text-xl">Cart Summary :</p>
            </div>

            <div className="flex justify-between">
              <p className="font-medium">Items in Cart:</p>
              <p>{cartItems.length}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Total Cost:</p>
              <p className="font-semibold text-xl">₹ {totalCost.toFixed(2)}</p>
            </div>
            <div className="my-4 flex justify-center">
              
              <button
                onClick={proceedToCheckout}
                className="w-full bg-black text-white py-2 px-6 rounded-lg font-semibold hover:bg-white hover:text-black border-2 border-black transition-colors duration-300"
              >
                <FaShoppingCart className="mr-2 inline-block" /> Proceed to
                Checkout
              </button>
            </div>
            <p className=' line-clamp-2  text-sm text-red-800'>
             *Events once registred can not be cancelled.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
