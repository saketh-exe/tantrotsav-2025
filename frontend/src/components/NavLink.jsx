import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useScrollContext } from './ContextProvider';

function NavLink({ to, text, setIsMenuOpen ,active}) {
  const {setIsScrolled} = useScrollContext()
  const activeStyle = {
    backgroundColor : "black",
    borderRadius : "6px",
    color:"white"
  }
  return (
    <Link
      to={to}
      style={active?activeStyle:{}}
      className="group relative flex items-center"
      onClick={() => {setIsMenuOpen(false)
        setIsScrolled(false)
      }}
    >
      <span className="hover:text-[#ffffff] transition-all duration-300 hover:bg-black p-2 rounded-md font-[500] ">
        {text}
      </span>
      <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-[#000000] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  setIsMenuOpen: PropTypes.func,
};

export default NavLink;
