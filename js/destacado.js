
  const sheetURL = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Destacado"; 
    fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
        // Suponiendo que la hoja tiene columnas: Imagen | Titulo | Descripcion
        const destacado = data[0]; // solo el primero (evento del mes)
        const article = document.getElementById("destacado-article");

        article.innerHTML = `
        <header>
            <h2>${destacado.Titulo}</h2>
        </header>
        <div class="contenido">
            <img src="${destacado.Imagen}" alt="Imagen destacada">
            <div class="poem">
            ${destacado.Descripcion.split("\n").map(p => `<p>${p}</p>`).join("")}
            </div>
        </div>
        `;

    })
    .catch(err => console.error("Error cargando la hoja:", err));
