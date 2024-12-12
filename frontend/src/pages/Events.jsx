import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard'; // Import EventCard

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events`
        );
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Group events by club name
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.clubName]) {
      acc[event.clubName] = [];
    }
    acc[event.clubName].push(event);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>

      {Object.keys(groupedEvents).map((clubName) => (
        <div key={clubName} className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            {clubName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedEvents[clubName].map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Events;
