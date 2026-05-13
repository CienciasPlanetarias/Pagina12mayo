//sistema solar interior

const planetLinks = document.querySelectorAll('#descriptions h2');

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

planetLinks.forEach(link => {
    let planetName = link.id.toLowerCase();

    // 🛑 CRÍTICO: OMITIR LA LÓGICA DE HIGHLIGHT PARA EL COMETA
    // La alternancia del cometa (id="comet") es manejada por su propio JS (cometa-interior.js)
    if (planetName === 'comet') {
        // Salir del bucle para el cometa. Su lógica de clic está en otro archivo.
        return; 
    }

    // --- Lógica para Planetas (Mercurio, Venus, etc.) ---
    
    // Mapear 'asteroids_meteorids' a 'asteroids_meteorids' si es necesario
    if (planetName === 'asteroids_meteorids') {
         // Asegúrate de que el nombre coincida con la clase del LI si aplica
    }

    const planetLi = document.querySelector(`.solarsystem li.${planetName}`);
    
    // Si no es un cometa, planetElement es el LI completo
    const planetElement = planetLi; 
    
    const description = link.nextElementSibling;

    link.addEventListener('click', () => {
        // Usamos el estado de la clase highlight como fuente de verdad
        const isCurrentlyHighlighted = planetElement.classList.contains('highlight');

        // Limpiar todo (incluyendo la potencial clase highlight del cometa si se aplicó por error)
        document.querySelectorAll('.solarsystem li, .solarsystem li .comet').forEach(li => li.classList.remove('highlight'));
        
        // Limpiar estilos en línea del cometa si su lógica está en este archivo,
        // aunque idealmente lo maneja cometa-interior.js
        document.querySelector('.solarsystem li .comet').style.boxShadow = ''; 
        document.querySelector('.solarsystem li .comet').style.background = ''; 
        
        // Limpiar descripciones
        document.querySelectorAll('#descriptions li p').forEach(p => {
            p.style.opacity = 0;
            p.style.visibility = 'hidden';
        });

        if (!isCurrentlyHighlighted && planetElement) {
            // Activar el planeta clicado
            planetElement.classList.add('highlight');
            description.style.opacity = 1;
            description.style.visibility = 'visible';
        }
        // Si isCurrentlyHighlighted es true, la limpieza anterior ya lo desactivó (toggle off).
    });
});