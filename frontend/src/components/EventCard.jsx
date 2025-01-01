import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAuthStore from "../store/authStore";
import { useState } from "react";
import { toast } from "react-hot-toast"; // Import react-hot-toast
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css"; // Import effect styles


function EventCard({ event }) {

  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const pending = ["67737e4188d8600ff314c594","67738c877b3bfd288ffb7dbc","6773a110de2fd564adc4eae2","6773a24ede2fd564adc4eaee"] // id's of pending events 

  const addToCart = async () => {
    if (!user) {
      toast.error("Please sign in to add to cart");
      return;
    }
    setIsLoading(true);

    try {
      // Fetch user's cart to check for any conflicting events
      const cartResponse = await axios.get(
        `/api/users/${user.email}/cart`
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
        `/api/users/${user.email}/cart`,
        { eventId: event._id }
      );

      // Refetch updated user data
      const updatedUserResponse = await axios.get(
        `/api/auth/${user.email}`
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
    <div
  className="w-[300px] h-[420px] rounded-[12px]  flex flex-col justify-between pb-[14px] px-2 pt-2 gap-[10px] hover:scale-105 duration-200 bg-white bg-opacity-15 backdrop-filter backdrop-blur-sm border-opacity-45 border border-white "
  
>
  <div className="transition-all duration-500 flex justify-center">
    {/* Card Image with fixed size */}
    <div className="w-full h-[180px] relative border-2 rounded-md border-white bg-gradient-to-t from-transparent to-[rgba(0,0,0,0.5)] border-opacity-50">
    {pending.includes(event._id) ? (
            <LazyLoadImage
              src={event.thumbnail || "/default-thumbnail.jpg"}
              alt={event.title}
              effect="blur"
              width="100%"
              height="100%"
              className="w-full h-full object-cover rounded-md select-none"
            />
          ) : (
            <Link to={`/events/${event._id}`}>
              <LazyLoadImage
                src={event.thumbnail || "/default-thumbnail.jpg"}
                alt={event.title}
                effect="blur"
                width="100%"
                height="100%"
                className="w-full h-full object-cover rounded-md select-none"
              />
            </Link>
          )}
    </div>
  </div>

  <div className="flex flex-col items-center">
   { pending.includes(event._id) ?
   <>
   <h3 className="text-[20px] font-bold text-white transition-colors duration-300 mt-1 line-clamp-1">
        {event.title}
      </h3>
   </>
   : 
   <Link to={`/events/${event._id}`}>
      <h3 className="text-[20px] font-bold text-white transition-colors duration-300 mt-1 line-clamp-1">
        {event.title}
      </h3>
    </Link>}
    <p className="text-center text-[14px] max-w-[240px] font-normal text-[#d6d6d6]  line-clamp-3">
      {event.description}
    </p>

    <div className="mt-[10px] text-[14px] text-gray-200 flex flex-col items-center gap-[5px]">
  {event.date && (
    <p className="text-sm">
      <strong className="text-white">Date:</strong>{" "}
      <span className="text-gray-100">
        {pending.includes(event._id)
          ? "Coming Soon"
          : (() => {
              let formattedDate = new Date(event.date).toLocaleDateString('en-GB').slice(0, 2);
              return formattedDate === "28"
                ? "29th & 30th Jan"
                : `${formattedDate}th Jan`;
            })()}
      </span>
    </p>
  )}
  <p className="text-sm">
    <strong className="text-white">Registration Fee:</strong>{" "}
    <span className="text-gray-100">
      {pending.includes(event._id)
        ? "N/A"
        : event.registrationFee
        ? `₹${event.registrationFee}`
        : "N/A"}
    </span>
  </p>
</div>
  </div>

  {/* Footer with Action Buttons */}
  {pending.includes(event._id) ? <div></div>: (
    <div className="flex gap-2 justify-between">
      {!pending.includes(event._id) && (
        <Link
          to={`/events/${event._id}`}
          className="text-xs py-[8px] px-[10px] w-full bg-black text-white font-medium text-center rounded-[5px] hover:bg-white hover:text-black border-2 border-white hover:border-white transition-colors duration-300"
        >
          View Details
        </Link>
      )}
      {user && (
        <button
          onClick={addToCart}
          className={`text-xs py-[8px] w-full px-[10px] border-2 border-white text-white font-medium text-center rounded-[5px] hover:bg-green-200 hover:text-black transition-colors duration-300 ${
            isLoading ? "bg-gray-300 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add to Cart"}
        </button>
      )}
    </div>
  )}
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
    capacity: PropTypes.number,
    registrationFee: PropTypes.number, // Added for registration fee
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
