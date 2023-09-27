import Category from './Category';

const Hero = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('click');
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className="hero">
      <div className="search-container">
        <h1>Enhancement through Data Insights</h1>
        <p>
          Comprehensive Data and Knowledge Spanning 36 States and Over 774 Local
          Government in Nigeria
        </p>

        <form className="search-form">
          <input
            className="input input-bordered rounded-xl"
            name="search"
            placeholder="Find your"
            type="text"
          />
          <button className="rounded-xl text-white" onClick={handleClick}>
            search
          </button>
        </form>
        <div className="category">
          <Category title="Population" handleClick={handleButtonClick} />
          <Category title="Mining" handleClick={handleButtonClick} />
          <Category title="Energy" handleClick={handleButtonClick} />
          <Category title="Economy" handleClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
