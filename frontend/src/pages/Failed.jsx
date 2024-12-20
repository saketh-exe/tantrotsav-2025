import { useNavigate } from 'react-router-dom';

function Failed() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-500 to-pink-600 text-white">
      <div className="relative w-36 h-36 mb-8">
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="150"
            height="150"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-red-100 fill-none stroke-[6] opacity-50"
            />
            <line
              x1="35"
              y1="35"
              x2="65"
              y2="65"
              className="stroke-white stroke-[6] stroke-linecap-round"
            />
            <line
              x1="65"
              y1="35"
              x2="35"
              y2="65"
              className="stroke-white stroke-[6] stroke-linecap-round"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">Failed!</h1>
      <p className="text-lg mb-6 text-center">
        Something went wrong. Please try again.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/cart')}
          className="px-6 py-3 bg-white text-red-600 font-medium rounded-lg shadow-md hover:bg-red-100 transition-all duration-300"
        >
          Retry
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-white text-red-600 font-medium rounded-lg shadow-md hover:bg-red-100 transition-all duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Failed;
