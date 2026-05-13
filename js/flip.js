/*este Js sirve para que las flip card puedan girar en dispositivos tactiles*/
/*se usa para la pagina Eclipse.html*/

    const botones = document.querySelectorAll('.btn-front, .btn-back');

    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            const cardInner = this.closest('.card-inner');
            if (cardInner) {
                cardInner.classList.toggle('flipped');
            }
        });
    });

