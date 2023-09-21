import React from 'react';
import styles from './Footer.module.scss';

const date = new Date();
const year = date.getFullYear();

const Footer = () => (
  <div className={styles.footer}>
    &copy;
    {year}
    {' '}
    All Rights Reserved
  </div>
);

export default Footer;
