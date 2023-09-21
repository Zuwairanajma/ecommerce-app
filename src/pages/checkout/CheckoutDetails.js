import { useState } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import CheckoutSummary from '../../components/checkoutSummary/CheckoutSummary';
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from '../../redux/slice/checkoutSlice';
import styles from './CheckoutDetails.module.scss';

const initialAddressState = {
  name: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
  phone: '',
};

const CheckoutDetails = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });
  const [billingAddress, setBillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    navigate('/checkout');
  };

  return (
    <section>
      <div className={`container ${styles.checkout}`}>
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <Card cardClass={styles.card}>
              <h3>Shipping Address</h3>
              <label htmlFor="recipientName">
                Recipient Name
                <input
                  type="text"
                  placeholder="Recipient Name"
                  required
                  name="name"
                  id="recipientName"
                  value={shippingAddress.name}
                  onChange={(e) => handleShipping(e)}
                />
              </label>

              <label htmlFor="addressLine">
                Address line 1
                <input
                  type="text"
                  placeholder="Address line 1"
                  required
                  name="line1"
                  id="addressLine"
                  value={shippingAddress.line1}
                  onChange={(e) => handleShipping(e)}
                />
              </label>

              <label htmlFor="addressLine2">
                Address line 2
                <input
                  type="text"
                  placeholder="Address line 2"
                  name="line2"
                  id="addressLine2"
                  value={shippingAddress.line2}
                  onChange={(e) => handleShipping(e)}
                />
              </label>
              <label htmlFor="city">
                City
                <input
                  type="text"
                  placeholder="City"
                  required
                  name="city"
                  id="city"
                  value={shippingAddress.city}
                  onChange={(e) => handleShipping(e)}
                />
              </label>

              <label htmlFor="state">
                State
                <input
                  type="text"
                  placeholder="State"
                  required
                  name="state"
                  id="state"
                  value={shippingAddress.state}
                  onChange={(e) => handleShipping(e)}
                />
              </label>

              <label htmlFor="postalCode">
                Postal code
                <input
                  type="text"
                  placeholder="Postal code"
                  required
                  name="postal_code"
                  id="postalCode"
                  value={shippingAddress.postal_code}
                  onChange={(e) => handleShipping(e)}
                />
              </label>

              {/* COUNTRY INPUT */}
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={shippingAddress.country}
                onChange={(val) => handleShipping({
                  target: {
                    name: 'country',
                    value: val,
                  },
                })}
              />
              <label htmlFor="phone">
                Phone
                <input
                  type="text"
                  placeholder="Phone"
                  required
                  name="phone"
                  id="phone"
                  value={shippingAddress.phone}
                  onChange={(e) => handleShipping(e)}
                />
              </label>

            </Card>
            {/* BILLING ADDRESS */}
            <Card cardClass={styles.card}>
              <h3>Billing Address</h3>
              <label htmlFor="recipientName">
                Recipient Name
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={billingAddress.name}
                  onChange={(e) => handleBilling(e)}
                />
              </label>

              <label htmlFor="addressLine">
                Address line 1
                <input
                  type="text"
                  placeholder="Address line 1"
                  required
                  name="line1"
                  id="addressLine"
                  value={billingAddress.line1}
                  onChange={(e) => handleBilling(e)}
                />
              </label>

              <label htmlFor="addressLine2">
                Address line 2
                <input
                  type="text"
                  placeholder="Address line 2"
                  name="line2"
                  id="addressLine2"
                  value={billingAddress.line2}
                  onChange={(e) => handleBilling(e)}
                />
              </label>

              <label htmlFor="city">
                City
                <input
                  type="text"
                  placeholder="City"
                  required
                  name="city"
                  id="city"
                  value={billingAddress.city}
                  onChange={(e) => handleBilling(e)}
                />
              </label>

              <label htmlFor="state">
                State
                <input
                  type="text"
                  placeholder="State"
                  required
                  name="state"
                  id="state"
                  value={billingAddress.state}
                  onChange={(e) => handleBilling(e)}
                />
              </label>

              <label htmlFor="postalCode">
                Postal code
                <input
                  type="text"
                  placeholder="Postal code"
                  required
                  name="postal_code"
                  id="postalCode"
                  value={billingAddress.postal_code}
                  onChange={(e) => handleBilling(e)}
                />
              </label>

              {/* COUNTRY INPUT */}
              <CountryDropdown
                className={styles.select}
                valueType="short"
                value={billingAddress.country}
                onChange={(val) => handleBilling({
                  target: {
                    name: 'country',
                    value: val,
                  },
                })}
              />
              <label htmlFor="phone">
                Phone
                <input
                  type="text"
                  placeholder="Phone"
                  required
                  name="phone"
                  id="phone"
                  value={billingAddress.phone}
                  onChange={(e) => handleBilling(e)}
                />
              </label>

              <button type="submit" className="--btn --btn-primary">
                Proceed To Checkout
              </button>
            </Card>
          </div>
          <div>
            <Card cardClass={styles.card}>
              <CheckoutSummary />
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutDetails;
