import useAuthStore from "../store/authStore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import Loading from "../components/Loading";
import Clock from "../assets/Clock.svg"
import Calender from "../assets/Calendar.svg"
import Location from "../assets/Location.svg"
import Rupee from "../assets/Rupee.svg"
import Club from "../assets/Club.svg"
import Phone from "../assets/Phone.svg"


function EventDetails() {
  const navigate = useNavigate();

  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setEvent(null);
      }
      finally{
        setIsLoading(false)
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (isLoading) {
    // Display a loading spinner or placeholder while fetching
    return <Loading/>;
  }
  
  if (event === null) {
    // Render NotFound only if loading is complete and event is still null
    return <NotFound />;
  }

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
    <>
      <div className="min-h-screen h-auto bg-gradient-to-br from-gray-900 to-teal-950 p-4 pb-8 pt-24">
        <button
          className=" my-4 sm:mt-0 md:mt-0 text-white py-2 px-3 bg-sky-500 w-fit rounded-lg hover:bg-sky-600 hover:text-white"
          onClick={() => {
            navigate("/events");
          }}
        >
          Back
        </button>
        <div className="flex flex-col lg:flex-row justify-center items-start lg:items-stretch gap-6 lg:gap-8">
          {/* Left Section (Image Placeholder) */}
          <img
            src={event.thumbnail || "/default-thumbnail.jpg"}
            alt={event.title}
            className="w-full lg:w-[40%] max-h-[45vh] lg:max-h-[80vh] rounded-2xl object-contain"
          />

          {/* Right Section (Content) */}
          <div className="w-full lg:pl-8 flex flex-col justify-between p-8">
            <div className="text-white">
              <div className="flex items-center justify-between gap-2 sm:gap-0 mb-4">
                <h1 className="text-3xl font-extrabold sm:test-lg">
                  {event.title}
                </h1>
                {event.documents && (
                  <a
                    href={event.documents}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="test-xl sm:test-2xl block text-center bg-blue-600 text-white py-1.5 px-3 rounded-lg hover:bg-blue-800 transition">
                      Download Document
                    </button>
                  </a>
                )}
              </div>
              <p className="my-2">
                <span className="text-lg font-bold text-white">
                  Description :
                </span>
              </p>
              <p className="text-justify text-sm sm:text-base text-white ">
                {event.description}
              </p>
              
              <div className=" flex  mt-4 flex-wrap ">
              <div className="p-2 px-6 bg-orange-50 rounded-lg flex items-center gap-2 text-lg font-bold text-black mb:w-48 w-44 justify-center mr-2 md:mr-4 mb-4">
                <img src={Calender} className="w-8"/>
              {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="p-2 px-6 bg-orange-50 rounded-lg flex items-center gap-2 text-lg font-bold text-black mb:w-48 w-44 justify-center mr-2 md:mr-4 mb-4">
                <img src={Clock} className="w-8"/>
                {event.time?event.time:"12:00"}
              </div>
              <div className="p-2 px-6 bg-orange-50 rounded-lg flex items-center gap-2 text-lg font-bold text-black mb:w-48 w-44 justify-center mr-2 md:mr-4 mb-4">
              <img src={Location} className="w-8 "/>
                {event.location}
              </div>
              <div className="p-2 px-6 bg-orange-50 rounded-lg flex items-center gap-2 text-lg font-bold text-black mb:w-48 w-44 justify-center mr-2 md:mr-4 mb-4">
              <img src={Club} className="w-8 "/>
                {event.clubName}
               
              </div>
              
              <div className="p-2 px-6 bg-orange-50 rounded-lg flex items-center gap-2 text-lg font-bold text-black mb:w-48 w-44 justify-center mr-2 md:mr-4 mb-4">
                    <img src={Rupee} className="w-8 " />
                {event.registrationFee != 0
                      ? `${event.registrationFee}`
                      : "Free"}
                    
              </div>
             

              </div>
              <div className=" flex  mt-6 flex-wrap ">
              <div className="p-1 px-3 bg-orange-50 rounded-full flex items-center gap-2 text-sm font-bold text-black mb:w-48 w-fit justify-center mr-2 md:mr-4 mb-4">
                <img src={Phone} className="w-4"/>
                <p>person 1 : </p>
                +91 123456789
              </div>
              <div className="p-1 px-3 bg-orange-50 rounded-full flex items-center gap-2 text-sm font-bold text-black mb:w-48 w-fit justify-center mr-2 md:mr-4 mb-4">
                <img src={Phone} className="w-4"/>
                <p>person 2 : </p>
                +91 123456789
              </div>
              </div>
              {/* Button */}
              <div className="mt-6 flex justify-start">
                {user && (
                  <button
                    onClick={addToCart}
                    className={`text-sm sm:text-base px-2.5 border-2 border-lime-300 py-2 inline-block text-black bg-lime-300 rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black transition ${
                      isLoading ? "bg-gray-300 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Adding..." : "Add to Cart"}
                  </button>
                )}
                
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EventDetails;
