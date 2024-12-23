import { useEffect, useState } from 'react';
import EventRegistered from '../components/EventRegistered';
import useAuthStore from '../store/authStore';
import axios from 'axios';

function Profile() {
  const { user } = useAuthStore();
  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      if (user.registeredEvents.length === 0) return;
      // for each event id, fetch the event details and append it to state
      const events = await Promise.all(
        user.registeredEvents.map(async (eventId) => {
          const data = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`
          );
          console.log('fetched data: ', data);
          return data.data;
        })
      );
      setRegisteredEvents(events);
      console.log('Events: ', events);
    };
    fetchRegisteredEvents();
  }, [user.registeredEvents]);

  // console.log(user);
  return (
    <div className="max-w-5xl w-full mx-auto flex flex-col items-center justify-center mt-10">
      <div className="flex w-full ">
        <div className="flex rounded-md mr-4 ">
          <img
            src={user.profileImage}
            alt="profile image"
            className="rounded-md w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 transition-transform transform hover:scale-110 hover:rotate-12 duration-300 border-2 border-black"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-500">Name</p>
              <h1 className="font-bold border-2 rounded-lg border-black p-2 text-gray-800 truncate">
                {user.name}
              </h1>
            </div>
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <h1 className="font-bold border-2 rounded-lg border-black p-2 text-gray-800 truncate">
                {user.email}
              </h1>
            </div>
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <h1 className="font-bold border-2 rounded-lg border-black p-2 text-gray-800 truncate">
                {user.phoneNumber}
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-500">College</p>
              <h1 className="font-bold border-2 rounded-lg border-black p-2 text-gray-800 truncate">
                {user.collegeName}
              </h1>
            </div>
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-500">
                College Roll Number
              </p>
              <h1 className="font-bold border-2 rounded-lg border-black p-2 text-gray-800 truncate">
                {user.collegeRollNumber}
              </h1>
            </div>
            <div className="flex flex-col w-[250px] gap-1">
              <p className="text-sm font-medium text-gray-500">City</p>
              <h1 className="font-bold border-2 rounded-lg border-black p-2 text-gray-800 truncate">
                {user.city}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-5 gap-4 w-full">
        <h1 className="text-center font-semibold text-2xl">
          Registered Events
        </h1>
        {registeredEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events registered yet</p>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {registeredEvents.map((event) => (
              <EventRegistered key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
