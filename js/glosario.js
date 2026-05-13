// URL del Google Sheets con OpenSheet (JSON)
const glosario = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Glosario";

let terms = [];

// Alfabeto español completo
const ALFABETO = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z".split(" ");

// 1. Cargar datos desde Google Sheets
async function loadTerms() {
  try {
    const response = await fetch(glosario);
    const data = await response.json();

    // Filtrar solo filas válidas y limpiar espacios
    terms = data
      .filter(row => row && Object.keys(row).length > 0)
      .map(row => ({
        termino: row["Termino"] ? row["Termino"].trim() : "",
        definicion: row["Descripcion"] ? row["Descripcion"].trim() : ""
      }))
      .filter(t => t.termino && t.definicion); // ignorar vacíos

    renderAlphabet();
    renderAccordion(terms);
  } catch (error) {
    console.error("Error al cargar el glosario:", error);
    document.getElementById("glossaryAccordion").innerHTML =
      "<p class='text-danger'>No se pudieron cargar los términos del glosario.</p>";
  }
}

// 2. Renderizar índice dinámico con todas las letras
function renderAlphabet() {
  const alphabetDiv = document.getElementById("alphabet");
  alphabetDiv.innerHTML = "";

  ALFABETO.forEach(l => {
    const btn = document.createElement("button");
    btn.textContent = l;
    btn.className = "btn btn-sm me-1 mb-1";

    // Verifico si hay algún término con esa letra
    const hasTerm = terms.some(t => t.termino[0].toUpperCase() === l);

    if (hasTerm) {
      btn.classList.add("btn-outline-primary"); // letra activa
      btn.onclick = () => filterByLetter(l);
    } else {
      btn.classList.add("btn-outline-danger"); // letra sin términos
      btn.style.textDecoration = "line-through"; // tachada
      btn.disabled = true; // no clickeable
    }

    alphabetDiv.appendChild(btn);
  });
}

// 3. Renderizar acordeón
function renderAccordion(lista) {
  const container = document.getElementById("glossaryAccordion");
  container.innerHTML = "";

  // Ordenar términos alfabéticamente
  lista.sort((a, b) => a.termino.localeCompare(b.termino, 'es', { sensitivity: 'base' }));

  lista.forEach((t, i) => {
    container.innerHTML += `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading${i}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#term${i}">
            ${t.termino}
          </button>
        </h2>
        <div id="term${i}" class="accordion-collapse collapse" data-bs-parent="#glossaryAccordion">
          <div class="accordion-body">
            ${t.definicion}
          </div>
        </div>
      </div>
    `;
  });
}

// 4. Filtrar por letra
function filterByLetter(letter) {
  const filtrados = terms.filter(t => t.termino[0].toUpperCase() === letter);
  renderAccordion(filtrados);
}

// 5. Botón "Ver todos"
document.getElementById("showAll").addEventListener("click", () => renderAccordion(terms));

// 6. Iniciar
loadTerms();
