import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

function Home() {
  const mapContainerStyle = {
    width: '110%',
    height: '570px',
    marginLeft: '3rem',
  };

  const center = {
    lat: -23.5505,
    lng: -46.6333,
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [mapCenter, setMapCenter] = useState(center);
  const [markers, setMarkers] = useState([]);
  const [quadras, setQuadras] = useState([]); // Lista de quadras
  const [ocupadas, setOcupadas] = useState([]); // Lista de quadras ocupadas

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

    // Validação para verificar se o termo de busca é "quadra"
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

        // Simulação de quadras ocupadas
        const quadrasOcupadas = foundPlaces.filter(quadra => quadra.name.includes('Quadra Ocupada')).map(quadra => quadra.name);
        setOcupadas(quadrasOcupadas);

        setMarkers(foundPlaces.map((place) => ({ lat: place.lat, lng: place.lng })));
        setMapCenter(foundPlaces[0]);
        setQuadras(foundPlaces); // Define a lista de quadras
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
    <>
      <div className="fundo-home">
        <div className="flex justify-center">
          <div className="container text-white">
            <div className="flex items-center justify-center py-4 mt-8">
              <h2 className="text-4xl font-bold text-center">QUAL QUADRA VOCÊ PROCURA?</h2>
            </div>
          </div>
        </div>

        <div className="flex m-16">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={15}
            >
              {markers.map((position, index) => (
                <Marker key={index} position={position} />
              ))}
            </GoogleMap>
          )}

          <div className="ml-48 flex flex-col items-center">
            <input
              type="text"
              placeholder="Digite a quadra"
              className="bg-white rounded-full p-2 border-2 border-custom-dark-blue text-black text-center w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex justify-center items-center mt-4 bg-white rounded-full border-2 border-custom-dark-blue cursor-pointer w-36">
              <button className="flex justify-center p-2 hover:underline" onClick={handleSearch}>
                Buscar
              </button>
            </div>

            {quadras.length > 0 && (
              <div className="text-white text-center mt-8">
                <h3 className="text-2xl mb-4"><strong>Quadras Disponíveis:</strong></h3>
                <ul className="overflow-y-auto max-h-40 text-sm"> 
                  {quadras.map((quadra, index) => (
                    <li key={index} className="mb-2">
                      <strong className='text-xl'>{quadra.name}</strong> - <strong>{quadra.address}</strong> -
                      <span className="ml-2">
                        <strong>{quadra.isAvailable ? "Disponível" : "Ocupada"}</strong>
                      </span>
                      <button
                        onClick={() => handleReserve(quadra)}
                        className="ml-4 p-2 bg-custom-dark-blue rounded-full text-white text-xs hover:bg-custom-dark-blue"
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
        <div className="bg-rgb(6,10,31) text-transparent">aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
    </>
  );
}

export default Home;
