import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuthStore from '../store/authStore';

function RouteGuard({ children }) {
  const navigate = useNavigate();
  const { user, isUserRegistered, loading } = useAuthStore((state) => state);

  useEffect(() => {
    if (!loading && user && !isUserRegistered) {
      // Redirect user to /register if they are logged in but not registered
      navigate('/register');
    }
  }, [loading, user, isUserRegistered, navigate]);

  return <>{children}</>; // Renders the children (the actual page content) if the user is authorized
}
RouteGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteGuard;
