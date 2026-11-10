import { createContext, useContext, useEffect, useState } from 'react';
import { iniciarSesion, obtenerPerfil, cerrarSesion } from '../services/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Al abrir la app: si hay token guardado, recupera el usuario
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setCargando(false);
      return;
    }
    obtenerPerfil()
      .then(setUser)
      .catch(() => cerrarSesion())
      .finally(() => setCargando(false));
  }, []);

  const login = async (credenciales) => {
    const usuario = await iniciarSesion(credenciales);
    setUser(usuario);
    return usuario;
  };

  const logout = () => {
    cerrarSesion();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
