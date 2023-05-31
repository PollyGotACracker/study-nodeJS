document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.edit");
  const inputs = document.querySelectorAll("form.edit input");
  const btnSave = document.querySelector("button.btn_save");
  const btnList = document.querySelector("button.btn_list");

  if (inputs[0].value) {
    inputs[0].setAttribute("readonly", "readonly");
  }

  btnSave?.addEventListener("click", () => {
    for (let input of inputs) {
      if (!input.value) {
        alert(`${input.placeholder}`);
        input.focus();
        return false;
      } else {
        continue;
      }
    }
    form.submit();
    location.pathname = `manage/detail/${buyers.b_num}`;
  });

  btnList?.addEventListener("click", () => {
    location.pathname = "manage";
  });
});
