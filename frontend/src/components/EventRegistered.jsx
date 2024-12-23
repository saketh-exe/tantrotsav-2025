import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function EventRegistered({ event }) {
  return (
    <div className="w-[250px] h-[350px] bg-white border-2 border-[#323232] rounded-[5px] shadow-[4px_4px_#323232] flex flex-col justify-start p-[20px] gap-[10px] hover:scale-105 duration-200">
      <div className="transition-all duration-500 flex justify-center">
        {/* Card Image with fixed size */}
        <div className="w-full h-[120px] relative border-2 rounded-md border-black bg-gradient-to-t from-transparent to-[rgba(0,0,0,0.3)]">
          <img
            src={event.thumbnail || '/default-thumbnail.jpg'}
            alt={event.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-[20px] font-bold text-black hover:text-[#1d4ed8] transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-[14px] max-w-[200px] font-normal text-[#4a4a4a] truncate">
          {event.description}
        </p>

        <div className="mt-[10px] text-[14px] text-[#323232] flex flex-col items-center gap-[5px]">
          <p className="text-sm">
            <strong className="text-[#000000]">Time:</strong>{' '}
            <span className="text-black">{event.time}</span>
          </p>
          <p className="text-sm">
            <strong className="text-[#000000]">Date:</strong>{' '}
            <span className="text-black">
              {new Date(event.date).toLocaleDateString()}
            </span>
          </p>
        </div>
        <Link
          to={`/events/${event._id}`}
          className="p-2 rounded-md w-full bg-[#000000] text-white text-center mt-[10px] hover:bg-[#ffffff] transition-colors duration-300 hover:text-black border border-black"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

EventRegistered.propTypes = {
  event: PropTypes.shape({
    thumbnail: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired, // Event time added
    capacity: PropTypes.number.isRequired,
    registrationFee: PropTypes.number, // Added for registration fee
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventRegistered;
