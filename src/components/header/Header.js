import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/config';
import styles from './Header.module.scss';
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink';
import { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from '../../redux/slice/cartSlice';

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e
        <span>Shop</span>
        .
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : '');

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  const navigate = useNavigate();

  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener('scroll', fixNavbar);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          }),
        );
      } else {
        setDisplayName('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout successfully.');
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  return (
    <>
      <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
          {logo}

          <nav
            className={
              showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`
                  : `${styles['nav-wrapper']}`
              }
              onClick={hideMenu}
              onKeyDown={(e) => {
                // Handle keyboard event, e.g., closing the menu on pressing Escape (key code 27)
                if (e.keyCode === 27) {
                  hideMenu();
                }
              }}
              role="button" // Add a role to make it clear it's interactive
              tabIndex={0} // Add tabIndex to make it focusable
              aria-label="Close Menu"
            />

            <ul
              onClick={hideMenu}
              onKeyDown={(e) => {
              // Handle keyboard event, e.g., (key code 13) or Escape (key code 27)
                if (e.keyCode === 13 || e.keyCode === 27) {
                  hideMenu();
                }
              }}
              role="menu" // Add a role to make it clear it's interactive
              tabIndex={0}
            >
              <li className={styles['logo-mobile']}>
                {logo}
                <FaTimes
                  size={22}
                  color="#fff"
                  onClick={hideMenu}
                  onKeyDown={(e) => {
                  // Handle keyboard event, e.g., closing the menu on pressing Escape (key code 27)
                    if (e.keyCode === 27) {
                      hideMenu();
                    }
                  }}
                  role="button" // Add a role to make it clear it's interactive
                  tabIndex={0} // Add tabIndex to make it focusable
                />
              </li>
              <li>
                <AdminOnlyLink>
                  <Link to="/admin/home">
                    <button
                      type="button"
                      className="--btn --btn-primary"
                    >
                      Admin
                    </button>
                  </Link>
                </AdminOnlyLink>
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div
              className={styles['header-right']}
              onClick={hideMenu}
              onKeyDown={(e) => {
              // Handle keyboard event, e.g., closing the menu on pressing Escape (key code 27)
                if (e.keyCode === 27) {
                  hideMenu();
                }
              }}
              role="button" // Add a role to make it clear it's interactive
              tabIndex={0} // Add tabIndex to make it focusable
            >
              <span className={styles.links}>
                <ShowOnLogout>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogout>
                <ShowOnLogin>
                  <a href="#home" style={{ color: '#ff7722' }}>
                    <FaUserCircle size={16} />
                    Hi,
                    {' '}
                    {displayName}
                  </a>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink to="/" onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowOnLogin>
              </span>
              {cart}
            </div>
          </nav>

          <div className={styles['menu-icon']}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  // Define PropTypes for the Header component if needed
};

export default Header;
