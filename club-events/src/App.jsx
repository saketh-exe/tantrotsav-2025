import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CreateEvent from './pages/CreateEvent';
import Home from './pages/Home';
import Logo from './assets/uniLogo.svg';
import GetRegistrations from './pages/GetRegistrations';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        {/* Center the logo */}
        <Link to={'/'}>
          <img
            src={Logo}
            alt="University Logo"
            className="h-[100px] mt-8 mb-6"
          />
        </Link>

        {/* Define routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/get-registrations" element={<GetRegistrations />} />
        </Routes>

        <Toaster />
      </div>
    </Router>
  );
};

export default App;
