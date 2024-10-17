// AuthContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import api from '../services/service';

interface Usuario {
  token: string;
  // Adicione outras propriedades do usuário conforme necessário
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
      const response = await api.post('/api/auth/login', {
        withCredentials: true, 
      });

      if (response.data && response.data.token) {
        const userData: Usuario = {
          token: response.data.token,
        };
        setUsuario(userData);
        localStorage.setItem('token', response.data.token);
      } else {
        setError('Resposta inválida do servidor.');
      }
    } catch (err: any) {
      console.error('Erro ao fazer login:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Erro desconhecido durante o login.');
      }
    } finally {
      setIsLoading(false);
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
