// sistema solar exterior - LÓGICA DE PLANETAS Y CINTURÓN LIMPIA
document.addEventListener('DOMContentLoaded', () => { 

    const planetLinks = document.querySelectorAll('#descriptions2 h2');

    planetLinks.forEach(link => {
        let planetName = link.id.toLowerCase();

        // **1. ELIMINAR LÓGICA DEL COMETA (REDUNDANCIA)**
        // ELIMINADO: if (planetName === 'comet2') planetName = 'comet-orbit2';
        
        // Mapeo: Solo retenemos el mapeo para el cinturón transneptuniano
        if (planetName === 'transneptunian-belt') planetName = 'transneptunian-belt';

        const planetLi = document.querySelector(`.solar-exterior li.${planetName}`);
        let planetElement;

        // **2. ELIMINAR LÓGICA DE SELECCIÓN INTERNA DEL COMETA**
        // Como ya no incluimos el cometa, planetElement es el <li> por defecto.
        planetElement = planetLi;
        // ELIMINADO: La verificación 'comet-orbit2'

        const description = link.nextElementSibling;

        if (link && description) {
            link.addEventListener('click', () => {
                const isOpen = description.style.opacity === '1';

                // Limpiar todo (Solo planetas y cinturón, pero con la clase de cometa para seguridad)
                // Es necesario mantener .comet2 aquí solo para limpiar el highlight si el cometa estaba activo.
                document.querySelectorAll('.solar-exterior li, .solar-exterior li .comet2, .solar-exterior .transneptunian-belt').forEach(el => {
                    el.classList.remove('highlight');
                });
                document.querySelectorAll('#descriptions2 li p').forEach(p => {
                    p.style.opacity = 0;
                    p.style.visibility = 'hidden';
                });

                if (!isOpen && planetElement) {
                    
                    // **3. ELIMINAR LÓGICA DE DETENCIÓN DE CLASES DEL COMETA**
                    // ELIMINADO: La lógica para remover comet-far/comet-close.

                    // Resaltar planeta o cinturón
                    planetElement.classList.add('highlight');
                    description.style.opacity = 1;
                    description.style.visibility = 'visible';
                }
            });
        }
    });
    
    // ********************************************
    // 4. CINTURÓN TRANSNEPTUNIANO (CREACIÓN DE PARTÍCULAS)
    // ********************************************
    const belt = document.querySelector('.transneptunian-belt');

    if (belt) {
        const particleCount = 150; 
        const center = 300; 
        const innerRadius = 280; 
        const outerRadius = 300; 

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            const angle = Math.random() * 2 * Math.PI;
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);

            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);

            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            belt.appendChild(particle);
        }
    }

}); 