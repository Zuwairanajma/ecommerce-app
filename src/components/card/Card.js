import PropTypes from 'prop-types';
import styles from './Card.module.scss';

const Card = ({ children, cardClass }) => (
  <div className={`${styles.card} ${cardClass}`}>{children}</div>
);

Card.propTypes = {
  children: PropTypes.node.isRequired,
  cardClass: PropTypes.string.isRequired,
};

export default Card;
