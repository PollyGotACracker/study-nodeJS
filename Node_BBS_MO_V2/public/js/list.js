document.addEventListener("DOMContentLoaded", () => {
  const bbsList = document.querySelector("table.bbs.list");
  const btnInsert = document.querySelector("button.bbs.insert");
  btnInsert?.addEventListener("click", () => {
    document.location.href = "/board/insert";
  });
  bbsList?.addEventListener("click", (event) => {
    const td = event.target;
    if (td.tagName === "TD") {
      const id = td.closest("TR").dataset.id;
      document.location.href = `/board/detail/${id}`;
    }
  });
});
