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
    <div className="w-full mx-auto px-8 pt-24 pb-4 bg-gray-900 min-h-screen">
      <button className='text-white py-2 px-3 bg-slate-700 w-fit mb-4 rounded-lg hover:bg-white hover:text-violet-600'
      onClick={()=> {window.location.href = '/events';}}>
        Back
      </button>
      <h2 className="text-3xl font-bold text-gray-200 mb-6 w-full text-center">{event.title}</h2>
     { <img
        src={event.thumbnail || '/default-thumbnail.jpg'}
        
        alt={event.title}
        className="w-full h-[30rem] rounded-lg mb-12  object-contain"
      />}
      <strong className='text-white text-2xl'>Description :</strong>
      <p className="text-gray-300 mb-4 mt-2 text-justify">{event.description}</p>
      
      <p className="text-xl text-gray-200">
        <strong className='text-2xl'>Date: </strong>
        {new Date(event.date).toLocaleDateString()}
      </p>
      <p className="text-xl text-gray-200">
        <strong className='text-2xl mr-2'>Time: </strong>
        {event.time}
      </p>
      <p className="text-xl text-gray-200">
        <strong className='text-2xl mr-2'>Location: </strong>
        {event.location}
      </p>
      
      <div className='flex justify-between align-middle flex-wrap mt-4'>
      {event.registrationFee && (
        <div className='flex align-bottom mt-2 gap-4'>
        <strong className='text-2xl text-gray-200'>Registration Fee: </strong>
        <div className="text-2xl font-medium text-green-200 ">
          {event.registrationFee} INR
        </div>
        </div>
      )}
      
      { event.documents && (
        <a href={event.documents} target="_blank">
          <button className="block text-center bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition ">
            Download Documents
          </button>
        </a>
      )}

      </div>
      
    </div>
  );
}
export default EventDetails;
