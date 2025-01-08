import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CreateEvent from './pages/CreateEvent';
import Home from './pages/Home';
import Logo from './assets/uniLogo.svg';
import GetRegistrations from './pages/GetRegistrations';
import UpdateEvent from './pages/UpdateEvent';
import Login from './pages/Login';
import { RoleProvider, useRole } from './RoleContext';
import AddUser from './pages/AddUser';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useRole();
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />; // Redirect unauthorized users to login
  }
  return children;
};

const App = () => {
  return (
    <RoleProvider>
      <Router>
        <div className="min-h-screen p-8 bg-gray-100 flex flex-col items-center justify-center">
          <Link to={'/'}>
            <img
              src={Logo}
              alt="University Logo"
              className="h-[100px] mt-8 mb-6"
            />
          </Link>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/create-event"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <CreateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-event"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UpdateEvent />
                </ProtectedRoute>
              }
            />
            <Route
              path="/get-registrations"
              element={
                <ProtectedRoute allowedRoles={['admin', 'club']}>
                  <GetRegistrations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-user"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AddUser />
                </ProtectedRoute>
              }
            />

          </Routes>

          <Toaster />
        </div>
      </Router>
    </RoleProvider >
  );
};

export default App;
