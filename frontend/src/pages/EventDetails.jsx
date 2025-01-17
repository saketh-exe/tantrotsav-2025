import useAuthStore from "../store/authStore";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";
import Loading from "../components/Loading";
import Clock from "../assets/Clock.svg"
import Duration from "../assets/hourglass.svg"
import Calender from "../assets/Calendar.svg"
import Location from "../assets/Location.svg"
import Rupee from "../assets/Rupee.svg"
import Club from "../assets/university-svgrepo-com.svg"
import Phone from "../assets/Phone.svg"
import team from "../assets/team.svg"
import medal1 from "../assets/medal1.svg"
import medal2 from "../assets/medal.svg"
import EvntTyp from "../assets/Eventtype.svg"
import Eventpill from "../components/Eventpill";


function EventDetails() {
  const navigate = useNavigate();
  const pending = [
    "67737e4188d8600ff314c594",
    "67738c877b3bfd288ffb7dbc",
  ]; // id's of pending events
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `/api/events/${eventId}`
        );
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setEvent(null);
      }
      finally {
        setIsLoading(false)
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (isLoading) {
    // Display a loading spinner or placeholder while fetching
    return <Loading />;
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
      toast.success("Adding")
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
    <>
      <div className="min-h-screen h-auto bg-gradient-to-br from-gray-900 to-teal-950 p-4 pb-8 pt-24">
        <button
          className=" my-4 sm:mt-0 md:mt-0 text-white py-2 px-3 bg-sky-500 w-fit rounded-lg hover:bg-sky-600 hover:text-white"
          onClick={() => {
            navigate("/events");
          }}
        >
          {"<"} Events
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
              <div className="flex items-center justify-between gap-2 sm:gap-0 mb-4 flex-wrap">
                <h1 className="text-3xl font-extrabold sm:test-lg">
                  {event.title}
                </h1>
                <div className="flex gap-4">
                  {/* Add to cart */}
                  <div className=" flex justify-start">
                    {event.registrationFee  &&  event.registrationFee > 0 ? (user && (
                      pending.includes(event._id) ?
                      (event._id==="67738c877b3bfd288ffb7dbc"?<button
                        className={`text-sm sm:text-base px-2.5 border-2 border-lime-300 py-2 inline-block text-black bg-lime-300 rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black transition ${isLoading ? "bg-gray-300 cursor-not-allowed" : ""
                          }`}
                        disabled={isLoading}
                      >
                        {"Offline Registration only "}
                      </button>:<button
                        onClick={()=> console.log("Buy clicked")} // buy 
                        className={`text-sm sm:text-base px-2.5 border-2 border-lime-300 py-2 inline-block text-black bg-lime-300 rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black transition ${isLoading ? "bg-gray-300 cursor-not-allowed" : ""
                          }`}
                        disabled={isLoading}
                      >
                        {isLoading ? "Buying..": "Buy Now"}
                      </button>)
                      :
                      <button
                        onClick={addToCart}
                        className={`text-sm sm:text-base px-2.5 border-2 border-lime-300 py-2 inline-block text-black bg-lime-300 rounded-lg hover:bg-white hover:text-black hover:border-2 hover:border-black transition ${isLoading ? "bg-gray-300 cursor-not-allowed" : ""
                          }`}
                        disabled={isLoading}
                      >
                        {isLoading ? "Adding..." : "Add to Cart"}
                      </button>
                    )):<></>}

                  </div>
                  {event.documents && (
                    <a
                      href={event.documents}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="text-sm sm:text-base px-2.5 block text-center border-2 border-blue-600 bg-blue-600 text-white py-2  rounded-lg hover:bg-blue-800 transition">
                        Download Document
                      </button>
                    </a>
                  )}

                </div>

              </div>
              <p className="my-2">
                <span className="text-lg font-bold text-white">
                  Description :
                </span>
              </p>
              <p className="text-justify text-sm sm:text-base text-white ">
                {event.description}
                {event.registrationFee === 0 ?<p>This event requires no registration.</p>:<></>}
                {event.documents && <strong className="text-green-200">PLEASE REFER DOCUMENTS FOR MORE INFO.</strong>}
              </p>

              <div className=" flex  mt-6 flex-wrap  justify-center md:justify-start ">
                {(() => {
                  // Parse and format the date
                  let formattedDate = new Date(event.date).toLocaleDateString('en-GB').slice(0, 2)
                  if (formattedDate === "28") {
                    formattedDate = "29th & 30th Jan"
                  }
                  else {
                    formattedDate = `${formattedDate}th Jan`
                  }

                  return (
                    <Eventpill imgsrc={Calender} content={formattedDate} />
                  );
                })()}

                {event.time && <Eventpill imgsrc={Clock} content={event.time ? event.time : "12:00"} />}
                {(event.duration && event.duration != 0) && <Eventpill imgsrc={Duration} content={event.duration ? `${event.duration} hour(s)` : "1 hour(s)"} />}
                <Eventpill imgsrc={Location} content={event.location} />
                <Eventpill imgsrc={Club} content={event.clubName} />
                <Eventpill imgsrc={Rupee} content={event.registrationFee != 0 ? event.registrationFee > 0 ?`${event.registrationFee}`:"N/D" : "Free"} />
                <Eventpill imgsrc={team} content={event.teamSize} /> {/* Team size here {event.teamSize} */}
                {(event.prize1st > 0 || event.prize2nd > 0) && (
                  <Eventpill
                    content={
                      <div className="flex flex-col w-full gap-y-1 items-center justify-center">
                        {event.prize1st > 0 && (
                          <div className="flex w-full border-b border-black justify-center items-center">
                            <img src={medal1} className="w-6" alt="1st Prize" />
                            ₹{event.prize1st}
                          </div>
                        )}
                        {event.prize2nd > 0 && (
                          <div className="flex w-full justify-center items-center">
                            <img src={medal2} className="w-6" alt="2nd Prize" />
                            ₹{event.prize2nd}
                          </div>
                        )}
                      </div>
                    }
                  />
                )}
                <Eventpill imgsrc={EvntTyp} content={event.type} /> {/* Type of show event.type */}

              </div>
              <div className=" flex  mt-6 flex-wrap  justify-center md:justify-start "> {/* need to map to no of coordinators */}
                {event.contact1 && (<div className="p-1 px-3 bg-white rounded-full flex items-center gap-2 text-sm font-bold text-black mb:w-48 w-fit justify-center mr-2 md:mr-4 mb-4 hover:bg-orange-200 transition-all ease-in-out"
                  onClick={() => window.location.href = `tel:+${event.contact1num}`}>
                  <img src={Phone} className="w-4" />
                  <p>{event.contact1} : </p>
                  +{event.contact1num}
                </div>)}
                {event.contact2 && (<div className="p-1 px-3 bg-white rounded-full flex items-center gap-2 text-sm font-bold text-black mb:w-48 w-fit justify-center mr-2 md:mr-4 mb-4 hover:bg-orange-200 transition-all ease-in-out"
                  onClick={() => window.location.href = `tel:+${event.contact2num}`}>
                  <img src={Phone} className="w-4" />
                  <p>{event.contact2} : </p>
                  +{event.contact2num}
                </div>)}
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default EventDetails;
