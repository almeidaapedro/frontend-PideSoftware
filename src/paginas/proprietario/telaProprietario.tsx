import React from 'react';
import NotificacaoProprietario from './notificacaoProprietario';




const TelaProprietario: React.FC = () => {
  const reservas = [
    { usuario: "Pedro Almeida", data: "05/11/2024", horario: "19:40" },
    // Adicione mais reservas conforme necessário
  ];

  return (
    <div className='font-bold'>
      <NotificacaoProprietario reservas={reservas} quadra={'Quadra Lauro Gomes'} usuarioProprietario={'Steve Jobs'} localizacao={'São Bernardo do Campo'} />
    </div>
  );
};

export default TelaProprietario;
