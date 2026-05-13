(() => {
  const sheetURLSlider = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Eventos-Inicio";
  const slideContainer = document.querySelector('.slide');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  // Cambié la CACHE_KEY para que limpie cualquier error anterior
  const CACHE_KEY = "eventosCache_Index_Fixed"; 

  let slides = [];
  let items = [];

  const isValidImageURL = url => url && /^https?:\/\//i.test(url.trim());

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const bg = el.dataset.bg;
        if (bg) {
          el.style.backgroundImage = `url(${bg})`;
          observer.unobserve(el);
        }
      }
    });
  }, { rootMargin: "200px" });

  function renderSlides() {
    slideContainer.innerHTML = "";
    items = [];

    // Filtramos para evitar filas vacías que desfasen el carrusel
    const validSlides = slides.filter(s => s.Titulo);

    validSlides.forEach((slide, index) => {
      const item = document.createElement('div');
      item.className = 'item';

      if (isValidImageURL(slide.Imagen)) {
        // En este slider, el "activo" visualmente es el 2, 
        // así que precargamos los dos primeros por seguridad
        if (index === 0 || index === 1) {
          item.style.backgroundImage = `url(${slide.Imagen.trim()})`;
        } else {
          item.dataset.bg = slide.Imagen.trim();
          observer.observe(item);
        }
        item.style.backgroundSize = "cover";
        item.style.backgroundPosition = "center";
      }

      const content = document.createElement('div');
      content.className = 'content';

      // Usamos h3 para el título para mantener la armonía de diseño
      content.innerHTML = `
        <h3 class="name">${slide.Titulo || ''}</h3>
        <div class="fecha">${slide.Fecha || ''}</div>
        <div class="descripcion">${slide.Descripcion || ''}</div>
        <button class="ver-mas">Ver más</button>
      `;

      item.appendChild(content);
      slideContainer.appendChild(item);
      items.push(item);
    });

    // --- EL TRUCO PARA EL INDEX ---
    // Tu CSS muestra el nth-child(2). 
    // Al mover el último al principio, la Fila 2 pasa de la posición 1 a la 2.
    if (items.length > 1) {
      const last = items.pop();
      slideContainer.prepend(last);
      items.unshift(last);
    }
  }

  function loadCachedData() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        slides = JSON.parse(cached);
        renderSlides();
      } catch { console.warn("Cache inválido."); }
    }
  }

  function loadFreshData() {
    fetch(sheetURLSlider)
      .then(res => res.json())
      .then(data => {
        slides = Array.isArray(data) ? data : [];
        localStorage.setItem(CACHE_KEY, JSON.stringify(slides));
        renderSlides();
      })
      .catch(err => console.error("Error:", err));
  }

  nextBtn?.addEventListener('click', () => {
    if (items.length) {
      const first = items.shift();
      slideContainer.appendChild(first);
      items.push(first);
    }
  });

  prevBtn?.addEventListener('click', () => {
    if (items.length) {
      const last = items.pop();
      slideContainer.prepend(last);
      items.unshift(last);
    }
  });

  slideContainer.addEventListener('click', e => {
    if (e.target.classList.contains('ver-mas')) {
      window.location.href = 'eventos.html';
    }
  });

  loadCachedData();
  setTimeout(loadFreshData, 100);
})();