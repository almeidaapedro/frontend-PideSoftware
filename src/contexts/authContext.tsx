import React, { createContext, useContext, useState, ReactNode } from 'react';
import api from '../services/service';
import { AxiosError } from 'axios';

interface Usuario {
  token: string;
}

interface UsuarioLogin {
  email: string;
  senha: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  handleLogin: (usuarioLogin: UsuarioLogin) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (usuarioLogin: UsuarioLogin) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Tentando fazer login...", usuarioLogin);
      const response = await api.post('/usuarios/logar', usuarioLogin); 

      if (response.data && response.data.token) {
        const userData: Usuario = {
          token: response.data.token,
        };
        setUsuario(userData);
        localStorage.setItem('token', response.data.token);
        console.log("Login bem-sucedido!", userData);
      } else {
        setError('Resposta inválida do servidor.');
      }
    } catch (err) {
      const error = err as AxiosError;
      console.error('Erro ao fazer login:', error);
      setError(error.response?.data?.message || 'Erro desconhecido.');
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, handleLogin, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
