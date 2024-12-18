import { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiFilter } from 'react-icons/fi'; // Import icons
import EventCard from '../components/EventCard';

function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [clubFilter, setClubFilter] = useState('All'); // New state for filter
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events`
        );
        setEvents(response.data);
        setFilteredEvents(response.data); // Initial filtering
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Automatically filter events as user types or changes filter
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    let filtered = events.filter((event) =>
      event.title.toLowerCase().includes(query)
    );

    if (clubFilter !== 'All') {
      filtered = filtered.filter((event) => event.clubName === clubFilter);
    }

    setFilteredEvents(filtered);
  }, [searchQuery, clubFilter, events]);

  // Extract unique club names for filtering
  const uniqueClubs = [
    'All',
    ...new Set(events.map((event) => event.clubName)),
  ];

  // Group events by club name
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    if (!acc[event.clubName]) {
      acc[event.clubName] = [];
    }
    acc[event.clubName].push(event);
    return acc;
  }, {});

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>

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
            value={clubFilter}
            onChange={(e) => setClubFilter(e.target.value)}
            className="w-full p-2 pl-10 border-2 border-black rounded-[5px] text-[#323232] bg-white focus:outline-none focus:ring-2 focus:ring-black appearance-none"
          >
            {uniqueClubs.map((clubName) => (
              <option key={clubName} value={clubName} className="text-left">
                {clubName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Display Events */}
      {Object.keys(groupedEvents).map((clubName) => (
        <div key={clubName} className="mb-12">
          <h3 className="text-2xl font-semibold text-[#323232] mb-6">
            {clubName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {groupedEvents[clubName].map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      ))}

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
