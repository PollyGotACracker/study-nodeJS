// /student/S0007/detail 페이지
// st_detail.ejs 의 student btn-box 의 수정/삭제/리스트 버튼 클릭 시 페이지 이동하는 기능

document.addEventListener("DOMContentLoaded", () => {
  const btnGroup = document.querySelector("div.student.btn-box");
  btnGroup?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      // tag 속성에서 class 이름을 getter
      const className = target.className;
      // st_detail.ejs 의 tr 에 설정된 data-st_num 값 getter
      // 요소.dataset.설정한 속성명
      const st_num = target.closest("DIV")?.dataset?.st_num;

      if (className === "st_delete") {
        // ! 연산자가 있으므로 취소 버튼을 누르면 return false;
        if (!confirm(`${st_num} 학생 정보를 삭제합니다.`)) {
          return false;
        }
      }
      let reqURL = "/";
      switch (className) {
        case "st_update":
          reqURL = `/student/${st_num}/update`;
          break;
        case "st_delete":
          reqURL = `/student/${st_num}/delete`;
          break;
        case "st_list":
          reqURL = "/student";
          break;
      }
      document.location.href = reqURL;
    }
  });
});
