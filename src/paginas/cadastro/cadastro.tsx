import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Usuario from '../../models/usuario';
import './cadastro.css';
import axios from 'axios';

function Cadastro() {
  let navigate = useNavigate();
  const [confirmaSenha, setConfirmaSenha] = useState<string>("");
  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    email: '',
    senha: '',
    tipo: 'usuario', // Adicionei o tipo de usuário aqui
  });
  const [mensagemSucesso] = useState<string | null>(null); 

  function back() {
    navigate('/login');
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      try {
        const response = await axios.post(
          'https://sportmap.onrender.com/usuarios/cadastrar',
          usuario
        );

        console.log('Usuário cadastrado com sucesso:', response.data);
        alert('Usuário cadastrado com sucesso!'); 
        setTimeout(() => {
          back(); 
        }, 2000);
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
      }
    } else {
      alert('Dados inconsistentes. Verifique as informações de cadastro.');
      setUsuario({ ...usuario, senha: "" });
      setConfirmaSenha("");
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center font-bold">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center place-items-center flex-col w-2/3 gap-3 mt-12' onSubmit={cadastrarNovoUsuario}>
          <h2 className='text-black text-5xl'>Cadastrar</h2>
          {mensagemSucesso && <p className="text-green-500">{mensagemSucesso}</p>} 
          
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="border-2 border-slate-700 rounded-full p-2"
              value={usuario.nome}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="border-2 border-slate-700 rounded-full p-2"
              value={usuario.email}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded-full p-2"
              value={usuario.senha}
              onChange={atualizarEstado}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="border-2 border-slate-700 rounded-full p-2"
              value={confirmaSenha}
              onChange={handleConfirmarSenha}
            />
          </div>
          
          {/* Campo de seleção para o tipo de usuário */}
          <div className="flex flex-col w-full">
            <label htmlFor="tipo">Tipo de Usuário</label>
            <select
              id="tipo"
              name="tipo"
              className="border-2 border-slate-700 rounded-full p-2"
              value={usuario.tipo}
              onChange={atualizarEstado}
            >
              <option value="usuario">Usuário</option>
              <option value="proprietario">Proprietário</option>
            </select>
          </div>

          <div className="flex justify-around w-full gap-8">
            <button className='rounded text-white bg-red-600 hover:bg-red-900 w-1/2 py-2' onClick={back}>
              Cancelar
            </button>
            <button 
                type='submit'
                className='rounded text-white bg-custom-dark-blue hover:bg-indigo-900 w-1/2 py-2 flex justify-center'>
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
