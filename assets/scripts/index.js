


document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar los elementos que se necesitan
  const article = document.querySelector('.bienvenidos-card');
  const section = document.querySelector('.bienvenidos-contenedor');
  const cerrarBtn = document.querySelector('.cerrar-btn');

  // Verificar si el pop-up ya se mostró antes
  const urlParams = new URLSearchParams(window.location.search);
  const popupShown = urlParams.get('popupShown');

  if (!popupShown) {
    // Si el pop-up no se mostró antes, mostrarlo y agregar el parámetro en la URL
    article.style.display = 'block';
    section.style.display = 'block';

    cerrarBtn.addEventListener('click', (event) => {
      // Evitar que se envíe el formulario
      event.preventDefault();

      // Ocultar el pop-up y agregar el parámetro en la URL
      article.style.display = 'none';
      section.style.display = 'none';
      window.history.replaceState(null, null, window.location.pathname + '?popupShown=true');
    });
  } else {
    // Si el pop-up ya se mostró antes, ocultarlo
    article.style.display = 'none';
    section.style.display = 'none';
  }
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

/* Manejo de los Iframes*/ 
var script = document.createElement('script');
script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
script.onload = function() {
  AOS.init({
    duration: 800,
    once: true
  });
};
document.head.appendChild(script);