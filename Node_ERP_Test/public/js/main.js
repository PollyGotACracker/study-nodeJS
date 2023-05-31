document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const btnAdd = document.querySelector("button.btn_add");

  nav?.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "LI") {
      const text = target.textContent;

      let path = "/";
      switch (text) {
        case "Home":
          path = "/";
          break;
        case "거래처관리":
          path = "/manage";
          break;
      }
      location.pathname = path;
    }
  });

  btnAdd?.addEventListener("click", () => {
    location.pathname = `manage/edit`;
  });
});
