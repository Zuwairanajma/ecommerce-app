import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => (
  <div className={styles['not-found']}>
    <div>
      <h2>404</h2>
      <p>Opppppsss, page not found.</p>
      <button type="button" className="--btn">
        <Link to="/">&larr; Back To Home</Link>
      </button>
    </div>
  </div>
);

export default NotFound;
