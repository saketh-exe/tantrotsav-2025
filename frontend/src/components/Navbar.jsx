import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

import NavLink from "./NavLink";
import Register from "./Register";
import { useNavigate, useLocation } from "react-router-dom";
import Logos from "./Logos";
import { useScrollContext } from "./ContextProvider";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { issScrolled , setIsScrolled } = useScrollContext();
  const [scrolled, setscrolled] = useState(issScrolled);
  
  useEffect(() => {
    setscrolled(issScrolled);
  }, [issScrolled]);

  const sstyle = {
    width: "75%",
    padding: "10px 5px",
    borderRadius: "24px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    transition: "all 0.3s ease",
    marginTop: "10px",
  };

  const norm = {
    width: "100%",
    padding: "10px 20px",
    borderRadius: "0",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
  };

  if (pathname === "/") {
    return <></>;
  }

  return (
    <div className="flex justify-center items-center w-full z-50 fixed top-0 h-fit">
      <nav
        className="flex justify-evenly items-center overflow-x-hidden h-16 w-full md:justify-around bg-slate-100 bg-opacity-85 text-black"
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
          <div className={`flex flex-col md:flex-row md:gap-4 p-6 md:p-0 h-full ${isMenuOpen ? "bg-white" : "bg-transparent"}`}>
            <NavLink to="/" text="Home" setIsMenuOpen={setIsMenuOpen} active={pathname === "/"} />
            <NavLink to="/events" text="Events" setIsMenuOpen={setIsMenuOpen} active={pathname === "/events"} />
            <NavLink to="/gallery" text="Gallery" setIsMenuOpen={setIsMenuOpen} active={pathname === "/gallery"} />
            {false ? (
              <NavLink
                to="/profile"
                text="Profile"
                setIsMenuOpen={setIsMenuOpen}
                active={pathname === "/profile"}
              />
            ) : null}
            {!false && (
              <div className="flex flex-col gap-4 mt-6 md:hidden">
                <Register />
              </div>
            )}
          </div>
        </div>

        {/* Cart and Profile Section */}
        <div className="flex items-center gap-4 md:gap-4 z-40">
          {false ? (
            <div className="flex items-center gap-2 md:gap-4">
              <button className="hover:p-1 hover:bg-black focus:p-1 focus:bg-black rounded-3xl transition-all ease-in-out">
                <img
                  src={"/path/to/default/image.jpg"} // Placeholder for profile image
                  alt="Profile"
                  className="h-8 w-8 rounded-full hidden md:block"
                  referrerPolicy="no-referrer"
                  onClick={() => {
                    setIsScrolled(false);
                    navigate("/profile");
                  }}
                />
              </button>
          
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
