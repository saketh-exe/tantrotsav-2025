import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAuthStore from "../store/authStore";
import { useState } from "react";
import { toast } from "react-hot-toast"; // Import react-hot-toast

function EventCard({ event }) {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  console.log("log message" + !user);
  const addToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add to cart");
      return;
    }

    setIsLoading(true);

    try {
      // Fetch user's cart to check for any conflicting events
      const cartResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.email}/cart`
      );
      const cartItems = cartResponse.data.cart;

      // Create a Date object for the event time
      const eventDateTime = new Date(`${event.date} ${event.time}`);

      // Check for events with the same date and time in the user's cart
      const isConflict = cartItems.some((item) => {
        const cartEventDateTime = new Date(
          `${item.eventId.date} ${item.eventId.time}`
        );
        return cartEventDateTime.getTime() === eventDateTime.getTime();
      });

      if (isConflict) {
        toast.error("You already have an event at the same time in your cart.");
        setIsLoading(false);
        return;
      }

      // Proceed to add the event to the cart if no conflict
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.email}/cart`,
        { eventId: event._id }
      );

      // Refetch updated user data
      const updatedUserResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/${user.email}`
      );

      // Update the Zustand store with new user data
      setUser(updatedUserResponse.data.user);

      toast.success("Event added to cart successfully!");
    } catch (error) {
      if (error.response?.data?.error === "Event is already in your cart") {
        toast.error("This event is already in your cart!");
      } else {
        toast.error(
          error.response?.data?.error ||
            "Failed to add event to cart. Try again!"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[300px] h-[400px] bg-white rounded-[10px] shadow-md shadow-slate-300 flex flex-col justify-start p-[20px] gap-[10px] hover:scale-105 duration-200">
      <div className="transition-all duration-500 flex justify-center">
        {/* Card Image with fixed size */}
        <div className="w-full h-[140px] relative border-2 rounded-md border-black bg-gradient-to-t from-transparent to-[rgba(0,0,0,0.3)]">
          <img
            src={event.thumbnail || "/default-thumbnail.jpg"}
            alt={event.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-[20px] font-bold text-black hover:text-[#1d4ed8] transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-[14px] max-w-[240px] font-normal text-[#4a4a4a]  line-clamp-3 text-center">
          {event.description}
        </p>

        <div className="mt-[10px] text-[14px] text-[#323232] flex flex-col items-center gap-[5px]">
          <p className="text-sm">
            <strong className="text-[#000000]">Date:</strong>{" "}
            <span className="text-black">
              {new Date(event.date).toLocaleDateString()}
            </span>
          </p>
          <p className="text-sm">
            <strong className="text-[#000000]">Registration Fee:</strong>{" "}
            <span className="text-black">
              {event.registrationFee ? `₹${event.registrationFee}` : "Free"}
            </span>
          </p>
        </div>
      </div>

      {/* Footer with Action Buttons */}
      <div className="flex gap-2 justify-between">
        <Link
          to={`/events/${event._id}`}
          className="text-xs py-[8px] px-[10px] w-full bg-black text-white font-medium text-center rounded-[5px] hover:bg-white hover:text-black border-2 border-black transition-colors duration-300"
        >
          View Details
        </Link>
        {user && (
          <button
            onClick={addToCart}
            className={`text-xs py-[8px] w-full px-[10px] border-2 border-black text-black font-medium text-center rounded-[5px] hover:bg-black hover:text-white transition-colors duration-300 ${
              isLoading ? "bg-gray-300 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>
        )}
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired, // Event time added
    capacity: PropTypes.number.isRequired,
    registrationFee: PropTypes.number, // Added for registration fee
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
