document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.list");

  table?.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "TD") {
      const pTR = target.closest("TR");
      const num = pTR.dataset.num;

      location.pathname = `/manage/detail/${num}`;
    }
  });
});
