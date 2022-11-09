document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.today");
  const form = document.querySelector("form.today");
  const btnInput = document.querySelector("button.today.input");
  const btnReset = document.querySelector("button.today.reset");

  table?.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "TD") {
      const parentTR = target.closest("TR");
      const t_seq = parentTR.dataset.seq;
      const tds = parentTR.childNodes;

      for (let td of tds) {
        // document.querySelector("input[name='t_date']")
        // 배열의 index 를 사용하여 어떤 값을 getter, setter 하는 경우
        // 정확히 원하는 index 가 지정이 안되는 경우가 있다.
        // inputs[index].value = td.textContent
        if (td?.title) {
          const input = document.querySelector(`input[name=${td.title}]`);
          input.value = td.textContent;
        }
      }
      document.querySelector("input[name='t_seq']").value = t_seq;
      // button.input tag 에 update 라는 클래스를 부착하라
      btnInput.classList.add("update");
    }
  });

  btnReset?.addEventListener("click", () => {
    btnInput.classList.remove("update");
  });
});
