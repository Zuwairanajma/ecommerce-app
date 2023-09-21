import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; // Import PropTypes
import { selectIsLoggedIn } from '../../redux/slice/authSlice';

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};
// Define PropTypes for the children prop
ShowOnLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};
// Define PropTypes for the children prop
ShowOnLogout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShowOnLogin;
