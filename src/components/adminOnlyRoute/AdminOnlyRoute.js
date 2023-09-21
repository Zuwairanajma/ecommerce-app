import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectEmail } from '../../redux/slice/authSlice';

const AdminOnlyRoute = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === 'test@gmail.com') {
    return children;
  }
  return (
    <section style={{ height: '80vh' }}>
      <div className="container">
        <h2>Permission Denied.</h2>
        <p>This page can only be viewed by an Admin user.</p>
        <br />
        <Link to="/">
          <button className="--btn" type="button">
            &larr; Back To Home
          </button>
        </Link>
      </div>
    </section>
  );
};

// Add PropTypes validation for the children prop
AdminOnlyRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AdminOnlyLink = ({ children }) => {
  const userEmail = useSelector(selectEmail);

  if (userEmail === 'test@gmail.com') {
    return children;
  }
  return null;
};
AdminOnlyLink.propTypes = {
  children: PropTypes.node.isRequired,
};

// export default AdminOnlyLink;
export default AdminOnlyRoute;
