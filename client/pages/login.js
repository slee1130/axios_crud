import UserService from "../services/UserService";

const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await UserService.postUser({
      email: email.value,
      password: password.value,
    }).then(() => {
      location.replace("/images");
    });
  } catch (err) {
    console.log(err);
  }
});
