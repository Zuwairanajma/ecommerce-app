import { Link } from 'react-router-dom';

const CheckoutSuccess = () => (
  <section>
    <div className="container">
      <h2>Checkout Successful</h2>
      <p>Thank you for your purchase</p>
      <br />

      <button type="submit" className="--btn --btn-primary">
        <Link to="/order-history">View Order Status</Link>
      </button>
    </div>
  </section>
);

export default CheckoutSuccess;
