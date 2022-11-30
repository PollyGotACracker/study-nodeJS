document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const date = new Date();
  const time = date.getHours();
  if (time >= 6 && time <= 17) {
    body.style.backgroundImage =
      "linear-gradient(160deg, rgb(21 98 177) 0%, rgb(243 255 253) 100%)";
  } else {
    body.style.backgroundImage =
      "linear-gradient(160deg, rgb(22 41 82) 0%, rgb(186 235 232) 100%)";
  }
});
