import UserService from "../services/UserService.js";

// 회원가입 구현 필요
// 1. 패스워드 별 표시
// 2. 이메일 validation
// 3. 회원가입 성공시 페이지를 이동시키거나, alert 메세지 띄워주기 + input값 비우기
// 4. (로그인 동일) 마지막 인풋에서 엔터 치면 버튼 클릭한 기능과 동일하게

const submitBtn = document.querySelector("#signup-form");

submitBtn.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    emailValidation();
    passwordValidation();
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
