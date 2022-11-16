document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.product.input");
  const btnList = document.querySelector("button.product.list");
  const inputs = document.querySelectorAll("input");
  const oPrice = document.querySelector("input[id='p_oprice']");
  const opriceType = document.querySelector("input[id='p_oprice_type']");
  const pcode = document.querySelector("input[id='p_code']");
  const ptaxY = document.querySelector("input[id='p_tax_y']");
  const ptaxN = document.querySelector("input[id='p_tax_n']");

  // public_p_code 는 write.pug 에서 선언 및 초기화
  // p_code 값이 있을 경우(update) 해당 input 에 readonly 속성 설정
  if (public_p_code) {
    pcode.setAttribute("readonly", "readonly");
  }

  // public_p_tax 는 write.pug 에서 선언 및 초기화
  // p_tax 값에 따라 radio button checked 속성 설정
  if (!public_p_tax) {
    ptaxY.checked = true; // 1을 기본값으로
  } else if (public_p_tax) {
    if (public_p_tax === "1") {
      ptaxY.checked = true; // 1
      ptaxN.checked = false;
    } else if (public_p_tax === "0") {
      ptaxY.checked = false;
      ptaxN.checked = true; // 0
    }
  }

  // p_oprice 계산 함수
  const calcOprice = (value) => {
    if (ptaxY.checked) {
      oPrice.value = Math.round(Number(value) / 1.1);
    } else if (ptaxN.checked) {
      oPrice.value = value;
    }
  };

  // 유효성 검사 함수
  const valCheck = () => {
    for (let input of inputs) {
      const title = input.title;
      const value = input.value;
      if (title === "상품코드" && (value.length < 13 || value.length > 13)) {
        alert(`${title}는 13자리까지 입력하세요.`);
      } else if (title === "상품명" && !value) {
        alert(`${title}은 필수항목입니다.`);
      } else {
        continue;
      }
      input.select();
      return false;
    }
    return true;
  };

  // input 입력값에 따라 p_oprice 자동 계산
  opriceType?.addEventListener("input", (e) => {
    const typeValue = e.target.value;
    calcOprice(typeValue);
  });

  // radio p_tax_y 에 체크했을 경우 계산 O
  ptaxY?.addEventListener("change", () => {
    const typeValue = opriceType.value;
    calcOprice(typeValue);
  });

  // radio p_tax_n 에 체크했을 경우 계산 X
  ptaxN?.addEventListener("change", () => {
    const typeValue = opriceType.value;
    calcOprice(typeValue);
  });

  btnInput?.addEventListener("click", () => {
    if (valCheck()) {
      document.querySelector("form.product.write").submit();
    }
  });

  btnList?.addEventListener("click", () => {
    document.location.href = "/product";
  });
});
