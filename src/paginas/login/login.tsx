import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UsuarioLogin from '../../models/usuarioLogin';
import './login.css';
import { RotatingLines } from 'react-loader-spinner';
import { useAuth } from '../../contexts/authContext';

function Login() {
  const navigate = useNavigate();
  const { usuario, handleLogin, isLoading, error }: AuthContextType = useAuth();
  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
    email: '',
    senha: '',
  });
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (usuario && usuario.token) {
      navigate('/home');
    }
  }, [usuario, navigate]);

  const atualizarEstado = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuarioLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    console.log(usuarioLogin);

    try {
      await handleLogin(usuarioLogin);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
      <form className="flex justify-center items-center flex-col w-1/2 gap-4" onSubmit={login}>
        <h2 className="text-slate-900 text-5xl">Entrar</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="usuario">E-mail</label>
          <input
            type="email"
            id="usuario"
            name="email"
            placeholder="E-mail"
            className="border-2 border-slate-700 rounded-full p-2"
            value={usuarioLogin.email}
            onChange={atualizarEstado}
            required
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
            value={usuarioLogin.senha}
            onChange={atualizarEstado}
            required
          />
        </div>
        {isError && <p className="text-red-500">{String(error)}</p>}
        <button type="submit" className="rounded bg-custom-dark-blue hover:bg-indigo-900 text-white w-1/2 py-2 flex justify-center">
          {isLoading ? (
            <RotatingLines strokeColor="white" strokeWidth="5" animationDuration="0.75" width="24" visible={true} />
          ) : (
            <span>Entrar</span>
          )}
        </button>
        <hr className="border-slate-800 w-full" />
        <p>
          Ainda não tem uma conta?{' '}
          <Link to="/cadastro" className="text-indigo-800 hover:underline flex justify-center">Cadastre-se</Link>
        </p>
      </form>
      <div className="fundoLogin hidden lg:block"></div>
    </div>
  );
}

export default Login;
