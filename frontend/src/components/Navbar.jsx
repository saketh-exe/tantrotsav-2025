import Logo from '../assets/uniLogo.svg';
import useAuthStore from '../store/authStore';
import Logout from './Logout';
import NavLink from './NavLink';
import Register from './Register';
import SignIn from './SignIn';

function Navbar() {
  const { user } = useAuthStore();
  return (
    <nav className="sticky top-0 z-50 bg-white border-b p-3 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-[70px]">
          <img src={Logo} alt="Logo" className="h-10" />
          <div className="flex items-center gap-[40px]">
            <NavLink to="/" text="Home" />
            {user ? <NavLink to="/profile" text="Profile" /> : null}
            <NavLink to="/events" text="Events" />
            <NavLink to="/gallery" text="Gallery" />
            <NavLink to="/support" text="Support" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <img
                src={user.photoURL}
                alt="Profile"
                className="h-8 w-8 rounded-full"
                referrerPolicy="no-referrer"
              />
              <Logout />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Register />
              <SignIn />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
