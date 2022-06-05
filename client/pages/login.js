import UserService from "../services/UserService";

const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    await UserService.postUser({
      email: email.value,
      password: password.value,
    });

    // 1. 성공 메세지를 띄워주세요
    alert("you logged in");
    // 2. 쿠키에 현재 로그인한 이메일을 저장하세요
    document.cookie = `email=${email.value}`;

    location.replace("/images");
  } catch (err) {
    console.log(err);
  }
});
