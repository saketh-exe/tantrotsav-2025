import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="">
      <div className="flex items-center gap-7">
        <Link
          to="/create-event"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Create Event
        </Link>
        <Link
          to="/update-event"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Update Event
        </Link>
        <Link
          to="/get-registrations"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Get Registrations
        </Link>
      </div>
    </div>
  );
}

export default Home;
