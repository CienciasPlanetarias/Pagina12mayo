document.querySelectorAll(".accordion-item label").forEach(label => {
  label.addEventListener("click", () => {
    const item = label.parentElement;
    const content = item.querySelector(".accordion-content");
    const icon = label.querySelector(".icon");

    if (item.classList.contains("active")) {
      // 🔻 Cerrar
      content.style.maxHeight = content.scrollHeight + "px"; // punto inicial
      requestAnimationFrame(() => {
        content.style.maxHeight = "0"; // colapsa suavemente
      });
      item.classList.remove("active");
      if (icon) icon.textContent = "+";
    } else {
      // 🔺 Abrir
      content.style.maxHeight = "0"; // aseguro punto de inicio
      item.classList.add("active");
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px"; // expande
      });
      if (icon) icon.textContent = "-";

      // Una vez termina la animación → setear auto
      content.addEventListener("transitionend", () => {
        if (item.classList.contains("active")) {
          content.style.maxHeight = "none";
        }
      }, { once: true });
    }
  });
});
