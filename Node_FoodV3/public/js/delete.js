document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("table.today tbody");
  const trs = document.querySelectorAll("table.today TR");

  let x = 0;
  let y = 0;

  const div = document.createElement("DIV");
  div.setAttribute("class", "tooltip");
  div.textContent = `삭제`;
  tbody.appendChild(div);

  tbody?.addEventListener("contextmenu", (e) => {
    const target = e.target;

    if (target.tagName === "TD") {
      const tr = target.closest("TR");

      if (tr.dataset.seq) {
        tr.style.backgroundColor = "#ddd";
        div.classList.add("active");
        x = e.clientX;
        y = e.clientY;
        div.style.transform = "translate(" + x + "px, " + y + "px)";
      }
    }
    e.preventDefault();
  });
  document.addEventListener("click", () => {
    div.classList.remove("active");
  });
});
