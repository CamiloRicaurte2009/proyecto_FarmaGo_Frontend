import api from '../api/oxion';

export const registrar = async (datos) => {
  const { data } = await api.post('/auth/register', datos);
  return data;
};

export const iniciarSesion = async (datos) => {
  const { data } = await api.post('/auth/login', datos);
  localStorage.setItem('token', data.token); // se guarda el token
  return data.usuario;
};

export const obtenerPerfil = async () => {
  const { data } = await api.get('/auth/me');
  return data.usuario;
};

export const actualizarPerfil = async (datos) => {
  const { data } = await api.put('/auth/me', datos);
  return data.usuario;
};

export const cerrarSesion = () => localStorage.removeItem('token');
