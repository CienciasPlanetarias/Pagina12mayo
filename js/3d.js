// Obtener elementos clave del DOM
const appContainer = document.getElementById('app');
const planetList = document.querySelector('.planet-list'); // Carrusel ul
const allPlanets = document.querySelectorAll('.planet');
// Recargar los ítems de navegación, que ahora solo son 8
const allNavItems = document.querySelectorAll('.planet-list-item'); 

// Array de nombres y constantes de tamaño
const PLANET_NAMES = Array.from(allPlanets).map(p => p.getAttribute('data-planet'));
const TOTAL_PLANETS = PLANET_NAMES.length; // 8 planetas

// Variable para seguir la posición actual del carrusel (índice 0-7)
let currentIndex = PLANET_NAMES.findIndex(name => name === appContainer.getAttribute('data-current-planet')) || 0;


// --- Funciones para adaptabilidad (Responsivo) ---

/**
 * Retorna el ancho del ítem de navegación basado en el ancho de la ventana.
 * Sincronizado con las Media Queries del CSS (100px vs 70px).
 */
function getItemWidth() {
    // Si la pantalla es menor o igual a 576px (CSS XS), el ancho es 70px
    if (window.innerWidth <= 576) {
        return 70;
    }
    // Para escritorio/tablet, el ancho es 100px
    return 100; 
}

/**
 * Mueve visualmente el carrusel aplicando la transformación translateX.
 */
function updateCarouselPosition(index) {
    const itemWidth = getItemWidth(); 
    
    // Ancho del contenedor .planet-nav
    const containerWidth = planetList.parentElement.clientWidth; 
    
    // Calcula el offset para centrar el elemento activo en la vista
    const offset = (containerWidth / 2) - (itemWidth / 2);
    
    const translateX = -(index * itemWidth) + offset;
    
    planetList.style.transform = `translateX(${translateX}px)`;
}

// --- Lógica Principal del Slider Limitado ---

// Función principal para cambiar el planeta activo
function setActivePlanet(newIndex) {
    
    // 1. Aplicar límites: el índice debe estar entre 0 y TOTAL_PLANETS - 1
    if (newIndex < 0) {
        newIndex = 0; // Se detiene en Mercurio
    } else if (newIndex >= TOTAL_PLANETS) {
        newIndex = TOTAL_PLANETS - 1; // Se detiene en Neptuno
    }

    currentIndex = newIndex;
    
    const newPlanetName = PLANET_NAMES[currentIndex]; 

    // 2. Mover la posición del slider
    updateCarouselPosition(currentIndex);
    
    // 3. Aplicar el estado activo a los planetas y navegación

    // a) Limpiar estados
    allPlanets.forEach(p => p.removeAttribute('data-active'));
    allNavItems.forEach(tspan => tspan.removeAttribute('data-active'));
    
    // b) Activar el nuevo planeta
    const newPlanet = document.querySelector(`.planet[data-planet="${newPlanetName}"]`);
    if (newPlanet) {
        appContainer.setAttribute('data-current-planet', newPlanetName);
        newPlanet.setAttribute('data-active', '');
        
        // c) Activar el ítem de navegación
        document.querySelector(`.planet-list-item[data-planet-nav="${newPlanetName}"]`)
            .setAttribute('data-active', 'true');
    }
}

// 4. Añadir Event Listeners a los ítems de navegación
allNavItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // Al hacer clic, simplemente vamos al índice de ese planeta
        setActivePlanet(index);
    });
});

// 5. Inicialización y Responsividad
const initialPlanetName = appContainer.getAttribute('data-current-planet'); 
currentIndex = PLANET_NAMES.indexOf(initialPlanetName) > -1 ? PLANET_NAMES.indexOf(initialPlanetName) : 0;

window.addEventListener('resize', () => {
    // Recalcular la posición en caso de cambio de tamaño de pantalla o rotación
    updateCarouselPosition(currentIndex);
});

// Inicializar el estado y la posición al cargar
setTimeout(() => {
    setActivePlanet(currentIndex);
}, 50);

// --- Funciones para navegación con flechas/botones (Opcional) ---
// Útil si quieres agregar botones Siguiente/Anterior en el futuro.
function nextPlanet() {
    setActivePlanet(currentIndex + 1);
}

function prevPlanet() {
    setActivePlanet(currentIndex - 1);
}