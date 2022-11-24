document.addEventListener("DOMContentLoaded", () => {
  const doc = document;
  const btn = "button.bbs";
  const bbsUpdate = doc.querySelector(`${btn}.update`);
  const bbsDelete = doc.querySelector(`${btn}.delete`);
  const bbsList = doc.querySelector(`${btn}.list`);

  const bbsCommentAdd = doc.querySelector("button.comment.add");
  const bbsCommentInput = doc.querySelector("input#b_comment");

  bbsCommentAdd?.addEventListener("click", () => {
    const comment = bbsCommentInput?.value;
    if (!comment) {
      doc.querySelector(".comments.input .msg").textContent =
        "댓글을 입력하세요.";
      bbsCommentInput.select();
      return false;
    }

    const commentData = { id, ct_comment: comment };
    /**
     * fetch 기본 method 는 GET 방식이다.
     * 데이터를 보낼 때는 POST, PUT 으로 전송을 해야 한다.
     * POST : 없는 데이터를 새로 추가할 때(INSERT 를 실행)
     * PUT: 기존 데이터를 변경하고자 할 때
     */
    const fetchOption = {
      method: "PUT",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    };
    fetch("/comment/add", fetchOption)
      // fetch 가 성공적으로 수행되고 server 에서 req 가 오면
      // then() 함수가 호출된다.
      // res 변수에는 서버에서 보낸 Response 정보가 담겨있다.
      // Response 정보 중에서 우리가 필요한 것은
      // json type 의 데이터 뿐이다.
      // res 에서 json 을 추출하여  res.json()
      // 다음 then 함수에게 전달한다.  .then((res)=>{return res.json()})
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const commentList = json.b_comments;
        const cmmBox = document.querySelector(".comments.item");
        // map 을 사용하여 댓글 개수만큼의 pTag 를 만들기
        // 생성된 pTag 는 pTagList 배열에 담긴다
        const pTagList = commentList.map((cmm) => {
          const pTag = document.createElement("P");
          pTag.textContent = `${cmm.ct_writer}..${cmm.ct_comment}`;
          return pTag;
        });
        cmmBox.textContent = "";
        // pTagList 배열을 cmmBox 에 한꺼번에 append 하기
        // spread syntax 사용
        cmmBox.append(...pTagList);
      });
  });

  const clickEvent = (e) => {
    const btnInfo = e.target;
    const btnName = btnInfo.textContent;
    let URL = "/";
    switch (btnName) {
      case "수정":
        URL = `/update/${id}`;
        break;
      case "삭제":
        if (!confirm("정말 삭제하시겠습니까?")) {
          return false;
        }
        URL = `/delete/${id}`;
        break;
      case "리스트로":
        URL = "/";
        break;
    } // end switch
    document.location.href = URL;
  }; // end clickEvent

  bbsUpdate.addEventListener("click", clickEvent);
  bbsDelete.addEventListener("click", clickEvent);
  bbsList.addEventListener("click", clickEvent);
});
