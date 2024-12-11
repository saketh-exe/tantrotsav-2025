function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
      <div className="text-center px-6 max-w-2xl">
        <h2 className="text-4xl sm:text-6xl font-extrabold mb-6">
          Welcome to <span className="text-yellow-300">Tantrotsav</span>
        </h2>
        <p className="text-lg sm:text-xl mb-8">
          Celebrate the spirit of creativity and innovation with us. Join the
          festivities and experience the extraordinary!
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-yellow-300 text-red-600 font-semibold rounded-full shadow-md hover:bg-yellow-400 transition-all duration-300">
            Explore Events
          </button>
          <button className="px-6 py-3 bg-white text-red-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300">
            About Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
