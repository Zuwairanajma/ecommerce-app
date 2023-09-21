import {
  doc, setDoc, Timestamp,
} from 'firebase/firestore';
import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import styles from './ChangeOrderStatus.module.scss';

// Custom validator for cartItems
// Custom validator for cartItems
function validateCartItems(propValue, key, componentName) {
  if (!(typeof propValue === 'object' || Array.isArray(propValue))) {
    return new Error(
      `Invalid prop '${key}' supplied to '${componentName}'. `
      + 'It should be either an object or an array.',
    );
  }

  // Return undefined if the prop is valid
  return undefined;
}

const ChangeOrderStatus = ({ order, id }) => {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();
    setIsLoading(true);

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };
    try {
      setDoc(doc(db, 'orders', id), orderConfig);

      setIsLoading(false);
      toast.success('Order status changes successfully');
      navigate('/admin/orders');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Order Placed...">Order Placed...</option>
                <option value="Processing...">Processing...</option>
                <option value="Shipped...">Shipped...</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

// Add prop type validations for order and id
ChangeOrderStatus.propTypes = {
  order: PropTypes.shape({
    userID: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    orderDate: PropTypes.string.isRequired,
    orderTime: PropTypes.string.isRequired,
    orderAmount: PropTypes.number.isRequired,
    // cartItems: PropTypes.object.isRequired,
    cartItems: validateCartItems,
    shippingAddress: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default ChangeOrderStatus;
