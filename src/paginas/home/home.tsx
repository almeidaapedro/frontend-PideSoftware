import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

function Home() {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    margin: '0 auto',
  };

  const center = {
    lat: -23.5505,
    lng: -46.6333,
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [mapCenter, setMapCenter] = useState(center);
  const [markers, setMarkers] = useState([]);
  const [quadras, setQuadras] = useState([]); 
  const [ocupadas, setOcupadas] = useState([]); 

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyAXTst__t08nB_p-NVmKsjSd-yIXh2Z33Y',
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded) {
      setMapCenter(center);
    }
  }, [isLoaded]);

  const handleSearch = () => {
    if (!isLoaded) return;

    if (!searchTerm.toLowerCase().includes('quadra')) {
      alert('Por favor, digite uma quadra.');
      return;
    }

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
          name: place.name,
          address: place.formatted_address,
          isAvailable: Math.random() > 0.5,
        }));

        const quadrasOcupadas = foundPlaces.filter(quadra => quadra.name.includes('Quadra Ocupada')).map(quadra => quadra.name);
        setOcupadas(quadrasOcupadas);

        setMarkers(foundPlaces.map((place) => ({ lat: place.lat, lng: place.lng })));
        setMapCenter(foundPlaces[0]);
        setQuadras(foundPlaces);
      } else {
        alert('Nenhuma quadra encontrada.');
      }
    });
  };

  const handleReserve = (quadra) => {
    if (quadra.isAvailable) {
      alert(`Reserva realizada para a quadra: ${quadra.name}`);
    } else {
      alert(`A quadra ${quadra.name} está ocupada e não pode ser reservada.`);
    }
  };

  return (
    <div className="fundo-home flex flex-col items-center p-4 md:p-16">
      <div className="flex flex-col items-center text-white">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">QUAL QUADRA VOCÊ PROCURA?</h2>
      </div>

      <div className="w-full md:flex md:space-x-4 mt-4">
        {isLoaded && (
          <div className="w-full md:w-3/5">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={15}
            >
              {markers.map((position, index) => (
                <Marker key={index} position={position} />
              ))}
            </GoogleMap>
          </div>
        )}

        <div className="flex flex-col items-center w-full md:w-2/5 mt-8 md:mt-0">
          <input
            type="text"
            placeholder="Digite a quadra"
            className="bg-white rounded-full p-2 border-2 border-custom-dark-blue text-black text-center w-full max-w-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="mt-4 px-6 py-2 bg-custom-dark-blue text-white rounded-full hover:bg-blue-800"
            onClick={handleSearch}
          >
            Buscar
          </button>

          {quadras.length > 0 && (
            <div className="text-white text-center mt-8 w-full max-w-xs">
              <h3 className="text-xl md:text-2xl mb-4"><strong>Quadras Disponíveis:</strong></h3>
              <ul className="overflow-y-auto max-h-40 text-sm"> 
                {quadras.map((quadra, index) => (
                  <li key={index} className="mb-2 flex flex-col">
                    <strong className='text-base md:text-lg'>{quadra.name}</strong> 
                    <span className="text-xs md:text-sm">{quadra.address}</span>
                    <span className="text-xs md:text-sm">
                      <strong>{quadra.isAvailable ? "Disponível" : "Ocupada"}</strong>
                    </span>
                    <button
                      onClick={() => handleReserve(quadra)}
                      className="mt-2 px-3 py-1 bg-custom-dark-blue rounded-full text-white text-xs hover:bg-blue-700 w-20 text-center mx-auto"
                    >
                      <strong>Reservar</strong>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
