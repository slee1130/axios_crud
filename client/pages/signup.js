import UserService from "../services/UserService.js";
//add event listeners to the button

const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", async () => {
  //bring the data from the forms
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmation = document.getElementById("confirm").value;
  console.log(email);
  console.log(password);
  console.log(confirmation);
  // TODO: 이미 가입된 회원인지 확인이 필요
  //get the email from json
  const getEmail = await UserService.getUsers();
  console.log(getEmail);
  getEmail.map(async (user) =>
    user.email === email
      ? alert("your email address already exists")
      : await UserService.postUser({ email })
  );
  //check whether the password is the same
  //if it's not the same alert msg
  if (password !== confirmation) return alert("the password doest not match");
  //if it's the same, request api (post)
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
});
