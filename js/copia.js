const planetLinks = document.querySelectorAll('#descriptions h2');
const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

planetLinks.forEach(link => {
  const planetName = link.id.toLowerCase();
  const planet = document.querySelector(`.solarsystem li.${planetName}`);
  const description = link.nextElementSibling;

  link.addEventListener('click', () => {
    const isOpen = description.style.opacity === '1';

    // Primero cerramos todo
    document.querySelectorAll('.solarsystem li').forEach(li => li.classList.remove('highlight'));
    document.querySelectorAll('#descriptions li p').forEach(p => {
      p.style.opacity = 0;
      p.style.visibility = 'hidden';
    });

    // Si no estaba abierto, lo abrimos
    if (!isOpen) {
      planet.classList.add('highlight');   // marca el planeta en el mapa
      description.style.opacity = 1;       // muestra la descripción
      description.style.visibility = 'visible';
    }
  });
});
