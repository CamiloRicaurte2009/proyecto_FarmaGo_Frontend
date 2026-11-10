import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { actualizarPerfil } from '../services/auth';
import Navbar from '../components/Navbar';

export default function EditProfile() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState(user.nombre);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const actualizado = await actualizarPerfil({ nombre }); // se guarda en la BD
      setUser(actualizado);
      navigate('/perfil');
    } catch (err) {
      setError(err.response?.data?.msg || 'No se pudo actualizar');
    }
  };

  return (
    <>
      <Navbar />
      <main className="container narrow">
        <div className="panel">
          <h1>Editar perfil</h1>
          <form onSubmit={onSubmit}>
            <label>Nombre
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </label>
            <label>Correo (no editable)
              <input value={user.email} disabled />
            </label>
            {error && <p className="error">{error}</p>}
            <div className="actions">
              <button className="btn btn-primary">Guardar</button>
              <Link to="/perfil" className="btn btn-outline">Cancelar</Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
