import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Si no hay sesión, manda al login
export default function ProtectedRoute({ children }) {
  const { user, cargando } = useAuth();
  if (cargando) return <p className="cargando">Cargando…</p>;
  return user ? children : <Navigate to="/login" replace />;
}
