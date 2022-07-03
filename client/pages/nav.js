import { readCookie, eraseCookie } from "../utils/cookie.js";

const emailCookie = readCookie("email");

function userEmail() {
  const userEmailEl = document.querySelector("#nav-logout > div");
  userEmailEl.innerHTML = emailCookie;
}

userEmail();

function renderNav() {
  if (emailCookie) {
    document.getElementById("nav-default").style.display = "none";
  } else {
    document.getElementById("nav-default").style.display = "inline-block";
  }
}

renderNav();

document.querySelector("#logout").addEventListener("click", () => {
  eraseCookie("email");
});
