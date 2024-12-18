import { useState, useEffect } from 'react';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateEvent() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    documents: '',
    clubName: '',
    thumbnail: '',
    registrationFee: 0,
  });

  // Handle form cancellation
  const handleCancel = () => {
    setSelectedEvent(null);
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      documents: '',
      clubName: '',
      thumbnail: '',
      registrationFee: 0,
    });
  };

  const clubNames = [
    'Tech Club',
    'Science Club',
    'Art Club',
    'Music Club',
    'Literature Club',
    'Sports Club',
    'Drama Club',
  ];

  // Fetch events for selection
  useEffect(() => {
    async function fetchEvents() {
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
    }
    fetchEvents();
  }, []);

  // Handle event selection
  const handleEventSelect = async (selectedOption) => {
    setSelectedEvent(selectedOption);
    console.log('Selected Event:', selectedOption);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/${selectedOption.value}`
      );
      const eventData = response.data;

      // Format the date to YYYY-MM-DD
      if (eventData.date) {
        const formattedDate = new Date(eventData.date)
          .toISOString()
          .split('T')[0];
        eventData.date = formattedDate;
      }

      setFormData(eventData);
    } catch (error) {
      console.error('Error fetching event details:', error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/events/${selectedEvent.value}`,
        formData
      );
      alert('Event updated successfully!');
      console.log('Updated Event:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl m-3 w-full mx-auto bg-white p-8 rounded-xl shadow-md mb-6">
      <h2 className="text-2xl font-bold text-center mb-6">Update Event</h2>
      <div className="mb-6">
        <label
          htmlFor="eventSelect"
          className="block text-sm font-semibold text-gray-700"
        >
          Select an Event to Update
        </label>
        <Select
          id="eventSelect"
          options={events}
          value={selectedEvent}
          onChange={handleEventSelect}
          className="mt-2"
          placeholder="Select an Event"
        />
      </div>
      {selectedEvent && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700"
            >
              Event Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-semibold text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-semibold text-gray-700"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Capacity */}
          <div>
            <label
              htmlFor="capacity"
              className="block text-sm font-semibold text-gray-700"
            >
              Capacity
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Documents */}
          <div>
            <label
              htmlFor="documents"
              className="block text-sm font-semibold text-gray-700"
            >
              Documents
            </label>
            <input
              type="text"
              id="documents"
              name="documents"
              value={formData.documents}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Club Name */}
          <div>
            <label
              htmlFor="clubName"
              className="block text-sm font-semibold text-gray-700"
            >
              Club Name
            </label>
            <select
              id="clubName"
              name="clubName"
              value={formData.clubName}
              onChange={handleChange}
              required
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a Club</option>
              {clubNames.map((club, index) => (
                <option key={index} value={club}>
                  {club}
                </option>
              ))}
            </select>
          </div>
          {/* Thumbnail */}
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-semibold text-gray-700"
            >
              Thumbnail URL
            </label>
            <input
              type="text"
              id="thumbnail"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Registration Fee */}
          <div>
            <label
              htmlFor="registrationFee"
              className="block text-sm font-semibold text-gray-700"
            >
              Registration Fee
            </label>
            <input
              type="number"
              id="registrationFee"
              name="registrationFee"
              value={formData.registrationFee}
              onChange={handleChange}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="mt-4 py-3 px-6 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Event
            </button>
            <button
              onClick={handleCancel}
              className="mt-4 py-3 px-6 bg-red-500 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default UpdateEvent;
