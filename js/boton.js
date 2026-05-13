//Este JS es el boton que vuelve al principio de la pagina 


document.addEventListener('DOMContentLoaded', function () {
    const backToTopBtn = document.getElementById("back-to-top-btn");

    // Mostrar / ocultar el botón al scrollear
    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    // Scroll suave al inicio
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


});


