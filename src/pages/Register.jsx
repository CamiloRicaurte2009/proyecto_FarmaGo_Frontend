import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrar } from '../services/auth';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', confirmar: '' });
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmar) {
      return setError('Las contraseñas no coinciden');
    }
    setEnviando(true);
    try {
      const { nombre, email, password } = form;
      await registrar({ nombre, email, password }); // se guarda en la base de datos
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'No se pudo registrar');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-side">
        <div className="brand brand-big"><span className="brand-logo">+</span> FarmaGo</div>
        <h2>Bienvenido a FarmaGo.</h2>
        <p>Crea tu cuenta y empieza a gestionar tu farmacia en minutos.</p>
      </section>

      <section className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="muted">Completa tus datos para registrarte.</p>

        <form onSubmit={onSubmit}>
          <label>Nombre completo
            <input name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={onChange} required />
          </label>
          <label>Correo electrónico
            <input type="email" name="email" placeholder="correo@ejemplo.com"
              value={form.email} onChange={onChange} required />
          </label>
          <label>Contraseña
            <input type="password" name="password" placeholder="Mínimo 6 caracteres"
              minLength={6} value={form.password} onChange={onChange} required />
          </label>
          <label>Confirmar contraseña
            <input type="password" name="confirmar" placeholder="Repite la contraseña"
              value={form.confirmar} onChange={onChange} required />
          </label>

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary" disabled={enviando}>
            {enviando ? 'Creando…' : 'Crear cuenta'}
          </button>
        </form>

        <p className="muted center">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </section>
    </main>
  );
}
