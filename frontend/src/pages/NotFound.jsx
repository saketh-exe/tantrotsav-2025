import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../assets/404.png';

function Failed() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-500 to-pink-600 text-white">
      <div className="relative w-2/5 h-80 mb-8">
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <img src={NotFoundImage} alt="Not Found" />
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-4">You Seem Lost!</h1>
      <p className="text-lg mb-6 text-center">
        Let's get you back on track.
      </p>
      <div className="flex space-x-4">
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
