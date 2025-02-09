import { useState, useEffect, useRef } from "react";
import { FiSearch, FiFilter } from "react-icons/fi"; // Import icons
import EventCardLazy from "../components/EventCardLazy"; // Import lazy-loaded EventCard
import Loading from "../components/Loading";
import { useScrollContext } from '../components/ContextProvider';
import logo from "../assets/image.png";

function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All'); // New state for type filter
  const [filteredEvents, setFilteredEvents] = useState([]);
  const scrollContainerRef = useRef(null); 
  const { setIsScrolled } = useScrollContext();
  const [randomizedEvents, setRandomizedEvents] = useState([]);

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

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrolled(scrollContainerRef.current.scrollTop > 0);
      }
    };

    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll); // Attach scroll listener
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll); // Cleanup listener
      }
    };
  }, [scrollContainerRef.current]);

  useEffect(() => {
    // Ensure filteredEvents exists and is not empty
    if (!filteredEvents || filteredEvents.length === 0) return;

    // Separate the first 4 events and the rest
    const firstFourEvents = filteredEvents.slice(0, 4);
    const remainingEvents = filteredEvents.slice(4);

    // Shuffle the remaining events
    for (let i = remainingEvents.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [remainingEvents[i], remainingEvents[j]] = [remainingEvents[j], remainingEvents[i]];
    }

    // Combine first 4 with shuffled remaining events
    const combinedEvents = [...firstFourEvents, ...remainingEvents];

    // Update the state with the processed events
    setRandomizedEvents(combinedEvents);
  }, [filteredEvents]); // Run the effect whenever filteredEvents changes

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
    <div ref={scrollContainerRef} className="relative z-10 h-screen w-full scrollbar-hide min-h-screen bg-gradient-to-br from-red-950 to-indigo-950 overflow-y-scroll">
      <div className="w-full min-h-screen py-16 px-4 sm:px-6 lg:px-8 pt-28 bg-gradient-to-br from-indigo-950 to-red-950 text-white">
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

          <a 
            href={logo}
            download 
            className="bg-blue-500 text-white p-2 rounded-sm hover:bg-blue-600 transition-all"
          >
            Download Brochure
          </a>
        </div>

        {/* Display Events */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-20 justify-items-center mt-24">
          {randomizedEvents.map((event) => {
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
            See you in 2026! 🚀
          </p>
        )}
      </div>
    </div>
  );
}

export default Events;
