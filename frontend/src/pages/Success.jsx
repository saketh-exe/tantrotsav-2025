import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Successful | Tantrotsav - Amrita Vishwa Vidyapeetham";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-teal-500 text-white">
      <div className="animate-bounce mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width="150"
          height="150"
          className="text-white"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            className="stroke-white fill-none stroke-[6] opacity-75"
          />
          <path
            d="M30 50l15 15 25-30"
            className="stroke-white fill-none stroke-[6] stroke-linecap-round stroke-linejoin-round"
          />
        </svg>
      </div>
      <h1 className="text-4xl font-bold mb-4">Success!</h1>
      <p className="text-lg mb-6 text-center">
        Your action was completed successfully.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-white text-green-600 font-medium rounded-lg shadow-md hover:bg-green-100 transition-all duration-300"
      >
        Go to Home
      </button>
    </div>
  );
}

export default Success;
