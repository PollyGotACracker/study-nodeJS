document.addEventListener("DOMContentLoaded", () => {
  const btnInput = document.querySelector("button.product.input");
  const btnList = document.querySelector("button.product.list");
  const inputs = document.querySelectorAll("input");
  const opriceType = document.querySelector("input[id='p_oprice_type']");

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
  };

  const taxY = document.querySelector("input[id='p_tax_y']");
  const taxN = document.querySelector("input[id='p_tax_n']");
  const oPrice = document.querySelector("input[id='p_oprice']");

  opriceType?.addEventListener("input", (e) => {
    const typeValue = e.target.value;
    if (taxY.checked) {
      oPrice.value = Math.round(Number(typeValue) / 1.1);
    } else {
      oPrice.value = typeValue;
    }
  });

  taxY?.addEventListener("change", () => {
    const typeValue = opriceType.value;
    oPrice.value = Math.round(Number(typeValue) / 1.1);
  });
  taxN?.addEventListener("change", () => {
    const typeValue = opriceType.value;
    oPrice.value = typeValue;
  });

  btnInput?.addEventListener("click", () => {
    if (valCheck) {
      document.querySelector("form.product.write").submit();
    }
  });

  btnList?.addEventListener("click", () => {
    document.location.href = "/product";
  });
});
