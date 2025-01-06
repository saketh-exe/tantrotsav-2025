import axios from 'axios';
import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa'; // Import React Icons
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function CartItem({ item }) {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate()
  const removeFromCart = async (eventId) => {
    toast.success("Removing")
    try {
      const response = await axios.delete(
        `/api/users/${
          user.email
        }/cart/${eventId}`
      );
      setUser(response.data.user);
      toast.success("Removed")
    } catch (error) {
      
      toast.error('Failed to remove item from cart');
    }
  };

  const handleRedirect = (eventId) => {
    navigate(`/events/${eventId}`)
  };

  return (
    <div
      key={item.eventId._id}
      className="flex justify-between items-center bg-white border-4 border-[#acacac] rounded-lg shadow-md md:p-4 p-1 duration-200 mb-4 backdrop-blur-xl bg-opacity-25"
    >
      <button className="flex items-center gap-4 hover:bg-yellow-900 md:p-4  p-2 rounded-xl bg-opacity-5 transition-all ease-in-out w-full" 
      onClick={() => handleRedirect(item.eventId._id)}>
        <button>
        <img
          src={item.eventId.thumbnail || '/default-thumbnail.jpg'}
          alt={item.eventId.title}
          className="h-20 w-20  object-cover rounded-md  "
          onClick={() => handleRedirect(item.eventId._id)}
        />
        </button>
        <div className="flex flex-col  items-start" onClick={() => handleRedirect(item.eventId._id)}>
          <button>
          <h3 className="text-lg md:text-xl font-semibold text-slate-100 hover:text-[#1d4ed8] transition-colors duration-300 truncate">
            {item.eventId.title} 
          </h3>
          </button>
          
          <p className="text-sm md:text-base text-gray-200">
            {new Date(item.eventId.date).toLocaleDateString('en-GB')}
          </p>
          <p className="text-sm text-gray-300">
            ₹{item.eventId.registrationFee}
          </p>
        </div>
        
        
      </button>
      <button
        onClick={() => removeFromCart(item.eventId._id)}
        className="text-sm text-red-500 hover:text-red-100 hover:bg-slate-700 font-semibold flex items-center md:px-5 py-2 px-3 rounded-full transition-all ease-in-out duration-300 "
      >
        <FaTrashAlt className="mr-2 text-lg " /> 
        <span className='hidden sm:inline-block'>
        Remove
          
        </span>
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
