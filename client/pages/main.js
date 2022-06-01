import ImageService from "../services/ImageService.js";

async function fetchImages() {
  try {
    const { results } = await ImageService.getSearchImages("london");
    renderImages(results);
  } catch (err) {
    console.log(err);
  }
}

function renderImages(images) {
  const imageList = document.querySelector(".fetchImagesWrapper");
  const output = images
    .map((image) => {
      return `
      <div class="fetchImagesWrapper">
        <img src=${image.urls.regular} class="image" />
      </div>
    `;
    })
    .join("");
  return (imageList.innerHTML = output);
}

fetchImages();

// //delete
// usersList.addEventListener("click", (e) => {
//   // e.preventDefault();

//   let delBtn = e.target.id === "delete-user";
//   let id = e.target.parentElement.dataset.id;
//   //delete
//   if (delBtn) {
//     axios
//       .delete(`http://localhost:3001/users/${id}`)
//       .then((res) => renderUsers(res))
//       .catch((err) => console.log(err));
//     window.location.reload();
//     // e.stopPropagation();
//   }
// });

// //edit
// usersList.addEventListener("click", (e) => {
//   let editBtn = e.target.id === "edit-user";
//   let id = e.target.parentElement.dataset.id;

//   if (editBtn) {
//     const parent = e.target.parentElement;
//     let lastNameContent = parent.querySelector(".last-name-value").textContent;
//     let firstNameContent =
//       parent.querySelector(".first-name-value").textContent;
//     let emailContent = parent.querySelector(".email-value").textContent;

//     lastName.value = lastNameContent;
//     firstName.value = firstNameContent;
//     email.value = emailContent;
//   }

//   //update
//   btnSubmit.addEventListener("click", (e) => {
//     e.preventDefault();
//     axios
//       .patch(`http://localhost:3001/users/${id}`, {
//         last_name: lastName.value,
//         first_name: firstName.value,
//         email: email.value,
//       })
//       .then((res) => renderUsers(res));
//     window.location.reload();
//   });
// });

// //POST
// addUserForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   try {
//     const result = await axios.post("http://localhost:3001/users", {
//       last_name: lastName.value,
//       first_name: firstName.value,
//       email: email.value,
//     });
//     const dataArr = [];
//     dataArr.push(result);

//     await fetchUsers();

//     lastName.value = "";
//     firstName.value = "";
//     email.value = "";
//     window.location.reload();
//   } catch (err) {
//     console.log(err);
//   }
// });
