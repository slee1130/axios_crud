import { readCookie, eraseCookie } from "../utils/cookie.js";

const userEmailEl = document.querySelector("#nav-logout > div");
const logoutEl = document.querySelector("#logout");
const emailCookie = readCookie("email");
userEmailEl.innerHTML = emailCookie;

logoutEl.addEventListener("click", () => {
  eraseCookie("email");
});

function renderNav() {
  if (emailCookie) {
    document.getElementById("nav-default").style.display = "none";
  } else {
    document.getElementById("nav-default").style.display = "inline-block";
  }
}

renderNav();
