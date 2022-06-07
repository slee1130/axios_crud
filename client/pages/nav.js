import { readCookie, eraseCookie } from "../utils/cookie.js";
const navEl = document.querySelector("#nav");
const linkEl = document.querySelector("#nav-default");
const linkLogOutEl = document.querySelector("#nav-logout");
const userEmailEl = document.querySelector("#nav-logout > div");

const emailCookie = readCookie("email");
linkEl.style.display = emailCookie ? "none" : "inline-block";
linkLogOutEl.style.display = emailCookie ? "inline-block" : "none";

userEmailEl.innerHTML = emailCookie;

const logoutEl = document.querySelector("#logout");
logoutEl.addEventListener("click", () => {
  eraseCookie("email");
  renderNav();
});

//if else statement로 로그인/ 로그아웃 아이디 구현하기

function renderNav() {
  navEl.innerHTML = `
    <a href="/images">Collect Images</a>
    |
    <span id="nav-default">
      <a href="/login.html">Login</a>|
      <a href="/signup.html"> Sign Up</a>
    </span>
    <span id="nav-logout">
      <div class="show__email"></div><a id="logout" href="#"> Logout</a>
    </span>
  `;
}
