import { useRef } from 'react';
import { FaPhoneAlt, FaEnvelope, FaTwitter } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import styles from './Contact.module.scss';
import Card from '../../components/card/Card';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        'template_m03texa',
        form.current,
        'user_hKs2aRfLoozcqA28UpUyz',
      )
      .then(
        () => {
          toast.success('Message sent successfully');
        },
        (error) => {
          toast.error(error.text);
        },
      );
    e.target.reset();
  };

  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact Us</h2>
        <div className={styles.section}>
          <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  placeholder="Full Name"
                  required
                />
              </label>

              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  placeholder="Your active email"
                  required
                />
              </label>

              <label htmlFor="subject">
                Subject
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  required
                />
              </label>

              <label htmlFor="message">
                Message
                <textarea name="message" id="message" cols="30" rows="10" />
              </label>

              <button type="submit" className="--btn --btn-primary">Send Message</button>
            </Card>
          </form>

          <div className={styles.details}>
            <Card cardClass={styles.card2}>
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className={styles.icons}>
                <span>
                  <FaPhoneAlt />
                  <p>+234 9097527088</p>
                </span>
                <span>
                  <FaEnvelope />
                  <p>juwairiyyasadiq@gmail.com</p>
                </span>
                <span>
                  <GoLocation />
                  <p>Kaduna, Nigeria</p>
                </span>
                <span>
                  <FaTwitter />
                  <p>@SadiqJuwairiyya</p>
                </span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
