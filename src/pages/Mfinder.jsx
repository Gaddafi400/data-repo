import { useState, useEffect } from 'react';
import {
  Select,
  Navbar,
  Footer,
  Heading,
  Map,
  FinderSidebar,
} from '../components';

import { customFetchMarket } from '../utils';

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);
//   const url = '/guest/';

//   try {
//     const response = await customFetchMarket.get(url);

//     return {};
//   } catch (error) {
//     return error;
//   }
// };

const Mfinder = () => {
  const [states, setStates] = useState([]);
  const [localGovernments, setLocalGovernments] = useState([]);
  const [towns, setTowns] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [selectedTown, setSelectedTown] = useState('');

  // get states
  useEffect(() => {
    const stateUrl = '/guest/states/';

    customFetchMarket
      .get(stateUrl)
      .then((response) => {
        setLocalGovernments([]);
        setTowns([]);
        setStates(response.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching state options:', error);
      });
  }, []);

  // get local govt
  useEffect(() => {
    const localGovernmentUrl = `/guest/states/${selectedState}/lgas`;

    customFetchMarket
      .get(localGovernmentUrl)
      .then((response) => {
        setTowns([]);
        setLocalGovernments(response.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching local government options:', error);
      });
  }, [selectedState]);

  // get towns
  useEffect(() => {
    const townUrl = `/guest/states/${selectedState}/lgas/${selectedLGA}/towns`;

    customFetchMarket
      .get(townUrl)
      .then((response) => {
        setTowns(response.data?.data);
      })
      .catch((error) => {
        console.error('Error fetching local government options:', error);
      });
  }, [selectedState, selectedLGA]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const handleLGAChange = (e) => {
    setSelectedLGA(e.target.value);
  };

  const handleTownChange = (e) => {
    setSelectedTown(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const url = '/guest/';
    const params = {
      state: selectedState,
      town: selectedTown,
      lga: selectedLGA,
    };

    console.log(params);
    try {
      const response = await customFetchMarket.get(url, params);
      console.log(response);
    } catch (error) {
      return error;
    }
  };

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
          <form className="mfinder-form">
            <Select
              id="state"
              name="state"
              options={states}
              value={selectedState}
              onChange={handleStateChange}
              placeholder="Select a state"
            />
            <Select
              id="lga"
              name="lga"
              options={localGovernments}
              value={selectedLGA}
              onChange={handleLGAChange}
              placeholder="Select LGA"
            />
            <Select
              name="town"
              id="town"
              options={towns}
              value={selectedTown}
              onChange={handleTownChange}
              placeholder="Select town"
            />

            <button
              type="submit"
              onClick={handleSearch}
              className="w-full  bg-fth rounded-lg  text-white  "
            >
              Steady search
            </button>
          </form>
        </div>
      </div>
      {/* Other components and JSX */}
      <div className="data-section-container px-2">
        <section className="data-section w-full xx:w-[1518px] rounded-[30px] p-6">
          <Map />
          <FinderSidebar />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Mfinder;
