document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("table.today");
  const inputs = document.querySelectorAll("input");

  table?.addEventListener("click", (e) => {
    const target = e.target;

    // cf) DOM 요소는 무조건 대문자
    if (target.tagName === "TD") {
      const parentTR = target.closest("TR");
      //   inputs.forEach((input, index) => {
      //     input.value = parentTR.children[index].textContent;
      //   });

      /**
       * cf)
       * for of 문에서 destructuring 사용
       *
       * Array.prototype.entries()
       * 배열의 각 인덱스에 대한 키/값 쌍을 가지는 새로운 Array Iterator 객체를 반환
       *
       * const a = ["a", "b", "c"];
       * for (const [index, element] of a.entries()) {
       *   console.log(index, element);
       * }
       *
       * // 0 'a'
       * // 1 'b'
       * // 2 'c'
       */
      for (let [index, input] of inputs.entries()) {
        input.value = parentTR.children[index].textContent;
      }
    }
  });
});
