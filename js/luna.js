const sheetURLLunas = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/FasesLuna";

document.addEventListener('DOMContentLoaded', async () => {
  const contenedorFases = document.getElementById('contenedor-fases');

  if (!contenedorFases) {
    console.error('No se encontró el elemento con id "contenedor-fases". Verificá que exista en el HTML y que el script se ejecute después del DOM.');
    return;
  }

  try {
    const res = await fetch(sheetURLLunas, { cache: 'no-cache' }); // evitar caché en pruebas
    if (!res.ok) {
      // error HTTP
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      // si no es JSON, mostramos los primeros chars para depurar
      const text = await res.text();
      console.error('La respuesta NO es JSON. Primeros 500 caracteres de la respuesta:', text.slice(0, 500));
      throw new Error('Respuesta del sheet no es JSON');
    }

    const rows = await res.json();
    if (!rows || rows.length === 0) {
      console.warn('La respuesta es JSON pero no contiene filas (rows vacías). Revisa que la hoja tenga datos compartidos públicamente.');
      return;
    }

    // limpiamos el contenedor (opcional)
    contenedorFases.innerHTML = '';

    rows.forEach(fase => {
      const card = document.createElement("a");
      card.href = "fases-lunares.html";
      card.className = "noticia-lunar-link";

      card.innerHTML = `
        <div class="row align-items-center mb-4">
          <div class="col-md-4 text-center">
            <img src="${fase.Imagen}" alt="${fase.Fases}" class="img-fluid rounded">
          </div>
          <div class="col-md-8 text-md-start text-center text-white">
            <h4 class="mb-2">${fase.Fases}</h4>
            <p class="mb-1">Fecha: ${fase.Fecha}</p>
            <p class="mb-0">${fase.Descripcion}</p>
          </div>
        </div>
      `;

      contenedorFases.appendChild(card);
    });
  } catch (err) {
    console.error("Error cargando las fases lunares:", err);
  }
});




