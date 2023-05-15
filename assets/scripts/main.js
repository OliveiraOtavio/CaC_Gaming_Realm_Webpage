// Obtén el botón de menú y la lista de elementos del menú
var menuToggle = document.querySelector('.menu-toggle');
var menuList = document.querySelector('.navbar ul');

// Agrega un evento de clic al botón de menú
menuToggle.addEventListener('click', function () {
  // Alterna la clase 'active' para mostrar/ocultar el menú
  menuList.classList.toggle('active');
});
