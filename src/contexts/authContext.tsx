import { createContext, useContext, useState } from 'react';
import api from '../services/service';
import UsuarioLogin from '../models/usuarioLogin';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (usuarioLogin: UsuarioLogin) => {
    setIsLoading(true);
    setError(null);
    console.log("Credenciais do usuário:", usuarioLogin); // Verifica as credenciais

    try {
      const response = await api.post('/usuarios/logar', usuarioLogin, {
        headers: { 'Content-Type': 'application/json' } // Adiciona cabeçalho
      });
      setUsuario(response.data);
      localStorage.setItem('token', response.data.token);  // Salvar o token localmente
    } catch (err) {
      console.error("Erro ao fazer login:", err); // Loga o erro completo
      setError(err.response?.data?.message || 'Erro ao realizar o login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}
