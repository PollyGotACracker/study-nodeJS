document.addEventListener("DOMContentLoaded", () => {
  const btnList = document.querySelector("div.products.button.box");
  const inputs = document.querySelectorAll("input");
  const formProduct = document.querySelector("form.products");

  const validation = () => {
    for (const input of inputs) {
      const inputTitle = input?.title;
      // p_code(상품코드), p_title(상품명), p_cprice(판매단가) 에만 타이틀 존재
      if (inputTitle) {
        const value = input?.value;
        if (!value) {
          const labelName = input
            .closest("DIV")
            .querySelector("label").textContent;
          alert(`필수 입력 항목입니다.\n${labelName}`);
          input.select();
          return false;
        }
      }
    }
    return true;
  };

  /**
   * cf)
   * layout 이나 main 파일에서 script 삽입 시...
   * 현재 DOM에 없는 요소를 호출할 경우 오류가 뜨면서 다음 스크립트가 실행되지 않으므로,
   * Optional Chaining 사용으로 오류를 막고 다음 스크립트로 건너뛰도록 함
   * if(...) {} 와 같은 동작
   *
   * 단, 함수나 값이 아닌 곳에 사용할 경우 오류가 발생하므로 뺄 것
   */

  btnList?.addEventListener("click", (event) => {
    const target = event.target;
    console.dir(target);
    if (target.tagName === "BUTTON") {
      const className = target?.className;
      // const className = Array.from(target.classList);
      // tag 의 class 이름에 input 이 포함되어 있으면
      if (className?.indexOf("input")) {
        if (!validation()) return false;
        formProduct.submit();
      } else if (className.indexOf("list")) {
        document.location.href = "/products";
      }
    }
  });
});
