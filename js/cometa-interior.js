document.addEventListener('DOMContentLoaded', () => {

    const comet = document.querySelector('.comet');
    
    // Si el elemento no existe, o si la animación ya se inició (evita aceleración), salimos.
    if (!comet) return;
    if (window.cometInteriorAnimationStarted) return; 
    
    window.cometInteriorAnimationStarted = true; // 🛑 Bandera para prevenir doble inicio

    // ********* CONSTANTES DE LA ÓRBITA *********
    const cx = 210;
    const cy = 70;
    const a = 210;
    const b = 70;
    let angle = 0;
    
    // 🛑 AJUSTE DE VELOCIDAD: Se ha reducido aún más (0.005 era rápido) para una órbita suave.
    const speed = 0.002; // Sugerencia de ajuste. Si es lento, sube a 0.003 o 0.004
    
    // Coordenadas del Sol (para cálculo de distancia, aunque ya no se usa para el color)
    const sunX = 325;
    const sunY = 325;

    // Distancias mínima y máxima (usadas para normalización, aunque no para el color final)
    const dist1 = Math.sqrt((cx - sunX - a) ** 2 + (cy - sunY) ** 2);
    const dist2 = Math.sqrt((cx - sunX + a) ** 2 + (cy - sunY) ** 2);
    const minDist = Math.min(dist1, dist2);
    const maxDist = Math.max(dist1, dist2);

    // Constantes para el rango de color marrón (107° a 244°) en radianes
    const brownStartAngle = 107 * (Math.PI / 180);
    const brownEndAngle = 244 * (Math.PI / 180);

    // 🛑 NUEVA BANDERA DE ESTADO PARA EL TOGGLE (Fuerza Bruta)
    let isCometHighlighted = false;


    // ********* FUNCIÓN DE ANIMACIÓN DE ÓRBITA (HECHA GLOBAL) *********
    // La definimos en el objeto window para que el clic pueda llamarla (como en el exterior)
    window.moveCometInterior = function moveCometInterior() { // 🛑 Función nombrada y global
        
        const x = cx + a * Math.cos(angle);
        const y = cy + b * Math.sin(angle);

        // 🛑 CORRECCIÓN CLAVE: Redondear las posiciones a números enteros (píxeles)
            const finalX = Math.round(x - comet.offsetWidth / 2);
            const finalY = Math.round(y - comet.offsetHeight / 2);

            comet.style.left = `${finalX}px`; // Usa el valor redondeado
            comet.style.top = `${finalY}px`;   // Usa el valor redondeado

        // Lógica de color: SOLO si el cometa NO está resaltado por el clic
        if (!isCometHighlighted) { 
            let normalizedAngle = angle % (2 * Math.PI);
            if (normalizedAngle < 0) {
                normalizedAngle += 2 * Math.PI;
            }

            if (normalizedAngle >= brownStartAngle && normalizedAngle <= brownEndAngle) {
                // 🟤 Zona Marrón (Estilos de animación)
                comet.style.background = '#8B4513';
                comet.style.boxShadow = '0 0 8px 3px #5A2E0F';
            } else {
                // ⚪ Zona Blanca (Estilos de animación)
                comet.style.background = 'white';
                comet.style.boxShadow = '0 0 12px 4px white';
            }
        } 

        angle += speed;
        // Llamada usando el nombre global de la función
        requestAnimationFrame(window.moveCometInterior); 
    }
    
    // Iniciar la animación
    window.moveCometInterior(); // 🛑 Inicia la función global


    // ********* LÓGICA DE CLIC (TOGGLE POR FUERZA BRUTA) *********

    const cometLink = document.querySelector('#descriptions h2#comet'); 
    const cometLi = document.querySelector('.solarsystem li.comet-orbit'); 
    const cometElement = cometLi ? cometLi.querySelector('.comet') : null;    
    const description = cometLink ? cometLink.nextElementSibling : null;

    if (cometLink && cometElement) {
        
        cometLink.addEventListener('click', () => {
            
            // --- A. LIMPIEZA GLOBAL DE OTROS ELEMENTOS ---
            document.querySelectorAll('.solarsystem li').forEach(el => {
                el.classList.remove('highlight');
            });

            // Limpieza de descripciones (las del sistema interior: #descriptions)
            document.querySelectorAll('#descriptions li p').forEach(p => {
                p.style.opacity = 0;
                p.style.visibility = 'hidden';
            });
            
            
            // --- B. LÓGICA DE TOGGLE DEL COMETA (CRÍTICA) ---
            
            if (isCometHighlighted) {
                // 1. DESACTIVAR
                isCometHighlighted = false;
                
                // 2. Apagamos la descripción.
                if (description) {
                    description.style.opacity = 0;
                    description.style.visibility = 'hidden';
                }
                
                // 🛑 3. FORZAMOS EL RECALCULO DE LA ANIMACIÓN (Llamada a la función global)
                window.moveCometInterior(); 
                
            } else {
                // 1. ACTIVAR
                isCometHighlighted = true;
                
                // 2. Aplicamos el brillo verde distintivo directamente en línea.
                cometElement.style.boxShadow = '0 0 25px 12px #00FF00'; 
                cometElement.style.background = '#00FF00'; 
                
                // 3. Mostramos la descripción.
                if (description) {
                    description.style.opacity = 1;
                    description.style.visibility = 'visible';
                }
            }
        });
    }

}); // Fin DOMContentLoaded