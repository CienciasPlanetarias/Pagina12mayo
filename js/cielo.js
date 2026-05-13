let userLat = -34.6; // ubicación por defecto
let userLng = -58.4;
let currentProjection = 'polar'; // vista inicial

function cargarMapa() {
  const iframe = document.getElementById('skyFrame');
  iframe.src = `https://slowe.github.io/VirtualSky/embed?lat=${userLat}&lng=${userLng}&constellations=true&showstarlabels=true&showgalaxy=true&gridlines_az=true&showhorizon=true&projection=${currentProjection}`;
}

function cambiarVista(tipo) {
  currentProjection = tipo;
  cargarMapa();
}

// Pedimos ubicación del usuario
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      userLat = pos.coords.latitude;
      userLng = pos.coords.longitude;
      cargarMapa();
    },
    err => {
      console.warn("No se pudo obtener la ubicación. Se usará ubicación por defecto.");
      cargarMapa();
    }
  );
} else {
  console.warn("Geolocalización no disponible. Se usará ubicación por defecto.");
  cargarMapa();
}

