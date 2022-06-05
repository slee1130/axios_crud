import UserService from "../services/UserService.js";
//add event listeners to the button

// 회원가입 구현 필요
// 1. 패스워드 별 표시
// 2. 이메일 validation
// 3. 회원가입 성공시 페이지를 이동시키거나, alert 메세지 띄워주기 + input값 비우기
// 4. (로그인 동일) 마지막 인풋에서 엔터 치면 버튼 클릭한 기능과 동일하게

const submitBtn = document.querySelector("#submit");

submitBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmation = document.getElementById("confirm").value;
  const getEmail = await UserService.getUsers();

  const hasEmail = getEmail.some((item) => item.email === email);
  if (hasEmail) {
    alert("your email address already exists");
  } else {
    await UserService.postUser({ email });
  }

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
