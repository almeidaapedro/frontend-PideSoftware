import React, { useState } from 'react';
import './notificacaoProprietario.css';
import avatarImg from '../../assets/avatar.png';

type Reserva = {
  usuario: string;
  data: string;
  horario: string;
  confirmada?: boolean | null;
};

type NotificacaoProprietarioProps = {
  usuarioProprietario: string;
  quadra: string;
  localizacao: string;
  reservas: Reserva[];
};

const NotificacaoProprietario: React.FC<NotificacaoProprietarioProps> = ({ usuarioProprietario, quadra, localizacao, reservas }) => {
  const [reservasAtualizadas, setReservasAtualizadas] = useState<Reserva[]>(reservas);

  const handleConfirmar = (index: number) => {
    const novasReservas = [...reservasAtualizadas];
    novasReservas[index].confirmada = true;
    setReservasAtualizadas(novasReservas);
  };

  const handleRecusar = (index: number) => {
    const novasReservas = [...reservasAtualizadas];
    novasReservas[index].confirmada = false;
    setReservasAtualizadas(novasReservas);
  };

  return (
    <div className="notificacao-proprietario">
      <header className="notificacao-header">
        <div>
          <img src={avatarImg} alt="" className="avatar" />
          <span className='ml-2'>{usuarioProprietario}</span>
        </div>
        <div className="info ml-8">
          <h2>Proprietário</h2>
          <p>{quadra}, {localizacao}</p>
        </div>
      </header>
      <h3 className="reservas-title">Reservas Solicitadas: {reservasAtualizadas.length}</h3>
      <table className="reservas-table">
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Confirmar?</th>
          </tr>
        </thead>
        <tbody>
          {reservasAtualizadas.map((reserva, index) => (
            <tr key={index}>
              <td>{reserva.usuario}</td>
              <td>{reserva.data}</td>
              <td>{reserva.horario}</td>
              <td>
                {reserva.confirmada === undefined ? (
                  <>
                    <button className="confirmar" onClick={() => handleConfirmar(index)}>✔️</button>
                    <button className="recusar" onClick={() => handleRecusar(index)}>❌</button>
                  </>
                ) : (
                  <span>{reserva.confirmada ? "Confirmada" : "Recusada"}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificacaoProprietario;
