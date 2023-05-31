document.addEventListener("DOMContentLoaded", () => {
  const formInsert = document.querySelector("form.insert");
  const inputs = document.querySelectorAll("input");
  const btnSubmit = document.querySelector("button.submit");

  btnSubmit?.addEventListener("click", () => {
    for (let i = 0; i < inputs.length; i++) {
      const e = inputs[i];
      if (!e.value) {
        alert(`${e.placeholder} 칸을 입력하세요.`);
      } else {
        continue;
      }
      e.focus();
      return false;
    }

    formInsert.submit();
  });
});
