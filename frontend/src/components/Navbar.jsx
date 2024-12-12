import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../assets/uniLogo.svg';
import useAuthStore from '../store/authStore';
import Logout from './Logout';
import NavLink from './NavLink';
import Register from './Register';
import SignIn from './SignIn';

function Navbar() {
  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b p-3 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img src={Logo} alt="Logo" className="lg:h-10 h-6" />
        </div>

        {/* Navigation Links (Responsive) */}
        <div
          className={`fixed top-0 left-0 h-full w-3/4 max-w-sm bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-r-lg transform transition-transform duration-500 ease-in-out z-50 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:static lg:block lg:w-auto lg:translate-x-0 lg:rounded-none lg:shadow-none`}
        >
          <div className="flex flex-col lg:flex-row lg:gap-8 p-6 lg:p-0 h-full">
            <NavLink to="/" text="Home" setIsMenuOpen={setIsMenuOpen} />
            {user ? (
              <NavLink
                to="/profile"
                text="Profile"
                setIsMenuOpen={setIsMenuOpen}
              />
            ) : null}
            <NavLink to="/events" text="Events" setIsMenuOpen={setIsMenuOpen} />
            <NavLink
              to="/gallery"
              text="Gallery"
              setIsMenuOpen={setIsMenuOpen}
            />
            <NavLink
              to="/support"
              text="Support"
              setIsMenuOpen={setIsMenuOpen}
            />
            {!user && (
              <div className="flex flex-col gap-4 mt-6 lg:hidden">
                <Register />
                <SignIn />
              </div>
            )}
          </div>
        </div>

        {/* Cart and Profile Section */}
        <div className="flex items-center gap-4 lg:gap-4 z-40">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to={'/cart'} className="relative">
                <FaShoppingCart className="h-6 w-6 text-gray-700 cursor-pointer" />
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {user?.cart?.length || 0}
                </span>
              </Link>
              <img
                src={user.profileImage || user.photoURL}
                alt="Profile"
                className="h-8 w-8 rounded-full hidden lg:block"
                referrerPolicy="no-referrer"
              />
              <Logout />
            </div>
          ) : (
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <Register />
              <SignIn />
            </div>
          )}
          {/* Hamburger Icon */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
