document.addEventListener("DOMContentLoaded", () => {
  const btnInsert = document.querySelector("button.product.insert");
  const tbody = document.querySelector("table.product.list tbody");

  tbody?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const pTR = target.closest("TR");
      const code = pTR.dataset.p_code;

      document.location.href = `/product/detail/${code}`;
    }
  });

  btnInsert?.addEventListener("click", () => {
    document.location.href = "/product/insert";
  });
});
