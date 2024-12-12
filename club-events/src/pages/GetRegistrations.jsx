import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function GetRegistrations() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false); // New state to track errors

  // Fetch events from the backend when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events`
        );
        const eventOptions = response.data.map((event) => ({
          value: event._id,
          label: event.title,
        }));
        setEvents(eventOptions);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle the form submission to get registrations for the selected event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setLoading(true);
    setFetchError(false); // Reset fetch error before new fetch
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/${
          selectedEvent.value
        }/registrations`
      );
      setRegistrations(response.data.registeredUsers);
    } catch (error) {
      console.error('Error fetching registrations:', error);
      setFetchError(true); // Set fetch error if something goes wrong
    } finally {
      setLoading(false);
    }
  };

  // Handle downloading the registrations as Excel
  const handleDownloadExcel = async () => {
    if (!selectedEvent) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/${
          selectedEvent.value
        }/registrations/excel`,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'registrations.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading Excel file:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Get Event Registrations
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="event"
            className="block text-sm font-semibold text-gray-700"
          >
            Select Event
          </label>
          <Select
            id="event"
            options={events}
            onChange={setSelectedEvent}
            placeholder="Select an event"
            className="mt-2"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 py-3 px-6 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Get Registrations
          </button>
        </div>
      </form>

      {loading && <div className="text-center mt-4">Loading...</div>}

      {fetchError && !loading && (
        <div className="text-center text-red-500 mt-4">
          Error fetching registrations
        </div>
      )}

      {registrations.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Registration Details:</h3>
          <div>
            <button
              onClick={handleDownloadExcel}
              className="py-3 px-6 bg-green-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Download as Excel
            </button>
          </div>
        </div>
      ) : (
        selectedEvent &&
        !loading &&
        !fetchError && (
          <div className="text-center mt-4">No registrations found</div>
        )
      )}
    </div>
  );
}

export default GetRegistrations;
