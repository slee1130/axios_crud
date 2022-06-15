import { readCookie, eraseCookie } from "../utils/cookie.js";
const navEl = document.querySelector("#nav");
const userEmailEl = document.querySelector("#nav-logout > div");
const logoutEl = document.querySelector("#logout");
const emailCookie = readCookie("email");
userEmailEl.innerHTML = emailCookie;
const renderUsername = emailCookie
  ? `<span>
          <div></div>
          <a href="#"> Logout</a>
        </span>`
  : ` <span>
          <a href="/login.html">Login</a>|<a href="/signup.html"> Sign Up</a>
        </span>`;

logoutEl.addEventListener("click", () => {
  eraseCookie("email");
  renderNav();
});

function renderNav() {
  navEl.innerHTML = `
    <a href="/images">Collect Images</a> |
    ${renderUsername}
  `;
}
