document.addEventListener("DOMContentLoaded", () => {
  const btnUpdate = document.querySelector("button.product.update");
  const btnDelete = document.querySelector("button.product.delete");
  const ptaxTD = document.querySelectorAll("tbody tr td")[8];
  const pcode = document.querySelector("div.button.box").dataset.p_code;

  // public_p_tax 는 detail.pug 에서 선언 및 초기화
  // p_tax 값에 따라 과세여부 텍스트 표시
  if (public_p_tax === "1") {
    ptaxTD.textContent = "예";
  } else if (public_p_tax === "0") {
    ptaxTD.textContent = "아니오";
  }

  btnUpdate?.addEventListener("click", () => {
    document.location.href = `/product/update/${pcode}`;
  });
  btnDelete?.addEventListener("click", () => {
    const delChk = confirm("이 데이터를 삭제할까요?");
    if (!delChk) {
      return false;
    }
    document.location.href = `/product/delete/${pcode}`;
  });
});
