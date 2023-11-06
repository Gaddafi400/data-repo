import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import marketIcon from '../assets/mapIcon.svg';

const markersData = [
  {
    id: 1,
    name: 'Garki Market',
    position: { lat: 9.05785, lng: 7.49508 },
  },
  {
    id: 2,
    name: 'Wuse Market',
    position: { lat: 9.0833, lng: 7.5333 },
  },
  {
    id: 3,
    name: 'Area 11 Shopping Complex',
    position: { lat: 9.082, lng: 7.4918 },
  },
  {
    id: 4,
    name: 'Durumi Market Garki',
    position: { lat: 9.0572, lng: 7.4951 },
  },
  {
    id: 5,
    name: 'Abuja Arts and Crafts Village',
    position: { lat: 9.0811, lng: 7.4951 },
  },
  {
    id: 6,
    name: 'Abuja Aso Rock',
    position: { lat: 9.0797, lng: 7.4968 },
  },
  {
    id: 7,
    name: 'Abuja Aso Rock',
    position: { lat: 9.0797, lng: 7.4968 },
  },
  {
    id: 8,
    name: 'Abuja Central Park',
    position: { lat: 9.05785, lng: 7.49508 },
  },
  {
    id: 9,
    name: 'Abuja Jabi Lake',
    position: { lat: 9.0693, lng: 7.4141 },
  },
  {
    id: 10,
    name: 'Abuja National Mosque',
    position: { lat: 9.0833, lng: 7.5333 },
  },
];

const MapContainer = ({ markets }) => {
  const center = useMemo(() => ({ lat: 9.05785, lng: 7.49508 }), []);
  const [markers, setMarkers] = useState(markersData);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showMarkers, setShowMarkers] = useState(false);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowMarkers(true);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <GoogleMap
      zoom={13}
      center={center}
      mapContainerClassName="map-container"
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
    >
      {showMarkers &&
        markets.map((market) => {
          const { id, name, alias, longitude, latitude, commodities } = market;
          const position = {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          };

          return (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              icon={{
                url: marketIcon,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="map-profile rounded-lg p-4">
                    <h1 className="text-center font-medium text-1xl mb-2">
                      Market Profile
                    </h1>
                    <div className="bg-white rounded-lg shadow-lg p-2">
                      <div className="info-item p-2">
                        <span className="info-label">Name:</span> {name}
                      </div>
                      <div className="info-item p-2">
                        <span className="info-label">Alias:</span> {alias}
                      </div>

                      <div className="info-item p-2">
                        <span className="info-label">Commodities:</span>
                        <ul>
                          {commodities.map((commodity) => (
                            <li key={commodity.id}>
                              {commodity.name}: {commodity.price}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </InfoWindow>
              ) : null}
            </Marker>
          );
        })}
    </GoogleMap>
  );
};

MapContainer.propTypes = {
  markets: PropTypes.array,
};

const Map = ({ markets }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD7rfqjUrqhxFgxBsmgM68GOFsY4FCOZ-s',
  });

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <span className="loading loading-ring loading-xl bg-white" />
      </div>
    );

  return (
    <div className="map">
      <MapContainer markets={markets} />
    </div>
  );
};

Map.propTypes = {
  markets: PropTypes.array,
};

export default Map;
