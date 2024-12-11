import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UserDetails from './pages/UserDetails';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserDetails />} />
          <Route path="/events" element={<Home />} />
          <Route path="/gallery" element={<Home />} />
          <Route path="/support" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Home />} />
            {/* Add other protected routes here */}
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
