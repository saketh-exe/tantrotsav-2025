import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import Logout from "./Logout";
import NavLink from "./NavLink";
import Register from "./Register";
import { useNavigate, useLocation } from "react-router-dom";
import Logos from "./Logos";
import { useScrollContext } from "./ContextProvider";


function Navbar() {

  const { user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { issScrolled } = useScrollContext();
  const [scrolled, setscrolled] = useState(issScrolled);
  
  

  useEffect(() => {
    setscrolled(issScrolled);
    
  }, [issScrolled]);

  const sstyle = {
  
    top: 0,
    // left: "50%",
    // transform: "translateX(-50%)",
    // transformOrigin: "top center",
    width: "75%",
    padding: "10px 5px",
 
    color: "black",
    borderRadius: "50px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    marginTop: "10px",
  };

  const norm = {
    
    top: 0,
    left: 0,
    transform: "none",
    transformOrigin: "top left",
    width: "100%",
    padding: "10px 20px",
   
    color: "black",
    borderRadius: "0",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  };

  return (
    <div className="flex justify-center items-center w-full  z-50 fixed top-0 h-fit">
<nav
      className="flex justify-evenly items-center overflow-x-hidden  h-16 w-full  md:justify-around bg-slate-100 bg-opacity-85"
      style={scrolled ? sstyle : norm}
    >
      {/* Logo */}
      <Logos />

      {/* Navigation Links */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-sm bg-transparent shadow-lg rounded-r-lg transform transition-transform duration-500 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:block md:w-auto md:translate-x-0 md:rounded-none md:shadow-none`}
      >
        <div className={`flex flex-col md:flex-row md:gap-4 p-6 md:p-0 h-full ${isMenuOpen? "bg-white":"bg-transparent"}`}>
          <NavLink to="/" text="Home" setIsMenuOpen={setIsMenuOpen} active={pathname === "/"} />
          <NavLink to="/events" text="Events" setIsMenuOpen={setIsMenuOpen} active={pathname === "/events"} />
          <NavLink to="/gallery" text="Gallery" setIsMenuOpen={setIsMenuOpen} active={pathname === "/gallery"} />
          <NavLink
            to="/support"
            text="Services"
            setIsMenuOpen={setIsMenuOpen}
            active={pathname === "/support"}
          />
          {user ? (
            <NavLink
              to="/profile"
              text="Profile"
              setIsMenuOpen={setIsMenuOpen}
              active={pathname === "/profile"}
            />
          ) : null}
          {!user && (
            <div className="flex flex-col gap-4 mt-6 md:hidden">
              <Register />
            </div>
          )}
        </div>
      </div>

      {/* Cart and Profile Section */}
      <div className="flex items-center gap-4 md:gap-4 z-40">
        {user ? (
          <div className="flex items-center gap-2 md:gap-4">
            {<Link to={"/cart"} className="relative">
              <FaShoppingCart className="h-6 w-6 text-gray-700 hover:scale-125 transition-transform duration-200" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {user?.cart?.length || 0}
              </span>
            </Link>}
            <button className="hover:p-1 hover:bg-black focus:p-1 focus:bg-black rounded-3xl transition-all ease-in-out">
              <img
                src={user.profileImage || user.photoURL}
                alt="Profile"
                className="h-8 w-8 rounded-full hidden md:block"
                referrerPolicy="no-referrer"
                onClick={() => {
                  navigate("/profile");
                }}
              />
            </button>

            <Logout />
          </div>
        ) : (
          <div className="hidden md:flex md:items-center md:gap-4">
            <Register />
          </div>
        )}
        {/* Hamburger Icon */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            setscrolled(false);
          }}
        >
          {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>
    </nav>
    </div>
    
  );
}

export default Navbar;
