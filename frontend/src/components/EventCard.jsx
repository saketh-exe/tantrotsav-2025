import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
      <img
        src={event.thumbnail || '/default-thumbnail.jpg'}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
        <p className="text-sm text-gray-600 mt-2">{event.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()}
          </span>
          <span className="text-sm text-gray-500">{event.capacity} slots</span>
        </div>
        {event.registrationFee && (
          <div className="mt-2">
            <span className="text-lg font-semibold text-blue-500">
              ₹{event.registrationFee}
            </span>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <Link
            to={`/events/${event._id}`}
            className="block text-center bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition"
          >
            View Details
          </Link>
          <button
            onClick={() => alert('Event added to cart')}
            className="block text-center bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    capacity: PropTypes.number.isRequired,
    registrationFee: PropTypes.number, // Added for registration fee
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
