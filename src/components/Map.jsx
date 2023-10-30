import { useMemo, useState, useEffect } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

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


const MapContainer = () => {
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
        markers.map(({ id, name, position }) => (
          <Marker
            key={id}
            position={position}
            icon={'http://maps.google.com/mapfiles/ms/icons/green-dot.png'}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{name}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
    </GoogleMap>
  );
};

const Map = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyD7rfqjUrqhxFgxBsmgM68GOFsY4FCOZ-s',
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="map">
      <MapContainer />
    </div>
  );
};

export default Map;
