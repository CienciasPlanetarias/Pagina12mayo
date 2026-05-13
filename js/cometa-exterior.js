document.addEventListener('DOMContentLoaded', () => {

    const comet = document.querySelector('.comet2'); // 🟢 Selector correcto para el exterior

    // Comprobamos si el elemento existe y si la animación ya se inició
    if (!comet) return;
    if (window.cometAnimationStarted) return; // 🟢 Bandera correcta para el exterior
    
    window.cometAnimationStarted = true; 

    // ********* CONSTANTES DE LA ÓRBITA *********
    const c2_cx = 166;
    const c2_cy = 70;
    const c2_a = 168;
    const c2_b = 70;
    let c2_angle = 0; 
    const c2_speed = 0.002; // Velocidad lenta
    let isCometHighlighted = false; // Bandera de estado
    
    const brownStartAngle = 150 * (Math.PI / 180);
    const brownEndAngle = 215 * (Math.PI / 180);
    
    // ********* FUNCIÓN DE ANIMACIÓN DE ÓRBITA CORREGIDA *********
    window.moveComet = function moveComet() { // 🟢 Función global para el exterior
        
        // --- 1. MOVIMIENTO ---
        const x = c2_cx + c2_a * Math.cos(c2_angle);
        const y = c2_cy + c2_b * Math.sin(c2_angle);

        // 🛑 SOLUCIÓN ANTI-TEMBLOR: Redondeo de posición
        const finalX = Math.round(x - comet.offsetWidth / 2);
        const finalY = Math.round(y - comet.offsetHeight / 2);

        comet.style.left = `${finalX}px`; // Usa el valor redondeado
        comet.style.top = `${finalY}px`;   // Usa el valor redondeado

        // --- 2. LÓGICA DE COLOR (¡Solo aplicar si NO está resaltado por el clic!) ---
        if (!isCometHighlighted) {
            let normalizedAngle = c2_angle % (2 * Math.PI);
            if (normalizedAngle < 0) {
                normalizedAngle += 2 * Math.PI;
            }

            if (normalizedAngle >= brownStartAngle && normalizedAngle <= brownEndAngle) {
                // 🟤 Zona Marrón (Estilos de animación)
                comet.style.background = '#8B4513';
                comet.style.boxShadow = '0 0 8px 3px #5A2E0F';
            } else {
                // ⚪ Zona Blanca/Brillante (Estilos de animación)
                comet.style.background = 'white';
                comet.style.boxShadow = '0 0 12px 4px white';
            }
        } 
        
        c2_angle += c2_speed;
        requestAnimationFrame(window.moveComet);
    }

    // Iniciar la animación
    window.moveComet(); 

// ********* LÓGICA DE CLIC (TOGGLE POR FUERZA BRUTA) *********

    const cometLink = document.querySelector('#descriptions2 h2#comet2'); // 🟢 Selector correcto
    const cometLi = document.querySelector('.solar-exterior li.comet-orbit2'); // 🟢 Selector correcto
    const cometElement = cometLi ? cometLi.querySelector('.comet2') : null;    // 🟢 Selector correcto
    const description = cometLink ? cometLink.nextElementSibling : null;

    if (cometLink && cometElement) {
        
        cometLink.addEventListener('click', () => {
            
            // --- A. LIMPIEZA GLOBAL DE OTROS ELEMENTOS ---
            document.querySelectorAll('.solar-exterior li, .solar-exterior .transneptunian-belt').forEach(el => {
                el.classList.remove('highlight');
            });
            document.querySelectorAll('.solar-exterior .comet2').forEach(el => {
                 el.classList.remove('highlight'); 
            });

            // Limpieza de descripciones
            document.querySelectorAll('#descriptions2 li p').forEach(p => {
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
                
                // 3. FORZAMOS EL RECALCULO DE LA ANIMACIÓN
                window.moveComet(); 
                
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
});