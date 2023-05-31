document.addEventListener("DOMContentLoaded", () => {
  /**
   * 데이터가 표시된 td 를 클릭하면
   * td 가 있는 데이터를 input box 에 표시하기
   *
   * td 에 클릭 event 를 설정하려면
   * 데이터의 개수 x td 의 개수 만큼 event 를 추가해야 한다.
   * 효율 면에서 매우 불편한 코드가 될 것이다.
   *
   * 처리할 td 를 감싸고 있는 대상 중에서
   * 1개만 있는 box 를 찾아서 그 box 에 click event 를 설정하여
   * event 버블링을 활용하여 실제 코드를 처리한다.
   */

  const table = document.querySelector("table.today");
  const form = document.querySelector("form.today");
  const inputs = document.querySelectorAll("input");
  const btnInput = document.querySelector("button.today.input");
  const btnReset = document.querySelector("button.today.reset");
  btnReset?.addEventListener("click", () => {
    const seqTag = form.querySelector("input[name='t_seq']");
    // inline if 문 : 한줄의 명령만 포함하는 if
    if (seqTag) form.removeChild(seqTag);
    btnInput.style.backgroundColor = "blue";
    btnInput.textContent = "추가";
  });

  table?.addEventListener("click", (e) => {
    const target = e.target;

    // 한 개의 td 를 클릭하면 같은 그룹에 있는 td 들의 text 를 getter 하여
    // input box 에 보여야 한다.
    // cf) DOM 요소는 무조건 대문자
    if (target.tagName === "TD") {
      // 클릭된 td 를 감싸고 있는 tr 을 찾기
      const parentTR = target.closest("TR");
      const t_seq = parentTR.dataset.seq; // tr 에 부착된 data-seq 값 getter

      // tr 이 감싸고 있는 td 들을 한꺼번에 select 하기
      // childNodes : pTR 이 감싸고 있는 모든 tag 리스트
      const tds = parentTR.childNodes;

      for ([index, td] of tds.entries()) {
        // tds 즉 td 의 개수는 모두 6개 이므로 index 는 0 ~ 5 까지이다.
        // input box 는 모두 5개이다 이므로 input 의 index 는 0 ~ 4까지이다.
        // inputs[index] 값을 검사하여 이 값이 없으면(undefined) 제외하기 : exception 처리
        if (inputs[index]) {
          inputs[index].value = td.textContent;
        }
        // td 를 클릭했을 때 input box 에 데이터를 표시하는 부분까지 완성
      }

      /**
       * 현재는 "추가" 버튼을 클릭하면 기존 데이터가 계속해서 add 되는 현상이 발생한다.
       *
       * 원하는 것은 list 를 클릭하고 input box 에 값이 표시되고
       * 버튼을 클릭하면 해당 내용이 수정(변경)되기를 바란다.
       *
       * 변경 처리를 하려면 반드시 데이터에 seq 가 있어야 한다.
       */

      btnInput.textContent = "변경";
      btnInput.style.backgroundColor = "green";

      const inputProps = {
        name: `t_seq`,
        value: `${t_seq}`,
        style: `display:"hidden"`,
      };

      /**
       * input tag 를 하나 생성하고,
       * input tag 의 속성을 inputProps 객체에 설정된 값들로 채워라
       * input = document.createElement("input");
       * input.name = "t_seq";
       * input.value = `${t_seq}`;
       * input.style.display = "hidden";
       *
       * Object.assign(): 객체(input)에 어떤 값(속성)을 추가하거나 할 때 사용하는 함수
       */

      // 데이터를 수정하려면 반드시 t_seq(PK)가 필요하다.
      // 현재 화면에 보이는 input box 들에는 t_seq name 을 가진 input tag 가 없다.
      // 임의로
      // <input name = "t_seq" value="PK값" style="display:hidden;">
      // tag 를 화면 form 에 추가하기
      // 그래야만이 router(server) 로 데이터를 전송했을 때 t_seq 를 함께 보내서
      // Update 를 수행할 수 있기 때문에...

      const t_seq_input = Object.assign(
        document.createElement("input"),
        inputProps
      );
      // 혹시 form tag 내에 input name=t_tag 속성이 있으면 먼저 제거하기
      const seqTag = form.querySelector("input[name='t_seq']");
      if (seqTag) {
        form.removeChild(seqTag);
      }
      form.appendChild(t_seq_input);
    }
  });
});

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
/*
      //   inputs.forEach((input, index) => {
      //     input.value = parentTR.children[index].textContent;
      //   });
for (let [index, input] of inputs.entries()) {
  input.value = parentTR.children[index].textContent;
      }
      */
