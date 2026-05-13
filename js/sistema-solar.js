//sistema solar interior

const planetLinks = document.querySelectorAll('#descriptions h2');

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

planetLinks.forEach(link => {
    let planetName = link.id.toLowerCase();

    // Mapear 'comet' a 'comet-orbit'
    if (planetName === 'comet') {
        planetName = 'comet-orbit';
    }

    const planetLi = document.querySelector(`.solarsystem li.${planetName}`);
    let planetElement;

    // Si es cometa, usar el div interno
    if (planetName === 'comet-orbit') {
        planetElement = planetLi.querySelector('.comet'); // ✅ seleccionamos el div visible
    } else {
        planetElement = planetLi;
    }


    const description = link.nextElementSibling;

    link.addEventListener('click', () => {
        const isOpen = description.style.opacity === '1';

        // Limpiar todo
        document.querySelectorAll('.solarsystem li, .solarsystem li .comet').forEach(li => li.classList.remove('highlight'));
        document.querySelectorAll('#descriptions li p').forEach(p => {
            p.style.opacity = 0;
            p.style.visibility = 'hidden';
        });

        if (!isOpen && planetElement) {
            planetElement.classList.add('highlight');
            description.style.opacity = 1;
            description.style.visibility = 'visible';
        }
    });
});

const comet = document.querySelector('.comet');

// Centro de la elipse (centro geométrico)
const cx = 210;
const cy = 70;

// Ejes de la elipse
const a = 210;
const b = 70;

let angle = 0;
const speed = 0.01;

// Posición del Sol (foco desplazado, no en el centro)
const sunX = 325;
const sunY = 325;

// Calculamos distancia mínima y máxima aproximada a lo largo de la elipse
const dist1 = Math.sqrt((cx - sunX - a) ** 2 + (cy - sunY) ** 2);
const dist2 = Math.sqrt((cx - sunX + a) ** 2 + (cy - sunY) ** 2);

const minDist = Math.min(dist1, dist2);
const maxDist = Math.max(dist1, dist2);

function moveComet() {
  const x = cx + a * Math.cos(angle);
  const y = cy + b * Math.sin(angle);

  comet.style.left = `${x - comet.offsetWidth / 2}px`;
  comet.style.top = `${y - comet.offsetHeight / 2}px`;

  // Distancia al Sol
  const dx = x - sunX;
  const dy = y - sunY;
  const distance = Math.sqrt(dx * dx + dy * dy);

 // Determinar color según ángulo
const normalizedAngle = angle % (2 * Math.PI); // mantener entre 0 y 2π

if (normalizedAngle > Math.PI / 2 && normalizedAngle < 3 * Math.PI / 2) {
  // 🟤 Mitad izquierda → aphelio (zona fría, roca)
  comet.style.background = '#8B4513'; // marrón tipo roca
  comet.style.boxShadow = '0 0 8px 3px #5A2E0F';
} else {
  // ⚪ Mitad derecha → perihelio (zona cálida, brillante)
  comet.style.background = 'white';
  comet.style.boxShadow = '0 0 12px 4px white';
}

  angle += speed;
  requestAnimationFrame(moveComet);
}

moveComet();
