import { createContext, useContext, useState, ReactNode } from 'react';
import api from '../services/service';
import UsuarioLogin from '../models/usuarioLogin';

interface AuthContextType {
  usuario: any; // Substitua 'any' pelo tipo apropriado
  handleLogin: (usuarioLogin: UsuarioLogin) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<any>(null); // Substitua 'any' pelo tipo apropriado
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (usuarioLogin: UsuarioLogin) => {
    setIsLoading(true);
    setError(null);
    console.log("Credenciais do usuário:", usuarioLogin);

    try {
      const response = await api.post('/usuarios/logar', usuarioLogin, {
        headers: { 'Content-Type': 'application/json' }
      });
      setUsuario(response.data);
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      console.error("Erro ao fazer login:", err);
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
