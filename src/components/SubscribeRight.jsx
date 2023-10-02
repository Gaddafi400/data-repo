import { useState } from 'react';
import PropTypes from 'prop-types';

const SubscribeRight = ({ handleSubscribe }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
      setEmail(e.target.value);
    
  };

  return (
    <div className="subscribe-right rounded-lg">
      <h3 className="text-black text-[26px] font-medium">
        Get daily Data Alerts
      </h3>
      <form action="" method="post">
        <div className="form-control w-full">
          <input
            type="text"
            placeholder="Email Address"
            className="input input-bordered w-full max-w-xs mb-12"
            value={email}
            onChange={handleEmailChange}
          />
          <p className="mb-12 text-neutral-500 text-[16px] font-light">
            Receive information on daily change in data insights
          </p>
        </div>
        <button
          className="bg-footer w-full rounded-lg p-3  text-white text-[20px] font-medium"
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
