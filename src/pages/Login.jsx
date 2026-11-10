import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEnviando(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-side">
        <div className="brand brand-big"><span className="brand-logo">+</span> FarmaGo</div>
        <h2>Acceso seguro para profesionales y pacientes.</h2>
        <p>Gestiona medicamentos, inventario y ventas desde un solo lugar.</p>
      </section>

      <section className="auth-card">
        <h1>Iniciar sesión</h1>
        <p className="muted">Ingresa tus credenciales para continuar.</p>

        <form onSubmit={onSubmit}>
          <label>Correo electrónico
            <input type="email" name="email" placeholder="correo@ejemplo.com"
              value={form.email} onChange={onChange} required />
          </label>
          <label>Contraseña
            <input type="password" name="password" placeholder="••••••••"
              value={form.password} onChange={onChange} required />
          </label>

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary" disabled={enviando}>
            {enviando ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <p className="muted center">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
      </section>
    </main>
  );
}
