import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavLink({ to, text }) {
  return (
    <Link to={to} className="group relative">
      <span className="hover:text-[#C50B4C] transition-colors duration-300">
        {text}
      </span>
      <span className="absolute left-0 bottom-[-2px] h-[2px] w-0 bg-[#C50B4C] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NavLink;
