// ===============================
// LEER EVENTOS DE LA TABLA
// ===============================

//ESTE JS SE LLAMA CALENDARIO POR QUE MUESTRA LA TABLA DE EVENTOS EN EL INDEX Y ESTÁ UNIDA AL CALENDARIO DE FORMA DINAMICA
//FECHA QUE SE AGREGA EN LA TABLA DINAMIA, AUTOMATICAMENTE SE MUESTRA EN EL CALENDARIO
// function leerEventosDeTabla() {
//   const filas = document.querySelectorAll("#tabla-eventos tr");
//   let eventos = [];

//   filas.forEach(fila => {
//     const fechaTexto = fila.cells[0]?.innerText.trim();
//     const titulo = fila.cells[1]?.innerText.trim();
//     const descripcion = fila.cells[2]?.innerText.trim();
//     if (!fechaTexto) return;

//     let fechaDate = null;

//     if (fechaTexto.includes("/")) {
//       const [d, m, y] = fechaTexto.split("/");
//       fechaDate = new Date(parseInt(y,10), parseInt(m,10)-1, parseInt(d,10));
//     } else {
//       const partes = fechaTexto.toLowerCase().split(" ");
//       if (partes.length === 3) {
//         const dia = parseInt(partes[0],10);
//         const mes = meses[partes[1]]; // tu array de meses 0-11
//         const anio = parseInt(partes[2],10);
//         if (!isNaN(dia) && mes !== undefined && !isNaN(anio)) {
//           fechaDate = new Date(anio, mes, dia);
//         }
//       }
//     }

//     if (fechaDate) {
//       eventos.push({
//         title: titulo,
//         start: fechaDate,
//         allDay: true,
//         description: descripcion,
//         display: 'background',       // marca la fecha pero no muestra bloque duplicado
//         backgroundColor: '#ffc10733', // semitransparente
//         borderColor: '#ffc107',
//         textColor: '#000000'
//       });
//     }
//   });

//   return eventos;
// }

// // ===============================
// // INICIALIZAR FULLCALENDAR CON POPOVER GLOBAL
// // ===============================
// document.addEventListener('DOMContentLoaded', function() {
//   const calendarEl = document.getElementById('calendar');
//   let popoverGlobal = null; // popover único global

// window.calendar = new FullCalendar.Calendar(calendarEl, {
//   initialView: 'dayGridMonth',
//   locale: 'es',
//   aspectRatio: 1,
//   contentHeight: 230,
//   dayMaxEventRows: true,
//   buttonText: { today: 'Hoy', month: 'Mes', week: 'Semana', day: 'Día' },
//   events: leerEventosDeTabla(),

//   // 👇 mostramos una estrellita en cada fecha con evento
//     eventContent: function() {
//       return {
//         html: '<span class="estrella-evento">★</span>'
//       };
//     },

//       eventClick: function(info) {
//         info.jsEvent.preventDefault();
//         if (popoverGlobal) {
//           popoverGlobal.dispose();
//           popoverGlobal = null;
//         }
//         popoverGlobal = new bootstrap.Popover(info.el, {
//           html: true,
//           trigger: 'manual',
//           title: info.event.title,
//           content: info.event.extendedProps.description,
//           placement: 'auto'
//         });
//         popoverGlobal.show();
//         document.addEventListener('click', function cerrarPopover(e) {
//           if (!info.el.contains(e.target) && popoverGlobal) {
//             popoverGlobal.dispose();
//             popoverGlobal = null;
//             document.removeEventListener('click', cerrarPopover);
//           }
//         });
//       }
//     });


//       window.calendar.render();
//     });

// // ===============================
// // ACTUALIZAR CALENDARIO
// // ===============================
// function actualizarCalendario() {
//   if (window.calendar) {
//     window.calendar.removeAllEvents();
//     window.calendar.addEventSource(leerEventosDeTabla());
//   }
// }

// // ===============================
// // FETCH GOOGLE SHEETS
// // ===============================

// const url = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Calendario";

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     const tbody = document.getElementById("tabla-eventos");
//     tbody.innerHTML = "";

//     data.forEach(ev => {
//       let fecha = ev.Fecha || "";
//       if (fecha.includes("-")) {
//         const [y, m, d] = fecha.split("-");
//         fecha = `${d}/${m}/${y}`;
//       }

//       const fila = `
//         <tr>
//           <td>${fecha}</td>
//           <td>${ev.Evento || ""}</td>
//           <td>${ev.Descripcion || ""}</td>
//         </tr>
//       `;
//       tbody.innerHTML += fila;
//     });

//     actualizarCalendario();
//   })
//   .catch(err => {
//     console.error(err);
//     document.getElementById("tabla-eventos").innerHTML =
//       `<tr><td colspan="3" class="text-danger">Error cargando datos.</td></tr>`;
//   });

// // ===============================
// // BOTONES HOY E IR A FECHA
// // ===============================
// document.addEventListener('DOMContentLoaded', () => {
//   const btnHoy = document.getElementById('todayBtn');
//   if (btnHoy) btnHoy.addEventListener('click', () => window.calendar.today());

//   const btnIrFecha = document.getElementById('irFechaBtn');
//   if (btnIrFecha) btnIrFecha.addEventListener('click', () => {
//     const inputFecha = document.getElementById('fechaBuscador').value;
//     if (inputFecha) window.calendar.gotoDate(inputFecha);
//   });

//   const hoy = new Date();
//   const fechaFormateada = hoy.toLocaleDateString("es-AR");
//   const fechaActualEl = document.getElementById("fecha-actual");
//   if (fechaActualEl) fechaActualEl.textContent = fechaFormateada;
// });

(() => {
  // ------------------- URLs y cache -------------------
  const CALENDAR_URL = "https://opensheet.elk.sh/1GmDhTaswEHOru4XePoogbs_vTBey3faAhCli6X4lb8A/Calendario";
  const CACHE_CALENDAR = "cacheCalendar";

  // ------------------- Calendario -------------------
  const calendarEl = document.getElementById('calendar');
  let calendar = null;
  let popoverGlobal = null;

  const meses = {
    enero:0,febrero:1,marzo:2,abril:3,mayo:4,junio:5,
    julio:6,agosto:7,septiembre:8,octubre:9,noviembre:10,diciembre:11
  };

  function parseFecha(texto){
    if(!texto) return null;
    texto = texto.trim();
    if(texto.includes("/")){
      const [d,m,y] = texto.split("/");
      return new Date(parseInt(y,10), parseInt(m,10)-1, parseInt(d,10));
    } else {
      const partes = texto.toLowerCase().split(" ");
      if(partes.length===3){
        const dia = parseInt(partes[0],10);
        const mes = meses[partes[1]];
        const anio = parseInt(partes[2],10);
        if(!isNaN(dia) && mes!==undefined && !isNaN(anio)) return new Date(anio,mes,dia);
      }
    }
    return null;
  }

  function construirEventos(data){
    return data.map(ev => {
      const fecha = parseFecha(ev.Fecha);
      if(!fecha) return null;
      return {
        title: ev.Evento || "",
        start: fecha,
        allDay: true,
        description: ev.Descripcion || "",
        display: 'background',
        backgroundColor:'#ffc10733',
        borderColor:'#ffc107',
        textColor:'#000'
      };
    }).filter(Boolean);
  }

  function renderTabla(data){
    const tbody = document.getElementById("tabla-eventos");
    if(!tbody) return;
    const fragment = document.createDocumentFragment();
    data.forEach(ev => {
      const tr = document.createElement("tr");
      const fecha = ev.Fecha.includes("-") ? ev.Fecha.split("-").reverse().join("/") : ev.Fecha;
      tr.innerHTML = `<td>${fecha}</td><td>${ev.Evento||""}</td><td>${ev.Descripcion||""}</td>`;
      fragment.appendChild(tr);
    });
    tbody.innerHTML = "";
    tbody.appendChild(fragment);
  }

  function inicializarCalendario(eventos){
    if(!calendarEl) return;
    if(calendar){calendar.removeAllEvents(); calendar.addEventSource(eventos); return;}

    calendar = new FullCalendar.Calendar(calendarEl, {
      initialView:'dayGridMonth',
      locale:'es',
      aspectRatio:1,
      contentHeight:230,
      dayMaxEventRows:true,
      buttonText:{today:'Hoy', month:'Mes', week:'Semana', day:'Día'},
      events: eventos,
      eventContent: ()=>({html:'<span class="estrella-evento">★</span>'}),
      eventClick: info => {
        info.jsEvent.preventDefault();

        // Cerrar cualquier popover abierto
        if(popoverGlobal){
          popoverGlobal.dispose();
          popoverGlobal = null;
        }

        // Crear popover
        popoverGlobal = new bootstrap.Popover(info.el, {
          html: true,
          trigger: 'manual',
          title: info.event.title,
          content: info.event.extendedProps.description || "Sin descripción",
          placement: window.innerWidth < 576 ? 'bottom' : 'auto', // FORZAR abajo en XS-SM
          container: 'body'
        });

        popoverGlobal.show();

        // Cerrar al click/tap afuera
        const cerrar = e => {
          if(!info.el.contains(e.target)){
            if(popoverGlobal){
              popoverGlobal.dispose();
              popoverGlobal = null;
            }
            document.removeEventListener('click', cerrar);
            document.removeEventListener('touchstart', cerrar);
          }
        };
        document.addEventListener('click', cerrar);
        document.addEventListener('touchstart', cerrar);
      }
    });

    calendar.render();
  }

  function cargarCalendario(){
      const cache = localStorage.getItem(CACHE_CALENDAR);
      if(cache){
        try{
          let data = JSON.parse(cache);
          
          // --- AÑADE ESTO: Ordenar antes de renderizar ---
          data.sort((a, b) => parseFecha(a.Fecha) - parseFecha(b.Fecha));
          // -----------------------------------------------

          renderTabla(data);
          inicializarCalendario(construirEventos(data));
        }catch{}
      }

      fetch(CALENDAR_URL)
        .then(res => res.json())
        .then(data => {
          
          // --- AÑADE ESTO: Ordenar los datos nuevos ---
          data.sort((a, b) => {
            const fechaA = parseFecha(a.Fecha) || new Date(0);
            const fechaB = parseFecha(b.Fecha) || new Date(0);
            return fechaA - fechaB;
          });
          // ---------------------------------------------

          renderTabla(data);
          inicializarCalendario(construirEventos(data));
          localStorage.setItem(CACHE_CALENDAR, JSON.stringify(data));
        })
        .catch(err => {
          // ... tu manejo de error
        });
    }

  // ------------------- Botones y DOM -------------------
  document.addEventListener('DOMContentLoaded', () => {
    cargarCalendario();

    const btnHoy = document.getElementById('todayBtn');
    if(btnHoy) btnHoy.addEventListener('click', ()=> calendar.today());

    const btnIrFecha = document.getElementById('irFechaBtn');
    if(btnIrFecha) btnIrFecha.addEventListener('click', ()=>{
      const input = document.getElementById('fechaBuscador').value;
      if(input) calendar.gotoDate(input);
    });

    const fechaActualEl = document.getElementById("fecha-actual");
    if(fechaActualEl) fechaActualEl.textContent = new Date().toLocaleDateString("es-AR");
  });
})();

