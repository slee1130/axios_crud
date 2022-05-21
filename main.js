import axios from "axios";

import UserService from "./services/UserService.js";
console.log(UserService);
const usersList = document.querySelector(".users-list");
let output = "";
const addUserForm = document.querySelector(".add-user-form");
const firstName = document.getElementById("first-name-value");
const lastName = document.getElementById("last-name-value");
const email = document.getElementById("email-value");
const btnSubmit = document.querySelector(".btn");

async function fetchUsers() {
  try {
    const users = await UserService.getUsers();
    renderUsers(users);
  } catch (error) {
    console.log(error);
  }
}

function renderUsers(users) {
  users.map((user) => {
    output += `
      <div class="users-list">
      <div class="card mt-4 bg-ligt">
      <div class="card-body" data-id=${user.id}>
        <h5 class="last-name-value">${user.last_name}</h5>
        <h5 class="first-name-value">${user.first_name}</h5>
        <p class="email-value">${user.email}</p>
        <a href="#" class="card-link" id="edit-user">Edit</a>
        <a href="#" class="card-link" id="delete-user">Delete</a>
      </div>
      </div>
      </div>
      `;
  });
  return (usersList.innerHTML = output);
}

fetchUsers();

//delete
usersList.addEventListener("click", (e) => {
  // e.preventDefault();

  let delBtn = e.target.id === "delete-user";
  let id = e.target.parentElement.dataset.id;
  //delete
  if (delBtn) {
    axios
      .delete(`http://localhost:3001/users/${id}`)
      .then((res) => renderUsers(res))
      .catch((err) => console.log(err));
    window.location.reload();
    // e.stopPropagation();
  }
});

//edit
usersList.addEventListener("click", (e) => {
  let editBtn = e.target.id === "edit-user";
  let id = e.target.parentElement.dataset.id;

  if (editBtn) {
    const parent = e.target.parentElement;
    let lastNameContent = parent.querySelector(".last-name-value").textContent;
    let firstNameContent =
      parent.querySelector(".first-name-value").textContent;
    let emailContent = parent.querySelector(".email-value").textContent;

    lastName.value = lastNameContent;
    firstName.value = firstNameContent;
    email.value = emailContent;
  }

  //update
  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:3001/users/${id}`, {
        last_name: lastName.value,
        first_name: firstName.value,
        email: email.value,
      })
      .then((res) => renderUsers(res));
    window.location.reload();
  });
});

//POST
addUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const result = await axios.post("http://localhost:3001/users", {
      last_name: lastName.value,
      first_name: firstName.value,
      email: email.value,
    });
    const dataArr = [];
    dataArr.push(result);

    await fetchUsers();

    lastName.value = "";
    firstName.value = "";
    email.value = "";
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
});
