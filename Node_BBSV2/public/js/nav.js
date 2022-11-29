document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  nav?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "LI") {
      let href = "";
      switch (target.textContent) {
        case "표지":
          href = "/";
          break;
        case "일정":
          href = "/schedule";
          break;
        case "목표":
          href = "/list";
          break;
        case "포스트":
          href = "/posts";
          break;
        case "게시판":
          href = "/board";
          break;
        case "갤러리":
          href = "/gallery";
          break;
      }
      location.href = href;
    }
  });
});
