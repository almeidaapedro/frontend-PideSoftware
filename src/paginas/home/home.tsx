import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function Home() {
  const mapContainerStyle = {
    width: '66%', // Isso é equivalente a w-2/3
    height: '500px', // Altura do mapa (ajuste conforme necessário)
    marginLeft: '3rem' // Substituindo ml-12
  };

  const center = {
    lat: -23.5505, // Exemplo de coordenadas
    lng: -46.6333,
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
          <LoadScript googleMapsApiKey="AIzaSyAXTst__t08nB_p-NVmKsjSd-yIXh2Z33Y">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={15}
            >
            </GoogleMap>
          </LoadScript>
          
          <div className="ml-48">
            <input
              type="text"
              placeholder="Digite a quadra"
              className="bg-white rounded-full p-1 border-2 border-custom-dark-blue text-black"
            />
            <div className="flex justify-center mt-4 bg-white rounded-full border-2 border-custom-dark-blue cursor-pointer">
              <button className="flex justify-center p-1 hover:underline">Buscar</button>
            </div>
          </div>
        </div>
        
        <div className="bg-rgb(6,10,31) text-transparent">aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
      </div>
    </>
  );
}

export default Home;
