const Hero = () => {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('click');
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
      </div>
    </div>
  );
};

export default Hero;
