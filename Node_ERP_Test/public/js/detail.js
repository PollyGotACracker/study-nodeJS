document.addEventListener("DOMContentLoaded", () => {
  const btnUpdate = document.querySelector("button.btn_update");
  const btnDelete = document.querySelector("button.btn_delete");
  const num = document.querySelector(".btn_container").dataset.num;

  btnUpdate?.addEventListener("click", () => {
    location.pathname = `manage/edit/${num}`;
  });

  btnDelete?.addEventListener("click", () => {
    const delChk = confirm("이 데이터를 삭제할까요?");
    if (!delChk) {
      return false;
    }
    location.pathname = `manage/delete/${num}`;
  });
});
