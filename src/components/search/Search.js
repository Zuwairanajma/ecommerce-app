import React from 'react';
import { BiSearch } from 'react-icons/bi';
import PropTypes from 'prop-types';
import styles from './Search.module.scss';

const Search = ({ value, onChange }) => (
  <div className={styles.search}>
    <BiSearch size={18} className={styles.icon} />

    <input
      type="text"
      placeholder="Search by name"
      value={value}
      onChange={onChange}
    />
  </div>
);
// Define prop types for the Search component
Search.propTypes = {
  value: PropTypes.string.isRequired, // value should be a required string
  onChange: PropTypes.func.isRequired, // onChange should be a required function
};

export default Search;
