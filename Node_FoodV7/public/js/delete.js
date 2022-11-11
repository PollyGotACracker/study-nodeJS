document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("table.today tbody");

  let x = 0;
  let y = 0;
  let delSeq = "";

  const btnDel = document.createElement("DIV");
  btnDel.setAttribute("class", "btn_delete");
  btnDel.textContent = `삭제`;
  tbody.appendChild(btnDel);

  const btnDelActive = {
    add(row, val) {
      row.classList.add("select");
      btnDel.classList.add("active");
      btnDel.style.transform = "translate(" + x + "px, " + y + "px)";
      delSeq = val;
    },
    remove() {
      const trs = document.querySelectorAll("table.today tr");

      for (let tr of trs) {
        tr.classList.remove("select");
      }
      btnDel.classList.remove("active");
    },
  };

  const deleteData = () => {
    const del = confirm(`이 데이터를 삭제하시겠어요?`);
    if (!del) {
      return false;
    } else {
      location.pathname = `/${delSeq}/delete`;
    }
  };

  tbody?.addEventListener("contextmenu", (e) => {
    const target = e.target;

    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const seq = tr.dataset.seq;
      if (seq) {
        x = e.clientX;
        y = e.clientY;
        btnDelActive.remove();
        btnDelActive.add(tr, seq);
      }
    }
    e.preventDefault();
  });
  document.addEventListener("click", btnDelActive.remove);
  btnDel?.addEventListener("click", deleteData);
});
