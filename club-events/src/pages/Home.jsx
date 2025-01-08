import { Link, useNavigate } from 'react-router-dom';
import { useRole } from '../RoleContext';

function Home() {
  const { role, logout } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clears role and removes the cookie
    navigate('/login');
  };

  return (
    <div className="">
      <div className="flex items-center gap-7">
        {role && (
          <>
            {role === 'admin' && (
              <>
              <Link
                  to="/add-user"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Create User
                </Link>
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
                
              </>
            )}
            {(role === 'admin' || role === 'club') && (
              <Link
                to="/get-registrations"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Get Registrations
              </Link>
            )}
          </>
        )}
        {!role ? (
          <Link
            to="/login"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
