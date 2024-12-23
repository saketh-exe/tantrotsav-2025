import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EventDetails() {
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
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">{event.title}</h2>
      <img
        src={event.thumbnail || '/default-thumbnail.jpg'}
        alt={event.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-sm text-gray-500">
        <strong>Date: </strong>
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Time: </strong>
        {event.time}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Location: </strong>
        {event.location}
      </p>

      {event.registrationFee && (
        <p className="text-lg font-semibold text-blue-500 mt-4">
          Registration Fee: ₹{event.registrationFee}
        </p>
      )}
      {event.documents && (
        <a href={event.documents} target="_blank">
          <button className="block text-center bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition mt-4">
            Download Documents
          </button>
        </a>
      )}
    </div>
  );
}

export default EventDetails;
