import PropTypes from 'prop-types';

const TopSearch = ({ topSearch }) => {
  return (
    <div className="subscribe-right rounded-lg" style={{ marginTop: '6rem'}}>
      <h3 className="text-black text-[26px] font-medium">Top Search</h3>

      {topSearch.map((item, index) => (
        <p key={index} className="text-black text-[16px] font-light p-4 rounded-lg cursor-pointer bg-primary-50 ">
          {item?.name}
        </p>
      ))}
    </div>
  );
};

TopSearch.propTypes = {
  topSearch: PropTypes.array.isRequired,
};

export default TopSearch;
