import { Navbar, Heading, Footer } from '../components';

const Mfinder = () => {
  return (
    <>
      <Navbar />
      <div className="mfinder-hero">
        <div className="w-full xx:w-[1518px] flex items-center xl:px-20 px-6  align-element heading">
          <Heading text="Home" />
          <Heading text="Data Sets" />
          <Heading text={'Markets'} />
        </div>

        <div className="mfinder-form-container">
          <h1 className=" text-white font-medium text-center">
            Find Local Markets and Commodities in Nigeria
          </h1>
          <form action="" className="mfinder-form">
            <select
              id="large"
              className="block px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option selected>Select a state</option>
              <option value="US">Abuja</option>
              <option value="CA">Lagos</option>
              <option value="FR">Adamawa</option>
              <option value="DE">Germany</option>
            </select>

            <select
              id="large"
              className="block px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option selected>Select LGA</option>
              <option value="US">Yola</option>
              <option value="CA">Mubi</option>
              <option value="FR">Song</option>
              <option value="DE">Mubi North</option>
            </select>
            <select
              id="large"
              className="block  px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            >
              <option selected>Select town</option>
              <option value="US">Mubi</option>
              <option value="CA">Gela</option>
              <option value="FR">Jimeta</option>
            </select>

            <button className="w-full  bg-fth rounded-lg  text-white  ">
              Steady search
            </button>
          </form>
        </div>
      </div>

      <div className="data-section-container px-2">
        <section className="data-section w-full xx:w-[1518px] rounded-[30px] p-6"></section>
      </div>

      <Footer />
    </>
  );
};

export default Mfinder;
