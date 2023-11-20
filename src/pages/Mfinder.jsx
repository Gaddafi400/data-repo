import { useState, useEffect, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  Select,
  Navbar,
  Footer,
  Map,
  FinderSidebar,
  Loading,
} from '../components';

import { customFetchMarket, daysOfWeek, capitalizeFirstLetter } from '../utils';

export const loader = async () => {
  const url = '/guest';
  try {
    const response = await customFetchMarket(url);
    const responseData = await response.data.data;
    return { initialData: responseData };
  } catch (error) {
    return error;
  }
};

const Mfinder = () => {
  const { initialData } = useLoaderData();
  const [loading, setLoading] = useState(false);
  const dataSectionRef = useRef(null);
  const [states, setStates] = useState([]);
  const [localGovernments, setLocalGovernments] = useState([]);
  const [towns, setTowns] = useState([]);
  const [commodities, setCommodities] = useState(initialData?.commodities);
  const [markets, setMarkets] = useState(initialData?.markets);
  const [defaultLonLat, setDefaultLonLat] = useState({});

  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedDay, setSelectedDay] = useState(''); // active days

  // scroll to result
  useEffect(() => {
    if (!loading && dataSectionRef.current) {
      dataSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [loading]);

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
    if (selectedState) {
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
    }
  }, [selectedState]);

  // get towns
  useEffect(() => {
    if (selectedState && selectedLGA) {
      const townUrl = `/guest/states/${selectedState}/lgas/${selectedLGA}/towns`;
      customFetchMarket
        .get(townUrl)
        .then((response) => {
          setTowns(response.data?.data);
        })
        .catch((error) => {
          console.error('Error fetching local government options:', error);
        });
    }
  }, [selectedState, selectedLGA]);

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setLocalGovernments([]);
    setTowns([]);
  };

  const handleLGAChange = (e) => {
    setSelectedLGA(e.target.value);
    setTowns([]);
  };

  const handleTownChange = (e) => {
    setSelectedTown(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = '/guest/';
    const params = {
      state: selectedState,
      town: selectedTown,
      lga: selectedLGA,
    };

    try {
      const response = await customFetchMarket.get(url, { params });
      const { commodities, markets } = response.data.data;
      setMarkets(markets);
      setCommodities(commodities);
      setDefaultLonLat({
        lat: parseFloat(response.data.data.default?.latitude),
        lng: parseFloat(response.data.data.default?.longitude),
      });
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  // Active days
  const handleDayChange = async (e) => {
    e.preventDefault();
    setSelectedDay(e.target.value);
    setLoading(true);
    const url = '/guest/';
    const params = {
      state: selectedState,
      town: selectedTown,
      lga: selectedLGA,
      activeDay: selectedDay,
    };

    try {
      const response = await customFetchMarket.get(url, { params });
      console.log(response.data.data);
      const { commodities, markets } = response.data.data;
      setMarkets(markets);
      setCommodities(commodities);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleActiveToday = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const currentDay = daysOfWeek[currentDate.getDay()];
    const url = '/guest/';
    setLoading(true);
    const params = {
      state: selectedState,
      town: selectedTown,
      lga: selectedLGA,
      activeDay: currentDay,
    };

    try {
      const response = await customFetchMarket.get(url, { params });
      console.log(response.data.data);
      const { commodities, markets } = response.data.data;
      setMarkets(markets);
      setCommodities(commodities);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  // Update markets
  const updateMarkets = (markets) => {
    setMarkets(markets);
  };

  return (
    <>
      <Navbar isMarketFinder={true} />
      <div className="mfinder-hero">
        <div className="mfinder-form-container">
          <h1 className=" text-white font-medium sm:text-center text-3xl xl:text-5xl">
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
              className="w-full  bg-footer rounded-lg  text-white"
            >
              Steady search
            </button>
          </form>
        </div>
      </div>
      {/* Other components  */}
      <div ref={dataSectionRef} className="m-data-section-container px-2">
        <div className="m-data-section-header w-full xx:w-[1518px] flex flex-col sm:flex-row gap-4 md:gap-11">
          <button
            type="button"
            onClick={handleActiveToday}
            className="bg-footer  text-white rounded-3xl"
          >
            Active Today
          </button>

          <form className="w-full sm:w-[250px]">
            <div>
              <select
                className="mb-3 bg-white border border-gray-300 text-slate-800 text-sm  focus:ring-primary-500 focus:border-primary-500 block w-full p-3 pl-6 rounded-3xl"
                id="activedays"
                name="activedays"
                value={selectedDay}
                onChange={handleDayChange}
                placeholder="Select a state"
              >
                <option value="" disabled>
                  Select an active day
                </option>
                {daysOfWeek.map((day, index) => (
                  <option key={index} value={day}>
                    {capitalizeFirstLetter(day)}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <section className="m-data-section w-full xx:w-[1518px] rounded-[30px] p-6">
            <Map markets={markets} defaultLonLat={defaultLonLat} />
            <FinderSidebar
              items={commodities}
              updateMarkets={updateMarkets}
              paramsObj={{
                state: selectedState,
                town: selectedTown,
                lga: selectedLGA,
                selectedDay: selectedDay,
              }}
            />
          </section>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Mfinder;
