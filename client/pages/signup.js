import UserService from "../services/UserService.js";

const submitBtn = document.querySelector("#signup-form");
submitBtn.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    emailValidation();
    passwordValidation();
    alert("you have successfully signed up");
    location.href = "/login.html";
  }
});

async function emailValidation() {
  const email = document.getElementById("email").value;
  const getEmail = await UserService.getUsers();
  const hasEmail = getEmail.some((item) => item.email === email);
  const regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const isValidEmail = regExp.test(email);

  if (hasEmail && !isValidEmail) {
    alert("sorry you cannot create your id..");
  } else {
    return await UserService.postUser({ email });
  }
}

async function passwordValidation() {
  const password = document.getElementById("password").value;
  const confirmation = document.getElementById("confirm").value;

  if (password !== confirmation) return alert("the password doest not match");
  if (password === confirmation) {
    try {
      await UserService.postUser({
        email,
        password,
      });
    } catch (err) {
      console.log(err);
    }
  }
}
