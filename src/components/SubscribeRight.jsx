import { useState } from 'react';
import PropTypes from 'prop-types';

const SubscribeRight = ({ handleSubscribe }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="subscribe-right rounded-lg">
      <h3 className="text-black text-2xl font-medium">Get daily Data Alerts</h3>
      <form action="" method="post">
        <div className="form-control w-full">
          <input
            type="text"
            placeholder="Email Address"
            required
            className="input input-bordered w-full max-w-xs mb-6  focus:ring-primary-500 focus:border-primary-500"
            value={email}
            onChange={handleEmailChange}
          />
          <p className="mb-8 text-neutral-500 text-base font-light">
            Receive information on daily change in data insights
          </p>
        </div>
        <button
          className="bg-footer w-full rounded-lg p-3 hover:bg-fth  text-white text-base font-medium"
          onClick={(e) => {
            setEmail('');
            return handleSubscribe(e, email);
          }}
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

SubscribeRight.propTypes = {
  handleSubscribe: PropTypes.func.isRequired,
};

export default SubscribeRight;
