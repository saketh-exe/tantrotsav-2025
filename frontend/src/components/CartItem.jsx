import axios from 'axios';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa'; // Import React Icons
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

function CartItem({ item }) {
  const { user, setUser } = useAuthStore();
  const removeFromCart = async (eventId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${
          user.email
        }/cart/${eventId}`
      );
      setUser(response.data.user);
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const handleRedirect = (eventId) => {
    window.location.href = `/events/${eventId}`;
  };

  return (
    <div
      key={item.eventId._id}
      className="flex justify-between items-center bg-white border-2 border-[#323232] rounded-lg shadow-md p-4 duration-200"
    >
      <div className="flex items-center gap-4">
        <img
          src={item.eventId.thumbnail || '/default-thumbnail.jpg'}
          alt={item.eventId.title}
          className="h-20 w-20 object-cover rounded-md cursor-pointer"
          onClick={() => handleRedirect(item.eventId._id)}
        />
        <div className="flex flex-col cursor-pointer" onClick={() => handleRedirect(item.eventId._id)}>
          <h3 className="text-lg font-semibold text-black hover:text-[#1d4ed8] transition-colors duration-300">
            {item.eventId.title}
          </h3>
          <p className="text-sm text-gray-600">
            {new Date(item.eventId.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-800">
            ₹{item.eventId.registrationFee}
          </p>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.eventId._id)}
        className="text-sm text-red-500 hover:text-red-700 font-semibold flex items-center"
      >
        <FaTrashAlt className="mr-2" /> Remove
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    eventId: PropTypes.shape({
      thumbnail: PropTypes.string,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      registrationFee: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CartItem;
