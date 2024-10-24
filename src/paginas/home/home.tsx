import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useState } from 'react';

function Home() {
  const mapContainerStyle = {
    width: '66%',
    height: '500px',
    marginLeft: '3rem',
  };

  const center = {
    lat: -23.5505, // Coordenadas iniciais
    lng: -46.6333,
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [mapCenter, setMapCenter] = useState(center);
  const [markers, setMarkers] = useState([]);

  const handleSearch = () => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      query: searchTerm,
      location: mapCenter,
      radius: '1000',
    };

    service.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const foundPlaces = results.map((place) => ({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }));
        setMarkers(foundPlaces);
        setMapCenter(foundPlaces[0]); // Centraliza o mapa no primeiro resultado
      } else {
        alert('Nenhuma quadra encontrada.');
      }
    });
  };

  return (
    <>
      <div className="fundo-tela">
        <div className="flex justify-center">
          <div className="container grid grid-cols-2 text-white">
            <div className="flex flex-col gap-4 items-center justify-center py-4 mt-8">
              <h2 className="text-6xl font-bold ml-16">Qual quadra você procura?</h2>
            </div>
          </div>
        </div>
        
        <div className="flex m-16">
          <LoadScript googleMapsApiKey="AIzaSyAXTst__t08nB_p-NVmKsjSd-yIXh2Z33Y" libraries={['places']}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={15}
            >
              {markers.map((position, index) => (
                <Marker key={index} position={position} />
              ))}
            </GoogleMap>
          </LoadScript>

          <div className="ml-48">
            <input
              type="text"
              placeholder="Digite a quadra"
              className="bg-white rounded-full p-1 border-2 border-custom-dark-blue text-black text-center"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex justify-center align-items mt-4 bg-white rounded-full border-2 border-custom-dark-blue cursor-pointer w-24">
              <button className="flex justify-center p-1 hover:underline" onClick={handleSearch}>
                Buscar
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-rgb(6,10,31) text-transparent">aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
    </>
  );
}

export default Home;
