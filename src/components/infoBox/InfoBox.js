// import React from 'react';
// import Card from '../card/Card';
// import styles from './InfoBox.module.scss';

// const InfoBox = ({
//   cardClass, title, count, icon,
// }) => (
//   <div className={styles['info-box']}>
//     <Card cardClass={cardClass}>
//       <h4>{title}</h4>
//       <span>
//         <h3>{count}</h3>
//         {icon}
//       </span>
//     </Card>
//   </div>
// );

// export default InfoBox;

import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Card from '../card/Card';
import styles from './InfoBox.module.scss';

const InfoBox = ({
  cardClass, title, count, icon,
}) => (
  <div className={styles['info-box']}>
    <Card cardClass={cardClass}>
      <h4>{title}</h4>
      <span>
        <h3>{count}</h3>
        {icon}
      </span>
    </Card>
  </div>
);

// Define PropTypes for the component's props
InfoBox.propTypes = {
  cardClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
};

export default InfoBox;
