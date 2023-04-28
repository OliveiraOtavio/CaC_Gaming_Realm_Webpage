
const article = document.querySelector('.bienvenidos-card');
const section = document.querySelector('.bienvenidos-contenedor');
const cerrarBtn = document.querySelector('.cerrar-btn');

// Manejar el evento de clic en el botón "Cerrar"
cerrarBtn.addEventListener('click', () => {
  // Ocultar el "pop-up" y el section
  article.style.display = 'none';
  section.style.display = 'none';
});

// Navegación automatica del Carrousel
// La función selecciona botones de radio en el index uno tras otro, con un
// retraso de 5s (5000ms) entre cada selección, y se reinicia al llegar al terminar
var counter = 2;
setInterval(function() {
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
        counter = 1;
    }
}, 5000);