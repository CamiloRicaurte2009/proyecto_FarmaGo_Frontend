import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const salir = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/dashboard" className="brand">
        <span className="brand-logo">+</span> FarmaGo
      </Link>
      <div className="navbar-user">
        <Link to="/perfil" className="user-chip" title="Mi perfil">
          <span className="avatar">{user.nombre.charAt(0).toUpperCase()}</span>
          <span className="user-name">{user.nombre}</span>
        </Link>
        <button className="btn btn-outline" onClick={salir}>Salir</button>
      </div>
    </header>
  );
}
