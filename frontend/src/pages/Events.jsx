import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiFilter } from "react-icons/fi"; // Import icons
import EventCardLazy from "../components/EventCardLazy"; // Import lazy-loaded EventCard
import Loading from "../components/Loading";

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All'); // New state for type filter
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`/api/events`);
        setEvents(response.data);
        setFilteredEvents(response.data); // Initial filtering
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Automatically filter events as user types or changes the filter
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    let filtered = events.filter((event) =>
      event.title.toLowerCase().includes(query)
    );

    if (typeFilter !== 'All') {
      filtered = filtered.filter((event) => event.type === typeFilter);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, typeFilter, events]);

  // Extract unique event types for filtering
  const uniqueTypes = [
    'All',
    ...new Set(events.map((event) => event.type)),
  ];

  if (isLoading) {
    // Display a loading spinner or placeholder while fetching
    return <Loading />;
  }

  return (
    <div className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 pt-28 bg-gradient-to-br from-black to-indigo-950 text-white">
      <h2 className="text-5xl font-bold text-center mb-8">Upcoming Events</h2>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative w-full max-w-[300px]">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 pl-10 border-2 border-black rounded-[5px] text-[#323232] focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative w-full max-w-[180px] sm:max-w-[130px]">
          <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full p-2 pl-10 border-2 border-black rounded-[5px] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-black appearance-none"
          >
            {uniqueTypes
              .sort((a, b) => a.localeCompare(b)) // Sort alphabetically
              .map((type) => (
                <option key={type} value={type} className="text-left">
                  {type}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* <div className="w-full text-center text-xl text-red-400">
        *Registrations will open soon.<br />
        Stay tuned for more events.
      </div> */}

      {/* Display Events */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-20 justify-items-center mt-24">
        {filteredEvents.map((event) => {
          return (
            !event.isHidden && (
              <div key={event._id} className="lazy-card">
                <EventCardLazy event={event} />
              </div>
            )
          );
        })}
      </div>

      {/* No Results Fallback */}
      {filteredEvents.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No events found matching your criteria.
        </p>
      )}
    </div>
  );
}

export default Events;
