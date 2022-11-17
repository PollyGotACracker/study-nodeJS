document.addEventListener("DOMContentLoaded", () => {
  // const updateBTN = document.querySelector("button.buyer.update");
  // const deleteBTN = document.querySelector("button.buyer.delete");
  const buttonBox = document.querySelector("article.detail.button");

  buttonBox?.addEventListener("click", (tag) => {
    const button = tag.target;
    if (button.tagName === "BUTTON") {
      const bcode = button.closest("article")?.dataset.b_code;
      const classList = Array.from(button.classList);
      let url = "/buyer";
      if (classList.indexOf("update") > 0) {
        url += `/update/${bcode}`; // ==> /buyer/update/B001

        document.location.href = url;
      } else if (classList.indexOf("delete") > 0) {
        // ==> indexOf()은 지정한 요소가 배열에 없을 경우 -1을 반환
        if (!confirm("정말로 삭제하시겠습니까?")) {
          return false;
        }
        url += `/delete/${bcode}`; // ==> /buyer/delete/B001
        document.location.replace(url);
      }
    }
  });

  //   updateBTN?.addEventListener("click", () => {
  //     const parents = updateBTN.closest("article");
  //     const bcode = parents.dataset.bcode;
  //     alert(bcode);
  //   });
});

// location.href: GET method 로 새로운 페이지를 요청하기
// 현재 보이는 화면이 뒤로 밀리고 새로운 페이지가 열린다.
// location.replace() 함수: 현재 화면(페이지)를 url 페이지로 덮어쓰기
// 뒤로가기를 할 때 이 페이지를 건너뛴다
// 현재 보고 있는 detail 데이터가 삭제되었는데 뒤로가기를 했을 때
// 다시 detail 화면이 나타나는 것은 매우 어색하다
// 이럴 땐 replace() 함수를 사용한다.
