document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("TABLE");
  const tr = document.querySelectorAll("TR");

  table?.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "TH") {
      return false;
    }
    if (target.tagName === "TD") {
      const parentTR = target.closest("TR");
      const Inputdate = parentTR.children[0];
      const date = parentTR.children[0].textContent;
      const food = parentTR.children[1].textContent;

      if (target !== Inputdate) {
        const del = confirm("이 데이터를 삭제하시겠습니까?");
        if (!del) {
          return false;
        } else {
          document.location.href = `/${date}/${food}/delete`;
        }
      }

      if (target === Inputdate) {
        let sum = 0;

        for (let i = 1; i < tr.length; i++) {
          const tr_0 = tr[i].children[0].textContent;
          const tr_4 = tr[i].children[4].textContent;
          if (date === tr_0) {
            sum += parseInt(tr_4);
          } else {
            continue;
          }
        }
        alert(`${date}\n하루 칼로리는... ${sum}K`);
        return false;
      }
    }
  });
});
