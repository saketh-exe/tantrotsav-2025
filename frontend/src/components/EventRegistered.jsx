import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import place from '../assets/loads.gif';

function EventRegistered({ event }) {
  return (
    <div className="w-[300px] h-[420px] rounded-[12px] flex flex-col justify-between pb-[14px] px-2 pt-2 gap-[10px] hover:scale-105 duration-200 bg-white bg-opacity-15 backdrop-filter backdrop-blur-sm border-opacity-45 border border-white">
      <div className="transition-all duration-500 flex justify-center">
        <div className="w-full h-[180px] relative border-2 rounded-md border-white bg-gradient-to-t from-transparent to-[rgba(0,0,0,0.5)] border-opacity-50">
          <Link to={`/events/${event._id}`}>
            <LazyLoadImage
              src={event.thumbnail || '/default-thumbnail.jpg'}
              alt={event.title}
              effect
              width="100%"
              placeholderSrc={place}
              height="100%"
              className="w-full h-full object-cover rounded-md select-none"
              style={{ objectPosition: '0px -30px' }}
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Link to={`/events/${event._id}`}>
          <h3 className="text-[20px] font-bold text-white transition-colors duration-300 mt-1 line-clamp-1">
            {event.title}
          </h3>
        </Link>
        <p className="text-center text-[14px] max-w-[240px] font-normal text-[#d6d6d6] line-clamp-3">
          {event.description}
        </p>

        <div className="mt-[10px] text-[14px] text-gray-200 flex flex-col items-center gap-[5px]">
          {event.date && (
            <p className="text-sm">
              <strong className="text-white">Date:</strong>{' '}
              <span className="text-gray-100">
                {(() => {
                  let formattedDate = new Date(event.date)
                    .toLocaleDateString('en-GB')
                    .slice(0, 2);
                  return formattedDate === '28'
                    ? '29th & 30th Jan'
                    : `${formattedDate}th Jan`;
                })()}
              </span>
            </p>
          )}
          <p className="text-sm">
            <strong className="text-white">Time:</strong>{' '}
            <span className="text-gray-100">
              {event.time}
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-2 justify-between">
        <Link
          to={`/events/${event._id}`}
          className="text-xs py-[8px] px-[10px] w-full bg-black text-white font-medium text-center rounded-[5px] hover:bg-white hover:text-black border-2 border-white hover:border-white transition-colors duration-300"
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