const API_URL = 'https://jsonplaceholder.typicode.com/users';
const contenedor = document.getElementById('contenido');

// Registro del Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw.js')
      .then((reg) => console.log('SW registrado:', reg.scope))
      .catch((err) => console.error('Error al registrar SW:', err));
  });
}

// Contenido dinámico
async function cargarUsuarios() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Respuesta no válida');
    const usuarios = await res.json();

    contenedor.innerHTML = usuarios.map((u) => `
      <article class="card">
        <h2>${u.name}</h2>
        <p>${u.email}</p>
        <p>${u.phone}</p>
        <p>${u.company.name}</p>
        <p>${u.address.city}</p>
      </article>
    `).join('');
  } catch (error) {
    contenedor.innerHTML =
      '<p class="estado">No se pudo cargar la información. Revisa tu conexión.</p>';
    console.error(error);
  }
}

cargarUsuarios();