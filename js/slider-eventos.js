
/*este codigo de abajo es para q esté mejor optimizado, por ahora se mantendra comentado*/
(() => {
  const sheetURLSlider = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Eventos";
  const slideContainer = document.querySelector('.slide-eventos');
  const nextBtn = document.querySelector('.next-eventos');
  const prevBtn = document.querySelector('.prev-eventos');
  const CACHE_KEY = "eventosCache";

  let slides = [];
  let items = []; // guardamos referencias de los slides

  // ---------------------- Funciones auxiliares ----------------------
  const isValidImageURL = url => url && /^https?:\/\//i.test(url.trim());
  const escapeLineBreaks = str => String(str || '').replace(/\r?\n/g, '<br>');

  // ---------------------- Lazy load con IntersectionObserver ----------------------
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

  // ---------------------- Renderizar slides ----------------------
  function renderSlides() {
    slideContainer.innerHTML = "";
    items = [];

    slides.forEach((slide, index) => {
      if (!slide || typeof slide !== 'object') return;

      const item = document.createElement('div');
      item.className = 'item-eventos';

      // Primera imagen precargada, resto lazy
      if (isValidImageURL(slide.Imagen)) {
        if (index === 0) {
          item.style.backgroundImage = `url(${slide.Imagen.trim()})`;
        } else {
          item.dataset.bg = slide.Imagen.trim();
          observer.observe(item);
        }
        item.style.backgroundSize = "cover";
        item.style.backgroundPosition = "center";
      }

      // Contenedor de texto
      const content = document.createElement('div');
      content.className = 'content-eventos';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'name-eventos';
      nameDiv.textContent = slide.Titulo || '';

      const fechaDiv = document.createElement('div');
      fechaDiv.className = 'fecha-eventos';
      fechaDiv.textContent = slide.Fecha || '';

      const descDiv = document.createElement('div');
      descDiv.className = 'descripcion-eventos';
      descDiv.textContent = slide.Descripcion || '';

      content.append(nameDiv, fechaDiv, descDiv);
      item.appendChild(content);

      slideContainer.appendChild(item);
      items.push(item);
    });
  }

  // ---------------------- Cargar datos ----------------------
  function loadCachedData() {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        slides = JSON.parse(cached);
        renderSlides();
      } catch {
        console.warn("Cache inválido, se ignora.");
      }
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
      .catch(err => console.error("Error cargando datos de Google Sheets:", err));
  }

  // ---------------------- Botones next/prev ----------------------
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

  // ---------------------- Inicialización ----------------------
  loadCachedData();

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadFreshData);
  } else {
    setTimeout(loadFreshData, 100);
  }
})();
