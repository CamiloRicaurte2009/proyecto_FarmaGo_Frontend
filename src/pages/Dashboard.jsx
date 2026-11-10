import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const modulos = [
  { titulo: 'Productos', valor: '1,420', detalle: 'Medicamentos registrados' },
  { titulo: 'Categorías', valor: '38', detalle: 'Clasificaciones activas' },
  { titulo: 'Clientes', valor: '850', detalle: 'Pacientes y clientes' },
  { titulo: 'Proveedores', valor: '24', detalle: 'Aliados activos' },
  { titulo: 'Inventario', valor: '98%', detalle: 'Stock disponible' },
  { titulo: 'Ventas hoy', valor: '$3,480', detalle: 'Transacciones del día' },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <main className="container">
        <section className="hero">
          <div>
            <h1>¡Bienvenido, {user.nombre}!</h1>
            <p>Rol: <b>{user.rol}</b> · {user.email}</p>
          </div>
          <Link to="/perfil" className="btn btn-light">Ver mi perfil</Link>
        </section>

        <h2 className="section-title">Módulos de gestión</h2>
        <div className="grid">
          {modulos.map((m) => (
            <article className="card" key={m.titulo}>
              <span className="card-label">{m.titulo}</span>
              <strong className="card-value">{m.valor}</strong>
              <span className="muted">{m.detalle}</span>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
