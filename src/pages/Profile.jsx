import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      <Navbar />
      <main className="container narrow">
        <div className="panel">
          <h1>Mi perfil</h1>
          <p><b>ID:</b> {user.id}</p>
          <p><b>Nombre:</b> {user.nombre}</p>
          <p><b>Correo:</b> {user.email}</p>
          <p><b>Rol:</b> {user.rol}</p>
          <div className="actions">
            <Link to="/perfil/editar" className="btn btn-primary">Editar perfil</Link>
            <Link to="/dashboard" className="btn btn-outline">Volver al dashboard</Link>
          </div>
        </div>
      </main>
    </>
  );
}
