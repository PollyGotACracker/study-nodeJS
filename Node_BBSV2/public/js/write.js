document.addEventListener("DOMContentLoaded", () => {
  const inputArr = document.querySelectorAll("form.bbs.write input");
  const textarea = document.querySelector("form.bbs.write textarea");
  const msg = document.querySelector(".bbs.msg");

  const btnInput = document.querySelector("button.bbs.input");
  const btnList = document.querySelector("button.bbs.list");
  const formInput = document.querySelector("form.bbs.write");

  const date = new Date();
  const dateVal = {
    year: date.getFullYear(),
    month: String(date.getMonth() + 1).padStart(2, 0),
    date: String(date.getDate()).padStart(2, 0),
    day: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][
      date.getDay()
    ],
  };
  const timeVal = {
    hour: String(date.getHours()).padStart(2, 0),
    minute: String(date.getMinutes()).padStart(2, 0),
    second: String(date.getSeconds()).padStart(2, 0),
  };
  for (let input of inputArr) {
    if (input.title === "작성일자") {
      input.value = `${dateVal.year}-${dateVal.month}-${dateVal.date} ${dateVal.day}`;
    }
    if (input.title === "작성시각") {
      input.value = `${timeVal.hour}:${timeVal.minute}:${timeVal.second}`;
    }
  }

  const chkValue = () => {
    for (let input of inputArr) {
      if (!input.value) {
        msg.textContent = `${input.title} 란을 입력하세요`;
        input.focus();
        return false;
      }
    }
    if (!textarea.value) {
      msg.textContent = "게시물 내용을 입력하세요";
      textarea.focus();
      return false;
    }
    return true;
  };

  btnInput?.addEventListener("click", () => {
    // 유효성 검사 후
    if (chkValue()) {
      formInput?.submit();
    }
  });
  btnList?.addEventListener("click", () => {
    document.location.href = "/";
  });
});
