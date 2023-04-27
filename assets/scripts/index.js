
const article = document.querySelector('.bienvenidos-card');
const section = document.querySelector('.bienvenidos-contenedor');
const cerrarBtn = document.querySelector('.cerrar-btn');

// Manejar el evento de clic en el botón "Cerrar"
cerrarBtn.addEventListener('click', () => {
  // Ocultar el "pop-up" y el section
  article.style.display = 'none';
  section.style.display = 'none';
});
